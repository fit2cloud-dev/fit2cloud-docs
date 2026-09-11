---
title: 安全设置
description: 介绍 JumpServer 系统设置中认证安全、登录限制、密码安全和会话安全。
---

## 1 功能简介

安全设置用于配置登录、MFA、密码策略和会话安全。路径：单击右上角齿轮进入 **系统设置**，选择 **安全设置**。

页签包括 **认证安全**、**登录限制**、**密码安全**、**会话安全**。修改后单击 **提交**。

## 2 前提条件

- 已使用系统管理员账号登录 JumpServer。

## 3 认证安全

- **启用登录验证码**、**启用登录附加码**。
- **不活跃用户自动禁用 (天)**。
- **异地登录通知**。
- **全局启用 MFA 认证**：未启用、所有用户或仅管理员。
- **允许的 MFA 方式**：虚拟 MFA、短信、邮箱、人脸识别、Radius、Passkey、自定义。
- **邮件验证 MFA**、**第三方认证开启 MFA**。
- **MFA 校验有效期**、**OTP 扫描后的名称**、**OTP 延迟有效次数**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_st_sec_01.png" alt="图 1  认证安全" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  认证安全</div>

人脸识别作为 MFA 方式的说明见 [人脸识别](../others/MFA_Facelive.md)。

## 4 登录限制

包括限制用户/IP 登录失败次数、禁止登录间隔、IP 登录白名单与黑名单、已封禁的 IP，以及仅一台设备登录、仅已存在用户登录、仅从用户来源登录。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_st_sec_02.png" alt="图 2  登录限制" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  登录限制</div>

## 5 密码安全

包括管理员/用户密码过期时间、不能设置近几次密码、用户过期 token 保留天数、弱密码列表、密码最小长度，以及是否必须包含大写字母、小写字母、数字、特殊字符。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_st_sec_03.png" alt="图 3  密码安全" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  密码安全</div>

## 6 会话安全

包括会话分享、会话在浏览器关闭时过期、允许用户查看资产在线会话信息、连接最大空闲时间、会话连接最大时间，以及水印（字体颜色、大小、高度、宽度、旋转等）。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_st_sec_04.png" alt="图 4  会话安全" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  会话安全</div>
