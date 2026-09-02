---
title: 智能路由
description: 介绍 1Panel AI 网关智能路由的样本管理、决策日志与统计，实现请求自动分类与模型调度。
---

智能路由是 1Panel AI 网关根据请求内容自动选择合适模型并实现分类转发的核心功能。系统通过预置分类样本识别请求复杂度，结合本地规则、向量相似度等来源作出路由决策，将每次决策记录到日志，并通过统计页面展示整体分布情况。

:::note[说明]
本文内容基于 1Panel AI 网关实测验证，截图取自测试环境，实时数据以当前网关配置为准。
:::

## 1 功能简介

智能路由用于根据请求内容自动匹配并选择合适的模型，实现请求的分类转发与模型调度。系统通过预置的分类样本来识别请求的复杂度，结合本地规则、向量相似度等来源作出路由决策，并将每次决策记录到决策日志中，最终通过统计页面展示整体分布情况。

智能路由包含三个模块：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  智能路由模块</div>

| 模块 | 说明 |
|---|---|
| 样本管理 | 维护用于请求分类的样本数据，设置样本标签与单样本阈值 |
| 决策日志 | 查看每次请求的路由分类、决策来源、选中模型与置信度等信息 |
| 统计 | 按标签、来源、模型与 Token 维度查看决策分布 |

## 2 前提条件

使用智能路由功能前，需满足以下条件：

- 已安装并启动 1Panel AI 网关，并以管理员账号登录后台。
- 已在 **模型组** 中配置可用的模型与账号池。
- 网关已产生真实请求流量，决策日志与统计模块才有数据可查。

## 3 功能入口

登录 1Panel AI 网关后台后，在左侧菜单栏中单击 **智能路由**，进入智能路由功能页。页面顶部提供三个标签页：**样本管理**、**决策日志**、**统计**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/smart_route/image1_Smart_Routing_Entry.png" alt="智能路由功能入口"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  智能路由功能入口</div>

## 4 样本管理

样本管理用于维护请求分类所需的路由样本。系统根据样本与请求的相似度对请求进行分类，分类结果决定请求被路由到简单或复杂模型。

### 4.1 样本列表

进入智能路由后默认显示样本管理页。样本列表按分页展示全部样本，包含标签、样本文本、向量与操作等信息。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/smart_route/image2_Sample_Management.png" alt="样本管理列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  样本管理列表</div>

### 4.2 添加样本

单击 **添加样本**，在弹出的表单中填写样本信息后保存，即可新增一个路由样本。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/smart_route/image4_Add_Sample.png" alt="添加样本"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  添加样本</div>

添加样本的表单字段说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  添加样本字段</div>

| 字段 | 说明 |
|---|---|
| 标签 | 样本所属的分类标签，可选择简单或复杂 |
| 样本文本 | 样本的具体内容，最长支持 65536 个字符 |
| 单样本阈值 | 该样本参与分类判定时的生效阈值 |
| 备注 | 样本的补充说明，选填 |
| 保存后生成向量 | 勾选后保存时自动为该样本构建向量 |

:::tip[提示]
可在样本列表中选择多条样本后，单击 **构建选中向量** 批量构建；单击 **构建全部向量** 可为全部样本一次性构建向量。
:::

### 4.3 决策预览

单击 **决策预览**，可输入一条请求样本，先查看路由决策的预判结果，确认无误后再决定是否添加为正式样本。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/smart_route/image3_Decision_Preview.png" alt="决策预览"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  决策预览</div>

决策预览支持按上下文路由选择分类，常用操作说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  决策预览操作</div>

| 操作 | 说明 |
|---|---|
| 请求样本 | 输入用于预览路由结果的请求文本 |
| 决策预览 | 根据当前上下文执行路由决策判断 |
| 添加为样本 | 将当前请求样本保存为新的路由样本 |
| 取消 | 关闭决策预览窗口 |

## 5 决策日志

决策日志用于记录网关每一次请求的路由决策结果，可按分类、来源、请求类型与时间进行筛选查询。

### 5.1 日志列表

进入决策日志页后，可查看每次请求的决策记录，包括请求 ID、路由分类、决策来源、选中模型、置信度、请求类型与决策耗时等。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/smart_route/image5_Decision_Logs.png" alt="决策日志列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  决策日志列表</div>

决策日志支持以下筛选条件：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  决策日志筛选条件</div>

| 条件 | 说明 |
|---|---|
| 全部分类 | 按路由分类筛选，如简单、复杂 |
| 全部来源 | 按决策来源筛选，如本地规则、embedding |
| 全部请求类型 | 按请求类型筛选，如真实请求 |
| 决策时间 | 按决策发生的时间范围筛选 |

### 5.2 查看决策详情

在决策日志列表中，单击某条记录所在行的 **查看**，可查看该次决策的完整详情，包括路由分类、决策来源、置信度、选中模型、各类评分以及 Top K 命中样本等。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/smart_route/image6_Decision_Detail.png" alt="决策详情"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  决策详情</div>

决策详情中的主要信息说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 5  决策详情字段</div>

| 字段 | 说明 |
|---|---|
| Request ID | 该次请求的唯一标识 |
| 路由分类 | 请求被划分到的路由分类，如简单、复杂 |
| 决策来源 | 决策依据的来源，如本地规则、embedding |
| 选中模型 | 最终路由选中的模型名称 |
| 置信度 | 本次决策的可信程度 |
| 决策耗时 | 完成本次决策所花费的时间 |
| 回退原因 | 当未达到分类阈值时回退的原因说明 |
| Top K 命中样本 | 与请求相似度最高的前 K 个样本及其相似度 |

## 6 统计

统计模块以时间维度（默认近 30 天）汇总展示智能路由的整体决策情况，包含核心指标与多维度分布。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/smart_route/image7_Statistics.png" alt="统计概览"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  统计概览</div>

### 6.1 核心指标

统计页顶部展示六项核心指标，说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 6  核心指标说明</div>

| 指标 | 说明 |
|---|---|
| 决策数 | 统计周期内的路由决策总次数 |
| 真实请求数 | 统计周期内的真实请求数量 |
| 失败数 | 统计周期内决策失败的次数 |
| 总 Token | 统计周期内消耗的 Token 总量 |
| 平均 Token | 平均每次请求消耗的 Token 数量 |
| 累计耗时 | 统计周期内决策累计消耗的时间 |

### 6.2 多维分布

统计页下方按以下四个维度展示决策分布：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 7  分布维度说明</div>

| 分布维度 | 说明 |
|---|---|
| 按标签分布 | 简单与复杂分类各自的决策数量与占比 |
| 按来源分布 | 不同决策来源（如本地规则、embedding）的数量与占比 |
| 按模型分布 | 各选中模型的使用次数与占比 |
| 按总 Token 分布 | 简单与复杂分类消耗 Token 的占比 |

:::note[说明]
统计页支持切换时间维度查看不同周期的数据，包括近 24 小时、近 7 天与近 30 天。
:::

## 7 注意事项

- 样本的标签与阈值设置会直接影响路由分类结果，设置前建议先通过决策预览验证效果。
- 构建向量需要消耗一定时间与资源，样本较多时建议使用 **构建全部向量** 一次性完成。
- 决策日志与统计模块的数据来自真实请求流量，仅当网关产生请求后才有记录。
- 统计中的数值为动态数据，本文截图中的具体数值仅作示例展示。
