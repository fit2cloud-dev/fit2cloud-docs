# Markdown Docs to PDF Action

把仓库内指定的 Docusaurus Markdown 目录转换成单个 PDF，并通过 GitHub Actions Artifact 下载。

## 使用方式

在 GitHub 仓库页面进入 **Actions -> Generate Documentation PDF -> Run workflow**，填写：

- `docs_dir`：仓库内目录，例如 `dataease-docs`、`dataease_versioned_docs/version-v2`
- `output_name`：可选，留空则自动生成
- `title`：可选，留空则按产品目录推断
- `toc_depth`：目录层级，支持 2、3、4
- `image_max_width`：图片最大像素宽度，`0` 表示不缩放
- `exclude`：可选，需要排除的文档（相对 `docs_dir`，逗号或换行分隔，支持 `*`、`**` 通配）。用于跳过 Web 首页式 MDX 页，例如新版 DataEase 的 `product_landing.md`

运行完成后，在本次运行的 **Artifacts** 区域下载 `docs-pdf-*`；Job Summary 中会显示文件名、大小和 SHA256。

## 实现链路

1. `prepare_docs.py` 扫描指定目录，只复制 Markdown/MDX 和正文实际引用的图片。
2. `.mdx` 临时改为 `.md`，移除顶层 ESM import/export。
2.1 按 `exclude` 过滤文档（复制、取图、生成导航前生效；侧栏里的排除项会自动丢弃）。
2.2 降级无法还原的 JSX：删除 `{/* 注释 */}`、把 `<Link to="x">文本</Link>` 转成 `<a href="x">文本</a>`；仍残留的 `<Tabs>`/`<TabItem>`/`<DocCardList>`/`className={}` 会打印告警提示用 `exclude` 排除。
3. Docusaurus `:::warning[标题]` 转成 MkDocs admonition。
4. `/img/...` 优先从 `<docs_dir>/static/img/...` 解析，图片复制到临时 `_assets/`。
5. 读取产品 `sidebars.js` 或版本化 JSON 侧边栏，生成 MkDocs `nav`。
6. 使用仓库内置的定制 `mkdocs-to-pdf` 插件，经 WeasyPrint 输出 PDF。
7. 上传 PDF Artifact，不提交、不推送任何文件。

## 边界

- 这是 Markdown 导出方案，不执行 Docusaurus/React 组件。Tabs、MDX 自定义 JSX、客户端 JavaScript 内容无法完整还原。
- 外部 iframe、视频和需要登录的远程资源不会可靠写入 PDF。
- DataEase v3.2.0 首页 `product_landing.md` 是 Web 卡片式 MDX，与侧边栏重复，建议用 `exclude=product_landing.md` 排除。
- GIF/WebP 会取静态帧；超宽图片可缩放到指定宽度。
- 首次正式使用仍应手动跑一次，重点检查目录顺序、中文字体、表格宽度、代码块和图片清晰度。