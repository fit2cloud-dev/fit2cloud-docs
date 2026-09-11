---
title: 作业日志
description: 介绍 JumpServer 审计台中作业执行日志的查看、列设置和导出。
---

## 1 功能简介

作业日志用于查看工作台作业中心的任务执行记录。路径：登录后将控制台切换到 **审计台**，选择 **作业审计 > 作业日志**。

列表列字段包括创建者、命令、任务类型、是否完成、是否成功、花费时间、开始日期及操作。右上角提供搜索、日期筛选、列设置、导出和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_joblog_01.png" alt="图 1  作业日志" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  作业日志</div>

:::note[先有执行才有记录]
当前环境作业日志为空。有记录后，行内操作可查看执行输出。作业执行见 [执行历史](../../../workbench/job_center/execute_history.md)。
:::

## 2 前提条件

- 已使用具备审计权限的账号登录 JumpServer（如系统管理员或审计员）。
- 须已在工作台作业中心执行过快捷命令或作业。

## 3 列设置与导出

单击右上角列设置，打开 **列表偏好**，勾选要显示的列后单击 **确认**。可 **恢复默认**。除默认列外，还可勾选 ID、结束日期等。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_joblog_02.png" alt="图 2  列表偏好" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  列表偏好</div>

单击导出。文件类型为 **CSV** 或 **Excel**。导出范围为 **导出所有**、**仅导出选择项** 或 **仅导出搜索结果**。单击 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_joblog_03.png" alt="图 3  导出作业日志" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  导出作业日志</div>
