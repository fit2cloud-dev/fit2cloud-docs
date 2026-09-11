---
title: 角色列表
---

:::warning[注意: 从 v4.9 开始，JumpServer 角色相关设置已移至系统设置]

:::
## 1 功能概述

- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **角色列表** ，进入角色列表页面。
- 系统角色默认有系统管理员、系统审计员、用户与系统组件；组织角色默认有组织管理员、组织审计员、组织用户。默认角色不可以进行删除，更新等操作。

## 2 创建角色

- 点击 **角色列表** 页面左侧上方的 **创建** 按钮，进入角色创建页面。
- 系统角色与组织角色均可新建。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v4_role_list_01.png" alt="图 1  创建角色" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  创建角色</div>

- 创建角色成功后，进入新创建的角色详情页，可以对该角色进行权限设置。
- 如下图，右边部分为角色的权限设置。根据需求的权限更新设置后，点击 **更新** 按钮提交。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v4_role_list_02.png" alt="图 2  角色权限设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  角色权限设置</div>

## 3 角色导入/导出

- 角色支持导入创建和已存在角色导出，支持 xlxs 和 cvs 的表格格式。
- 首次导入，可点击 **导入** 按钮下载模板后根据提示填写信息后导入。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v4_role_list_03.png" alt="图 3  角色导入/导出" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  角色导入/导出</div>

## 4 角色详情

- 在 **角色列表** 页面点击角色名称，进入角色详情页面。
- 角色详情页包含的信息包括角色基本信息、角色权限、授权用户以及角色活动记录。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v4_role_list_04.png" alt="图 4  角色详情" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  角色详情</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  角色详情参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'25%', padding:'8px'}}>参数</th><th style={{width:'75%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>基本设置</td><td style={{padding:'8px'}}>基本设置页面显示该角色的详细信息，包括名称、是否内置、创建者等信息</td></tr>
<tr><td style={{padding:'8px'}}>权限</td><td style={{padding:'8px'}}>该选项用来设置当前角色的权限，是否可以使用目前这些功能</td></tr>
<tr><td style={{padding:'8px'}}>授权用户</td><td style={{padding:'8px'}}>该页面用来绑定角色与用户，即给某个用户赋该角色的权限</td></tr>
<tr><td style={{padding:'8px'}}>活动</td><td style={{padding:'8px'}}>该页面显示当前角色的活动记录</td></tr>
</tbody>
</table>

## 5 更新角色

- 当需求对某个角色的信息进行更新时，可在 **角色列表** 页面中，点击角色后方的 **编辑** 按钮进行角色信息更新。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v4_role_list_05.png" alt="图 5  更新角色" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  更新角色</div>

## 6 克隆角色

- 点击角色后方的 **...** 按钮选择 **副本** 按钮，进入角色创建界面，修改相关信息后，提交后修改角色权限即克隆完成。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v4_role_list_06.png" alt="图 6  克隆角色" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  克隆角色</div>

## 7 删除角色

- 系统默认角色不允许删除，非内置角色可进行删除。
- 点击角色后方的 **删除** 按钮，删除角色。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/v4_role_list_07.png" alt="图 7  删除角色" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  删除角色</div>
