---
title: 账号池
description: 介绍 1Panel AI 网关账号池，包括添加上游账号、供应商与协议配置、模型映射与调度字段。
---

## 功能简介

账号池用于集中保存网关连接各类模型供应商所需的配置。每个上游账号固定一个协议类型，可包含多个具体协议和多个模型映射。运行期间，网关会综合协议兼容性、模型、优先级、健康状态和并发上限等因素，自动选择最合适的可用账号。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/account_pool/image1_account_pool_list.png" alt="账号池列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  账号池列表</div>

在账号池页面，你可以完成新增账号、编辑账号、启用 / 禁用账号、删除账号以及按供应商 / 协议 / 状态等维度筛选查看等操作。

## 1.1 支持的供应商

账号池预置了多种常见供应商类型，覆盖云模型与聚合平台、国内云平台、开发与本地服务，以及完全自定义的供应商。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/account_pool/image2_provider_dropdown.png" alt="供应商下拉"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  供应商下拉</div>

不同供应商提供的账号类型、默认地址、协议、默认模型和模型发现能力存在差异，实际可选内容以添加账号表单中的选项为准。常见分类如下：

- **云模型与聚合平台**：OpenAI、Anthropic、Gemini、OpenRouter、DeepSeek、Kimi、MiniMax、智谱 Z.ai、硅基流动；
- **国内云平台**：阿里云百炼、火山引擎方舟、百度智能云千帆、腾讯云 TokenHub、小米；
- **开发与本地服务**：OpenCode、Ollama、vLLM；
- **自定义**：可编辑服务地址、协议路由和认证方式，用于兼容其他服务。

## 2 功能入口

登录 1Router 控制台后，选择左侧菜单 **账号池**，即可进入上游账号管理页面。页面默认以表格形式展示已创建的上游账号及其关键字段，如图 1 所示。

## 3 添加上游账号

添加上游账号的完整流程为：选择供应商与协议类型，填写名称、服务地址与 API Key，按需配置协议与模型映射，最后设置调度字段并保存。以下按表单顺序逐一说明。

## 3.1 打开添加账号表单

单击账号池页面左上角的 **添加账号** 按钮，系统会弹出添加账号抽屉。抽屉中依次包含供应商、协议类型、名称、服务地址、API Key、协议配置、模型映射、验证模型、调度字段等内容。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/account_pool/image3_add_account_form.png" alt="添加账号表单"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  添加账号表单</div>

## 3.2 选择供应商与协议类型

在 **供应商** 下拉框中选择目标供应商。若供应商提供多种账号类型，还需继续选择按量付费、Coding Plan、Token Plan 等类型。

在 **协议类型** 处选择账号承载的协议类型，支持三种：

- **文本**：用于文本对话类模型；
- **文生图**：用于图片生成类模型；
- **向量**：用于向量 Embeddings 类模型。

:::note[注意]
编辑已有账号时，账号类型和协议类型不可直接修改；如需变更，通常需要重新创建账号。
:::

## 3.3 填写账号名称、服务地址与 API Key

完成供应商与协议类型选择后，继续填写以下基础信息：

- **名称**：账号在 1Router 中的显示名称；
- **服务地址**：固定端点由系统根据供应商自动提供；自定义端点则需填写有效的 HTTPS / HTTP 地址；
- **API Key**：供应商提供的访问密钥。凭据编辑时留空表示沿用已保存的 API Key。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/account_pool/image4_deepseek_form.png" alt="DeepSeek 账号表单"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  DeepSeek 账号表单</div>

## 3.4 核对支持协议与认证方式

系统会根据所选供应商自动列出支持协议。以自定义供应商为例，可选择多个协议，并为每个协议配置路由与认证方式。支持的认证方式包括 Bearer Token、x-api-key 或 x-goog-api-key。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/account_pool/image5_custom_provider_form.png" alt="自定义供应商表单"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  自定义供应商表单</div>

文本协议包括 OpenAI Chat Completions、OpenAI Responses、Anthropic Messages 和 Gemini Generate Content；向量账号使用 OpenAI Embeddings 兼容协议；文生图账号支持 OpenAI Images 及多个供应商的图片协议转换。

## 3.5 维护模型映射

**模型映射** 用于建立客户端请求模型名称与供应商侧上游模型名称之间的对应关系。添加或编辑账号时，在模型映射区域填写：

- **请求模型名称**：客户端实际请求的模型名称；
- **上游模型名称**：调用供应商接口时使用的模型名称。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/account_pool/image6_model_mapping.png" alt="模型映射"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  模型映射</div>

一个上游账号至少保留一个模型映射，最多支持 100 个。同一账号内的请求模型名称不能重复。若需要获取供应商侧最新模型列表，可在表单中单击 **发现模型**，系统将供应商返回的模型与当前映射进行比较，方便快速补全。

## 3.6 设置调度字段并保存

在抽屉底部的 **调度** 区域设置：

- **优先级**：0 ~ 1000，数值越高越优先被调度；同级账号参与轮询或亲和选择；
- **最大并发**：0 ~ 100000，限制该账号同时处理的请求数；0 表示不额外设置账号级限制。

填写完成后单击 **保存**。保存时，文本和向量账号在创建或关键连接信息变更后会执行最小调用验证；文生图账号保存时不会实际生成图片。

## 4 调度字段

账号池列表与编辑表单中均包含调度字段，用于控制账号在运行时的调度行为。关键字段说明见表 1。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  调度字段说明</div>

| 字段 | 取值 | 作用 |
| --- | --- | --- |
| 优先级 | 0 ~ 1000 | 网关优先选择优先级更高的可用账号；同级账号参与轮询或亲和选择。 |
| 最大并发 | 0 ~ 100000 | 限制该账号同时处理的请求数；0 表示不额外设置账号级限制。 |
| 启用状态 | 启用 / 禁用 | 禁用后账号不再进入运行时候选集合。 |
| 健康状态 | 可用 / 冷却 / 不可用 | 由连接验证和运行时调用结果自动维护。 |

## 5 编辑、启停与删除

在账号池列表的操作列，可对每个账号执行以下操作：

- **编辑**：修改名称、凭据、地址、协议路由、模型映射、验证模型、优先级、最大并发和备注；
- **启用 / 禁用**：通过列表中的开关控制账号是否参与调度；
- **删除**：单击删除并确认后，账号及其模型映射将被移除。若账号正被向量服务等功能引用，则不能直接删除；
- **筛选**：可按供应商、协议类型、具体协议、状态和关键字筛选，并选择显示模型、优先级、最大并发等列。
