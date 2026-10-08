#!/usr/bin/env python3
"""
fit2cloud 多产品更新日志自动生成脚本（Docusaurus / fit2cloud-docs）

从社区发布 API 取指定版本的发布说明，按各产品 changelog.md 的既有格式生成一个新的
版本区块，插入到目标文件「更新内容」章节的最前面（即现有最新版本之前）。

与 gen_changelog.py（JumpServer 专用）相互独立，互不影响。

用法:
    python .github/scripts/gen_changelog_multi.py <product> <version>
    python .github/scripts/gen_changelog_multi.py dataease v3.1.0 --dry-run
    python .github/scripts/gen_changelog_multi.py 1panel  v2.3.2 --print-target
    python .github/scripts/gen_changelog_multi.py maxkb   v2.10.6-lts --force   # 忽略「已存在」

产品 -> 目标文件（按主版本号路由；未列出的大版本走 default_target）:
    maxkb    -> maxkb-docs/changelog.md     (v1.x -> maxkb_versioned_docs/version-v1/changelog.md)
    dataease -> dataease-docs/changelog.md  (v2.x -> dataease_versioned_docs/version-v2/changelog.md)
    1panel   -> 1panel-docs/changelog.md    (v1.x -> 1panel_versioned_docs/version-v1/changelog.md)
    sqlbot   -> sqlbot-docs/changelog.md
    cordys   -> cordys-docs/changelog.md

退出码: 0=成功或已存在无需修改, 1=版本在社区列表中不存在, 2=参数/文件错误,
        3=版本与目标文件不匹配(见 sanity_check, 路由配置可能已过期)
"""
from __future__ import annotations

import sys, json, re, html, urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

API_BASE = "https://community.fit2cloud.com/v1/products/{}/releases"
TZ = timezone(timedelta(hours=8))

# ---------------------------------------------------------------------------
# 产品配置
#
#   api                 社区 API 的产品代号
#   targets             主版本号 -> 目标文件（版本快照目录）；未列出的走 default_target
#   default_target      当前的（非快照）更新日志文件
#   source              源格式解析器: 'ul'(h*/ul/li) | 'br'(h1/p/■/br)
#   date_style          日期格式: 'plain'(2026年9月24日) | 'spaced'(2026 年 9 月 24 日)
#   title_date_blank    版本标题与日期之间是否空一行
#   bullet              条目前缀
#   strip_trailing      是否去掉条目结尾的「；;。.」
#   quote_normalize     是否把「」替换为“”（cordys 文档风格）
#   groups              API 小标题 -> 文档分组标题。按顺序匹配，先命中者胜；
#                       'drop' 表示丢弃该组（如 sqlbot 的「版本概述」）
#                       'style' 为 'warning' 时用 :::warning[...] 包裹
#   fallback_group     未命中任何规则时的兜底分组；None 表示跳过该组
#   enabled            是否纳入自动流程（默认 True）；False 时 --list 不输出，
#                      workflow 也不会为其创建任务
#
# 当前启用: dataease / 1panel / cordys
# 当前停用: sqlbot / maxkb
#   这两个产品的社区 API 发布说明是「开发视角」的原始条目（带 feat/refactor/build
#   前缀与 issue 号），与文档里「产品视角」的人工整理内容并非同一份数据；用现有最新
#   版本逐行比对差异达 50 行以上，自动生成会改变文档既有风格，故暂不纳入自动流程。
#   待数据源对齐后，把对应的 enabled 改为 True 即可。
# ---------------------------------------------------------------------------
PRODUCTS = {
    'maxkb': {
        'api': 'maxkb',
        'enabled': False,
        'targets': {'1': 'maxkb_versioned_docs/version-v1/changelog.md'},
        'default_target': 'maxkb-docs/changelog.md',
        'source': 'br',
        'date_style': 'spaced',
        'title_date_blank': False,
        'bullet': '- ',
        'strip_trailing': False,
        'groups': [
            {'match': ['安全漏洞修复', '安全漏洞', '安全'], 'title': '安全漏洞修复', 'style': 'warning'},
            {'match': ['新增功能', '新功能'], 'title': '**新增功能**'},
            {'match': ['功能优化'], 'title': '**功能优化**'},
            {'match': ['问题修复', 'bug修复', 'bug 修复'], 'title': '**问题修复**'},
        ],
        'fallback_group': None,
    },
    'dataease': {
        'api': 'dataease',
        'targets': {'2': 'dataease_versioned_docs/version-v2/changelog.md'},
        'default_target': 'dataease-docs/changelog.md',
        'source': 'ul',
        'date_style': 'plain',
        'title_date_blank': True,
        'bullet': '- ',
        'strip_trailing': True,
        'groups': [
            {'match': ['漏洞修复', '安全漏洞修复', 'security fixes'], 'title': '漏洞修复'},
            {'match': ['新增功能', '新增特性', 'new features'], 'title': '新增功能 🌟'},
            {'match': ['功能优化', 'improvements'], 'title': '功能优化 🌻'},
            {'match': ['问题修复', 'bug fixes'], 'title': '问题修复 🌴'},
        ],
        'fallback_group': None,
    },
    '1panel': {
        'api': '1panel',
        'targets': {'1': '1panel_versioned_docs/version-v1/changelog.md'},
        'default_target': '1panel-docs/changelog.md',
        'source': 'ul',
        'date_style': 'plain',
        'title_date_blank': True,
        'bullet': '* ',
        'strip_trailing': True,
        'groups': [
            {'match': ['新增功能'], 'title': '**新增功能**'},
            {'match': ['功能优化'], 'title': '**功能优化**'},
            {'match': ['问题修复'], 'title': '**问题修复**'},
        ],
        'fallback_group': None,
    },
    'sqlbot': {
        'api': 'sqlbot',
        'enabled': False,
        'targets': {},
        'default_target': 'sqlbot-docs/changelog.md',
        'source': 'ul',
        'date_style': 'spaced',
        'title_date_blank': True,
        'bullet': '- ',
        'strip_trailing': True,
        'groups': [
            {'match': ['版本概述', '概述'], 'drop': True},
            {'match': ['漏洞修复', '漏洞', 'security fixes'],
             'title': '安全漏洞修复（SQLBot - {dot_date}）', 'style': 'warning'},
            {'match': ['新增功能', '新增特性', '新功能', 'new features'], 'title': '**新增功能 ⭐**'},
            {'match': ['功能优化', '功能改进', 'improvements'], 'title': '**功能优化 🌻**'},
            {'match': ['问题修复', '错误修复', '功能性修复', '修复', 'bug fixes'], 'title': '**问题修复 🌴**'},
        ],
        'fallback_group': None,
    },
    'cordys': {
        'api': 'cordys-crm',
        'targets': {},
        'default_target': 'cordys-docs/changelog.md',
        'source': 'ul',
        'date_style': 'plain',
        'title_date_blank': True,
        'bullet': '- ',
        'strip_trailing': True,
        'quote_normalize': True,
        'groups': [
            {'match': ['新增功能'], 'title': '**新增功能 🌟**'},
            {'match': ['功能优化'], 'title': '**功能优化 🌻**'},
            {'match': ['问题修复'], 'title': '**问题修复 🌴**'},
            {'match': ['安全'], 'title': '**安全 🔐**'},
        ],
        'fallback_group': None,
    },
}

# 版本区块所在位置：文件中第一个 "### vX" 之前
VERSION_HEAD = re.compile(r'^###[ \t]+\S', re.M)
HEAD = re.compile(r'<(h[1-4])[^>]*>(?:<a[^>]*></a>)?(.*?)</\1>', re.S)
A_TAG = re.compile(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', re.S)
LI = re.compile(r'<li[^>]*>(.*?)</li>', re.S)
P = re.compile(r'<p[^>]*>(.*?)</p>', re.S)
BR = re.compile(r'<br\s*/?>', re.I)
EMOJI = re.compile(r'[\u2190-\u27BF\u2B00-\u2BFF\uFE0F\U0001F000-\U0001FAFF]')
NUM_PREFIX = re.compile(r'^\s*[\d.]+\s*')


def fetch(api: str):
    with urllib.request.urlopen(API_BASE.format(api), timeout=30) as r:
        return json.loads(r.read().decode())


def latest_version(api: str) -> str:
    """社区发布列表的第一条即最新版本（列表按发布时间倒序）。"""
    data = fetch(api)
    if not data:
        raise SystemExit(f'{api} 的社区发布列表为空')
    return (data[0].get('version') or '').strip()


def flatten(s: str) -> str:
    """HTML 片段 -> 单行纯文本；<a> 转 markdown 链接。"""
    s = A_TAG.sub(lambda m: '[%s](%s)' % (re.sub(r'<[^>]+>', '', m.group(2)).strip(), m.group(1)), s or '')
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s)
    return re.sub(r'[ \t\u00a0]+', ' ', s).strip()


def norm_title(t: str) -> str:
    """归一化 API 小标题：去编号前缀、去 emoji、统一引号与大小写。"""
    t = t.replace('\u2018', "'").replace('\u2019', "'")
    t = NUM_PREFIX.sub('', t.strip())
    t = EMOJI.sub('', t)
    return re.sub(r'\s+', '', t).lower()


def match_group(cfg: dict, title: str):
    nt = norm_title(title)
    for g in cfg['groups']:
        for k in g['match']:
            if norm_title(k) and norm_title(k) in nt:
                return g
    return None


def split_sections(note: str):
    """按标题切分：返回 [(标题, 标题之后到下一个标题之前的 HTML), ...]"""
    ms = list(HEAD.finditer(note))
    out = []
    for i, m in enumerate(ms):
        title = flatten(m.group(2))
        end = ms[i + 1].start() if i + 1 < len(ms) else len(note)
        out.append((title, note[m.end():end]))
    return out


def parse_ul(note: str):
    """h*/ul/li 结构（dataease / 1panel / sqlbot / cordys）。"""
    sections = []
    for title, body in split_sections(note):
        items = [t for t in (flatten(li) for li in LI.findall(body)) if t]
        if items:
            sections.append((title, items))
    return sections


def parse_br(note: str):
    """h1/p/■/br 结构（maxkb）。每条以「■」起始；首行为标题，其余行为描述。"""
    sections = []
    for title, body in split_sections(note):
        items = []
        for pb in P.findall(body):
            for chunk in re.split(r'■\s*', pb):
                chunk = chunk.strip()
                if not chunk:
                    continue
                lines = [flatten(x) for x in BR.split(chunk)]
                lines = [x for x in lines if x]
                if not lines:
                    continue
                head = lines[0]
                rest = [re.sub(r'^[●•·]\s*', '', x) for x in lines[1:]]
                if rest:
                    desc = ''.join(x if x.endswith(('；', '。', ';', '.')) else x + '；' for x in rest)
                    items.append('%s：%s' % (head, desc.rstrip('；;')))
                else:
                    items.append(head)
        if items:
            sections.append((title, items))
    return sections


def fmt_date(dt: datetime, style: str) -> str:
    if style == 'spaced':
        return f'{dt.year} 年 {dt.month} 月 {dt.day} 日'
    return f'{dt.year}年{dt.month}月{dt.day}日'


def render(prod: str, version: str, dt: datetime, sections, nl: str) -> str:
    cfg = PRODUCTS[prod]
    date_str = fmt_date(dt, cfg['date_style'])
    bullet = cfg.get('bullet', '- ')

    parts = [f'### {version}']
    if cfg.get('title_date_blank', True):
        parts.append('')
    parts.extend([date_str, ''])

    group_blocks = []
    for title, items in sections:
        g = match_group(cfg, title)
        if g is None:
            g = cfg.get('fallback_group')
            if g is None:
                continue
        if g.get('drop'):
            continue

        gt = g.get('title', title).format(dot_date=dt.strftime('%Y.%m.%d'), date=date_str)
        rendered = []
        for it in items:
            if cfg.get('quote_normalize'):
                it = it.replace('「', '“').replace('」', '”')
            if cfg.get('strip_trailing'):
                it = re.sub(r'[；;。.]\s*$', '', it).strip()
            if it:
                rendered.append(bullet + it)
        if not rendered:
            continue

        if g.get('style') == 'warning':
            group_blocks.append(':::warning[%s]\n\n%s\n\n:::' % (gt, '\n'.join(rendered)))
        else:
            group_blocks.append('%s\n\n%s' % (gt, '\n'.join(rendered)))

    if not group_blocks:
        raise ValueError(f'{version} 未生成任何分组（发布说明为空或标题全部未命中）')

    parts.append('\n\n'.join(group_blocks))
    return '\n'.join(parts).replace('\n', nl)


def insert(content: str, block: str, nl: str) -> str:
    """插到文件中第一个版本区块之前（即「更新内容」章节的最前面）。"""
    m = VERSION_HEAD.search(content)
    if m:
        return content[:m.start()] + block + nl + nl + content[m.start():]
    return content.rstrip('\r\n') + nl + nl + block + nl


def sanity_check(version: str, path: Path, content: str) -> None:
    """写入前的护栏：确认 version 与目标文件确实匹配。

    TARGET_MAP 是硬编码的。每次产品做大版本快照后，主目录代表下一个大版本，
    但配置不会自动跟着变；若不检查，旧大版本的补丁会被静默写进新大版本文档。

    规则:
      1. 目标是 *_versioned_docs/version-vX/ 时, X 必须等于 version 的主版本
      2. 目标文件中已出现比 version 更大的主版本 -> 报错(映射漂移的铁证)
      3. 目标文件中既无同主版本、也无更大主版本 -> 只警告(新大版本首发属正常)
    """
    m0 = re.match(r'v(\d+)', version)
    if not m0:
        raise ValueError(f'无法解析主版本号: {version}')
    major = int(m0.group(1))

    m = re.search(r'version-v(\d+)/', str(path).replace('\\', '/'))
    if m and int(m.group(1)) != major:
        raise ValueError(
            f'目标文件 {path} 是 v{m.group(1)} 的版本快照，与 {version} 的主版本不符；'
            f'请检查 targets 配置是否已随版本快照更新')

    majors = {int(x) for x in re.findall(r'^###\s+v(\d+)\.', content, re.M)}
    if not majors:
        print(f'WARNING: {path} 里没有任何版本条目，无法校验路由是否正确', file=sys.stderr)
        return
    if max(majors) > major:
        raise ValueError(
            f'{path} 里已有 v{max(majors)} 的条目(比 {version} 更新)，'
            f'{version} 应写在更旧的版本目录里；targets 配置很可能已过期')
    if major not in majors:
        print(f'WARNING: {path} 里暂无 v{major} 的条目，按新大版本首发处理', file=sys.stderr)


def resolve_target(cfg: dict, version: str):
    m = re.match(r'v(\d+)', version)
    if not m:
        return None
    return Path(cfg['targets'].get(m.group(1), cfg['default_target']))


def find_release(target: str, data):
    for rel in data:
        if (rel.get('version') or '').strip() == target:
            return rel
    base = re.sub(r'-lts$', '', target, flags=re.I)
    for rel in data:
        if re.sub(r'-lts$', '', (rel.get('version') or '').strip(), flags=re.I) == base:
            return rel
    return None


def main() -> int:
    argv = sys.argv[1:]
    dry_run = '--dry-run' in argv
    print_target = '--print-target' in argv
    print_version = '--print-version' in argv
    force = '--force' in argv

    enabled = [k for k, v in PRODUCTS.items() if v.get('enabled', True)]

    if '--list' in argv:
        print('\n'.join(enabled))
        return 0

    pos = [a for a in argv if not a.startswith('--')]

    # --matrix: 输出产品名 JSON 数组（供 workflow 的 matrix 使用）。
    #           带参数时按逗号分隔的白名单过滤，否则输出全部启用产品。
    if '--matrix' in argv:
        raw = pos[0] if pos else ''
        items = [x.strip() for x in raw.split(',') if x.strip()] if raw.strip() else enabled
        bad = [x for x in items if x not in enabled]
        if bad:
            print(f'Unknown or disabled product(s): {", ".join(bad)}', file=sys.stderr)
            return 2
        print(json.dumps(items, ensure_ascii=False))
        return 0

    if not pos:
        print('Usage: gen_changelog_multi.py <product> [<version>] '
              '[--list|--matrix|--print-version|--print-target|--dry-run|--force]',
              file=sys.stderr)
        return 2

    prod = pos[0].strip().lower()
    if prod not in enabled:
        print(f'Unknown or disabled product: {prod!r}. Enabled: {", ".join(enabled)}',
              file=sys.stderr)
        return 2
    cfg = PRODUCTS[prod]

    # --print-version: 带版本参数则回显，否则取社区 API 最新版本（供 workflow 检测用）
    if print_version:
        if len(pos) >= 2 and pos[1].strip():
            raw = pos[1].strip()
            print(raw if raw.startswith('v') else 'v' + raw)
        else:
            print(latest_version(cfg['api']))
        return 0

    if len(pos) < 2:
        print('Version arg required (or use --print-version)', file=sys.stderr)
        return 2

    raw = pos[1].strip()
    if not raw.startswith('v'):
        raw = 'v' + raw
    # 不去 -lts：各产品文档对 -lts 的取舍不同（1panel-v1 保留，其余不带），
    # 直接使用社区 API 的原始版本串最稳妥。
    target = raw

    path = resolve_target(cfg, target)
    if path is None:
        print(f'Cannot parse major version from {target!r}', file=sys.stderr)
        return 2
    if print_target:
        print(path.as_posix())
        return 0
    if not path.exists():
        print(f'Changelog file not found: {path}', file=sys.stderr)
        return 2

    raw_bytes = path.read_bytes()
    nl = '\r\n' if b'\r\n' in raw_bytes else '\n'
    content = raw_bytes.decode('utf-8')

    try:
        sanity_check(target, path, content)
    except ValueError as e:
        print(f'Sanity check failed: {e}', file=sys.stderr)
        return 3

    if not force and re.search(rf'^###\s+{re.escape(target)}\s*$', content, re.M):
        print(f'{target} already exists in {path}, skip.')
        return 0

    rel = find_release(target, fetch(cfg['api']))
    if not rel:
        print(f'Target version {target} not found in community release list', file=sys.stderr)
        return 1

    ts = rel.get('publishTime')
    dt = datetime.fromtimestamp(ts / 1000, tz=TZ) if ts else datetime.now(tz=TZ)
    note = rel.get('releaseNoteH') or ''
    parser = parse_br if cfg['source'] == 'br' else parse_ul
    sections = parser(note)
    if not sections:
        print(f'Empty release notes for {target}', file=sys.stderr)
        return 1

    block = render(prod, target, dt, sections, nl)

    if dry_run:
        print(f'--- dry-run: would insert into {path} ---')
        sys.stdout.write(block)
        sys.stdout.write(nl)
        return 0

    path.write_bytes(insert(content, block, nl).encode('utf-8'))
    print(f'Inserted {target} into {path}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
