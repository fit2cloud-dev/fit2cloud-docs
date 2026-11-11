---
title: 模型服务
sidebar_label: 模型服务
description: 介绍 1Panel 模型服务的添加、编辑、模型池与验证状态管理。
---

## 1 功能简介

模型部署完成后，模型状态展示为 **已就绪**，下面我们可以直接进入模型服务模块。页面说明为：统一接入公有云、本地推理引擎和 AI 网关等模型服务，供 1Panel 内置智能体及 WorkBuddy 等外部智能体调用。

在 **模型服务** 页可以单击 **添加** 接入新的模型服务，通过 **编辑**、**模型池**、**更多** 管理已有记录，并用 **API 类型**、**模型供应商** 和 **搜索** 定位记录。列表的 **验证状态** 列显示 **验证成功** 或 **验证失败**，**操作** 列提供 **编辑**、**模型池** 与 **更多**。

图 1 为模型部署完成后在模型服务列表中的结果：两条记录的 **模型供应商** 均为 **vLLM**，**API 类型** 均为 **openai-completions**，**验证状态** 分别为 **验证失败** 与 **验证成功**，红框标出的是 **验证成功**。该条记录显示 **验证成功**，是因为其对应的模型已处于 **已就绪** 状态。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_services_01_model_services_verified.png" alt="图 1  模型部署完成后的模型服务列表与验证成功状态" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  模型部署完成后的模型服务列表与验证成功状态</div>

## 2 页面概览

工具条从左到右为 **添加**、**API 类型** 下拉、**模型供应商** 下拉、**搜索** 输入框，右侧依次为搜索、**刷新** 与 **选择列** 图标。列表下方显示 **共 2 条**、**10条/页**、页码与 **前往**。单击 **选择列** 图标展开面板，可勾选 **名称**、**模型供应商**、**API 类型**、**模型**、**验证状态**、**端点**、**创建时间**，如图 2 所示。**创建时间** 列可通过该面板控制是否显示，图 1 未显示该列。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_services_02_column_selector.png" alt="图 2  模型服务列表与选择列" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  模型服务列表与选择列</div>

## 3 筛选与搜索

**API 类型** 下拉列出 `anthropic-messages`、`dashscope-images`、`gemini-generate-content`、`minimax-images`、`openai-completions`、`openai-embeddings`、`openai-images`、`openai-responses`、`openrouter-images`。

**模型供应商** 下拉在 **AI** 分组下列出 **自定义**、**Ollama**、**vLLM**、**1Panel AI 网关**，其后还有 **DeepSeek**、**阿里云百炼 Coding Plan**、**阿里云百炼**、**火山方舟 Coding Plan**、**火山方舟**、**Z.ai**、**MiniMax (CN)**、**Xiaomi**、**Kimi (CN)**、**Kimi Coding**、**OpenAI**、**OpenRouter**、**Anthropic**、**Gemini**、**Moonshot (Global)**、**LL**、**llmman**，如图 3 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_services_03_vendor_filter.png" alt="图 3  模型供应商筛选下拉" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  模型供应商筛选下拉</div>

在 **搜索** 输入框填写关键字后，单击右侧搜索按钮过滤列表；单击 **刷新** 图标重新加载列表。

## 4 添加模型服务

单击工具条 **添加** 打开表单，左上角为 **返回**，右上角为关闭按钮，底部为 **取消** 与 **确认**。**模型供应商** 默认 **自定义**，**API 类型** 默认 **openai-completions**，**模型池** 默认 **自动获取**，如图 4 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_services_04_add_service_custom.png" alt="图 4  添加模型服务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  添加模型服务</div>

填写完成后单击 **确认** 提交，单击 **取消** 放弃；单击 **返回** 或右上角关闭按钮退出。

**模型供应商** 选择 **vLLM** 时，表单增加 **创建方式**，提供 **手动输入** 与 **选择** 两个选项。选择 **选择** 后出现必填的 **本地推理引擎** 下拉，**模型池** 固定为 **手动配置**，如图 5 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_services_05_add_service_vllm_select.png" alt="图 5  添加模型服务与本地推理引擎选择" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  添加模型服务与本地推理引擎选择</div>

## 5 编辑模型服务

在 **操作** 列单击 **编辑**，打开标题为 **编辑** 的表单。字段与添加一致并带入当前值：**名称** 为 f2c-auto，**模型供应商** 为 **自定义**，**API 类型** 为 **openai-completions**，**Base URL** 显示已保存地址，**API Key** 以掩码显示，**记住认证信息** 与 **保存时验证可用性** 保留当前状态，如图 6 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_services_06_edit_service.png" alt="图 6  编辑模型服务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  编辑模型服务</div>

**模型池** 可在 **自动获取** 与 **手动配置** 间切换；手动配置下通过表格维护 **验证**、**模型**、**名称** 与 **操作**，并提供行内 **添加** 与 **删除**。说明文字为：选择用于验证服务可用性的模型；验证结果仅代表该模型在验证时的可用性。下方提供 **同步关联智能体**，说明为：更新使用该模型服务的智能体 openclaw.json。底部为 **取消** 与 **确认**。

## 6 模型池与验证状态

在 **操作** 列单击 **模型池**，打开以服务名命名的表单，标题形如 f2c-auto · 模型池。顶部为 **添加**，说明文字为：选择用于验证服务可用性的模型；验证结果仅代表该模型在验证时的可用性。切换验证模型后会标记为未验证，不会自动调用模型。每行提供 **编辑** 与 **删除**，底部为 **取消**，如图 7 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_services_07_model_pool.png" alt="图 7  模型池" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  模型池</div>

列表 **验证状态** 列显示 **验证成功** 或 **验证失败**，其右侧提供 **重新验证** 入口；**保存时验证可用性** 开启时或连接参数、验证模型变更时，发送最小消息验证接口。在 **操作** 列单击 **更多**，下拉仅提供 **删除**，如图 8 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_services_08_more_menu.png" alt="图 8  更多下拉" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  更多下拉</div>

## 7 注意事项

- **Base URL** 与 **API 类型** 相关，界面提示当前类型最终请求 /v1/chat/completions，Base URL 建议填写 http://127.0.0.1:8000/v1。
- 如果服务不需要 **API Key**，可输入任意非空占位值，例如 unused。
- **保存时验证可用性** 默认开启；开启时或连接参数、验证模型变更时，发送最小消息验证接口。
- 模型池的验证结果仅代表该模型在验证时的可用性；切换验证模型后会标记为未验证，不会自动调用模型。
- 列表列由 **选择列** 控制，**创建时间** 列可按需显示或隐藏。