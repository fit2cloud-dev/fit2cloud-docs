---
title: OIDC
description: 介绍 JumpServer 认证设置中 OIDC 的配置项。
---

## 1 功能简介

OIDC 用于对接 OpenID Connect。路径：单击右上角齿轮进入 **系统设置**，选择 **认证设置**，页签 **OIDC**。

字段包括 **OIDC** 开关、**JumpServer 地址**、**客户端 ID**、**客户端密钥**、**客户端认证方式**、**使用 keycloak**、**服务端地址**、**域**、**总是更新用户信息**、**忽略 SSL 证书验证**、**共享会话**、**映射属性**、**组织**。单击 **提交** 保存。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_auth_oidc_01.png" alt="图 1  OIDC" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  OIDC</div>

## 2 前提条件

- 已使用系统管理员账号登录 JumpServer。
- 已在身份提供方创建客户端。
