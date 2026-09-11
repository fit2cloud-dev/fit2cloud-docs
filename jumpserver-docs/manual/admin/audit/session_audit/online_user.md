---
title: 在线用户
description: 介绍 JumpServer 审计台中在线用户设备的查看与下线。
---

## 1 功能简介

在线用户用于查看当前以 Web 方式登录 JumpServer 的用户设备，并可下线所选会话。路径：登录后将控制台切换到 **审计台**，选择 **会话审计 > 在线用户**。页面标题为 **在线用户设备**。

列表列字段包括用户、认证方式、登录城市、登录日期、激活中及操作。右上角提供搜索、列设置和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_online_01.png" alt="图 1  在线用户设备" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  在线用户设备</div>

:::note[仅记录 Web 登录]
当前只记录以 Web 方式登录的用户。无法下线当前用户自己的在线会话。
:::

## 2 前提条件

- 已使用具备审计权限的账号登录 JumpServer（如系统管理员或审计员）。

## 3 下线会话

勾选记录后，单击 **更多操作 > 下线所选**。也可单击行内操作中的下线按钮。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_online_02.png" alt="图 2  下线所选" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  下线所选</div>

:::warning[确认后再下线]
**下线所选** 会断开所选用户的 Web 登录会话，请确认后再执行。
:::

## 4 列设置

单击右上角列设置，打开 **列表偏好**，勾选要显示的列后单击 **确认**。可 **恢复默认**。除默认列外，还可勾选 ID、失效日期、用户代理等。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_online_03.png" alt="图 3  列表偏好" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  列表偏好</div>
