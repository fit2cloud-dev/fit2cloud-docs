---
title: 风险检测
description: 介绍 JumpServer PAM 中账号风险检测任务的创建、检测结果处理以及检测引擎说明。
---

## 1 功能简介

风险检测用于检查 JumpServer 已纳管账号的凭据风险，例如密码强度、密码重复和常用密码。路径：登录后将控制台切换到 **PAM**，选择 **安全设置 > 风险检测**。

页签包括 **检测结果**、**检测任务**、**执行历史** 和 **检测引擎**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_risk_01.png" alt="图 1  检测结果" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  检测结果</div>

**检测结果** 页左侧为资产树，上方统计最近一周、最近一月和待处理数量。列表列字段包括资产、账号、风险、待处理及创建日期。右上角提供搜索、筛选、列设置、导出和刷新。

## 2 前提条件

- 已使用具备 PAM 权限的账号登录 JumpServer（如系统管理员）。
- 目标资产或节点须已存在，且账号已纳管并配置凭据。资产维护请参见 [资产列表](../../console/assets/assets_list.md)，账号维护请参见 [账号列表](../../console/account_management/account_list.md)。

:::note[先纳管再检测]
风险检测只检查系统中已纳管的账号凭据，不会连接资产去发现账号。若要核对资产上的实际账号，请先执行 [账号发现](../automation/account_discovery.md)，并完成账号纳管和凭据配置。
:::

## 3 检测结果

任务执行后，在 **检测结果** 中勾选记录，单击 **更多操作**：

- **解决所选**： 将所选风险标记为已处理。
- **删除所选**： 从检测结果中去掉所选记录。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_risk_02.png" alt="图 2  检测结果更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  检测结果更多操作</div>

:::note[先有任务才有结果]
**检测结果** 来自已执行的检测任务。当前环境该页为空时，须先在 **检测任务** 中创建任务并执行。
:::

## 4 检测任务

选择 **检测任务**。列表列字段包括名称、资产数、节点数、执行周期、激活及操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_risk_03.png" alt="图 3  检测任务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  检测任务</div>

1. 单击 **创建**。
2. 在右侧抽屉 **创建检测任务** 中填写信息。
3. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_risk_04.png" alt="图 4  创建检测任务" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  创建检测任务</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建检测任务字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。任务名称。 |
| 资产 | 资产 | 要检测的资产。 |
| 资产 | 节点 | 要检测的节点。可与资产同时选择。 |
| 配置 | 引擎 | 必填。选择检测引擎。页面提示：风险检测仅检查系统中已纳管的账号凭据，不会连接资产实时发现账号。 |
| 配置 | 收件人 | 选择用户。页面提示：当前只支持邮件发送。 |
| 定期 | 周期执行 | 勾选后按周期重复执行。默认未勾选。 |
| 定期 | 间隔 | 勾选周期执行后出现，默认 24 小时。 |
| 定期 | 定时任务 | 勾选周期执行后出现。页面提示：如果同时设置了 interval 和 crontab，则优先考虑 crontab。 |
| 其它设置 | 激活 | 默认勾选。任务可用。 |
| 其它设置 | 备注 | 选填。 |

## 5 执行历史

选择 **执行历史**。列表列字段包括任务、触发模式、开始日期、结束日期、自动化快照、状态、花费时间及操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_risk_05.png" alt="图 5  执行历史" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  执行历史</div>

## 6 检测引擎

选择 **检测引擎**。当前环境提供 3 个引擎：

- **检查您的账号和密码的强度**： 针对账号密码的安全性进行检查分析，包括密码强度、泄露情况等。
- **检查账号和密码是否重复**： 检查该账号是否与其他账户相同。
- **检查账号密码是否为常用密码**： 检查账号密码是否为常见泄露密码。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_risk_06.png" alt="图 6  检测引擎" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  检测引擎</div>
