---
title: 飞书 (X-Pack)
---

## 1 关于飞书



- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **认证设置 &gt; 飞书** ，进入飞书配置页面。
- **飞书认证** 是基于飞书平台的身份认证方法，JumpServer 支持二维码登录和企业身份绑定。

## 2 基础配置


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  飞书基础配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>飞书</td><td style={{padding:'8px'}}>勾选启用飞书身份验证</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>App ID</td><td style={{padding:'8px'}}>飞书 App ID，这是应用程序的唯一标识符</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>App secret</td><td style={{padding:'8px'}}>飞书应用程序密钥，类似于 API 访问的密码，用于获取调用飞书 API 的访问令牌</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>映射属性</td><td style={{padding:'8px'}}>用户属性映射。键表示 JumpServer 用户属性名称，值对应飞书用户属性名称</td><td style={{padding:'8px'}}>示例见下文</td></tr>
<tr><td style={{padding:'8px'}}>组织</td><td style={{padding:'8px'}}>经过身份认证和创建后，用户将被添加到所选组织中</td><td style={{padding:'8px'}}>默认值：<code>DEFAULT</code></td></tr>
</tbody>
</table>

飞书用户属性示例

```json
{
  "name": "nickname",
  "username": "user_id",
  "email": "email"
}
```

## 4 JumpServer 飞书 URL 说明

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  飞书 URL 说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>URL 类型</th><th style={{width:'50%', padding:'8px'}}>地址</th><th style={{width:'30%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>二维码登录 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/feishu/qr/login/</code></td><td style={{padding:'8px'}}>飞书二维码登录入口</td></tr>
<tr><td style={{padding:'8px'}}>二维码登录回调 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/feishu/qr/login/callback/</code></td><td style={{padding:'8px'}}>二维码登录成功回调地址</td></tr>
</tbody>
</table>
