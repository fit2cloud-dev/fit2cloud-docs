---
title: OpenClaw
---

# OpenClaw 安装部署

**OpenClaw** 是一个运行在你自己设备上的个人 AI 助理，可以通过飞书、钉钉、企业微信、Telegram、WhatsApp、Discord 等渠道与你对话。

本文档基于 1Panel 的 **AI -> 智能体** 功能，介绍如何完成 OpenClaw 的安装部署与基础验证。

**扫码加入交流群**

<img alt="扫码加入交流群" src="https://resource.fit2cloud.com/1panel/openclaw/img/wechat.png" width="150" height="150"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1 OpenClaw 安装部署——扫码加入交流群</div>

## 前提准备

部署前请先确认以下条件：

- 已安装并可正常访问 1Panel
- 已准备可用的大语言模型 API Key，或已在 1Panel 中接入本地模型
- 服务器可正常访问互联网

## 1. 添加模型账号

进入 1Panel 面板后，打开 **AI** 菜单，进入 **智能体** 页面，切换到 **模型账号** 标签页。

点击 **添加模型账号**，根据实际使用的模型供应商填写对应信息并保存。

![OpenClaw 模型账号](/img/1panel/ai/openclaw_model_account.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2 添加模型账号管理</div>

## 2. 创建 OpenClaw 智能体

完成模型账号创建后，切换到 **智能体** 标签页，点击 **创建智能体**。

按页面要求填写 OpenClaw 的部署参数。

![创建 OpenClaw 智能体](/img/1panel/ai/openclaw_create_agent.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3 创建 OpenClaw 智能体</div>

**参数说明**

- **名称**：默认可填写为 `openclaw`，也可按需自定义
- **应用版本**：选择需要安装的 OpenClaw 版本
- **WebUI 端口**：默认 `18789`
- **Bridge 端口**：默认 `18790`
- **模型供应商**：选择前面已创建的模型账号对应供应商
- **Token**：用于访问 OpenClaw WebUI，系统会自动生成
- **其他参数**：一般保持默认即可

![选择模型供应商](/img/1panel/ai/openclaw_agent_provider.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4 创建 OpenClaw 智能体——为智能体选择模型供应商</div>

选择模型供应商后，系统会自动加载已维护的模型账号。若已配置多个模型，也可以在这里选择具体模型；如有需要，也可勾选手动输入模型。

![选择模型账号或模型](/img/1panel/ai/openclaw_agent_model.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5 创建 OpenClaw 智能体——为智能体选择模型账号或模型</div>

## 3. 开始安装并确认完成

参数确认无误后，点击 **确认** 开始安装。

当页面显示安装完成后，即表示 OpenClaw 已成功部署。

![OpenClaw 安装完成](/img/1panel/ai/openclaw_install_done.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6 开始安装并确认完成安装完成</div>

## 4. 访问 OpenClaw WebUI

安装完成后，返回 **智能体** 列表页面，找到 OpenClaw，点击 **WebUI** 即可直接跳转访问。

![OpenClaw WebUI 入口](/img/1panel/ai/openclaw_webui_entry.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7 访问 OpenClaw WebUI——OpenClaw WebUI 入口</div>

## 5. 验证部署结果

进入 OpenClaw 页面后，可直接发送一条测试消息。

如果助手能够正常回复，则说明 OpenClaw 已部署成功。

![OpenClaw 对话验证](/img/1panel/ai/openclaw_verify_chat.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8 验证部署结果对话验证</div>

## 6. 后续配置说明

完成基础部署后，你还可以继续在 1Panel 中为 OpenClaw 配置飞书等聊天渠道，或根据需要切换模型账号与模型参数。