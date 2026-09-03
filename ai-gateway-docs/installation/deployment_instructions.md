---
title: 部署说明
description: 介绍 1Panel AI 网关安装部署的说明
---

系统支持以下数据库与部署组合：

- SQLite 单机：单个网关实例，适合快速部署和中小规模使用。
- PostgreSQL 单机：单个网关实例共享 PostgreSQL 数据库。
- PostgreSQL 高可用：多个网关实例共享 PostgreSQL，并由外部负载均衡和高可用 Redis 等基础设施提供高可用支撑。

部署边界：软件通过官方容器镜像交付，并提供部署参考；不负责安装和运维外部负载均衡、PostgreSQL、Redis 或可选的 Elasticsearch 集群。

默认运行参数如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  1Panel AI 网关默认运行参数</div>

| 项目 | 默认值 | 说明 |
| --- | --- | --- |
| 监听地址 | 0.0.0.0 | 监听全部 IPv4 接口。 |
| HTTP 端口 | 8080 | Web 管理界面和数据面 API 共用。 |
| 数据库 | SQLite | 默认数据库文件位于 /opt/ai-gateway/data/db/ai-gateway.db。 |
| 凭据密钥 | 自动管理 | SQLite 首次启动时生成 /opt/ai-gateway/data/security/credential.key。 |
| 优雅退出 | 60 秒 | 接收终止信号后等待请求退出。 |
