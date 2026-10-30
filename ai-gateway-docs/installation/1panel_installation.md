---
title: 1Panel 安装
description: 介绍 1Panel AI 网关 1Panel 安装的说明
---

## 1 安装 1Panel

    关于 1Panel 的安装部署与基础功能介绍，请参考 [1Panel 官方文档](https://1panel.cn/docs/) 。在完成了 1Panel 的安装部署后，根据提示网址打开浏览器进入 1Panel，界面如下。    

<img src="/img/ai-gateway/1panel.png" alt="1panel 面板界面" style={{display:'block',margin:'16px auto',maxWidth:'100%'}}/>

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'6px 0 20px'}}>图 1  1panel 面板界面</div>

## 2 安装 1Panel AI 网关

    进入应用商店应用列表，找到 1Panel AI 网关应用进行安装。    

<img src="/img/ai-gateway/deploy_app_store.png" alt="1Panel 应用商店一键部署" style={{display:'block',margin:'16px auto',maxWidth:'100%'}}/>

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'6px 0 20px'}}>图 2  1Panel 应用商店一键部署</div>
 
    在安装页面配置 1Panel AI 网关应用参数：

    - **名称**：要创建的 1Panel AI 网关应用的名称。   
    - **版本**：选择 1Panel AI 网关的版本。
    - **密码**：1Panel AI 网关应用的初始管理员密码。
    - **端口**：1Panel AI 网关应用的服务端口。   
    - **容器名称**：1Panel AI 网关应用容器名称。    
    - **CPU 限制**：1Panel AI 网关应用可以使用的 CPU 核心数。   
    - **内存限制**：1Panel AI 网关应用可以使用的内存大小。    
    - **端口外部访问**：1Panel AI 网关应用可以使用 IP:PORT 进行访问（1Panel AI 网关应用必须勾选外部端口访问）。   

:::note[数据库版本与 1Panel 版本要求]

1Panel AI 网关应用提供两个版本，请在 **版本** 下拉框中按需选择：

- **1.5.1**：使用 SQLite，适合单机部署，已有 SQLite 实例可沿此版本线升级。
- **1.5.1-postgres**：使用 PostgreSQL，需要 **1Panel v2.4.0 及以上版本** 和 **PostgreSQL 18**。1Panel 版本低于 v2.4.0 时，版本下拉框中不会显示该版本。安装时选择已在 1Panel 中配置的 PostgreSQL 服务，由面板创建并关联应用数据库。

两个版本均使用 `1panel/ai-gateway:v1.5.1` 镜像，通过数据库配置区分。应用目录保存配置等持久化数据；PostgreSQL 版的数据库由所选 PostgreSQL 服务保存，备份请使用 1Panel 的应用备份功能以包含关联数据库。

SQLite 与 PostgreSQL 版本之间不能直接升级或交叉恢复备份，切换数据库类型需要单独迁移数据。

:::

<img src="/img/ai-gateway/ai_gateway_settting.png" alt="1Panel AI 网关应用配置" style={{display:'block',margin:'16px auto',maxWidth:'100%'}}/>

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'6px 0 20px'}}>图 3  1Panel AI 网关应用配置</div>

    点击确认开始安装，页面自将动跳转到已安装应用列表，等待 1Panel AI 网关应用状态变为已启动。   

<img src="/img/ai-gateway/ai_gateway_start.png" alt="安装完成" style={{display:'block',margin:'16px auto',maxWidth:'100%'}}/>

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'6px 0 20px'}}>图 4  安装完成</div>

## 3 访问 1Panel AI 网关

    安装成功后，通过浏览器访问如下页面登录 1Panel AI 网关：   

    ```bash
    地址: http://目标服务器IP地址:服务运行端口（默认 8080）     
    用户名: admin    
    密码: 安装时设置的初始管理员密码
    ``` 

    为了安全，admin 第一次登录时将要求修改初始密码，修改密码后，重新登录系统即可使用 1Panel AI 网关。   

<img src="/img/ai-gateway/login.png" alt="1Panel AI 网关登录页" style={{display:'block',margin:'16px auto',maxWidth:'100%'}}/>

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'6px 0 20px'}}>图 5  1Panel AI 网关登录页</div>
