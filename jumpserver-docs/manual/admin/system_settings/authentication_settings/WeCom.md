---
title: 企业微信 (X-Pack)
---

## 1 关于企业微信认证



- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **认证设置 &gt; 企业微信** ，进入 企业微信 配置页面。
- **企业微信认证** 是基于企业微信的身份认证方法，JumpServer 支持二维码登录和企业身份绑定。

## 2 基础配置


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  企业微信基础配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>企业微信</td><td style={{padding:'8px'}}>勾选启用企业微信身份验证</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>Corporation ID</td><td style={{padding:'8px'}}>企业微信公司 ID。唯一标识企业微信中的企业，所有 API 请求都必须包含此 ID</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>App agent ID</td><td style={{padding:'8px'}}>企业微信应用代理 ID。用于标识企业微信中的特定应用程序，每个应用程序都有一个唯一的代理 ID</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>App secret</td><td style={{padding:'8px'}}>企业微信应用程序密钥。用于验证应用程序并获取调用企业微信 API 的访问令牌</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>映射属性</td><td style={{padding:'8px'}}>用户属性映射。键表示 JumpServer 用户属性名称，值对应企业微信用户属性名称</td><td style={{padding:'8px'}}>示例见下文</td></tr>
<tr><td style={{padding:'8px'}}>组织</td><td style={{padding:'8px'}}>经过身份认证和创建后，用户将被添加到所选组织中</td><td style={{padding:'8px'}}>默认值：<code>DEFAULT</code></td></tr>
</tbody>
</table>


-  **映射属性** 字段用于设置用户属性映射。键表示 JumpServer 用户属性名称，值对应企业微信用户属性名称。
-  企业微信用户属性示例：

```json
{
  "name": "alias",
  "username": "userid",
  "email": "extattr.attrs[2].value"
}
```

## JumpServer 企业微信 URL 说明

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  企业微信 URL 说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>URL 类型</th><th style={{width:'50%', padding:'8px'}}>地址</th><th style={{width:'30%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>二维码登录 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/wecom/qr/login/</code></td><td style={{padding:'8px'}}>企业微信二维码登录入口</td></tr>
<tr><td style={{padding:'8px'}}>二维码登录回调 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/wecom/qr/login/callback/</code></td><td style={{padding:'8px'}}>二维码登录成功回调地址</td></tr>
<tr><td style={{padding:'8px'}}>OAuth 登录 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/wecom/oauth/login/</code></td><td style={{padding:'8px'}}>企业微信 OAuth 登录入口</td></tr>
<tr><td style={{padding:'8px'}}>OAuth 登录回调 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/wecom/oauth/login/callback/</code></td><td style={{padding:'8px'}}>OAuth 登录成功回调地址</td></tr>
</tbody>
</table>
