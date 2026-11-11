---
title: vLLM 模型管理
sidebar_label: vLLM 模型管理
description: 介绍 1Panel vLLM 管理中**模型准备**与**模型部署**的完整操作流程：在**设置**页配置**模型目录**，在**精选模型**或**模型下载**页下载模型，**创建 Recipe** 后**新增实例**，并在实例列表查看**状态**与**服务状态**。
---

## 1 功能简介

vLLM 管理用于在 1Panel 中准备模型权重、维护启动菜谱并部署 vLLM 推理实例。功能由**模型准备**与**模型部署**两个一级页签组成：**模型准备**负责权重与启动菜谱的获取和配置，**模型部署**负责把已下载的权重运行为可调用的模型服务。

**模型准备**下挂精选模型、模型下载、vLLM Recipes、设置四个子页签。完整操作链路为：在**模型准备 > 设置**填写**模型目录**与**分词器目录**并单击 **保存**，**模型目录**既是模型下载的保存位置，也用于读取本地模型列表 → 在**精选模型**页单击 **下载**、选择来源后 **确认**，或在**模型下载**页单击 **搜索** 后 **下载** / **仅下载分词器**，并在**模型下载**列表查看下载状态与**已下载**标记 → 在**模型下载**列表单击 **创建 Recipe**，或在 **vLLM Recipes** 页单击 **添加**，手动填写表单，或把 recipes.vllm.ai 单击 **Copy** 复制的命令粘贴到**导入命令**，核对后 **确认**；也可通过 **同步 > 立即同步** 拉取 **系统同步** 菜谱后 **部署** / **克隆** → 切到**模型部署**页单击 **新增实例**，填写**基本信息**与 **Recipe 配置**中的**选择模型**、**选择 Recipe**、环境变量和启动命令，核对后 **确认** → 回到**模型部署**实例列表，区分**状态**与**服务状态**，并通过**日志**的 **查看** 与**监控**确认服务就绪。其中**设置**页属于全局配置，界面与字段说明见后文**配置模型目录与上游访问**。

## 2 前置条件

- 已安装 1Panel 企业版
- 宿主机已安装 GPU 驱动并配置容器 GPU 支持；**新增实例**页的 GPU 类型可选项为 NVIDIA、Intel、Ascend。
- 已在**模型准备 > 设置**中配置模型目录与分词器目录，且目录中存在已下载的模型权重。
- 已准备可拉取的 vLLM 镜像；本文示例值为 `vllm/vllm-openai:v0.33.0`。

## 3 页面概览

### 3.1 配置模型目录与上游访问

本节汇总**模型准备 > 设置**的全局配置项；首次部署前应先完成此处的目录配置，相关要求见**前置条件**。**设置**页底部提供 **保存** 按钮，带星号的字段为必填项，各字段说明见表 1。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_01_model_preparation_settings.png" alt="图 1  模型准备设置页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  模型准备设置页</div>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  设置页字段</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px'}}>字段</th><th style={{width:'12%', padding:'8px'}}>是否必填</th><th style={{width:'64%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>模型目录</td><td style={{padding:'8px'}}>是</td><td style={{padding:'8px'}}>模型下载保存目录，也用于读取本地模型列表；修改后不会自动迁移已有文件。示例值 `/opt/1panel/ai/models`</td></tr>
<tr><td style={{padding:'8px'}}>分词器目录</td><td style={{padding:'8px'}}>是</td><td style={{padding:'8px'}}>分词器下载保存目录，也用于读取本地分词器列表；修改后不会自动迁移已有文件。示例值 `/opt/1panel/ai/tokenizer`</td></tr>
<tr><td style={{padding:'8px'}}>HuggingFace 加速地址</td><td style={{padding:'8px'}}>否</td><td style={{padding:'8px'}}>用于加速 HuggingFace 模型的搜索、详情查询和下载；占位示例 `https://hf-mirror.com`</td></tr>
<tr><td style={{padding:'8px'}}>HuggingFace Token</td><td style={{padding:'8px'}}>否</td><td style={{padding:'8px'}}>访问私有或受限模型时需填写有权限的 Token</td></tr>
<tr><td style={{padding:'8px'}}>ModelScope 地址</td><td style={{padding:'8px'}}>否</td><td style={{padding:'8px'}}>用于搜索和下载 ModelScope 模型，默认使用官方地址；示例值 `https://www.modelscope.cn`</td></tr>
<tr><td style={{padding:'8px'}}>ModelScope Token</td><td style={{padding:'8px'}}>否</td><td style={{padding:'8px'}}>访问私有或受限模型时需填写有权限的 Token</td></tr>
</tbody>
</table>

:::warning[目录变更]
界面明确提示：修改**模型目录**或**分词器目录**后不会自动迁移已有文件。调整目录前需自行迁移权重与分词器文件，否则**新增实例**页的模型列表将读取不到原有模型。
:::

登录 1Panel，在左侧菜单选择 **AI > vLLM 管理**。进入后页面顶部显示**模型准备**与**模型部署**两个一级页签；**模型准备**下再分为四个子页签。列表按模型名称、模型类别、权重提供商、模型类型、MoE 骨干参数、激活参数、操作展示规格，每行提供**详情**与**下载**。本文示例环境共 16 条、20 条/页；同一模型的不同量化版本各占一行，例如 Qwen3.6-35B-A3B 的 MoE 骨干参数为 35B、激活参数 3B，而 Qwen3.8-Flash-Next 的骨干参数为 125B、激活参数 6B。菜单位置与页签布局如图 2 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_02_featured_models_overview.png" alt="图 2  vLLM 管理入口与精选模型页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  vLLM 管理入口与精选模型页</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  页签与主要用途</div>          
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0'}}>          
<thead>          
<tr><th style={{width:'16%', padding:'8px'}}>一级页签</th><th style={{width:'20%', padding:'8px'}}>子页签 / 页面</th><th style={{width:'64%', padding:'8px'}}>主要用途</th></tr>          
</thead>          
<tbody>          
<tr><td style={{padding:'8px'}}>模型准备</td><td style={{padding:'8px'}}>精选模型</td><td style={{padding:'8px'}}>浏览官方精选模型目录，查看规格并下载权重，或打开上游平台详情页</td></tr>          
<tr><td style={{padding:'8px'}}>模型准备</td><td style={{padding:'8px'}}>模型下载</td><td style={{padding:'8px'}}>搜索下载模型或分词器，查看下载状态、模型目录与 Recipes 数量</td></tr>          
<tr><td style={{padding:'8px'}}>模型准备</td><td style={{padding:'8px'}}>vLLM Recipes</td><td style={{padding:'8px'}}>保存和管理模型启动命令，部署时直接选用，也可从 recipes.vllm.ai 导入</td></tr>          
<tr><td style={{padding:'8px'}}>模型准备</td><td style={{padding:'8px'}}>设置</td><td style={{padding:'8px'}}>配置模型目录、分词器目录以及上游平台地址与 Token</td></tr>          
<tr><td style={{padding:'8px'}}>模型部署</td><td style={{padding:'8px'}}>实例列表</td><td style={{padding:'8px'}}>查看已创建的 vLLM 实例及其状态、日志、资源使用率，并新增实例</td></tr>          
</tbody>          
</table>

## 4 模型准备

### 4.1 浏览精选模型

单击**详情**会在上游平台打开该模型的页面。本文示例打开的是 ModelScope 的**千问 3.6-35B-A3B**模型页，可查看模型介绍、模型文件、交流反馈，以及下载模型、Notebook 快速开发、部署、训练等入口，用于选型参考。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_03_modelscope_model_detail.png" alt="图 3  上游平台的模型详情页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  上游平台的模型详情页</div>

:::note[第三方页面]  
图 3 属于上游模型平台页面，不是 1Panel 界面。其栏目名称、按钮位置与文案由上游站点决定，会随站点改版变化；本文仅用它说明**详情**入口的跳转结果。  
:::

### 4.2 下载精选模型

在**精选模型**页单击目标行的 **下载**，弹出**下载模型**对话框。对话框显示模型名称（示例为 `Qwen/Qwen3.6-35B-A3B`），并要求选择模型来源：ModelScope 或 Hugging Face，示例状态默认选中 ModelScope。确认来源后单击 **确认** 发起下载，单击 **取消** 关闭对话框。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_04_download_model_dialog.png" alt="图 4  下载模型对话框" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  下载模型对话框</div>

### 4.3 查看模型下载列表

**模型下载**页的说明文字为：可从 ModelScope、Hugging Face 下载模型或分词器，也可参考**示例**放入本地文件。工具条提供**搜索**按钮、类型筛选（默认**所有**）、刷新入口与**不刷新**状态按钮。

列表按仓库 ID、类型、下载状态、模型目录、Recipes、时间、操作展示已下载的仓库。下载状态列会显示本地模型体积与信息图标，或下载进度百分比、已完成体积与**已下载**标记；模型目录列提供跳转文件管理的入口；Recipes 列显示基于该权重已创建的菜谱数量。每行操作为**部署**、**创建 Recipe**、**删除**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_05_model_download_list.png" alt="图 5  模型下载列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  模型下载列表</div>

### 4.4 搜索并下载模型

若精选目录中没有目标模型，可在**模型下载**页单击 **搜索**
搜索框占位提示为**输入模型名称或仓库 ID，例如 `Qwen/Qwen3-8B`**，下方提供热门搜索词 Qwen3、DeepSeek、GLM、embedding，右侧可按**下载最多**排序。结果区列标题为仓库 ID、大小、下载量、点赞、操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_06_search_and_download_empty.png" alt="图 6  搜索并下载模型抽屉的初始状态" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  搜索并下载模型抽屉的初始状态</div>

:::note[初始空数据]  
未输入关键词时，结果区显示**暂无数据**、共 0 条，这是初始状态，不代表搜索功能异常。热门搜索词可直接作为关键词使用。  
:::

### 4.5 查看搜索结果与模型版本

单击热门搜索词 **Qwen3**，或在搜索框输入 `Qwen3` 后单击 **搜索**，结果区即按仓库 ID 逐行列出的同一模型族版本，如图 7 所示。表格列为仓库 ID、大小、下载量、点赞、操作，右侧仍可按**下载最多**排序；操作列提供 **下载** 与 **仅下载分词器** 两种入口。

示例结果中 `Qwen/Qwen3-8B` 为 15.3 GB、`Qwen/Qwen3-32B` 为 61.0 GB、`Qwen/Qwen3.5-9B` 为 18.0 GB、`Qwen/Qwen3-4B` 为 7.5 GB。选型时先对照**大小**评估磁盘与显存容量，再决定下载完整模型还是仅下载分词器；下载后的权重会回到 4.3 节的模型下载列表，并可用于部署或创建 Recipe。若已下载权重中没有 5.4 节所选菜谱对应的版本，可按本节方式补下。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_07_search_results_qwen3.png" alt="图 7  搜索 Qwen3 后的模型版本结果" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  搜索 Qwen3 后的模型版本结果</div>

## 5 创建 Recipe

Recipe 是模型启动命令的保存形式，部署实例时可直接选用。创建入口位于**模型下载**列表的行操作。

### 5.1 从模型下载列表发起

在目标模型所在行单击 **创建 Recipe**。这里选择的是 `Qwen3-Embedding-8B` ；实际操作时请选择本次要部署的模型。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_08_create_recipe_entry.png" alt="图 8  模型下载列表中的创建 Recipe 入口" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  模型下载列表中的创建 Recipe 入口</div>

### 5.2 填写**添加**表单

在 5.1 节的模型下载列表行单击 **创建 Recipe**（或在**vLLM Recipes**页单击 **添加**）后，即打开图9的页面。点击 `recipes.vllm.ai` 链接即 5.3 节的菜谱来源。表单包含导入命令、名称、模型、GPU 类型、环境变量，底部为 **取消** 与 **确认**；GPU 类型可选项为 NVIDIA、Intel、Ascend，环境变量按 `KEY=value` 形式逐行填写。图 9 为手动填写方式，示例名称与模型均为 `DeepSeek-V4-Flash-Vision-Exp`。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_09_add_recipe_form.png" alt="图 9  添加 Recipe 表单" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  添加 Recipe 表单</div>

:::tip[两种录入方式]  
可以手动填写名称、模型、GPU 类型与环境变量；也可以把后文 5.5 节复制的命令粘贴到**导入命令**。该输入框的占位提示写明：粘贴 pip/uv 或 docker 格式的启动命令，1Panel 将自动解析并填充。  
:::

### 5.3 在 recipes.vllm.ai 查找适配菜谱

前往 recipes.vllm.ai，依次选择模型提供商和目标模型，再根据硬件、量化版本及部署策略等选项生成启动命令。按此指引查找适配菜谱，即可把生成的命令用于 5.2 节的**导入命令**。

该站首页标题为 **vLLM Recipes**，说明文字提示按 GPU 调整并复制可运行的 `vllm serve` 命令；页面分为 LATEST RECIPES 与 BROWSE BY PROVIDER 两个区域。LATEST RECIPES 以卡片形式展示 Qwen3-VL-4B-Instruct（图 10 红框）、ERNIE-5.5-Flash、Ripple-65B-Preview、Kimi-K3.1-Pro 等菜谱，卡片上标注参数规模、上下文长度、量化类型与模态标签；BROWSE BY PROVIDER 按提供商分类浏览。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_10_vllm_recipes_home.png" alt="图 10  vLLM Recipes 官网首页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  vLLM Recipes 官网首页</div>

### 5.4 按提供商定位模型版本

在 5.3 节的官网首页选中菜谱卡片后进入详情页，左侧按提供商分组列出模型版本，选中目标版本后右侧展示该模型的属性标签、INSTALL 行与启动命令。示例模型 `Qwen/Qwen3.5-35B-A3B` 的标签为 MoE、35B / 3B、262,144 ctx、vLLM 0.17.0+、Multimodal、Text；INSTALL 行显示 `VLLM 0.17.0+ · XPU`，右侧为 Docker 下拉；命令区标注**Verified on Intel Arc Pro B60**，底部 HARDWARE 行列出不同 GPU 型号下的参考吞吐数值。

据此确认模型版本与硬件要求后，即可在命令区复制启动命令，操作见 5.5 节。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_11_select_provider_and_model.png" alt="图 11  按提供商定位模型版本" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  按提供商定位模型版本</div>

### 5.5 复制启动命令

命令区右上角提供 Copy、cURL、Bench、Env 四个入口。单击 **Copy**复制 docker 格式的启动命令。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_12_copy_launch_command.png" alt="图 12  复制模型启动命令" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  复制模型启动命令</div>

### 5.6 粘贴导入命令

图 13 展示把 docker 格式启动命令粘贴到**导入命令**后的状态：命令框内可见 `docker run`、`--device /dev/dri`、`--shm-size=16g`、`-p 8000:8000`、`VLLM_USE_RUST_FRONTEND=1` 与镜像名等内容；此时名称、模型仍为空，GPU 类型默认 NVIDIA，环境变量为空。

粘贴后单击输入框外的空白处，1Panel 即解析命令并自动匹配名称、模型、环境变量与启动参数。核对无误后单击 **确认** 保存菜谱。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_13_paste_import_command.png" alt="图 13  粘贴导入命令" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  粘贴导入命令</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_14_import_command_autofill.png" alt="图 14  导入命令自动解析并填充表单" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 14  导入命令自动解析并填充表单</div>

### 5.7 同步官方 Recipes

vLLM Recipes 页工具条的 **添加** 按钮旁是 **同步** 下拉，展开后提供 **立即同步** 与 **关闭自动同步** 两项，旁边显示自动同步已开启。单击 **立即同步**，1Panel 会从上游 recipes 仓库拉取菜谱并写入本地列表；同步得到的菜谱在类型列标记为 **系统同步**，与用户自行创建的 **自定义** 菜谱区分。

图 15 中的列表按名称、类型、GPU 类型、模型、描述、创建时间 / 同步时间、操作展示菜谱，共 7 条、20 条/页。**系统同步** 行提供 **部署** 与 **克隆**，**自定义** 行还提供 **编辑** 与 **删除**。图 16 为上游 GitHub 仓库 `1Panel-dev/resources` 的 `resources/vllm-recipes` 目录，属于第三方页面：其中按模型与硬件组合提供 `run-qwen3.6-35b-a3b-on-1-gb10.sh`、`run-qwen3.8-flash-next-nvfp4-on-2-rtx-pro-5000-72g.sh` 等启动脚本以及 `data.yaml` 清单。同步完成后，这些菜谱即出现在图 15 的列表中，可直接 **部署** 或 **克隆** 使用。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_15_vllm_recipes_sync_menu.png" alt="图 15  vLLM Recipes 页的同步入口与菜谱列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 15  vLLM Recipes 页的同步入口与菜谱列表</div>


<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_16_upstream_recipes_repo.png" alt="图 16  上游 recipes 仓库中的菜谱文件" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 16  上游 recipes 仓库中的菜谱文件</div>


## 6 模型部署

### 6.1 新增实例 · 基本信息

在**模型部署**页单击 **新增实例**，打开标题为**新增实例**的抽屉。**基本信息**区依次为名称、GPU 类型、vLLM 版本、vLLM 镜像、服务端口、选择模型，下方是 **GPU 加速** 开关（示例为开启，右侧箭头可展开配置），底部为 **取消** 与 **确认**。图 17 中名称示例为 `vLLM-Qwen3.6-35B-A3B`；GPU 类型选中 NVIDIA，另有 Intel、Ascend 两个选项；vLLM 版本为 `0.33.0`，下拉框下方说明**官方标准版本，CUDA 13.0，适用于新驱动和新架构显卡**；vLLM 镜像为 `vllm/vllm-openai:v0.33.0`。

**服务端口**示例为 8000，通过减号 / 加号步进调整；**选择模型**下拉选中 `Qwen3.6-35B-A3B-FP8`，右侧 **选择** 按钮可浏览模型目录，下方提示**模型列表默认来自“模型准备 > 设置”中配置的模型目录，展示该目录下已下载的模型**。GPU 类型、vLLM 版本、vLLM 镜像、服务端口、选择模型五个字段均带必填星号。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_17_create_instance_basic.png" alt="图 17  新增实例的基本信息" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 17  新增实例的基本信息</div>

### 6.2 新增实例 · Recipe 配置

继续向下滚动，**GPU 加速**开关之后为可折叠的**Recipe 配置**区，包含选择 Recipe、环境变量与启动命令三项，底部仍为 **取消** 与 **确认**。选择 Recipe 下拉已选中 `Qwen3.6-35B-A3B-FP8`，框内右侧带 `/models` 路径提示，右侧 **添加** 按钮可就地新建菜谱；环境变量填写 `VLLM_USE_RUST_FRONTEND=1`。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_18_create_instance_recipe_config.png" alt="图 18  新增实例的 Recipe 配置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 18  新增实例的 Recipe 配置</div>

:::warning[提交前核对]


确认前请核对三处是否一致：基本信息中的**选择模型**、Recipe 配置中的**选择 Recipe**、启动命令中的模型路径与 `--served-model-name`。图 17 的服务端口为 8000，图 18 的启动命令未显式指定 `--port`；如需改用其他端口，请在命令中同步指定并保持与**服务端口**一致。
:::

### 6.3 验证实例状态

单击 **确认** 后回到**模型部署**实例列表。页面说明文字为：创建 vLLM 实例，将已下载的模型部署为模型服务。工具条提供**新增实例**按钮、**搜索**输入框、刷新入口与**不刷新**状态按钮。列表按名称、版本、端口、模型、状态、服务状态、日志、资源使用率、操作九列展示实例，每行操作为**编辑**、**监控**、**更多**；本文示例环境共 2 条、10 条/页，如图 19 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_19_deployment_instance_list.png" alt="图 19  模型部署实例列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 19  模型部署实例列表</div>

## 7 注意事项

- 修改**模型目录**或**分词器目录**不会自动迁移已有文件，调整前需自行迁移权重与分词器文件。
- **搜索并下载模型**抽屉在未输入关键词时显示**暂无数据**，属于初始状态。
-同一宿主机部署多个实例时，请确保服务端口与启动命令中的 `--port` 一致且不冲突。
- 启动命令中的 `--api-key` 为服务访问密钥，本文以 `YOUR_API_KEY` 占位符代替界面示例值。

## 8 后续操作

- 实例创建后，在**模型部署**列表通过**日志**查看启动日志、通过**监控**查看资源使用率。状态为**已启动**但服务状态仍为**准备中**时，等待服务就绪后再发起调用。
- 需要调整实例配置时使用行操作**编辑**，修改后请复核**选择模型**、**选择 Recipe**与启动命令三者是否一致。
- 需要统一对外入口或访问控制时，结合 1Panel 的**AI 网关**配置。
