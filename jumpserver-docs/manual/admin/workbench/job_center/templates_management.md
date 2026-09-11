---
title: 模板管理
description: 介绍 JumpServer 工作台中脚本模板与 Playbook 模板的查看和创建。
---

## 1 功能简介

模板管理（界面标题为 **模版管理**）用于维护快捷命令和作业可复用的脚本或 Playbook。路径：登录后将控制台切换到 **工作台**，选择 **作业中心 > 模版管理**。

页签包括 **脚本管理** 和 **Playbook管理**。脚本列表列字段包括名称、模块、内容、备注、范围、创建日期、创建者及操作。范围可为 **公有** 或 **私有**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_wb_tpl_01.png" alt="图 1  模版管理" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  模版管理</div>

## 2 前提条件

- 已使用工作台账号登录 JumpServer。
- 作业中心需由系统管理员在 [功能设置](../../system_settings/feature_settings.md) 中开启。

## 3 创建脚本模板

选择 **脚本管理**，单击 **创建**。抽屉标题为 **创建模版管理**。

- **名称**：模板名称。
- **范围**：公有或私有。私有仅创建者可见。
- **模块**：如 Shell。
- **内容**：命令正文。
- **变量**：可单击 **新增**。
- **备注**：可选说明。

单击 **提交** 或 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_wb_tpl_02.png" alt="图 2  创建脚本模板" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建脚本模板</div>
