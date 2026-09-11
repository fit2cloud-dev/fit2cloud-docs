---
title: OAuth2 (X-Pack)
---

## 1 关于 OAuth2



- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **认证设置 &gt; OAuth2** ，进入 OAuth2 配置页面。
- **OAuth2** 是一种开放三方授权协议，JumpServer 支持标准 OAuth2 平台认证。

## 2 配置参数


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  OAuth2 配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>OAuth2</td><td style={{padding:'8px'}}>启用 OAuth2 身份认证</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>服务提供商</td><td style={{padding:'8px'}}>OAuth2 服务提供商名称</td><td style={{padding:'8px'}}><code>GitHub</code>、<code>Google</code>、<code>Facebook</code> 等</td></tr>
<tr><td style={{padding:'8px'}}>图标</td><td style={{padding:'8px'}}>登录页面显示的服务商图标，建议 64x64 像素</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>客户端 ID</td><td style={{padding:'8px'}}>OAuth2 服务商提供的 Client ID</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>客户端密钥</td><td style={{padding:'8px'}}>OAuth2 服务商提供的 Client Secret</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>客户端认证方式</td><td style={{padding:'8px'}}>获取令牌的认证方式，详见下方说明</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>范围(Scope)</td><td style={{padding:'8px'}}>授权请求的 Scope 范围，空格分隔</td><td style={{padding:'8px'}}><code>user user:email user:login</code></td></tr>
<tr><td style={{padding:'8px'}}>授权端点地址</td><td style={{padding:'8px'}}>OAuth2 授权(Authorization)Endpoint</td><td style={{padding:'8px'}}><code>https://github.com/login/oauth/authorize</code></td></tr>
<tr><td style={{padding:'8px'}}>Token 端点地址</td><td style={{padding:'8px'}}>OAuth2 Token(令牌)Endpoint</td><td style={{padding:'8px'}}><code>https://github.com/login/oauth/access_token</code></td></tr>
<tr><td style={{padding:'8px'}}>用户信息端点地址</td><td style={{padding:'8px'}}>OAuth2 用户信息(UserInfo)Endpoint</td><td style={{padding:'8px'}}><code>https://api.github.com/user</code></td></tr>
<tr><td style={{padding:'8px'}}>注销会话端点地址</td><td style={{padding:'8px'}}>OAuth2 注销(Logout)Endpoint，用户注销时调用</td><td style={{padding:'8px'}}><code>https://github.com/logout</code></td></tr>
<tr><td style={{padding:'8px'}}>映射属性</td><td style={{padding:'8px'}}>用户属性映射，JumpServer 字段与 OAuth2 字段对应关系</td><td style={{padding:'8px'}}>见下方 JSON 示例</td></tr>
<tr><td style={{padding:'8px'}}>组织</td><td style={{padding:'8px'}}>认证和创建后，用户将被添加到所选组织</td><td style={{padding:'8px'}}>默认：DEFAULT</td></tr>
<tr><td style={{padding:'8px'}}>总是更新用户信息</td><td style={{padding:'8px'}}>启用后，每次认证均同步用户信息(仅限姓名、用户名、邮箱、电话、评论，组仅首次同步)</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>同步注销</td><td style={{padding:'8px'}}>启用后，注销时同步注销 OAuth2 服务</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
</tbody>
</table>


- 客户端认证方式说明:

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  客户端认证方式说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'25%', padding:'8px'}}>请求方法</th><th style={{width:'75%', padding:'8px'}}>描述</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>GET</td><td style={{padding:'8px'}}>使用 GET 方法获取令牌，客户端 ID 和密钥在请求头中传递</td></tr>
<tr><td style={{padding:'8px'}}>POST-DATA</td><td style={{padding:'8px'}}>使用 POST 方法，客户端 ID 和密钥作为表单数据传递</td></tr>
<tr><td style={{padding:'8px'}}>POST-JSON</td><td style={{padding:'8px'}}>使用 POST 方法，客户端 ID 和密钥作为 JSON 数据传递</td></tr>
</tbody>
</table>


- 属性映射示例:

```json
{
  "name": "user",
  "username": "name",
  "email": "user:email"
}
```

## 3 JumpServer OAuth2 URL 说明

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  OAuth2 URL 说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>URL 类型</th><th style={{width:'50%', padding:'8px'}}>地址</th><th style={{width:'30%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>Login URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/oauth2/login/</code></td><td style={{padding:'8px'}}>OAuth2 登录入口地址</td></tr>
<tr><td style={{padding:'8px'}}>Login Success Callback URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/oauth2/callback/</code></td><td style={{padding:'8px'}}>OAuth2 登录成功后的回调地址</td></tr>
<tr><td style={{padding:'8px'}}>Logout URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/oauth2/logout/</code></td><td style={{padding:'8px'}}>OAuth2 注销地址</td></tr>
</tbody>
</table>
