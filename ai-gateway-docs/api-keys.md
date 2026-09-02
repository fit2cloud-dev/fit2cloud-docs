---
title: API Keys
description: 介绍 1Panel AI 网关 API Keys 的创建、编辑与删除，API Key 是调用网关接口的凭证。
---

API Key 是调用网关接口的凭证。调用模型前需先创建 API Key。

## 1 功能入口

在左侧导航栏选择** API Keys**，进入 API Keys 列表页面。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/api-keys/image1-api-keys.png" alt="API Keys 列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  API Keys 列表</div>

## 2 参数说明

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  API Keys 列表字段说明</div>

| 字段 | 说明 |
| --- | --- |
| 名称 | API Key 的自定义名称 |
| API Key | 密钥内容，列表中默认脱敏显示（如 `sk-vfnRUCYo...oBKs`） |
| 创建时间 | 该密钥的创建时间 |
| 最新使用日期 | 最近一次调用时间，从未使用时显示「-」 |
| 操作 | 支持**编辑**与**删除** |

## 3 创建 API Key

1. 在 API Keys 页面，单击左上角**创建 API Key**。
2. 在右侧弹出的抽屉中，输入**名称**（必填）。
3. 单击**创建**完成创建；单击**取消**可放弃本次操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/api-keys/image2-create-api-key.png" alt="创建 API Key"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建 API Key</div>
注：API Key仅创建时可见，需要自行复制保存
## 4 编辑与删除 API Key

- **编辑**：在目标密钥所在行的**操作**列，单击**编辑**，可修改密钥名称。
- **删除**：在目标密钥所在行的**操作**列，单击**删除**，删除后使用该密钥的调用将立即失效。

:::warning[删除不可恢复]
删除 API Key 后不可恢复，请先确认没有业务应用仍在使用该密钥。
:::
