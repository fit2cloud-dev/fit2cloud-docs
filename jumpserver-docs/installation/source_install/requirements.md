---
title: 环境说明
---

:::warning[Windows 平台推荐使用 VSCode 的 Remote SSH 功能在 Linux 上进行编译]

:::
## 1 架构图

- JumpServer 分为多个组件，大致的架构如下图所示，其中 [Lina][lina] 和 [Luna][luna] 为纯静态文件，最终由 [Nginx][nginx] 整合。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/architecture.png" alt="图 1  JumpServer 架构图" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  JumpServer 架构图</div>

## 2 数据库要求

- MySQL 和 MariaDB 二选一即可, JumpServer 需要使用 MySQL 或 MariaDB 存储数据。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  数据库版本要求</div>

| Name    | Core                     | MySQL  | MariaDB | Redis |
| :------ | :----------------------- | :----- | :------ | :---- |
| Version | v4.10.17 | &gt;= 5.7 | &gt;= 10.3 | &gt;= 6.0  |

## 3 部署顺序

1.Core 环境部署

2.Lina 环境部署

3.Luna 环境部署

4.KoKo 环境部署

5.Lion 环境部署

6.Magnus 环境部署

7.Nginx 环境部署

8.JumpServer 环境整合

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
