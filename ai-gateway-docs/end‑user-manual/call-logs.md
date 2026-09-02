---
title: 调用日志
description: 介绍 1Panel AI 网关（Gateway）调用日志页的作用、筛选项、列表字段与调用详情。
slug: /user_manual/ai_gateway/call_logs
---

## 1 功能说明

调用日志页以列表形式逐条展示网关的模型调用记录，用于追踪单次调用、排查错误与统计耗时。列表默认按调用时间倒序排列，支持分页浏览。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/call-logs/image1-Call-Logs.png" alt="调用日志列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  调用日志列表</div>

## 2 筛选项

页面顶部提供筛选与搜索能力。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  调用日志筛选项</div>

| 筛选项 | 说明 |
|---|---|
| 用户 | 按指定用户过滤日志。 |
| 供应商 | 按上游供应商过滤日志。 |
| 状态码 | 按调用结果状态码过滤日志。 |
| 时间维度 | 选择查询的时间范围，默认为「近 30 天」。 |
| 搜索框 | 按 Request ID、请求模型、上游模型或错误信息搜索日志。 |

## 3 列表字段

列表每行对应一次调用记录，主要字段说明如下。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  调用日志列表字段</div>

| 字段 | 说明 |
|---|---|
| Request ID | 本次调用的唯一标识，可单击右侧图标复制。 |
| 供应商 / 账号 | 本次调用使用的供应商及上游账号。 |
| 请求模型 | 客户端请求的模型名称。 |
| 上游模型 | 实际转发到上游的模型名称。 |
| 用户 / 用户组 | 发起本次调用的用户及其所属用户组。 |
| 输入 Token / 输出 Token / 总 Token / 缓存 Token | 本次调用各阶段的 Token 用量。 |
| 结果 | 调用结果，如「成功」「客户端错误」「上游错误」。 |
| 状态码 | 上游返回的状态码，如 200、400。 |
| 总耗时 | 本次调用的整体耗时。 |
| 上游累计耗时 | 上游各次尝试的累计耗时。 |
| 调用时间 | 本次调用发生的时间。 |
| 操作 | 单击 **查看** 打开调用详情。 |

:::note[数据为空的字段]
部分调用（如上游返回异常）可能无法采集到 Token 用量，对应字段显示「未知」。
:::

## 4 查看调用详情

在目标日志行的 **操作** 列单击 **查看**，右侧弹出调用详情抽屉，展示本次调用的完整信息。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/call-logs/image2-Call-Log-Details.png" alt="调用日志详情"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  调用日志详情</div>

详情抽屉包含以下分组。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  调用日志详情分组</div>

| 分组 | 主要内容 |
|---|---|
| 基本信息 | 用户、用户组、API Key、模型组、调用时间。 |
| 模型详情 | 上游账号、请求模型、上游模型、流式类型、上游端点、协议路径。 |
| Token 用量 | 总 Token、输入 Token、输出 Token、缓存 Token、用量来源。 |
| 状态 | 结果、上游状态码、总耗时、首字节耗时、排队耗时、上游累计耗时、错误码。 |
| 调用链路 | 各次尝试的序号、状态码、上游账号、上游协议与耗时。 |

:::tip[排查上游失败]
当「结果」为「上游错误」时，可在「调用链路」中查看每次尝试的上游账号与状态码，并在详情右上角单击 **查看正文** 核对请求内容。
:::
