---
title: 个人中心
description: 介绍 Cordys CRM 个人中心的个人信息、我的计划、API Keys 与个人模型。
---

个人中心维护当前登录账号自己的资料与凭证。成员在这里修改手机、邮箱和密码，查看自己的跟进计划，并创建调用开放接口或 Cordys AI 所需的密钥与模型。这些设置只对当前账号生效，与企业设置中的组织级配置相互独立。

## 1 功能简介

单击左下角头像，菜单包含四项：**个人中心**、**我的计划**、**我的导出**、**退出系统**。个人中心内再分为四个页签。

- **个人信息**：查看姓名、角色、手机、邮箱与部门，并可修改手机、邮箱和登录密码。
- **我的计划**：按状态查看当前账号的跟进计划，支持写计划与评论。
- **API Keys**：创建访问 Cordys CRM API 的 Access Key 与 Secret Key。
- **模型**：为当前账号添加个人 AI 模型，供 Cordys AI 调用。

我的导出用于下载导出文件，说明见[导入导出](./import_export.md)。

## 2 入口位置

在左侧导航底部单击当前账号，选择“个人中心”。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/personal-menu.png" alt="图 1  头像菜单" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  头像菜单</div>

## 3 个人信息

个人信息页签展示基本信息。姓名与角色显示在头像旁，角色示例为“普通管理员”。手机、邮箱、部门展示在同一行。部门由组织架构决定，不在此页修改。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/personal-info.png" alt="图 2  个人信息" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  个人信息</div>

单击“编辑”打开更新窗口，可修改两项：

- **手机**：必填，填写当前账号的手机号。
- **邮箱**：必填，填写当前账号的邮箱。

修改登录密码时，单击“修改密码”，依次输入当前密码、新密码和确认新密码，单击“保存”。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/personal-password.png" alt="图 3  修改密码" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  修改密码</div>

:::note[说明]
若当前账号仍在使用初始密码，进入系统后会提示尽快修改密码。
:::

## 4 我的计划

切换到“我的计划”页签，可按全部、未开始、进行中、已完成、已取消筛选，也可通过关键字搜索。单击“写计划”新建一条跟进计划。每条计划提供详情、编辑、删除；已完成的计划还可“计划转记录”。评论方式与顶栏记录/计划面板一致，见[跟进记录计划](./followup_plan.md)。

头像菜单中的“我的计划”会直接打开同一列表。

## 5 API Keys

API Keys 用于调用 Cordys CRM 开放接口。单击“新增”生成一对密钥，单账号最多添加 5 个。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/personal-apikey.png" alt="图 4  API Keys" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  API Keys</div>

每条密钥展示以下信息：

- **Access Key / Secret Key**：调用接口时使用的一对凭证。Secret Key 默认隐藏，可单击眼睛图标查看。
- **描述**：为这条密钥填写的说明；未填写时显示“-”。
- **创建时间**：密钥生成的时间。
- **有效时间**：默认为永久有效。单击“有效时间”可改为自定义到期时间，到期后状态显示为“已到期”。
- **启用开关**：关闭后，使用该 Access Key 调用 API 将失效。
- **删除**：删除后，使用该 Access Key 调用 API 将失效。

接口的调用方式见[API 文档](../api_docs.md)。

:::warning[警告]
Access Key 与 Secret Key 等同于账号凭证。不要写入公开仓库或转发给无关人员。不再使用的密钥应关闭或删除。
:::

## 6 个人模型

模型页签用于为当前账号添加 AI 模型。列表为空时显示“暂无数据”。单击“添加模型”填写连接信息。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/personal-model-add.png" alt="图 5  添加个人模型" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  添加个人模型</div>

- **模型名称**：必填，在 Cordys AI 的模型列表中显示的名称，例如 GPT-4o。名称不能与已有个人模型重复。
- **模型 ID**：服务商侧的模型标识，例如 gpt-4o-2024-08-06。
- **提供商**：选择模型服务商，例如 OpenAI。
- **API Base URL**：模型服务的接口地址，例如 `https://api.openai.com/v1`。
- **API Key**：必填，访问该模型服务的密钥。
- **启用**：打开后，该模型会出现在 Cordys AI 的模型下拉列表中。停用后不再展示。

单击“添加”保存并关闭窗口。需要连续添加多条时，单击“保存并继续添加”。企业统一接入的模型在[企业设置](./enterprise_setting.md)的模型设置中配置，与此处的个人模型互不影响。
