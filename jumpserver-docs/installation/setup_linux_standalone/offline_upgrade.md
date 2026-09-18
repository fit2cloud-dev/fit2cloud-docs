---
title: 升级指南
---

:::warning[JumpServer V3 如果要升级到 V4 版本，需要先升级到 V3 的最新版本，否则升级会失败！]

:::

关于跨大版本升级的版本要求，请对照当前版本按以下路径升级：

- **v2 升级 v3**：v2 与 v3 差异较大，升级前请先参阅 [升级须知](/jumpserver/installation/upgrade_notice)。
- **v3 升级 v4**：需先将当前版本升级到 v3 的最新版本（v3.10.23 LTS），再升级到 v4，否则会因为表结构变更导致升级失败。
- **v4 升级 v5**：v4 到 v5 的数据库迁移是连续可前滚的，v4 各版本可直接升级到 v5，无需额外前置操作。若当前为较早期的 v4.0.0 版本，建议先升级到 v4 的最新版本（v4.10.19 LTS）再升级到 v5。

JumpServer 离线升级包支持的系统与架构如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  离线升级包</div>

| OS/Arch       | Architecture | Linux Kernel | Offline Name                                     |
| :------------ | :----------- | :----------- | :----------------------------------------------- |
| linux/amd64   | x86_64       | &gt;= 4.0       | jumpserver-ce-5.0.0-x86_64.tar.gz |

## 1. 升级部署

下载最新版本的离线升级包并上传到部署服务器，解压后执行升级。

### linux/amd64

将离线包上传至服务器并解压：


从飞致云社区 [下载最新的 linux/amd64 离线包](https://community.fit2cloud.com/#/products/jumpserver/downloads), 并上传到部署服务器的 /opt 目录。


```sh
cd /opt
tar -xf jumpserver-ce-5.0.0-x86_64.tar.gz
cd jumpserver-ce-5.0.0-x86_64
```
```sh
./jmsctl.sh upgrade
./jmsctl.sh start
```
