---
title: 网域列表
description: 介绍 JumpServer 控制台中网域的创建、导入、详情、网关以及克隆与删除。
---

## 1 功能简介

网域表示资产所在的网络位置，可以是机房、公有云或 VPC。网域内可设置网关；当 JumpServer 不能直达资产时，通过网关跳转登录。

路径：登录后选择 **控制台 > 资产管理 > 网域列表**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_zones_01.png" alt="图 1  网域列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  网域列表</div>

页面顶部说明：网域是资产所在的位置，可以是机房、公有云或者 VPC。网域中可以设置网关，当网络不能直达时，可以使用网关跳转登录到资产。

列表列字段包括名称、资产数量、网关数量、备注及操作。右上角提供搜索、列设置、导入、导出和刷新。

## 2 前提条件

- 已使用具备资产管理权限的账号登录 JumpServer（如系统管理员或组织管理员）。
- 将资产加入网域前，资产须已存在于当前组织。创建资产请参见 [资产列表](./assets_list.md)。

:::important[组织范围]
当前列表只显示本组织内的网域。网关跳转仅对本组织资产生效。
:::

## 3 创建网域

1. 在网域列表单击 **创建**。
2. 在右侧抽屉 **创建网域** 中填写信息。
3. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_zones_02.png" alt="图 2  创建网域" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建网域</div>

- **名称**： 网域名称，必填。
- **网关**： 创建或更新成功后再添加详细信息。
- **资产**： 需要经该网域访问的资产，可在创建时选择，也可之后在详情中维护。
- **备注**： 选填。

## 4 导入与导出

列表右上角工具栏提供导入和导出。导入时单击上传图标，打开 **导入 & 创建** 对话框：

1. 选择 **创建** 或 **更新**。
2. 首次导入可单击 **CSV** 或 **XLSX** 下载创建模板，按提示填写后再上传。
3. 将文件拖到虚线框内，或单击虚线框选择本地文件。仅支持 csv / xlsx，且不超过 10M。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_zones_03.png" alt="图 3  导入网域" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  导入网域</div>

:::note[模板先行]
首次导入请先下载创建模板，按列填写后再上传，避免字段不匹配导致失败。
:::

## 5 网域详情

在列表中单击网域 **名称**，打开详情抽屉。页签包括 **基本设置**、**网关列表**、**资产列表**、**活动**。右上角可 **编辑** 或 **删除**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_zones_04.png" alt="图 4  网域详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  网域详情</div>

**基本信息** 展示名称、资产数量、网关数量、创建日期、备注。

**资产列表** 页签可单击 **新增**，将已有资产加入本网域。**活动** 页签展示最近 30 次操作记录。

## 6 网关

JumpServer 通过网关建立跳转，以访问不能直达的资产。选择 **网关列表** 页签后，可 **创建** 新网关，或 **新增** 将已有网关加入本网域。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_zones_05.png" alt="图 5  网关列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  网关列表</div>

网关列表列字段包括名称、IP/主机、连接性及操作。

### 6.1 创建网关

1. 在 **网关列表** 单击 **创建**。
2. 在 **创建网关** 中填写信息。网域已绑定为当前网域。
3. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_zones_06.png" alt="图 6  创建网关" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  创建网关</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建网关字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。网关显示名。 |
| 基本设置 | IP/主机 | 必填。网关地址。 |
| 基本设置 | 平台 | 须选择名称以 Gateway 开头的平台，默认 Gateway。 |
| 基本设置 | 节点 | 必填。网关所属节点。 |
| 协议 | 协议 | 默认可包含 ssh / 22、sftp / 22，可增减。 |
| 账号 | 账号 | 可单击 **新增** 或 **模版添加**，绑定登录网关的账号。 |
| 其它设置 | 网域 | 自动绑定当前网域。 |
| 其它设置 | 标签 | 选填。 |
| 其它设置 | 激活中 | 勾选后网关可用。 |
| 其它设置 | 备注 | 选填。会在 Luna 的用户授权资产树中悬浮显示，请勿填写敏感信息。 |

:::important[平台限制]
网关平台只能选择以 Gateway 开头的平台。协议受平台限制，变更协议能力须更新对应平台。
:::

### 6.2 添加已有网关

若网关资产已经存在，在 **网关列表** 单击 **新增**，打开 **添加网关到网域**，选择网关后单击 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_zones_07.png" alt="图 7  添加网关到网域" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  添加网关到网域</div>

## 7 更新网域

在列表操作列单击编辑图标，或在详情右上角单击 **编辑**，打开 **更新网域**。可修改名称、资产和备注。网关仍须在详情的 **网关列表** 中维护。修改后单击 **提交**；单击 **还原** 可放弃未保存的修改。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_zones_08.png" alt="图 8  更新网域" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  更新网域</div>

## 8 克隆与删除

在操作列单击 **…**，可选择：

- **删除**： 删除该网域，不可逆。
- **副本**： 克隆为新网域。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_zones_09.png" alt="图 9  行内更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  行内更多操作</div>

详情右上角也可直接 **删除**。

## 9 批量操作

勾选网域前的复选框，单击 **更多操作**，可选择 **删除所选**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_zones_10.png" alt="图 10  批量更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  批量更多操作</div>

## 10 注意事项

:::warning[删除不可恢复]
**删除** 与 **删除所选** 会移除网域数据，操作不可逆。仅从网域去掉资产或网关时，请在对应页签中移除，不要删除整个网域。
:::
