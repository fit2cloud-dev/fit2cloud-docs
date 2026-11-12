---
title: Ollama 管理
description: 介绍在 1Panel 中查看 Ollama 服务状态、创建与运行模型、查看拉取日志、重试与删除模型，以及 AI 网关增强、连接信息、OpenWebUI 等操作入口。
keywords: [1Panel Ollama, Ollama 管理, 本地大模型, 创建模型, 运行模型, 模型日志, AI 网关增强, OpenWebUI]
---

# Ollama 管理

**功能说明**：Ollama 管理用于查看服务器上 Ollama 服务的运行状态、版本与已下载模型，并对服务、模型及模型拉取任务执行日常管理操作。入口为左侧菜单 **AI → Ollama 管理**。

## 1 前置条件

Ollama 通过 1Panel 应用商店安装，页面会自动检测服务。若尚未安装，页面显示「未检测到 Ollama，请进入应用商店点击安装！」，并提供 **安装** 按钮跳转至应用商店；检测到服务前，部分操作按钮处于不可用状态。

如需让 Ollama 使用 GPU，请先完成宿主机 NVIDIA GPU 驱动与 NVIDIA Container Toolkit 的安装与配置，参见 [配置 GPU 驱动](../../faq/gpu-driver.md)。

## 2 服务状态

页面顶部显示服务名称、运行状态（如 **已启动**）与版本号（如 `0.33.3`），并提供 **停止**、**重启** 等操作。状态区域下方是模型列表与页面操作区。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/ollama_management.png" alt="图 1  Ollama 管理页面" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  Ollama 管理页面</div>

## 3 模型列表

模型列表展示当前 Ollama 中已下载的模型，顶部提供 **搜索** 框与刷新控制，底部显示记录总数与分页信息。每行右侧的 **操作** 列提供 **运行** 与 **更多** 两个入口，用法见第 5 节与第 6 节。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  模型列表字段</div>  
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>字段</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>模型</td><td style={{padding:'8px'}}>模型名称与标签，例如 <code>qwen3-embedding:0.6b</code>、<code>qwen3.5:0.8b</code></td></tr>
<tr><td style={{padding:'8px'}}>大小</td><td style={{padding:'8px'}}>模型文件占用空间，例如 <code>639 MB</code></td></tr>
<tr><td style={{padding:'8px'}}>状态</td><td style={{padding:'8px'}}>模型拉取或添加任务的状态，例如「成功」</td></tr>
<tr><td style={{padding:'8px'}}>时间</td><td style={{padding:'8px'}}>模型的添加或下载时间</td></tr>
<tr><td style={{padding:'8px'}}>操作</td><td style={{padding:'8px'}}>提供 <strong>运行</strong> 与 <strong>更多</strong>，<strong>更多</strong> 展开后包含 <strong>重试</strong>、<strong>日志</strong>、<strong>删除</strong></td></tr>
</tbody>
</table>

:::caution[注意]

模型名称、大小、状态与时间以当前服务实际返回的数据为准；不同模型对磁盘空间与显存的要求不同，请按服务器硬件选择。

:::

## 4 创建模型

Ollama 中的模型需要先从模型库拉取到本地，才能运行并提供给上层应用调用。单击模型列表上方工具栏的 **添加**，打开添加表单。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/ollama_model_add.png" alt="图 2  添加模型" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  添加模型</div>

表单只有 **名称** 一个字段：填写 Ollama 模型库中的完整模型名称，例如 `qwen3.6:35b`；未指定标签时默认使用 `latest`。页面提示为「前往 ollama.com 查找模型，添加后会自动拉取模型，请确保 Ollama 服务正常运行且磁盘空间充足」。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  添加模型表单</div>  
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>项目</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>名称</td><td style={{padding:'8px'}}>必填，填写 Ollama 模型库中的完整模型名称，例如 <code>qwen3.6:35b</code>；未指定标签时默认使用 <code>latest</code></td></tr>
<tr><td style={{padding:'8px'}}>取消 / 添加</td><td style={{padding:'8px'}}>放弃填写，或提交后由 1Panel 自动创建拉取任务</td></tr>
</tbody>
</table>

单击 **添加** 提交后，1Panel 会创建拉取任务并在模型列表中生成一条记录。任务执行过程可在该行的 **更多 → 日志** 中查看：从 `[START]` 开始，依次拉取各层权重、校验 `sha256 digest`、写入 manifest，最后输出 `success` 与 `[TASK-END]`。状态变为「成功」后，即可单击 **运行** 验证模型，或供智能体、模型服务等功能调用。

:::caution[注意]

- 模型权重通常为数 GB 到数十 GB，添加前请确认 Ollama 服务正常运行且磁盘空间充足。
- 下载耗时受网络影响，可通过 **更多 → 日志** 查看进度。
- 若状态为失败，先用 **日志** 定位原因，再用 **更多 → 重试** 重新拉取；不再需要的模型用 **更多 → 删除** 释放磁盘空间。

:::

## 5 运行模型

在模型列表中点击某一行的 **运行**，页面会打开 **终端** 抽屉，用于快速验证模型是否已正确加载并能够响应。终端出现 `>>> Send a message (/? for help)` 提示符后，直接输入问题并回车即可与模型对话，思考过程与回复会实时显示在终端中；提示符中的 `/?` 可用于查看帮助命令。抽屉左上角提供 **返回**，右下角提供 **断开**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/ollama_model_run.png" alt="图 3  运行模型终端" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  运行模型终端</div>

运行模型会加载权重并占用内存与显存，模型参数量越大占用越高。运行期间可在 **AI → GPU 管理** 中查看显存使用、GPU 利用率与占用进程；若服务器未安装 GPU 驱动或未配置 NVIDIA Container Toolkit，模型可能只能使用 CPU 推理，响应速度会明显下降，参见 [配置 GPU 驱动](../../faq/gpu-driver.md)。

:::caution[注意]

运行中的模型会持续占用资源，验证完成后可结束运行；同一台服务器上同时运行多个大模型可能导致显存不足。

:::

## 6 更多操作

点击模型列表某行的 **更多**，展开下拉菜单，包含 **重试**、**日志**、**删除** 三项。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/ollama_model_actions.png" alt="图 4  模型操作与更多菜单" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  模型操作与更多菜单</div>

### 6.1 重试

**重试** 用于重新执行该模型的拉取任务。仅当模型处于失败或未完成状态时可用；模型状态为「成功」时该项置灰，如图 4 所示。

### 6.2 日志

**日志** 打开该模型的任务日志弹窗，展示模型拉取任务的执行过程，可用于排查下载卡住、校验失败等问题。以 `qwen3-embedding:0.6b` 为例，日志按时间顺序记录以下内容：

- **任务开始**：`[START]` 与 `拉取 [ollama-model-qwen3-embedding:0.6b] 任务开始`
- **分层拉取**：`pulling <digest>: 100%`，并显示每层大小，例如 `639 MB`、`266 B`
- **校验与写入**：`verifying sha256 digest` → `writing manifest` → `success`
- **任务结束**：`拉取 Ollama 模型 … 成功`、`获取 Ollama 模型 … 大小 成功` 与 `[TASK-END]`

弹窗顶部提供 **追踪** 与 **下载**，可用于跟随日志输出与导出日志文件。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/ollama_model_logs.png" alt="图 5  模型拉取日志" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  模型拉取日志</div>

### 6.3 删除

**删除** 用于从 Ollama 中移除该模型并释放磁盘空间。删除后需重新添加或拉取才能再次使用，操作前请确认该模型未被智能体、模型服务等功能引用，并按页面提示完成确认。

工具栏中的 **删除** 是批量操作：勾选模型前的复选框后，可对所选模型执行删除；未勾选任何模型时该按钮置灰。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  模型行操作</div>  
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>操作</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>运行</td><td style={{padding:'8px'}}>使用该模型发起一次交互，验证模型能否正常加载与响应</td></tr>
<tr><td style={{padding:'8px'}}>重试</td><td style={{padding:'8px'}}>重新执行拉取任务，仅失败或未完成的模型可用，状态为「成功」时置灰</td></tr>
<tr><td style={{padding:'8px'}}>日志</td><td style={{padding:'8px'}}>查看该模型拉取任务的执行日志，支持追踪与下载</td></tr>
<tr><td style={{padding:'8px'}}>删除</td><td style={{padding:'8px'}}>移除该模型并释放磁盘空间，删除后需重新添加或拉取</td></tr>
</tbody>
</table>

## 7 服务与页面操作

服务状态栏中的 **停止**、**重启** 控制 Ollama 服务本身；模型列表上方的工具栏作用于模型与页面展示。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  服务与页面操作</div>  
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>操作</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>添加</td><td style={{padding:'8px'}}>填写模型名称并从 Ollama 模型库拉取模型，参见第 4 节</td></tr>
<tr><td style={{padding:'8px'}}>AI 网关增强</td><td style={{padding:'8px'}}>打开 AI 网关增强配置入口</td></tr>
<tr><td style={{padding:'8px'}}>连接信息</td><td style={{padding:'8px'}}>查看当前服务的连接信息</td></tr>
<tr><td style={{padding:'8px'}}>OpenWebUI</td><td style={{padding:'8px'}}>打开 OpenWebUI 相关配置或访问入口</td></tr>
<tr><td style={{padding:'8px'}}>停止 / 重启</td><td style={{padding:'8px'}}>控制 Ollama 服务的运行状态</td></tr>
<tr><td style={{padding:'8px'}}>删除（工具栏）</td><td style={{padding:'8px'}}>勾选模型后批量删除，未勾选时置灰</td></tr>
<tr><td style={{padding:'8px'}}>搜索 / 刷新</td><td style={{padding:'8px'}}>按关键字查找模型，或手动刷新列表</td></tr>
<tr><td style={{padding:'8px'}}>不刷新</td><td style={{padding:'8px'}}>设置自动刷新间隔，可选 <code>5s</code>、<code>10s</code>、<code>30s</code>、<code>60s</code>、<code>120s</code>、<code>300s</code>，默认不自动刷新</td></tr>
</tbody>
</table>

## 8 相关文档

- [配置 GPU 驱动](../../faq/gpu-driver.md)：安装 NVIDIA GPU 驱动与 NVIDIA Container Toolkit，使应用能够使用 GPU
- [GPU 管理](./gpu.md)：查看显存使用、GPU 利用率、温度与占用进程
