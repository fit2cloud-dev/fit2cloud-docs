# 统一文档门户 —— 本地运行说明

这是一个基于 **Docusaurus 3.10** 的「多产品文档门户」。已内置 4 个产品（1Panel、JumpServer、DataEase、MaxKB），含中英双语、多版本切换、全局搜索。

> 项目目录：`fit2cloud-docs/`（克隆本仓库后获得的文件夹名，即本说明所在目录）
>
> 获取方式：`git clone https://github.com/fit2cloud-dev/fit2cloud-docs.git`

---

## 一、前置要求

| 项 | 要求 |
|---|---|
| Node.js | **`>= 20`**（推荐 20 或 22 LTS；本项目在 Node 26 下运行正常）|
| npm | 随 Node 自带 |
| 网络 | 首次 `npm install` 需能访问 npm 源（国内可用镜像，见下）|

检查版本：

```bash
node -v      # 应为 v20.x / v22.x / v26.x
npm -v
```

---

## 二、安装依赖

项目根目录下执行（先 `cd` 进仓库目录）：

```bash
cd fit2cloud-docs
npm install
```

> 仓库里已带 `package-lock.json`，也可用 `npm ci`（更快、按锁定版本精确安装）。
>
> **国内网络慢/超时**时，用淘宝/清华镜像：
> ```bash
> npm install --registry=https://registry.npmmirror.com
> ```
> （依赖项包含 `@docusaurus/*`、`@easyops-cn/docusaurus-search-local` 等）

---

## 三、本地开发预览（推荐）

```bash
npm start
```

启动后打开 **http://localhost:3000** 。

- 改文档（`1panel-docs/`、`jumpserver-docs/` 等目录下的 `.md`）会**热更新**，改完刷新即可
- 导航栏：顶部「产品文档」下拉可进各产品；右上角语言切换中/英
- 版本切换：进入 1Panel / JumpServer 文档页，右上角出现版本下拉（1Panel: v1/v2；JumpServer: v3.0/v4.0）

---

## 四、生产构建 + 预览

```bash
npm run build     # 构建静态站到 build/
npm run serve     # 本地预览构建产物，默认 http://localhost:3000
```

> 完整本地搜索（中文分词）在 `npm start` 开发模式下功能受限，**建议用 `npm run build` + `npm run serve` 预览**以体验完整全局搜索。

---

## 五、项目里都有什么

| 目录 | 说明 |
|---|---|
| `1panel-docs/` `jumpserver-docs/` `dataease-docs/` `maxkb-docs/` | 各产品的文档源（Markdown）|
| 各产品目录内 `*-docs/sidebars.js` | 各产品侧边栏（已收进各自产品目录，无需在根目录维护）|
| `1panel_versioned_docs/` `jumpserver_versioned_docs/` | 历史版本文档（1Panel v1、JumpServer v3.0）|
| `static/img/` | 仅存门户自身文件：favicon、social-card、logo、undraw 模板图；**产品图片已移到各自产品的 `static/img/<namespace>/`**（通过 `staticDirectories` 聚合到 `/img/`）|
| `src/pages/` `src/css/` | 首页 + 全局样式（fit2cloud 浅蓝渐变主题、footer 淡灰链接）|
| `docusaurus.config.js` | 站点配置（插件实例、多语言、导航、版本声明、`staticDirectories`）|
| `docs/portal-guide.md` | **开发者规范**：如何加入新产品（含图片自包含 + 命名空间约定）|

---

## 六、常见问题

- **`npm start` 报端口占用**：默认 3000，被占用会提示换端口，或另开 `npm start -- --port 4000`。
- **想加新产品文档**：参考 `dataease-docs/`（单版本）或 `1panel-docs/`（带版本）的目录 + `docusaurus.config.js` 里对应插件实例，复制一份改 id / 路径 / 路由即可。加新产品时请一并遵循 `docs/portal-guide.md` 里的「图片自包含 + 命名空间」规范。
- **favicon / 主色 / 背景渐变**：改 `static/img/` 下的图标 + `src/css/custom.css`（主色变量）+ `src/pages/index.module.css`（主页背景）。
