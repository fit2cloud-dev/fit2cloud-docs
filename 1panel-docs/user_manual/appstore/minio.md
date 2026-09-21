---
title: MinIO
---

# 使用 1Panel 可视化安装 MinIO

**MinIO** 是根据 GNU Affero 通用公共许可证 v3.0 发布的高性能对象存储。它与 Amazon S3 云存储服务 API 兼容。使用 MinIO 为机器学习、分析和应用程序数据工作负载构建高性能基础架构。

## 1. 打开应用商店

进入 1Panel 控制台后，点击左侧菜单的 **「应用商店」**。

![image-20251016110510084](/img/1panel/app/appstores.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1 打开应用商店</div>

## 2. 搜索 MinIO 并安装

在右上角搜索框输入 **MinIO**，点击应用卡片进入详情页，选择 **安装**。

![image-20251016165333807](/img/1panel/app/MinIO.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2 搜索 MinIO 并安装</div>

## 3. 配置安装参数

 你可以根据需要配置

- **名称**（输入框内可自定义应用名称，默认为 minio）
- **版本**（下拉选择所需的 MinIO 版本）
- **用户**（用于登录的用户名，默认随机生成）
- **密码**（设置用于登录的密码）
- **端口**（WebUI 的访问端口，默认为 9001）
- **API 端口**（S3 API 的访问端口，默认为 9000）
- **会话持续时间**（WebUI 登录会话的有效时长，默认为 12h）
- **启用 WebUI**（选择是否开启 MinIO 的网页管理界面）
- **WebUI 登录动画**（选择是否在登录页面启用动画效果）
- **端口外部访问**（开启后，将允许从外部网络访问此应用端口）

确认设置无误后，点击 **确认** 按钮开始安装。

![image-20251016170535427](/img/1panel/app/minio_install.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3 配置安装参数——安装 MinIO 的参数配置</div>

等待安装完成即可

## 4. 访问 MinIO 服务

安装完成后，获取 MinIO 配置信息，点击 **已安装** 选择 **参数** 

![image-20251016171810134](/img/1panel/app/minio_info.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4 访问 MinIO 服务——查看 MinIO 服务参数信息</div>

得到配置信息

![image-20251016172011132](/img/1panel/app/minio_passwd.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5 访问 MinIO 服务查看默认账号密码</div>

配置默认访问地址

![image-20251016172322315](/img/1panel/app/setting_ip.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6 访问 MinIO 服务界面</div>

返回应用商店，点击 **跳转** 即可访问 MinIO 服务

![image-20251016172526853](/img/1panel/app/minio_jump.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7 访问 MinIO 服务——打开 MinIO 服务地址</div>

输入上面得到的 **用户名和密码** ，进入 **MinIO Web 服务**

![image-20251016173115776](/img/1panel/app/minio_view.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8 访问 MinIO 服务界面</div>