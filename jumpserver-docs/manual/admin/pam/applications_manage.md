---
title: 应用管理
description: 介绍 JumpServer PAM 应用管理的创建、密钥维护、调用记录以及产品内 API 文档。
---

## 1 功能简介

应用管理用于为外部系统通过 API 查询 PAM 资产账号密文。路径：登录后将控制台切换到 **PAM**，选择 **集成 > 应用管理**。

页签包括 **应用管理**、**调用记录** 和 **文档**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_app_01.png" alt="图 1  应用管理" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  应用管理</div>

**应用管理** 列表列字段包括图标、名称、Secret、账号、最后使用日期及操作。Secret 以掩码显示。行内铅笔按钮为编辑。右上角提供搜索、列设置、导出和刷新。

## 2 前提条件

- 已使用具备 PAM 权限的账号登录 JumpServer（如系统管理员）。
- 调用方须能访问 JumpServer API。通用 API 说明请参见 [API 文档](../../../dev/rest_api.md)。

## 3 创建应用

1. 在 **应用管理** 单击 **创建**。
2. 在右侧抽屉 **创建应用管理** 中填写信息。
3. 单击 **提交**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_app_02.png" alt="图 2  创建应用管理" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建应用管理</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建应用管理字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。应用名称。 |
| 基本设置 | 图标 | 单击 **选择文件** 上传。 |
| 账号策略 | 账号 | **全部账号**、**指定账号** 或 **属性筛选**。默认全部账号。指定账号时出现账号选择框。属性筛选时按属性名、匹配、属性值新增规则，并显示匹配结果。 |
| 账号策略 | IP 白名单 | 必填。默认 `*`。输入后按下 Enter 继续输入。页面提示：`*` 表示匹配所有。示例包括单地址、网段、地址范围及 IPv6。 |
| 其它设置 | 激活中 | 默认勾选。应用可用。 |
| 其它设置 | 备注 | 选填。 |

## 4 维护应用

行内铅笔为编辑。**更多** 包括 **删除**、**刷新密钥**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_app_03.png" alt="图 3  行内更多" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  行内更多</div>

单击应用 **名称** 打开详情。页签包括 **基本设置**、**账号**、**调用记录**、**活动**。右上角可 **编辑** 或 **删除**。右侧 **快速更新** 可对密码单击 **生成**。基本信息包括 ID、名称、创建日期、更新日期、备注、激活中。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_app_04.png" alt="图 4  应用详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  应用详情</div>

**账号** 页签列出该应用可调用的账号。列表列字段包括名称、用户名、密文、资产、平台及连接。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_app_05.png" alt="图 5  应用账号" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  应用账号</div>

## 5 调用记录

选择 **调用记录**。列表列字段包括应用、资产、账号、远端地址及日期。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_app_06.png" alt="图 6  调用记录" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  调用记录</div>

## 6 文档

选择 **文档**。页内提供 **cURL**、**Python**、**Go**、**Java**、**Node.js** 示例。

使用说明要点：

- 本 API 提供 PAM 资产账号密码查询服务，支持 RESTful 风格调用，返回 JSON。
- 请求方式：`GET /api/v1/accounts/integration-applications/account-secret/`。
- 请求参数：**asset**（资产名称）、**account**（账号名称），均为必填。
- 在 **应用管理** 中创建应用后生成 **KEY_ID** 和 **KEY_SECRET**。调用时请使用本系统中的密钥，不要使用文档示例中的占位值。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_app_07.png" alt="图 7  API 文档" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  API 文档</div>
