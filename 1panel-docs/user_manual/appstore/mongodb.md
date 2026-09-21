---
title: MongoDB
---

# 使用 1Panel 可视化安装 MongoDB

**MongoDB** 是一款流行的NoSQL数据库管理系统，它提供了许多功能，使其成为处理大规模数据和灵活的数据模型的强大工具。

## 1. 打开应用商店

进入 1Panel 控制台后，点击左侧菜单的 **「应用商店」**。

![image-20251016110510084](/img/1panel/app/appstores.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1 打开应用商店</div>

## 2. 搜索 MongoDB 并安装

在右上角搜索框输入 **MongoDB**，点击应用卡片进入详情页，选择 **安装**。

![image-20251016155319717](/img/1panel/app/MongoDB.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2 搜索 MongoDB 并安装</div>

## 3. 配置安装参数

 你可以根据需要配置

- **名称**（输入框默认应用名称）
- **版本**（选择所需版本）
- **用户名**（默认随机生成）
- **端口**（默认 27017，如果与现有服务冲突可调整）
- **端口外部访问** （开启后，允许从外部网络连接到此数据库端口）

确认设置无误后，点击 **确认** 按钮开始安装。

![image-20251016155828329](/img/1panel/app/mongodb_install.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3 配置安装参数——安装 MongoDB 的参数配置</div>

等待安装完成即可

## 4. 连接 MongoDB 数据库

安装完成后，获取 MongoDB 配置信息，点击 **已安装** 选择 **参数** 

![image-20251016162420157](/img/1panel/app/mongodb_info.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4 连接 MongoDB 数据库——查看 MongoDB 服务参数信息</div>

得到配置信息

![image-20251016162604193](/img/1panel/app/mongodb_passwd.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5 连接 MongoDB 数据库查看默认账号密码</div>

使用本地工具连接 MongoDB

![image-20251016162737239](/img/1panel/app/mongodb_conn.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6 连接 MongoDB 数据库</div>