---
title: 账号改密
description: 介绍 JumpServer PAM 中账号改密任务的创建、执行以及概览、执行历史与改密状态。
---

## 1 功能简介

账号改密用于按策略修改资产上的账号密文，可立即执行或按周期执行。路径：登录后将控制台切换到 **PAM**，选择 **安全设置 > 账号改密**。

页签包括 **概览**、**账号改密任务**、**执行历史**、**执行记录** 和 **改密状态**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_secret_01.png" alt="图 1  账号改密任务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  账号改密任务</div>

**账号改密任务** 列表列字段包括名称、账号、资产、节点、执行周期、执行数、激活及操作。行内绿色按钮为立即执行。右上角提供搜索、列设置和刷新。

## 2 前提条件

- 已使用具备 PAM 权限的账号登录 JumpServer（如系统管理员）。
- 目标资产或节点须已存在。资产维护请参见 [资产列表](../../console/assets/assets_list.md)。
- 目标账号须勾选 **可改密**。账号字段请参见 [账号列表](../../console/account_management/account_list.md)。

## 3 概览

选择 **概览**。可按 **今天**、**近7天**、**近30天** 查看统计。

- **任务汇总**： 总共、定期、资产管理。
- **执行汇总**： 总共、成功、失败。
- **运行中**： 总共、资产管理、账号。

下方为 **账号改密成功/失败** 趋势图，以及 **改密失败账号** 列表。失败账号列表列字段包括资产、账号、结束日期、成功、错误及操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_secret_02.png" alt="图 2  账号改密概览" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  账号改密概览</div>

## 4 创建改密任务

1. 在 **账号改密任务** 单击 **创建**。
2. 在右侧抽屉 **创建账号改密** 中填写信息。
3. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_secret_03.png" alt="图 3  创建账号改密" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  创建账号改密</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建账号改密字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。任务名称。 |
| 资产 | 账号 | 必填。输入后按下 Enter 继续输入。页面提示：对于同一资产中的账号，如果存在切换自关系，则不应放在同一个任务中执行密码更改，而是应分成两个任务分别执行。 |
| 资产 | 资产 | 要改密的资产。 |
| 资产 | 节点 | 要改密的节点。可与资产同时选择。 |
| 密码策略 | 密文生成策略 | **指定** 或 **随机生成**。 |
| 密码策略 | 密文类型 | **密码** 或 **SSH 密钥**。 |
| 密码策略 | 密码 | 策略为指定、类型为密码时输入。 |
| 参数 | 参数 | 单击 **设置**。页面提示：参数设置，目前只对 AIX LINUX UNIX 类型的资产有效。 |
| 定期 | 周期执行 | 勾选后按周期重复执行。默认未勾选。 |
| 定期 | 间隔 | 勾选周期执行后出现，默认 24 小时。 |
| 定期 | 定时任务 | 勾选周期执行后出现。页面提示：如果同时设置了 interval 和 crontab，则优先考虑 crontab。 |
| 其它设置 | 更改后检查连接 | 默认勾选。改密后检查账号连接。 |
| 其它设置 | 激活 | 默认勾选。任务可用。 |
| 其它设置 | 收件人 | 选择用户。页面提示：当前只支持邮件发送。 |
| 其它设置 | 备注 | 选填。 |

:::note[切换自账号分开改密]
同一资产上存在 **切换自** 关系的账号，不要放在同一个改密任务中，须拆成两个任务分别执行。
:::

:::note[参数仅部分系统有效]
**参数** 目前只对 AIX、LINUX、UNIX 类型的资产有效。
:::

## 5 执行与维护

行内绿色按钮立即执行。**更多** 包括 **编辑**、**删除**、**副本**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_secret_04.png" alt="图 4  行内更多" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  行内更多</div>

单击任务 **名称** 打开详情。页签包括 **基本设置**、**资产/节点**、**活动**。右上角可 **编辑** 或 **删除**。右侧 **快速更新** 提供 **手动执行**。基本信息包括 ID、名称、账号、资产数、节点数、密文生成策略、定时任务、间隔、创建日期、更新日期、备注、激活。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_secret_05.png" alt="图 5  账号改密详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  账号改密详情</div>

## 6 执行历史

选择 **执行历史**。列表列字段包括任务、触发模式、开始日期、结束日期、自动化快照、状态、花费时间及操作。触发模式示例为手动触发。操作列可查看本次执行的日志。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_secret_06.png" alt="图 6  执行历史" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  执行历史</div>

## 7 执行记录

选择 **执行记录**。列表列字段包括资产、用户名、结束日期、成功、测试、错误及操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_secret_07.png" alt="图 7  执行记录" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  执行记录</div>

## 8 改密状态

选择 **改密状态**。列表列字段包括执行 ID、资产、用户名、状态、剩余时间（秒）及操作。用于查看正在进行的改密。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_secret_08.png" alt="图 8  改密状态" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  改密状态</div>
