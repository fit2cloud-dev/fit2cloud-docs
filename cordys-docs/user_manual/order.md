---
title: 销售订单管理
---

## 1 订单新建


在左侧菜单点击【订单】，即可进入订单新建页面。

![创建订单](/img/cordys/user_manual/ordercreate.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  创建订单</div>


**提示**：订单表单、订单状态流可以根据公司业务特性在表单设置中进行自定义。

![订单配置](/img/cordys/user_manual/ordersetings.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  订单配置</div>

![订单流配置](/img/cordys/user_manual/orderflow-setings.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  订单流配置</div>


**订单表格-数据源字段**：

- 订单表格内置产品数据源字段和价格表数据源字段
- 数据过滤：设置数据过滤规则，根据规则展示产品列表
- 显示字段：设置选择产品时，同步显示关联的字段，依次展示在表格列中

**订单表格-产品定价的三种配置方式**：

- 在订单表中添加”产品定价“自定义字段，手动录入产品价格
- 在产品模块中维护产品价格，通过产品数据源的显示字段属性，勾选产品定价带入到当前表格展示
- 在订单表中维护产品价格，通过价格表数据源的显示字段属性，勾选产品定价带入到当前表格展示，根据选择的产品动态获取价格

**订单表格-计算（金额）字段**：

- 选择当前表格可参与计算的字段（数字类型）
- 通过运算符组合成完整公式

![订单产品表单配置](/img/cordys/user_manual/orderproduct-setings.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  订单产品表单配置</div>

![订单表单金额配置](/img/cordys/user_manual/orderamount-setings.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  订单表单金额配置</div>

## 2 订单详情


点击订单名称，进入订单详情页面，用户可根据订单跟进情况修改订单状态。

![订单流](/img/cordys/user_manual/orderflow.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  订单详情</div>

## 3 状态流高级流转配置


涉及页面：合同阶段、订单状态。

### 3.1 订单状态流交互变更


- 原有交互拆分为状态配置和流转配置

![订单流](/img/cordys/user_manual/zhuangtailiu1.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  订单流</div>

### 3.2 流转配置


流转配置支持基础流转和高级流转功能

- 原状态回退配置变更为基础流转，逻辑不变。
- 基础流转和高级流转为单选功能，若切换模式，则流转规则以选中的模式生效。
    - 切换模式需二次确认：“切换模式后，当前模式配置将丢失，切换后的模式将成为生效规则，是否确认切换？”。

![订单流](/img/cordys/user_manual/zhuangtailiu2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  订单流</div>

### 3.3 高级流转


高级流转：对不同状态之间的流转规则进行灵活配置。

- 采用“行 - 列”矩阵式布局，行代表 **源状态** ，列代表 **目标状态** ，单元格为流转权限配置项。
    - 源状态列获取已配置的订单状态：新建、待发货、申请发货、部分发货、已发货、待验货、已完成、已作废。
    - 目标状态列与源状态保持一致，覆盖所有订单状态。
- 每个矩阵单元格包含一个复选框，勾选则表示允许从对应源状态流转至目标状态，取消勾选则禁止该流转路径。
- 系统默认规则
    - 每个源状态默认允许流转至自身（如“从【新建】可流转到【新建】”默认勾选）， **不支持用户取消** 勾选。
- 每个已勾选的流转路径右侧提供设置图标（⚙️），点击后弹出“流转配置”弹窗。

![订单流](/img/cordys/user_manual/zhuangtailiu3.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  订单流</div>

### 3.4 流转配置弹窗


流转配置弹窗：设置流转的附件字段。

- 展示源状态至目标状态名
- 填写内容为表单字段，可设置字段的默认值以及是否要求必填
    - 注意：这里的必填与表单字段的必填校验无关， 仅要求流转状态时必填
    - 支持的字段类型：基础字段（除分割线）、高级字段（除子表格、计算、公式、流水号）**(过滤不可编辑/附件/图片字段)**
- 默认值类型：
    - 字段值：默认值输入框为字段值，不允许修改（指配置时）
    - 固定值：可以自定义默认值
        - 选项类型的字段，固定值为选择项
- 支持删除配置行。

![订单流](/img/cordys/user_manual/zhuangtailiu4.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  订单流</div>


空状态：

![订单流](/img/cordys/user_manual/zhuangtailiu5.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  订单流</div>
![订单流](/img/cordys/user_manual/zhuangtailiu6.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  订单流</div>

### 3.5 流转状态


切换状态时判断是否有编辑权限：

- 无权限，禁止操作。
- 有编辑权限则获取当前切换状态是否为可流转状态：
    - 非可流转状态，hover提示““待发货”不允许流转至“申请发货”，请联系管理员进行流转配置”。
    - 是可流转状态，则弹出窗口获取流转配置的字段，一个字段一行，可修改（示例：联系人电话、收货地址（必填）），流转必填项需校验必填；未配置流转配置字段则直接切换状态成功。
        - 注：字段默认值为字段值，则展示该字段的实际值；字段默认为固定值则展示配置的固定值，均可修改。

![订单流](/img/cordys/user_manual/zhuangtailiu7.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  订单流</div>