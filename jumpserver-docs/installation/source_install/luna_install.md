---
title: Luna 环境部署
---

## 1 Luna 组件概述

[Luna][luna] 是 JumpServer 的前端 UI 项目，主要使用 [Angular CLI][angular_cli] 完成。

### 1.1 环境要求

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  Luna 环境要求</div>

| Name    | Luna                     | Node  |
| :------ | :----------------------- | :---- |
| Version | v4.10.17 | 16.5 |

### 1.2 选择部署方式

### 源代码部署

- 下载源代码。
- 可以从 [Github][luna] 网站上获取最新的 [Release][core_release] 副本。这些版本是最新代码的稳定快照，从项目网站下载 Source code.tar.gz 源代码，通过命令行中提取该存档：

```bash
cd /opt
mkdir /opt/luna-v4.10.17
wget -O /opt/luna-v4.10.17.tar.gz https://github.com/jumpserver/luna/archive/refs/tags/v4.10.17.tar.gz
tar -xf luna-v4.10.17.tar.gz -C /opt/luna-v4.10.17 --strip-components 1
```

- 安装 Node。
- 从 [Node][node] 官方网站参考文档部署 Node.js，请根据 [环境要求](#_10)，通过命令行中判断是否安装完成：

```bash
node -v
```
`v16.5`

- 安装依赖。

```bash
cd /opt/luna-v4.10.17
yarn install
```

- 修改配置文件。

```bash
sed -i "s@[0-9].[0-9].[0-9]@@g" src/environments/environment.prod.ts
vi proxy.conf.json
```
```yaml
{
  "/koko": {
    "target": "http://localhost:5000",  # KoKo 地址
    "secure": false,
    "ws": true
  },
  "/media/": {
    "target": "http://localhost:8080",  # Core 地址
    "secure": false,
    "changeOrigin": true
  },
  "/api/": {
    "target": "http://localhost:8080",  # Core 地址
    "secure": false,                    # https ssl 需要开启
    "changeOrigin": true
  },
  "/core": {
    "target": "http://localhost:8080",  # Core 地址
    "secure": false,
    "changeOrigin": true
  },
  "/static": {
    "target": "http://localhost:8080",  # Core 地址
    "secure": false,
    "changeOrigin": true
  },
  "/lion": {
    "target": "http://localhost:9529",  # Lion 地址
    "secure": false,
    "pathRewrite": {
      "^/lion/monitor": "/monitor"
    },
    "ws": true,
    "changeOrigin": true
  },
  "/omnidb": {
    "target": "http://localhost:8082",
    "secure": false,
    "ws": true,
    "changeOrigin": true
  }
}
```

- 运行 Luna。

```bash
./node_modules/.bin/ng serve
```

- 构建 Luna。

```bash
yarn build
cp -R src/assets/i18n luna/
cp -rf luna luna-v4.10.17
tar -czf luna-v4.10.17.tar.gz luna-v4.10.17
```


### 使用 Release

- 下载 Release 文件，从 [Github][luna] 网站上获取最新的 [Release][luna_release] 副本。
- 这些版本是最新代码的稳定快照。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  Luna 下载包</div>

| OS     | Arch  | Name                                                          |
| :----- | :---- | :------------------------------------------------------------ |
| All    | All   | [luna-v4.10.17.tar.gz][luna-v4.10.17] |

```bash
cd /opt
wget https://github.com/jumpserver/luna/releases/download/v4.10.17/luna-v4.10.17.tar.gz
tar -xf luna-v4.10.17.tar.gz
```
[nginx]: http://nginx.org/
[lina]: https://github.com/jumpserver/lina/
[vue]: https://cn.vuejs.org/
[element_ui]: https://element.eleme.cn/
[luna]: https://github.com/jumpserver/luna/
[angular_cli]: https://github.com/angular/angular-cli
[core]: https://github.com/jumpserver/jumpserver/
[django]: https://docs.djangoproject.com/
[gunicorn]: https://gunicorn.org/
[celery]: https://docs.celeryproject.org/
[flower]: https://github.com/mher/flower/
[daphne]: https://github.com/django/daphne/
[github]: https://github.com/
[core_release]: https://github.com/jumpserver/jumpserver/releases/tag/v4.10.17
[python]: https://www.python.org/downloads/
[linux_packages]: http://nginx.org/en/linux_packages.html
[lina_release]: https://github.com/jumpserver/lina/releases/tag/v4.10.17
[node]: https://nodejs.org/
[luna_release]: https://github.com/jumpserver/luna/releases/tag/v4.10.17
[koko_release]: https://github.com/jumpserver/koko/releases/tag/v4.10.17
[go]: https://golang.google.cn/
[koko]: https://github.com/jumpserver/koko
[koko_release]: https://github.com/jumpserver/koko/releases/tag/v4.10.17
[lion]: https://github.com/jumpserver/lion-release
[lion_release]: https://github.com/jumpserver/lion-release/releases/tag/v4.10.17
[guacamole]: http://guacamole.apache.org/
[apache]: http://www.apache.org/
[guacamole-server]: https://github.com/apache/guacamole-server
[building-guacamole-server]: http://guacamole.apache.org/doc/gug/installing-guacamole.html#building-guacamole-server
[guacd-1.4.0]: http://download.jumpserver.org/public/guacamole-server-1.4.0.tar.gz
[wisp]: https://github.com/jumpserver/wisp
[wisp_release]: https://github.com/jumpserver/wisp/releases/tag/v4.10.17
[magnus]: https://github.com/jumpserver/magnus-release
[magnus_release]: https://github.com/jumpserver/magnus-release/releases/tag/v4.10.17
[lina-v4.10.17]: https://github.com/jumpserver/lina/releases/download/v4.10.17/lina-v4.10.17.tar.gz
[luna-v4.10.17]: https://github.com/jumpserver/luna/releases/download/v4.10.17/luna-v4.10.17.tar.gz
[koko-v4.10.17-linux-amd64]: https://github.com/jumpserver/koko/releases/download/v4.10.17/koko-v4.10.17-linux-amd64.tar.gz
[koko-v4.10.17-linux-arm64]: https://github.com/jumpserver/koko/releases/download/v4.10.17/koko-v4.10.17-linux-arm64.tar.gz
[koko-v4.10.17-linux-loong64]: https://github.com/jumpserver/koko/releases/download/v4.10.17/koko-v4.10.17-linux-loong64.tar.gz
[koko-v4.10.17-darwin-amd64]: https://github.com/jumpserver/koko/releases/download/v4.10.17/koko-v4.10.17-darwin-amd64.tar.gz
[koko-v4.10.17-darwin-arm64]: https://github.com/jumpserver/koko/releases/download/v4.10.17/koko-v4.10.17-darwin-arm64.tar.gz
[lion-v4.10.17-linux-amd64]: https://github.com/jumpserver/lion-release/releases/download/v4.10.17/lion-v4.10.17-linux-amd64.tar.gz
[lion-v4.10.17-linux-arm64]: https://github.com/jumpserver/lion-release/releases/download/v4.10.17/lion-v4.10.17-linux-arm64.tar.gz
[lion-v4.10.17-linux-loong64]: https://github.com/jumpserver/lion-release/releases/download/v4.10.17/lion-v4.10.17-linux-loong64.tar.gz
[lion-v4.10.17-darwin-amd64]: https://github.com/jumpserver/lion-release/releases/download/v4.10.17/lion-v4.10.17-darwin-amd64.tar.gz
[lion-v4.10.17-windows-amd64]: https://github.com/jumpserver/lion-release/releases/download/v4.10.17/lion-v4.10.17-windows-amd64.tar.gz
[magnus-v4.10.17-linux-amd64]: https://github.com/jumpserver/magnus-release/releases/download/v4.10.17/magnus-v4.10.17-linux-amd64.tar.gz
[magnus-v4.10.17-linux-arm64]: https://github.com/jumpserver/magnus-release/releases/download/v4.10.17/magnus-v4.10.17-linux-arm64.tar.gz
[magnus-v4.10.17-linux-loong64]: https://github.com/jumpserver/magnus-release/releases/download/v4.10.17/magnus-v4.10.17-linux-loong64.tar.gz
[magnus-v4.10.17-darwin-amd64]: https://github.com/jumpserver/magnus-release/releases/download/v4.10.17/magnus-v4.10.17-darwin-amd64.tar.gz
[magnus-v4.10.17-darwin-arm64]: https://github.com/jumpserver/magnus-release/releases/download/v4.10.17/magnus-v4.10.17-darwin-arm64.tar.gz
[wisp-v4.10.17-linux-amd64]: https://github.com/jumpserver/wisp/releases/download/v4.10.17/wisp-v4.10.17-linux-amd64.tar.gz
[wisp-v4.10.17-linux-arm64]: https://github.com/jumpserver/wisp/releases/download/v4.10.17/wisp-v4.10.17-linux-arm64.tar.gz
[wisp-v4.10.17-linux-loong64]: https://github.com/jumpserver/wisp/releases/download/v4.10.17/wisp-v4.10.17-linux-loong64.tar.gz
[wisp-v4.10.17-darwin-amd64]: https://github.com/jumpserver/wisp/releases/download/v4.10.17/wisp-v4.10.17-darwin-amd64.tar.gz
[wisp-v4.10.17-darwin-arm64]: https://github.com/jumpserver/wisp/releases/download/v4.10.17/wisp-v4.10.17-darwin-arm64.tar.gz
[wisp-v4.10.17-windows-amd64]: https://github.com/jumpserver/wisp/releases/download/v4.10.17/wisp-v4.10.17-windows-amd64.tar.gz
