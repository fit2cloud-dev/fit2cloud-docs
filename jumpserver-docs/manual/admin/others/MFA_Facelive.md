---
title: 人脸识别 (X-Pack)
description: 介绍 JumpServer 人脸识别 MFA 的启用条件与安全设置入口。
---

## 1 功能简介

人脸识别可作为 MFA 方式之一。在 **系统设置 > 安全设置 > 认证安全** 中，**允许的 MFA 方式** 包含 **人脸识别**。勾选后，用户可在个人信息中录入面部信息，登录或连接资产时按策略进行人脸验证。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_st_sec_01.png" alt="图 1  允许的 MFA 方式含人脸识别" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  允许的 MFA 方式含人脸识别</div>

## 2 使用限制

- 需企业版 / X-Pack 能力，具体以许可证为准。
- 须使用 HTTPS 访问。
- 部署侧需开启人脸相关配置项（如 `FACE_RECOGNITION_ENABLED`），修改后重启 JumpServer，以当前版本部署文档为准。

## 3 前提条件

- 已使用系统管理员账号登录 JumpServer。
- 已在安全设置中勾选 **人脸识别**。
- 用户已在个人信息中录入面部信息。

资产连接前的人脸校验在访问控制策略中配置，详见 [访问控制](../console/access_control/acls.md)。
