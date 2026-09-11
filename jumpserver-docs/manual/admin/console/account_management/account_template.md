---
title: 账号模板
description: 介绍 JumpServer 控制台中账号模版的创建、导入导出、详情账号同步、克隆与删除。
---

## 1 功能简介

账号模版用于保存一组可复用的资产账号信息。多台资产使用相同用户名和密文时，可先创建模版，再在账号列表中 [模版添加](./account_list.md)，或在授权时选择模版，避免逐台重复填写。

路径：登录后选择 **控制台 > 账号管理 > 账号模版**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_account_tpl_01.png" alt="图 1  账号模版列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  账号模版列表</div>

页面标题为 **账号模版列表**。列字段包括名称、用户名、密文类型、特权账号及操作。右上角提供搜索、列设置、导入、导出和刷新。

## 2 前提条件

- 已使用具备账号管理权限的账号登录 JumpServer（如系统管理员或组织管理员）。
- 通过模版向资产添加账号前，目标资产须已存在。创建资产请参见 [资产列表](../assets/assets_list.md)。

:::important[组织范围]
当前列表只显示本组织内的账号模版。
:::

## 3 创建账号模版

1. 在账号模版列表单击 **创建**。
2. 在右侧抽屉 **创建账号模版** 中填写信息。
3. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_account_tpl_02.png" alt="图 2  创建账号模版" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建账号模版</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建账号模版字段说明</div>

| 分组 | 字段 | 说明 |
| --- | --- | --- |
| 基本设置 | 名称 | 必填。模版显示名。 |
| 基本设置 | 用户名 | 登录资产所用用户名。认证不需要用户名时可填写 `null`；AD 账号格式为 `username@domain`。 |
| 基本设置 | 特权账号 | 勾选后，批量改密、推送等操作可优先使用该账号。 |
| 基本设置 | 切换自 | 从此账号切换到模版账号，单击 **选择** 指定来源。 |
| 密码 | 密文类型 | **密码**、**SSH 密钥**、**SSH 证书**、**令牌** 或 **访问密钥**。 |
| 密码 | 密文策略 | 账号创建时的密码生成策略。**指定** 为手动填写密码；**随机生成** 按密码规则生成。 |
| 密码 | 密码 | 密文策略为 **指定** 时填写。可单击生成按钮随机生成后写入。 |
| 密码 | 密码规则 | 密文策略为 **随机生成** 时出现。单击 **设置** 配置生成规则。 |
| 自动推送 | 自动推送 | 勾选后自动将账号推送到资产。 |
| 其它设置 | 备注 | 选填。 |

选择 **随机生成** 后，单击 **设置**，打开 **密码规则**：

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_account_tpl_03.png" alt="图 3  密码规则" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  密码规则</div>

- **长度**： 生成密码的位数，默认 16。
- **大写字母**： 是否包含大写字母。
- **小写字母**： 是否包含小写字母。
- **数字**： 是否包含数字。
- **特殊字符**： 是否包含特殊字符。
- **排除字符**： 生成时排除的字符，选填。

单击 **确认** 保存规则，或单击 **取消** 关闭对话框。

## 4 导入与导出

列表右上角工具栏提供导入和导出。

导入时单击上传图标，打开 **导入 & 创建** 对话框：

1. 选择 **创建** 或 **更新**。
2. 首次导入可单击 **CSV** 或 **XLSX** 下载创建模板，按提示填写后再上传。
3. 将文件拖到虚线框内，或单击虚线框选择本地文件。仅支持 csv / xlsx，且不超过 10M。
4. 单击 **取消** 可关闭对话框。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_account_tpl_04.png" alt="图 4  导入账号模版" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  导入账号模版</div>

:::note[模板先行]
首次导入请先下载创建模板，按列填写后再上传，避免字段不匹配导致失败。
:::

## 5 账号模版详情

在列表中单击模版 **名称**，打开详情抽屉。标题为「账号模版: 名称」。页签包括 **基本设置**、**账号**、**活动**。右上角可 **编辑** 或 **删除**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_account_tpl_05.png" alt="图 5  账号模版详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  账号模版详情</div>

### 5.1 基本设置

左侧 **基本信息** 展示 ID、名称、用户名、密文类型、自动推送、密文策略、创建者、备注、切换自、激活、创建日期、更新日期等。

右侧 **快速更新** 可打开或关闭 **特权的**。

### 5.2 账号

**账号** 页签展示通过该模版创建的账号。页面提示：账号列表展示通过模版创建的账号。更新密文时，会更新通过模版所创建账号的密文。

列字段包括名称、资产、密文类型、激活、创建日期及操作。右侧 **快速更新** 可单击 **同步**，同步更新账号信息。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_account_tpl_06.png" alt="图 6  模版关联账号" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  模版关联账号</div>

尚未用该模版添加账号时，列表显示暂无数据。向资产添加账号请参见 [账号列表](./account_list.md) 中的 **模版添加**。

### 5.3 活动

**活动** 页签展示该模版最近的操作记录，可按最近 30 次查看。

## 6 克隆与删除

在操作列单击编辑图标可修改模版。单击 **…** 打开更多菜单：

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_account_tpl_07.png" alt="图 7  行内更多操作" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  行内更多操作</div>

- **删除**： 删除该模版，不可逆。
- **副本**： 克隆为新模版。
- **查看**： 打开详情。

:::warning[删除不可恢复]
**删除** 会移除账号模版数据，操作不可逆。
:::
