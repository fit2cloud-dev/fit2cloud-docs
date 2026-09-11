---
title: 作业管理
description: 介绍 JumpServer 工作台中脚本作业与 Playbook 作业的创建。
---

## 1 功能简介

作业管理用于创建可重复执行的脚本作业或 Playbook 作业。路径：登录后将控制台切换到 **工作台**，选择 **作业中心 > 作业管理**。

页签包括 **脚本管理** 和 **Playbook管理**。列表列字段包括名称、类型、资产数、花费时间、汇总、最后运行日期及操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_wb_job_01.png" alt="图 1  作业管理" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  作业管理</div>

:::note[作业中心需开启]
作业中心需由系统管理员在 [功能设置](../../system_settings/feature_settings.md) 中开启。Playbook 作业需先在 [模板管理](./templates_management.md) 中准备模板。
:::

## 2 前提条件

- 已使用工作台账号登录 JumpServer。
- 作业中心功能已开启。
- 创建 Playbook 作业前，须已有可用的 Playbook 模板。

## 3 创建作业

选择 **脚本管理** 或 **Playbook管理**，单击 **创建**。以 Playbook 为例，抽屉标题为 **创建作业管理**。

- **名称**：作业名称。
- **资产** / **节点**：执行目标。
- **运行用户**：目标资产上的账号。
- **运行用户策略**：仅限特权账号、特权账号优先或跳过。
- **Playbook**：选择已有模板。
- **变量**：可单击 **新增**。
- **超时时间 (秒)**：值为 -1 时不指定超时。
- **周期执行**：按计划重复运行。
- **备注**：可选说明。

单击 **提交**。也可 **保存并继续添加** 或 **保存后执行**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_wb_job_02.png" alt="图 2  创建 Playbook 作业" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建 Playbook 作业</div>
