---
title: 集成管理
---

## 1 功能概述

- 进入 **PAM** 页面，点击 **PAM &gt; 集成 &gt; 应用管理**，进入应用管理页面。
- 应用管理用于为外部系统提供资产账户和密码的统一调用与检索服务（通过 API 接口访问）。

![V4_pam_application1](/img/jumpserver/V4_pam_application1.png)

## 2 创建应用

- 点击 **创建** 按钮，即新建一个应用。
- 可以设置应用的名称、上传图标、指定账号策略和 IP 白名单、设置是否激活、设置备注。

![V4_pam_application2](/img/jumpserver/V4_pam_application2.png)

## 3 调用记录

- 点击 **调用记录**，可以查看应用的调用记录。

![V4_pam_application3](/img/jumpserver/V4_pam_application3.png)

## 4 文档

- 点击 **文档**，可以查看基于 cURL、Python、Go、Java、Node.js 的 API 调用示例。
- 本 API 提供了 PAM 查看资产账号服务，支持 RESTful 风格的调用，返回数据采用 JSON 格式。
- 关于 API 文档，请参考 [API 文档](/jumpserver/dev/rest_api)。

![V4_pam_application4](/img/jumpserver/V4_pam_application4.png)
