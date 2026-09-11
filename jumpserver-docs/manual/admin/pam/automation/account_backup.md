---
title: 账号备份
description: 介绍 JumpServer PAM 中账号备份任务的创建、维护以及执行历史查看。
---

## 1 功能简介

账号备份用于按平台类型备份 JumpServer 所管理账号的密文，可通过邮箱发送或写入 SFTP 服务器。路径：登录后将控制台切换到 **PAM**，选择 **自动化 > 账号备份**。

页面标题为 **账号备份列表**。页签包括 **账号备份任务** 和 **执行历史**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_backup_01.png" alt="图 1  账号备份任务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  账号备份任务</div>

**账号备份任务** 列表列字段包括名称、备份类型、执行周期、执行数、激活及操作。行内绿色按钮为立即执行。右上角提供搜索、列设置和刷新。

## 2 前提条件

- 已使用具备 PAM 权限的账号登录 JumpServer（如系统管理员）。
- 备份类型为邮箱时，须能选择接收人。
- 备份类型为 SFTP 时，须已配置接收服务器。SFTP 存储说明请参见 [存储设置](../../system_settings/storage.md)。

## 3 创建备份任务

1. 在 **账号备份任务** 单击 **创建**。
2. 在右侧抽屉 **创建账号备份任务** 中填写信息。
3. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_backup_02.png" alt="图 2  创建账号备份任务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建账号备份任务</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建账号备份任务字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。任务名称。 |
| 基本设置 | 类型 | 级联多选。选择要备份账号所属的平台类型，如主机、网络设备、数据库、Web、云服务、自定义类型。 |
| 备份 | 备份类型 | **邮箱** 或 **SFTP**。默认邮箱。 |
| 备份 | 密钥是否拆分成前后两部分 | 默认勾选。 |
| 备份 | 接收人 a / 接收人 b | 备份类型为邮箱时选择用户。页面提示：如果同时设置了收件人 A 和 B，账号的密文将被拆分为两部分；如果只设置了一个收件人，密钥则不会被拆分。 |
| 备份 | 接收服务器 a / 接收服务器 b | 备份类型为 SFTP 时选择服务器。提示同上。 |
| 备份 | 文件加密密码 | 备份类型为 SFTP 时出现。 |
| 定期 | 周期执行 | 勾选后按周期重复执行。默认未勾选。 |
| 定期 | 间隔 | 勾选周期执行后出现，默认 24 小时。 |
| 定期 | 定时任务 | 勾选周期执行后出现。页面提示：如果同时设置了 interval 和 crontab，则优先考虑 crontab。 |
| 其它设置 | 激活 | 默认勾选。任务可用。 |
| 其它设置 | 备注 | 选填。 |

:::note[备份类型决定接收对象]
备份类型为 **邮箱** 时选择接收人；为 **SFTP** 时选择接收服务器，并出现 **文件加密密码**。
:::

下图为备份类型 **SFTP** 时的任务表单（更新抽屉）。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_backup_03.png" alt="图 3  SFTP 备份任务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  SFTP 备份任务</div>

## 4 执行与维护

行内绿色按钮立即执行。**更多** 包括 **编辑**、**删除**、**副本**。编辑抽屉标题为 **更新账号备份任务**，可 **提交** 或 **还原**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_backup_04.png" alt="图 4  行内更多" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  行内更多</div>

单击任务 **名称** 打开详情。页签包括 **基本设置**、**活动**。右上角可 **编辑** 或 **删除**。右侧 **快速更新** 提供 **手动执行**。基本信息包括 ID、名称、备份类型、定时任务、间隔、接收人 A、接收人 B、接收服务器 A、接收服务器 B、创建日期、更新日期、激活、备注。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_backup_05.png" alt="图 5  账号备份详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  账号备份详情</div>

## 5 执行历史

选择 **执行历史**。列表列字段包括任务、触发模式、开始日期、结束日期、自动化快照、状态、花费时间及操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_backup_06.png" alt="图 6  执行历史" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  执行历史</div>

:::note[先有执行才有历史]
**执行历史** 来自已执行的备份任务。当前环境该页为空时，须先创建任务并执行。
:::
