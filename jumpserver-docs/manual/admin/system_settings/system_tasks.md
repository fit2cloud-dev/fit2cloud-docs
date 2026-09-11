---
title: 系统任务
description: 介绍 JumpServer 系统设置中任务列表与定期清理。
---

## 1 功能简介

系统任务用于查看自动化任务，并配置审计数据的定期清理。路径：单击右上角齿轮进入 **系统设置**，选择 **系统任务**。

页签包括 **任务列表** 和 **定期清理**。任务列表列字段包括名称、成功/总共、状态、发布日期、周期执行、下次执行时间及启用。可单击 **任务监控**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_st_tasks_01.png" alt="图 1  任务列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  任务列表</div>

:::warning[不要随意立即执行]
请勿在未确认影响前执行或停用系统任务。
:::

## 2 前提条件

- 已使用系统管理员账号登录 JumpServer。

## 3 定期清理

选择 **定期清理**。日志记录包括登录日志、任务日志、操作日志、用户改密日志、上传下载记录、会话日志、活动记录的保留天数。数据库包括作业执行历史、云同步记录、账号改密推送记录的保留天数。单击 **提交**。写入外部存储的录像与日志不受此页控制。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_st_tasks_02.png" alt="图 2  定期清理" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  定期清理</div>
