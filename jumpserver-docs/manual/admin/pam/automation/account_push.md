---
title: 账号推送
description: 介绍 JumpServer PAM 中账号推送任务的创建、执行以及执行历史与执行记录。
---

## 1 功能简介

账号推送用于把指定账号创建或更新到资产上，并按策略设置密文。路径：登录后将控制台切换到 **PAM**，选择 **自动化 > 账号推送**。

页签包括 **账号推送任务**、**执行历史** 和 **执行记录**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_push_01.png" alt="图 1  账号推送任务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  账号推送任务</div>

**账号推送任务** 列表列字段包括名称、账号、资产数、节点数、执行周期、执行数、激活及操作。行内绿色按钮为立即执行。右上角提供搜索、列设置和刷新。

## 2 前提条件

- 已使用具备 PAM 权限的账号登录 JumpServer（如系统管理员）。
- 目标资产或节点须已存在。资产维护请参见 [资产列表](../../console/assets/assets_list.md)。

## 3 创建推送任务

1. 在 **账号推送任务** 单击 **创建**。
2. 在右侧抽屉 **创建账号推送** 中填写信息。
3. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_push_02.png" alt="图 2  创建账号推送" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建账号推送</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建账号推送字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。任务名称。 |
| 资产 | 资产 | 接收账号的资产。 |
| 资产 | 节点 | 接收账号的节点。可与资产同时选择。 |
| 账号 | 账号 | 必填。输入后按下 Enter 继续输入。若账号已存在，则使用账号密文进行推送；若账号不存在，则根据填写的密文创建账号，然后进行推送。 |
| 账号 | 密文生成策略 | **指定** 或 **随机生成**。 |
| 账号 | 密文类型 | **密码** 或 **SSH 密钥**。 |
| 账号 | 密码 | 策略为指定、类型为密码时输入。 |
| 参数 | 推送参数 | 单击 **设置**。页面提示：改密参数设置，目前仅对平台种类为主机的资产生效。 |
| 定期 | 周期执行 | 勾选后按周期重复执行。默认未勾选。 |
| 其它设置 | 更改后检查连接 | 默认勾选。推送后检查账号连接。 |
| 其它设置 | 激活 | 默认勾选。任务可用。 |
| 其它设置 | 备注 | 选填。 |

:::note[主机才生效]
**推送参数** 仅对平台种类为主机的资产生效。
:::

## 4 执行与维护

行内绿色按钮立即执行。**更多** 包括 **编辑**、**删除**、**副本**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_push_03.png" alt="图 3  行内更多" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  行内更多</div>

单击任务 **名称** 打开详情。页签包括 **基本设置**、**资产/节点**、**活动**。右上角可 **编辑** 或 **删除**。右侧 **快速更新** 提供 **手动执行**。基本信息包括 ID、名称、账号、资产数、节点数、密文生成策略、定时任务、间隔、创建日期、更新日期、备注、激活。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_push_04.png" alt="图 4  账号推送详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  账号推送详情</div>

## 5 执行历史

选择 **执行历史**。列表列字段包括任务、触发模式、开始日期、结束日期、自动化快照、状态、花费时间及操作。触发模式包括手动触发和定时触发，状态包括成功、失败、取消。操作列可查看本次执行的日志。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_push_05.png" alt="图 5  执行历史" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  执行历史</div>

## 6 执行记录

选择 **执行记录**。列表列字段包括资产、用户名、结束日期、成功、错误及操作。成功列以勾或叉表示；失败时错误列给出原因，成功时错误列为 —。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_push_06.png" alt="图 6  执行记录" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  执行记录</div>
