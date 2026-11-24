---
title: 数据备份以及恢复指南
---

## 1 概述


**JumpServer 堡垒机数据主要分为两部分：**

- 数据库数据：用户数据、资产数据、账号数据、操作日志、命令记录等。
- 静态文件：会话录像、图片、系统日志、配置文件等。

## 2 数据库备份和恢复

:::warning[注意]

- 本文是以同一套环境备份恢复为例，如果是跨环境恢复，请确保数据库版本型号一致，配置文件中的 **BOOTSTRAP_TOKEN** 和 **SECRET_KEY** 需要与导出来源的一致！
:::


### 备份

- 在堡垒机任意一节点（多节点任意一节点即可）执行以下命令备份数据库信息：

  ```sh
  ./jmsctl.sh backup_db
  ```
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/backup_db.png" alt="图 1  数据库备份" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  数据库备份</div>
- 备份文件和当前配置文件会默认保存在持久化目录 /data/jumpserver/db_backup 下，文件名格式为 jumpserver-v5.0.0-xxxx-xx-xx_xx:xx:xx.dump.gz。
- 如果使用 MySQL 或 MariaDB 作为数据库，文件名格式为 jumpserver-v5.0.0-xxxx-xx-xx_xx:xx:xx.sql.gz。
### 恢复

- 在堡垒机任意一节点（多节点任意一节点即可）执行以下命令恢复数据库信息(注意：如果是压缩文件需要提前解压)：

  ```sh
  ./jmsctl.sh restore_db /data/jumpserver/db_backup/jumpserver-v5.0.0-xxxx-xx-xx_xx:xx:xx.dump
  ```
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/restore_db1.png" alt="图 2  恢复数据库备份1" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  恢复数据库备份1</div>
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/restore_db2.png" alt="图 3  恢复数据库备份2" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  恢复数据库备份2</div>
## 3 静态文件备份

:::warning[注意]

- 静态文件主要包括会话录像、图片、系统日志等，静态文件默认保存在 /data/jumpserver 下，如果是自定义配置静态文件路径，请根据实际路径进行备份恢复。
- 如果是跨环境恢复需要确认其数据库数据与静态文件数据来源一致，否则录像等数据会无法关联。
- 多节点建议采用NFS等共享存储方案，避免单节点静态文件不一致问题。
:::


- 静态文件目录解释：
```sh
├── core
│   └── data
│       ├── celery
│       ├── certs
│       ├── logs  # 系统日志
│       ├── media # 会话录像等
│       ├── share
│       ├── static
│       ├── system
│       └── version.txt
├── db_backup # 备份的数据库文件和配置文件
├── koko
│   └── data
│       ├── certs 
│       ├── keys # 组件注册信息
│       ├── logs # koko 组件日志，其余组件类似
│       └── replays
├── nginx
│   └── data
│       └── logs # Nginx 访问日志（jms_web）
├── redis
│   └── data # 内置 Redis 数据文件
├── postgresql
│   └── data # 内置 PostgreSQL 数据文件
```

- 以录像备份为例：
```sh
rsync -avh /data/jumpserver/core/data/media/replay/ /backup/jumpserver/replay_backup/
# 录像文件夹以日期和会话 uuid 命名
```
## 4 启动对应版本堡垒机

- 进入到要恢复的版本安装包里面比如jumpserver-v5.0.0-xxxx-xx-xx_xx中先加载旧版镜像然后重启服务，命令如下

  ```sh
  ./jmsctl.sh load_image
  ./jmsctl.sh start
  ```

- 启动服务后访问web网页观察服务是否正常