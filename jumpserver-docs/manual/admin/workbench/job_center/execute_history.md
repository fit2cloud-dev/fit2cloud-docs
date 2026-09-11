---
title: 执行历史
description: 介绍 JumpServer 工作台中作业与快捷命令的执行记录。
---

## 1 功能简介

执行历史用于查看作业中心任务的执行记录。路径：登录后将控制台切换到 **工作台**，选择 **作业中心 > 执行历史**。

列表列字段包括命令、任务类型、是否完成、是否成功、花费时间、创建日期及操作。右上角提供搜索、列设置和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_wb_hist_01.png" alt="图 1  执行历史" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  执行历史</div>

:::note[先有执行才有记录]
当前环境执行历史为空。有记录后，行内操作可查看输出。审计侧记录见 [作业日志](../../audit/session_audit/job_audit/job_logs.md)。
:::

## 2 前提条件

- 已使用工作台账号登录 JumpServer。
- 须已执行过快捷命令或作业。
