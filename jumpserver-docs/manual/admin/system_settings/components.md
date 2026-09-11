---
title: 组件设置
description: 介绍 JumpServer 系统设置中 KoKo、Razor、Magnus 等组件参数。
---

## 1 功能简介

组件设置用于配置终端组件的注册与连接方式。路径：单击右上角齿轮进入 **系统设置**，选择 **组件设置**。

页签包括 **基本设置**、**Web终端**、**组件列表**、**组件监控**、**服务端点**、**端点规则**。

基本设置包括：

- **组件注册**：自动（启动后前 5 分钟启用，然后禁用）、启用或禁用。
- **客户端连接**：允许通过 SSH 客户端连接 KoKo；启用后 Luna 会显示 SSH 客户端启动方法。
- **密码** / **SSH公钥**：是否允许用密码或公钥登录 KoKo。若已启用 AD/LDAP 等第三方认证，应禁用公钥选项，避免用户从目录删除后仍能登录。
- **资产列表排序**、**资产列表每页数量**。
- **Razor** / **Magnus**：启用后 Luna 会显示 RDP 文件或数据库客户端启动方法。地址和端口可在服务端点中单独配置。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_st_comp_01.png" alt="图 1  组件设置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  组件设置</div>

## 2 前提条件

- 已使用系统管理员账号登录 JumpServer。
