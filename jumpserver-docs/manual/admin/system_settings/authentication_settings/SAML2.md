---
title: SAML2
description: 介绍 JumpServer 认证设置中 SAML2 的配置项。
---

## 1 功能简介

SAML2 用于对接 SAML 2.0 身份提供方。路径：单击右上角齿轮进入 **系统设置**，选择 **认证设置**，页签 **SAML2**。

字段包括 **SAML2** 开关、**SP 密钥**、**SP 证书**、**IDP metadata 地址**、**IDP metadata XML**、**高级设置**、**映射属性**、**组织**、**总是更新用户信息**、**同步注销**。单击 **提交** 保存。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_auth_saml_01.png" alt="图 1  SAML2" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  SAML2</div>

## 2 前提条件

- 已使用系统管理员账号登录 JumpServer。
- 已从身份提供方获取 metadata。
