---
title: 模型组
description: 介绍 1Panel AI 网关模型组的添加、编辑、删除与按协议类型筛选，实现候选模型聚合调度。
---

## 1 概述

模型组用于将多个模型归入同一分组进行统一管理。系统在调用模型时，通常需要按一定的规则对多个模型进行归类、筛选与调度。通过模型组，操作者可将相近或同类的模型组织在一个分组内，便于集中查看、后续授权与调度配置，避免模型散落在各处难以管理。

模型组与账号池相互配合：账号池管「有哪些账号可用」，模型组则管「有哪些模型可以按组归类使用」。合理的分组有助于提升模型调度的清晰度与可维护性。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image1_Model_Group_Management_Page.png" alt="模型组管理页面"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  模型组管理页面</div>


## 2 按协议类型筛选

模型组支持按协议类型快速筛选分组。默认展示全部类型，可切换为文本、文生图或向量。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image2_Filter_by_Protocol_Type.png" alt="按协议类型筛选"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  按协议类型筛选</div>


## 3 添加分组

通过「添加分组」可将多个候选模型聚合到同一分组，便于统一调度。

操作步骤：

- 在模型组列表页右上角单击 **添加分组**，右侧弹出添加分组抽屉。
- 输入 **名称**（必填），填写分组的名称。
- 选择 **协议类型**，可选文本、文生图、向量。
- 在 **模型** 字段选择候选模型，或在输入框中直接输入新模型名。
- 可选填写 **备注**。
- 单击 **保存** 完成创建。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image3_Add_Group_Form.png" alt="添加分组表单"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  添加分组表单</div>

在「模型」字段单击后，可从候选模型列表中勾选，或输入自定义模型名。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image4_Select_Candidate_Model.png" alt="选择候选模型"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  选择候选模型</div>

## 4 模型组管理

### 4.1 编辑分组

创建分组后可随时调整分组名称、协议类型与候选模型，并调整模型的派发顺序。

操作步骤：

- 在模型组列表中找到目标分组，单击该行 **操作** 列的 **编辑**，右侧弹出编辑分组抽屉。
- 修改 **名称**、**协议类型**、**模型** 或 **备注**。
- 如需调整派发顺序，可通过模型列表中的「上移」「下移」调整候选模型次序。
- 单击 **保存** 应用修改。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image5_Edit_Group_Form.png" alt="编辑分组表单"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  编辑分组表单</div>

:::tip[提示]
分组内请求会按模型顺序进行派发，当前模型派发前不可用时，网关会自动尝试下一个模型。编辑时可通过「上移」「下移」调整优先级。
:::

### 4.2 删除分组

删除分组会移除该分组及其模型映射关系，请谨慎操作。

操作步骤：

- 在模型组列表中找到目标分组，单击该行 **操作** 列的 **删除**。
- 在弹出的确认对话框中核对分组信息。
- 单击 **删除** 确认删除，或单击 **取消** 放弃操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image6_Delete_Group_Confirmation.png" alt="删除分组确认"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  删除分组确认</div>

:::warning[警告]
删除分组为不可逆操作，删除后该分组下配置的模型映射关系将被移除，操作不可恢复。删除前请确认不再使用该分组，且该分组未被路由规则占用。
:::

## 5 注意事项

- 分组名称建议简明且唯一，便于在智能路由中识别与引用。
- 一个模型可加入多个分组，按各分组独立调度。
- 调整模型顺序会改变请求派发优先级，建议在业务低峰期调整。
- 删除分组前确认该分组未被路由规则占用，避免影响线上请求。
