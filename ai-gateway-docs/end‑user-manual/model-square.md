---
title: 模型广场
---

## 1 模型广场是什么

**模型广场**是登录成功后默认进入的页面，它是一个「**所有可调用模型的目录**」。在这里你可以：

- 一眼看到网关接入了**哪些模型**
- 按类型（文本 / 文生图 / 向量）**筛选**
- 按关键字**搜索**特定模型
- 获取**接入地址**与**接口说明**，拿到代码里就能用

> 💡 **类比**：模型广场就像网购 App 的「商品列表」——左侧是分类筛选，中间是商品（模型）卡片，点击商品可以看详情。

## 2 功能入口

登录成功后，浏览器会自动进入模型广场。左侧导航栏从左到右依次是 **模型广场 / API Keys / 用量统计** 三个菜单。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model-square/image1-model-square.png" alt="模型广场"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  模型广场</div>

页面从上到下分为 **4 个区域**：

1. **顶部接入地址区**：显示网关统一入口地址（Base URL），右侧有「复制」「接口说明」按钮。
2. **分类筛选标签**：「所有 / 文本 / 文生图 / 向量」四个标签。
3. **搜索框**：在右上角，可按模型名搜索。
4. **模型卡片列表**：每张卡片展示一个模型，标注名称和类型。

## 3 页面元素说明

### 3.1 接入地址

- **接入地址（Base URL）**：网关的统一入口，**业务应用配置 API 时填这个地址**。例如：`https://1router.1panel.cn/v1`。
- **复制按钮**：单击后把地址复制到剪贴板，页面会提示「已复制」，可直接粘贴到代码或配置文件中。
- **接口说明按钮**：单击后弹出弹窗，展示接入地址、认证方式和所有可调用的接口列表（详见第 7 节）。

:::tip[为什么要用接入地址而不是厂商原地址？]  
如果你的应用想同时使用 OpenAI、Anthropic、DeepSeek 三家模型，传统方式要在代码里写三套地址和认证。**用网关后，所有模型都通过 `https://1router.1panel.cn/v1` 这一个地址调用**，只换 `model` 字段即可，非常省事。  
:::

### 3.2 分类标签

分类标签用于按类型快速过滤模型列表：**所有**显示全部模型；**文本**筛选能聊天的 LLM，适用于问答、写文章、写代码、翻译；**文生图**筛选根据文字描述生成图片的模型；**向量**筛选 Embedding 模型，用于把文字转成向量，做 RAG 检索、相似度计算。

如果你只想看某类模型，可以按下面的步骤筛选：

1. 在模型列表上方，单击要看的分类标签（如「**文本**」）。
2. 列表会**实时刷新**，只显示该分类的模型，底部「共 N 项数据」同步更新。

> ✅ **预期结果**：例如点击「文本」后，只看到标了「文本」标签的卡片，文生图和向量模型消失。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model-square/image2-text-filter.png" alt="按文本分类筛选模型"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  按「文本」分类筛选后的效果</div>

:::note[分类下没模型时怎么办？]  
如果所选分类下没有任何可用模型，页面会显示「**当前分类暂无可调用模型**」。这是正常提示，不是出错。请联系管理员确认是否已为你开通该类模型的权限。  
:::

### 3.3 搜索框

按**模型名称关键字**搜索，例如 `f2c`、`deepseek`、`qwen`，列表会实时筛选并显示匹配项。

1. 在页面右上角的**搜索框**中输入关键字，例如 `f2c`。
2. 按 **Enter** 键（或回车）。
3. 列表**只显示名称含关键字**的模型。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model-square/image3-search.png" alt="搜索模型"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  搜索 \\\\\\\`f2c\\\\\\\` 只剩 5 个匹配模型</div>

> 💡 **小技巧**：搜索是「包含」匹配，不要求完全一致。输入 `qwen` 会同时匹配 `qwen3.8-27b`、`f2c-qwen3.8-flash-next` 等。

### 3.4 模型卡片

每张卡片包含：

- **模型图标**（左上角）
- **模型名称**（如 `deepseek-v4-flash`）
- **类型标签**（如「文本」「向量」）
- **复制按钮**（右上角）：一键复制模型名，可直接粘贴到代码的 `model` 字段

> 🔖 **什么是「智能路由」？** 部分模型（如 `1Panel-Auto`）会额外带一个蓝色的「**智能路由**」标签。这类模型由网关**自动根据请求内容挑选最合适的下游模型**，你不需要关心它实际调用了哪个模型——省心但通常价格稍高。

### 3.5 接入应用所需的配置信息

### 3.5.1 复制模型名称

调用模型时，代码里要写明用哪个模型（即 `model` 字段）。**复制按钮**就是为此而设：

1. 在目标模型卡片右上角，单击**复制图标**（小方块 + 方框图案）。
2. 模型名称（如 `deepseek-v4-flash`）即被复制到剪贴板，界面会有「已复制」短暂提示。
3. 直接在代码或配置文件中 `Ctrl + V` 粘贴即可。

接入应用前，你需要知道两件事：**接入地址**和**认证方式**。这两样都在「接口说明」弹窗里。

### 3.5.2 打开接口说明

（1）在页面顶部接入地址区域，单击右侧的「**接口说明**」按钮。

（2）弹出接口说明弹窗，包含 **接入地址 / 认证方式 / 请求方法列表** 三部分。

（3）看完后单击弹窗右上角的 **×** 或按 **Esc** 键关闭。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model-square/image4-api-doc.png" alt="接口说明"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  接口说明弹窗</div>

### 3.5.3 支持的接口

下表列出了所有可调用的接口。把它们理解成「**API 提供的功能菜单**」即可——你的应用要做什么，就调对应的接口。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  支持的接口一览</div>

| 请求方法 | 接口地址                                              | 用途                 | 何时使用                      |
| ---- | ------------------------------------------------- | ------------------ | ------------------------- |
| GET  | `https://1router.1panel.cn/v1/models`             | 获取可用模型列表           | 想用程序自动发现支持哪些模型时           |
| POST | `https://1router.1panel.cn/v1/chat/completions`   | OpenAI 聊天补全        | **最常用**，所有聊天类模型都走这里       |
| POST | `https://1router.1panel.cn/v1/responses`          | OpenAI Responses   | OpenAI 新版 Responses 接口    |
| POST | `https://1router.1panel.cn/v1/messages`           | Anthropic Messages | 调 Anthropic 系模型（Claude）专用 |
| POST | `https://1router.1panel.cn/v1/images/generations` | 文生图                | 根据文字描述生成图片                |
| POST | `https://1router.1panel.cn/v1/embeddings`         | 向量嵌入               | 把文字转成向量（用于 RAG、相似度）       |

### 3.5.4 认证方式

所有接口都需要在请求头里携带 **API Key** 用来「验明身份」。有两种写法：

:::note[认证方式]

- `Authorization: Bearer <API Key>` — **通用方式**，所有接口都支持
- `x-api-key: <API Key>` — **仅** Anthropic Messages 接口（`/v1/messages`）需要这样写  
  :::

`<API Key>` 需要替换为你在 [API Keys](pathname:///user_manual/ai_gateway/api_keys) 页面创建的实际密钥。

## 4 第一个调用示例（复制即用）

下面是一段最简的 curl 命令示例，复制后把 `sk-xxx` 换成你自己的 API Key 就能直接调用 `deepseek-v4-flash` 模型：

```bash
curl https://1router.1panel.cn/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-你的APIKey" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "user", "content": "你好，请用一句话介绍你自己"}
    ]
  }'
```

> ✅ **预期结果**：终端返回一段 JSON，里面包含模型生成的回复。如果返回 401/403，请检查 `Authorization` 头里的 API Key 是否正确。

## 5 注意事项

- 调用接口提示 `401 Unauthorized` 时，通常是 API Key 未填写正确或已被删除，可回到 [API Keys](pathname:///user_manual/ai_gateway/api_keys) 页面核对。
- 调用接口提示 `404 model_not_found` 时，通常是模型名称拼写有误，建议通过模型广场卡片的复制按钮获取准确名称，避免手动输入。
- 不确定选用哪个模型时，可选择带「智能路由」标签的模型（如 `1Panel-Auto`），由网关自动调度；有明确模型需求时直接使用对应的普通模型。
- 模型列表、接入地址等信息随网关配置动态变化，以模型广场页面实际展示为准。
