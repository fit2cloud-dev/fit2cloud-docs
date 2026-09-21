---
title: frp
---

# 使用 1Panel 可视化安装 frp

**frp（Fast Reverse Proxy）** 是一款开源的高性能反向代理工具，它允许您在不同网络之间建立安全的通信通道，用于实现端口映射、内网穿透和远程访问等多种网络连接需求。

## 1. 打开应用商店

进入 1Panel 控制台后，点击左侧菜单的 **「应用商店」**。

![image-20251016110510084](/img/1panel/app/appstores.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1 打开应用商店</div>

## 2. 搜索 frp 并安装

在右上角搜索框输入 **frp**，点击应用卡片进入详情页，选择 **安装**。

![image-20251022210133411](/img/1panel/app/frp.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2 搜索 frp 并安装</div>

## 3. 配置安装参数

 你可以根据需要配置

- **名称** (输入框内可自定义应用名称，默认为 frps)
- **版本** (下拉选择所需的 frp 版本)
- **服务端口** (frp 服务端用于与客户端通信的端口，默认为 7000)
- **Dashboard 端口** (WebUI 管理界面的访问端口，默认为 7500)
- **用户名** (Dashboard 登录用户名，默认为 admin)
- **密码** (Dashboard 登录密码)
- **密钥** (用于 frps 和 frpc 之间通信认证的令牌)

确认设置无误后，点击 **确认** 按钮开始安装。

![image-20251022210239559](/img/1panel/app/frp_install.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3 配置安装参数——安装 frp 的参数配置</div>

等待安装完成即可

## 4. 访问 frp 服务

配置默认访问地址，已配置则忽略此步骤

![image-20251016172322315](/img/1panel/app/setting_ip.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4 访问 frp 服务界面</div>

返回应用商店，点击 **跳转** 即可访问 frp web 服务

![image-20251022210650881](/img/1panel/app/frp_jump.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5 访问 frp 服务——打开 frp 服务地址</div>

输入账户密码即可

![image-20251022210723926](/img/1panel/app/frp_view.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6 访问 frp 服务界面</div>

如需修改配置，首先进入安装目录

![image-20251022210836670](/img/1panel/app/frp_change.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7 访问 frp 服务访问地址设置</div>

修改frp配置文件即可

![image-20251022210951332](/img/1panel/app/frp_info.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8 访问 frp 服务——查看 frp 服务参数信息</div>