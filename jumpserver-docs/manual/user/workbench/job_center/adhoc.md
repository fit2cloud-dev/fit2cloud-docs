---
title: 快捷命令
description: 介绍 JumpServer 工作台中对已授权资产批量执行快捷命令。
---

## 1 功能简介

快捷命令用于对已授权资产批量执行命令。路径：登录后将控制台切换到 **工作台**，选择 **作业中心 > 快捷命令**。

左侧选择资产。右侧可配置运行用户、账号策略、模块，输入命令后执行，下方为输出。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_wb_adhoc_01.png" alt="图 1  快捷命令" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  快捷命令</div>

:::note[作业中心需开启]
作业中心需由系统管理员在 [功能设置](../../system_settings/feature_settings.md) 中开启。
:::

## 2 前提条件

- 已使用工作台账号登录 JumpServer。
- 当前用户已被授权可执行命令的资产。
- 作业中心功能已开启。

## 3 执行命令

1. 在左侧单击 **点击添加**，选择资产。
2. 输入 **运行用户**。
3. 选择 **账号策略**（如 **忽略当前资产**）。
4. 选择 **模块**（如 Shell）。
5. 在命令区输入命令，单击运行。结果在 **输出** 中查看。

:::warning[确认后再执行]
命令将对所选资产立即执行，请确认命令和资产范围后再运行。
:::
