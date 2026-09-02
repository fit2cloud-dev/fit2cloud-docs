---
title: 内容合规
description: 介绍 1Panel AI 网关内容合规功能，包括敏感词、审核样本、策略组与审核日志。
---

内容合规是 1Panel AI 网关发送给上游大模型的请求内容进行安全检测与处置的功能。系统通过敏感词、审核样本等检测方式识别命中内容，并按策略组定义的处置动作执行仅审计或拦截，同时保留全部审核日志供追溯。

:::note[说明]
本文内容基于 1Panel AI 网关实测验证，截图取自测试环境，实时数据以当前网关配置为准。
:::

## 1 功能简介

内容合规用于对模型请求内容进行检测与处置，防止违规、敏感或有害内容进入模型调用链路。内容合规通过检测方式识别命中内容，并按策略组定义的处置动作执行仅审计或拦截。

内容合规页面位于侧边栏「内容合规」入口，页面内通过顶部标签切换 4 个管理视图：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  内容合规模块</div>

| 模块 | 说明 |
|---|---|
| 敏感词 | 维护需要检测的敏感词清单 |
| 审核样本 | 维护用于语义向量检测的样本数据 |
| 策略组 | 定义检测处置策略，包括处置动作与风险等级 |
| 审核日志 | 查看全部请求的检测与处置记录 |

## 2 前提条件

使用内容合规功能前，需满足以下条件：

- 已安装并启动 1Panel AI 网关，并以管理员账号登录后台。
- 网关已产生真实请求流量，审核日志模块才有数据可查。
- 需要在策略组中先创建并启用策略，敏感词与审核样本需归属于某个策略组。

## 3 功能入口

登录 1Panel AI 网关后台后，在左侧菜单栏中单击 **内容合规**，进入内容合规页面，默认展示「敏感词」标签页。功能入口位置如 图 1 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image1_Content_Compliance_Entry.png" alt="内容合规功能入口"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  内容合规功能入口</div>

## 4 敏感词管理

敏感词用于按字符串匹配检测请求内容。在「敏感词」标签页可查看敏感词列表，支持按策略组与状态筛选，敏感词列表如 图 2 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image2_Sensitive_Words_List.png" alt="敏感词列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  敏感词列表</div>

敏感词列表字段说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  敏感词列表字段</div>

| 字段 | 说明 |
|---|---|
| 敏感词 | 需要检测的敏感词内容 |
| 策略组 | 该敏感词所属的策略组 |
| 备注 | 对该敏感词的补充说明 |
| 状态 | 启用 / 禁用 |
| 创建时间 | 敏感词的创建时间 |
| 操作 | 编辑、删除 |

### 4.1 添加敏感词

在「敏感词」标签页单击 **添加敏感词**，在右侧抽屉中填写敏感词信息，如 图 3 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image3_Add_Sensitive_Word.png" alt="添加敏感词"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  添加敏感词</div>

添加敏感词的表单字段说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  添加敏感词字段</div>

| 字段 | 是否必填 | 说明 |
|---|---|---|
| 策略组 | 是 | 选择该敏感词所属的策略组 |
| 敏感词 | 是 | 输入需要检测的敏感词内容 |
| 备注 | 否 | 补充说明 |
| 状态 | 否 | 启用 / 禁用，默认启用 |

填写完成后单击 **保存**，即可将敏感词加入检测列表。

:::tip[提示]
敏感词支持多词条批量添加，可通过 **批量导入** 一次性录入多条数据；敏感词内容区分大小写，请按实际需要录入。
:::

### 4.2 批量导入敏感词

当需要批量录入敏感词时，在「敏感词」标签页单击 **批量导入**，在右侧抽屉中选择策略组并输入多条敏感词，如 图 4 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image4_Batch_Import_Sensitive_Words.png" alt="批量导入敏感词"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  批量导入敏感词</div>

批量导入的表单字段说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  批量导入字段</div>

| 字段 | 是否必填 | 说明 |
|---|---|---|
| 策略组 | 是 | 批量导入的敏感词所属策略组 |
| 敏感词 | 是 | 多条敏感词内容，按条分隔录入 |
| 状态 | 否 | 启用 / 禁用，默认启用 |

填写完成后单击 **批量导入**，即可批量保存。

## 5 审核样本管理

审核样本用于支撑语义向量检测。当检测方式采用向量相似度时，系统将请求内容与审核样本构建的语义向量进行比对，命中相似样本后按策略处置。审核样本列表如 图 5 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image5_Audit_Samples_List.png" alt="审核样本列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  审核样本列表</div>

审核样本列表字段说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 5  审核样本列表字段</div>

| 字段 | 说明 |
|---|---|
| 样本文本 | 样本的具体内容 |
| 策略组 | 样本所属的策略组 |
| 备注 | 补充说明 |
| 向量状态 | 是否已构建语义向量 |
| 向量维度 | 已构建向量的维度 |
| 状态 | 启用 / 禁用 |
| 操作 | 编辑、删除 |

审核样本页提供以下操作：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 6  审核样本操作</div>

| 操作 | 说明 |
|---|---|
| 添加审核样本 | 录入新的审核样本，录入后需构建向量才能用于检测 |
| 构建选中向量 | 为勾选的样本构建语义向量 |
| 构建全部向量 | 为列表内全部样本构建语义向量 |

:::note[说明]
审核样本需先构建语义向量后方可参与语义检测。尚未构建向量的样本在「向量状态」中展示为未构建。
:::

## 6 策略组管理

策略组用于定义一套完整的检测处置策略。在「策略组」标签页可查看已创建的策略组列表，并支持按动作、风险等级与状态筛选，策略组列表如 图 6 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image6_Policy_Groups_List.png" alt="策略组列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  策略组列表</div>

策略组列表字段说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 7  策略组列表字段</div>

| 字段 | 说明 |
|---|---|
| 策略组 | 策略组名称 |
| 动作 | 仅审计 / 拦截 |
| 风险等级 | 低 / 中 / 高 |
| 敏感词 | 关联的敏感词条数 |
| 审核样本 | 关联的审核样本数 |
| 状态 | 启用 / 禁用 |
| 描述 | 策略组描述 |
| 操作 | 编辑、删除 |

### 6.1 添加策略组

在「策略组」标签页单击 **添加策略组**，在右侧抽屉中配置策略组信息，如 图 7 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image7_Add_Policy_Group.png" alt="添加策略组"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  添加策略组</div>

添加策略组的表单字段说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 8  添加策略组字段</div>

| 字段 | 是否必填 | 说明 | 默认值 |
|---|---|---|---|
| 名称 | 是 | 策略组名称 | — |
| 动作 | 是 | 仅审计：仅记录不拦截；拦截：命中后直接拦截请求 | 拦截 |
| 风险等级 | 是 | 低 / 中 / 高，标记命中的风险程度 | 中 |
| 状态 | 否 | 启用 / 禁用 | 启用 |
| 描述 | 否 | 策略组说明，最长 512 字 | — |

:::warning[警告]
策略组动作设置为拦截后，命中内容将直接拦截请求，不向模型发送；仅审计则只记录日志、不做拦截。配置前请确认处置预期。
:::

## 7 审核日志

审核日志记录所有经过内容合规检测的请求及其处置结果，用于审计追溯。在「审核日志」标签页可按动作、风险等级、检测方式与策略组筛选，并可搜索，审核日志列表如 图 8 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image8_Audit_Logs_List.png" alt="审核日志列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  审核日志列表</div>

审核日志列表字段说明如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 9  审核日志列表字段</div>

| 字段 | 说明 |
|---|---|
| 审核时间 | 请求的审核时间 |
| Request ID | 本次请求的唯一标识 |
| 请求模型 | 请求使用的上游模型 |
| 客户端协议 | 客户端使用的协议，如 openai-completions |
| 动作 | 仅审计 / 拦截 / 移除历史消息 |
| 风险等级 | 低 / 中 / 高 |
| 命中项 | 命中的检测条目数 |
| 状态码 | 请求返回的状态码 |
| 操作 | 查看详情 |

### 7.1 查看日志详情

在「审核日志」列表单击某条记录的 **查看**，在右侧抽屉中查看该请求的完整审核详情，如 图 9 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image9_Audit_Log_Detail.png" alt="审核日志详情"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  审核日志详情</div>

审核详情包含以下信息：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 10  审核日志详情字段</div>

| 字段 | 说明 |
|---|---|
| Request ID | 本次请求的唯一标识 |
| 审核时间 | 审核发生的时间 |
| 请求模型 | 请求使用的上游模型 |
| 客户端协议 | 客户端协议类型 |
| 动作 | 最终处置动作 |
| 风险等级 | 命中的最高风险等级 |
| 状态码 | 请求返回状态码 |
| 已移除历史消息 | 处置中是否移除了历史消息 |
| 命中详情 | 各检测方式命中的策略组、证据、置信度、动作与风险等级 |
| 策略快照 | 命中时对应策略组的配置快照 |

在详情抽屉中可单击 **查看正文** 查看请求的完整内容。

## 8 注意事项

- 敏感词与审核样本需归属于某个策略组，请先在 **策略组** 中创建策略并以启用状态运行。
- 策略组动作设置为拦截后，命中内容将直接拦截请求，配置前请确认处置预期。
- 审核样本需构建语义向量后方可生效，新增样本后请及时构建向量。
- 实时数据（请求记录、敏感词条数等）随实际流量动态变化，本文截图中的具体数值仅作示例展示。
