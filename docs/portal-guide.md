---
sidebar_position: 2
---

# 开发者指南：如何加入一个新产品的文档

本文档是门户的**扩展规范**。凡是新增一个产品的文档（含图片），都请按此流程操作，保证
「**每个产品的 git 仓库自包含**」——即该产品的 Markdown 文档和它引用的图片放在同一个
产品文件夹下，而不是堆积到门户根部的 `static/img/`。

> 已落地示例：`1panel-docs/`（current）+ `1panel_versioned_docs/version-v1/` 即按此布局存放图片。

---

## 1. 目录布局约定

```text
<root>/
├── docusaurus.config.js          # 站点配置（staticDirectories 在此维护）
└── <product>-docs/               # 某一个产品的文档仓库（自包含）
    ├── index.md                  # 产品首页
    ├── <章节>.md                 # 各章节文档
    └── static/
        └── img/
            └── <namespace>/      # 本产品的图片（URL 第一段 = namespace）
                └── ai/xxx.png    # 随产品一起走，目录结构随意
```

**版本化产品**（带历史版本）的图片放在版本目录里，同样用 `static/img/<namespace>/`：

```text
<root>/<product>_versioned_docs/
└── version-vN/
    ├── ...md
    └── static/
        └── img/
            └── <product>-vN/     # 历史版本的独立 namespace
```

### 命名空间（namespace）约定
`namespace` 是图片 URL 的第一段，**必须全局唯一**，用于隔离不同产品/版本：

| 场景 | namespace | 示例 |
|---|---|---|
| current（当前/最新版本） | 产品名小写 | `1panel`、`jumpserver` |
| 历史版本 vN | 产品名小写 + `-vN` | `1panel-v1`、`jumpserver-v3` |

- 一个 `namespace` 只能出现在**一个**产品的 static 目录里，否则后注册的目录会覆盖先注册的。
- 跨命名空间即使子路径同名（如 `ai/xxx.png` 在 `1panel` 与 `1panel-v1` 都有）也**不冲突**，
  因为 URL 第一段已区分。

## 2. 图片引用约定
文档里引用本产品图片，**一律用绝对路径**，URL 以 `/img/<namespace>/` 开头：

```markdown
![截图](/img/1panel/ai/agent_list.png)
```

- ❌ 不要在 md 里用相对路径（`./xxx.png`、`../img/...`）——破坏「产品目录可独立成库」。
- ✅ 图片放在 `<product>-docs/static/img/<namespace>/` 下，与 URL 一一对应。

## 3. 注册 staticDirectories（关键一步）
在 `docusaurus.config.js` 顶层数组 `staticDirectories` 的**末尾**追加该产品的 static 目录：

```js
staticDirectories: [
  'static',                              // 必须是第一位（门户自身的 favicon 等）
  '<product>-docs/static',               // 新增：本产品图片 → /img/<namespace>/...
  // 版本化产品再加：
  '<product>_versioned_docs/version-vN/static',
],
```

这样 Docusaurus（build 与 dev）就会把这个目录的内容**平铺映射到站点根**：
`<product>-docs/static/img/<ns>/...` → 网址 `/img/<ns>/...`，URL 不变。

## 4. 放置图片的方式
- **新产品直接放**：把图片放到 `<product>-docs/static/img/<namespace>/` 下，并在 `staticDirectories`
  注册 `<product>-docs/static` 即可，无需脚本。
- **从旧集中式 `static/img/<ns>` 迁移**：手动把 `static/img/<ns>/` 整体复制到
  `<product>-docs/static/img/<ns>/`，然后（确认无误后）删除旧目录 `static/img/<ns>`。
  > 历史迁移脚本 `migrate_img_split.py` 已在 2026-09 清理时一并移出项目（备份在项目外
  > `backup_misc_scripts/`，如需可用可从备份取回）。

## 5. 验证
```bash
npm run clear && npm run build   # 重建
npm run serve                    # 本地预览
```
- 确认 `build/img/<namespace>/` 存在且文件数 = 源图片数。
- 浏览器访问 `/img/<namespace>/<某张图>` 应返回 200（非 404）。
- 确认门户自身的 `build/img/favicon.ico`、`static/img/undraw_*` 等仍在（这些属于门户根 static，勿动）。

## 附：命名空间必须全局唯一（防覆盖）
Docusaurus 的 `staticDirectories` 中，**后注册目录的同路径会覆盖先注册目录**。
门户自身的 `'static'` 排在最前，专门防止产品目录覆盖门户文件（如未来某产品若也放
`static/img/logo.svg` 之类未命名空间命名的文件，会被后注册产品覆盖——所以请务必让
产品图片都带 `namespace` 前缀）。本规范强制 `'static'` 始终为第一项。
