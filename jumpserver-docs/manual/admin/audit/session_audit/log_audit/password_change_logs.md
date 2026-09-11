---
title: 改密日志
description: 介绍 JumpServer 审计台中用户密码修改日志的查看、列设置和导出。
---

## 1 功能简介

改密日志用于查看 JumpServer 平台用户的密码修改记录。路径：登录后将控制台切换到 **审计台**，选择 **日志审计 > 改密日志**。页面标题为 **用户密码修改日志**。

列表列字段包括用户、修改者、远端地址及日期。右上角提供搜索、日期筛选、列设置、导出和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_pwdlog_01.png" alt="图 1  用户密码修改日志" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  用户密码修改日志</div>

## 2 前提条件

- 已使用具备审计权限的账号登录 JumpServer（如系统管理员或审计员）。
- 须已有用户修改过 JumpServer 登录密码（用户本人或管理员代改）。

## 3 列设置与导出

单击右上角列设置，打开 **列表偏好**，勾选要显示的列后单击 **确认**。可 **恢复默认**。可选列包括 ID、用户、修改者、远端地址、日期。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_pwdlog_02.png" alt="图 2  列表偏好" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  列表偏好</div>

单击导出。文件类型为 **CSV** 或 **Excel**。导出范围为 **导出所有**、**仅导出选择项** 或 **仅导出搜索结果**。单击 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_pwdlog_03.png" alt="图 3  导出改密日志" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  导出改密日志</div>
