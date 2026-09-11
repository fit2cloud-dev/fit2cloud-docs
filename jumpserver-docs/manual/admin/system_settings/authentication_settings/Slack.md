---
title: Slack (X-Pack)
---

## 1 关于 Slack



- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **认证设置 &gt; Slack** ，进入 Slack 配置页面。
- **Slack** 认证是基于 Slack 平台的身份认证机制，允许用户使用 Slack 账户安全登录企业应用程序。JumpServer 支持标准 Slack 认证。

## 2 配置参数


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  Slack 配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>Slack</td><td style={{padding:'8px'}}>勾选启用 Slack 身份验证</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>Client ID</td><td style={{padding:'8px'}}>Slack Client ID，这是 Slack 应用程序的唯一标识符，用于在 OAuth 2.0 授权过程中标识应用程序</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>Client secret</td><td style={{padding:'8px'}}>Slack Client secret，这是与 Slack 应用程序关联的机密字符串，用于在 OAuth 2.0 令牌交换过程中对应用程序进行身份认证</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>Client bot token</td><td style={{padding:'8px'}}>Slack Client bot token，这是授予 Slack 机器人的访问令牌，允许它与 Slack 工作区交互并执行发送消息或管理频道等任务</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>映射属性</td><td style={{padding:'8px'}}>用户属性映射。键表示 JumpServer 用户属性名称，值对应 Slack 用户属性名称</td><td style={{padding:'8px'}}>示例见下文</td></tr>
<tr><td style={{padding:'8px'}}>组织</td><td style={{padding:'8px'}}>经过身份认证和创建后，用户将被添加到所选组织中</td><td style={{padding:'8px'}}>默认值：<code>DEFAULT</code></td></tr>
</tbody>
</table>

Slack 用户属性示例

-  **映射属性** 字段用于设置用户属性映射。键表示 JumpServer 用户属性名称，值对应 Slack 用户属性名称。

```json
{
  "name": "real_name",
  "username": "name",
  "email": "profile.email"
}
```

## JumpServer Slack URL 说明

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  Slack URL 说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>URL 类型</th><th style={{width:'50%', padding:'8px'}}>地址</th><th style={{width:'30%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>二维码登录 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/slack/qr/login/</code></td><td style={{padding:'8px'}}>Slack 二维码登录入口</td></tr>
<tr><td style={{padding:'8px'}}>二维码登录回调 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/slack/qr/login/callback/</code></td><td style={{padding:'8px'}}>二维码登录成功回调地址</td></tr>
</tbody>
</table>
