---
title: 模型广场
description: 介绍 1Panel AI 网关模型广场，包括查看模型列表、按分类筛选、搜索模型与查看接口说明。
---

## 1 功能入口

登录成功后默认进入**模型广场**页面。左侧导航栏包含模型广场、API Keys、用量统计三个菜单，当前页面顶部面包屑显示「模型广场」。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model-square/image1-model-square.png" alt="模型广场"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  模型广场</div>

## 2 界面说明

页面顶部为**接入地址**区域，展示网关统一接入地址（如 `https://1router.1panel.cn/v1`），右侧提供**复制**与**接口说明**按钮。其下方为模型分类筛选标签与模型卡片列表。

**接入地址**：网关统一 Base URL，业务应用配置 API 时填写该地址
**复制**：单击后将接入地址复制到剪贴板，界面提示「已复制」
**接口说明**：打开弹窗，查看认证方式与支持的全部接口
**分类标签**：按「所有、文本、文生图、向量」筛选模型
**搜索模型名称**：按模型名称关键字搜索
**模型卡片**：展示模型名称、类型标签，右上角提供模型名称复制按钮
**分页控件**：支持 20 条 / 页等分页设置，展示数据总数

## 3 查看模型列表

模型以卡片形式展示，卡片上标注模型名称及类型标签。带**智能路由**标签的模型（如 `1Panel-Auto`）由网关自动将请求调度到合适的模型。

## 4 按分类筛选模型

1. 在模型列表上方，选择分类标签（**所有**、**文本**、**文生图**或**向量**）。
2. 列表实时刷新，仅显示所选分类的模型。
3. 所选分类下没有可用模型时，页面显示「当前分类暂无可调用模型」。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model-square/image2-text-filter.png" alt="按文本分类筛选模型"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  分类筛选文本</div>

## 5 搜索模型

1. 在右上角搜索框中输入模型名称关键字，例如 `f2c`。
2. 按 Enter 键，列表仅显示名称匹配的模型，底部计数同步更新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model-square/image3-search.png" alt="搜索模型"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  搜索模型</div>

## 6 复制模型名称

在目标模型卡片右上角单击**复制**图标按钮，模型名称即被复制到剪贴板，可直接粘贴到应用配置中。

## 7 查看接口说明

1. 单击接入地址区域右侧的**接口说明**。
2. 在弹窗中查看接入地址、认证方式及支持的接口列表。
3. 单击弹窗右上角关闭按钮或按 Esc 键关闭弹窗。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model-square/image4-api-doc.png" alt="接口说明"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  接口说明</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  接口说明内容</div>

| 请求方法 | 接口地址 | 说明 |
| --- | --- | --- |
| GET | `https://1router.1panel.cn/v1/models` | 获取可用模型列表 |
| POST | `https://1router.1panel.cn/v1/chat/completions` | OpenAI Chat Completions |
| POST | `https://1router.1panel.cn/v1/responses` | OpenAI Responses |
| POST | `https://1router.1panel.cn/v1/messages` | Anthropic Messages |
| POST | `https://1router.1panel.cn/v1/images/generations` | 文生图 |
| POST | `https://1router.1panel.cn/v1/embeddings` | 向量嵌入 |

:::note[认证方式]
- `Authorization: Bearer <API Key>`（通用）
- `x-api-key: <API Key>`（仅适用于 `/v1/messages` 接口）
:::
