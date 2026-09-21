---
title: Cloudreve
---

# 使用 1Panel 可视化安装 Cloudreve

**Cloudreve** 是一个开源的云存储网盘系统，它提供了丰富的功能，使用户可以在自己的服务器上建立个人或团队的云存储和文件共享平台。

## 1. 打开应用商店

进入 1Panel 控制台后，点击左侧菜单的 **「应用商店」**。

![image-20251016110510084](/img/1panel/app/appstores.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1 打开应用商店</div>

## 2. 搜索 Cloudreve 并安装

在右上角搜索框输入 **Cloudreve**，点击应用卡片进入详情页，选择 **安装**。

![image-20251017141857490](/img/1panel/app/cloudreve.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2 搜索 Cloudreve 并安装</div>

## 3. 配置安装参数

 你可以根据需要配置，这里需要配置数据库服务

- **名称** (输入框内可自定义应用名称，默认为 cloudreve)
- **版本** (下拉选择所需的 Cloudreve 版本)
- **数据库服务** (选择用于存储数据的数据库服务，例如 PostgreSQL)
- **数据库名** (为应用创建的数据库名称)
- **数据库用户** (用于连接数据库的用户名)
- **数据库用户密码** (数据库用户的密码)
- **Redis 服务** (选择用于缓存的 Redis 服务)
- **缓存数据库密码** (Redis 服务的密码)
- **端口** (应用的访问端口，默认为 40033)
- **端口外部访问** (开启后，将允许从外部网络访问此应用端口)

确认设置无误后，点击 **确认** 按钮开始安装。

![image-20251017141736829](/img/1panel/app/cloudreve_install.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3 配置安装参数——安装 Cloudreve 的参数配置</div>

等待安装完成即可

## 4. 访问 Cloudreve 服务

配置默认访问地址，已配置则忽略此步骤

![image-20251016172322315](/img/1panel/app/setting_ip.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4 访问 Cloudreve 服务界面</div>

返回应用商店，点击 **跳转** 即可访问 Cloudreve 服务

![image-20251017150121474](/img/1panel/app/jump_cloudreve.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5 访问 Cloudreve 服务——打开 Cloudreve 服务地址</div>

注册账号，进行登录

![image-20251017150238733](/img/1panel/app/cloudreve_view.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6 访问 Cloudreve 服务界面</div>