---
title: OpenResty 设置
---


网站列表上方的工具栏可用于查看和配置 OpenResty。

## 1 停止 / 启动 / 重启

可以通过按钮停止、启动或重启来管理 OpenResty 应用。

![img.png](/img/1panel/websites/openresty_setting.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1 停止 / 启动 / 重启——应用商店设置</div>

## 2 重载

允许用户在无需停机的情况下快速应用配置更改，确保网站服务的高可用性。

![img.png](/img/1panel/websites/openresty_reload.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2 重载界面</div>

## 3 设置

### 3.1 当前状态

查看当前网站状态，包括活动连接数、总连接数、总握手次数、总请求数、请求数、响应数及驻留进程等信息。

![img.png](/img/1panel/websites/openresty_status.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3 当前状态界面</div>

### 3.2 配置修改

- 配置 OpenResty 的配置文件
- 点击【默认配置】按钮可将配置文件恢复到默认状态

![img.png](/img/1panel/websites/openresty_conf.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4 配置修改</div>

### 3.3 性能调整

调整 OpenResty 的相关配置参数。

![img.png](/img/1panel/websites/openresty_performance.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5 性能调整界面</div>

### 3.4 日志

查看 OpenResty 日志，支持实时追踪、下载、清空等操作，并可按指定时间段和行数筛选日志。

![img.png](/img/1panel/websites/openresty_log.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6 日志</div>

### 3.5 模块

管理 OpenResty 模块，包括：

- 查看已安装的模块列表
- 启用/禁用指定模块
- 创建、编辑、删除模块

模块配置发生变化后，需要点击【构建】按钮以应用配置，构建成功后会自动重启 OpenResty。

如果自定义构建模块，需要将模块的源码包放在  /opt/1panel/apps/openresty/openresty/build/tmp 目录下  (/opt 是 1Panel 的安装目录)  
参数类似 --add-module=/tmp/nginx-rtmp-module （必须是 /tmp）  
脚本参考 unzip -o /tmp/nginx-rtmp-module.zip -d /tmp （必须是 /tmp）  

![img.png](/img/1panel/websites/openresty_module.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7 模块界面</div>
