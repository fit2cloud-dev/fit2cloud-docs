---
title: 集成到 OpenClaw
---


Cordys CRM Skills + OpenClaw + 企微机器人/飞书机器人，可快速构建你的私人 AI 助理，
像与人交谈一样与你的 Cordys CRM 工作区进行交互。
## 1 部署 OpenClaw 实例


推荐使用 [**1Panel**](/1panel/) 一键部署，过程简单且稳定：[**👉 快速开始**](https://openclaw.club/zh-cn/guides/quick-start)

![OpenCLaw-1p](/img/cordys/openclaw/1panel-docs2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  OpenClaw-1Panel部署</div>


OpenClaw安装部署完成后，进入智能体列表页面，如下图所示，点击WebUI直接跳转即可进入OpenClaw页面。
![OpenCLaw-1p](/img/cordys/openclaw/1panel-ai.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  WebUI 跳转</div>


进入OpenClaw页面后，输入信息看AI助理是否回复，如有正常回复，如下图所示，说明确认OpenClaw部署成功。
![OpenCLaw](/img/cordys/openclaw/chat.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  OpenClaw</div>


官方安装地址参考 [OpenClaw 官方文档](https://docs.openclaw.ai/zh-CN)，如果在安装过程中遇到任何问题，可以参考官方文档中的 [常见问题排查](https://docs.openclaw.ai/zh-CN/start/openclaw)。

## 2 Cordys CRM Skills 安装

仓库地址：https://github.com/1Panel-dev/CordysCRM-skills

快速安装命令

```bash
# 通过 Clawdhub 安装（推荐，自动处理依赖和更新）
clawdhub install cordys-crm

# 直接使用安装脚本（适合有 Bash 环境的用户）
curl -fsSL https://raw.githubusercontent.com/1Panel-dev/CordysCRM-skills/main/install.sh | bash

```

安装完成后，需要在 OpenClaw 的 ~/.openclaw/workspace/skills/cordys-crm 目录下创建一个 `.env` 文件，内容如下：

```ini
CORDYS_ACCESS_KEY=你的AccessKey
CORDYS_SECRET_KEY=你的SecretKey
CORDYS_CRM_DOMAIN=https://你的域名
```


登录 Cordys CRM，从左下角【个人中心 - API Keys】中获取 Access Key 和 Secret Key。

![APIKeys](/img/cordys/index/api_keys.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  API Keys</div>


验证 Cordys CRM Skills 是否安装成功，可以通过 `Chat` 对话，输入查询关键字，如果能够正确返回查询结果集，则说明安装成功。

![ChatRes](/img/cordys/openclaw/chat-crm.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  Chat</div>

## 3 Skills 模块概览
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  模块描述</div>
| 模块 | 描述 |
| --- | --- |
| `lead` | 线索记录，用于销售团队初步跟进。|
| `account` | 客户/公司基础信息，包含行业、地点、负责人等。|
| `opportunity` | 商机（机会）记录，表示销售流程中的具体案子。|
| `contract` | 合同及其回款、发票等子资源，用于追踪签署后的收款与交付状态。|
| `pool` | 公共资源池（可选），用于共享线索或商机。|
| 其他模块 | 可以根据 API 文档继续扩展，如 `task`、`contact`、`product` 等。|


你在自然语言中提到的模块名，转换成命令时就能直接定位到本文档中所列的模块。

`contract` 模块还有几个常用的二级资源：

`contract/payment-plan`（回款计划）、`invoice`、`contract/business-title`（工商抬头）、`contract/payment-record` 以及 `opportunity/quotation`，CLI 仍然沿用 `page`/json 的方式访问它们。

## 4 聊天渠道配置

###  4.1 企微集成示例


第一步：以长连接方式创建智能机器人，获取Bot ID和Secret

通过长连接方式创建的智能机器人，支持主动向用户发送消息。

可在客户端-工作台，点击-智能机器人-创建机器人，选择API模式创建。

![agent](/img/cordys/openclaw/weixin/1.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  创建智能机器人</div>

![agent](/img/cordys/openclaw/weixin/22.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  API 模式创建</div>


选择以“长连接”方式创建，并获取Bot ID 和 Secret。

![agent](/img/cordys/openclaw/weixin/3.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  长连接方式创建</div>


第二步：在本地终端安装企微插件
```bash
    openclaw plugins install @wecom/wecom-openclaw-plugin
```

安装成功提示如图。

![agent](/img/cordys/openclaw/weixin/4.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  安装成功</div>


重启 OpenClaw。

```bash
    openclaw gateway start
```
在终端中，输入以下命令，添加渠道。
```bash
    openclaw channels add
```
在select channel步骤，选择 channel 为企业微信

![agent](/img/cordys/openclaw/weixin/5.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  企业微信渠道</div>


输入企业微信机器人Bot ID、Secret。

![agent](/img/cordys/openclaw/weixin/6.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  配置详情</div>


选择 finish。

![agent](/img/cordys/openclaw/weixin/7.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  完成</div>


选择配对方式，选择 Pairing。

![agent](/img/cordys/openclaw/weixin/8.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  配对方式</div>


完成后续配置，并可看到配置渠道成功。

![agent](/img/cordys/openclaw/weixin/9.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 14  配置渠道成功</div>


在企业微信中，保存机器人，并跟他发消息。会收到一个配置密钥。

![agent](/img/cordys/openclaw/weixin/10.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 15  收到配置密钥</div>


复制此信息最后一行，并输入在终端中，完成配对。

![agent](/img/cordys/openclaw/weixin/11.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 16  完成配对</div>


此时可在企业微信中正常对话。

![agent](/img/cordys/openclaw/weixin/12.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 17  企业微信中对话</div>

![agent](/img/cordys/openclaw/weixin/13.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 18  企业微信中对话</div>

完整的企业微信机器人接入流程可参考 [**👉 官方文档**](https://open.work.weixin.qq.com/help2/pc/cat?doc_id=21657&invite_source=19&invite_channel=6&invite_olduser=1&inviter_identity=2&version=5.0.6.70630&platform=mac)

###  4.2 飞书 集成示例


步骤一：创建企业自建应用
首先我们登录飞书进入飞书开放平台（链接：https://open.feishu.cn/app?lang=zh-CN ）进入“开发者后台”，选择“企业自建应用”，点击“创建企业自建应用”，如下图所示：

![agent](/img/cordys/openclaw/feishu/feishu-1.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 19  创建企业自建应用</div>


如下图所示，根据要求输入相关应用名称以及基本信息点击创建即可。

![agent](/img/cordys/openclaw/feishu/feishu-2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 20  创建详情</div>


步骤二：创建机器人
如下图所示，点击创建机器人，完成机器人创建。

![agent](/img/cordys/openclaw/feishu/feishu-3.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 21  机器人创建</div>


进入机器人页面后，点击机器人配置后的编辑按钮，定义机器人名称，如下图所示：

![agent](/img/cordys/openclaw/feishu/feishu-4.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 22  机器人配置</div>


步骤三：权限配置
完成机器人创建后，点击进入“权限管理”，并点击“批量导入/导出权限”。

![agent](/img/cordys/openclaw/feishu/feishu-5.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 23  权限配置</div>


点击“批量导入/导出权限”，清空默认配置权限信息，将如下所示权限授权脚本复制粘贴，点击保存即可。

```json
{
  "scopes": {
    "tenant": [
      "aily:file:read",
      "aily:file:write",
      "application:application.app_message_stats.overview:readonly",
      "application:application:self_manage",
      "application:bot.menu:write",
      "cardkit:card:write",
      "contact:contact.base:readonly",
      "contact:user.employee_id:readonly",
      "corehr:file:download",
      "docs:document.content:read",
      "event:ip_list",
      "im:chat",
      "im:chat.access_event.bot_p2p_chat:read",
      "im:chat.members:bot_access",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.group_msg",
      "im:message.p2p_msg:readonly",
      "im:message:readonly",
      "im:message:send_as_bot",
      "im:resource",
      "sheets:spreadsheet",
      "wiki:wiki:readonly"
    ],
    "user": [
      "aily:file:read",
      "aily:file:write",
      "contact:contact.base:readonly",
      "im:chat.access_event.bot_p2p_chat:read"
    ]
  }
}

```

粘贴后，效果如下图所示：

![agent](/img/cordys/openclaw/feishu/feishu-6.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 24  效果</div>


点击“下一步，确认新增权限”，并最终确保所有权限均已开通。其中个人用户自行确认企业账户需要管理员审核。确保所有权限均已开通，如下图所示：

![agent](/img/cordys/openclaw/feishu/feishu-7.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 25  权限配置</div>


步骤四：获取凭证并配置
进入飞书平台在“凭证与基础信息”中获取应用凭证，如下图所示：
![agent](/img/cordys/openclaw/feishu/feishu-8.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 26  获取凭证并配置</div>


获取后，进入OpenClaw 的“配置”页面，完成飞书聊天渠道配置，点击保存，如下图所示：

![agent](/img/cordys/openclaw/feishu/feishu-9.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 27  飞书聊天渠道配置</div>


步骤五：创建事件与回调
如下图所示，进入“事件与回调”菜单，分别完成订阅方式设置以及事件添加。

![agent](/img/cordys/openclaw/feishu/feishu-10.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 28  创建事件与回调</div>


订阅方式设置：参照如下图选择长链接订阅方式：
![agent](/img/cordys/openclaw/feishu/feishu-11.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 29  长链接订阅</div>


添加事件：输入im.message.receive_v1搜索，基于“应用身份订阅”勾选接收消息，最后确认添加即可。
![agent](/img/cordys/openclaw/feishu/feishu-12.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 30  接收消息</div>


步骤六：创建并发布版本
确认完成后点击“创建版本”，然后根据要求输入版本相关信息并发布，个人账号无需审批，企业账号需要进行企业审批。
![agent](/img/cordys/openclaw/feishu/feishu-13.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 31  创建版本</div>


步骤七：飞书渠道验证确认
以上信息配置完成后，我们进入飞书客户端，如下图打开应用：

![agent](/img/cordys/openclaw/feishu/feishu-14.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 32  飞书渠道验证</div>