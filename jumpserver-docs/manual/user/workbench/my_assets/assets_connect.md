---
title: 连接资产
description: 介绍 JumpServer 工作台中已授权资产的查看与连接入口。
---

## 1 功能简介

连接资产用于查看当前用户已被授权的资产，并从工作台发起连接。路径：登录后将控制台切换到 **工作台**，选择 **我的资产 > 连接资产**。

左侧为 **授权树**。列表列字段包括名称、地址、平台、账号及操作。右上角提供搜索、列设置和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_wb_assets_01.png" alt="图 1  连接资产" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  连接资产</div>

:::note[先有授权才有资产]
当前账号在工作台连接资产为空。控制台中的资产须完成资产授权后，才会出现在此列表。详见 [资产授权](../../console/authorization_manage/assets_authorization.md)。
:::

## 2 前提条件

- 已使用工作台账号登录 JumpServer。
- 管理员已为当前用户完成资产授权。

## 3 连接入口

有授权资产后，可在列表行内操作中发起连接，将打开 [Web 终端](./web_terminal.md)。也可单击 **更多操作** 查看批量能力，以界面为准。
