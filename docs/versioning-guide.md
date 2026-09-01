---
sidebar_position: 3
---

# 文档版本操作手册（如何新增版本 / 如何把当前版本降级为历史版本）

本手册面向已上线历史版本机制的产品（如 1Panel：current=v2、历史 v1；JumpServer：current=v4、历史 v3）。

> 核心概念：Docusaurus 的「当前版本」(current) 是**正在编写的**那份（`<product>-docs/`）；历史版本是**快照**（存在 `<product>_versioned_docs/version-xxx/`）。「新版本发布」= 把 current **快照**成一个历史版本，再让 `<product>-docs/` 开始编写新内容。

---

## 〇、命令速查（针对本项目）

本项目每个产品是一个独立的 `plugin-content-docs` 实例（id = `1panel` / `jumpserver` …）。
因此版本化命令是 **`docs:version:<pluginId>`**（非默认插件），用法：

```bash
# 给 1Panel 创建新历史版本
npx docusaurus docs:version:1panel <版本名>

# 给 JumpServer 创建新历史版本
npx docusaurus docs:version:jumpserver <版本名>
```

> 默认（门户自身 `docs/`）才是 `npx docusaurus docs:version`。产品一律带 `:插件id` 后缀。

命令会自动：
- 把当前 `<product>-docs/` 的内容**复制**到 `<product>_versioned_docs/version-<版本名>/`
- 从 `sidebarPath` 生成 `<product>_versioned_sidebars/version-<版本名>-sidebars.json`
- 把 `<版本名>` 追加进 `<product>_versions.json`

---

## 一、场景：现有版本是 v2，v3 发布后把 v2 归入历史版本区

以 1Panel 为例（当前 `1panel-docs/` = v2，历史已有 v1）。目标：**v3 变当前，v2 降为历史**（和 v1 一起列在历史版本下拉里）。

### 第 1 步：确认当前内容=要归档的 v2
`1panel-docs/` 里的内容应是 v2 的**最终版**（因为要把它快照成历史 v2）。

### 第 2 步：生成历史版本快照（可选，若已有 v2 快照则跳过）
如果 v1 时代归档时没做过 v2 快照，现在补一个 v2 快照：

```bash
npx docusaurus docs:version:1panel v2
```

这会生成 `1panel_versioned_docs/version-v2/` 和 `1panel_versioned_sidebars/version-v2-sidebars.json`，
并把 `1panel_versions.json` 变成 `["v2","v1"]`。

### 第 3 步：清空/替换当前目录，填入 v3 内容
- 清空 `1panel-docs/` 下**除** `sidebars.js`、`static/` 以外的文档内容，或直接放新的 v3 正文。
- 保留 `1panel-docs/static/img/1panel/`（当前版本图片命名空间仍叫 `1panel`）。
- **历史版本的图片命名空间**：v2 的快照里图片仍在 `1panel_versioned_docs/version-v2/static/img/1panel/`，
  但 namespace 应体现版本以隔离。若需要，把快照里的图保持 `1panel` 也可（因为 URL 前缀相同），
  但**若担心冲突**，历史版本宜用 `<product>-vN` 命名空间（见 portal-guide.md 命名空间约定）。

  > ⚠️ 快照是**直接复制** current 内容，包括 `static/`。若 `docs:version` 生成的版本目录里，图片命名空间与另一版本冲突，请按命名空间规范调整 `version-v2/static/img/` 里的子目录名，并同步 md 里的 `/img/...` 引用。

### 第 4 步：更新 `docusaurus.config.js` 的 versions 配置
把 1Panel 插件配置里的 `versions` 更新为：

```js
lastVersion: 'current',
versions: {
  current: { label: 'v3', badge: false, banner: 'none' },
  v2: { label: 'v2', badge: false, banner: 'none' },
  v1: { label: 'v1', badge: false, banner: 'none' },
},
```

- `current` 的 label 改成 `v3`（表示当前版本 v3）。
- `v2`、`v1` 都保留在历史版本区。
- 若某版本不想在切换器显示，可删掉对应项或用 `onlyIncludeVersions` 控制（见下文"仅展示部分历史版本"）。

### 第 5 步：更新 `staticDirectories`（如需历史版本图片）
`staticDirectories` 里若想让 `version-v2/static` 也被聚合到 `/img/`，追加：
```js
staticDirectories: [
  'static',
  '1panel-docs/static',
  '1panel_versioned_docs/version-v1/static',
  '1panel_versioned_docs/version-v2/static',   // 新增
],
```

### 第 6 步：本地验证
```bash
npm run clear && npm run build   # 应成功
npm run serve
```
- 访问 `/1panel/` → 默认 v3；右上角版本下拉应有 v3 / v2 / v1。
- 抽查 `/1panel/v2/xxx`、`/1panel/v1/xxx` 均 200。

---

## 二、场景：给一个产品新增历史版本（不改 current 内容）

比如 JumpServer 现在有 current + v3，要为某个中间版本补快照，或给 current 打一个新版本名：

```bash
# 把 JumpServer 当前内容快照为新版本（比如说 v3.5）
npx docusaurus docs:version:jumpserver v3.5
```
之后在 `docusaurus.config.js` 的 `versions` 里加上 `v3.5` 的 label 即可。

---

## 三、仅展示部分历史版本（onlyIncludeVersions）

若历史版本很多，只想在切换器里显示最近几个：

```js
versions: { ... },
onlyIncludeVersions: ['v3', 'v2'],   // 只显示这些；其余历史版本数据仍会构建但不在切换器
```

---

## 四、注意事项

1. **改动会生成大量文件**（整份 current → 版本目录快照），改动后**先本地 build 验证**，确认无误。
2. **图片命名空间隔离**：新增一个历史版本时，留意其 `static/img/` 的 namespace 是否与现有版本重名，
   遵循 portal-guide.md 的「命名空间全局唯一」约定，必要时应改成 `<product>-vN`。
3. **不要直接 git push**：改完先给门户维护者审核，仓库默认推送到 GitHub 前需确认（本项目约定：未经本地审核不自动 push）。
