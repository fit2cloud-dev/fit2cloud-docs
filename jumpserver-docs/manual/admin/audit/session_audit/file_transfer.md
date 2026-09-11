---
title: 文件传输
description: 介绍 JumpServer 审计台中文件传输记录的查看、列设置和导出。
---

## 1 功能简介

文件传输用于查看用户向资产上传或从资产下载文件的记录。路径：登录后将控制台切换到 **审计台**，选择 **会话审计 > 文件传输**。

列表列字段包括用户、资产、账号、操作、文件名、开始日期、成功及行内操作。右上角提供搜索、日期筛选、列设置、导出和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_ftp_01.png" alt="图 1  文件传输" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  文件传输</div>

:::note[先有传输才有记录]
当前环境文件传输为空。列设置中可勾选 **会话** 等字段。有记录后的操作以界面为准，会话说明见 [会话记录](./session_record.md)。
:::

## 2 前提条件

- 已使用具备审计权限的账号登录 JumpServer（如系统管理员或审计员）。
- 须已有通过 JumpServer 向资产上传或下载文件的操作。

## 3 列设置与导出

单击右上角列设置，打开 **列表偏好**，勾选要显示的列后单击 **确认**。可 **恢复默认**。除默认列外，还可勾选 ID、远端地址、组织 ID、可下载、会话等。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_ftp_02.png" alt="图 2  列表偏好" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  列表偏好</div>

单击导出。文件类型为 **CSV** 或 **Excel**。导出范围为 **导出所有**、**仅导出选择项** 或 **仅导出搜索结果**。单击 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_ftp_03.png" alt="图 3  导出文件传输" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  导出文件传输</div>
