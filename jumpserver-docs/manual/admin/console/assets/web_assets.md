---
title: Web 资产
description: 介绍 JumpServer 中 Web 类型资产的创建、访问白名单以及自动代填配置。
---

## 1 功能简介

Web 资产用于通过远程应用访问内部系统、SaaS 或其他网页。用户连接时，由发布机拉起预配置浏览器访问目标站点，避免直接暴露真实地址。

路径：登录后选择 **控制台 > 资产管理 > 资产列表**，再选择 **Web** 页签。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_web_01.png" alt="图 1  Web 资产列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  Web 资产列表</div>

列表列字段包括名称、URL、账号、平台、上次登录时间、连接性及操作。

## 2 前提条件

- 已使用具备资产管理权限的账号登录 JumpServer。
- Web 类型资产依赖远程应用。须先在 **系统设置 > 远程应用** 中配置发布机，详见 [远程应用](../../system_settings/remote_apps.md)。

:::important[远程应用]
页面提示：Web 类型资产依赖于远程应用，请前往系统设置在远程应用中配置。未配置发布机时，用户无法正常打开 Web 资产。
:::

## 3 创建 Web 资产

1. 在 **Web** 页签单击 **创建**。
2. 在 **选择平台** 的 **网站** 分组中选择平台（如 **Website**）。
3. 在 **创建资产** 中填写信息。
4. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_web_02.png" alt="图 2  选择 Web 平台" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  选择 Web 平台</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_web_03.png" alt="图 3  创建 Website 资产" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  创建 Website 资产</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建 Web 资产字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。资产在 JumpServer 中的显示名，不可重名。 |
| 基本设置 | URL | 必填。目标网页地址。 |
| 基本设置 | 平台 | 创建时所选平台，示例为 Website。 |
| 基本设置 | 节点 | 必填。资产所属节点。 |
| 基本设置 | 访问白名单 | 选填。留空允许访问所有站点；配置后只允许打开资产地址及白名单中的站点。 |
| 选择器 | 自动代填 | **禁用**、**基本** 或 **脚本**，见下文。 |
| 协议 | 协议 | 默认为 http(s)，端口示例为 80，可增减。 |
| 账号 | 账号 | 可单击 **新增** 或 **模版添加**，绑定登录该站点的账号。 |
| 其它设置 | 网域 | 选填。 |
| 其它设置 | 标签 | 选填。 |
| 其它设置 | 激活中 | 勾选后资产可被使用。 |
| 其它设置 | 备注 | 选填。会在 Luna 的用户授权资产树中悬浮显示，请勿填写敏感信息。 |

:::note[访问白名单]
输入完整 HTTP / HTTPS 站点地址（协议、主机和端口），不含路径或通配符，按回车确认。页面资源加载不受限制。
:::

:::important[协议受平台限制]
资产可用的协议由平台决定。单击协议行的设置可查看协议参数；若要变更协议能力，须更新对应平台。
:::

## 4 自动代填

自动代填用于需要登录的网站：连接时由系统按选择器或脚本填写账号信息。无登录页的站点可选择 **禁用**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_web_05.png" alt="图 4  禁用自动代填" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  禁用自动代填</div>

### 4.1 禁用

选择 **禁用** 后，不再显示用户名、密码等选择器，适用于无需身份验证的网站。

### 4.2 基本

用户名、密码和登录按钮在同一页面时，使用 **基本**。默认选择器示例：

- **用户名选择器**： `name=username`
- **密码选择器**： `name=password`
- **确认按钮选择器**： `id=login_button`
- **Success selector**： 登录成功后的页面元素，选填。
- **可交互区域选择器**： 限制可操作区域，选填。

选择器用于在页面上定位元素，常见写法包括 `name=`、`id=` 等。

### 4.3 脚本

登录流程有多步、需等待人工验证或页面跳转时，选择 **脚本**，在编辑器中填写 JSON 数组。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_web_04.png" alt="图 5  脚本代填" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  脚本代填</div>

界面说明：

- 每步可指定 origin。
- `interactive` 会暂停并等待人工验证。
- `success` 必须是最后一步。
- Web Proxy 支持同一窗口内的页面跳转，暂不支持 iframe 和独立弹窗登录。

:::warning[脚本限制]
当前 Web Proxy 暂不支持 iframe 登录，也不支持独立弹窗登录。多步脚本请在同一窗口内完成跳转。
:::

## 5 后续操作

创建完成后，可在资产列表中编辑、克隆或删除，并为用户授权。通用操作见 [资产列表](./assets_list.md)。
