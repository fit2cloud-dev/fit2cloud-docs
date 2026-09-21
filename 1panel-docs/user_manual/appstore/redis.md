---
title: Redis
---

# 使用 1Panel 可视化安装 Redis

**Redis** 是一种开源的内存数据库，通常用作缓存系统或键值存储数据库。

## 1. 打开应用商店

进入 1Panel 控制台后，点击左侧菜单的 **「应用商店」**。

![image-20251016110510084](/img/1panel/app/appstores.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1 打开应用商店</div>

## 2. 搜索 Redis 并安装

在右上角搜索框输入 **Redis**，选择第一个，点击应用卡片进入详情页，选择 **安装**。

![image-20251016141645215](/img/1panel/app/appstore_redis.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2 搜索 Redis 并安装——应用商店中的 Redis 应用卡片</div>

## 3. 配置安装参数

 你可以根据需要配置

- **名称**(输入框默认应用名称)
- **版本**(选择所需版本)
- **Root 密码**(默认随机生成)
- **端口**(默认 6379，如果与现有服务冲突可调整)
- **端口外部访问** (开启后，允许从外部网络连接到此数据库端口)

确认设置无误后，点击 **确认** 按钮开始安装。

![image-20251016141905753](/img/1panel/app/redis_install.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3 配置安装参数——安装 Redis 的参数配置</div>

等待安装完成即可

## 4. 连接 Redis 数据库

点击左侧菜单的 **「数据库」** 选择Redis，即可输入命令

![image-20251016142801288](/img/1panel/app/redis_message.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4 连接 Redis 数据库——查看 Redis 连接信息</div>

使用工具进行连接。点击 **连接信息** 获取连接配置

![image-20251016143234658](/img/1panel/app/redis_information.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5 连接 Redis 数据库——查看 Redis 连接信息（续）</div>

本地输入连接信息进行连接

![image-20251016144637758](/img/1panel/app/redis_conn.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6 连接 Redis 数据库</div>