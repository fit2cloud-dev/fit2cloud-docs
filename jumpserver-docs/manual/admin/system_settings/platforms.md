---
title: 平台列表
---

:::warning[注意: 从 v4.9 开始，JumpServer 平台相关设置已移至系统设置]

:::
## 1 功能概述

- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **平台列表** ，进入平台列表页面。
- 平台列表在创建资产时供选择，用户可以在创建资产时为资产选择不同的系统类型，如Linux、Windows 等。
- 同时可以新建平台类型，并选择指定的基础平台，就可以在创建资产中指定新建的平台类型。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_platforms_1.png" alt="图 1  平台列表页面" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  平台列表页面</div>
## 2 资产平台的创建

- 点击平台列表页面的 **创建** 按钮，填写资产平台的信息即可创建新的资产平台，以 Linux 为例。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_platforms_2.png" alt="图 2  创建资产平台" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建资产平台</div>
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_platforms_3.png" alt="图 3  资产平台详细信息" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  资产平台详细信息</div>


- 详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  资产平台参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'25%', padding:'8px'}}>参数</th><th style={{width:'75%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>名称</td><td style={{padding:'8px'}}>资产平台的名称。</td></tr>
<tr><td style={{padding:'8px'}}>类型</td><td style={{padding:'8px'}}>资产平台的类型，不同的系统类型决定不同的编码与自动化方式。</td></tr>
<tr><td style={{padding:'8px'}}>编码</td><td style={{padding:'8px'}}>资产平台选择的编码方式，可选择"UTF-8"或"GBK"。</td></tr>
<tr><td style={{padding:'8px'}}>启用网域</td><td style={{padding:'8px'}}>是否启用网域，某些类型的平台中不可开启即该平台类型不支持启用网域。</td></tr>
<tr><td style={{padding:'8px'}}>支持的协议</td><td style={{padding:'8px'}}>设置资产平台支持的协议，每个平台中默认的协议不可删除。协议的默认端口号支持修改。</td></tr>
</tbody>
</table>


- 切换账号参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  切换账号参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'25%', padding:'8px'}}>选项</th><th style={{width:'75%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>启用切换账号</td><td style={{padding:'8px'}}>启用切换账号，支持的帐号切换方式有 <code>sudo su -</code>、<code>su -</code>。</td></tr>
<tr><td style={{padding:'8px'}}>不启用切换账号</td><td style={{padding:'8px'}}>不启用切换账号功能。某些资产平台中不支持启用切换账号即表示该资产平台不支持切换账号功能。</td></tr>
</tbody>
</table>



- 自动化参数说明（启用状态），不启用为自动化任务关闭：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  自动化参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'25%', padding:'8px'}}>参数</th><th style={{width:'75%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>Ansible配置</td><td style={{padding:'8px'}}>Ansible 连接等信息配置。一般不进行修改。</td></tr>
<tr><td style={{padding:'8px'}}>启用资产探测</td><td style={{padding:'8px'}}>是否启用资产探测，即获取资产连接性。</td></tr>
<tr><td style={{padding:'8px'}}>资产探测方式</td><td style={{padding:'8px'}}>设置资产的探测方式。</td></tr>
<tr><td style={{padding:'8px'}}>收集资产信息</td><td style={{padding:'8px'}}>是否启用资产信息，即获取资产硬件信息等。</td></tr>
<tr><td style={{padding:'8px'}}>收集信息方式</td><td style={{padding:'8px'}}>设置收集信息的方式。</td></tr>
<tr><td style={{padding:'8px'}}>启用账号改密</td><td style={{padding:'8px'}}>是否启用账号改密。</td></tr>
<tr><td style={{padding:'8px'}}>账号改密方式</td><td style={{padding:'8px'}}>设置账号改密的方式。</td></tr>
<tr><td style={{padding:'8px'}}>启用推送账号</td><td style={{padding:'8px'}}>是否开启推送账号。</td></tr>
<tr><td style={{padding:'8px'}}>推送账号方式</td><td style={{padding:'8px'}}>设置推送账号的方式。账号推送中可更改推送账号的默认参数。</td></tr>
<tr><td style={{padding:'8px'}}>启用校验账号</td><td style={{padding:'8px'}}>是否开启校验账号。</td></tr>
<tr><td style={{padding:'8px'}}>校验账号方式</td><td style={{padding:'8px'}}>设置校验账号的方式。</td></tr>
<tr><td style={{padding:'8px'}}>启用账号收集</td><td style={{padding:'8px'}}>是否启用账号收集功能。</td></tr>
<tr><td style={{padding:'8px'}}>收集账号方式</td><td style={{padding:'8px'}}>设置收集账号的方式。</td></tr>
</tbody>
</table>



## 3 自定义SFTP目录路径

- SFTP 目录的默认路径为 `/tmp` ，支持自定义该目录。
- 点击平台列表页面的 **创建** 按钮，增加SFTP协议后点击配置后方的 **齿轮** 按钮。
- 自定义修改 SFTP 根目录即可。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_platforms_4.png" alt="图 4  自定义 SFTP 目录" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  自定义 SFTP 目录</div>
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_platforms_5.png" alt="图 5  SFTP 根目录配置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  SFTP 根目录配置</div>
