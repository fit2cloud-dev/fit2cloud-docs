---
id: vllm-model-management
title: vLLM 模型管理
sidebar_label: vLLM 模型管理
description: 介绍 1Panel vLLM 管理中**模型准备**与**模型部署**的完整操作流程：在**设置**页配置**模型目录**，在**精选模型**或**模型下载**页下载模型，**创建 Recipe** 后**新增实例**，并在实例列表查看**状态**与**服务状态**。
slug: /ai/vllm-model-management
toc_min_heading_level: 2
toc_max_heading_level: 4
---

## 1 功能简介

该部分基于vLLM服务进行模型的部署，首先是**模型准备**，**模型准备**负责模型文件与 recipe 的获取和配置，**模型准备**完成后进行**模型部署**，**模型部署**负责把已下载的模型文件运行为可调用的模型服务。**模型准备**产出的模型文件与 Recipe 会作为**模型部署**的输入，部署完成后可在实例列表查看**状态**与**服务状态**。

## 2 前置条件

- 已安装 1Panel 企业版或专业版
- 宿主机已安装 GPU 驱动并配置容器 GPU 支持。

## 3 页面概览

登录 1Panel，在左侧菜单选择 **AI > vLLM 管理**。进入后页面顶部显示**模型准备**与**模型部署**两个一级页签；**模型准备**下再分为四个子页签---精选模型、模型下载、vLLM Recipes、设置。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/01_featured_models_overview.png').default} alt="图 1  vLLM 管理入口与精选模型页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  vLLM 管理入口与精选模型页</div>

## 4 模型准备

### 4.1 设置
给模型目录和分词器指定保存位置，并配置 HuggingFace 和 ModelScope 的下载源及访问私有或受限模型所需的 Token。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/02_model_preparation_settings.png').default} alt="图 2  模型准备设置页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  模型准备设置页</div>
### 4.2 切换模型预览方式

在**精选模型**页单击工具条中的**卡片**图标，即可由表格模式切换到卡片模式，如图 3 所示。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/03_switch_to_card_view.png').default} alt="图 3  切换到卡片模式" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  切换到卡片模式</div>


单击**详情**会在第三方平台打开该模型的页面。本文示例打开的是 ModelScope 的**千问 3.6-35B-A3B**模型页，可查看模型介绍、模型文件、交流反馈，以及下载模型、Notebook 快速开发、部署、训练等入口，用于选型参考。确定目标模型与版本后，即可进入 4.3 下载对应的模型文件。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/04_modelscope_model_detail.png').default} alt="图 4  第三方平台的模型详情页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  第三方平台的模型详情页</div>

:::note[第三方页面]  
图 4 属于第三方模型平台页面，不是 1Panel 界面。其栏目名称、按钮位置与文案由上游站点决定，会随站点改版变化；本文仅用它说明**详情**入口的跳转结果。  
:::

### 4.3 下载模型
#### 4.3.1 下载精选模型

精选模型是经过官方验证的模型，把选中的模型文件下载到本地，在**精选模型**页单击目标行的 **下载**，弹出**下载模型**对话框。对话框显示模型名称（示例为 `Qwen/Qwen3.6-35B-A3B`），并要求选择模型来源：ModelScope 或 Hugging Face，示例状态默认选中 ModelScope。确认下载后，可到 4.3.2 的**模型下载**列表查看进度与结果。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/05_download_model_dialog.png').default} alt="图 5  下载模型对话框" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  下载模型对话框</div>

#### 4.3.2 模型下载

在这个页面我们可以确认模型文件是否下载成功、放置的位置，并作为后续部署和创建 Recipe 的起点。我们可对已有模型进行部署、创建 Recipe、删除等操作。下载状态列会显示本地模型体积与信息图标，或下载进度百分比、已完成体积与已下载标记。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/06_model_download_list.png').default} alt="图 6  模型下载列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  模型下载列表</div>

若精选目录中没有目标模型，可在**模型下载**页单击 **搜索**，然后从 ModelScope 或Hugging Face 中 查找模型。
我们以 **Qwen3** 为例，单击热门搜索词 **Qwen3**，或在搜索框输入 `Qwen3` 后单击 **搜索**，结果区即按仓库 ID 逐行列出的同一模型族版本，如图 7 所示。按**下载最多**排序；可进行 **下载** 与 **仅下载分词器** 两种操作。
**下载**：拉的是完整模型权重，用来把模型跑起来。
**仅下载分词器** ：只拉 tokenizer 那几个小文件，用来做 Token 编码/统计，不能用来推理。

选型时先对照**大小**评估磁盘与显存容量，再决定下载完整模型还是仅下载分词器；下载后的模型文件会放入模型下载列表，并可用于部署或创建 Recipe。下载完成后进入 4.4 配置 Recipe；若后续所选 Recipe 对应的模型版本不在列表中，可回到本节补充下载后再继续。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/07_search_results_qwen3.png').default} alt="图 7  搜索 Qwen3 后的模型版本结果" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  搜索 Qwen3 后的模型版本结果</div>

### 4.4 配置 Recipe

在 **vLLM Recipes** 页单击 **添加**（或在模型下载页面点击 **创建 Recipe**）后，即打开图8的页面。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/08_add_recipe_form.png').default} alt="图 8  添加 Recipe 表单" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  添加 Recipe 表单</div>

#### 4.4.1 查找适配的 Recipe

前往 recipes.vllm.ai，选择模型供应商

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/09_vllm_recipes_home.png').default} alt="图 9  vLLM Recipes 官网首页" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  vLLM Recipes 官网首页</div>

#### 4.4.2 选择模型版本

在选中供应商后进入详情页，左侧按提供商分组列出模型版本，选中目标版本后右侧展示该模型的相关属性标签、INSTALL 行与启动命令。
确认模型版本与硬件要求后，即可在命令区复制启动命令。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/10_select_provider_and_model.png').default} alt="图 10  按提供商定位模型版本" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  按提供商定位模型版本</div>

#### 4.4.3 复制启动命令

单击 **Copy** 复制 docker 格式的启动命令，取得可导入到导入命令的文本。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/11_copy_launch_command.png').default} alt="图 11  复制模型启动命令" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  复制模型启动命令</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/11a_launch_command_parameters.png').default} alt="启动命令参数说明" />


#### 4.4.4 粘贴启动命令

把复制的 docker 格式启动命令粘贴到 **导入命令**，粘贴后单击输入框外的空白处，1Panel 即解析命令并自动匹配名称、模型、环境变量与启动参数。核对无误后单击 **确认** 保存 recipe。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/12_paste_import_command.png').default} alt="图 12  粘贴导入命令" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  粘贴导入命令</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/13_import_command_autofill.png').default} alt="图 13  导入命令自动解析并填充表单" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  导入命令自动解析并填充表单</div>

#### 4.4.5 同步官方 Recipes

点击 **同步** 按钮，展开后提供 **立即同步** 与 **关闭自动同步** 两项。单击 **立即同步**，1Panel 会从上游 recipes 仓库拉取官方 Recipes 并写入本地列表；同步得到的菜谱在类型列标记为 **系统同步**，与用户自行创建的 **自定义** 菜谱区分。同步完成后，这些菜谱即出现在图 14 的列表中，可直接 **部署** 或 **克隆** 使用。无论是**自定义**创建还是**系统同步**得到的菜谱，都会保存在 **vLLM Recipes** 列表，供 5.1 新增实例时通过 Recipe 下拉选用；若部署时发现缺少对应模型版本，可回到 4.3.2 补充下载。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/14_vllm_recipes_sync_menu.png').default} alt="图 14  vLLM Recipes 页的同步入口与菜谱列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 14  vLLM Recipes 页的同步入口与菜谱列表</div>

## 5 模型部署

### 5.1 新增实例

在**模型部署**页单击 **新增实例**，打开**新增实例**配置页面。图 15 中名称示例为 `vLLM-Qwen3.6-35B-A3B`；GPU 类型选中 NVIDIA，另有 Intel、Ascend 两个选项；vLLM 版本选择 `0.33.0`；vLLM 镜像为 `vllm/vllm-openai:v0.33.0`。
**服务端口**不能与已有实例相同，**选择模型**下拉选中 `Qwen3.6-35B-A3B-FP8`，右侧 **选择** 按钮可浏览模型目录。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/15_create_instance_basic.png').default} alt="图 15  新增实例的基本信息" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 15  新增实例的基本信息</div>

打开**GPU 加速**开关，选择 Recipe 下拉已选中 `Qwen3.6-35B-A3B-FP8`，环境变量自动匹配为 `VLLM_USE_RUST_FRONTEND=1`，启动命令同样是自动匹配，点击**确定**后相应的实例就会出现在vLLM实例中。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/16_create_instance_recipe_config.png').default} alt="图 16  新增实例的 Recipe 配置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 16  新增实例的 Recipe 配置</div>

单击 **确认** 后回到**模型部署**实例列表，确认实例已经创建并可以看到服务状态。服务状态可分为：准备中、已就绪、未运行。此时服务状态为准备中。待服务状态由**准备中**变为**已就绪**后，即可在 5.1.1 的**监控**页查看运行状况。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/17_deployment_instance_list.png').default} alt="图 17  模型部署实例列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 17  模型部署实例列表</div>

#### 5.1.1 监控

实例部署完成后，可在**监控**页查看运行状况，页面提供**实时状态**、**监控数据**、**峰值分析**和**设置**四个页签。

在**设置**页开启**历史监控采集**，并按需要调整采集间隔与保存天数。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/18_monitor_settings.png').default} alt="图 18  监控设置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 18  监控设置</div>

**实时状态**页集中展示当前采集周期内的运行指标。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/19_monitor_realtime_status.png').default} alt="图 19  监控实时状态" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 19  监控实时状态</div>

**监控数据**页按时间范围提供**概览**、**延迟分析**和**请求分析**三类趋势图。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/20_monitor_data_overview.png').default} alt="图 20  监控数据概览" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 20  监控数据概览</div>

**延迟分析**呈现请求各阶段的耗时趋势。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/21_monitor_data_latency.png').default} alt="图 21  监控数据延迟分析" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 21  监控数据延迟分析</div>

**请求分析**呈现请求的分布与结束情况，暂无记录时显示**暂无数据**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/22_monitor_data_requests.png').default} alt="图 22  监控数据请求分析" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 22  监控数据请求分析</div>

**峰值分析**页可自动查询指定时间范围内的最高并发时段。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/23_monitor_data_peak.png').default} alt="图 23  监控数据峰值分析" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 23  监控数据峰值分析</div>

#### 5.1.2 更多
单击更多时可进行终端、同步删除等操作

1.点击更多后打开**终端**，确认连接用户与命令后单击**连接**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/24_terminal_connect.png').default} alt="图 24  连接终端" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 24  连接终端</div>

连接后即可使用终端，需要结束时单击**断开**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/25_terminal_connected.png').default} alt="图 25  终端连接成功" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 25  终端连接成功</div>

2.点击更多后再次点击 **同步** 进入到图 26 的页面，选择访问的地址后，点击**同步**后可将数据同步到模型服务中。操作完成后返回实例列表，即可继续在 5.1.1 的**监控**页核对服务运行状态。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/26_sync_address.png').default} alt="图 26  同步访问地址" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 26  同步访问地址</div>

### 5.2 新增外部实例

新增外部实例所需的参数来自外部已有的实例配置，可在实例**编辑**页面查看**API Key**与**选择模型**等信息后填写。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/27_external_instance_config_source.png').default} alt="图 27  外部实例参数的来源" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 27  外部实例参数的来源</div>

在**模型部署**页单击**新增外部实例**，打开**新增外部实例**配置页面。**基本信息**中**名称**、**访问地址**、**API Key**均来自图 27 。填写完成后单击**检查并获取**，页面顶部提示 **健康检查通过** 说明该外部实例是可用的。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/28_add_external_instance_basic.png').default} alt="图 28  新增外部实例的基本信息" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 28  新增外部实例的基本信息</div>

**vLLM 版本**与图 27 中的保持一致，**模型**为 `Qwen3.8-27B-FP8`。**高级设置**保持默认即可。单击**保存**完成添加。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/29_add_external_instance_advanced.png').default} alt="图 29  新增外部实例的高级设置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 29  新增外部实例的高级设置</div>

保存后实例列表显示**外部**实例 `vllm-Qwen3.8-27B-FP8`，**版本** `0.33.0`等信息；**状态**为**正常**，**服务状态**为**已就绪**，可进行**编辑**、**监控**、**更多** 等操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/30_external_instance_status.png').default} alt="图 30  外部实例状态列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 30  外部实例状态列表</div>

在实例列表中单击**编辑**，可对已有实例的参数进行修改。至此，模型准备、Recipe 配置、实例部署与外部实例接入已形成完整流程：实例列表中**服务状态**为**已就绪**后，可在**监控**页核对运行状况；如需调整参数，可单击**编辑**修改。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src={require('./images/31_instance_edit.png').default} alt="图 31  实例编辑" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 31  实例编辑</div>

## 6 注意事项

- 修改**模型目录**或**分词器目录**不会自动迁移已有文件，调整前需自行迁移模型文件与分词器文件。
- **搜索并下载模型**在未输入关键词时显示**暂无数据**，属于初始状态。
-同一宿主机部署多个实例时，请确保服务端口与启动命令中的 `--port` 一致且不冲突。
- 启动命令中的 `--api-key` 为服务访问密钥，本文以 `YOUR_API_KEY` 占位符代替界面示例值。

