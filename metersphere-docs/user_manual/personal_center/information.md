---
title: "个人信息"
---

## 1 基本信息

:::note

进入【个人信息-基本信息】管理界面，更新头像、修改用户名称、邮箱、手机号码。

:::

![个人中心](/img/metersphere/personal_center/基础信息操作.png)

图 1  基础信息操作

## 2 密码设置

:::note

进入【个人信息-密码设置】管理界面，修改当前用户的登录密码。

:::

![个人中心](/img/metersphere/personal_center/个人中心修改密码.png)

图 2  个人中心修改密码

## 3 APIKEY

:::note

进入【个人信息-APIKEY】管理界面，创建 MeterSphere 平台的 Access Key、Secret Key 用于第三方调用接口做身份验证使用、Jenkins 插件、接口同步 Idea 插件等。最多可添加 5 条APIKEY。

:::

![个人中心](/img/metersphere/personal_center/apikey.png)

图 3  API Key 管理

## 4 本地执行

:::note

配置接口测试本地执行策略，点击【检测】地址是否可联通，检测通过了才能开启，配置【优先本地执行】。

:::

![个人中心](/img/metersphere/personal_center/个人中心本地执行.png)

图 4  个人中心本地执行

:::note[说明]

本地执行：用于本地调试执行，需要本地电脑部署 task-runner ，安装参考 [部署  task-runner ](../../installation/task_runner.md)。<br />

本地调试具有多个优势：<br />

- 实时反馈：在本地调试时，可以立即看到代码的执行结果，快速发现和解决问题。<br />
- 快速迭代：本地调试可快速进对代码修改和测试，从而加快开发迭代的速度。<br />
- 隔离环境：本地调试是在一个受控的环境中进行开发和测试，不受外部环境的影响，有助于排除外部因素导致的问题。<br />

:::

## 5  三方平台账号

:::note

绑定第三方缺陷管理平台账号。如：配置了禅道、JIRA、TAPD、飞书等平台时，在个人中心绑定对应三方平台的账号，MeterSphere将使用此处的账号作为缺陷创建人。

:::

![个人中心](/img/metersphere/personal_center/禅道个人账号.png)

图 5  禅道个人账号

## 6  模型配置

:::note

【模型设置】支持 DeepSeek，OpenAI、 智普AI三种供应商对接模型。具体模型配置参考[系统设置-模型设置](../system_management/system.md#42-模型设置)。<br />

:::

![个人中心](/img/metersphere/personal_center/个人中心模型配置.png)

图 6  个人中心模型配置
