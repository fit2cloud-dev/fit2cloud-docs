---
title: 在线升级
---

:::warning[JumpServer V3 如果要升级到 V4 版本，需要先升级到 V3 的最新版本，否则升级会失败！]

:::
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  在线升级包</div>

| OS/Arch       | Architecture | Linux Kernel | Offline Name                                     |
| :------------ | :----------- | :----------- | :----------------------------------------------- |
| linux/amd64   | x86_64       | &gt;= 4.0       | jumpserver-installer-v4.10.17.tar.gz |

## 1. 升级部署

### 中国大陆


```sh
cd /opt
wget https://resource.fit2cloud.com/jumpserver/installer/releases/download/v4.10.17/jumpserver-installer-v4.10.17.tar.gz
tar -xf jumpserver-installer-v4.10.17.tar.gz
cd jumpserver-installer-v4.10.17
```
### 其他地区


```sh
cd /opt
wget https://github.com/jumpserver/installer/releases/download/v4.10.17/jumpserver-installer-v4.10.17.tar.gz
tar -xf jumpserver-installer-v4.10.17.tar.gz
cd jumpserver-installer-v4.10.17
```

```sh
./jmsctl.sh upgrade

# 启动 JumpServer 服务
./jmsctl.sh start
```
