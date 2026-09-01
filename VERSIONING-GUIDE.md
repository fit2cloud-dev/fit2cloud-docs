# 📘 文档版本操作手册（VERSIONING GUIDE）

> 本手册面向已经启用「历史版本机制」的产品（示例：1Panel：current=v2、历史 v1；JumpServer：current=v4、历史 v3）。
> 涵盖：新增版本、删除版本、仅展示部分历史版本。

---

## 核心概念（先读这一段）

Docusaurus 把一个产品分为两类版本：

- **当前版本（current）**：正在编写的文档，存放于 `<product>-docs/`（可直接增删改）。
- **历史版本（快照）**：某个时刻「定格」下来的文档副本，存放于 `<product>_versioned_docs/version-xxx/`，通常不再修改。

**"新版本发布" = 把当前版本快照成一个历史版本，然后让 `<product>-docs/` 开始编写新内容。**

---

## 〇、命令速查（针对本项目）

本项目里每个产品是一个独立的 `plugin-content-docs` 插件实例（`id = 1panel / jumpserver / dataease / maxkb`），因此版本化命令带 `<产品id>`：

```bash
# 给 1Panel 创建/新增一个历史版本（把当前 1panel-docs 内容快照成 version-vN）
npx docusaurus docs:version:1panel <版本名>

# 给 JumpServer 创建/新增一个历史版本
npx docusaurus docs:version:jumpserver <版本名>
```

（默认 `docs:` 那套只用于门户自身。产品一律用 `docs:version:<产品id>`。）

`docs:version` 会自动：
- 把当前 `<product>-docs/` 的内容**复制**到 `<product>_versioned_docs/version-<版本名>/`
- 从 `sidebarPath` 生成 `<product>_versioned_sidebars/version-<版本名>-sidebars.json`
- 把 `<版本名>` 追加进 `<product>_versions.json`

---

## 一、新增一个版本（把 current 定格成历史版本）

以 1Panel 为例（当前 `1panel-docs/` = v2，历史已有 v1）。把当前 v2 定成历史版本：

```bash
npx docusaurus docs:version:1panel v2
```

生成结果：
- `1panel_versioned_docs/version-v2/`（v2 完整快照）
- `1panel_versioned_sidebars/version-v2-sidebars.json`
- `1panel_versions.json` → `["v2","v1"]`

之后：
1. 在 `<product>-docs/` 里填入**新版本**内容（旧内容已进快照，源码可清空/替换）。
2. 更新 `docusaurus.config.js` 里该产品的 `versions`（见下方「versions 配置」）。

---

## 二、发布 v3 时把 v2 降为历史版本（v2 → v3 场景）

目标：v3 变当前，v2 归入历史（和 v1 一起列在版本下拉）。

1. **先把当前 v2 快照成历史 v2**（若还没有 v2 快照）：
   ```bash
   npx docusaurus docs:version:1panel v2
   ```
2. **清空 `1panel-docs/` 填入 v3 内容**（保留 `sidebars.js`、`static/`）。
3. **更新 `docusaurus.config.js`** 里 1Panel 的 `versions`：
   ```js
   lastVersion: 'current',
   versions: {
     current: { label: 'v3', badge: false, banner: 'none' },
     v2: { label: 'v2', badge: false, banner: 'none' },
     v1: { label: 'v1', badge: false, banner: 'none' },
   },
   ```
4. **图片命名空间**：历史版本 `version-v2/static/img/` 里的图片命名空间需与其它版本隔离（约定 `<product>-vN`，详见 `docs/portal-guide.md` 命名空间章节），若有冲突请同步调整 md 里的 `/img/...` 引用。
5. **`staticDirectories`**：历史版本图片若要聚合到 `/img/`，追加其 static 目录（见 `docusaurus.config.js` 里 `staticDirectories`）。
6. 本地验证：`npm run clear && npm run build && npm run serve`，访问 `/1panel/` 看版本下拉是否出现 v3 / v2 / v1。

---

## 三、删除一个版本（⚠️ 无快捷命令）

**Docusaurus 没有提供"删除版本"的命令**（只有新增的 `docs:version`）。删除需要**手动清理 4 处**，否则 `versions.json` 里仍登记着该版本，构建时会报「docs folder does not exist」（常见错误）。

> 一个版本由 4 处组成，**必须一起删**：

| # | 组成 | 路径（以删 1Panel 的 v2 为例） |
|---|------|--------------------------------|
| ① | 版本文档快照 | `1panel_versioned_docs/version-v2/` |
| ② | 版本侧边栏 | `1panel_versioned_sidebars/version-v2-sidebars.json` |
| ③ | 版本登记 | `1panel_versions.json` 里的 `"v2"` |
| ④ | 版本显示配置 | `docusaurus.config.js` → `versions` 里的 `v2: {...}` |

### 删除步骤（以删 1Panel v2 为例）

```bash
# 1. 删版本文档快照
rm -rf 1panel_versioned_docs/version-v2

# 2. 删版本侧边栏
rm -f 1panel_versioned_sidebars/version-v2-sidebars.json

# 3. 编辑 1panel_versions.json，移除 "v2"，只保留历史里还存在的版本，例如：
#    ["v2","v1"]  →  ["v1"]

# 4. 编辑 docusaurus.config.js，在 1Panel 的 versions 里删掉 v2 那行
```

### 删除后验证

```bash
npm run clear && npm run build   # 应成功，无 "does not exist" 错误
npm run serve                    # 版本下拉不应再出现 v2
```

> 💡 **只删 ①②，漏了 ③ 是"删除不干净"最常见的原因**——`versions.json` 仍声明 v2 存在，但目录没了 → Docusaurus 启动报错。所以 **③④ 一定要同步删**。

---

## 四、仅展示部分历史版本（onlyIncludeVersions）

如果历史版本很多，只想在版本切换器里显示最近几个（其余历史数据仍构建，但不在切换器显示）：

```js
versions: { ... },
onlyIncludeVersions: ['v3', 'v2'],   // 只显示 v3、v2
```

---

## 五、versions 配置速查（docusaurus.config.js）

```js
['@docusaurus/plugin-content-docs', {
  id: '1panel',
  path: '1panel-docs',
  routeBasePath: '1panel',
  sidebarPath: '1panel-docs/sidebars.js',
  lastVersion: 'current',
  versions: {
    current: { label: 'v3', badge: false, banner: 'none' },   // "当前"版本的显示名
    v2: { label: 'v2', badge: false, banner: 'none' },         // 历史版本 v2
    v1: { label: 'v1', badge: false, banner: 'none' },         // 历史版本 v1
  },
}],
```

- `versions.current` 的 `label` = 当前版本在切换器里显示的名字。
- 历史版本写在 `versions` 里，需要与 `versions.json` + `_versioned_docs/version-XXX/` 一一对应。

---

## 六、注意事项

1. `docs:version` 会生成**大量文件**（整份 current → 版本快照），操作后先本地 build 验证。
2. **图片命名空间必须全局唯一**，历史版本宜用 `<product>-vN`（详见 `docs/portal-guide.md`）。
3. **不要直接 git push**：改完先本地审核。本项目约定：未经维护者确认，不自动推送到 GitHub。
