---
title: 常见问题
---

本页汇总 Cordys CRM 技术交流群中用户咨询频率较高的常见问题及处理方式，内容持续更新。

## 1 安装部署

### 1.1 2核2G服务器能跑Cordys CRM吗？

**问题**：2核2G或2核4G的轻量服务器能否运行Cordys CRM？

**处理方式**：

官方推荐配置为 **4 核 8G**（磁盘建议 100G）。2核2G 配置过低，不建议用于生产环境。2核4G 配置仅适用于个人学习或单人测试，多人并发访问时内存占用较高，体验较差。生产环境请按官方要求使用 4 核 8G 及以上配置。

详细安装要求请参阅[离线安装指南](../installation/offline_installtion.md)

### 1.2 离线部署时数据库在哪里？

**问题**：使用离线安装包部署 Cordys CRM 时，内置的 MySQL 数据库数据文件位于哪里？

**处理方式**：

离线安装包默认启用内置 MySQL（`CORDYS_EXTERNAL_MYSQL=false`）。数据文件目录为容器内 `/opt/cordys/data/mysql`，默认持久化到宿主机 **`/opt/cordys/data/mysql`**（由 `install.conf` 中的 `CORDYS_BASE` 决定，默认 `CORDYS_BASE=/opt`，即宿主机路径为 `${CORDYS_BASE}/cordys`）。

说明：

- 若安装时修改了 `CORDYS_BASE`，请按实际安装路径查找。
- 若启用了外置数据库（`CORDYS_EXTERNAL_MYSQL=true`），数据不在上述目录，而在外部数据库中。
- 在线 Docker 一键安装的默认挂载是 `~/cordys:/opt/cordys`，与离线包默认路径不同，请勿混淆。

### 1.3 Cordys CRM 有 ARM 版本吗？

**问题**：社区版是否提供 ARM 架构的镜像？

**处理方式**：

**问题**：Cordys CRM 社区版是否支持 ARM 架构（如 Apple M1/M2/M3、树莓派）？

**处理方式**：

社区版镜像仅支持 amd64（x86_64），暂不支持 ARM；ARM 版本仅企业版提供。

### 1.4 如何通过 1Panel 部署 Cordys CRM？

**问题**：想用 1Panel 面板一键安装 Cordys CRM，具体怎么部署？

**处理方式**：

先在服务器上完成 1Panel 的安装部署，进入 1Panel 应用商店，在应用详情页选择最新的 Cordys CRM 版本进行安装，设置名称、管理员用户名与密码，端口1 设为 8081、端口2 设为 8082，并打开端口外部访问。安装完成后通过 `http://目标服务器 IP 地址:8081` 访问，默认管理员用户名为 admin、密码为 CordysCRM。

详细步骤请参阅[1Panel 安装](../installation/1panel_installtion.md)

## 2 系统集成与权限

### 2.1 企查查对接提示接口未开通怎么办

**问题**：在 Cordys CRM 中对接企查查时，提示接口未开通，应该如何处理？

**处理方式**：

该提示通常来自企查查开放平台侧，表示当前账号尚未开通 Cordys CRM 所需的 API 接口（如企业模糊搜索 `FuzzySearch/GetList`、企业信息核验 `EnterpriseInfo/Verify` 等）。请前往[企查查开放平台](https://openapi.qcc.com/)申请并开通对应接口权限，获取 AccessKey、SecretKey 后，在 Cordys CRM 系统设置的企查查集成中填写地址（默认 `https://api.qichacha.com`）、AccessKey 与 SecretKey，保存后再测试连接。

### 2.2 WorkBuddy 接入后能看到谁的客户？

**问题**：WorkBuddy 接入 Cordys CRM 后，销售查询到的是自己名下的客户，还是所有销售名下的客户？多人共用同一个 API Key 会怎样？

**处理方式**：

权限跟着 Cordys CRM 里的账号走。每个人使用自己的 API Key 时，只能看到自己名下的客户信息；如果其他销售共用销售老大的 API Key，则大家都能查询到该账号权限范围内的所有客户信息。

## 3 常见使用与配置咨询

### 3.1 联系人重复导入后如何批量清空？

**问题**：联系人被重复导入多次，想一次性清空大量重复数据，但每次只能选 30 个删除，怎么处理？

**处理方式**：

在列表中点击表头的全选即可勾选全部记录，再执行批量删除。

### 3.2 客户字段能联动到联系人表单吗？

**问题**：在客户表单中新增的单行文本字段，能否在联系人表单设置里配置为联动字段？

**处理方式**：

不能。Cordys CRM 的表单联动只用于**线索转为客户**时把线索字段自动填入客户表单，配置入口为 **系统 › 模块配置 › 客户表单设置 › 表单属性**，映射的是线索字段与客户字段，不支持客户字段与联系人字段之间的联动。

### 3.3 社区版有使用人数限制吗？

**问题**：社区版 Cordys CRM 对使用人数是否有限制？

**处理方式**：

社区版没有使用人数限制，仅对 API 调用次数有限制：自 v1.8.1 起社区版开放 API 调用，单日上限 1000 次；企业版 API 调用无限制。

## 4 版本升级

### 4.1 升级后 MySQL 容器启动失败或反复重启怎么办？

**问题**：升级后终端提示 `dependency failed to start: container mysql is unhealthy`，cordys-crm 容器无法启动，`docker logs mysql` 中 MariaDB 反复报错退出：

```
[ERROR] mariadbd: Error writing file './ddl_recovery.log' (Errcode: 1 "Operation not permitted")
[ERROR] Aborting
```

**处理方式**：

原因为 CentOS 系统上 SELinux 与 bind mount 挂载冲突：SELinux 阻止容器内的 MariaDB 进程写入宿主机挂载的数据目录，MySQL 容器健康检查失败反复重启，依赖它的 cordys-crm 容器也随之无法启动。

处理方法：编辑 docker-compose-mysql.yml，将 MySQL 的 volumes 调整为以下配置，在挂载路径末尾添加 `:Z` 标记，由 Docker 自动为宿主机目录设置 SELinux 安全标签（`${CORDYS_BASE}` 按实际安装路径替换，默认 `/opt`）：

```yaml
volumes:
  - ${CORDYS_BASE}/cordys/conf/mysql/my.cnf:/etc/mysql/conf.d/my.cnf:Z
  - cordys-mysql-data:/opt/cordys/data/mysql:Z
```

若日志中还出现 `Found option without preceding group in config file: /etc/mysql/conf.d/my.cnf`，可先尝试取消宿主机 my.cnf（默认 `/opt/cordys/conf/mysql/my.cnf`）中 `[mysqld]` 段下被注释的配置项，然后执行 `csctl restart` 重启服务。若能恢复正常，则无需调整上述挂载配置。

### 4.2 小版本升级会丢失已有数据吗？

**问题**：从 1.9.3 升级到 1.9.6 这类小版本升级，现有数据还在吗？有没有升级包？

**处理方式**：

升级理论上不会影响已有数据，但建议升级前做好备份，以便出现问题时回滚。安装包可在 [Cordys CRM 下载页](https://community.fit2cloud.com/#/products/cordys-crm/downloads) 获取。
