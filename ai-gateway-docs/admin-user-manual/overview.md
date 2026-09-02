---
title: 概览
description: 介绍 1Panel AI 网关概览页的功能模块，包括网关状态、模型账号并发、用户组并发、用量统计与请求统计。
---

## 1 概览

### 1.1 功能简介

概览页是登录 1Panel AI 网关管理后台后默认显示的首页，用于集中查看网关当前的运行状态、模型账号并发情况、用户组并发情况以及 Token 用量与请求统计等实时信息，帮助管理员快速掌握网关整体运行状况。

概览页主要包含以下模块：

<div style={{textAlign:"center", color:"#5c6370", fontSize:"14px", fontWeight:"600", margin:"16px 0 8px"}}>表 1  概览页模块功能说明表/div>

| 模块 | 功能说明 |
|---|---|
| 网关状态 | 展示当前活跃用户、流式请求、网关并发与等待队列 |
| 模型账号并发 | 展示各上游模型账号的并发使用情况与健康状态 |
| 用户组并发 | 展示各用户组的并发使用情况与利用率 |
| 用量统计 | 展示 Token 总用量、输入/输出/缓存 Token 与缓存命中率 |
| 请求统计 | 展示请求总数、成功率、失败率、活跃用户与 API Key 数量 |

概览页中的运行数据为实时刷新数据，不同时间查看时数值会有所变化。

### 1.2 前提条件

1. **登录账号**：需要使用具备后台管理权限的账号；
2. **浏览器**：推荐选用 Chrome、Edge 等现代浏览器进行访问；
3. **网络**：网络环境需能够正常访问 1Panel AI 网关管理地址。

### 1.3 功能入口

1. 在浏览器中打开 1Panel AI 网关管理地址，进入登录页面。
2. 输入用户名和密码，单击**登录**。
3. 登录成功后默认进入**概览**页面。

<img src="/img/overview/image1_Overview_Full_Page.png" alt="概览页整体布局" style={{display:"block", margin:"16px auto", maxWidth:"85%"}} />

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 1  概览页整体布局</div>

:::note[说明]
登录后默认进入概览页。如需从其他页面返回概览页，单击左侧菜单顶部的**概览**即可。
:::


## 2 网关状态

网关状态模块以卡片形式展示网关当前的实时运行指标，包括当前活跃用户、当前流式请求、当前网关并发和当前等待队列。

<img src="/img/overview/image2_Gateway_Status_Module.png" alt="网关状态模块" style={{display:"block", margin:"16px auto", maxWidth:"85%"}} />

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 2  网关状态模块</div>

各项指标说明如下：

1. 当前活跃用户：当前正在与网关交互的活跃用户数。
2. 当前流式请求：当前正在进行的流式请求数。
3. 当前网关并发：网关当前并发数 / 最大并发数上限。
4. 当前等待队列：当前排队等待处理的请求数 / 队列上限。


## 3 模型账号并发

模型账号并发模块以列表形式展示各上游模型账号的并发使用情况，帮助管理员掌握各模型账号的负载与健康状态。

<img src="/img/overview/image3_Model_Account_Concurrency_Module.png" alt="模型账号并发模块" style={{display:"block", margin:"16px auto", maxWidth:"85%"}} />

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 3  模型账号并发模块</div>

列表各列含义如下：

<div style={{textAlign:"center", color:"#5c6370", fontSize:"14px", fontWeight:"600", margin:"16px 0 8px"}}>表 2  模型账号并发字段说明</div>

| 字段 | 说明 |
|---|---|
| 上游账号 | 上游模型账号名称 |
| 优先级 | 账号路由优先级（S 表示高优先级，F 表示普通优先级） |
| 当前 / 上限 | 当前并发数 / 最大并发数上限 |
| 利用率 | 当前并发占上限的百分比 |
| 健康状态 | 账号当前运行状态，正常时显示为**健康** |

<div style={{textAlign:"center", color:"#5c6370", fontSize:"14px", fontWeight:"600", margin:"16px 0 8px"}}>表 3  模型账号并发示例数据</div>

| 上游账号 | 优先级 | 当前 / 上限 | 利用率 | 健康状态 |
|---|---|---|---|---|
| DeepSeek 官方 | — | 0/100 | 0% | 健康 |
| stepfun | S | 0/100 | 0% | 健康 |
| 阿里云向量模型 | S | 0/100 | 0% | 健康 |
| 腾讯云向量模型 | S | 0/100 | 0% | 健康 |
| f2c-qwen3.8-flash-next | F | 0/100 | 0% | 健康 |

:::note[说明]
当某个模型账号存在故障或并发达到上限时，其健康状态与利用率会发生变化，管理员可据此及时调整模型账号配置。
:::


## 4 用户组并发

用户组并发模块展示各用户组的并发使用情况与利用率，帮助管理员掌握不同用户组的负载状况。

<img src="/img/overview/image4_User_Group_Concurrency_Module.png" alt="用户组并发模块" style={{display:"block", margin:"16px auto", maxWidth:"85%"}} />

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 4  用户组并发模块</div>

**字段说明**

用户组：用户组名称。
当前 / 上限：当前并发数 / 最大并发数上限。
利用率：当前并发占上限的百分比。


## 5 用量统计

用量统计模块展示网关上 Token 的总体使用情况，支持按不同时间范围查看，并提供总 Token 的趋势图表。

<img src="/img/overview/image5_Usage_Statistics_Module.png" alt="用量统计模块" style={{display:"block", margin:"16px auto", maxWidth:"85%"}} />

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 5  用量统计模块</div>

### 5.1 时间范围

单击右上角的**近 24 小时**、**近 7 天**或**近 30 天**，可切换统计时间范围。

### 5.2 统计指标

<div style={{textAlign:"center", color:"#5c6370", fontSize:"14px", fontWeight:"600", margin:"16px 0 8px"}}>表 4  用量统计指标说明</div>

| 指标 | 说明 |
|---|---|
| 总 Token | 统计时间范围内产生的 Token 总量 |
| 输入 Token | 统计时间范围内的输入 Token 量 |
| 输出 Token | 统计时间范围内的输出 Token 量 |
| 缓存 Token | 统计时间范围内的缓存 Token 量 |
| 缓存命中率 | 缓存命中的 Token 占总请求 Token 的比例 |

:::note[说明]
概览页中的用量数据为实时刷新数据，正文所列为示例数值，实际数值以页面展示为准。
:::


## 6 请求统计

请求统计模块展示网关处理请求的总体情况，包括请求总数、成功/失败数量、失败率、活跃用户数与 API Key 数量。

<img src="/img/overview/image6_Request_Statistics_Module.png" alt="请求统计模块" style={{display:"block", margin:"16px auto", maxWidth:"85%"}} />

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 6  请求统计模块</div>

请求统计各项指标说明如下：
请求总数为统计时间范围内的请求总量；成功代表处理成功的请求数；失败代表处理失败的请求数；失败率是失败请求占请求总数的比例；活跃用户指统计时间范围内的活跃用户数；API Key 为当前启用的 API Key 数量。

:::note[说明]
请求统计随所选时间范围变化，并与用量统计使用同一时间粒度。
:::


## 7 注意事项

- 概览页中的运行指标与统计数值为实时数据，随时间动态变化，文档示例数值仅供参考。
- 当**网关并发**或**等待队列**接近其上限时，建议关注是否存在请求积压或账号并发不足的情况。
- 当某**模型账号**健康状态异常或利用率持续接近上限时，建议检查对应上游账号的连通性与配额配置。
- 各用户组的并发上限、模型账号并发上限可在**设置**或对应的管理页面中调整。
