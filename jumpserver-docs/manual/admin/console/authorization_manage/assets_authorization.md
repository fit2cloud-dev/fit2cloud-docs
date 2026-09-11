---
title: 资产授权
description: 介绍 JumpServer 控制台中资产授权规则的创建、导入导出、详情维护、克隆与删除。
---

## 1 功能简介

资产授权用于把资产（或节点）授权给用户或用户组，并限定可用账号、协议和动作。授权完成后，用户即可在工作台看到并连接这些资产。

路径：登录后选择 **控制台 > 授权管理 > 资产授权**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_perms_01.png" alt="图 1  资产授权" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  资产授权</div>

页面提示：资产授权允许您选择用户和资产，将资产授权给用户以便访问。一旦授权完成，用户便可便捷地浏览这些资产。此外，您还可以设置特定的权限位，以进一步定义用户对资产的权限范围。

左侧为 **资产树**，可按节点或资产查看相关授权。列表列字段包括名称、用户、用户组、资产、节点、账号、有效及操作。用户、用户组、资产、节点、账号列为数量。

**快速过滤** 包括：无效、有效、过期时间、已禁用、没有有效资源。

## 2 前提条件

- 已使用具备授权管理权限的账号登录 JumpServer（如系统管理员或组织管理员）。
- 被授权的用户或用户组、资产或节点须已存在。创建请参见 [用户列表](../users/users.md)、[用户组](../users/user-groups.md)、[资产列表](../assets/assets_list.md)。

:::important[组织范围]
当前列表只显示本组织内的授权规则。授权仅对本组织用户与资产生效。
:::

## 3 创建资产授权

1. 在资产授权列表单击 **创建**。
2. 在右侧抽屉 **创建资产授权** 中填写信息。
3. 展开 **其它设置**，确认激活状态与有效期后，单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_perms_02.png" alt="图 2  创建资产授权" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建资产授权</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建资产授权字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。授权规则名称。 |
| 用户 | 用户 | 被授权连接资产的 JumpServer 用户，可多选。 |
| 用户 | 用户组 | 被授权的用户组。组内用户继承该规则。 |
| 资产 | 资产 | 用户可连接的资产，可多选。 |
| 资产 | 节点 | 用户可连接的资产节点。节点下资产随节点变化。 |
| 账号 | 账号 | **所有账号**、**指定账号**、**排除账号** 或 **无**。可同时勾选 **虚拟账号**。 |
| 协议 | 协议 | **全部协议** 或 **指定协议**。 |
| 动作 | 动作 | 用户可执行的操作，见下文。 |
| 其它设置 | 激活中 | 勾选后规则生效。 |
| 其它设置 | 开始日期 | 规则开始生效的时间。 |
| 其它设置 | 失效日期 | 超过该时间后规则不再生效。 |
| 其它设置 | 备注 | 选填。 |

用户与用户组可同时选择；资产与节点也可同时选择。常见写法：

- 只授权某个用户访问某资产：选择 **用户** 和 **资产**，用户组、节点留空。
- 只授权某个用户组访问某节点：选择 **用户组** 和 **节点**，用户、资产留空。

### 3.1 账号

账号选项含义：

- **所有账号**： 资产上已添加的所有账号。
- **指定账号**： 指定用户名选择授权账号。可输入用户名（按 Enter 继续输入），或单击 **模版添加**。页面提示：选择模版添加时，会自动创建资产下不存在的账号并推送。账号模版见 [账号模版](../account_management/account_template.md)。
- **排除账号**： 授权除输入用户名以外的账号。
- **无**： 不授权资产上的托管账号。
- **虚拟账号**： 勾选后选择虚拟账号（如手动输入、同名账号、匿名账号、指定账号），说明见 [账号列表](../account_management/account_list.md)。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_perms_03.png" alt="图 3  指定账号" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  指定账号</div>

### 3.2 协议与动作

协议选择 **指定协议** 后，在下拉框中选择允许使用的协议。

动作默认勾选 **全部**，包含：

- **连接**
- **文件传输**： 上传、下载、删除
- **剪贴板**： 复制、粘贴
- **分享**

页面提示：各个权限作用协议不尽相同，单击权限后面的图标查看。

## 4 导入与导出

列表右上角工具栏提供列设置、导出、导入和刷新。

导入时单击上传图标，打开 **导入 & 创建** 对话框：

1. 选择 **创建** 或 **更新**。
2. 首次导入可单击 **CSV** 或 **XLSX** 下载创建模板，按提示填写后再上传。
3. 将文件拖到虚线框内，或单击虚线框选择本地文件。仅支持 csv / xlsx，且不超过 10M。
4. 单击 **取消** 可关闭对话框。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_perms_04.png" alt="图 4  导入资产授权" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  导入资产授权</div>

:::note[模板先行]
首次导入请先下载创建模板，按列填写后再上传，避免字段不匹配导致失败。
:::

## 5 授权详情

在列表中单击规则 **名称**，打开详情抽屉。页签包括 **基本设置**、**用户/用户组**、**资产/节点**、**授权账号**、**活动**。右上角可 **编辑** 或 **删除**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_perms_05.png" alt="图 5  资产授权详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  资产授权详情</div>

### 5.1 基本设置

左侧 **基本信息** 展示 ID、名称、动作、开始日期、失效日期、创建日期、创建者、备注等。

右侧 **快速更新** 可打开或关闭 **激活中**。

### 5.2 用户/用户组

查看并维护本规则中的用户。右侧 **添加用户**、**添加用户组** 选择对象后单击 **新增**。操作列可移除用户。页签内 **更多操作** 可 **删除所选**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_perms_06.png" alt="图 6  用户与用户组" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  用户与用户组</div>

### 5.3 资产/节点

查看并维护本规则中的资产与节点。右侧 **添加资产**、**添加节点** 选择后单击 **新增**，操作列可移除。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_perms_07.png" alt="图 7  资产与节点" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  资产与节点</div>

### 5.4 授权账号

查看本规则授权的账号，可切换 **所有账号**、**指定账号**，并勾选 **虚拟账号**。

### 5.5 活动

**活动** 页签展示该规则最近的操作记录，可按最近 30 次查看。

## 6 克隆与删除

在操作列单击编辑图标可修改规则。单击 **…** 打开更多菜单：

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_perms_08.png" alt="图 8  行内更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  行内更多操作</div>

- **删除**： 删除该授权规则，不可逆。
- **副本**： 克隆为新规则。

## 7 批量操作

勾选规则前的复选框，单击 **更多操作**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_perms_09.png" alt="图 9  批量更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  批量更多操作</div>

可选：

- **删除所选**
- **编辑所选**

:::warning[删除不可恢复]
**删除** 与 **删除所选** 会移除授权规则，操作用户将无法再通过该规则访问对应资产。操作不可逆。
:::
