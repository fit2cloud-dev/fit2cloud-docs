---
title: 工单审计
description: 介绍 JumpServer 审计台中工单列表的筛选、详情查看和导出。
---

## 1 功能简介

工单列表用于查看用户提交的授权与复核类工单。路径：登录后将控制台切换到 **审计台**，选择 **工单审计 > 工单列表**。

可按类型筛选：申请资产、登录复核、命令复核、资产登录复核。可按状态筛选：全部、打开、取消、已同意、已拒绝。列表列字段包括标题、编号、类型、动作及日期。右上角提供搜索、导出和刷新。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_ticket_01.png" alt="图 1  工单列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  工单列表</div>

## 2 前提条件

- 已使用具备审计权限的账号登录 JumpServer（如系统管理员或审计员）。
- 须已有用户提交过工单。

## 3 工单详情

单击工单标题，打开详情抽屉。页签包括 **工单详情** 和 **活动**。

工单详情展示编号、状态、类型、工单流、用户、抄送人、授权组织名称、创建时间、备注，以及节点、资产、账号、动作、开始日期、失效日期。右侧为处理进度（创建工单、处理工单、完成工单）。下方为处理记录。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_ticket_02.png" alt="图 2  工单详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  工单详情</div>

## 4 导出

单击导出。文件类型为 **CSV** 或 **Excel**。导出范围为 **导出所有**、**仅导出选择项** 或 **仅导出搜索结果**。单击 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_ticket_03.png" alt="图 3  导出工单列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  导出工单列表</div>
