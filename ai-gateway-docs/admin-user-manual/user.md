---
title: 用户
description: 介绍 1Panel AI 网关用户管理，包括添加用户、启用禁用、重置密码、解锁与唯一管理员保护。
---

## 1 概述

用户页面用于管理系统内可登录使用平台的账号。通过用户页面，可集中查看系统全部用户账号，以及各用户的角色、所属用户组、账号状态等信息；为平台使用人员新建登录账号并指定其所属用户组；当用户遗忘密码或需更新登录凭证时重置账号登录密码；修改已有用户的用户名、所属用户组等配置信息；同时可对不再需要访问平台的账号执行停用或删除操作，管控平台访问权限。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/user/image1_user_list.png" alt="用户管理页面"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  用户管理页面</div>

## 2 用户管理

### 2.1 用户添加

在用户管理页面左上角单击 **添加用户** 按钮，系统会从右侧滑出「添加用户」抽屉。抽屉按从上到下的顺序依次提供 用户名、用户组、新密码、确认新密码 四个必填项。

- **用户名**：设置用户的登录账号名。
- **密码**：为用户设置初始登录密码，请按要求设置强度足够的密码。
- **确认密码**：再次输入密码进行确认，两次输入需保持一致。
- **用户组**：选择该用户所属的用户组（如默认组、技术组、研发组、运营组等），用于确定其权限与资源范围。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/user/image2_add_user_form.png" alt="添加用户表单"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  添加用户表单</div>

在用户列表的操作列，每个普通用户账号均提供 **启用/禁用 开关、 重置密码、 编辑、 删除** 四类操作，单击对应控件即可对账号进行维护。受账号当前状态影响，操作列会动态显示不同控件：被锁定的账号额外出现 解锁，受唯一管理员保护的账号则不显示危险操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/user/image3_row_actions.png" alt="用户行内操作"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  用户行内操作</div>

### 2.2 用户启用/禁用

操作列最左侧的开关用于切换账号的启用状态。**禁用** 后的普通用户：

- 其已建立的浏览器会话会被立即删除；
- 该账号下已签发的 API Key 停止接受调用，避免停用账号继续被使用。

重新启用后，账号可正常登录并恢复 API Key 调用。

### 2.3 用户编辑

单击 **编辑** 打开编辑页面。普通用户可调整所属用户组；用户名、创建时间等基础信息保持不变。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/user/image4_edit_page.png" alt="编辑页面"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  编辑页面</div>

### 2.4 用户重置密码

单击 **重置密码** 打开重置密码抽屉。管理员可设置新的登录密码，确认后保存

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/user/image5_reset_password_page.png" alt="重置密码页面"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  重置密码页面</div>

### 2.5 唯一管理员保护

当系统内仅剩一名管理员账号时，该账号会被唯一管理员规则保护：

- 不可被**禁用**。
- 不可被**重置**为普通用户。
- 不可执行任何会导致**无管理员可登录**状态的操作。
- 不显示**重置密码、编辑、删除**控件。

只有当系统内出现其他管理员后，该限制才会解除，账号恢复常规操作。

## 3 注意事项

- **密码安全**：设置或重置密码时，请使用强度足够的密码，并提醒用户妥善保管、定期更换。

- **谨慎删除**：删除为不可逆操作，确认用户账号不再被使用后再执行。

- **正确分配用户组**：用户组决定用户的权限范围，添加或编辑时请确保归属正确，避免越权或权限不足。
