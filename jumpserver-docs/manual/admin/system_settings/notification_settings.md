---
title: 通知设置
description: 介绍 JumpServer 系统设置中邮箱、消息模板、短信和消息订阅。
---

## 1 功能简介

通知设置用于配置系统通知通道。路径：单击右上角齿轮进入 **系统设置**，选择 **通知设置**。

页签包括 **邮箱**、**消息模板**、**短信**、**消息订阅**。

邮箱页可配置服务（SMTP 或 Microsoft Exchange 服务器）、主机、端口、账号、密码、发件人、SSL/TLS、证书校验、邮件模版和测试收件人。先单击 **提交** 保存，再单击 **测试连接**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_st_notify_01.png" alt="图 1  通知设置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  通知设置</div>

## 2 前提条件

- 已使用系统管理员账号登录 JumpServer。

## 3 其他页签

- **消息模板**：配置通知正文模板。
- **短信**：配置短信通道。
- **消息订阅**：按消息类型勾选邮箱、企业微信、钉钉、站内信、飞书、Lark、Slack 等接收方式。
