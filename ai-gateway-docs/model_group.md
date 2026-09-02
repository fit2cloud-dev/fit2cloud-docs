---
title: 模型组
description: 介绍 1Panel AI 网关模型组的添加、编辑、删除与按协议类型筛选，实现候选模型聚合调度。
---

模型组是 1Panel AI 网关按协议类型聚合候选模型的管理单元。将多个模型归入同一分组后，可通过分组名称统一配置与调度，实现请求按模型顺序自动派发，并在当前模型不可用时自动切换至下一个模型。

> 本文内容基于 1Panel AI 网关实测验证，截图取自测试环境，实时数据以当前网关配置为准。

## 1 前提条件

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  前提条件说明</div>

| 项目 | 说明 |
|---|---|
| 产品版本 | 1Panel AI 网关 |
| 访问方式 | 浏览器访问网关 Web 管理地址，并已登录账号 |
| 所需权限 | 拥有可访问「模型组」菜单的管理员账号 |
| 前置配置 | 已在「智能路由」中配置模型供应商与模型账号 |

## 2 功能入口与列表说明

登录 1Panel AI 网关后，在左侧导航栏中选择 **模型组**，进入模型组管理页面。页面以表格形式展示当前已添加的分组，支持按协议类型筛选、添加分组、编辑分组与删除分组等操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image1_Model_Group_Management_Page.png" alt="模型组管理页面"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  模型组管理页面</div>

列表各列含义如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  模型组列表字段说明</div>

| 列名 | 说明 |
|---|---|
| 名称 | 模型组的名称 |
| 协议类型 | 分组对应的协议类型，取值包括文本、文生图、向量 |
| 模型 | 分组内包含的候选模型名称；数量较多时以「+N」折叠展示，鼠标悬停可查看完整列表 |
| 备注 | 分组的备注信息，可为空 |
| 创建时间 | 分组的创建时间 |
| 操作 | 提供「编辑」与「删除」操作按钮 |

## 3 按协议类型筛选

模型组支持按协议类型快速筛选分组。默认展示全部类型，可切换为文本、文生图或向量。

操作步骤：

1. 在模型组列表页左上角打开「全部类型」下拉框。
2. 选择目标协议类型（可选：全部类型、文本、文生图、向量）。
3. 列表自动刷新并仅展示符合条件的分组。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image2_Filter_by_Protocol_Type.png" alt="按协议类型筛选"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  按协议类型筛选</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  协议类型选项说明</div>

| 选项 | 说明 |
|---|---|
| 全部类型 | 展示所有分组（默认） |
| 文本 | 仅展示协议类型为文本的分组 |
| 文生图 | 仅展示协议类型为文生图的分组 |
| 向量 | 仅展示协议类型为向量的分组 |

## 4 添加分组

通过「添加分组」可将多个候选模型聚合到同一分组，便于统一调度。

操作步骤：

1. 在模型组列表页右上角单击 **添加分组**，右侧弹出添加分组抽屉。
2. 输入 **名称**（必填），填写分组的名称。
3. 选择 **协议类型**，可选文本、文生图、向量。
4. 在 **模型** 字段选择候选模型，或在输入框中直接输入新模型名。
5. 可选填写 **备注**。
6. 单击 **保存** 完成创建。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image3_Add_Group_Form.png" alt="添加分组表单"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  添加分组表单</div>

在「模型」字段单击后，可从候选模型列表中勾选，或输入自定义模型名。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image4_Select_Candidate_Model.png" alt="选择候选模型"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  选择候选模型</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  添加分组字段说明</div>

| 字段 | 必填 | 说明 |
|---|---|---|
| 名称 | 是 | 分组名称，用于标识分组 |
| 协议类型 | 是 | 分组协议类型，可选文本、文生图、向量 |
| 模型 | 是 | 分组包含的候选模型，可从列表选择或输入新模型名 |
| 备注 | 否 | 分组的补充说明 |

## 5 编辑分组

创建分组后可随时调整分组名称、协议类型与候选模型，并调整模型的派发顺序。

操作步骤：

1. 在模型组列表中找到目标分组，单击该行 **操作** 列的 **编辑**，右侧弹出编辑分组抽屉。
2. 修改 **名称**、**协议类型**、**模型** 或 **备注**。
3. 如需调整派发顺序，可通过模型列表中的「上移」「下移」调整候选模型次序。
4. 单击 **保存** 应用修改。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image5_Edit_Group_Form.png" alt="编辑分组表单"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  编辑分组表单</div>

:::tip[提示]
分组内请求会按模型顺序进行派发，当前模型派发前不可用时，网关会自动尝试下一个模型。编辑时可通过「上移」「下移」调整优先级。
:::

## 6 删除分组

删除分组会移除该分组及其模型映射关系，请谨慎操作。

操作步骤：

1. 在模型组列表中找到目标分组，单击该行 **操作** 列的 **删除**。
2. 在弹出的确认对话框中核对分组信息。
3. 单击 **删除** 确认删除，或单击 **取消** 放弃操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image6_Delete_Group_Confirmation.png" alt="删除分组确认"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  删除分组确认</div>

:::warning[警告]
删除分组为不可逆操作，删除后该分组下配置的模型映射关系将被移除，操作不可恢复。删除前请确认不再使用该分组，且该分组未被路由规则占用。
:::

## 7 注意事项

- 分组名称建议简明且唯一，便于在智能路由中识别与引用。
- 一个模型可加入多个分组，按各分组独立调度。
- 调整模型顺序会改变请求派发优先级，建议在业务低峰期调整。
- 删除分组前确认该分组未被路由规则占用，避免影响线上请求。
