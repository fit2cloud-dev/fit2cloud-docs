---
title: 模型服务
description: 介绍在 1Panel 中统一接入与管理模型服务，包括添加、模型池、编辑、验证与筛选。
keywords: [1Panel 模型服务, 模型供应商, API 类型, Base URL, 模型池, 验证状态]
---

# 模型服务

**功能说明**：统一接入公有云、本地推理引擎和 AI 网关等模型服务，供 1Panel 内置智能体及 WorkBuddy 等外部智能体调用。入口为左侧菜单 **AI → 模型服务**。

## 1 页面概览

页面顶部提供 **添加**、**API 类型** 与 **模型供应商** 筛选、**搜索** 框，右侧还有刷新与选择列图标；下方为模型服务列表与分页信息。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_service_01_list.png" alt="图 1  模型服务列表" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  模型服务列表</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  页面操作</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>操作</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>添加</td><td style={{padding:'8px'}}>打开添加抽屉，接入一个新的模型服务</td></tr>
<tr><td style={{padding:'8px'}}>API 类型</td><td style={{padding:'8px'}}>按接口协议筛选模型服务</td></tr>
<tr><td style={{padding:'8px'}}>模型供应商</td><td style={{padding:'8px'}}>按供应商筛选模型服务</td></tr>
<tr><td style={{padding:'8px'}}>搜索 / 刷新 / 选择列</td><td style={{padding:'8px'}}>按关键字查找、刷新列表、控制列表列的显示</td></tr>
</tbody>
</table>

## 2 模型服务列表

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  模型服务列表字段</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>字段</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>名称</td><td style={{padding:'8px'}}>模型服务的名称，单击可查看该记录</td></tr>
<tr><td style={{padding:'8px'}}>模型供应商</td><td style={{padding:'8px'}}>服务来源，例如 <code>DeepSeek</code>、<code>vLLM</code>、<code>Ollama</code>、<code>1Panel AI 网关</code> 或各公有云厂商</td></tr>
<tr><td style={{padding:'8px'}}>API 类型</td><td style={{padding:'8px'}}>接口协议类型，例如 <code>openai-completions</code></td></tr>
<tr><td style={{padding:'8px'}}>模型</td><td style={{padding:'8px'}}>该服务使用的模型名称；显示 <code>+N</code> 时表示模型池中还有其他模型</td></tr>
<tr><td style={{padding:'8px'}}>验证状态</td><td style={{padding:'8px'}}>显示 <strong>验证成功</strong> 或 <strong>未验证</strong>，旁边提供 <strong>重新验证</strong> 图标</td></tr>
<tr><td style={{padding:'8px'}}>端点</td><td style={{padding:'8px'}}>模型服务的接口地址</td></tr>
<tr><td style={{padding:'8px'}}>创建时间</td><td style={{padding:'8px'}}>记录的创建时间</td></tr>
<tr><td style={{padding:'8px'}}>操作</td><td style={{padding:'8px'}}>提供 <strong>编辑</strong>、<strong>模型池</strong> 与 <strong>更多</strong></td></tr>
</tbody>
</table>

底部显示记录总数、每页条数与页码，可跳转到指定页。

:::caution[注意]

验证状态只代表最近一次验证的结果；修改连接参数或验证模型后，需重新验证才能确认服务可用。部分服务类型下 **模型池** 按钮会置灰，表示其模型池由服务自动获取、无需在此手动维护。

:::

## 3 添加模型服务

单击顶部 **添加** 打开抽屉。左上角为 **返回**，右上角为关闭按钮，底部为 **取消** 与 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_service_02_add.png" alt="图 2  添加模型服务" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  添加模型服务</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  添加表单字段（按页面从上到下顺序）</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>字段</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>名称</td><td style={{padding:'8px'}}>必填，模型服务的名称</td></tr>
<tr><td style={{padding:'8px'}}>模型供应商</td><td style={{padding:'8px'}}>必填，默认为 <strong>自定义</strong>，可按实际来源选择</td></tr>
<tr><td style={{padding:'8px'}}>API 类型</td><td style={{padding:'8px'}}>必填，默认为 <code>openai-completions</code></td></tr>
<tr><td style={{padding:'8px'}}>Base URL</td><td style={{padding:'8px'}}>必填，接口基础地址。页面提示「当前类型最终请求 /v1/chat/completions，Base URL 建议填写 <code>http://127.0.0.1:8000/v1</code>」</td></tr>
<tr><td style={{padding:'8px'}}>API Key</td><td style={{padding:'8px'}}>必填，访问凭证。页面提示「如果服务不需要 API Key，可输入任意非空占位值，例如 <code>unused</code>」</td></tr>
<tr><td style={{padding:'8px'}}>记住认证信息</td><td style={{padding:'8px'}}>保存认证信息，便于后续编辑与验证</td></tr>
<tr><td style={{padding:'8px'}}>保存时验证可用性</td><td style={{padding:'8px'}}>开启时或连接参数、验证模型变更时，发送最小消息验证接口</td></tr>
<tr><td style={{padding:'8px'}}>模型池</td><td style={{padding:'8px'}}>可选 <strong>自动获取</strong> 或 <strong>手动配置</strong>；自动获取方式提供 <strong>获取模型</strong>，从供应商的 <code>/v1/models</code> 接口获取模型并全部加入模型池</td></tr>
<tr><td style={{padding:'8px'}}>备注</td><td style={{padding:'8px'}}>选填，记录用途或说明</td></tr>
</tbody>
</table>

### 3.1 模型供应商与 API 类型

**模型供应商** 位于表单第二项，默认值为 **自定义**。下拉以 **AI** 分组列出 **自定义**、**Ollama**、**vLLM** 与 **1Panel AI 网关**，其后为 DeepSeek、阿里云百炼、火山方舟、OpenAI、OpenRouter、Anthropic、Gemini 等公有云供应商，具体选项以页面实际显示为准。

**API 类型** 位于模型供应商下方，默认值为 `openai-completions`，另提供 `openai-responses`、`anthropic-messages`、`openai-images` 等协议类型；不同 API 类型对应不同的最终请求路径，选项以页面实际显示为准。

### 3.2 添加流程

**1. 填写连接信息**：依次选择模型供应商与 API 类型，填写 Base URL 与 API Key。

**2. 配置模型池**：选择自动获取或手动配置；自动获取时可单击 **获取模型** 拉取可用模型。

**3. 确认保存**：单击 **确认** 提交；开启 **保存时验证可用性** 时，系统会发送最小消息验证接口，验证结果反映在列表的 **验证状态** 列。

## 4 模型池

模型池用于维护某个模型服务对外提供的模型清单，并指定其中哪一个模型用于验证服务可用性。在列表的 **操作** 列单击 **模型池**，打开以「服务名称 · 模型池」为标题的抽屉。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_service_03_pool.png" alt="图 3  模型池" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  模型池</div>

抽屉顶部的说明为「选择用于验证服务可用性的模型；验证结果仅代表该模型在验证时的可用性。切换验证模型后会标记为未验证，不会自动调用模型。」

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  模型池字段</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>字段</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>验证</td><td style={{padding:'8px'}}>单选列，选中该行即指定它作为验证模型；同一模型服务只能选中一个</td></tr>
<tr><td style={{padding:'8px'}}>模型</td><td style={{padding:'8px'}}>调用上游接口时使用的模型标识，例如 <code>deepseek-chat</code></td></tr>
<tr><td style={{padding:'8px'}}>名称</td><td style={{padding:'8px'}}>模型的展示名称，例如 <code>DeepSeek Chat</code></td></tr>
<tr><td style={{padding:'8px'}}>操作</td><td style={{padding:'8px'}}>提供 <strong>编辑</strong> 与 <strong>删除</strong></td></tr>
</tbody>
</table>

抽屉顶部提供 **添加**，可为该服务补充模型；底部提供 **取消**。列表 **模型** 列显示的 `+N` 即对应模型池中其余模型。

:::tip[自动获取与手动配置]

在添加或编辑模型服务时，模型池可选 **自动获取** 或 **手动配置**。选择自动获取时，单击 **获取模型** 会从供应商的 `/v1/models` 接口读取模型并全部加入模型池；选择手动配置时，可在表单内通过 **添加** 逐条维护模型清单。自动获取的服务通常无需在此手动维护模型池。编辑模型服务时，抽屉内同样提供模型池配置区，可直接维护模型清单并指定验证模型。

:::

## 5 编辑模型服务

在模型服务列表中单击某行的 **编辑**，打开编辑抽屉。字段与添加表单基本一致，API Key 以掩码显示。图 4 展示表单上半部分的连接信息与 **验证模型** 下拉。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_service_04_edit.png" alt="图 4  编辑模型服务" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  编辑模型服务（连接信息与验证模型）</div>

抽屉下半部分是 **模型池** 配置区，提供 **默认模型** 与 **手动配置** 两种模式。选择手动配置时，可逐条编辑 **模型** 与 **名称**，通过 **验证** 单选列指定验证模型，并用 **添加** 与 **删除** 维护模型清单；区域下方为 **同步关联智能体**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_service_05_edit_pool.png" alt="图 5  编辑抽屉中的模型池配置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  编辑抽屉中的模型池配置</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 5  编辑表单特有字段</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>字段</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>验证模型 / 模型池</td><td style={{padding:'8px'}}>选择用于验证服务可用性的模型。页面提示「验证结果仅代表该模型在验证时的可用性」，切换验证模型后会标记为未验证</td></tr>
<tr><td style={{padding:'8px'}}>模型池配置区</td><td style={{padding:'8px'}}>可切换 <strong>默认模型</strong> 与 <strong>手动配置</strong>；手动配置下列出 <strong>验证</strong> 单选列、<strong>模型</strong>、<strong>名称</strong> 与 <strong>操作</strong>（删除），并提供 <strong>添加</strong></td></tr>
<tr><td style={{padding:'8px'}}>同步关联智能体</td><td style={{padding:'8px'}}>更新使用该模型服务的智能体 <code>openclaw.json</code></td></tr>
</tbody>
</table>

**保存时验证可用性** 开关开启后，保存或连接参数、验证模型变更时会发送最小消息验证接口。单击 **确认** 保存，单击 **取消** 放弃；左上角 **返回** 或右上角关闭按钮可退出。**更多** 菜单提供 **删除**。

## 6 验证模型服务

列表的 **验证状态** 列显示 **验证成功** 或 **未验证**，旁边的 **重新验证** 图标可对已有服务再次发起验证。单击后弹出 **验证** 对话框，列出本次使用的端点、API 类型与验证模型，并提示「将使用以下配置验证模型，是否继续？」。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/model_service_06_verify.png" alt="图 6  验证模型服务" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  验证模型服务</div>

确认配置无误后单击 **确认** 发起验证，结果会更新到列表的 **验证状态** 列；单击 **取消** 放弃本次验证。

## 7 注意事项

- 不同 API 类型对应的最终请求路径不同，请按页面提示填写 Base URL。
- API Key 属于敏感信息，请勿对外分享；不需要鉴权的本地服务也要填写非空占位值。
- 验证成功仅代表验证当时该模型可用，更换模型、地址或凭证后应重新验证。
- 删除模型服务前，请确认没有智能体或外部客户端仍在调用。
