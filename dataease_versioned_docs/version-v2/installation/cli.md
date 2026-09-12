---
title: 命令行工具使用指南
---

## 1 DataEase Service

:::note

DataEase 在安装的时候默认向系统中添加了相应的 dataease Service，支持的 Service 命令有：

- start : 启动 DataEase 服务；
- stop : 停止 DataEase 服务，并删除相关的运行容器、docker 网络等资源；
- restart : 停止后启动 DataEase 服务，相当于先执行 stop，再执行 start 命令；
- status : 查看 DataEase 服务当前各容器运行状态。
:::

## 2 dectl

:::note

DataEase 默认内置了命令行运维工具（dectl），通过执行 dectl help 命令，可以查看相关的帮助文档。  
**请注意**，backup、restore 命令需要 DataEase 版本在 v2.4 及以上，使用方式见：[dectl 备份与恢复](../change-v2-4#71-dectl-增加备份与恢复操作) 

```
Usage:
  ./dectl [COMMAND] [ARGS...]
  ./dectl --help

Commands:
    status       查看 DATAEASE 服务运行状态   
    start        启动 DATAEASE 服务   
    stop         停止 DATAEASE 服务  
    restart      重启 DATAEASE 服务  
    reload       重新加载 DATAEASE 服务
    upgrade      在线升级 DATAEASE 服务
    version      查看 DATAEASE 版本信息
    clear-images 清理 DATAEASE 旧版本的相关镜像
    clear-logs   清理 DATAEASE 历史日志
    backup       进行 DATAEASE 备份
    restore      进行 DATAEASE 恢复
```
:::
