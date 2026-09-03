---
title: 概览
description: 介绍 1Panel AI 网关概览页的功能模块，包括网关状态、模型账号并发、用户组并发、用量统计与请求统计。
---

## 1 概述

概览页是登录 1Panel AI 网关管理后台后默认显示的首页，集中展示网关实时运行状态、模型账号并发、用户组并发、Token 用量、请求统计等监控数据，方便管理员快速掌握网关整体运行情况。概览页中的运行数据为实时刷新数据，不同时间查看时数值会有所变化。

<img style={{display:"block", margin:"16px auto", maxWidth:"100%"}} src="/img/overview/image1_Overview_Full_Page.png" alt="概览页整体布局"/>

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 1  概览页整体布局</div>

:::note[说明]
登录后默认进入概览页。如需从其他页面返回概览页，单击左侧菜单顶部的**概览**即可。
:::


## 2 网关状态

**网关状态模块以卡片形式展示网关的实时运行指标，共 4 项：当前活跃用户、当前流式请求、当前网关并发（当前值/上限值）和当前等待队列（当前值/上限值）。** 运行中，当网关并发接近上限或等待队列持续非空时，表明请求出现积压，建议及时关注并排查上游负载。

<img style={{display:"block", margin:"16px auto", maxWidth:"100%"}} src="/img/overview/image2_Gateway_Status_Module.png" alt="网关状态模块"/>

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 2  网关状态模块</div>


## 3 模型账号并发

**模型账号并发模块展示各上游模型服务账号的并发使用情况，包括优先级、当前并发数、并发上限、利用率（当前并发/上限）及健康状态。** 通过该模块，管理员可掌握各上游账号的实时负载与可用性：利用率较高的账号可考虑扩容或分流，健康状态异常的账号可及时切换或排查，保障模型服务稳定可用。

<img style={{display:"block", margin:"16px auto", maxWidth:"100%"}} src="/img/overview/image3_Model_Account_Concurrency_Module.png" alt="模型账号并发模块"/>

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 3  模型账号并发模块</div>

:::note[说明]
当某个模型账号存在故障或并发达到上限时，其健康状态与利用率会发生变化，管理员可据此及时调整模型账号配置。
:::


## 4 用户组并发

**用户组并发模块实时展示各用户组的并发请求使用情况，包括当前并发数、并发上限及利用率（利用率 = 当前并发数 / 并发上限）。** 通过该模块，管理员可直观对比不同用户组的负载水平，快速定位并发压力较高的用户组，并据此调整各组的并发配额，保障整体网关运行稳定。

<img style={{display:"block", margin:"16px auto", maxWidth:"100%"}} src="/img/overview/image4_User_Group_Concurrency_Module.png" alt="用户组并发模块"/>

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 4  用户组并发模块</div>


## 5 用量统计

用量统计模块支持按近 24 小时/近 7 天/近 30 天查看网关整体的使用情况，主要包含以下数据：

- **Token 用量**：总量、输入、输出、缓存及缓存命中率，反映调用规模。

- **请求统计**：请求总数、成功数、失败数及失败率，反映调用质量。

- **活跃用户**：统计所选时间范围内发起过请求的用户数。  

- **API Key**：当前活跃用户所关联的 API Key 数量。

- 底部趋势图展示核心指标（如 Token 用量或请求量）在所选时间范围内的走势，便于观察波动与峰值。

<img style={{display:"block", margin:"16px auto", maxWidth:"100%"}} src="/img/overview/image5_Usage_Statistics_Module.png" alt="用量统计模块"/>

<div style={{textAlign:"center", color:"#8a8f99", fontSize:"14px", margin:"8px 0 24px"}}>图 5  用量统计模块</div>

:::note[说明]
概览页中的用量数据为实时刷新数据，正文所列为示例数值，实际数值以页面展示为准。
:::


## 6 注意事项

- 概览页中的运行指标与统计数值为实时数据，随时间动态变化，文档示例数值仅供参考。
- 当网关并发或等待队列接近上限时，建议关注是否存在请求积压的情况。
- 当某模型账号健康状态异常或利用率持续接近上限时，建议检查对应上游账号的连通性与配额配置。
- 各用户组的并发上限、模型账号并发上限可在设置页面或相应的管理页面中调整。
