---
title: 功能设置
description: 介绍 JumpServer 系统设置中公告、工单、作业中心等功能开关。
---

## 1 功能简介

功能设置用于开关公告、工单、作业中心、账号存储、SSH 证书签发和虚拟应用等能力。路径：单击右上角齿轮进入 **系统设置**，选择 **功能设置**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_st_feat_01.png" alt="图 1  功能设置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  功能设置</div>

## 2 前提条件

- 已使用系统管理员账号登录 JumpServer。

## 3 页签说明

- **公告**：主题、内容、开始日期、结束日期、更多信息 URL。
- **工单**：工单相关开关。
- **作业中心**：启用作业中心、Ansible docker 隔离、作业中心命令黑名单（如 reboot、shutdown 等）。工作台作业中心依赖此开关。
- **账号存储**：账号保险箱相关能力。
- **SSH 证书签发**：SSH 证书相关能力。
- **虚拟应用**：虚拟应用功能开关。虚拟应用包管理见 [虚拟应用](./virtual_apps.md)。

单击 **提交** 保存。
