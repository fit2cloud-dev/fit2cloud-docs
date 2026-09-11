---
title: 远程应用
---

:::warning[注：社区版仅支持 Web GUI 方式使用远程应用，本地客户端连接方式(MSTSC)为企业版功能。]

:::
## 1 功能概述

- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **远程应用** ，进入远程应用页面。
- 远程应用（RemoteApp）功能是微软在 Windows Server 2008之后，在其系统中集成的一项服务功能，使用户可以通过远程桌面访问远端的桌面与程序，客户端本机无须安装系统与应用程序的情况下也能正常使用远端发布的各种的桌面与应用。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_RemoteApp1.png" alt="图 1  远程应用页面" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  远程应用页面</div>

## 2 应用发布机

- RemoteApp 功能需准备应用发布机环境来进行支持。
- 应用发布机是用来运行 Web 页面资产或者使用远程应用 Navicat 连接数据的程序运行主体。

### 2.1 系统要求

- 应用发布机的具体系统要求如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  应用发布机系统要求</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>配置项目</th><th style={{width:'30%', padding:'8px'}}>最低要求</th><th style={{width:'50%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>操作系统</td><td style={{padding:'8px'}}>Windows Server 2019</td><td style={{padding:'8px'}}>推荐使用 Windows Server 2019</td></tr>
<tr><td style={{padding:'8px'}}>CPU</td><td style={{padding:'8px'}}>4 核心</td><td style={{padding:'8px'}}>至少 4 个 CPU 核心</td></tr>
<tr><td style={{padding:'8px'}}>内存</td><td style={{padding:'8px'}}>8 GB</td><td style={{padding:'8px'}}>至少 8 GB RAM</td></tr>
<tr><td style={{padding:'8px'}}>远程管理协议</td><td style={{padding:'8px'}}>WinRM 或 OpenSSH</td><td style={{padding:'8px'}}>需要安装并正确配置其中一种协议</td></tr>
<tr><td style={{padding:'8px'}}>RDS 许可证</td><td style={{padding:'8px'}}>已安装并激活</td><td style={{padding:'8px'}}>远程桌面服务许可证必须有效，Windows Server 默认试用 120 天</td></tr>
<tr><td style={{padding:'8px'}}>网络连接</td><td style={{padding:'8px'}}>能够通过网络访问 JumpServer 服务(HTTPS/HTTPS)</td><td style={{padding:'8px'}}>注册、应用安装需要</td></tr>
</tbody>
</table>

### 2.2 创建应用发布机

- 点击应用发布机页面的 **创建** 按钮即新建一个应用发布机。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_RemoteApp2.png" alt="图 2  创建应用发布机" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建应用发布机</div>


- 通过 OpenSSH 协议部署应用发布机需要安装 OpenSSH，可在 JumpServer 页面 - **Web终端** &gt; **帮助** &gt; **下载** 页面获取安装包。

#### WinRM（推荐）


WinRM 是微软推出的一种远程管理服务，可使用管理员账号在 PowerShell 或 CMD 中通过 `winrm quickconfig` 快速启用。


- 创建应用发布机时添加 WinRM 协议即可。如果同时存在 SSH 协议，JumpServer 将优先选择 SSH。
    
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_RemoteApp7.png" alt="图 3  添加 WinRM 协议" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  添加 WinRM 协议</div>

#### OpenSSH


- 通过 OpenSSH 协议部署应用发布机需要先安装 OpenSSH 协议组件。
    
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_RemoteApp3.png" alt="图 4  添加 OpenSSH 协议" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  添加 OpenSSH 协议</div>


- OpenSSH 安装包上传到应用发布机桌面后，双击进行安装。
    
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_RemoteApp4.png" alt="图 5  OpenSSH 安装包" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  OpenSSH 安装包</div>


- 详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  应用发布机参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'25%', padding:'8px'}}>参数</th><th style={{width:'75%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>名称</td><td style={{padding:'8px'}}>远程应用发布机的名称，识别信息。</td></tr>
<tr><td style={{padding:'8px'}}>IP/主机</td><td style={{padding:'8px'}}>远程应用发布机的IP信息。</td></tr>
<tr><td style={{padding:'8px'}}>协议组</td><td style={{padding:'8px'}}>远程应用发布机支持的协议族以及协议组的端口。</td></tr>
<tr><td style={{padding:'8px'}}>账号列表</td><td style={{padding:'8px'}}>远程应用发布机的连接账号信息，例如 <strong>Administrator</strong> 用户,至少需要一个 Administrator组的特权账号用于管理远程应用。</td></tr>
<tr><td style={{padding:'8px'}}>自动创建帐号</td><td style={{padding:'8px'}}>该选项创建的帐号用于连接发布的应用。</td></tr>
<tr><td style={{padding:'8px'}}>创建帐号数量</td><td style={{padding:'8px'}}>公用帐号创建的数量。</td></tr>
<tr><td style={{padding:'8px'}}>Core服务地址</td><td style={{padding:'8px'}}>远程应用发布机的 Agent 与 JumpServer 后端 Core 组件服务的通信地址。</td></tr>
<tr><td style={{padding:'8px'}}>RDS 许可证</td><td style={{padding:'8px'}}>RDS 许可证启用选项。</td></tr>
<tr><td style={{padding:'8px'}}>RDS 许可服务器</td><td style={{padding:'8px'}}>RDS 许可服务器信息。</td></tr>
<tr><td style={{padding:'8px'}}>RDS 授权模式</td><td style={{padding:'8px'}}>选择"设备"或"用户"设置授权模式。 <br /> A.设备：允许一台设备（任何用户使用的）连接到远程应用发布机。 <br /> B.用户：授予一个用户从无限数目的客户端计算机或设备访问远程应用发布机。</td></tr>
<tr><td style={{padding:'8px'}}>RDS 单用户单会话</td><td style={{padding:'8px'}}>选择"禁用"或"启用"设置单用户单会话模式。 <br /> A.禁用：允许每个用户可以同时多台客户端电脑连接服务器远程桌面。 <br />  B.启用：禁止每个用户可以同时多台客户端电脑连接服务器远程桌面。</td></tr>
<tr><td style={{padding:'8px'}}>RDS 最大断开时间</td><td style={{padding:'8px'}}>如果某个会话连接达到了此最大时间，连接即断开。</td></tr>
<tr><td style={{padding:'8px'}}>RDS 远程应用注销时间限制</td><td style={{padding:'8px'}}>远程应用会话断开后的注销时间。</td></tr>
</tbody>
</table>

### 2.3 部署应用发布机

- 创建应用发布机后需手动执行应用发布机部署，安装 Chrome、DBeaver 或其他远程应用。
- 点击 **应用发布机名称** 按钮进入应用发布机详情页中，选择 **发布机部署** 页签，点击快速更新模块的 **初始化部署** 按钮，初始化应用发布机。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_RemoteApp5.png" alt="图 6  发布机部署" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  发布机部署</div>

### 2.4 查看应用发布机详情

- 点击 **应用发布机名称** 进入应用发布机详情页中。
- 此页面包含应用发布机详情信息，包括：远程应用发布机帐号列表、远程应用、发布机部署记录等。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_RemoteApp6.png" alt="图 7  应用发布机详情" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  应用发布机详情</div>


- 详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  应用发布机详情模块说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'25%', padding:'8px'}}>模块</th><th style={{width:'75%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>基本设置</td><td style={{padding:'8px'}}>该模块主要包含远程应用发布机的基本信息以及简单的自动化任务，更新硬件信息、测试可连接性等。</td></tr>
<tr><td style={{padding:'8px'}}>账号列表</td><td style={{padding:'8px'}}>该模块主要操作远程应用发布机的账号，默认创建初 JumpServer 会创建100个系统用户支持远程应用会话。</td></tr>
<tr><td style={{padding:'8px'}}>远程应用</td><td style={{padding:'8px'}}>该模块中包含默认的远程应用与自建的远程应用信息，在该模块可直接对远程应用进行部署。</td></tr>
<tr><td style={{padding:'8px'}}>发布机部署</td><td style={{padding:'8px'}}>该模块中主要用于远程应用发布机的初始化部署，以及部署日志的查看。</td></tr>
<tr><td style={{padding:'8px'}}>活动</td><td style={{padding:'8px'}}>该模块中记录了远程应用发布机的活动记录信息，点击可查看活动详情。</td></tr>
</tbody>
</table>
