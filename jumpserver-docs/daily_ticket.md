---
title: 日常工单
---


- JumpServer 的 **日常工单** 功能负责授权工单的申请与审核，覆盖资产授权、命令过滤与资产登录等场景，并支持二级审批流程。用户发起授权申请，经设置的审批人审批通过后，即可获得所申请资产的权限。

## 1 启用工单

- 管理员点击页面右上角小齿轮进入 **系统设置** 页面，点击 **功能设置 &gt; 工单**，进入工单设置页面。
- 可以自定义是否启用工单功能，启用后用户即可通过工单来申请资源授权。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_feature3.png" alt="图 1  工单设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  工单设置</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_feature4.png" alt="图 2  启用工单效果" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  启用工单效果</div>

## 2 申请工单

- 普通用户进入 **工单** 页面的 **我发起的** 页签，该页面用于查看由当前用户创建的工单详情记录，并可发起新的工单申请。
- 点击 **申请工单** 按钮，填写工单的标题、组织、节点、资产、申请账号、操作以及权限期限等信息后提交。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/workorder01.png" alt="图 3  申请工单" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  申请工单</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/workorder02.png" alt="图 4  申请工单信息" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  申请工单信息</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  申请工单参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'28%', padding:'8px'}}>参数</th><th style={{width:'72%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>标题</td><td style={{padding:'8px'}}>该工单的标题。</td></tr>
<tr><td style={{padding:'8px'}}>组织</td><td style={{padding:'8px'}}>该工单所申请的权限以及 JumpServer 用户所处的组织。</td></tr>
<tr><td style={{padding:'8px'}}>节点</td><td style={{padding:'8px'}}>JumpServer 用户申请的资产，节点指申请整个节点下所有资产的权限。</td></tr>
<tr><td style={{padding:'8px'}}>资产</td><td style={{padding:'8px'}}>JumpServer 用户申请的资产。</td></tr>
<tr><td style={{padding:'8px'}}>申请账号</td><td style={{padding:'8px'}}>JumpServer 用户申请的资产所使用的登录账号。</td></tr>
<tr><td style={{padding:'8px'}}>操作</td><td style={{padding:'8px'}}>JumpServer 用户申请拥有的动作权限。</td></tr>
<tr><td style={{padding:'8px'}}>开始日期、失效日期</td><td style={{padding:'8px'}}>用户申请的权限使用的期限。</td></tr>
</tbody>
</table>

## 3 查看工单

- 点击创建好的工单标题，可进入工单详情页。工单详情页中包含该工单的基本信息、申请信息以及审批人，同时该页面可以与审批人进行对话。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/workorder03.png" alt="图 5  查看工单" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  查看工单</div>

## 4 取消工单

- 在工单详情页可以手动取消工单。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/workorder04.png" alt="图 6  取消工单" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  取消工单</div>

## 5 审批工单

- 审批人在 **待我审批** 页面点击工单名称，对工单进行查阅审批。审批人查看工单时，可修改申请人申请的资产、账号、操作等权限。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/workorder05.png" alt="图 7  审批工单" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  审批工单</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/workorder06.png" alt="图 8  审批工单详情" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  审批工单详情</div>

- 除了在 JumpServer 页面进行审批外，JumpServer 还支持企业微信、钉钉直接审批工单信息。当审批人绑定企业微信或钉钉后，可实时在企业微信或钉钉上对申请人的工单进行审批。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/workorder07.png" alt="图 9  企业微信钉钉审批" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  企业微信钉钉审批</div>

## 6 工单审计

- 审计员进入 **审计台** 页面，点击 **会话审计 &gt; 工单列表**，进入工单列表页面。
- 工单列表页可以查看系统用户提交的工单列表，点击对应的工单标题可以查看工单详情。
- 工单详情页可以查看工单的详细信息，包括工单标题、工单内容、工单状态、工单处理人、工单创建时间等。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/ticket_audit01.png" alt="图 10  工单列表" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  工单列表</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/ticket_audit02.png" alt="图 11  工单详情" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  工单详情</div>
