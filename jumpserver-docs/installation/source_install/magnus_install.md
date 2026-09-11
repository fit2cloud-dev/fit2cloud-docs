---
title: Magnus 环境部署
---

## 1 Magnus 环境部署
### 1.1 环境要求

- 可以从 [Github][magnus] 网站上获取最新的 [Release][magnus_release] 副本。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  Magnus 下载包</div>

| 操作系统 | 架构类型 | 名称                                                                                         |
| :------ | :------ | :-------------------------------------------------------------------------------------------- |
| Linux   | amd64   | [magnus-v4.10.17-linux-amd64.tar.gz][magnus-v4.10.17-linux-amd64]     |
| Linux   | arm64   | [magnus-v4.10.17-linux-arm64.tar.gz][magnus-v4.10.17-linux-arm64]     |
| Linux   | loong64 | [magnus-v4.10.17-linux-loong64.tar.gz][magnus-v4.10.17-linux-loong64] |
| Darwin  | amd64   | [magnus-v4.10.17-darwin-amd64.tar.gz][magnus-v4.10.17-darwin-amd64]   |
| Darwin  | arm64   | [magnus-v4.10.17-darwin-arm64.tar.gz][magnus-v4.10.17-darwin-arm64]   |


- Magnus 需要使用 Wisp 与 JumpServer 通信，从 [Github][wisp] 网站上获取最新的 [Release][wisp_release] 副本。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  Wisp 下载包</div>

| 操作系统 | 架构类型 | 名称                                                                                       |
| :------ | :------ | :------------------------------------------------------------------------------------------ |
| Linux   | amd64   | [wisp-v4.10.17-linux-amd64.tar.gz][wisp-v4.10.17-linux-amd64]     |
| Linux   | arm64   | [wisp-v4.10.17-linux-arm64.tar.gz][wisp-v4.10.17-linux-arm64]     |
| Linux   | loong64 | [wisp-v4.10.17-linux-loong64.tar.gz][wisp-v4.10.17-linux-loong64] |
| Darwin  | amd64   | [wisp-v4.10.17-darwin-amd64.tar.gz][wisp-v4.10.17-darwin-amd64]   |
| Darwin  | arm64   | [wisp-v4.10.17-darwin-arm64.tar.gz][wisp-v4.10.17-darwin-arm64]   |
| Windows | amd64   | [wisp-v4.10.17-windows-amd64.tar.gz][wisp-v4.10.17-windows-amd64] |

### 1.2 选择部署方式

### Linux/amd64

- 解压缩包。

```bash
cd /opt
wget https://github.com/jumpserver/magnus-release/releases/download/v4.10.17/magnus-v4.10.17-linux-amd64.tar.gz
tar -xf magnus-v4.10.17-linux-amd64.tar.gz
cd magnus-v4.10.17-linux-amd64
```
```bash
wget https://github.com/jumpserver/wisp/releases/download/v4.10.17/wisp-v4.10.17-linux-amd64.tar.gz
tar -xf wisp-v4.10.17-linux-amd64.tar.gz
mv wisp-v4.10.17-linux-amd64/wisp /usr/local/bin/
chown root:root /usr/local/bin/wisp /opt/magnus-v4.10.17-linux-amd64/magnus
chmod 755 /usr/local/bin/wisp /opt/magnus-v4.10.17-linux-amd64/magnus
```

- 修改配置文件。

```bash
cp config_example.yml config.yml
vi config.yml
```
```yaml
# Jumpserver项目的url, api请求注册会使用
CORE_HOST: http://127.0.0.1:8080   # Core 的地址

# Bootstrap Token, 预共享秘钥, 用来注册使用的service account和terminal
# 请和jumpserver 配置文件中保持一致，注册完成后可以删除
BOOTSTRAP_TOKEN: ********  # 和 Core config.yml 的值保持一致

# 服务 bind 地址
BIND_HOST: "0.0.0.0"

# 数据库代理暴露的端口
MYSQL_PORT: 33060
MARIA_DB_PORT: 33061
POSTGRESQL_PORT: 54320

# 日志级别
LOG_LEVEL: "info"

# jumpserver api grpc 组件地址
WISP_HOST: "localhost"
WISP_PORT: 9090
```

- 启动 Wisp。

```bash
export CORE_HOST="http://127.0.0.1:8080"   # Core 的地址
export BOOTSTRAP_TOKEN=********            # 和 Core config.yml 的值保持一致
export WORK_DIR="/opt/magnus-v4.10.17-linux-amd64"
export COMPONENT_NAME="magnus"
export EXECUTE_PROGRAM="/opt/magnus-v4.10.17-linux-amd64/magnus"
wisp
```
    ### Linux/arm64

- 解压缩包。

```bash
cd /opt
wget https://github.com/jumpserver/magnus-release/releases/download/v4.10.17/magnus-v4.10.17-linux-arm64.tar.gz
tar -xf magnus-v4.10.17-linux-arm64.tar.gz
cd magnus-v4.10.17-linux-arm64
```
```bash
wget https://github.com/jumpserver/wisp/releases/download/v4.10.17/wisp-v4.10.17-linux-arm64.tar.gz
tar -xf wisp-v4.10.17-linux-arm64.tar.gz
mv wisp-v4.10.17-linux-arm64/wisp /usr/local/bin/
chown root:root /usr/local/bin/wisp /opt/magnus-v4.10.17-linux-arm64/magnus
chmod 755 /usr/local/bin/wisp /opt/magnus-v4.10.17-linux-arm64/magnus
```

- 修改配置文件。

```bash
cp config_example.yml config.yml
vi config.yml
```
```yaml
# Jumpserver项目的url, api请求注册会使用
CORE_HOST: http://127.0.0.1:8080   # Core 的地址

# Bootstrap Token, 预共享秘钥, 用来注册使用的service account和terminal
# 请和jumpserver 配置文件中保持一致，注册完成后可以删除
BOOTSTRAP_TOKEN: ********  # 和 Core config.yml 的值保持一致

# 服务 bind 地址
BIND_HOST: "0.0.0.0"

# 数据库代理暴露的端口
MYSQL_PORT: 33060
MARIA_DB_PORT: 33061
POSTGRESQL_PORT: 54320

# 日志级别
LOG_LEVEL: "info"

# jumpserver api grpc 组件地址
WISP_HOST: "localhost"
WISP_PORT: 9090
```

- 启动 Wisp。

```bash
export CORE_HOST="http://127.0.0.1:8080"   # Core 的地址
export BOOTSTRAP_TOKEN=********            # 和 Core config.yml 的值保持一致
export WORK_DIR="/opt/magnus-v4.10.17-linux-arm64"
export COMPONENT_NAME="magnus"
export EXECUTE_PROGRAM="/opt/magnus-v4.10.17-linux-arm64/magnus"
wisp
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
