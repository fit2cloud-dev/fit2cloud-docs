---
title: 作业列表
description: 介绍 JumpServer 审计台中作业列表的查看、列设置和导出。
---

## 1 功能简介

作业列表用于审计用户在工作台作业中心创建的作业。路径：登录后将控制台切换到 **审计台**，选择 **作业审计 > 作业列表**。

列表列字段包括名称、内容、类型、周期执行、间隔、创建者、定期执行及启用/禁用。右上角提供搜索、列设置、导出和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_joblist_01.png" alt="图 1  作业列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  作业列表</div>

:::note[先有作业才有记录]
当前环境作业列表为空。作业需在工作台 **作业中心** 中创建，详见 [作业管理](../../../workbench/job_center/jobs_management.md)。
:::

## 2 前提条件

- 已使用具备审计权限的账号登录 JumpServer（如系统管理员或审计员）。
- 须已在工作台作业中心创建过作业。作业中心需在 [功能设置](../../../system_settings/feature_settings.md) 中开启。

## 3 列设置与导出

单击右上角列设置，打开 **列表偏好**，勾选要显示的列后单击 **确认**。可 **恢复默认**。除默认列外，还可勾选 ID、最后运行日期、成功/总共等。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_joblist_02.png" alt="图 2  列表偏好" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  列表偏好</div>

单击导出。文件类型为 **CSV** 或 **Excel**。导出范围为 **导出所有**、**仅导出选择项** 或 **仅导出搜索结果**。单击 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_joblist_03.png" alt="图 3  导出作业列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  导出作业列表</div>
