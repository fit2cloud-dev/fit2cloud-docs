# 🌐 多语言 / 英文化指南（I18N-GUIDE）

> 本手册说明：门户站点目前声明支持 `zh-Hans` 与 `en`，但**产品文档的英文正文还没有**。
> 这里讲清楚「英文文档到底怎么做」，以及它与 `i18n/` 目录的关系。

---

## 0. 一句话结论（先记住）

**产品文档的英文＝在中文文档旁边放一个同名的 `.en.md` / `.en.mdx` 文件。**
英文正文不放在 `i18n/` 里，而是和来源文档放同一目录，靠 `文件名.en.md` 后缀区分语言。

---

## 1. 两条不同的多语言路径（最容易混淆）

| 路径 | 管什么 | 放哪 | 文件后缀 |
|------|--------|------|----------|
| **界面/主题翻译** | 按钮、菜单、footer 文字 | `i18n/<locale>/` | `.json` |
| **文档正文翻译** | 产品文档的实际内容 | 产品文档目录（`1panel-docs/` 等） | `.en.md` / `.en.mdx` |

**文档正文的英文版，走第二条，不进 `i18n/`。**

---

## 2. `i18n/` 里到底装什么（别往这塞产品英文）

当前 `i18n/` 只有界面用：

```
i18n/
├── en/
│   ├── code.json                                              # 界面字符串(标题/按钮)
│   ├── docusaurus-theme-classic/navbar.json                   # 导航翻译
│   ├── docusaurus-theme-classic/footer.json                   # 页脚翻译
│   └── docusaurus-plugin-content-docs/current/intro.mdx       # 门户帮助中心 intro 英文版(可选)
└── zh-Hans/                                                   # 同构
```

> `i18n/en/docusaurus-plugin-content-docs/` 这个目录只用于**门户自己帮助中心**那类页面。
> **1Panel / JumpServer 等产品文档的英文，不属于这里**，而是 `1panel-docs/*.en.md`。

---

## 3. 产品文档的英文化怎么做（以 1Panel 首页为例）

在中文文件旁边放置同名英文文件：

```
1panel-docs/
├── index.md          # 中文版（默认 zh-Hans）
└── index.en.md       # 英文版（en locale）
```

- 中文站 `/1panel/` → 渲染 `index.md`
- 英文站 `/en/1panel/` → 渲染 `index.en.md`

每个目录下的每篇文档，都要独立加一份 `.en.md`。例如：

```
1panel-docs/user-manual/ai/agent.md       →  加 agent.en.md
1panel-docs/user-manual/ai/agent.en.md
```

---

## 4. 具体操作步骤

1. **复制**中文文档为英文名：`cp agent.md agent.en.md`
2. **改 frontmatter 和正文为英文**（`title`、`description` 等也翻译）。
3. **图片路径不变**（图片不因语言区分）：`![..](/img/1panel/...)` 原样保留。
4. 需要的话可加 `id` 或 `slug` 覆盖（可选）。
5. 重复，直到需翻译的文档都有 `.en.md`。

---

## 5. ⚠️ 成本与工作量（先说清楚）

- 1Panel 有 **138 篇** 文档（不含 v1 版本快照、不含 JumpServer 等其它产品）。
- **每一篇都要单独一份 `.en.md`**，等于内容维护量约翻倍。
- 当前**一篇英文都还没有**。要全套英文化≈**几百篇逐篇翻译**，是很大的工程。

**建议**：先做 1 个栏目／1 篇文档做样板，跑通英文站效果，再决定是否全量。

**内容来源**：可人工逐篇翻译，或先用机器翻译生成初稿再人工校对（推荐后者，省时）。

---

## 6. 验证

```bash
npm run clear && npm run build && npm run serve
```
- 切到英文区 `/en/1panel/` → 应显示 `.en.md` 的内容（中文版不显示英文）。
- 检查侧边栏、导航切换英文后正常。

---

## 7. 与版本手册关系

如果某产品还分了版本（current / v1…），要英文化**每个版本**的内容，即：
- current 英文：`1panel-docs/user-manual/xx.en.md`
- 版本化英文：`1panel_versioned_docs/version-v1/user-manual/xx.en.md`
- （版本化翻译也可放在 `i18n/en/docusaurus-plugin-content-docs-1panel/` 用较复杂方式，但**推荐直接 `.en.md`**，更直观。）

> 版本化本身见 `VERSIONING-GUIDE.md`。
