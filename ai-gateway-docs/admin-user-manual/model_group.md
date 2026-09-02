---
title: 模型组
description: 介绍 1Panel AI 网关模型组的添加、编辑、删除与按协议类型筛选，实现候选模型聚合调度。
---

模型组是 1Panel AI 网关按协议类型聚合候选模型的管理单元。将多个模型归入同一分组后，可通过分组名称统一配置与调度，实现请求按模型顺序自动派发，并在当前模型不可用时自动切换至下一个模型。

> 本文内容基于 1Panel AI 网关实测验证，截图取自测试环境，实时数据以当前网关配置为准。

## 1 功能入口与列表说明

登录 1Panel AI 网关后，在左侧导航栏中选择 **模型组**，进入模型组管理页面。页面以表格形式展示当前已添加的分组，支持按协议类型筛选、添加分组、编辑分组与删除分组等操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image1_Model_Group_Management_Page.png" alt="模型组管理页面"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  模型组管理页面</div>

模型组各字段含义如下所示：
**名称**：代表模型组的名称标识，用于区分不同的模型分组。
**协议类型**：指当前模型分组对应的协议类型，支持文本、文生图、向量三种取值类型。
**模型**：展示该分组内包含的所有候选模型名称，当模型数量较多时，会以「+N」的形式折叠冗余内容，鼠标悬停后即可查看完整的模型列表。
**备注**：用于填写模型分组的补充说明信息，为非必填项，可留空。
**创建时间**：记录当前模型分组的创建时间，用于追溯分组创建记录。
**操作**：针对单个模型组提供操作能力，支持编辑、删除两种基础操作。


## 2 按协议类型筛选

模型组支持按协议类型快速筛选分组。默认展示全部类型，可切换为文本、文生图或向量。

操作步骤：

1. 在模型组列表页左上角打开「全部类型」下拉框。
2. 选择目标协议类型（可选：全部类型、文本、文生图、向量）。
3. 列表自动刷新并仅展示符合条件的分组。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/model_group/image2_Filter_by_Protocol_Type.png" alt="按协议类型筛选"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  按协议类型筛选</div>


## 3 添加分组

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


## 4 编辑分组

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

## 5 删除分组

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

## 6 注意事项

- 分组名称建议简明且唯一，便于在智能路由中识别与引用。
- 一个模型可加入多个分组，按各分组独立调度。
- 调整模型顺序会改变请求派发优先级，建议在业务低峰期调整。
- 删除分组前确认该分组未被路由规则占用，避免影响线上请求。
