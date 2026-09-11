---
title: 会话记录
description: 介绍 JumpServer 审计台中在线会话与历史会话的查看、终止、列设置和导出。
---

## 1 功能简介

会话记录用于查看用户连接资产的在线会话和历史会话。路径：登录后将控制台切换到 **审计台**，选择 **会话审计 > 会话记录**。

页签包括 **在线会话** 和 **历史会话**。默认列表列字段包括序号、用户、目标、账号、协议、开始日期及操作。右上角提供搜索、日期筛选、列设置和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_session_01.png" alt="图 1  在线会话" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  在线会话</div>

:::note[先有连接才有记录]
当前环境在线会话与历史会话均为空。有会话后可单击 **序号** 打开详情，行内操作以界面为准。
:::

## 2 前提条件

- 已使用具备审计权限的账号登录 JumpServer（如系统管理员或审计员）。
- 查看历史会话前，须已有用户连接过资产。

## 3 在线会话

选择 **在线会话**，查看当前正在连接资产的会话。勾选记录后，单击 **更多操作 > 批量终止会话** 可断开所选会话。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_session_02.png" alt="图 2  批量终止会话" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  批量终止会话</div>

:::warning[确认后再终止]
**批量终止会话** 会断开所选在线会话，请确认后再执行。
:::

## 4 历史会话

选择 **历史会话**。列表列字段与在线会话相同。可用日期范围缩小查询。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_session_03.png" alt="图 3  历史会话" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  历史会话</div>

单击右上角列设置，打开 **列表偏好**，勾选要显示的列后单击 **确认**。可 **恢复默认**。除默认列外，还可勾选远端地址、时长、回放、登录来源等。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_session_04.png" alt="图 4  列表偏好" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  列表偏好</div>

单击导出。文件类型为 **CSV** 或 **Excel**。导出范围为 **导出所有**、**仅导出选择项** 或 **仅导出搜索结果**。单击 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_session_05.png" alt="图 5  导出历史会话" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  导出历史会话</div>
