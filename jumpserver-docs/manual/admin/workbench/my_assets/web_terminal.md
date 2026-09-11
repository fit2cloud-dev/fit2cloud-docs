---
title: Web 终端
description: 介绍 JumpServer Web 终端（Luna）的入口、组织切换和常用快捷键。
---

## 1 功能简介

Web 终端（Luna）用于在浏览器中连接已授权资产。工作台侧栏无独立「Web 终端」菜单。可单击顶栏 Web 终端图标，或访问 Luna 地址进入。

左侧为组织切换、我的资产、最近连接、我的收藏和脚本库。未连接时，中间显示常用操作：重置连接配置、纯净模式、全屏模式、切换会话。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_wb_luna_01.png" alt="图 1  Web 终端" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  Web 终端</div>

## 2 前提条件

- 已使用工作台账号登录 JumpServer。
- 当前用户已被授权资产。无授权时左侧资产树为空，无法发起连接。

## 3 组织与快捷键

首次进入可能出现 **切换组织** 引导。不同组织对应不同的资产和权限。可在左上角切换组织。

- **纯净模式**：CTRL + SHIFT + P
- **全屏模式**：CTRL + SHIFT + F
- **切换会话**：ALT + SHIFT + 左/右，或 CTRL + 1-9

右击资产后选择连接。连接方式因资产类型而异（如 Web CLI、Web GUI、客户端），以 Luna 弹出的选项为准。
