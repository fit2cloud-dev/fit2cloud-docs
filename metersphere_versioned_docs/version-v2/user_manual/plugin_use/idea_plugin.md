---
title: "IDEA 插件"
description: "MeterSphere 一站式开源持续测试平台官方文档。MeterSphere 涵盖测试管理、接口测试、UI 测试和性能测试等功能，全面兼容 JMeter、Selenium 等主流开源标准，有效助力开发和测试团队充分利用云弹性进行高度可 扩展的自动化测试，加速高质量的软件交付。"
---

:::note

 该插件帮助开发人员在IntelliJ IDEA IDE 中，将编写的 HTTP 接口文档信息快捷推送到 MeterSphere 系统中。

:::

## 1 插件安装
### 1.1 在线安装

:::note

 在 IDEA -> Settings -> plugins -> Marketplace 搜索并选择【MeterSphere】，点击 install 即可进行在线安装。

:::

![ideal_plugin](/img/metersphere-v2/user_manual/plugin_use/idea_plugin/idea_plugin_4.png)

图 1  在线安装插件

### 1.2 离线安装

:::note

 先在 [jetbrains plugin marketplace](https://plugins.jetbrains.com/plugin/18097-metersphere/versions) 中下载与 IDEA版本匹配的版本，
 然后在 IDEA -> Settings -> plugins，点击【Install Plugin from Disk】并选择已下载的离线包进行安装。

:::

![ideal_plugin](/img/metersphere-v2/user_manual/plugin_use/idea_plugin/idea_plugin_1.png)

图 2  离线安装插件

## 2 插件使用

:::note

 IDEA -> Settings -> MeterSphere 中配置好访问地址以及 AK/SK 等详细信息，点击【test】按钮即确认连接成功。

:::

![ideal_plugin](/img/metersphere-v2/user_manual/plugin_use/idea_plugin/idea_plugin_2.png)

图 3  配置 MeterSphere 连接

:::note

 配置导出是否覆盖、目录层级等信息后，点击【Apply】按钮。

:::

![ideal_plugin](/img/metersphere-v2/user_manual/plugin_use/idea_plugin/idea_plugin_3.png)

图 4  配置导出选项

:::note

 在要同步接口的 Controller 页面中右键选择【Export MeterSphere】即可将代码中的 HTTP 接口推送到 MeterSphere 系统中。

:::
