---
title: 标签列表
description: 介绍 JumpServer 控制台中标签的创建、关联资源、编辑与删除。
---

## 1 功能简介

标签用于给资产等资源分类，便于检索和管理。一条标签由 **名称** 和 **值** 组成，可设置颜色。名称可以重复，同一资源可绑定多个标签。

路径：登录后选择 **控制台 > 其它 > 标签列表**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_tags_01.png" alt="图 1  标签列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  标签列表</div>

列表列字段包括名称、值、颜色、资源、创建日期及操作。**资源** 列为已关联资源的数量。

右上角提供搜索、列设置、导出、导入和刷新。**更多操作** 仅 **删除所选**。

## 2 前提条件

- 已使用具备控制台权限的账号登录 JumpServer（如系统管理员或组织管理员）。
- 向资产绑定标签时，目标资产须已存在，或在创建资产时一并选择。资产操作请参见 [资产列表](../assets/assets_list.md)。

## 3 创建标签

1. 在标签列表单击 **创建**。
2. 在右侧抽屉 **创建标签** 中填写信息。
3. 单击 **提交**。若需连续添加，单击 **保存并继续添加**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_tags_02.png" alt="图 2  创建标签" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建标签</div>

- **名称**： 必填。标签类别，如部门、用途。
- **值**： 必填。该类别下的具体内容。
- **颜色**： 列表中的色块，便于区分。
- **备注**： 选填。

## 4 关联资源

绑定方式有三种：在标签上关联、在创建资产时选择、在资产详情中新增。

### 4.1 从标签关联

1. 在列表单击 **资源** 列的数字，打开 **关联资源**，查看已绑定资源。可在该对话框中继续单击 **创建** 添加，或删除已有关联。
2. 也可在行内单击 **更多**，选择 **关联资源**。在对话框中选择 **资源类型**，再从左侧勾选资源到右侧，单击 **确认**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_tags_03.png" alt="图 3  行内更多" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  行内更多</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_tags_04.png" alt="图 4  关联资源" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  关联资源</div>

未选择 **资源类型** 时，可选列表为空。当前示例中标签 `111` 已关联 1 台资产。

### 4.2 创建或编辑资产时绑定

创建资产时，在 **其它设置** 的 **标签** 中选择已有标签。资产详情 **基本设置** 右侧也提供 **标签** 区域，选择后单击 **新增**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v5_admin_tags_05.png" alt="图 5  创建资产时选择标签" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  创建资产时选择标签</div>

:::note[删除标签]
删除标签后，已绑定该标签的资源会去掉对应标签，资源本身不会被删除。
:::

## 5 编辑与删除

行内操作：

- **编辑**： 打开 **更新标签**，字段与创建相同。
- **副本**： 复制为新标签。
- **关联资源**： 见第 4.1 节。
- **删除**： 删除该标签。

勾选多条后，**更多操作 > 删除所选** 可批量删除。
