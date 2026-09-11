---
title: 资产列表
description: 介绍 JumpServer 控制台中资产的节点管理、创建、导入导出、云同步、详情、账号与批量操作。
---

## 1 功能简介

资产列表用于纳管主机、网络设备、数据库、云服务、Web、目录服务及自定义类型资产，支持按节点分组、创建、导入导出、云同步、测试连接性以及维护账号。

路径：登录后选择 **控制台 > 资产管理 > 资产列表**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_01.png" alt="图 1  资产列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  资产列表</div>

顶部类型页签包括 **全部**、**主机**、**网络设备**、**数据库**、**云服务**、**Web**、**目录服务**、**自定义类型**。在 **全部** 页签下，左侧显示 **节点树**；切换到具体类型后，节点树收起，列表按该类型过滤。

**全部** 列表列字段包括名称、地址、账号数量、平台、上次登录时间、连接性及操作。

## 2 前提条件

- 已使用具备资产管理权限的账号登录 JumpServer（如系统管理员或组织管理员）。
- 创建资产前，建议先规划节点；跨网段访问时先准备网域。Web 类型资产还须配置远程应用发布机，详见 [Web 资产](./web_assets.md)。

:::important[组织范围]
当前列表只显示本组织内的资产。节点与授权也按当前组织生效。
:::

## 3 节点树

在 **全部** 页签中，左侧 **节点树** 按节点组织资产。同一资产可属于多个节点，便于按项目、协议等维度授权。根节点名称不可重复。

在节点上右键，可执行：

- **创建节点**： 在当前节点下新建子节点。
- **重命名节点**： 修改节点名称。
- **删除节点**： 删除当前节点。
- **查看节点**： 查看节点信息。
- **添加资产到节点**： 将其他节点的资产加入当前节点，原节点中仍保留。
- **移动资产到节点**： 将资产改到当前节点，并从原节点移除。
- **从节点移除资产**： 从当前节点去掉资产，不删除资产本身。
- **更新节点资产硬件信息**： 对当前节点资产发起收集硬件信息的任务。
- **测试资产节点可连接性**： 对当前节点资产发起连通性测试。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_02.png" alt="图 2  节点右键菜单" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  节点右键菜单</div>

树栏还提供搜索与更多操作。节点旁的数字为该节点下的资产数量。

## 4 资产类型与选择平台

类型页签用于按类别查看资产。创建时先选择平台：单击 **创建**，打开 **选择平台**。平台按 **主机**、**网络设备**、**数据库**、**目录服务**、**云服务**、**Web**、**自定义类型** 分组；主机下包含 Linux、Windows、Unix 等平台，以及环境中已自定义的平台。右上角可单击 **管理平台** 维护平台。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_03.png" alt="图 3  选择平台" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  选择平台</div>

Web 类型资产的配置说明见 [Web 资产](./web_assets.md)。

## 5 创建资产

以下以 Linux 主机为例。

1. 在资产列表单击 **创建**。
2. 在 **选择平台** 中单击 **Linux**。
3. 在 **创建资产** 抽屉中填写信息。
4. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_04.png" alt="图 4  创建 Linux 资产" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  创建 Linux 资产</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建资产字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。资产在 JumpServer 中的显示名，不可重名，与操作系统计算机名无关。 |
| 基本设置 | IP/主机 | 必填。资产地址，支持域名或 IP，允许重复。 |
| 基本设置 | 平台 | 创建时所选平台，示例为 Linux。 |
| 基本设置 | 节点 | 必填。资产所属节点。 |
| 协议 | 协议 | 访问协议与端口。Linux 默认可包含 ssh / 22、sftp / 22，可增减。 |
| 账号 | 账号 | 可单击 **新增** 或 **模版添加**，在创建时绑定登录账号。 |
| 其它设置 | 网域 | 跨网段时选择网域作为代理。 |
| 其它设置 | 标签 | 选填，便于筛选。 |
| 其它设置 | 激活中 | 勾选后资产可被使用。 |
| 其它设置 | 备注 | 选填。会在 Luna 的用户授权资产树中悬浮显示，请勿填写敏感信息。 |

:::important[协议受平台限制]
资产可用的协议由平台决定。单击协议行的设置可查看协议参数；若要变更协议能力，须更新对应平台。
:::

## 6 导入与导出

列表右上角工具栏提供导入和导出。

导入时单击上传图标，打开 **导入 & 创建** 对话框：

1. 选择 **创建** 或 **更新**。
2. 首次导入可单击 **CSV** 或 **XLSX** 下载创建模板，按提示填写后再上传。
3. 将文件拖到虚线框内，或单击虚线框选择本地文件。仅支持 csv / xlsx，且不超过 10M。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_05.png" alt="图 5  导入资产" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  导入资产</div>

:::note[模板先行]
首次导入请先下载创建模板，按列填写后再上传，避免字段不匹配导致失败。
:::

## 7 云同步

在 **主机** 页签，工具栏提供 **云同步**，用于从云平台同步主机。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_06.png" alt="图 6  主机页签与云同步" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  主机页签与云同步</div>

1. 选择 **主机** 页签，单击 **云同步**，进入 **主机 - 云同步**。
2. 页签包括 **云平台账号**、**同步策略**、**同步实例列表**。
3. 在 **云平台账号** 单击 **创建**，可选择 **公有云**、**私有云** 或 **局域网**，填写账号后保存。
4. 在 **同步策略** 单击 **创建**，按界面填写策略后提交。
5. 同步完成后，在 **同步实例列表** 查看结果，再到资产列表确认主机已入库。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_07.png" alt="图 7  云同步创建账号" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  云同步创建账号</div>

:::note[先建云账号]
尚未配置云平台账号时，**云平台账号** 与 **同步实例列表** 为空。须先创建账号，再执行同步。
:::

## 8 资产详情

在列表中单击资产 **名称**，打开详情抽屉。页签包括 **基本设置**、**账号**、**授权用户**、**会话记录**、**命令记录**、**活动**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_08.png" alt="图 8  资产详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  资产详情</div>

### 8.1 基本设置

左侧 **基本信息** 展示 ID、名称、类别、类型、地址、平台、协议、网域、目录服务、是否激活、创建日期、更新日期、创建者、备注。

右侧 **快速更新**：

- **激活**： 打开或关闭该资产。
- **更新硬件信息**： 单击 **刷新**。
- **测试资产可连接性**： 单击 **测试**。

**节点** 区域可选择节点后单击 **新增**，或移除已关联节点。**标签** 区域可选择标签后单击 **新增**。

### 8.2 账号

**账号** 页签列出绑定在该资产上的账号。可按最近发现、风险账号等条件筛选，并单击 **创建** 或 **账号模版** 添加账号。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_09.png" alt="图 9  资产账号" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  资产账号</div>

### 8.3 授权用户、会话与活动

- **授权用户**： 查看已授权到该资产的用户；右侧可查看用户组。
- **会话记录**： 该资产上的会话。
- **命令记录**： 该资产上执行过的命令。
- **活动**： 最近 30 次操作记录，如登录、更新、连通性测试。

## 9 更新资产

在列表操作列单击编辑图标，打开 **更新资产**。字段与创建类似；账号须单击 **在资产详情中更新账号信息** 前往详情维护。修改后单击 **提交**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_10.png" alt="图 10  更新资产" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  更新资产</div>

## 10 行内更多操作

在操作列单击 **…**：

- **删除**： 删除该资产，不可逆。
- **副本**： 克隆为新资产。
- **测试**： 测试该资产可连接性。
- **新增账号**： 直接为该资产添加账号。
- **账号发现**： 对该资产发起账号发现任务。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_11.png" alt="图 11  行内更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  行内更多操作</div>

选择 **新增账号** 后，在 **AddAccount** 抽屉填写：

- **名称**、**用户名**： 账号显示名与登录名。
- **特权账号**： 勾选后作为特权账号。
- **切换自**： 可选切换来源账号。
- **密文类型**： 密码、SSH 密钥 或 SSH 证书。
- **可改密**、**立即推送**、**激活**、**备注**。

单击 **确认** 保存，或单击 **还原** 放弃未保存修改。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_13.png" alt="图 12  新增账号" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  新增账号</div>

## 11 批量操作

勾选资产前的复选框，单击 **更多操作**：

- **测试所选**
- **禁用所选**
- **激活所选**
- **编辑所选**
- **删除所选**

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_assets_12.png" alt="图 13  批量更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  批量更多操作</div>

## 12 注意事项

:::warning[删除不可恢复]
**删除** 与 **删除所选** 会移除资产数据，操作不可逆。从节点去掉资产请用 **从节点移除资产**，以免误删。
:::
