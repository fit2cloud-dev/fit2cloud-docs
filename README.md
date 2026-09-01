# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

**Note**: feel free to use the package manager of your choice.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

本站通过 GitHub Actions 自动部署到**阿里云 OSS**(由阿里云 CDN 前置加速),自定义域名:

`https://docs.fit2cloud.com`

每次 push 到 `main` 分支且文档/配置有改动时,workflow(`.github/workflows/deploy-oss.yml`)会自动:
1. 安装依赖并 `npm run build` 生成静态站点到 `build/`;
2. 用 `ossutil sync` 把 `build/` **全量同步**到 OSS Bucket(本地删除的文件也会从 OSS 删除);
3. 用 `aliyun-cli` 调用 CDN `RefreshObjectCaches` **目录刷新**,强制全站清除旧缓存。

### 首次配置(GitHub Secrets)

在 GitHub 仓库 **Settings → Secrets and variables → Actions → New repository secret** 添加以下 5 个变量:

| Secret 名 | 含义 | 示例 |
|---|---|---|
| `ALIYUN_ACCESS_KEY_ID` | 阿里云 AccessKey ID | `LTAI5t...` |
| `ALIYUN_ACCESS_KEY_SECRET` | 阿里云 AccessKey Secret | `xxxx` |
| `ALIYUN_OSS_ENDPOINT` | OSS 外网 Endpoint | `oss-cn-hangzhou.aliyuncs.com` |
| `ALIYUN_OSS_BUCKET` | OSS Bucket 名称 | `my-docs` |
| `ALIYUN_CDN_DOMAIN` | CDN 加速域名 | `docs.fit2cloud.com` |

> **安全建议**:建议为 CI 单独创建 RAM 子账号,仅授予该 OSS Bucket 的读写权限(`AliyunOSSFullAccess` 可缩小为自定义策略)和 CDN 刷新权限(`AliyunCDNFullAccess` 或自定义 `RefreshObjectCaches`),不要使用主账号 AccessKey。

### 阿里云控制台一次性配置

1. **OSS**:创建 Bucket,开启**静态网站托管**(默认首页 `index.html`)。
2. **OSS 域名**:绑定自定义域名到 Bucket,并上传 HTTPS 证书(如果 CDN 未开启免费 HTTPS)。
3. **CDN**:添加加速域名,回源方式选择 **OSS 域名**;开启 HTTPS 并上传证书(或使用 CDN 免费证书)。

### 手动部署(可选)

想在本机手动同步一次(不经过 GitHub),先安装 [ossutil](https://help.aliyun.com/zh/oss/developer-reference/install-and-configure-ossutil) 并配置 AK,然后:

```bash
npm run build
ossutil sync ./build/ oss://<bucket>/ --delete --update -f
```

### CDN 缓存说明

Docusaurus 生成的静态资源(JS/CSS)文件名带内容哈希,CDN 通常配置为长期缓存;但 **HTML/页面本身**改动后需要刷新缓存。本 workflow 每次部署都会对 CDN 域名根路径做**目录刷新(`Force: true`)**,刷新完成后(约 5~6 分钟)访问即是最新内容。

---

## 本地开发与构建

```bash
npm run start    # 本地开发, 热更新
npm run build    # 构建到 build/
npm run serve    # 本地预览构建产物
```

更多说明见 [RUN-LOCAL.md](RUN-LOCAL.md)、[VERSIONING-GUIDE.md](VERSIONING-GUIDE.md)、[I18N-GUIDE.md](I18N-GUIDE.md)。

