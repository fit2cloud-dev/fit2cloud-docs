---
title: LDAP HA
description: 介绍 JumpServer 认证设置中 AD/LDAP HA 的配置项。
---

## 1 功能简介

AD/LDAP HA 用于配置高可用目录认证。路径：单击右上角齿轮进入 **系统设置**，选择 **认证设置**，页签 **AD/LDAP HA**。

字段与 AD/LDAP 类似，包括 LDAP 认证开关、服务端地址、绑定 DN、密码、StartTLS、用户 OU、用户过滤器、映射属性、严格模式、超时与分页、总是更新用户信息。同样提供测试连接、测试登录、用户导入和同步设置。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_auth_ldaph_01.png" alt="图 1  AD/LDAP HA" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  AD/LDAP HA</div>

## 2 前提条件

- 已使用系统管理员账号登录 JumpServer。
- 已有可用的 HA 目录服务地址。
