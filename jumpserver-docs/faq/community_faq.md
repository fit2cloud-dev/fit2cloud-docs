---
title: 常见问题
---

本页汇总 JumpServer 技术交流群中用户咨询频率较高的常见问题及处理方式，内容持续更新。知识库文章与更多资料索引可参阅[产品 FAQ](./faq.md)。

## 1 版本升级

### 1.1 v3、v4 能否直接升级到 v5？

**问题**：v3、v4 各版本能否直接升级到 v5？

**处理方式**：

- **v4 升级 v5**：v4 到 v5 的数据库迁移连续可前滚，v4 各版本可直接升级到 v5，无需额外前置操作。若当前为较早期的 v4.0.0 版本，建议先升级到 v4 最新版本（v4.10.19 LTS）再升级到 v5。
- **v3 升级 v5**：无法一步到位。需先将当前版本升级到 v3 最新版本（v3.10.23 LTS），再升级到 v4，最后升级到 v5，否则会因表结构变更导致升级失败。

详细升级步骤与离线包下载地址，请参阅[升级指南](../installation/setup_linux_standalone/offline_upgrade.md)。

### 1.2 升级到 v5 后页面打不开，提示 400 / 403？

**问题**：升级到 v5 后无法打开页面（登录界面），浏览器提示错误码 400 或 403。

**处理方式**：需要填写 `DOMAINS` 可信任域名。打开 `/opt/jumpserver/config/config.txt`，按实际访问方式配置 `DOMAINS` 字段。v5 中 `DOMAINS` 取值需要带上端口（HTTPS 使用 `443`，HTTP 使用 `80`），多个地址之间使用英文逗号分隔，修改后重启 JumpServer 服务：

```sh
vim /opt/jumpserver/config/config.txt

# 使用域名访问（HTTPS）
DOMAINS="demo.jumpserver.org:443"
# 使用 IP 访问（HTTP）
DOMAINS="172.17.200.191:80"
# 同时使用域名与 IP 访问
DOMAINS="demo.jumpserver.org:443,172.17.200.191:80"

# 重启 JumpServer 服务生效
jmsctl restart
```

- 若服务器为一键安装，且旧版本已使用 JumpServer 开启 HTTPS，则无需修改。
- 使用 IP 地址访问 JumpServer 时，请根据实际网络环境填写公网 IP 或内网 IP。

### 1.3 升级到 v5 后发现没有 lion 组件？

**问题**：v5 的容器编排文件或组件列表中看不到 lion 组件。

**处理方式**：v5 中 lion 的功能已合并到 koko。升级后若组件列表中残留处于离线状态的 lion，可在「系统设置 → 组件列表」中将其删除。

## 2 环境与数据库要求

JumpServer 对操作系统内核、数据库与缓存的版本要求，详见[环境要求](../installation/setup_linux_standalone/requirements.md)。

### 2.1 内核版本低于 4.0 能否升级？

**问题**：机器的 Linux 内核版本低于 4.0，能否升级？

**处理方式**：JumpServer 要求 Linux 内核 >= 4.0（amd64、arm64 架构均为该要求），内核版本低于 4.0 无法直接升级。建议先升级操作系统内核，或将数据迁移至满足要求的机器后再进行升级。

### 2.2 v5 对数据库版本有什么要求？MySQL 5.7 还能继续使用吗？

**问题**：v5 对数据库版本有什么要求？原来使用的 MySQL 5.7 是否还能继续使用？

**处理方式**：v5 要求 MySQL >= 8.0、PostgreSQL >= 16、MariaDB >= 10.6，缓存要求 Redis >= 7.0；安装时默认使用内置的 PostgreSQL 与 Redis。若原环境使用 MySQL 5.7，需先升级到 8.0 及以上版本。
