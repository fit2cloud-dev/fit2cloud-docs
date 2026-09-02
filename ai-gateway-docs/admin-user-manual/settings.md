---
title: 设置
description: 介绍 1Panel AI 网关（Gateway）设置页的基础设置、性能设置、向量服务、智能路由、内容合规与 Elasticsearch 六个标签。
slug: /user_manual/ai_gateway/settings
---

## 1 功能说明

设置页用于配置网关的运行参数，页面上方以标签页形式划分为 **基础设置**、**性能设置**、**向量服务**、**智能路由**、**内容合规**、**Elasticsearch** 六个标签，单击对应标签即可切换。各标签均提供 **更新** 按钮保存修改。

## 2 基础设置

基础设置包含接入地址、日志保留天数与协议转换开关。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image1-Basic-Settings.png" alt="基础设置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  基础设置</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  基础设置参数</div>

| 参数 | 说明 |
|---|---|
| 接入地址 | 用户通过此 OpenAI Base URL 接入网关，支持 HTTP 和 HTTPS，地址需以 `/v1` 结尾。 |
| 日志保留天数 | 调用元数据在到期后分批清理，可设置 1 至 365 天。 |
| 协议转换 | 开启后，可在无可用原生账号时使用已支持的 Chat Completions、Responses 与 Anthropic Messages 直接转换，原生协议始终优先。 |

:::caution[协议转换并非无损]
协议转换并非无损。协议专属字段、工具调用、思考内容或多模态能力可能无法安全转换，并导致请求在调用上游前失败。
:::

## 3 性能设置

性能设置用于控制网关的并发与超时行为。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image2-Performance-Settings.png" alt="性能设置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  性能设置</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  性能设置参数</div>

| 参数 | 说明 |
|---|---|
| 最大并发 | 网关同时处理的最大请求数，超出部分进入等待队列。 |
| 等待队列大小 | 并发占满时允许排队等待的最大请求数，为 0 或队列已满时新请求直接失败。 |
| 队列等待超时（秒） | 排队请求等待执行的最长时间，超时后请求失败。 |
| 非流式请求超时（秒） | 非流式请求从接收到响应完成的整体超时时间。 |
| 流式空闲超时（秒） | 流式响应相邻数据之间允许的最大空闲时间。 |
| 最大请求体（MB） | 单个请求允许携带的最大请求体体积，超出后请求被拒绝。 |

## 4 向量服务

向量服务供智能路由与内容合规共用，从账号池选择一个向量账号及其真实模型。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image3-Vector-Service.png" alt="向量服务"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  向量服务</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  向量服务参数</div>

| 参数 | 说明 |
|---|---|
| 向量账号 | 提供向量能力的上游账号，仅可选择已启用的向量账号。 |
| 向量模型 | 该账号下用于生成语义向量的模型。 |
| 测试连接 | 校验向量账号与模型是否可用。 |

## 5 智能路由

智能路由根据请求复杂度，将请求分发到不同模型组。该标签依赖向量服务提供语义能力。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image4-Smart-Routing-Settings.png" alt="智能路由设置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  智能路由设置</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  智能路由设置参数</div>

| 参数 | 说明 |
|---|---|
| 状态 | 智能路由的启用状态。 |
| 虚拟模型名称 | 客户端使用该模型名发起文本请求时触发智能路由。 |
| 简单请求模型组 | 判定为简单，以及无法可靠判定的请求使用该模型组。 |
| 复杂请求模型组 | 判定为复杂的请求使用该模型组。 |
| 分类阈值 | 请求与样本的相似度达到该值才参与分类判定，否则按简单请求处理。 |
| 置信差阈值 | 最高与次高分类的置信度差低于该值时，按简单请求处理。 |
| Top K | 决策详情中最多展示的相似样本数。 |

## 6 内容合规

内容合规标签用于统一配置内容合规开关和语义检测阈值。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image5-Content-Compliance-Settings.png" alt="内容合规设置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  内容合规设置</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 5  内容合规设置参数</div>

| 参数 | 说明 |
|---|---|
| 状态 | 内容合规的启用状态。 |
| 语义阈值 | 请求内容与审核样本的相似度达到该值时，按样本所属策略组的动作处理。 |

## 7 Elasticsearch

Elasticsearch 标签用于将请求与响应正文写入 Elasticsearch，便于审计和问题排查。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image6-Elasticsearch-Settings.png" alt="Elasticsearch 设置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  Elasticsearch 设置</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 6  Elasticsearch 设置参数</div>

| 参数 | 说明 |
|---|---|
| Elasticsearch 地址 | 目标 Elasticsearch 服务地址。 |
| 认证方式 | 连接认证方式，可选 API Key 或 Basic Auth。 |
| API Key | 认证方式为 API Key 时填写的密钥。 |
| 请求正文上限（KiB） | 每条请求正文最多保存的大小，超出部分截断。 |
| 响应正文上限（KiB） | 每条响应正文最多保存的大小，超出部分截断。 |
| 外部保留天数 | 正文记录在外部 Elasticsearch 中的保留天数，到期自动清理。 |
| 当前队列（条 / 字节） | 当前待写入队列的记录条数与字节数。 |
| 累计丢弃 | 累计未能写入的记录数。 |
| 最近写入成功 | 最近一次成功写入的时间。 |
| 连续失败开始时间 | 连续写入失败的起始时间。 |

:::note[未配置状态]
Elasticsearch 未配置时，页面显示「未配置」，各写入统计项显示为 0 或空，此时不采集请求与响应正文。
:::
