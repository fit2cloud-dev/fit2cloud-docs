#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JumpServer 社区常见问题自动生成脚本（Docusaurus / fit2cloud-docs）

数据流:
    芝麻会话（社区小助手名下 JumpServer 交流群）
      -> 最近 N 天的「客户提问 → 部门同事解答」问答对
      -> 大模型把近义问题归组，挑出反复出现、且文档可核实的高频问题
      -> 再按官方文档原文成稿（只允许依据给定文档，并给出引用路径）
      -> 校验引用路径真实存在、问题未与页面已有条目重复
      -> 追加到 jumpserver-docs/faq/community_faq.md 对应小节

窗口说明:
    days 默认 8 天（今天含在内，即 today-7 … today）。
    取 8 而不取 7，是为了补回上一次运行漏掉的那半天：定时任务在周一 09:30 运行，
    当天 09:30 之后的消息在运行时还不存在，而「7 天」窗口又恰好从上次运行的那一天开始，
    于是上周一 09:30–23:59 这一段两次运行都覆盖不到；窗口多留一天即闭合。
    相邻两周因此有约一天重叠，重叠带来的重复问题由页面标题去重拦截。

用法:
    python .github/scripts/community_faq.py --days 8 --dry-run
    python .github/scripts/community_faq.py --days 8 --apply --max-items 3
    python .github/scripts/community_faq.py --pairs-json pairs.json --dry-run
    python .github/scripts/community_faq.py --skip-llm        # 只取数+聚类，不调模型

环境变量:
    ZHIMA_BASE_URL             芝麻会话管理端地址（无尾斜杠），如 http://host:8002
    ZHIMA_ACCOUNT/PASSWORD     管理端登录账密（用来自动换 token）
    ZHIMA_SCOPE_STAFF_USERID   社区小助手 userid，默认 SheQuXiaoZhuShou
    ZHIMA_DEPT_STAFF           部门在职名单 JSON，如 [{"name":"张三"},{"name":"李四","aliases":["小李"]}]
                               未设置时退化为「员工角色且不在机器人黑名单」
    LLM_BASE_URL               模型网关（OpenAI 兼容），默认 https://ai.fit2cloud.cn/gateway/v1
    LLM_API_KEY                模型 Key
    LLM_MODEL                  模型名，默认 f2c-auto（飞致云 AI 网关自动路由）；置空则列出网关可用模型
    PRODUCT_KEYWORD            群名过滤关键词，默认 jumpserver

退出码: 0=完成, 1=取数失败, 2=配置/参数错误, 3=无合格新条目（不需要提 PR）,
        4=大模型环节失败（网关不可达 / 鉴权失败 / 模型无返回）

关于退出码 1 / 3 / 4 的区别（重要）:
    3 只用于「确实取到了数据、只是没有合格的新条目」，此时 workflow 视为成功且不提 PR。
    1 专指**取数**环节：登录失败、接口异常、一条消息都没取到——若被当成「无新增」，
      接口整体挂掉时会伪装成绿色成功、静默跳过一整周，没人会发现。
    4 专指**大模型**环节：LLM_BASE_URL 不可达、LLM_API_KEY 无效、模型无返回。
      必须单独成码，否则报错文案会指向取数、把排查方向带偏
      （2026-09-23 实测：取数 321 条全部成功，仅模型网关跨境超时，却被报成「取数失败」）。
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, timedelta
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
DOCS_ROOT = REPO_ROOT / "jumpserver-docs"
FAQ_PAGE = DOCS_ROOT / "faq" / "community_faq.md"

# ---------------------------------------------------------------- 常量

MSG_PAGE_SIZE = 50
MSG_MAX_PAGES = 20
MSG_WORKERS = 8
HTTP_TIMEOUT = 60
HTTP_RETRIES = 2          # 网络类瞬时错误的重试次数（4xx 不重试）
HTTP_RETRY_BACKOFF = 3    # 重试间隔基数（秒），按次数线性退避

SESSION_PATH_RE = re.compile(r"/storage/session/\S+")
EMOJI_RE = re.compile(r"\[(链接|图片|表情|呲牙|微笑|强|捂脸|破涕为笑|裂开)\]")
CITATION_PLACEHOLDER = "{{PATH}}"

# 群聊机械噪声，仅用于清洗「喂给模型的清单文本」，不改动原始问答对数据
DASH_RUN_RE = re.compile(r"(?:\s*[-—]\s*){3,}")            # 引用块残留的 - - - - 分隔线
QUOTE_NAME_RE = re.compile(r"「[^：:「」\n]{1,20}：\s*")     # 「某某：xxx」里的人名前缀
AT_MENTION_RE = re.compile(r"@[A-Za-z0-9_\u4e00-\u9fa5]+(?:\s+[A-Za-z][A-Za-z0-9_-]*)?")
EMPTY_QUOTE_RE = re.compile(r"「\s*」")

MEDIA_TYPES = frozenset(
    {"image", "emotion", "link", "voice", "video", "file", "weapp", "card", "sphfeed", "news"}
)
QUESTION_MARKERS = (
    "吗", "么", "怎", "哪", "何", "能否", "可否", "行吗", "怎么", "如何",
    "为啥", "为什么", "帮我", "请问", "？", "?", "@",
    "是否", "有没有", "能不能", "可不可以", "行不行", "多少", "多久", "几个",
)
CLOSING_EXACT = frozenset(
    {"好的", "好", "好哒", "好的谢谢", "好的谢谢你", "好的谢谢您", "谢谢", "谢谢你",
     "谢谢您", "感谢", "多谢", "ok", "okay", "收到", "嗯", "哦",
     "好呢", "嗯嗯", "欧克", "okk", "知道了", "明白", "明白了", "没事了",
     "好啦", "好了", "搞定", "已解决", "没问题了", "可以了", "行了", "不用了"}
)

# 无问句特征的消息，至少要这么多「有效字符」（normalize 后，忽略标点与空白）
# 才算开启一个新的提问块。目的：让「好的 / 收到 / 稍等」这类寒暄不要切断上一个问答块。
# 标记型问句不受此限；无标记的长陈述句仍会开启新块，因此不会漏掉「没写问号的真问题」。
QUESTION_MIN_CHARS = 8

# 自动应答机器人（欢迎语 / 客服助理），不计为「同事解答」
BOT_USERIDS = frozenset({"130132198901303490", "wbVkCUDAAAt_oq-BtwsvQ2ImoABXjiuw"})

# 默认模型：飞致云 AI 网关的自动路由模型，可用 LLM_MODEL 覆盖
DEFAULT_LLM_MODEL = "f2c-auto"

# 模糊/不确定表述：提示词已明令禁止，这里做机械兜底，命中只记警告、不阻断
VAGUE_PHRASES = ("可能", "大概", "也许", "或许", "似乎", "估计", "不确定",
                 "建议试试", "应该可以", "应该是", "好像是", "听说")

# 第二轮喂给模型的官方文档原文上限（字符）。一旦发生截断，结论就有可能落在
# 被截掉的部分之后——这是机械校验查不出来的准确性上限，必须在报告里标出来供人工核对。
DOC_CHARS_PER_FILE = 5000
DOC_CHARS_TOTAL = 14000


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def cfg(name: str, default: str = "") -> str:
    """读环境变量：未设置、或设为空串时，都回落到 default。

    GitHub Actions 里 `VAR: ${{ vars.X }}` 在 X 未配置时会注入空串，
    若按「仅未设置才用默认值」处理，默认模型/默认地址就会失效。
    """
    return str(os.environ.get(name) or default).strip()


def fail(code: int, msg: str) -> SystemExit:
    log(f"[community_faq] ERROR: {msg}")
    return SystemExit(code)


# ---------------------------------------------------------------- HTTP

def http_json(
    method: str,
    url: str,
    *,
    params: dict | None = None,
    body: dict | None = None,
    headers: dict | None = None,
    timeout: int = HTTP_TIMEOUT,
) -> dict:
    if params:
        pairs: list[tuple[str, str]] = []
        for k, v in params.items():
            if v is None:
                continue
            pairs.append((k, str(v)))
        url = f"{url}?{urllib.parse.urlencode(pairs)}"

    data = None
    hdrs = {"Accept": "application/json"}
    if body is not None:
        data = json.dumps(body, ensure_ascii=False).encode("utf-8")
        hdrs["Content-Type"] = "application/json"
    hdrs.update(headers or {})

    last_err: Exception | None = None
    for attempt in range(HTTP_RETRIES + 1):
        if attempt:
            wait = HTTP_RETRY_BACKOFF * attempt
            log(f"[community_faq] 第 {attempt} 次重试（{wait}s 后）: {method} {url}")
            time.sleep(wait)
        req = urllib.request.Request(url, data=data, headers=hdrs, method=method)
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                raw = resp.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as err:
            detail = ""
            try:
                detail = err.read().decode("utf-8", "replace")[:400]
            except Exception:
                pass
            last_err = RuntimeError(f"HTTP {err.code} {url} :: {detail}")
            if err.code < 500 and err.code != 429:
                raise last_err from err  # 4xx 是确定性错误，重试没有意义
            continue
        except urllib.error.URLError as err:
            last_err = RuntimeError(f"网络不可达 {url} :: {err.reason}")
            continue
        except TimeoutError as err:
            last_err = RuntimeError(f"请求超时 {url} :: {err}")
            continue

        try:
            return json.loads(raw)
        except json.JSONDecodeError as err:
            # 网关偶发返回半截响应，重试通常能恢复
            last_err = RuntimeError(f"响应不是 JSON: {url} :: {raw[:200]}")
            continue

    raise last_err or RuntimeError(f"请求失败 {method} {url}")


# ---------------------------------------------------------------- 芝麻会话取数

def zhima_base() -> str:
    url = cfg("ZHIMA_BASE_URL").rstrip("/")
    if not url:
        raise fail(2, "缺少 ZHIMA_BASE_URL")
    return url


def zhima_login() -> str:
    """账密换 token。管理端 login 接口字段是 username，不是 account。

    ⚠️ 拿到的 token 必须走 ``Authorization: Bearer <token>``（见 zhima_headers）。
    裸 token 会被判 ``401 登录过期`` —— 登录明明是成功的，报错却指向登录，
    2026-09-23 踩过这个坑（误以为是账号密码问题）。
    """
    account = cfg("ZHIMA_ACCOUNT")
    password = cfg("ZHIMA_PASSWORD")
    if not account or not password:
        raise fail(2, "缺少 ZHIMA_ACCOUNT / ZHIMA_PASSWORD")
    res = http_json(
        "POST",
        f"{zhima_base()}/api/auth/password/login",
        body={"username": account, "password": password},
    )
    if res.get("status") != "success":
        raise fail(1, f"芝麻会话登录失败: {res.get('error_message') or res}")
    token = (res.get("data") or {}).get("token")
    if not token:
        raise fail(1, f"登录响应无 token: {str(res)[:200]}")
    return str(token)


def zhima_headers(token: str) -> dict[str, str]:
    """芝麻接口统一的鉴权头。

    ⚠️ 必须带 ``Bearer `` 前缀：login 返回的 token 是裸 JWT（自身不含 Bearer），
    少这个前缀会被服务端判 ``401 登录过期``。
    """
    return {"Authorization": f"Bearer {token}"}


def zhima_groups(token: str) -> list[dict]:
    """拉社区小助手名下全部群（未过滤）。"""
    staff = cfg("ZHIMA_SCOPE_STAFF_USERID", "SheQuXiaoZhuShou")
    out: list[dict] = []
    page = 1
    total = 0
    while page <= 20:
        res = http_json(
            "GET",
            f"{zhima_base()}/api/chats/by/staff/room/conversation/list",
            params={"staff_userid": staff, "page": page, "size": 50},
            headers=zhima_headers(token),
        )
        if res.get("status") != "success":
            raise fail(1, f"拉取群列表失败: {res.get('error_message') or res}")
        data = res.get("data") or {}
        items = data.get("items") or []
        for item in items:
            if not isinstance(item, dict):
                continue
            chat_id = item.get("chat_id") or item.get("to")
            if not chat_id:
                continue
            name = str(item.get("remark_name") or item.get("name") or "")
            out.append({"chat_id": str(chat_id), "name": name})
        total = int(data.get("total") or 0)
        if not items or (total and len(out) >= total) or len(items) < 50:
            break
        page += 1
    log(f"[community_faq] 范围群 {len(out)} 个（total={total}）")
    return out


def product_groups(groups: list[dict], keyword: str) -> list[dict]:
    kw = keyword.lower()
    kept = [g for g in groups if kw in g["name"].lower()]
    for g in kept:
        g["label"] = g["name"].replace("JumpServer ", "").strip() or "交流群"
    log(f"[community_faq] 命中关键词 {keyword!r} 的群 {len(kept)} 个")
    return kept


def zhima_staff_directory(token: str) -> list[dict]:
    out: list[dict] = []
    page = 1
    while page <= 40:
        res = http_json(
            "GET",
            f"{zhima_base()}/api/staff/list",
            params={"page": page, "limit": 50},
            headers=zhima_headers(token),
        )
        if res.get("status") != "success":
            raise fail(1, f"拉取员工目录失败: {res.get('error_message') or res}")
        data = res.get("data") or {}
        items = data.get("items") or []
        out.extend(x for x in items if isinstance(x, dict))
        total = int(data.get("total") or 0)
        if not items or (total and len(out) >= total) or len(items) < 50:
            break
        page += 1
    return out


def dept_whitelist(token: str) -> set[str]:
    """返回「计为解答人」的 userid 集合；未配置 ZHIMA_DEPT_STAFF 时返回空集合。"""
    raw = cfg("ZHIMA_DEPT_STAFF")
    if not raw:
        return set()
    try:
        spec = json.loads(raw)
    except json.JSONDecodeError as err:
        raise fail(2, f"ZHIMA_DEPT_STAFF 不是合法 JSON: {err}") from err
    if isinstance(spec, dict):
        spec = spec.get("staff") or []
    if not isinstance(spec, list):
        raise fail(2, "ZHIMA_DEPT_STAFF 应为 [{\"name\": \"...\"}, ...]")

    wanted: list[tuple[str, list[str]]] = []
    for row in spec:
        if isinstance(row, str) and row.strip():
            wanted.append((row.strip(), []))
        elif isinstance(row, dict) and str(row.get("name") or "").strip():
            aliases = [str(a).strip() for a in (row.get("aliases") or []) if str(a).strip()]
            wanted.append((str(row["name"]).strip(), aliases))
    if not wanted:
        raise fail(2, "ZHIMA_DEPT_STAFF 里没有有效姓名")

    directory = zhima_staff_directory(token)
    by_name: dict[str, str] = {}
    for rec in directory:
        uid = str(rec.get("userid") or "")
        if uid:
            by_name[str(rec.get("name") or "").strip()] = uid
    ids: set[str] = set()
    missed: list[str] = []
    for name, aliases in wanted:
        uid = by_name.get(name) or next((by_name[a] for a in aliases if a in by_name), None)
        if uid:
            ids.add(uid)
        else:
            missed.append(name)
    log(f"[community_faq] 部门名单命中 {len(ids)}/{len(wanted)} 人" + (f"，未匹配: {missed}" if missed else ""))
    return ids


def fetch_day_messages(token: str, chat_id: str, day: str) -> list[dict]:
    rows: list[dict] = []
    page = 1
    while page <= MSG_MAX_PAGES:
        res = http_json(
            "GET",
            f"{zhima_base()}/api/chats/by/group/message/list",
            params={
                "group_chat_id": chat_id,
                "page": page,
                "size": MSG_PAGE_SIZE,
                "msg_start_time": f"{day} 00:00:00",
                "msg_end_time": f"{day} 23:59:59",
            },
            headers=zhima_headers(token),
        )
        if res.get("status") != "success":
            # 抛给上层统一统计失败次数。这里若只是 log + break，
            # 「接口整体不可用」会被伪装成「本周群里没有消息」，静默跳过一整周。
            raise RuntimeError(
                "拉取消息失败 group={0} day={1}: {2}".format(
                    chat_id, day, res.get("error_message") or str(res)[:200])
            )
        data = res.get("data") or {}
        items = data.get("items") or []
        rows.extend(x for x in items if isinstance(x, dict))
        total = int(data.get("total") or 0)
        if not items or (total and len(rows) >= total) or len(items) < MSG_PAGE_SIZE:
            break
        page += 1
    return rows


# ---------------------------------------------------------------- 问答对提取

def msg_text(msg: dict) -> str:
    raw = msg.get("raw_content")
    if isinstance(raw, dict):
        for key in ("content", "title", "description"):
            val = raw.get(key)
            if val:
                return str(val)
    return str(msg.get("msg_content") or "")


def clean_text(text: str) -> str:
    s = SESSION_PATH_RE.sub("", str(text or ""))
    s = EMOJI_RE.sub("", s)
    s = re.sub(r"-{5,}", " ", s)
    return re.sub(r"[ \t]+", " ", s).strip()


def normalize_text(text: str) -> str:
    s = EMOJI_RE.sub("", str(text or ""))
    s = re.sub(r"https?://\S+", "", s)
    s = re.sub(r"[，。,.!！、/｜|～~\s]+", "", s)
    return s.strip().lower()


def role_of(msg: dict):
    r = msg.get("from_role")
    if isinstance(r, dict):
        r = r.get("value")
    try:
        return int(r)
    except (TypeError, ValueError):
        return None


def is_question(msg: dict) -> bool:
    """判断这条消息是否「开启一个新的提问块」。

    收窄了原先「只要不是道别语就算提问」的口径：没有问句特征时，要求内容有
    足够长度（QUESTION_MIN_CHARS）才开启新块，避免「好的 / 收到 / 稍等」这类寒暄
    把上一个问答块切断。注意收窄**不会丢内容**——提问块一旦已开启，后续客户消息
    仍会被并入该块（见 extract_pairs 的 role == 1 分支）。
    """
    text = msg_text(msg)
    if any(mark in text for mark in QUESTION_MARKERS):
        return True
    n = normalize_text(text)
    if not n or n in CLOSING_EXACT:
        return False
    return len(n) >= QUESTION_MIN_CHARS


def is_noise(text: str) -> bool:
    return len(normalize_text(text)) < 6


def strip_trailing_chatter(text: str) -> str:
    """剥掉提问块尾部粘连的寒暄词（「…能升级吗 好的 收到」→「…能升级吗」）。

    多轮问答里客户的确认语会并进上一个提问块（见 extract_pairs），不清理会污染
    喂给模型的清单文本。只剥尾部、且要求剥完还剩内容，避免把纯寒暄块剥成空串。
    """
    parts = [p for p in str(text or "").split(" ") if p]
    while len(parts) > 1 and normalize_text(parts[-1]) in CLOSING_EXACT:
        parts.pop()
    return " ".join(parts).strip()


def extract_pairs(msgs: list[dict], allowed: set[str], strict: bool, group: str, day: str) -> list[dict]:
    """按时间序把「客户提问块 → 同事解答块」配对。

    strict=True 时只认白名单 userid；否则认所有员工角色且非机器人。
    """
    timed = sorted(
        ((str(m.get("msg_time") or ""), m) for m in msgs if m.get("msg_time")),
        key=lambda x: x[0],
    )
    pairs: list[dict] = []
    q_buf: list[str] = []
    q_ts = ""
    a_buf: list[str] = []

    def answerer_ok(msg: dict) -> bool:
        sender = str(msg.get("from") or "")
        if sender in BOT_USERIDS:
            return False
        return sender in allowed if strict else True

    def flush() -> None:
        nonlocal q_buf, a_buf, q_ts
        q_text = strip_trailing_chatter(clean_text(" ".join(q_buf)))
        a_text = clean_text(" ".join(a_buf))
        if q_text and not is_noise(q_text) and a_text:
            pairs.append({
                "date": day,
                "group": group,
                "time": q_ts[11:16],
                "question": q_text[:600],
                "answer": a_text[:1200],
            })
        q_buf, a_buf, q_ts = [], [], ""

    for ts, msg in timed:
        role = role_of(msg)
        text = clean_text(msg_text(msg))
        if role == 1:  # 客户
            if is_question(msg) or not q_buf:
                if a_buf:
                    flush()
                if not q_buf:
                    q_ts = ts
            if text:
                q_buf.append(text)
        elif role == 2 and answerer_ok(msg):  # 我方同事
            if q_buf or a_buf:
                a_buf.append(text)
    flush()
    return pairs


def collect_pairs(days: int, keyword: str) -> tuple[list[dict], list[dict], dict]:
    """取数并配对。

    返回值第三个元素是取数完整性统计（attempts/failures/rows）——调用方据此区分
    「接口挂了」和「群里确实没消息」，避免把取数失败当成「本周无新增」。
    """
    token = zhima_login()
    groups = product_groups(zhima_groups(token), keyword)
    if not groups:
        raise fail(1, "没有匹配到任何交流群，请检查 PRODUCT_KEYWORD")
    allowed = dept_whitelist(token)
    strict = bool(allowed)
    if not strict:
        log("[community_faq] 未配置 ZHIMA_DEPT_STAFF，退化为「员工角色且非机器人」筛选")
    else:
        log(f"[community_faq] 计为解答人的部门同事 {len(allowed)} 人")

    today = date.today()
    day_list = [(today - timedelta(days=i)).isoformat() for i in range(days - 1, -1, -1)]
    log("[community_faq] 数据窗口 {0} … {1}（{2} 天）".format(day_list[0], day_list[-1], len(day_list)))

    stats = {"attempts": 0, "failures": 0, "rows": 0}
    all_pairs: list[dict] = []
    by_day: list[dict] = []
    for day in day_list:
        day_pairs: list[dict] = []
        with ThreadPoolExecutor(max_workers=MSG_WORKERS) as pool:
            futs = {pool.submit(fetch_day_messages, token, g["chat_id"], day): g for g in groups}
            for fut in as_completed(futs):
                g = futs[fut]
                stats["attempts"] += 1
                try:
                    rows = fut.result()
                except Exception as err:  # 单群失败不影响整体，但计入 failures
                    stats["failures"] += 1
                    log(f"[community_faq] 群 {g['label']} {day} 拉取异常: {err}")
                    continue
                stats["rows"] += len(rows)
                day_pairs.extend(extract_pairs(rows, allowed, strict, g["label"], day))
        log(f"[community_faq] {day} 问答对 {len(day_pairs)} 条")
        by_day.append({"date": day, "pairs": len(day_pairs)})
        all_pairs.extend(day_pairs)

    log("[community_faq] 取数统计：请求 {attempts} 次、失败 {failures} 次、消息 {rows} 条".format(**stats))
    return all_pairs, by_day, stats


# ---------------------------------------------------------------- 提问清单

DIGEST_MAX_ITEMS = 300
DIGEST_QUESTION_CHARS = 100


def scrub_question(text: str) -> str:
    """压掉群聊机械噪声：引用块里的发言人前缀、残留分隔线、@提及。

    只作用于喂给模型的清单文本，不改动原始问答对数据。
    """
    s = str(text or "")
    s = DASH_RUN_RE.sub(" ", s)
    s = QUOTE_NAME_RE.sub("「", s)
    s = AT_MENTION_RE.sub("", s)
    s = EMPTY_QUOTE_RE.sub(" ", s)
    s = re.sub(r"「\s+", "「", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def build_question_digest(pairs: list[dict]) -> str:
    """把提问压成「编号 + 日期 + 群 + 问题」清单。

    按问题文本排序，让近义问题在清单里相邻，便于模型归组；编号是 pairs 的下标。
    """
    if len(pairs) > DIGEST_MAX_ITEMS:
        log("[community_faq] 问答对 {0} 条超过上限，清单只取前 {1} 条".format(len(pairs), DIGEST_MAX_ITEMS))
    rows: list[tuple[str, str]] = []
    for idx, pair in enumerate(pairs[:DIGEST_MAX_ITEMS]):
        q = scrub_question(pair["question"])[:DIGEST_QUESTION_CHARS]
        rows.append((normalize_text(q), "[{0}] {1} {2} | {3}".format(idx, pair["date"], pair["group"], q)))
    rows.sort()
    digest = "\n".join(line for _, line in rows)
    log("[community_faq] 第一轮模型输入：提问清单 {0} 行 / {1} 字符".format(len(rows), len(digest)))
    return digest


def valid_question_ids(item: dict, total: int) -> list[int]:
    """校验模型给出的问题编号：越界、非数字一律丢弃。"""
    out: list[int] = []
    for raw in item.get("question_ids") or []:
        try:
            idx = int(raw)
        except (TypeError, ValueError):
            continue
        if 0 <= idx < total and idx not in out:
            out.append(idx)
    return out


def digest_limit(total: int) -> int:
    """模型实际能看到的编号上限。

    清单只发前 DIGEST_MAX_ITEMS 条，编号校验必须与清单一致，
    否则 300 以上的编号会「校验通过、但模型根本没在清单里见过」。
    """
    return min(total, DIGEST_MAX_ITEMS)


# ---------------------------------------------------------------- 页面读写

def read_page() -> str:
    if not FAQ_PAGE.is_file():
        raise fail(2, f"页面不存在: {FAQ_PAGE}")
    return FAQ_PAGE.read_text(encoding="utf-8")


def page_sections(text: str) -> tuple[list[dict], int]:
    """解析页面 H2 小节，返回 ([{no,title,line_start,line_end,minors}], 最大编号)。"""
    lines = text.splitlines()
    heads: list[tuple[int, int, str]] = []
    for i, line in enumerate(lines):
        m = re.match(r"^##\s+(\d+)\s+(.+?)\s*$", line)
        if m:
            heads.append((i, int(m.group(1)), m.group(2)))
    sections: list[dict] = []
    for idx, (line_no, num, title) in enumerate(heads):
        end = heads[idx + 1][0] if idx + 1 < len(heads) else len(lines)
        minors: list[int] = []
        for j in range(line_no + 1, end):
            m = re.match(r"^###\s+(\d+)\.(\d+)\b", lines[j])
            if m:
                minors.append(int(m.group(2)))
        sections.append({"no": num, "title": title, "line_start": line_no,
                         "line_end": end, "minors": minors})
    return sections, max((s["no"] for s in sections), default=0)


def existing_question_keys(text: str) -> set[str]:
    keys: set[str] = set()
    for line in text.splitlines():
        m = re.match(r"^###\s+\d+\.\d+\s+(.+?)\s*$", line)
        if m:
            keys.add(normalize_text(m.group(1))[:40])
        m = re.match(r"^\*\*问题\*\*[：:]\s*(.+?)\s*$", line)
        if m:
            keys.add(normalize_text(m.group(1))[:40])
    return {k for k in keys if k}


def existing_entry_titles(text: str) -> list[str]:
    """页面已有条目的「编号 + 标题」清单（按文档顺序）。

    用于喂给模型做去重比对：比直接塞 6000 字符正文更全（页面变长后正文会被截断，
    截断掉的标题模型就看不到了），也更省 token。
    """
    out: list[str] = []
    for line in text.splitlines():
        m = re.match(r"^###\s+(\d+\.\d+)\s+(.+?)\s*$", line)
        if m:
            out.append("{0} {1}".format(m.group(1), m.group(2)))
    return out


NEAR_DUP_THRESHOLD = 0.7


def _bigrams(text: str) -> set[str]:
    s = normalize_text(text)
    if not s:
        return set()
    if len(s) < 2:
        return {s}
    return {s[i:i + 2] for i in range(len(s) - 1)}


def near_duplicate(title: str, keys: set[str], threshold: float = NEAR_DUP_THRESHOLD) -> str | None:
    """标题近似重复检测（字符 bigram 的 Dice 系数），命中则返回最像的已有标题。

    精确比对只能抓「一字不差」的标题，换个说法问同一件事就漏了；这里做一层近似兜底。
    标题太短（bigram < 5，约 6 字以内）时不判断，避免误伤短标题。
    """
    a = _bigrams(title)
    if len(a) < 5:
        return None
    best, best_score = None, 0.0
    for k in keys:
        b = _bigrams(k)
        if not b:
            continue
        score = 2 * len(a & b) / (len(a) + len(b))
        if score > best_score:
            best, best_score = k, score
    return best if best_score >= threshold else None


def doc_index() -> list[str]:
    out: list[str] = []
    for path in sorted(DOCS_ROOT.rglob("*.md")):
        rel = path.relative_to(DOCS_ROOT).as_posix()
        if rel.startswith("faq/"):
            continue
        out.append(rel)
    return out


def rel_link(doc_path: str) -> str:
    target = DOCS_ROOT / doc_path
    return os.path.relpath(target, FAQ_PAGE.parent).replace(os.sep, "/")


# ---------------------------------------------------------------- 大模型

def llm_endpoint() -> tuple[str, str, str]:
    base = cfg("LLM_BASE_URL", "https://ai.fit2cloud.cn/gateway/v1").rstrip("/")
    key = cfg("LLM_API_KEY")
    model = cfg("LLM_MODEL", DEFAULT_LLM_MODEL)
    if not key:
        raise fail(2, "缺少 LLM_API_KEY")
    return base, key, model


def llm_models(base: str, key: str) -> list[str]:
    res = http_json("GET", f"{base}/models", headers={"Authorization": f"Bearer {key}"})
    data = res.get("data") if isinstance(res, dict) else None
    if isinstance(data, list):
        return [str(x.get("id")) for x in data if isinstance(x, dict) and x.get("id")]
    return []


def llm_chat(messages: list[dict], *, temperature: float = 0.2, max_tokens: int = 4096) -> str:
    base, key, model = llm_endpoint()
    if not model:
        try:
            available = llm_models(base, key)
        except Exception as err:
            raise fail(4, f"无法确定模型名，且列模型失败（多为网关不可达）: {err}") from err
        raise fail(2, f"缺少 LLM_MODEL，网关可用模型: {', '.join(available) or '(空)'}")
    payload = {"model": model, "messages": messages,
               "temperature": temperature, "max_tokens": max_tokens}
    try:
        res = http_json("POST", f"{base}/chat/completions", body=payload,
                        headers={"Authorization": f"Bearer {key}"}, timeout=180)
    except RuntimeError as err:
        raise fail(4, f"模型调用失败（网关 {base}）: {err}") from err
    choices = res.get("choices") or []
    if not choices:
        raise fail(4, f"模型无返回: {str(res)[:300]}")
    return str((choices[0].get("message") or {}).get("content") or "")


def json_block(text: str):
    """从模型输出里抠出 JSON（容忍 ```json 包裹与前后废话）。"""
    fenced = re.search(r"```(?:json)?\s*(.+?)```", text, re.S)
    candidate = fenced.group(1) if fenced else text
    start, end = candidate.find("{"), candidate.rfind("}")
    if start == -1 or end == -1:
        raise ValueError(f"模型输出没有 JSON: {text[:200]}")
    return json.loads(candidate[start:end + 1])


PASS1_SYSTEM = """你是 JumpServer（飞致云开源堡垒机）官方文档的维护者。
下面给你社区交流群最近一周的全部提问清单（形如 `[编号] 日期 群 | 问题`）。
任务：先把语义相同的问题归为同一主题，再判断每个主题**是否值得沉淀进官方「社区常见问题」页**。

■ 判断标准是「长期复用价值」，**不是出现频率**。高频 ≠ 必须收录，低频但高价值也可收录。
优先收录（具备长期复用价值、用户看了文档仍会困惑的问题）：
  - 版本升级路径 / 能否直升 / 升级前置条件
  - 兼容性、环境要求（内核、数据库、缓存、浏览器等版本门槛）
  - 功能变化 / 组件合并 / 功能废弃或"去哪了"
  - 报错的根因与处理方式
  - 参数限制、取值规则、使用前提
原则上**不收录**：
  - 单次、个别的特殊环境问题（换个环境/网络就好，无复用价值）
  - 纯操作步骤型（怎么装、怎么点、怎么备份——官方文档已有完整教程的）
  - 官方文档已有明确完整答案、用户只是没翻到的

■ 硬性约束：
A. 只收 JumpServer V5 相关。群聊多数不写版本，**未标注版本的一律按当前主线 V5 处理**，
   不要因"没写版本"就排除；只有明确指向旧版本特性（v3/v4 独有、明说"老版本/升级前"）才不选。
B. 出现次数是参考而非门槛：高价值主题哪怕只出现 1 次也可选；
   凑数、无复用价值的高频问题不要选。question_ids 里编号个数即出现次数，如实填。
C. 与「已有条目」重复或语义相同（含换了说法的同义问法）的**一律不选**——
   哪怕措辞不同，只要问的是同一件事就跳过。
D. 事实来源优先级（判断能否核实时遵循）：
   官方文档 > 官方 FAQ > 群管理员/同事回答 > 用户描述 > 你自身知识。
   优先选「官方文档能核实」的主题；doc_paths 尽量给出，确实找不到可留空数组，交第二轮/人工把关。

■ 输出要求：
1. question_ids 只能用清单里**原样出现过**的编号，不得编造；语义相同才算一组。
2. 最多选 {max_items} 条；宁缺毋滥，确实一条都不值得沉淀时返回空数组。
3. doc_paths 尽量从给定文档索引里挑**原样存在**的相对路径，一条优先给一个依据，找不到留空数组，不要编造。
4. section 填现有小节标题原文；确实不属于任何现有小节时才填 new_section。
5. value 用一句话说清「为什么值得长期沉淀」（属于上面哪类高价值问题），不要写"因为出现 N 次"。

只输出 JSON，不要任何解释文字。格式：
{{"items":[{{"question_ids":[12,88],"title":"短标题（疑问句，20 字以内）","question":"一句话问题描述",
"section":"现有小节标题或null","new_section":"新小节标题或null",
"doc_paths":["installation/xxx.md"],"value":"该主题的长期复用价值属于哪类、为何值得沉淀"}}]}}"""

PASS2_SYSTEM = """你是 JumpServer（飞致云开源堡垒机）官方文档的撰写者。
任务：基于给定的官方文档原文，写一条「社区常见问题」条目，直接进官方文档，质量要求最高。

■ 你的任务是**回答这一个具体问题**，不是总结整篇文档。
  只提取「能回答当前问题」的必要事实，其余文档内容一律不写。

■ 固定结构（编号由程序生成，你不要写编号；正文只有下面两部分）：
  **问题**：一句话描述用户问题
  **处理方式**：一句话明确结论 + 必要事实/参数/命令
  篇幅通常 1~4 行，能一句话说清就绝不扩写。参照「页面既有条目范例」的措辞与详略。

■ 事实来源优先级（硬性）：
  官方文档 > 官方 FAQ > 群管理员/同事回答 > 用户描述 > 你自身知识
  1. 涉及**版本号、参数、命令、路径、配置项**的内容，必须有官方文档原文依据，逐字一致，不得改写或自造。
  2. **禁止用你自身知识补充**文档没写的内容；群聊回复只是线索，不能当作事实来源。
  3. 严禁出现「可能/大概/不确定/建议试试/请以…为准/视…而定/具体…请参见」等模糊或甩锅表述。

■ 放弃生成（宁缺毋滥）：以下任一情况，把 body 输出为空字符串，表示这条不该自动入库：
  - 官方文档没有明确结论、或只给了你无法确认的间接信息；
  - 下方「官方文档原文」标注了「已截断」，而你要用的结论可能落在被截掉的部分；
  - 只能给出模糊、猜测或需要"视情况而定"的答案。

■ 其它：
  - question 用用户口吻描述现象（不照抄群聊原话）。
  - **不要在 body 里写"请参阅/详见/参见…文档"之类的引导句**——引导链接只放 see_also 字段。
  - see_also 可选，全条最多一句收尾引导（如"详细步骤请参阅[升级指南]({placeholder})"），
    用 {placeholder} 作链接地址占位符，不要自写相对路径；没有值得引导的文档就留空字符串。
  - 正文用简体中文；仅当文档原文本身含命令/配置示例时才用代码块，不要为排版堆步骤编号列表。

只输出 JSON，不要任何解释文字。格式：
{{"title":"短标题（疑问句，20 字以内）","question":"一句话问题描述",
"body":"处理方式正文（markdown；依据不足时留空字符串）",
"see_also":"可选的一句收尾引导，含 {placeholder} 链接占位符；不需要时留空字符串",
"doc_path":"最终依据的单个文档相对路径"}}"""

# ---------------------------------------------------------------- 选题与成稿

def screen_questions(pairs: list[dict], page: str, index: list[str],
                     max_items: int) -> list[dict]:
    """第一轮：模型归组并按「长期复用价值」挑选值得沉淀的问题，同时给出文档依据。"""
    digest = build_question_digest(pairs)
    if not digest:
        return []
    sections, _ = page_sections(page)
    section_titles = ["{0} {1}".format(s["no"], s["title"]) for s in sections]
    titles = existing_entry_titles(page)
    user = (
        "## 现有小节（section 字段只能填这些标题原文）\n" + "\n".join(section_titles) + "\n\n"
        "## 已有条目标题（收录时避免与这些语义重复，含换了说法的同义问法）\n"
        + ("\n".join(titles) if titles else "（页面暂无条目）") + "\n\n"
        "## 官方文档索引（doc_paths 只能从这里挑）\n" + "\n".join(index) + "\n\n"
        "## 最近提问清单\n" + digest
    )
    raw = llm_chat(
        [{"role": "system", "content": PASS1_SYSTEM.format(max_items=max_items)},
         {"role": "user", "content": user}],
        temperature=0.1, max_tokens=3000,
    )
    try:
        payload = json_block(raw)
    except (ValueError, json.JSONDecodeError) as err:
        log(f"[community_faq] 第一轮筛选输出无法解析: {err}")
        return []
    items = payload.get("items")
    return [x for x in items if isinstance(x, dict)] if isinstance(items, list) else []


def compose_entry(item: dict, pairs: list[dict], index: list[str]) -> dict | None:
    """第二轮：用官方文档原文生成条目。

    宁缺毋滥：无有效文档依据、或模型判定依据不足（body 置空）时，直接返回 None 跳过，
    不据群聊猜测硬写，交人工处理。
    """
    raw_paths = [str(p) for p in (item.get("doc_paths") or [])]
    cited = [p for p in raw_paths if p in index]
    dropped = [p for p in raw_paths if p not in index]
    if dropped:
        log(f"[community_faq] 丢弃不存在的引用路径 {dropped} <- {item.get('title')}")
    # 无有效文档依据：不再据群聊硬写（新策略宁缺毋滥），直接跳过交人工
    if not cited:
        log(f"[community_faq] 无有效文档依据，跳过（不自动入库）: {item.get('title')}")
        return None

    ids = valid_question_ids(item, digest_limit(len(pairs)))
    source_questions = [scrub_question(pairs[i]["question"]) for i in ids[:3]] or [str(item.get("question") or "")]
    source_answers = [pairs[i]["answer"] for i in ids[:3]]

    blocks: list[str] = []
    total = 0
    truncated: list[str] = []   # 单篇超长被截断的文档
    omitted: list[str] = []     # 因总字符上限没喂进去的文档
    for rel in cited[:3]:
        text = (DOCS_ROOT / rel).read_text(encoding="utf-8", errors="replace")
        if len(text) > DOC_CHARS_PER_FILE:
            text = text[:DOC_CHARS_PER_FILE] + "\n...(已截断)"
            truncated.append(rel)
        if total + len(text) > DOC_CHARS_TOTAL:
            omitted.append(rel)
            break
        total += len(text)
        blocks.append(f"### 文档 {rel}\n{text}")

    doc_block = "\n\n".join(blocks)
    trunc_note = ("\n\n⚠️ 注意：上面标注「已截断」的文档并不完整，若你要用的结论可能落在被截掉的部分，"
                  "请把 body 置空放弃生成。" if truncated else "")
    user = (
        "## 页面既有条目范例（Golden Examples，模仿其措辞与详略）\n" + page_style_sample() + "\n\n"
        "## 社区原始提问（仅作理解现象用，不要照抄，不要采信其中的说法）\n"
        + "\n".join(f"- {q[:200]}" for q in source_questions)
        + "\n\n## 同事在群里的临时回复（仅作线索，事实必须以官方文档为准）\n"
        + "\n".join(f"- {a[:400]}" for a in source_answers)
        + "\n\n## 官方文档原文\n" + doc_block + trunc_note
    )
    raw = llm_chat(
        [{"role": "system", "content": PASS2_SYSTEM.format(placeholder=CITATION_PLACEHOLDER)},
         {"role": "user", "content": user}],
        temperature=0.2, max_tokens=2500,
    )
    try:
        payload = json_block(raw)
    except (ValueError, json.JSONDecodeError) as err:
        log(f"[community_faq] 第二轮成稿输出无法解析: {err}")
        return None

    title = str(payload.get("title") or item.get("title") or "").strip()
    question = str(payload.get("question") or "").strip()
    body = str(payload.get("body") or "").strip()
    # 模型按新策略判定"依据不足"时会把 body 置空 -> 这条不入库，交人工
    if not body:
        log(f"[community_faq] 模型判定依据不足（body 为空），跳过: {title or item.get('title')}")
        return None
    if not title:
        log(f"[community_faq] 成稿字段缺失，丢弃: {item.get('title')}")
        return None

    doc_path = str(payload.get("doc_path") or "").strip()
    if doc_path not in index:
        doc_path = cited[0]

    # 正文里不该出现指向文档的引导句（引导链接只放 see_also）：剥掉模型误写进 body 的收尾引导行
    body = _strip_trailing_citation(body)
    # 剥完可能只剩空壳（正文本就是纯引用、无实质回答）：按空正文丢弃
    if not body:
        log(f"[community_faq] 剥除引用后正文为空，跳过: {title or item.get('title')}")
        return None

    see_also = str(payload.get("see_also") or "").strip()
    if see_also:
        if CITATION_PLACEHOLDER in see_also:
            # 模型已给出含占位符的链接，直接替换地址
            see_also = see_also.replace(CITATION_PLACEHOLDER, rel_link(doc_path))
        else:
            # 模型只给了引导语没带链接：把链接补在句末，避免出现裸占位符或重复链接
            see_also = f"{see_also.rstrip('。 ')}（[{rel_link(doc_path)}]({rel_link(doc_path)})）"

    final_question = question or title
    vague = sorted({w for w in VAGUE_PHRASES if w in body or w in final_question})
    if vague:
        log("[community_faq] 质量警告：{0} 含模糊表述 {1}".format(title, "、".join(vague)))

    warnings: list[str] = []
    if vague:
        warnings.append("正文含模糊表述：{0}（提示词已禁止）".format("、".join(vague)))
    if truncated or omitted:
        detail = []
        if truncated:
            detail.append("被截断 {0}".format("、".join(truncated)))
        if omitted:
            detail.append("未喂入 {0}".format("、".join(omitted)))
        warnings.append("依据文档超出长度上限（{0}），结论有落在未喂入部分之后的风险，请人工核对"
                        .format("；".join(detail)))
        log("[community_faq] 质量警告：{0} 依据文档超长（{1}）".format(title, "；".join(detail)))

    return {
        "section": item.get("section"),
        "new_section": item.get("new_section"),
        "title": title,
        "question": final_question,
        "body": body,
        "see_also": see_also,
        "doc_path": doc_path,
        "question_ids": ids,
        "count": len(ids),
        "sources": ["{0} {1}".format(pairs[i]["date"], pairs[i]["group"]) for i in ids[:3]],
        "reason": str(item.get("value") or item.get("reason") or "").strip(),
        "truncated": truncated,
        "omitted": omitted,
        "warnings": warnings,
    }


def page_style_sample(max_examples: int = 8) -> str:
    """取页面里已有的若干条条目作为措辞范例（Golden Examples），覆盖不同类型，避免风格漂移。

    页面条目少时全给；多时按小节分散取样，尽量覆盖不同主题。附带固定结构说明，
    明确「问题 + 处理方式」两段式、编号由程序生成、正文 1~4 行。
    """
    try:
        text = read_page()
    except SystemExit:
        return "（页面暂无条目）"
    blocks = re.findall(r"^###\s+\d+\.\d+.*?(?=^###\s|^##\s|\Z)", text, re.S | re.M)
    if not blocks:
        return text.strip()[:600]
    # 按所属小节分组后轮转取样，保证覆盖不同类型而非集中在同一小节
    grouped: dict[str, list[str]] = {}
    for b in blocks:
        key = b.split("\n", 1)[0].split(".", 1)[0].strip()  # 用「### N」的小节号粗分组
        grouped.setdefault(key, []).append(b.strip()[:700])
    picked: list[str] = []
    buckets = list(grouped.values())
    i = 0
    while len(picked) < max_examples and any(buckets):
        b = buckets[i % len(buckets)]
        if b:
            picked.append(b.pop(0))
        i += 1
    header = (
        "【页面固定结构】每条只有两段，编号由程序生成、你不要写编号：\n"
        "### N.N 标题（疑问句）\n"
        "**问题**：一句话描述用户问题\n"
        "**处理方式**：\n"
        "一句话明确结论 + 必要事实/参数/命令（通常 1~4 行，能一句话说清就别扩写）\n\n"
        "【Golden Examples：模仿以下真实条目的措辞与详略，不要自创风格】\n"
    )
    return header + "\n\n---\n\n".join(picked)


# ---------------------------------------------------------------- 写回页面

# 模型偶尔把"请参阅 XXX 文档"这类收尾引导句写进 body（本该只放 see_also），
# 会与 _render_entry 追加的 see_also 重复，甚至出现连续多句/裸链接。逐行从末尾剥掉。
_CITATION_LINE_RE = re.compile(
    r"^(?:详细|完整|更多|具体)?[^。\n]{0,40}?"
    r"(?:请参阅|详见|参见|见|参考)\s*\[[^\]]*\]\([^)]*\)\s*[。.]?$"
)
_BARE_LINK_LINE_RE = re.compile(r"^\s*\[[^\]]*\]\([^)]*\)\s*[。.]?\s*$")
_TRAILING_BARE_LINK_RE = re.compile(r"\s*\[[^\]]*\]\([^)]*\)\s*[。.]?\s*$")
_TRAILING_LEADIN_RE = re.compile(
    r"\s*(?:详细|完整|更多|具体)?[^。\n]{0,40}?"
    r"(?:请参阅|详见|参见|参考|见)\s*[，,：:。]?\s*$"
)
# 剥掉链接后，行尾可能剩「详见官方文档」「具体配置步骤请参阅」这类以引用动词开头/收尾的
# 悬空短语（动词在前、名词在后）。匹配「(修饰语)?(详见|参见|...) + 少量名词」直到行末。
_DANGLING_LEADIN_RE = re.compile(
    r"\s*(?:详细|完整|更多|具体)?[^（）()\n]{0,20}?"
    r"(?:请参阅|详见|参见|参考|见)\s*(?:官方)?(?:文档|说明|教程|手册|链接|页面)?\s*$"
)
# 行尾的「（详见/参见…[链接]…。）」或「详见…[链接]。」引用尾——必须以引用动词引导，
# 避免误伤正文里正常的括号链接。
_INLINE_CITATION_TAIL_RE = re.compile(
    r"\s*[（(]?\s*(?:详细|完整|更多|具体)?[^（）()\n]{0,24}?"
    r"(?:请参阅|详见|参见|参考|见)\s*[，,：:]?\s*"
    r"\[[^\]]*\]\([^)]*\)\s*[）)]?\s*[。.]?\s*$"
)


def _clean_line_citations(line: str) -> str:
    """对单行从右反复剥：末尾裸链接 → 「详见…[链接]」引用尾 → 悬空引导词，直到稳定。"""
    prev = None
    cur = line.rstrip()
    while cur != prev:
        prev = cur
        cur = _TRAILING_BARE_LINK_RE.sub("", cur).rstrip()
        cur = _INLINE_CITATION_TAIL_RE.sub("", cur).rstrip()
        cur = _DANGLING_LEADIN_RE.sub("", cur).rstrip()
        cur = _TRAILING_LEADIN_RE.sub("", cur).rstrip()
    return cur


def _strip_trailing_citation(body: str) -> str:
    """去掉正文里指向文档的引导句/裸链接，避免与 see_also 重复。"""
    lines = [_clean_line_citations(ln) for ln in body.rstrip().splitlines()]
    # 从末尾删掉被剥空的行或整行都是引用/裸链接的行
    while lines:
        last = lines[-1].strip()
        if last == "" or _CITATION_LINE_RE.match(last) or _BARE_LINK_LINE_RE.match(last):
            lines.pop()
            continue
        break
    stripped = "\n".join(lines).rstrip()
    # 剥完后若只剩「答：」这类空壳（正文本就是纯引用、无实质内容），返回空串，
    # 交给上层按空正文丢弃。
    if re.sub(r"^[\s>*\-]*答[：:]\s*", "", stripped).strip() == "":
        return ""
    # 只有确实剥掉了内容且还剩正文时才采用，防止把整段误删
    return stripped if stripped else body.rstrip()


def _render_entry(no: int, minor: int, entry: dict) -> list[str]:
    lines = [f"### {no}.{minor} {entry['title']}", "", f"**问题**：{entry['question']}", "",
             "**处理方式**：", ""]
    lines += entry["body"].splitlines()
    lines.append("")
    if entry.get("see_also"):
        lines += [entry["see_also"], ""]
    return lines


def _match_section(sections: list[dict], raw_title: str) -> dict | None:
    key = normalize_text(raw_title or "")
    if not key:
        return None
    for s in sections:
        if normalize_text(s["title"]) == key:
            return s
    for s in sections:
        sk = normalize_text(s["title"])
        if sk and (sk in key or key in sk):
            return s
    return None


def insert_entries(page_text: str, entries: list[dict]) -> tuple[str, list[dict]]:
    """把条目追加到对应小节末尾。返回 (新页面文本, 实际落位说明)。"""
    if not entries:
        return page_text, []

    sections, max_no = page_sections(page_text)
    lines = page_text.splitlines()
    placed: list[dict] = []
    grouped: list[tuple[dict, list[dict]]] = []
    for entry in entries:
        sec = _match_section(sections, entry.get("section") or "")
        if sec is None:
            continue
        for existing, bucket in grouped:
            if existing is sec:
                bucket.append(entry)
                break
        else:
            grouped.append((sec, [entry]))

    # 按行号从后往前插入，避免前面的插入使后面的行号失效
    for sec, bucket in sorted(grouped, key=lambda x: -x[0]["line_end"]):
        pos = sec["line_end"]
        while pos > sec["line_start"] + 1 and lines[pos - 1].strip() == "":
            pos -= 1
        minor = max(sec["minors"], default=0)
        block: list[str] = []
        for entry in bucket:
            minor += 1
            block += _render_entry(sec["no"], minor, entry)
            placed.append({"entry": entry, "section": "{0} {1}".format(sec["no"], sec["title"]), "no": "{0}.{1}".format(sec["no"], minor)})
        lines[pos:pos] = [""] + block

    # 模型判定不属于任何现有小节时，在末尾新建小节
    new_bucket: list[dict] = []
    for entry in entries:
        if entry.get("section") and _match_section(sections, entry["section"]) is not None:
            continue
        if entry.get("new_section"):
            new_bucket.append(entry)
    new_groups: list[tuple[str, list[dict]]] = []
    for entry in new_bucket:
        title = str(entry["new_section"]).strip()
        for name, bucket in new_groups:
            if normalize_text(name) == normalize_text(title):
                bucket.append(entry)
                break
        else:
            new_groups.append((title, [entry]))
    while lines and lines[-1].strip() == "":
        lines.pop()
    for title, bucket in new_groups:
        max_no += 1
        lines += ["", f"## {max_no} {title}", ""]
        for idx, entry in enumerate(bucket, start=1):
            lines += _render_entry(max_no, idx, entry)
            placed.append({"entry": entry, "section": f"{max_no} {title}", "no": f"{max_no}.{idx}"})

    # 收敛多余空行（模型正文可能带出连续空行），保持与页面既有排版一致
    text = re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).rstrip("\n") + "\n"
    if len(placed) < len(entries):
        log("[community_faq] 警告：{0} 条既未匹配现有小节、也未给出新小节标题，已跳过".format(len(entries) - len(placed)))
    return text, placed


# ---------------------------------------------------------------- 报告

def fetch_summary(stats: dict | None) -> str:
    """取数完整性的一句话摘要（写进报告，供人工确认本期数据是否完整）。"""
    if not stats:
        return "未取数（使用本地问答对）"
    if not stats.get("failures"):
        return "全部成功（请求 {0} 次，消息 {1} 条）".format(stats.get("attempts", 0), stats.get("rows", 0))
    return "存在失败请求（请求 {0} 次、失败 {1} 次、消息 {2} 条）".format(
        stats.get("attempts", 0), stats.get("failures", 0), stats.get("rows", 0))


def write_report(path: str, *, pairs: list[dict], placed: list[dict],
                 skipped: list[dict], by_day: list[dict], days: int, applied: bool,
                 fetch_note: str = "") -> None:
    per_day = ", ".join("{0}={1}".format(d["date"], d["pairs"]) for d in by_day)
    warn_total = sum(len(r["entry"].get("warnings") or []) for r in placed)
    lines = [
        "# 社区常见问题 · 本期自动生成报告",
        "",
        "- 数据窗口：最近 {0} 天（含今天）".format(days),
        "- 问答对：{0} 条（按天：{1}）".format(len(pairs), per_day),
        "- 取数完整性：{0}".format(fetch_note or "未记录"),
        "- 候选主题：{0} 个（入库 {1}，未采纳 {2}）".format(
            len(placed) + len(skipped), len(placed), len(skipped)),
        "- 本次新增：{0} 条（{1}）".format(len(placed), "已写回页面" if applied else "仅预览，未写回"),
        "- 质量检查：{0}".format("无警告" if not warn_total else "{0} 条警告（见下方 ⚠️）".format(warn_total)),
        "",
    ]
    if placed:
        lines += ["## 新增条目", ""]
        for row in placed:
            e = row["entry"]
            doc_shown = "`{0}`".format(e["doc_path"])
            block = [
                f"### {row['no']} {e['title']}",
                f"- 小节：{row['section']}",
                f"- 依据文档：{doc_shown}",
                f"- 社区出现次数：{e['count']}",
                f"- 来源：{'；'.join(e['sources']) or '-'}",
                f"- 入选理由：{e['reason'] or '-'}",
            ]
            block += [f"- ⚠️ {w}" for w in (e.get("warnings") or [])]
            block.append("")
            lines += block
    if skipped:
        lines += ["## 未采纳的候选", ""]
        for row in skipped:
            lines += [f"- {row.get('title') or '(无标题)'} —— {row.get('reason')}", ""]
    Path(path).write_text("\n".join(lines).rstrip("\n") + "\n", encoding="utf-8")


def set_action_output(changed: bool, count: int, report: str) -> None:
    out = cfg("GITHUB_OUTPUT")
    if not out:
        return
    try:
        with open(out, "a", encoding="utf-8") as fh:
            fh.write(f"changed={'true' if changed else 'false'}\n")
            fh.write(f"count={count}\n")
            fh.write(f"report={report}\n")
    except OSError as err:
        log(f"[community_faq] 写 GITHUB_OUTPUT 失败: {err}")


def load_pairs_from_json(path: str) -> tuple[list[dict], list[dict]]:
    payload = json.loads(Path(path).read_text(encoding="utf-8"))
    pairs = payload.get("pairs") if isinstance(payload, dict) else payload
    if not isinstance(pairs, list):
        raise fail(2, f"{path} 里没有 pairs 列表")
    clean: list[dict] = []
    for p in pairs:
        if isinstance(p, dict) and p.get("question") and p.get("answer"):
            clean.append({"date": str(p.get("date") or ""), "group": str(p.get("group") or ""),
                          "time": str(p.get("time") or ""), "question": str(p["question"]),
                          "answer": str(p["answer"])})
    stats: dict[str, int] = {}
    for p in clean:
        stats[p["date"]] = stats.get(p["date"], 0) + 1
    by_day = [{"date": d, "pairs": n} for d, n in sorted(stats.items())]
    return clean, by_day


# ---------------------------------------------------------------- 入口

def main() -> int:
    ap = argparse.ArgumentParser(description="从芝麻会话沉淀 JumpServer 社区常见问题")
    ap.add_argument("--days", type=int, default=8,
                    help="回看天数（含今天），默认 8：多留一天以补回上次运行漏掉的那半天")
    ap.add_argument("--max-items", type=int, default=3, help="本期最多新增条目数，默认 3")
    ap.add_argument("--min-count", type=int, default=2,
                    help="（已弱化）出现次数仅作参考，选题以长期复用价值为准；保留仅为兼容")
    ap.add_argument("--apply", action="store_true", help="写回页面（默认只预览）")
    ap.add_argument("--skip-llm", action="store_true", help="只取数+聚类，不调模型")
    ap.add_argument("--pairs-json", default="", help="改用本地问答对 JSON，跳过取数")
    ap.add_argument("--dump-pairs", default="", help="把问答对写入该 JSON，便于排查")
    ap.add_argument("--report", default="", help="变更报告输出路径（markdown）")
    args = ap.parse_args()

    keyword = cfg("PRODUCT_KEYWORD", "jumpserver")
    stats: dict | None = None
    if args.pairs_json:
        pairs, by_day = load_pairs_from_json(args.pairs_json)
        log(f"[community_faq] 从 {args.pairs_json} 载入问答对 {len(pairs)} 条")
    else:
        pairs, by_day, stats = collect_pairs(args.days, keyword)

    if args.dump_pairs:
        Path(args.dump_pairs).write_text(
            json.dumps({"days": args.days, "total": len(pairs), "pairs": pairs},
                       ensure_ascii=False, indent=1),
            encoding="utf-8",
        )
        log(f"[community_faq] 问答对已写出: {args.dump_pairs}")

    log("[community_faq] 问答对 {0} 条".format(len(pairs)))
    if stats and stats.get("failures"):
        log("[community_faq] 注意：{0}/{1} 个取数请求失败，本期频次统计可能偏低（报告里已标注）".format(
            stats["failures"], stats["attempts"]))

    if args.skip_llm:
        log("[community_faq] --skip-llm：不调模型，仅列出提问清单前 20 行")
        for line in build_question_digest(pairs).splitlines()[:20]:
            log("[community_faq]   " + line)
        return 0
    if not pairs:
        # 必须区分「取数坏了」和「群里确实没消息」：接口整体挂掉若也返回 3，
        # workflow 会当成「本周无新增」绿色通过，静默跳过一整周而没人发现。
        if stats and stats.get("failures"):
            log("[community_faq] 取数失败：{0}/{1} 个请求出错，无法确认本周是否有新问题".format(
                stats["failures"], stats["attempts"]))
            return 1
        if stats and not stats.get("rows"):
            log("[community_faq] 所有群在所有日期都没取到任何消息，疑似接口异常或群范围配置有误")
            return 1
        log("[community_faq] 取到消息但没有形成问答对，跳过")
        return 3

    page = read_page()
    index = doc_index()
    keys = existing_question_keys(page)

    candidates = screen_questions(pairs, page, index, args.max_items * 2)
    log("[community_faq] 模型初选 {0} 条".format(len(candidates)))
    if not candidates:
        log("[community_faq] 模型没有选出合格问题")
        return 3

    entries: list[dict] = []
    skipped: list[dict] = []
    limit = digest_limit(len(pairs))
    for item in candidates:
        if len(entries) >= args.max_items:
            break
        ids = valid_question_ids(item, limit)
        if not ids:
            skipped.append({"title": item.get("title"),
                            "reason": "没有有效的社区问题编号"})
            continue
        title = str(item.get("title") or "")
        probe = normalize_text(title)[:40]
        if probe and probe in keys:
            skipped.append({"title": item.get("title"), "reason": "与页面已有条目标题重复"})
            continue
        dup = near_duplicate(title, keys)
        if dup:
            skipped.append({"title": item.get("title"),
                            "reason": "与页面已有条目标题近似（最像：{0}）".format(dup)})
            continue
        entry = compose_entry(item, pairs, index)
        if entry is None:
            skipped.append({"title": item.get("title"), "reason": "缺少可核实的文档依据或成稿失败"})
            continue
        final_key = normalize_text(entry["title"])[:40]
        if final_key in keys:
            skipped.append({"title": entry["title"], "reason": "成稿后与页面已有条目重复"})
            continue
        dup = near_duplicate(entry["title"], keys)
        if dup:
            skipped.append({"title": entry["title"],
                            "reason": "成稿后与页面已有条目标题近似（最像：{0}）".format(dup)})
            continue
        keys.add(final_key)
        entries.append(entry)

    if not entries:
        log("[community_faq] 没有可入库的新条目")
        report = args.report or str(Path(tempfile.gettempdir()) / "community-faq-report.md")
        write_report(report, pairs=pairs, placed=[], skipped=skipped,
                     by_day=by_day, days=args.days, applied=False,
                     fetch_note=fetch_summary(stats))
        set_action_output(False, 0, report)
        print(json.dumps({"changed": False, "count": 0, "report": report}, ensure_ascii=False))
        return 3

    new_page, placed = insert_entries(page, entries)
    if new_page == page:
        log("[community_faq] 插入后页面无变化")
        set_action_output(False, 0, "")
        return 3

    report = args.report or str(Path(tempfile.gettempdir()) / "community-faq-report.md")
    write_report(report, pairs=pairs, placed=placed, skipped=skipped,
                 by_day=by_day, days=args.days, applied=args.apply,
                 fetch_note=fetch_summary(stats))

    if args.apply:
        FAQ_PAGE.write_text(new_page, encoding="utf-8")
        log(f"[community_faq] 已写回 {FAQ_PAGE}")
    else:
        log("[community_faq] 预览模式，未写回页面。新增内容：")
        for row in placed:
            log(f"[community_faq]   {row['no']} {row['entry']['title']}")

    set_action_output(args.apply, len(placed), report)
    print(json.dumps({"changed": True, "applied": args.apply, "count": len(placed), "report": report,
                      "items": [r["no"] + " " + r["entry"]["title"] for r in placed]},
                     ensure_ascii=False))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except SystemExit:
        raise
    except KeyboardInterrupt:
        sys.exit(130)

