---
title: "Mac 离线安装"
description: "MeterSphere 一站式开源持续测试平台官方文档。MeterSphere 涵盖测试管理、接口测试、UI 测试和性能测试等功能，全面兼容 JMeter、Selenium 等主流开源标准，有效助力开发和测试团队充分利用云弹性进行高度可 扩展的自动化测试，加速高质量的软件交付。"
---

## 1 环境要求

:::note[部署服务器要求]

* 操作系统: 可运行 Docker 的 Mac 操作系统
* CPU/内存: 最低要求 4C8G，推荐 8C16G (企业版最低配置 8C16G)
* 磁盘空间: 50G

:::

## 2 安装部署
### 2.1 安装 Docker

:::note

在应用商店下载 Docker 进行安装，安装后并启动 Docker

:::

### 2.2 Docker 设置

:::note

进行 Docker 设置，需要添加 /opt/metersphere 路径 <br />

:::

![安装docker](/img/metersphere-v2/installation/mac-install-docker.png)

图 1  安装 Docker

### 2.3 安装 MeterSphere

:::note

下载安装包，安装包下载链接: https://community.fit2cloud.com/#/products/metersphere/downloads <br />

:::

![安装MeterSphere](/img/metersphere-v2/installation/mac-install-metersphere.png)

图 2  安装 MeterSphere（1）

:::note

解压安装包 <br />

:::

![安装MeterSphere](/img/metersphere-v2/installation/mac-install-tar.png)

图 3  安装 MeterSphere（2）

:::note

进入解压好的安装包目录 <br />

:::

![安装MeterSphere](/img/metersphere-v2/installation/cd-mac-install.png)

图 4  安装 MeterSphere（3）

:::note

执行安装命令 sh install.sh，安装过程中的提示，输入 y  <br />

:::

![安装MeterSphere](/img/metersphere-v2/installation/mac-install-sh.png)

图 5  安装 MeterSphere（4）

:::note

安装完成，使用 docker ps 查看后台服务都为 healthy 状态，则通过浏览器访问如下地址访问 MeterSphere <br />
```
地址: http://目标服务器IP地址:服务运行端口
用户名: admin
密码: metersphere
```

:::

![安装MeterSphere](/img/metersphere-v2/installation/mac-install-server.png)

图 6  安装 MeterSphere（5）

![安装MeterSphere](/img/metersphere-v2/installation/mac-install-localhost.png)

图 7  安装 MeterSphere（6）
