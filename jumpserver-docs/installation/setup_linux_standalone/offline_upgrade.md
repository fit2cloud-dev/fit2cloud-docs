---
title: 升级指南
---

:::warning[JumpServer V3 如果要升级到 V4 版本，需要先升级到 V3 的最新版本，否则升级会失败！]

:::
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  离线升级包</div>

| OS/Arch       | Architecture | Linux Kernel | Offline Name                                     |
| :------------ | :----------- | :----------- | :----------------------------------------------- |
| linux/amd64   | x86_64       | &gt;= 4.0       | jumpserver-ce--x86_64.tar.gz |

## 1. 升级部署

### linux/amd64


从飞致云社区 [下载最新的 linux/amd64 离线包](https://community.fit2cloud.com/#/products/jumpserver/downloads), 并上传到部署服务器的 /opt 目录。


```sh
cd /opt
tar -xf jumpserver-ce--x86_64.tar.gz
cd jumpserver-ce--x86_64
```
```sh
./jmsctl.sh upgrade
./jmsctl.sh start
```
