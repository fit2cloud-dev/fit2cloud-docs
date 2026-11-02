---
title: "应用管理"
description: "MeterSphere 一站式开源持续测试平台官方文档。MeterSphere 涵盖测试管理、接口测试、UI 测试和性能测试等功能，全面兼容 JMeter、Selenium 等主流开源标准，有效助力开发和测试团队充分利用云弹性进行高度可 扩展的自动化测试，加速高质量的软件交付。"
---

## 1 应用管理权限
![!项目设置](/img/metersphere-v2/project_management/应用管理权限1.png)

图 1  更多选项菜单

:::note

如果【项目设置】-【更多选项】里看不到【应用管理】菜单，表示此用户没有此权限，需要到【系统设置】-【系统】-【用户组与权限】修改【项目管理员】的权限。

:::

![!项目设置](/img/metersphere-v2/project_management/应用管理权限2.png)

图 2  用户组应用权限

:::note

选中应用设置权限即可。

:::

![!项目设置](/img/metersphere-v2/project_management/应用管理权限3.png)

图 3  应用权限设置

## 2 应用管理设置

:::note

点击【项目设置】-【更多选项】-【应用管理】可以对 MeterSphere 的【工作台】、【测试跟踪】、【接口测试】、【UI测试】、【性能测试】等应用进行高级设置。

:::

![!项目设置](/img/metersphere-v2/project_management/应用管理1.png)

图 4  应用管理页面

### 2.1 工作台

:::note

维护【工作台】下的一些高级应用配置管理，包含【我的待办-待更新列表】配置。

:::

![!项目设置](/img/metersphere-v2/project_management/工作台.png)

图 5  工作台配置

![!项目设置](/img/metersphere-v2/project_management/工作台_1.png)

图 6  待更新列表配置

### 2.2 测试跟踪设置

:::note

维护【测试跟踪】下的一些高级应用配置管理，包含 【启动公共用例库】、【测试用例自定义ID】、【定时清理测试计划报告】、【报告分享链接】配置。

:::

![!项目设置](/img/metersphere-v2/project_management/测试跟踪设置.png)

图 7  测试跟踪设置页

:::note

- **启动公共用例库**

:::

![!项目设置](/img/metersphere-v2/project_management/测试跟踪设置5.png)

图 8  启用公共用例库

:::note

- **测试用例自定义ID**<br />
开启后，在创建【测试用例】页面，可以自定义设置用例 ID。

:::

![!项目设置](/img/metersphere-v2/project_management/测试跟踪设置2.png)

图 9  测试用例自定义 ID

:::note

- **定时清理测试计划报告**

:::

![!项目设置](/img/metersphere-v2/project_management/测试跟踪设置3.png)

图 10  定时清理测试计划报告

:::note

- **报告分享链接**

:::

![!项目设置](/img/metersphere-v2/project_management/测试跟踪设置4.png)

图 11  报告分享链接

### 2.3 接口测试设置

:::note

维护【接口测试】下的一些高级应用配置管理，包含【接口定义URL可重复】、【场景自定义ID】、【TCP Mock Port】以及【定时清理接口测试报告】、【报告分享链接】以及【接口定义快捷添加按钮】等配置。

:::

![!项目设置](/img/metersphere-v2/project_management/接口测试设置1.png)

图 12  接口测试设置页

:::note

- **接口定义URL可重复**<br />
启用后接口定义重复性校验将不校验URL，同一个项目下允许接口路径相同的【接口定义】。

:::

![!项目设置](/img/metersphere-v2/project_management/接口测试设置2.png)

图 13  接口定义 URL 可重复

:::note

- **场景自定义ID**<br />
启用后创建场景支持自定义设置场景ID。

:::

![!项目设置](/img/metersphere-v2/project_management/接口测试设置3.png)

图 14  场景自定义 ID

:::note

- **TCP Mock Port**<br />
设置接口协议为TCP的接口，Mock服务的可用性。

:::

![!项目设置](/img/metersphere-v2/project_management/接口测试设置4.png)

图 15  TCP Mock 服务

:::note

如果 TCP 协议的接口需要使用 Mock 服务，则需要开启此服务，开启后在接口测试中，Mock 服务才可用。

:::

![!项目设置](/img/metersphere-v2/project_management/接口测试设置5.png)

图 16  TCP Mock 配置

:::note

- **定时清理接口测试报告**

:::

![!项目设置](/img/metersphere-v2/project_management/接口测试设置6.png)

图 17  定时清理接口测试报告

:::note

- **报告分享链接**

:::

![!项目设置](/img/metersphere-v2/project_management/接口测试设置7.png)

图 18  接口测试报告分享链接

:::note

- **接口定义快捷添加按钮**

:::

![!项目设置](/img/metersphere-v2/project_management/接口测试设置8.png)

图 19  接口定义快捷添加按钮

![!项目设置](/img/metersphere-v2/project_management/接口测试设置9.png)

图 20  快捷添加按钮配置

### 2.4 UI测试设置
![!项目设置](/img/metersphere-v2/project_management/UI测试.png)

图 21  UI 测试设置页

![!项目设置](/img/metersphere-v2/project_management/UI测试_1.png)

图 22  UI 测试设置项

### 2.5 性能测试设置

:::note

维护【性能测试】下的一些高级应用配置管理，包含【定时清理接口测试报告】、【报告分享链接】配置。

:::

![!项目设置](/img/metersphere-v2/project_management/性能测试设置.png)

图 23  性能测试设置页
