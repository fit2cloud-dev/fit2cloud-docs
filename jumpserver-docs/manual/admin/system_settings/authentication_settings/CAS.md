---
title: CAS
---

## 1 关于CAS


- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **认证设置 &gt; CAS** ，进入 CAS 配置页面。
- **Central Authentication Service （CAS）** 是一种单点登录 （SSO） 协议，旨在为多个应用程序提供集中式身份验证。JumpServer 支持标准 CAS 平台认证。

## 2 基础配置


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  CAS 基础配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>CAS</td><td style={{padding:'8px'}}>勾选启用 CAS 身份验证</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>服务端地址</td><td style={{padding:'8px'}}>CAS 服务器 URI</td><td style={{padding:'8px'}}><code>https://example.com/cas</code></td></tr>
<tr><td style={{padding:'8px'}}>回调地址</td><td style={{padding:'8px'}}>CAS 代理服务器 URI</td><td style={{padding:'8px'}}><code>https://foo.bar:8443</code></td></tr>
<tr><td style={{padding:'8px'}}>版本</td><td style={{padding:'8px'}}>CAS 协议版本：1、2、3 或 CAS_2_SAML_1_0</td><td style={{padding:'8px'}}>默认值：3</td></tr>
<tr><td style={{padding:'8px'}}>映射属性</td><td style={{padding:'8px'}}>用户属性映射。键表示 CAS 用户属性名称，值对应 JumpServer 用户属性名称</td><td style={{padding:'8px'}}>示例见下文</td></tr>
<tr><td style={{padding:'8px'}}>组织</td><td style={{padding:'8px'}}>身份验证和创建后，用户将被添加到所选组织中</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>创建用户</td><td style={{padding:'8px'}}>选中后，将在成功身份验证后创建 JumpServer 不存在的用户</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>同步注销</td><td style={{padding:'8px'}}>选中注销后，注销也会使用户从 CAS 服务注销</td><td style={{padding:'8px'}}></td></tr>
</tbody>
</table>


CAS 用户属性示例：
    
``` bash
{  
	"cas:user": "username",  
	"cas:fullname": "name",  
	"cas:mail": "email"
}
```

## 3 JumpServer CAS URL 说明


详细 URL 说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  CAS URL 说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>URL 类型</th><th style={{width:'50%', padding:'8px'}}>地址</th><th style={{width:'30%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>登录网址</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/cas/login/</code></td><td style={{padding:'8px'}}>CAS 登录入口地址</td></tr>
<tr><td style={{padding:'8px'}}>登录成功回传 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/cas/callback/</code></td><td style={{padding:'8px'}}>CAS 登录成功后的回调地址</td></tr>
<tr><td style={{padding:'8px'}}>注销 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/cas/logout/</code></td><td style={{padding:'8px'}}>CAS 注销地址</td></tr>
</tbody>
</table>
