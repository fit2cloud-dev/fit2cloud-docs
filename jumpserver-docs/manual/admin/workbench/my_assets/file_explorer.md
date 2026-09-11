---
title: 文件管理
description: 介绍 JumpServer 工作台文件管理入口，以及 Web 终端中的传输中心。
---

## 1 功能简介

文件管理用于在已授权资产上浏览和传输文件。路径：登录后将控制台切换到 **工作台**，选择 **我的资产 > 文件管理**，将打开独立的文件管理器（依赖 Koko 组件）。

在 [Web 终端](./web_terminal.md) 中，也可单击右下角 **传输中心**，查看传输队列（文件、传输方向、进度、速度 / 剩余、状态、操作）。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_wb_fm_01.png" alt="图 1  传输中心" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  传输中心</div>

:::note[组件需可用]
独立文件管理器依赖 Koko。若打开后无法访问，请检查组件状态，见 [组件设置](../../system_settings/components.md)。向多台 Linux 资产批量上传见 [文件传输](./file_transfer.md)。
:::

## 2 前提条件

- 已使用工作台账号登录 JumpServer。
- 当前用户已被授权可上传或下载文件的资产。
- Koko 组件运行正常。

## 3 使用说明

默认 SFTP 目录由资产所属平台决定，常见为 `/tmp`。修改目录需在 [平台列表](../../system_settings/platforms.md) 中调整对应平台，而不是改系统默认平台。
