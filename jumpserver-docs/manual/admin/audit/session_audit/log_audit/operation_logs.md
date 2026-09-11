---
title: 操作日志
description: 介绍 JumpServer 审计台中操作日志的查看、变更详情、列设置和导出。
---

## 1 功能简介

操作日志用于查看 JumpServer 平台上的管理操作，包括用户、资源、动作和资源类型等。路径：登录后将控制台切换到 **审计台**，选择 **日志审计 > 操作日志**。

列表列字段包括用户、资源、远端地址、日期、动作、资源类型及操作。右上角提供搜索、日期筛选、列设置、导出和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_oplog_01.png" alt="图 1  操作日志" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  操作日志</div>

## 2 前提条件

- 已使用具备审计权限的账号登录 JumpServer（如系统管理员或审计员）。

## 3 查看变更

单击行内操作中的查看，打开变更对照。字段包括变更字段、变更前、变更后。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_oplog_02.png" alt="图 2  操作日志变更" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  操作日志变更</div>

## 4 列设置与导出

单击右上角列设置，打开 **列表偏好**，勾选要显示的列后单击 **确认**。可 **恢复默认**。除默认列外，还可勾选 ID、组织 ID、组织名称等。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_oplog_03.png" alt="图 3  列表偏好" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  列表偏好</div>

单击导出。文件类型为 **CSV** 或 **Excel**。导出范围为 **导出所有**、**仅导出选择项** 或 **仅导出搜索结果**。单击 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_oplog_04.png" alt="图 4  导出操作日志" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  导出操作日志</div>
