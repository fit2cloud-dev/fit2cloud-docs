---
title: vLLM 模型管理
sidebar_label: vLLM 模型管理
description: 介绍 1Panel vLLM 管理中**模型准备**与**模型部署**的完整操作流程：在**设置**页配置**模型目录**，在**精选模型**或**模型下载**页下载模型，**创建 Recipe** 后**新增实例**，并在实例列表查看**状态**与**服务状态**。
---

## 1 功能简介

该部分基于vLLM服务进行模型的部署，首先是**模型准备**，**模型准备**负责模型文件与 recipe 的获取和配置，**模型准备**完成后进行**模型部署**，**模型部署**负责把已下载的模型文件运行为可调用的模型服务。

## 2 前置条件

- 已安装 1Panel 企业版或专业版
- 宿主机已安装 GPU 驱动并配置容器 GPU 支持。

## 3 页面概览

登录 1Panel，在左侧菜单选择 **AI > vLLM 管理**。进入后页面顶部显示**模型准备**与**模型部署**两个一级页签；**模型准备**下再分为四个子页签---精选模型、模型下载、vLLM Recipes、设置。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_01_featured_models_overview.png" alt="图 1  vLLM 管理入口与精选模型页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  vLLM 管理入口与精选模型页</div>

## 4 模型准备

### 4.1 设置
给模型目录和分词器指定保存位置，并配置HuggingFace和ModelScope的下载源及访问私有或受限模型所需的Token
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_02_model_preparation_settings.png" alt="图 2  模型准备设置页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  模型准备设置页</div>
### 4.2 精选模型
#### 4.2.1 切换模型预览方式

在**精选模型**页单击工具条中的**卡片**图标，即可由表格模式切换到卡片模式，如图 3 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_03_switch_to_card_view.png" alt="图 3  切换到卡片模式" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  切换到卡片模式</div>


单击**详情**会在第三方平台打开该模型的页面。本文示例打开的是 ModelScope 的**千问 3.6-35B-A3B**模型页，可查看模型介绍、模型文件、交流反馈，以及下载模型、Notebook 快速开发、部署、训练等入口，用于选型参考。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_04_modelscope_model_detail.png" alt="图 4  第三方平台的模型详情页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  第三方平台的模型详情页</div>

:::note[第三方页面]
图 4 属于第三方模型平台页面，不是 1Panel 界面。其栏目名称、按钮位置与文案由上游站点决定，会随站点改版变化；本文仅用它说明**详情**入口的跳转结果。
:::

#### 4.2.2 下载精选模型

把选中的模型文件下载到本地，在**精选模型**页单击目标行的 **下载**，弹出**下载模型**对话框。对话框显示模型名称（示例为 `Qwen/Qwen3.6-35B-A3B`），并要求选择模型来源：ModelScope 或 Hugging Face，示例状态默认选中 ModelScope。确认来源后单击 **确认** 发起下载，单击 **取消** 关闭对话框。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_05_download_model_dialog.png" alt="图 5  下载模型对话框" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  下载模型对话框</div>

### 4.3 模型下载

在这个页面我们可以确认模型文件有没有下载成功、放置的位置，并作为后续部署和创建 Recipe 的起点。我们可对已有模型进行部署、创建 Recipe、删除等操作。下载状态列会显示本地模型体积与信息图标，或下载进度百分比、已完成体积与已下载标记。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_06_model_download_list.png" alt="图 6  模型下载列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  模型下载列表</div>

#### 4.3.1 搜索并下载模型

若精选目录中没有目标模型，可在**模型下载**页单击 **搜索**，然后从 ModelScope 或Hugging Face 中 查找模型。
在搜索框中**输入模型名称或仓库 ID，例如 `Qwen/Qwen3-8B`**，也可以选择热门搜索中提供的模型来查找模型，右侧按**综合排序**、**下载最多**、**点赞最多**、**最近更新**排序。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_07_search_and_download_empty.png" alt="图 7  搜索并下载模型抽屉的初始状态" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  搜索并下载模型抽屉的初始状态</div>

#### 4.3.2 查看搜索结果
单击热门搜索词 **Qwen3**，或在搜索框输入 `Qwen3` 后单击 **搜索**，结果区即按仓库 ID 逐行列出的同一模型族版本，如图 8 所示。按**下载最多**排序；可进行 **下载** 与 **仅下载分词器** 两种操作。
**下载**：拉的是完整模型权重，用来把模型跑起来。
**仅下载分词器** ：只拉 tokenizer 那几个小文件，用来做 Token 编码/统计，不能用来推理。

选型时先对照**大小**评估磁盘与显存容量，再决定下载完整模型还是仅下载分词器；下载后的模型文件会放入模型下载列表，并可用于部署或创建 Recipe。若已下载模型文件中没有 5.4 节所选菜谱对应的版本，可按本节方式补充下载。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_08_search_results_qwen3.png" alt="图 8  搜索 Qwen3 后的模型版本结果" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  搜索 Qwen3 后的模型版本结果</div>

#### 4.3.3 创建 Recipe

Recipe 是模型启动命令的保存形式，部署实例时可直接选用。

在目标模型所在行单击 **创建 Recipe**。这里选择的是 `Qwen3.6-35B-A3B` ；实际操作时请选择本次要部署的模型。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_09_create_recipe_entry.png" alt="图 9  模型下载列表中的创建 Recipe 入口" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  模型下载列表中的创建 Recipe 入口</div>

在模型下载列表行单击 **创建 Recipe**（或在**vLLM Recipes**页单击 **添加**）后，即打开图10的页面。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_10_add_recipe_form.png" alt="图 10  添加 Recipe 表单" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  添加 Recipe 表单</div>

## 5 配置recipe
### 5.1 查找适配的recipe

前往 recipes.vllm.ai，选择模型供应商

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_11_vllm_recipes_home.png" alt="图 11  vLLM Recipes 官网首页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  vLLM Recipes 官网首页</div>

### 5.2 选择模型版本

在选中供应商后进入详情页，左侧按提供商分组列出模型版本，选中目标版本后右侧展示该模型的相关属性标签、INSTALL 行与启动命令。
确认模型版本与硬件要求后，即可在命令区复制启动命令。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_12_select_provider_and_model.png" alt="图 12  按提供商定位模型版本" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  按提供商定位模型版本</div>

### 5.3 复制启动命令

单击 **Copy** 复制 docker 格式的启动命令，取得可导入到导入命令的文本。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_13_copy_launch_command.png" alt="图 13  复制模型启动命令" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  复制模型启动命令</div>

--device /dev/dri \ 与 -v /dev/dri/by-path:/dev/dri/by-path：将宿主机的 DRI（直接渲染基础设施）设备及物理路径挂载到容器中，使容器内的推理进程能够直接调用底层 GPU 进行硬件加速。
--shm-size=16g：分配 16GB 共享内存，防止大模型并行推理时因默认共享内存过小导致进程通信中断或崩溃。
--privileged：赋予容器完整的特权权限，直接访问主机硬件设备。
--ipc=host：与宿主机共享进程间通信（IPC）命名空间，提升多卡/多进程间的通信效率。
-p 8000:8000：将容器内 vLLM 默认的 8000 端口映射到宿主机，便于通过 http://127.0.0.1:8000 访问 OpenAI 兼容 API。
-v ~/.cache/huggingface:/root/.cache/huggingface：挂载本地 Hugging Face 缓存目录，加速模型权重的加载，避免重复下载。
-e VLLM_USE_RUST_FRONTEND=1：启用 vLLM 实验性的 Rust 前端替代 Python API Server，在高并发请求下能够提供更优的吞吐量和延迟。
vllm/vllm-openai-xpu:latest Qwen/Qwen3.5-35B-A3B-FP8：指定 Intel XPU 专属的 vLLM 容器镜像，并指定预量化为 FP8 格式的 Qwen3.5 MoE 模型权重。
--trust-remote-code：允许加载 Hugging Face 模型仓库中的自定义代码，因为 Qwen 系列模型依赖特定的建模代码。
--tensor-parallel-size 4：启用 4 路张量并行（TP=4），将模型权重切分到 4 张 GPU 上共同推理。
--enforce-eager：强制使用 Eager 模式执行，跳过 CUDA Graph 优化，降低显存占用并提升对动态形状的兼容性。
--enable-auto-tool-choice 与 --tool-call-parser qwen3_coder：启用 vLLM 的自动工具调用能力，并使用 Qwen3 专用的解析器提取结构化工具调用参数。
--reasoning-parser qwen3：启用 Qwen3 专属的推理内容解析器，正确拆分模型的思考过程（`<thought>` 内容）与最终回复。
--mm-encoder-tp-mode data：多模态编码器采用批级别数据并行（Data Parallelism），在各卡上复制轻量视觉/多模态编码器权重，将图片批次切分并行处理，避免多卡间层间同步通信开销，显著降低首字延迟（TTFT）


### 5.4 粘贴启动命令

图 14 展示把 docker 格式启动命令粘贴到**导入命令**，粘贴后单击输入框外的空白处，1Panel 即解析命令并自动匹配名称、模型、环境变量与启动参数。核对无误后单击 **确认** 保存 recipe。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_14_paste_import_command.png" alt="图 14  粘贴导入命令" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 14  粘贴导入命令</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_15_import_command_autofill.png" alt="图 15  导入命令自动解析并填充表单" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 15  导入命令自动解析并填充表单</div>

### 5.5 同步官方 Recipes

点击 **同步** 按钮，展开后提供 **立即同步** 与 **关闭自动同步** 两项。单击 **立即同步**，1Panel 会从上游 recipes 仓库拉取菜谱并写入本地列表；同步得到的菜谱在类型列标记为 **系统同步**，与用户自行创建的 **自定义** 菜谱区分。同步完成后，这些菜谱即出现在图 16 的列表中，可直接 **部署** 或 **克隆** 使用。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_16_vllm_recipes_sync_menu.png" alt="图 16  vLLM Recipes 页的同步入口与菜谱列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 16  vLLM Recipes 页的同步入口与菜谱列表</div>

## 6 模型部署

### 6.1 新增实例 · 基本信息

在**模型部署**页单击 **新增实例**，打开**新增实例**配置页面。图 18 中名称示例为 `vLLM-Qwen3.6-35B-A3B`；GPU 类型选中 NVIDIA，另有 Intel、Ascend 两个选项；vLLM 版本选择 `0.33.0`；vLLM 镜像为 `vllm/vllm-openai:v0.33.0`。

**服务端口**为 8000，通过- / +步进调整；**服务端口**不能与已有实例相同，**选择模型**下拉选中 `Qwen3.6-35B-A3B-FP8`，右侧 **选择** 按钮可浏览模型目录。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_18_create_instance_basic.png" alt="图 18  新增实例的基本信息" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 18  新增实例的基本信息</div>

### 6.2 新增实例 · Recipe 配置

打开**GPU 加速**开关，选择 Recipe 下拉已选中 `Qwen3.6-35B-A3B-FP8`，环境变量自动匹配为 `VLLM_USE_RUST_FRONTEND=1`，启动命令同样是自动匹配，点击**确定**后相应的实例就会出现在vLLM实例中。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_19_create_instance_recipe_config.png" alt="图 19  新增实例的 Recipe 配置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 19  新增实例的 Recipe 配置</div>

:::warning[提交前核对]


确认前请核对三处是否一致：基本信息中的**选择模型**、Recipe 配置中的**选择 Recipe**、启动命令中的模型路径与 `--served-model-name`。图 18 的服务端口为 8000，图 19 的启动命令未显式指定 `--port`；如需改用其他端口，请在命令中同步指定并保持与**服务端口**一致。
:::

### 6.3 验证实例状态

单击 **确认** 后回到**模型部署**实例列表，确认实例已经创建并可以看到运行状况。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/vllm_mgmt_20_deployment_instance_list.png" alt="图 20  模型部署实例列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 20  模型部署实例列表</div>

## 7 注意事项

- 修改**模型目录**或**分词器目录**不会自动迁移已有文件，调整前需自行迁移模型文件与分词器文件。
- **搜索并下载模型**抽屉在未输入关键词时显示**暂无数据**，属于初始状态。
-同一宿主机部署多个实例时，请确保服务端口与启动命令中的 `--port` 一致且不冲突。
- 启动命令中的 `--api-key` 为服务访问密钥，本文以 `YOUR_API_KEY` 占位符代替界面示例值。

## 8 后续操作

- 实例创建后，在**模型部署**列表通过**日志**查看启动日志、通过**监控**查看资源使用率。状态为**已启动**但服务状态仍为**准备中**时，等待服务就绪后再发起调用。
- 需要调整实例配置时使用行操作**编辑**，修改后请复核**选择模型**、**选择 Recipe**与启动命令三者是否一致。
- 需要统一对外入口或访问控制时，结合 1Panel 的**AI 网关**配置。
