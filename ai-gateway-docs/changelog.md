---
title: 更新日志
description: 1Panel AI 网关产品更新日志，同步自 GitHub Release 记录，按版本发布日期倒序排列。
sidebar_position: 3
---

# 更新日志

## 1 版本说明

1Panel AI 网关版本号命名规则为：v 大版本.功能版本.Bug 修复版本，示例如下：

- v1.0.1 是 v1.0.0 之后的 Bug 修复版本
- v1.1.0 是 v1.0.0 之后的功能版本

本页面内容与 [GitHub Releases](https://github.com/1Panel-dev/1Panel-Gateway/releases) 同步，按版本发布日期倒序排列。功能建议与缺陷反馈请在 [GitHub Issues](https://github.com/1Panel-dev/1Panel-Gateway/issues) 提交。

## 2 更新内容

### v1.0.1

2026年9月3日

**新增功能**

- 【密钥管理】支持通过环境变量为上游请求配置 HTTP/HTTPS 代理
- 【API Keys】新增用户 API Key 启用与禁用功能
- 【系统管理】支持 `reset-admin-password` 命令重置管理员密码
- 【登录】登录页支持按回车键登录
- 【用户管理】新增用户备注功能

**功能优化**

- 【系统管理】优化管理员密码长度限制，支持设置 6–128 个字符的密码
- 【系统管理】优化系统日志输出格式

**问题修复**

- 【内容合规】修复了 Elasticsearch 账号添加失败的问题
- 【模型代理】修复了部分场景下请求校验过于严格的问题
- 【智能路由】修复了决策日志无法打开的问题
- 【用户管理】修复了用户首次登录时页面显示异常的问题
- 【模型代理】修复了 b.ai 账号校验异常的问题

相关链接：[GitHub Release](https://github.com/1Panel-dev/1Panel-Gateway/releases/tag/v1.0.1)

### v1.0.0

2026年9月2日

1Panel AI 网关 v1.0.0 正式发布。1Panel AI 网关是面向企业和团队的 AI 统一接入与治理平台，提供模型代理、智能路由、权限控制、内容合规和用量分析等能力，让 AI 应用更安全、稳定、经济地使用不同模型资源。

AI 应用只需配置统一的 Base URL 和 API Key，即可通过标准接口访问公有云 API、本地 vLLM 集群及其他模型服务。10 人及以下规模的团队可免费使用完整的 AI 网关治理能力。

**新增功能**

- 【模型代理】集中接入不同供应商和本地模型，通过模型映射与账号池统一调度
- 【席位与权限】按用户组、用户和 API Key 管理模型权限、并发限制与 Token 配额
- 【智能路由】根据请求内容与预设规则，将任务分发至合适的模型组
- 【负载与并发】结合账号优先级、实时负载和健康状态分配请求，降低单点依赖
- 【内容合规】提供敏感词、语义审核和调用内容审计能力
- 【用量分析】统计请求量、Token 消耗、缓存利用率和响应耗时，帮助团队分析成本与排查问题

相关链接：[GitHub Release](https://github.com/1Panel-dev/1Panel-Gateway/releases/tag/v1.0.0)
