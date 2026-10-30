---
title: 在线安装
---

## 1 环境要求


**部署服务器要求：**

* 操作系统：支持主流 Linux 发行版本（基于 Debian / RedHat，包括国产操作系统，内核版本要求 ≥ 3.10）
* CPU/内存: 4 核 8 G
* 磁盘空间: 100G

**提示：** 操作系统建议默认使用 Ubuntu 22.04 及以上版本；CentOS 7/8 已停止官方维护，不再提供安全更新。Docker 版本太老可能会导致安装失败，建议使用 v23.0.5 版本及以上的 Docker。

## 2 端口要求


在线部署 Cordys CRM 需要开通的访问端口说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  端口说明</div>

| 端口   | 作用              | 说明                        |
|------|:----------------|:--------------------------|
| 22   | SSH             | 安装、升级及管理使用                |
| 8081 | Web 服务端口        | 默认 Web 服务访问端口，可根据实际情况进行更改 |
| 8082 | MCP Server 服务端口 | 默认 MCP 服务访问端口，可根据实际情况进行更改 |

## 3 在线安装


在配置 Docker 环境的操作系统中，进行以下操作：

```
docker run -d \
--name cordys-crm \
--restart unless-stopped \
-p 8081:8081 \
-p 8082:8082 \
-v ~/cordys:/opt/cordys \
1panel/cordys-crm

```
   
### 3.1 参数说明


 如需调整 MySQL、Redis 等内部组件的配置文件，可直接编辑宿主机目录下的：
  
```
~/cordys/conf/cordys-crm.properties
``` 
```
# 需要修改的配置把前面的 # 号去掉，修改对应的值即可，例如：
logger.sql.level=info
# MySQL 数据库配置，默认使用内置 MySQL
#mysql.embedded.enabled=true
#spring.datasource.url=jdbc:mysql://ip:port/db?autoReconnect=false&useUnicode=true&characterEncoding=UTF-8&characterSetResults=UTF-8&zeroDateTimeBehavior=convertToNull&useSSL=false
#spring.datasource.username=username
#spring.datasource.password=password

# Redis 配置,默认使用内置 Redis
#redis.embedded.enabled=true
#spring.data.redis.host=ip
#spring.data.redis.password=password
#spring.data.redis.port=6379
#spring.session.redis.repository-type=indexed

# SQLBot 默认获取 spring.datasource 配置访问数据库，支持自定义配置只读用户
# sqlbot.datasource.username=Read-only-user
# sqlbot.datasource.password=password

# mcp server settings
#mcp.embedded.enabled=true
#cordys.crm.url=http://127.0.0.1:8081
#spring.mvc.async.request-timeout=60000
#spring.ai.mcp.server.type=ASYNC
#spring.ai.mcp.server.name=cordys-crm-mcp-server

# Streamable Protocol Settings ,default is SSE
#spring.ai.mcp.server.protocol=STREAMABLE
#spring.ai.mcp.server.streamable-http.mcp-endpoint=/sse

# 仪表板外链功能启用白名单,不开启则不限制访问
#dashboard.whitelist.enabled=false
# 白名单开关开启后允许访问的IP地址或域名列表,多个用逗号分隔
#dashboard.whitelist.allowed=

```

## 4 在线升级

### 4.1 停止并移除现有的容器

```
docker stop cordys-crm
docker rm cordys-crm
```

### 4.2 拉取最新的镜像
     

```
docker pull 1panel/cordys-crm
```

### 4.3 重新启动容器

```
docker run -d \
--name cordys-crm \
--restart unless-stopped \
-p 8081:8081 \
-p 8082:8082 \
-v ~/cordys:/opt/cordys \
1panel/cordys-crm
```

**注意:** 升级前做好数据库的备份工作是一个良好的习惯，升级过程中如果发生错误，请参考：[**常见问题排查**](./faq)。

## 5 登录访问


安装成功后即可通过浏览器访问地址 `http://目标服务器 IP 地址:8081`，并使用默认的管理员用户和密码登录 Cordys CRM。

```
用户名：admin

默认密码：CordysCRM
```

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/installation/login.png" alt="图 1  访问 Cordys CRM" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  访问 Cordys CRM</div>

