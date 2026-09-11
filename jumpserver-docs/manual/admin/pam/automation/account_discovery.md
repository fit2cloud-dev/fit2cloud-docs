---
title: 账号发现
description: 介绍 JumpServer PAM 中账号发现任务的创建、执行以及发现结果的同步与查看。
---

## 1 功能简介

账号发现用于收集资产上的账号，并可同步到 JumpServer 所管理的资产，减少手工录入。路径：登录后将控制台切换到 **PAM**，选择 **自动化 > 账号发现**。

页签包括 **发现账号**、**账号发现任务** 和 **执行历史**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_disc_01.png" alt="图 1  发现账号" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  发现账号</div>

**发现账号** 页左侧为资产树，上方统计最近一周、最近一月和待处理数量。列表列字段包括账号、资产、最后登录地址、最后登录日期、状态及操作。

## 2 前提条件

- 已使用具备 PAM 权限的账号登录 JumpServer（如系统管理员）。
- 目标资产须已存在且账号可被收集。资产维护请参见 [资产列表](../../console/assets/assets_list.md)。

:::note[先有任务才有结果]
**发现账号** 列表来自已执行的发现任务。当前环境该页为空时，须先在 **账号发现任务** 中创建任务并执行。
:::

## 3 发现账号

任务执行后，在 **发现账号** 中勾选账号，单击 **更多操作**：

- **同步所选**： 将发现的账号同步到对应资产。
- **同步删除所选**： 同步并删除所选账号。
- **删除所选**： 仅从发现列表中去掉记录，不处理资产上的账号。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_disc_02.png" alt="图 2  发现账号更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  发现账号更多操作</div>

右上角提供搜索、筛选、列设置、导出和刷新。

## 4 账号发现任务

选择 **账号发现任务** 页签。列表列字段包括名称、节点、资产、周期执行、执行周期、执行数及操作。行内绿色按钮为立即执行，**更多** 中可 **编辑** 或 **删除**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_disc_03.png" alt="图 3  账号发现任务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  账号发现任务</div>

### 4.1 创建任务

1. 单击 **创建**。
2. 在右侧抽屉 **创建账号发现任务** 中填写信息。
3. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_disc_04.png" alt="图 4  创建账号发现任务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  创建账号发现任务</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建账号发现任务字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。任务名称。 |
| 基本设置 | 节点 | 要收集账号的资产节点。 |
| 基本设置 | 资产 | 要收集账号的资产。可与节点同时选择。 |
| 配置 | 同步到资产 | 勾选后，收集完成会把账号同步到资产。 |
| 配置 | 风险检查 | 默认勾选。 |
| 配置 | 接收人 | 选择用户。页面提示：当前只支持邮件发送。 |
| 定期 | 周期执行 | 勾选后按定时或间隔重复执行。 |
| 定期 | 定时任务 | 填写 crontab。若同时设置了 interval 和 crontab，优先 crontab。 |
| 定期 | 间隔 | 默认 24 小时。 |
| 其它设置 | 激活 | 勾选后任务可用。 |
| 其它设置 | 备注 | 选填。 |

### 4.2 任务详情

在列表中单击任务 **名称**，打开详情。页签包括 **基本设置**、**资产/节点**、**活动**。右上角可 **编辑** 或 **删除**。

## 5 执行历史

选择 **执行历史** 页签。列表列字段包括任务、触发模式、开始日期、结束日期、自动化快照、状态、耗时及操作。触发模式示例为手动触发，状态为成功或错误。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_disc_05.png" alt="图 5  执行历史" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  执行历史</div>

操作列可查看日志和 **报告**。报告含任务名称、起止时间、资产数量、成功/失败/不支持数、耗时，以及新发现的账户。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_disc_06.png" alt="图 6  执行报告" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  执行报告</div>
