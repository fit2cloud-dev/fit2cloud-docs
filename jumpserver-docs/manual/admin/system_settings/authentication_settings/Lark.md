---
title: Lark (X-Pack)
---

## 关于 Lark


- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **认证设置 &gt; Lark** ，进入 Lark 配置页面。
- **Lark** 认证是 Lark(国际版飞书)提供的一种身份认证机制，使企业和第三方应用程序能够通过 Lark 对用户进行身份认证和授权。

## 基础配置


- 点击页面右上角的设置按钮
- 导航到 **系统设置 &gt; 认证设置 &gt; Lark**


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  Lark 基础配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>Lark</td><td style={{padding:'8px'}}>勾选启用 Lark 身份验证</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>App ID</td><td style={{padding:'8px'}}>Lark App ID，这是应用程序的唯一标识符</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>App secret</td><td style={{padding:'8px'}}>Lark 应用程序密钥，用于获取调用 Lark API 的访问令牌</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>映射属性</td><td style={{padding:'8px'}}>用户属性映射。键表示 JumpServer 用户属性名称，值对应 Lark 用户属性名称</td><td style={{padding:'8px'}}>示例见下文</td></tr>
<tr><td style={{padding:'8px'}}>组织</td><td style={{padding:'8px'}}>经过身份认证和创建后，用户将被添加到所选组织中</td><td style={{padding:'8px'}}>默认值：<code>DEFAULT</code></td></tr>
</tbody>
</table>

Lark 用户属性示例

-  **映射属性** 字段用于设置用户属性映射。键表示 JumpServer 用户属性名称，值对应 Lark 用户属性名称。

```json
{
  "name": "nickname",
  "username": "user_id",
  "email": "email"
}
```

## JumpServer Lark URL 说明

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  Lark URL 说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>URL 类型</th><th style={{width:'50%', padding:'8px'}}>地址</th><th style={{width:'30%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>二维码登录 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/lark/qr/login/</code></td><td style={{padding:'8px'}}>Lark 二维码登录入口</td></tr>
<tr><td style={{padding:'8px'}}>二维码登录回调 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/lark/qr/login/callback/</code></td><td style={{padding:'8px'}}>二维码登录成功回调地址</td></tr>
</tbody>
</table>
