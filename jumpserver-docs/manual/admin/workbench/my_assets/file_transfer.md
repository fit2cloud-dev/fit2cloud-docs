---
title: 文件传输
description: 介绍 JumpServer 工作台中向已授权 Linux 资产批量上传文件。
---

## 1 功能简介

文件传输用于将本地文件批量上传到已授权的 Linux 资产。路径：登录后将控制台切换到 **工作台**，选择 **我的资产 > 文件传输**。

页面提示分三步：选择一个资产或节点；选择运行账户，填写上传路径；单击 **传输** 开始文件传输。默认上传路径为 `/tmp/`。单文件需小于 200 MB。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_wb_ftp_01.png" alt="图 1  文件传输" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  文件传输</div>

:::note[默认上传到 /tmp]
当前仅支持向 Linux 资产批量传输。默认目录为 `/tmp`。如需浏览或调整资产上的目录，请使用 [文件管理](./file_explorer.md)。
:::

## 2 前提条件

- 已使用工作台账号登录 JumpServer。
- 当前用户已被授权可上传文件的 Linux 资产。

## 3 上传文件

1. 在左侧单击 **点击添加**，选择资产或节点。
2. 输入 **账号**。**账号策略** 可选 **忽略当前资产** 等，以界面为准。
3. 输入上传路径，默认 `/tmp/`。
4. 将文件拖到此处，或单击上传区域选择本地文件。
5. 单击 **传输**。结果在下方 **输出** 中查看。
