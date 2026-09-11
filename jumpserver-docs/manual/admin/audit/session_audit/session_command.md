---
title: 会话命令
description: 介绍 JumpServer 审计台中会话命令的查看、列设置和导出。
---

## 1 功能简介

会话命令用于查看用户连接资产后执行的命令。路径：登录后将控制台切换到 **审计台**，选择 **会话审计 > 会话命令**。

左侧为 **命令存储** 树，当前环境为 **default(server)**。列表列字段包括命令、风险等级、用户、资产、账号、会话及日期时间。右上角提供搜索、日期筛选、列设置、导出和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_cmd_01.png" alt="图 1  会话命令" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  会话命令</div>

:::note[先有命令才有记录]
当前环境会话命令为空。有记录后，**会话** 列可跳转到对应会话，详见 [会话记录](./session_record.md)。
:::

## 2 前提条件

- 已使用具备审计权限的账号登录 JumpServer（如系统管理员或审计员）。
- 资产会话须已产生命令记录。命令存储说明请参见 [存储设置](../../system_settings/storage.md)。

## 3 列设置与导出

单击右上角列设置，打开 **列表偏好**，勾选要显示的列后单击 **确认**。可 **恢复默认**。可选列包括 ID、命令、风险等级、用户、资产、账号、会话、日期时间。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_cmd_02.png" alt="图 2  列表偏好" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  列表偏好</div>

单击导出。文件类型为 **CSV** 或 **Excel**。导出范围为 **导出所有**、**仅导出选择项** 或 **仅导出搜索结果**。单击 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_cmd_03.png" alt="图 3  导出会话命令" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  导出会话命令</div>
