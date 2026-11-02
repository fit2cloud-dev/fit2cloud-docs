---
title: "Selenium IDE 插件"
description: "MeterSphere 一站式开源持续测试平台官方文档。MeterSphere 涵盖测试管理、接口测试、UI 测试和性能测试等功能，全面兼容 JMeter、Selenium 等主流开源标准，有效助力开发和测试团队充分利用云弹性进行高度可 扩展的自动化测试，加速高质量的软件交付。"
---

:::note

该插件为 Selenium 原生插件，用于录制、回放用户在 web 页面上的操作，支持 Chrome，firefox、Edge等主流浏览器。以Chrome浏览器为例说明插件的下载安装以及使用。

:::

## 1 插件安装

:::note

在 Chrome 应用商店中搜索 selenium 关键字， 选择Selenium IDE，点击【添加至 Chrome】完成插件安装。

:::

![selenium_ide](/img/metersphere-v2/user_manual/plugin_use/selenium_ide_plugin/selenium_ide_install.png)

图 1  安装 Selenium IDE 插件

## 2 插件使用

:::note

 在 Chrome 浏览器中点击扩展程序按钮，并选择 Selenium IDE插件图标，启动插件程序。<br />

:::

![selenium_ide](/img/metersphere-v2/user_manual/plugin_use/selenium_ide_plugin/selenium_ide_select.png)

图 2  选择 Selenium IDE 插件

:::note

启动【Selenium IDE】插件 <br />

:::

![selenium_ide](/img/metersphere-v2/user_manual/plugin_use/selenium_ide_plugin/selenium_ide_window.png)

图 3  Selenium IDE 窗口

:::note

创建录制的项目，输入项目名称 <br />
点击【录制】按钮，在输入录制网站地址之后开始录制。 <br />

:::

![selenium_ide](/img/metersphere-v2/user_manual/plugin_use/selenium_ide_plugin/selenium_ide_newproject.png)

图 4  新建录制项目

![selenium_ide](/img/metersphere-v2/user_manual/plugin_use/selenium_ide_plugin/selenium_ide_baseurl.png)

图 5  设置录制地址

:::note

录制完成后，点击【停止】按钮结束录制，并点击【保存】按钮，将录制结果保存后置为 .side 文件

:::

![selenium_ide](/img/metersphere-v2/user_manual/plugin_use/selenium_ide_plugin/selenium_ide_record.png)

图 6  保存录制结果

:::note

将保存的 .side 文件导入到 MeterSphere UI 测试中即进行 Web UI的自动化测试。

:::

![selenium_ide](/img/metersphere-v2/user_manual/plugin_use/selenium_ide_plugin/add_selenium_ide_7.png)

图 7  导入 .side 文件
