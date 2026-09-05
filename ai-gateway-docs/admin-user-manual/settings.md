---
title: 设置
description: 介绍 1Panel AI 网关（Gateway）设置页的基础设置、性能设置、向量服务、智能路由、内容合规与 Elasticsearch 六个标签。
slug: /user_manual/ai_gateway/settings
---

## 1 概述

设置页用于配置网关的运行参数，页面上方以标签页形式划分为 **基础设置**、**性能设置**、**向量服务**、**智能路由**、**内容合规**、**Elasticsearch** 六个标签，单击对应标签即可切换。**设置**页面将这些全局配置集中在一个入口，是网关的"总控台"。

## 2 基础设置

基础设置用于配置网关对外的接入方式、日志数据保留策略以及协议转换能力，是网关对外提供服务的接入基础。合理配置这些参数，可确保用户能够正确接入，并让日志管理与协议适配符合实际使用需求。

- **接入地址**：设置用户接入网关所使用的 OpenAI Base URL。用户通过该地址接入网关，支持 HTTP 与 HTTPS，地址需以 `/v1` 结尾，此地址是调用方发起请求的入口，需填写正确以确保可正常接入。
- **日志保留天数**：设置调用数据的保留时长（可设置 1 至 365 天）。调用元数据将在到期后被分批清理，合理设置可兼顾追溯需要与存储空间。
- **协议转换**：控制是否开启协议转换能力。开启后，当无可用原生账号时，可将请求转换为已支持的 Chat Completions、Responses 或 Anthropic Messages 等协议直接调用上游；原生协议始终优先。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image1-Basic-Settings.png" alt="基础设置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  基础设置</div>

:::caution[协议转换并非无损]
协议转换并非无损。协议专属字段、工具调用、思考内容或多模态能力可能无法安全转换，并导致请求在调用上游前失败。
:::

## 3 性能设置

当网关并发请求较多，或上游响应较慢时，若不加以约束，可能造成资源占用过高或请求积压。性能设置用于对网关的并发、队列与请求超时等运行性能设定上限，避免负载失控，保障整体稳定。

主要配置项包括：

- **最大并发**：网关可同时处理的请求数量上限，用于控制并发规模。

- **队列大小**：当并发达到上限时，允许在队列中等待处理的请求数量。

- **队列等待超时**：请求在队列中等待的最长时间，超过后请求将超时失败。

- **非流式请求超时**：非流式请求从发出到完成的超时限制。

- **流式空闲超时**：流式请求在某段时间内无数据返回时的空闲超时，用于避免连接长期占用。

- **最大请求体**：允许接收的请求体积上限，超过后请求将被拒绝。

请在了解自身负载情况的基础上合理设置性能参数。设置过松可能导致资源占用过高，设置过紧则可能影响正常请求的处理。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image2-Performance-Settings.png" alt="性能设置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  性能设置</div>

## 4 向量服务

智能路由、内容合规等能力依赖**语义匹配**，而语义匹配需要先将文本转换为向量。向量服务用于配置向量化所使用的账号与模型，供智能路由和内容合规**共用**，为这些依赖向量计算的能力提供统一的基础支撑。

主要配置项包括：

- **向量账号**：提供向量能力的上游账号，需从账号池中选择，且仅可选择**已启用**的向量账号。

- **向量模型**：该账号下用于生成语义向量的模型，如 `intita-bge-embedding-0.6b`。
- **测试连接**：校验向量账号与模型是否可用。 

配置完成后，可通过「测试连接」验证向量服务的连通性。在智能路由的样本管理或内容合规的审核样本中构建向量时，将使用此处配置的服务。若向量服务未正确配置，相关样本将无法正常向量化，从而影响依赖其的能力。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image3-Vector-Service.png" alt="向量服务"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  向量服务</div>

## 5 智能路由

智能路由通过样本文本对请求进行分类，并选择对应模型组处理。其开关与判定参数需要在此统一配置，是智能路由功能能否生效的前提。可在页面中启用或停用智能路由，并设置分类判定的各项参数。

主要配置项包括：

- **状态**：智能路由的总开关，启用后能力生效。

- **虚拟模型名称**：对外暴露的模型名称，客户端使用该模型名发起文本请求时即触发智能路由（如 `1Panel-Auto`）。

- **简单请求模型组**：判定为简单，以及无法可靠判定的请求所使用的模型组。

- **复杂请求模型组**：判定为复杂的请求所使用的模型组。

- **分类阈值**：请求与样本的相似度达到该值时才参与分类判定，否则按简单请求处理。

- **置信度差距值**：最高与次高分类的置信度差距低于该值时，按简单请求处理。

- **Top K**：决策详情中最多展示的相似样本数。

以上参数与「智能路由」模块配合：样本在模块中维护，判定规则在此配置。请确保模型组已正确设置，并根据实测效果调整阈值与置信度差距值，以获得理想的路由结果。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image4-Smart-Routing-Settings.png" alt="智能路由设置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  智能路由设置</div>

## 6 内容合规

内容合规负责对请求内容进行审核与处置，其总开关与语义检测的判定阈值需要在此统一配置，是内容合规功能生效的前提。

主要配置项包括：

- **状态**：内容合规的总开关，启用后对请求内容进行审核。

- **语义阈值**：语义检测判定所需的相似度阈值。当请求内容与审核样本的相似度达到该值时，将按照所属策略规则的动作处理。

阈值设置与「内容合规」模块的审核行为相关：阈值越高，语义上越相近才判定命中；阈值越低，越易命中。请结合实际需求与误报、漏报情况合理调整。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image5-Content-Compliance-Settings.png" alt="内容合规设置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  内容合规设置</div>

## 7 Elasticsearch

网关产生的调用日志、审计日志等数据量较大且需要检索能力。通过对接 Elasticsearch，可将日志数据写入其中，便于高效存储、检索与分析。

:::caution[仅支持 Elasticsearch 9.x 版本]
当前仅支持 Elasticsearch **9.x** 版本（如 9.5.3），连接 8.x 及更早版本会提示"Elasticsearch 版本不受支持"。
:::

如果你还没有 Elasticsearch 服务，推荐直接在 **1Panel 应用商店** 中安装：进入 1Panel 的「应用商店」，搜索 **Elasticsearch**，在版本下拉框中选择 **9.x** 版本（如 9.5.3）完成安装，再回到本页填写该服务的地址与认证信息即可。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image7-Elasticsearch-App-Store.png" alt="在 1Panel 应用商店安装 Elasticsearch"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  在 1Panel 应用商店安装 Elasticsearch</div>

主要配置项包括：

- **Elasticsearch 地址**：目标 Elasticsearch 服务地址。
- **认证方式**：连接认证方式，可选 API Key 或 Basic Auth。 
- **API Key**：认证方式为 API Key 时填写的密钥。 
- **请求正文上限（KiB）**：每条请求正文最多保存的大小，超出部分截断。 
- **响应正文上限（KiB）**：每条响应正文最多保存的大小，超出部分截断。 
- **外部保留天数**：正文记录在外部 Elasticsearch 中的保留天数，到期自动清理。 
- **当前队列（条 / 字节）**：当前待写入队列的记录条数与字节数。 
- **累计丢弃**：累计未能写入的记录数。 
- **最近写入成功**：最近一次成功写入的时间。 
- **连续失败开始时间**：连续写入失败的起始时间。 

首次进入时该服务通常显示为"未配置"状态，需点击「配置」填写相关信息后方可使用。配置前请确认 Elasticsearch 服务可用且认证信息正确，并建议测试连通性后再投入使用。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/settings/image6-Elasticsearch-Settings.png" alt="Elasticsearch 设置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  Elasticsearch 设置</div>

## 8 注意事项

- **按需合理配置**：性能与各类阈值请结合自身负载与业务需求设置，过松或过紧都可能影响使用。

- **向量服务是基础**：智能路由、内容合规依赖向量化，配置或调整向量服务后，请确认相关样本可正常构建向量。

- **测试连接**：配置向量服务、Elasticsearch 等外部服务后，建议先测试连通性再投入使用。

- **更改进对外生效**：本页为全局配置，改动通常影响后续请求与数据，请确认无误后保存。
