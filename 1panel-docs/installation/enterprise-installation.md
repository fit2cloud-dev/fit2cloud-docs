---
title: 1Panel 离线安装
description: 介绍 1Panel 企业版离线包的获取、安装、升级，以及试用到期后恢复社区版。
keywords: [1Panel 离线安装]
---

🎉 **1Panel 离线安装包已集成企业版核心功能。安装完成后，即可免费体验 7 天企业版全功能。体验期结束后需要在登录页手动恢复。恢复后基础功能可以继续使用，操作见下文「恢复社区版」。**

## 1 环境要求

**安装前请确保您的系统符合安装条件：**

- 操作系统：支持主流 Linux 发行版本（基于 Debian / RedHat，包括国产操作系统）
- 服务器架构：x86_64、aarch64、armv7l、ppc64le、s390x、riscv64
- 内存要求：建议可用内存在 1GB 以上
- 浏览器要求：请使用 Chrome、Firefox、IE 10+、Edge 等现代浏览器

## 2 下载离线安装包

- 企业版离线包提供 x86_64（amd64）架构，请前往 [FIT2CLOUD 开源社区下载页面](https://community.fit2cloud.com/#/products/1panel/downloads) 下载。

该地址提供的是企业版离线安装包，用于首次安装和后续升级。试用到期后恢复社区版时，不要使用这个安装包。

## 3 执行安装命令

获取对应架构的离线安装包，上传至目标服务器的 `/tmp` 目录，并以 **root 用户** 执行以下命令解压：

```bash
cd /tmp
# 解压离线包（1panel-v2.5.1-linux-amd64.tar.gz 为示例文件名，请替换为实际名称）
tar zxvf 1panel-v2.5.1-linux-amd64.tar.gz
```

进入解压目录，执行 `install.sh` 脚本，根据提示完成安装：

```bash
# 进入解压目录（请按实际包名替换目录名）
cd 1panel-v2.5.1-linux-amd64

# 执行安装脚本
/bin/bash install.sh
```

## 4 升级指南

获取对应架构的离线安装包，上传至目标服务器的 `/tmp` 目录并解压：

```bash
cd /tmp
# 解压离线包（1panel-v2.5.1-linux-amd64.tar.gz 为示例文件名，请替换为实际名称）
tar zxvf 1panel-v2.5.1-linux-amd64.tar.gz
```

进入解压目录，执行 `upgrade.sh` 脚本，根据提示完成升级：

```bash
cd 1panel-v2.5.1-linux-amd64

# 执行升级脚本
/bin/bash upgrade.sh
```

## 5 恢复社区版

7 天试用结束后，登录页仍会要求导入许可证，面板不会自行切回社区版。按下面步骤手动恢复。

1. 打开 1Panel 登录页。
2. 单击右上角 **恢复社区版**。
3. 在弹窗中选择恢复方式。
  - 服务器可以访问互联网时，选择 **在线恢复**。
  - 内网或无法访问外网时，选择 **离线恢复**。
4. 选择 **离线恢复** 时，先准备社区版官方安装包，版本不低于当前企业版。在弹窗中单击 **复制下载链接**，按链接下载。
5. 将下载得到的安装包文件上传到服务器目录 `/opt/1panel/tmp/community-restore`。目录不存在时先创建。
6. 安装包放好后，单击 **确认**。
7. 切换完成后，使用切换前的企业版超级管理员账号登录。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/installation/community-restore-offline.png" alt="恢复社区版（离线恢复）" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  恢复社区版（离线恢复）</div>

:::note[切换后的登录与数据]
版本切换后，可以使用当前企业版超级管理员账号登录社区版。切换过程中会清除企业版专属数据，基础功能可以继续使用。
:::

:::warning[不要放入企业版离线包]
第 2 节下载的企业版离线包不能放入 `/opt/1panel/tmp/community-restore`。放错后切换仍会执行完成，但面板仍是企业版，再次登录会回到许可证页面，登录账号也可能被改成 `username`，密码被改成 `password`。

请使用弹窗里 **复制下载链接** 得到的社区版安装包。如果账号已经被改掉，在服务器上执行 `1pctl update username` 和 `1pctl update password` 重新设置。
:::