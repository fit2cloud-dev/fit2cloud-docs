---
title: LDAP
description: 介绍 JumpServer 认证设置中 AD/LDAP 的配置项。
---

## 1 功能简介

AD/LDAP 用于对接目录服务完成用户认证与同步。路径：单击右上角齿轮进入 **系统设置**，选择 **认证设置**，页签 **AD/LDAP**。

可勾选启用 **LDAP**。主要字段：

- **服务端地址**
- **绑定 DN**、**密码**
- **StartTLS**
- **用户 OU**、**用户过滤器**
- **映射属性**
- **严格模式**
- **连接超时时间 (秒)**、**搜索分页数量 (条)**、**User DN 缓存超时时间 (秒)**
- **总是更新用户信息**

页面还提供 **测试连接**、**测试登录**、**用户导入**、**同步设置**。单击 **提交** 保存。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_auth_ldap_01.png" alt="图 1  AD/LDAP" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  AD/LDAP</div>

:::note[TLS 证书]
若需配置 LDAP TLS 证书，将证书文件放到 JumpServer 服务器证书目录后重启服务，以部署说明为准。
:::

## 2 前提条件

- 已使用系统管理员账号登录 JumpServer。
- 已准备可查询的目录服务账号（绑定 DN）。
