---
title: Radius (X-Pack)
---

## 1 关于 RADIUS


- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **认证设置 &gt; Radius** ，进入 RADIUS 配置页面。
- **RADIUS（远程身份认证拨入用户服务）** 是一种基于 RADIUS 协议的网络访问控制认证机制，提供身份认证、授权和计费（AAA）功能。JumpServer 支持标准 RADIUS 认证。

## 2 配置参数


- 点击页面右上角的设置按钮
- 导航到 **系统设置 &gt; 认证设置 &gt; Radius**


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  Radius 配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>Radius</td><td style={{padding:'8px'}}>勾选启用 Radius 身份验证</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>主机</td><td style={{padding:'8px'}}>RADIUS 服务器 IP 地址或域名</td><td style={{padding:'8px'}}><code>172.16.10.180</code></td></tr>
<tr><td style={{padding:'8px'}}>端口</td><td style={{padding:'8px'}}>RADIUS 服务器端口号</td><td style={{padding:'8px'}}>默认值：1812</td></tr>
<tr><td style={{padding:'8px'}}>密文</td><td style={{padding:'8px'}}>JumpServer 和 RADIUS 服务器之间的共享密钥。它的功能类似于密码，对 RADIUS 请求和响应中的敏感信息进行加密，以确保安全通信</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>使用 radius OTP</td><td style={{padding:'8px'}}>勾选启用 RADIUS 作为 MFA 后端。有关更多信息，请参阅下文启用 RADIUS MFA 后端</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>组织</td><td style={{padding:'8px'}}>经过身份认证和创建后，用户将被添加到所选组织中</td><td style={{padding:'8px'}}>默认值：<code>DEFAULT</code></td></tr>
</tbody>
</table>

启用 RADIUS MFA 后端


- 按照集成 RADIUS 身份认证指南配置 RADIUS 身份认证。
- 在 **使用 radius OTP** 字段中，勾选启用 RADIUS 作为 MFA 后端。当用户的 MFA 启用时，他们可以在登录时选择 RADIUS 身份认证类型。
- 点击 **提交**。
