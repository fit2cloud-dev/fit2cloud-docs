---
title: 报表
description: 介绍 JumpServer 审计台中用户报表、资产报表和账号报表的查看。
---

## 1 功能简介

报表用于按时间范围查看用户、资产和账号的统计图表。路径：登录后将控制台切换到 **审计台**，选择 **报告** 下的 **用户报表**、**资产报表** 或 **账号报表**。时间范围可选择今天、近 7 天、近 30 天，也可单击 **自定义**。

## 2 前提条件

- 已使用具备审计权限的账号登录 JumpServer（如系统管理员或审计员）。

## 3 用户报表

选择 **报告 > 用户报表**。报告类型包括 **用户登录报告** 和 **用户改密报告**。

用户登录报告概览指标包括总共、未启动 MFA、首次登录、有效、人脸信息、需改密。图表包括用户登录趋势、登录来源、访问时段分布、登录方法统计。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_report_01.png" alt="图 1  用户登录报告" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  用户登录报告</div>

## 4 资产报表

选择 **报告 > 资产报表**。报告类型包括 **资产统计报告** 和 **资产活动报告**。

资产统计报告概览指标包括总共、激活中、可连接、已关联网域、已关联目录服务、平台。图表包括资产类型分布、新增趋势。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_report_02.png" alt="图 2  资产统计报告" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  资产统计报告</div>

## 5 账号报表

选择 **报告 > 账号报表**。报告类型包括 **账号统计报告** 和 **账号自动化报告**。

账号统计报告概览指标包括总共、激活中、可连接、切换自、可改密、账号模版。图表包括账号创建来源分布、账号可连接性状态分布、账号改密趋势，以及资产账号数量排名、账号密码变更排名。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_report_03.png" alt="图 3  账号统计报告" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  账号统计报告</div>
