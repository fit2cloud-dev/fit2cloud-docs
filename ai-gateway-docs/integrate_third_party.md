---
title: 接入第三方
description: 介绍如何将 Work Buddy、DeepSeek Harness、codex、Cursor、OpenClaw 等客户端接入 1Panel AI 网关。
---

在开始之前，先弄清楚两个名词，后文会反复出现：

- **1Panel AI 网关**：部署在你（或管理员）服务器上的"模型中转站"。它把各种大模型统一包装成一个标准接口，你在客户端里填上它的地址和密钥，就能用上网关里的模型。
- **API Key**：可以理解为"门禁卡"。客户端要访问网关，必须出示这张卡；没有它或者卡号填错，请求会被拒绝。

整个接入流程只有三步：**① 下载并安装客户端 → ② 在网关管理端拿到 API Key → ③ 在客户端里填好配置**。下面逐个客户端讲解。

在动手前，请先向管理员确认两件事（建议拿张纸记下来）：

1. **接口地址（Base URL）**：例如 [https://1router.1panel.cn/v1](https://1router.1panel.cn/v1)，注意末尾的 `/v1` 不能少。
2. **模型名称**：管理员在网关里给你开通的模型标识（例如 `1Panel-Auto`），配置时必须一字不差。

### 1 准备工作：获取 API Key（各客户端通用）

不管你用哪个客户端，都需要先在 1Panel AI 网关管理端创建属于自己的 API Key。如果你已经做过这一步并保存了 Key，可以跳到对应客户端的章节。

首先进入模型广场：登录管理端后，默认进入「模型广场」页面。在这里你能看到网关已接入的**所有可用模型**、统一的**接入地址**，以及每个模型的**名称与类型**。后续客户端配置要用到的模型名称和接入地址，都能在这一页找到（配置时需一字不差）。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model-square/image1-model-square.png" alt="模型广场"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  模型广场</div>

然后创建 API Key：进入「API Key 管理」页面，为自己创建新的 API Key。Key 仅在创建时完整显示一次，请务必立即复制保存。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image2_create_apikey.png" alt="创建 API Key"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建 API Key</div>

复制并妥善保管 API Key，避免泄露给他人。如 Key 遗忘或泄露，需在管理端重新生成并更新所有客户端配置。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image3_copy_apikey.png" alt="复制 API Key"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  复制 API Key</div>

### 2 接入 WorkBuddy

#### 2.1 下载并安装 WorkBuddy

WorkBuddy 是一款 AI 办公桌面客户端，支持 Windows 和 macOS，双击安装包、像装普通软件一样下一步到底即可。

- **官方下载页**：[https://www.workbuddy.cn/](https://www.workbuddy.cn/)（打开网页后点击页面上的"立即下载"，按自己的电脑系统选择：Windows 选 **Windows x64**；Mac 电脑按芯片选 **Apple 芯片（M 系列）** 或 **Intel** 版本）

:::tip[温馨提示]

怎么知道自己的 Mac 是苹果芯片还是 Intel？点屏幕左上角苹果图标 →「关于本机」，"芯片"一栏写着 Apple Mx 就选 ARM64/Apple 芯片版，写着 Intel 就选 x64/Intel 版。

:::

安装完成后打开 WorkBuddy，用页面上的入口登录账号，即可进行下面的模型配置。

#### 2.2 配置自定义模型

点击配置自定义模型：在客户端设置中找到「自定义模型」或「添加模型」入口。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image4_workbuddy_custom_model.png" alt="配置自定义模型"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  配置自定义模型</div>

提供商选择自定义：类型选择「自定义」或「OpenAI 兼容」，**不要**选择预设的 OpenAI 官方选项。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image5_select_custom_provider.png" alt="选择自定义提供商"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  选择自定义提供商</div>

填入以下三项信息：

- 接口地址（Base URL）：[https://1router.1panel.cn/v1](https://1router.1panel.cn/v1) （以管理员给你的地址为准）
- API Key：第 1 步里复制的 API Key
- 模型名称：管理员给你开通的模型名称

三者需完全一致。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image6_fill_integration_config.png" alt="填写接入配置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  填写接入配置</div>

:::note[注意]

接口地址末尾的 `/v1` 路径不可省略，部分客户端会自动补全，但建议显式写入以避免请求失败。

:::

#### 2.3 保存并测试

点击保存，选择刚才配置的模型进行测试：在模型列表中发送测试消息，验证请求是否正常返回。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image7_save_and_test_model.png" alt="保存并测试模型"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  保存并测试模型</div>

### 3 接入 DeepSeek Harness

#### 3.1 下载并安装 DeepSeek Harness

DeepSeek Harness 是 DeepSeek 官方开源的 Agent 运行工具，它不是"下载一个安装包"这么简单，需要先了解一下两种官方安装方式，任选其一：

- **方式一：命令行快速启动（推荐）**。先安装 Node.js（去官网 [https://nodejs.org](https://nodejs.org) 下载 LTS 版本，一路下一步安装即可），然后在终端（Windows 打开 PowerShell，Mac 打开"终端"）里输入下面这行命令回车，等待启动完成：
  ```bash
  npx @deepseek-ai/dsh web
  ```
  启动成功后，终端会显示一个本地网址（例如 [http://127.0.0.1:3080](http://127.0.0.1:3080)），用浏览器打开这个网址，就是 DeepSeek Harness 的操作界面。
- **方式二：源码安装（适合有开发经验的用户）**：
  ```bash
  git clone https://github.com/deepseek-ai/deepseek-harness
  ```
  然后按照仓库里的说明完成安装。
- **官方渠道入口**：官网 [https://www.deepseek.com](https://www.deepseek.com)（DeepSeek 官网首页可找到 Harness 相关入口）；GitHub 仓库 [https://github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)。

:::warning[认准官方渠道]

网上存在仿冒 DeepSeek / DeepSeek Harness 的网站和账号。请只通过上述官方地址下载，任何"收费入群""收费激活"都是假冒行为。

:::

#### 3.2 配置接入 1Panel AI 网关

进入 DeepSeek Harness（浏览器打开的界面），点击设置、模型、添加自定义提供方。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image8_deepseek_harness_add_provider.png" alt="添加自定义提供方"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  添加自定义提供方</div>

填写提供方配置：名称可以随意起（仅用于自己识别）。

API 地址填 [https://1router.1panel.cn/v1](https://1router.1panel.cn/v1)（末尾 `/v1` 不可省略）。

API 密钥填第 1 步里复制的 API Key，API 协议保持默认即可。

填好后可以点击"获取可用"拉取模型列表；若获取不了，也可以点击"添加"手动填写模型名称（名称需与管理员开通的模型名称完全一致）。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image9_fill_provider_config.png" alt="填写提供方配置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  填写提供方配置</div>

#### 3.3 选择模型并测试

选择配置好的模型进行测试：保存后在底部输入框左侧的提供商下拉菜单中选择刚添加的提供方，发送消息验证连接。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image10_deepseek_select_test_model.png" alt="选择模型并测试"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  选择模型并测试</div>

### 4 接入 codex

#### 4.1 下载并安装 codex（Codex CLI）

Codex CLI 是 OpenAI 推出的终端编程助手——没有窗口界面，在命令行（终端）里敲 `codex` 命令使用。安装分两步：

第一步，安装 Node.js（版本建议 22 及以上）。去 Node.js 官网 [https://nodejs.org](https://nodejs.org) 下载 LTS 版本，安装时保持默认选项即可。装完打开终端输入 `node -v`，能显示版本号就说明装好了。

第二步，安装 Codex CLI。打开终端（Windows 用 PowerShell，Mac 用"终端"），输入：

```bash
npm install -g @openai/codex
```

:::tip[温馨提示]

- 包名必须是 `@openai/codex`，注意前面有 `@openai/`，不要只输 `codex`，那是一个不相关的旧包。
- 如果下载很慢或超时，可以先换国内镜像源再装：`npm config set registry1` [https://registry.npmmirror.com](https://registry.npmmirror.com)

  :::

安装完输入 `codex --version`，能显示版本号即成功。

- **官方仓库**：[https://github.com/openai/codex](https://github.com/openai/codex)（也可从仓库的 Releases 页下载免 Node.js 的预编译版本）

#### 4.2 CC Switch 配置

Codex CLI 本身不提供可视化的供应商管理界面，直接修改 `~/.codex/config.toml` 的方式门槛较高。这里借助 CC Switch 这一小工具完成配置：它负责管理 Codex 的供应商配置，并把请求路由到 1Panel AI 网关，无需手工编辑配置文件。

CC Switch 下载地址（GitHub Releases 发布页）：[https://github.com/farion1231/cc-switch/releases/latest](https://github.com/farion1231/cc-switch/releases/latest)

- Windows：下载 `CC-Switch-vX.X.X-Windows.msi` 安装包，双击按向导安装
- macOS：下载 `CC-Switch-vX.X.X-macOS.zip`，解压后把应用拖入"应用程序"文件夹（首次打开若提示"未知开发者"，前往「系统设置 → 隐私与安全性」点击「仍要打开」）

首先下载并安装 CC Switch，安装完成后打开软件，进入供应商管理界面，点击右上角「添加」按钮，新建一个供应商配置。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image11_ccswitch_add_button.png" alt="点击添加"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  点击添加</div>

在弹出的表单中选择「自定义配置」，并填写以下信息：

- API Key：粘贴在 1Panel AI 网关管理端创建的 API Key
- API 请求地址：[https://1router.1panel.cn/v1](https://1router.1panel.cn/v1)（注意末尾的 `/v1` 不可省略）

同时打开「本地路由映射」开关。该功能会在本机启动一个代理地址，Codex 的请求先发往本地代理，再由 CC Switch 转发到 1Panel AI 网关，从而绕开 Codex 对官方接口地址的限制。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image12_enter_apikey_enable_routing.png" alt="填写配置并启用路由"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  填写配置并启用路由</div>

点击「获取模型列表」，CC Switch 会通过网关的 `/v1/models` 接口拉取当前可用的模型。在返回的列表中选择要使用的模型（或手动添加，名称需与管理端模型映射中的请求模型名称完全一致），确认无误后点击「添加」按钮保存该供应商配置。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image13_fetch_model_list_submit.png" alt="获取模型列表并提交"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  获取模型列表并提交</div>

回到 CC Switch 的开始界面，在供应商列表中选中刚创建的配置，点击「启动」，CC Switch 会将本地路由代理与 Codex 配置一并写入。之后重启 codex（退出正在运行的 Codex CLI 进程后重新启动），使新配置生效。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image14_restart_codex_after_ccswitch.png" alt="重启 codex"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 14  重启 codex</div>

#### 4.3 发起测试对话

在 codex 中发起一次对话测试：选择映射到 1Panel AI 网关的模型（如 `1Panel-Auto`），发送一条简单消息。若能正常返回回复，说明整条链路（codex → CC Switch 本地路由 → 1Panel AI 网关 → 上游模型）已经打通。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image15_codex_select_model_test.png" alt="codex 测试对话"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 15  codex 测试对话</div>

### 5 接入 Cursor

#### 5.1 下载并安装 Cursor

Cursor 是一款 AI 编程编辑器（可理解为"内置 AI 助手的 VS Code"），支持 Windows、macOS 和 Linux。打开官网 [https://cursor.com/download](https://cursor.com/download)，点击「Download for Windows / Mac」下载安装包，双击安装即可，无需额外配置环境。

#### 5.2 添加自定义模型

打开 Cursor 并登录账号后，在对话输入框下方点击当前模型名称（如 `Composer 2.5 Fast`）打开模型下拉菜单，点击列表底部的「Add Models」。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image16_cursor_add_models.png" alt="点击 Add Models"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 16  点击 Add Models</div>

进入「Models」设置页后，点击列表底部的「View All Models」展开全部模型。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image17_cursor_models_view_all.png" alt="View All Models"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 17  展开全部模型</div>

在展开的模型列表最底部，点击「+ Add Custom Model」，开始添加网关模型。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image18_cursor_add_custom_model.png" alt="Add Custom Model"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 18  点击 Add Custom Model</div>

#### 5.3 填写接入配置

按以下顺序填写四项信息（对应下图标号）：

1. **模型名称**：填写网关开通的模型标识（如 `1Panel-Auto`），需与模型广场展示的名称一字不差
2. **OpenAI API Key**：粘贴在 1Panel AI 网关管理端创建的 API Key
3. **Override OpenAI Base URL**：打开该开关，填入接口地址 `https://1router.1panel.cn/v1`（末尾 `/v1` 不可省略）
4. 点击「Add」保存

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image19_cursor_fill_apikey_baseurl.png" alt="填写接入配置"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 19  填写模型名称、API Key 与接口地址</div>

:::note[注意]
接口地址末尾的 `/v1` 路径不可省略。若你的网关部署在本地或内网，地址以管理员提供的实际地址为准。
:::

#### 5.4 选择模型并测试

回到对话界面，再次打开模型下拉菜单，此时列表中已出现刚添加的模型（如 `1Panel-Auto`），点击选中它并发送一条简单消息。若能正常返回回复，说明 Cursor → 1Panel AI 网关 → 上游模型的链路已经打通。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image20_cursor_select_model_test.png" alt="选择模型并测试"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 20  选择自定义模型并测试</div>

### 6 接入 OpenClaw

OpenClaw 是一款开源的个人 AI 助手（通过终端使用），同样支持接入自定义模型。接入它需要先在电脑上安装 Node.js（版本建议 22 及以上，方法见 4.1 节），然后在终端（Windows 用 PowerShell）执行安装命令：

```bash
npm install -g openclaw
```

接入 1Panel AI 网关有两种配置方式，任选其一即可：方式一用交互式配置向导（推荐，全程按提示填写）；方式二直接编辑配置文件 `openclaw.json`（适合熟悉 JSON 的用户）。

#### 6.1 方式一：交互式配置向导

在终端执行以下命令，进入模型配置向导：

```bash
openclaw configure --section model
```

在「Model/auth provider」列表中，用方向键选中「More...」并按回车，展开完整供应商列表。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image21_openclaw_config_section_model.png" alt="进入模型配置向导"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 21  进入模型配置向导并展开更多供应商</div>

在列表中选中「Custom Provider (Any OpenAI or Anthropic compatible endpoint)」并按回车。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image22_openclaw_select_custom_provider.png" alt="选择 Custom Provider"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 22  选择 Custom Provider</div>

按提示依次填写三项信息：

- **API Base URL**：`https://1router.1panel.cn/v1`（末尾 `/v1` 不可省略）
- **API Key**：粘贴在 1Panel AI 网关管理端创建的 API Key
- **Model ID**：网关开通的模型标识（如 `1Panel-Auto`），需与模型广场展示的名称一字不差

填完 Model ID 后，向导会自动校验连通性并显示「Verification successful」；「Endpoint compatibility」保持默认的 OpenAI-compatible，「Endpoint ID」保持与模型 ID 一致即可。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image23_openclaw_fill_baseurl_apikey_modelid.png" alt="填写接口地址、API Key 与模型 ID"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 23  填写接口地址、API Key 与模型 ID 并通过校验</div>

一路按回车完成剩余选项后，终端出现「Configuration updated.」表示配置已写入 `~/.openclaw/openclaw.json`（旧配置会自动备份为 `.bak` 文件）。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image24_openclaw_config_updated.png" alt="配置更新完成"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 24  出现 Configuration updated 即配置完成</div>

#### 6.2 方式二：直接编辑 openclaw.json

配置向导不方便使用时，可以直接编辑配置文件 `~/.openclaw/openclaw.json`（Windows 上位于 `C:\Users\<你的用户名>\.openclaw\openclaw.json`），在 `models.providers` 下添加自定义供应商节点，核心字段如下：

```json
"models": {
  "mode": "merge",
  "providers": {
    "1panel-auto": {
      "baseUrl": "https://1router.1panel.cn/v1",
      "apiKey": "sk-你的APIKey",
      "api": "openai-completions",
      "models": [
        {
          "id": "1Panel-Auto",
          "name": "1Panel-Auto"
        }
      ]
    }
  }
}
```

四个要点：

- **baseUrl**：网关接口地址，末尾 `/v1` 不可省略
- **apiKey**：网关管理端创建的 API Key
- **api**：固定填 `openai-completions`
- **models 的 id / name**：网关开通的模型标识，两处保持一致

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image25_openclaw_edit_json_config.png" alt="编辑 openclaw.json"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 25  在 openclaw.json 中配置自定义供应商</div>

#### 6.3 校验配置

两种方式配置完成后，都执行以下命令校验配置文件是否合法：

```bash
openclaw config validate
```

终端输出「Config valid: ~/.openclaw\openclaw.json」（绿色）即表示配置正确。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image26_openclaw_config_validate.png" alt="配置校验通过"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 26  openclaw config validate 校验通过</div>

:::note[常见踩坑]
- JSON 里字段名写错（如 `baseUrl` 写成 `base_url`）、`api` 值填错，都会导致校验报错「Invalid option」或「Unrecognized key」，按错误提示里给出的合法值修正即可。
- 不要用 `openclaw config set auth.openai.baseURL ...` 来配置网关——该键位校验会失败，正确做法就是用上面的方式一或方式二写入 `models.providers`。
:::

#### 6.4 启动网关并测试对话

校验通过后，启动 OpenClaw 网关：

```bash
openclaw gateway run --verbose
```

启动日志最后一行出现 `agent model: my-selfhost/1Panel-Auto`（即配置的供应商/模型）说明模型已生效。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image27_openclaw_gateway_run.png" alt="启动 OpenClaw 网关"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 27  启动网关，agent model 显示为已接入的模型</div>

新开一个终端执行 `openclaw tui` 进入对话界面，发送一条简单消息（如"你好"）。能收到模型回复，且状态栏显示所用模型（如 `1Panel-Auto`），说明 OpenClaw → 1Panel AI 网关 → 上游模型链路已经打通。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/quick_deployment/image28_openclaw_tui_test_chat.png" alt="openclaw tui 测试对话"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 28  openclaw tui 测试对话成功</div>

### 7 常见问题排查（FAQ）

配置完成后测试如果不通，按下面的对照表排查，基本都能解决：

| 报错现象              | 大概率原因                           | 解决办法                                      |
| ----------------- | ------------------------------- | ----------------------------------------- |
| 401 / 403         | API Key 无效、复制不完整（少了开头或结尾字符）、已过期 | 回管理端确认 Key 有效，重新复制粘贴一遍，注意不要带空格            |
| 404               | 接口地址或模型名称填错                     | 检查 Base URL 末尾是否有 `/v1`；模型名称与管理员开通的是否一字不差 |
| 连接超时 / 无法访问       | 网络不通、地址不对                       | 换个浏览器访问 Base URL 确认可达；确认电脑没有开启拦截流量的代理软件   |
| 能连通但没有回复 / 模型列表为空 | 该模型未分配给你的账号                     | 联系管理员确认模型已加入你的用户组                         |
