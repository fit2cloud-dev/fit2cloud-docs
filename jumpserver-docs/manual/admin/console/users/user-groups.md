---
title: 用户组
description: 介绍 JumpServer 控制台中用户组的创建、导入导出、详情成员管理、克隆与删除。
---

## 1 功能简介

用户组用于对用户分组。资产授权到用户组后，组内用户继承该组权限。一名用户可加入多个用户组。

路径：登录后选择 **控制台 > 用户管理 > 用户组**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_user_groups_01.png" alt="图 1  用户组列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  用户组列表</div>

列表列字段包括名称、用户数量、备注及操作。右上角提供搜索、列设置、导入、导出和刷新。

## 2 前提条件

- 已使用具备用户管理权限的账号登录 JumpServer（如系统管理员或组织管理员）。
- 将用户加入组前，该用户须已存在于当前组织。创建用户请参见 [用户列表](./users.md)。

:::important[组织范围]
当前列表只显示本组织内的用户组。资产授权到组后，仅组内、且已加入本组织的用户会继承权限。
:::

## 3 创建用户组

1. 在用户组列表单击 **创建**。
2. 在右侧抽屉 **创建用户组** 中填写信息。
3. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_user_groups_02.png" alt="图 2  创建用户组" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建用户组</div>

- **名称**： 用户组名称，必填。
- **用户**： 选择加入该组的用户，可在创建后再于详情中维护。
- **备注**： 选填。

## 4 导入与导出

列表右上角工具栏提供导入和导出。

导入时单击上传图标，打开 **导入 & 创建** 对话框：

1. 选择 **创建** 或 **更新**。
2. 首次导入可单击 **CSV** 或 **XLSX** 下载创建模板，按提示填写后再上传。
3. 将文件拖到虚线框内，或单击虚线框选择本地文件。仅支持 csv / xlsx，且不超过 10M。
4. 单击 **取消** 可关闭对话框；选择文件后按界面提示完成导入。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_user_groups_03.png" alt="图 3  导入用户组" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  导入用户组</div>

导出时单击下载图标，在 **导出** 对话框中选择：

- **文件类型**： CSV 或 Excel。
- **导出范围**： 导出所有、仅导出选择项、仅导出搜索结果。

确认后下载文件。

:::note[模板先行]
首次导入请先下载创建模板，按列填写后再上传，避免字段不匹配导致失败。
:::

## 5 用户组详情

在列表中单击用户组 **名称**，打开详情抽屉。页签包括 **基本设置**、**用户列表**、**活动**。右上角可 **编辑** 或 **删除**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_user_groups_04.png" alt="图 4  用户组详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  用户组详情</div>

### 5.1 基本设置

**基本信息** 展示：

- **ID**： 用户组唯一标识。
- **名称**： 用户组名称。
- **标签**： 未设置时显示为空。
- **组织名称**： 所属组织。
- **创建日期**： 创建时间。
- **备注**： 未填写时显示为 `-`。
- **创建者**： 未记录时显示为 `-`。

### 5.2 用户列表

选择 **用户列表** 页签，查看并维护组成员。左侧为已加入该组的用户；右侧 **成员** 区域可选择用户后单击 **新增**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_user_groups_05.png" alt="图 5  用户组成员" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  用户组成员</div>

### 5.3 活动

**活动** 页签展示该用户组最近的操作记录（如查看、更新），可按最近 30 次查看。

## 6 更新用户组

在列表操作列单击编辑图标，或在详情右上角单击 **编辑**，打开 **更新用户组**。修改名称、用户或备注后单击 **提交**；单击 **还原** 可放弃未保存的修改。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_user_groups_06.png" alt="图 6  更新用户组" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  更新用户组</div>

## 7 克隆与删除

在操作列单击 **…**，可选择：

- **删除**： 从当前组织删除该用户组，不可逆。
- **副本**： 克隆为新用户组，修改差异项后提交。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_user_groups_07.png" alt="图 7  行内更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  行内更多操作</div>

## 8 批量操作

勾选用户组前的复选框，单击 **更多操作**，可选择 **删除所选**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_user_groups_08.png" alt="图 8  批量更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  批量更多操作</div>

## 9 注意事项

:::warning[删除不可恢复]
**删除** 与 **删除所选** 会移除用户组数据，操作不可逆。删除用户组不会同步删除组内用户账号。
:::
