---
title: 配置达梦数据源
---

## 1 前提条件

在配置达梦数据源 之前，请确保以下准备工作已完成，以避免连接失败或数据读取异常：

- 达梦数据库版本：没有限制；
- 网络连通：SQLBot 所在环境可直连达梦数据库主机，确保网络通畅、端口开放；
- 账号权限：提供的用户名需具备查询权限；


## 2 配置数据源链接步骤

以下是将达梦数据库作为数据源接入的详细流程：



步骤一：选择数据源类型。在【新建数据源】页面选择 “达梦” 作为数据源类型。


<img src="/img/sqlbot/user_manual/datasource/datasource_list.png" alt="支持的数据源类型" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px auto 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 1 支持的数据源类型</div>


步骤二：填写连接与认证信息。进入【配置信息】页后，填入收集的 IP 、端口、数据库等相关的信息。数据源检验，校验成功后即可进行下一步。

**注意：若数据库连接失败，请参考 [达梦数据源无法连接](../faq/datasource#1-达梦数据源无法连接)。**


<img src="/img/sqlbot/user_manual/datasource/add_DM.png" alt="配置 DM 连接信息" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px auto 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 2 配置 DM 连接信息</div>


步骤三：选择数据表，系统会拉取该库下所有表/视图并以列表形式展示：

- 搜索：可在顶部搜索框输入关键词快速过滤；
- 全选/反选：点击表名左侧复选框，支持批量选择；

数据量过大可能会导致操作超时或者无响应，在勾选的数据表数量超过 30 张时，系统会在【保存】前弹出二次确认。


<img src="/img/sqlbot/user_manual/datasource/save_sqlserver.png" alt="选择数据表" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px auto 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 3 选择数据表</div>


对创建完成的达梦数据源,可直接开启智能问数。


<img src="/img/sqlbot/user_manual/datasource/question_DM.png" alt="问数 DM" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px auto 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 4 开启智能问数</div>

