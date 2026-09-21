---
title: Nginx Proxy Manager
---

# 使用 1Panel 可视化安装 Nginx Proxy Manager

**Nginx Proxy Manager** 是一个功能强大的反向代理和Web服务器管理工具，它使您能够轻松地管理多个网站和应用程序的代理设置。

## 1. 打开应用商店

进入 1Panel 控制台后，点击左侧菜单的 **「应用商店」**。

![image-20251016110510084](/img/1panel/app/appstores.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1 打开应用商店</div>

## 2. 搜索 Nginx Proxy Manager 并安装

在右上角搜索框输入 **Nginx Proxy Manager**，点击应用卡片进入详情页，选择 **安装**。

![image-20251020152016138](/img/1panel/app/nginx_proxy_manager.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2 搜索 Nginx Proxy Manager 并安装</div>

## 3. 配置安装参数

 你可以根据需要配置

- **名称** (输入框内可自定义应用名称，默认为 nginx-proxy-manager)
- **版本** (下拉选择所需的 Nginx Proxy Manager 版本)
- **HTTP 端口** (HTTP 服务的访问端口，默认为 30080)
- **控制台端口** (WebUI 管理界面的访问端口，默认为 30081)
- **HTTPS 端口** (HTTPS 服务的访问端口，默认为 30443)
- **端口外部访问** (开启后，将允许从外部网络访问此应用端口)

确认设置无误后，点击 **确认** 按钮开始安装。

![image-20251020151917440](/img/1panel/app/nginx_proxy_manager_install.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3 配置安装参数——安装 Nginx Proxy Manager 的参数配置</div>

等待安装完成即可

## 4. 配置访问 Nginx Proxy Manager 服务

安装完成后，确认 1Panel 配置默认访问地址，已配置过可忽略

![image-20251016172322315](/img/1panel/app/setting_ip.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4 配置访问 Nginx Proxy Manager 服务界面</div>

返回应用商店，点击 **跳转** 即可访问 Nginx Proxy Manager 服务

![image-20251020152901371](/img/1panel/app/nginx_proxy_manager_jump.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5 配置访问 Nginx Proxy Manager 服务——打开 Nginx Proxy Manager 服务地址</div>

使用默认的用户名: `admin@example.com`  密码:`changeme` 登录即可

![image-20251020153112135](/img/1panel/app/nginx_proxy_manager_view.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6 配置访问 Nginx Proxy Manager 服务界面</div>