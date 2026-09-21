---
title: AList
---

# 使用 1Panel 可视化安装 AList

**AList** 是一个支持多种存储，支持网页浏览和 WebDAV 的文件列表程序，由 gin 和 Solidjs 驱动。

## 1. 打开应用商店

进入 1Panel 控制台后，点击左侧菜单的 **「应用商店」**。

![image-20251016110510084](/img/1panel/app/appstores.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1 打开应用商店</div>

## 2. 搜索 AList 并安装

在右上角搜索框输入 **AList**，点击应用卡片进入详情页，选择 **安装**。

![image-20251017093725067](/img/1panel/app/alist.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2 搜索 AList 并安装</div>

## 3. 配置安装参数

 你可以根据需要配置

- **名称** (输入框内可自定义应用名称，默认为 alist)
- **版本** (下拉选择所需的 AList 版本)
- **WebUI 端口** (Web 管理界面的访问端口，默认为 5244)
- **S3 端口** (S3 服务的访问端口，默认为 5246)
- **端口外部访问** (开启后，将允许从外部网络访问此应用端口)

确认设置无误后，点击 **确认** 按钮开始安装。

![image-20251017095132628](/img/1panel/app/alist_install.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3 配置安装参数——安装 AList 的参数配置</div>

等待安装完成即可

## 4. 配置访问 AList 服务

安装完成后，确认 1Panel 配置默认访问地址，已配置过可忽略

![image-20251016172322315](/img/1panel/app/setting_ip.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4 配置访问 AList 服务界面</div>

点击左侧菜单的 **容器** ，找到 AList 容器，点击终端

![image-20251017101043569](/img/1panel/app/alist_set_pwd.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5 配置访问 AList 服务——设置 AList 默认账号密码</div>

连接终端，生成密码，可选两种方式

- **生成随机密码**：./alist admin random
- **手动设置密码**：./alist admin set NEW_PASSWORD

![image-20251017101434307](/img/1panel/app/alist_passwd.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6 配置访问 AList 服务查看默认账号密码</div>

返回应用商店，点击 **跳转** 即可访问 AList 服务

![image-20251017101728523](/img/1panel/app/alist_jump.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7 配置访问 AList 服务——打开 AList 服务地址</div>

输入生成的密码即可

![image-20251017101943414](/img/1panel/app/alist_view.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8 配置访问 AList 服务界面</div>