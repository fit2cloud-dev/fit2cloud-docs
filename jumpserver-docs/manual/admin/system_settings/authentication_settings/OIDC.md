---
title: OIDC (X-Pack)
---

## 1 关于OIDC



- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **认证设置 &gt; OIDC** ，进入 OIDC 配置页面。
- **OpenID Connect(OIDC)** 是一种基于 OAuth 2.0 的身份认证协议。JumpServer 认证支持标准的 OIDC 认证。

## 2 基础配置

详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  OIDC 基础配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>OIDC</td><td style={{padding:'8px'}}>勾选启用 OIDC 身份验证</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>JumpServer 地址</td><td style={{padding:'8px'}}>JumpServer 的完整域名，用于构造回调 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/</code></td></tr>
<tr><td style={{padding:'8px'}}>客户端 ID</td><td style={{padding:'8px'}}>OIDC 服务器提供的客户端 ID</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>客户端密钥</td><td style={{padding:'8px'}}>OIDC 服务器提供的客户端密钥</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>客户端认证方式</td><td style={{padding:'8px'}}>认证方式：Client Secret Basic(使用 POST 方法获取令牌，请求标头中包含客户端 ID 和客户端密码)；Client Secret Post(使用 POST 方法获取令牌，客户端 ID 和客户端密码作为原始数据包含在请求正文中)</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>使用 Keycloak</td><td style={{padding:'8px'}}>选中使用 Keycloak 配置，或取消选中使用本机 OIDC 配置</td><td style={{padding:'8px'}}></td></tr>
</tbody>
</table>

### 2.1 使用 Keycloak


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  Keycloak 配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>服务端地址</td><td style={{padding:'8px'}}>Keycloak 服务器 URI</td><td style={{padding:'8px'}}><code>https://keycloak.example.com</code></td></tr>
<tr><td style={{padding:'8px'}}>域</td><td style={{padding:'8px'}}>Keycloak 域名称</td><td style={{padding:'8px'}}><code>JumpServer</code></td></tr>
</tbody>
</table>

### 2.2 使用本机 OIDC


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  本机 OIDC 配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>端点地址</td><td style={{padding:'8px'}}>OIDC 服务端基础 Endpoint，用于发现各类端点</td><td style={{padding:'8px'}}><code>https://oidc.example.com</code></td></tr>
<tr><td style={{padding:'8px'}}>授权端点地址</td><td style={{padding:'8px'}}>OIDC 授权(Authorization)Endpoint</td><td style={{padding:'8px'}}><code>https://oidc.example.com/realms/JumpServer/protocol/openid-connect/auth/</code></td></tr>
<tr><td style={{padding:'8px'}}>Token 端点地址</td><td style={{padding:'8px'}}>OIDC Token(令牌)Endpoint</td><td style={{padding:'8px'}}><code>https://oidc.example.com/realms/JumpServer/protocol/openid-connect/token/</code></td></tr>
<tr><td style={{padding:'8px'}}>JWKS 端点地址</td><td style={{padding:'8px'}}>OIDC 公钥(JWKS)Endpoint</td><td style={{padding:'8px'}}><code>https://oidc.example.com/realms/JumpServer/protocol/openid-connect/certs/</code></td></tr>
<tr><td style={{padding:'8px'}}>用户信息端点</td><td style={{padding:'8px'}}>OIDC 用户信息(UserInfo)Endpoint</td><td style={{padding:'8px'}}><code>https://oidc.example.com/realms/JumpServer/protocol/openid-connect/userinfo/</code></td></tr>
<tr><td style={{padding:'8px'}}>注销端点地址</td><td style={{padding:'8px'}}>OIDC 注销(Logout)Endpoint，用户注销时调用</td><td style={{padding:'8px'}}><code>https://oidc.example.com/realms/JumpServer/protocol/openid-connect/logout/</code></td></tr>
<tr><td style={{padding:'8px'}}>签名算法</td><td style={{padding:'8px'}}>ID Token 签名算法，支持 HS256(对称密钥)和 RS256(非对称密钥)</td><td style={{padding:'8px'}}>默认：HS256</td></tr>
<tr><td style={{padding:'8px'}}>签名密钥</td><td style={{padding:'8px'}}>RS256 时用于验证签名的公钥或密钥</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>启用 PKCE</td><td style={{padding:'8px'}}>是否启用 PKCE(Proof Key for Code Exchange)增强安全性</td><td style={{padding:'8px'}}>建议启用</td></tr>
<tr><td style={{padding:'8px'}}>校验码方式</td><td style={{padding:'8px'}}>PKCE 校验码生成方式：S256(推荐，SHA-256)或 Plain</td><td style={{padding:'8px'}}>默认：S256</td></tr>
<tr><td style={{padding:'8px'}}>Scope</td><td style={{padding:'8px'}}>授权请求的 Scope 范围，空格分隔</td><td style={{padding:'8px'}}><code>openid profile email</code></td></tr>
<tr><td style={{padding:'8px'}}>令牌有效期(秒)</td><td style={{padding:'8px'}}>ID Token 有效期，过期后自动刷新</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>声明(Claims)</td><td style={{padding:'8px'}}>是否在 ID Token 中包含 userinfo 范围声明</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>状态校验</td><td style={{padding:'8px'}}>启用后可防止 CSRF 攻击，确保请求一致性</td><td style={{padding:'8px'}}>建议启用</td></tr>
<tr><td style={{padding:'8px'}}>临时码校验</td><td style={{padding:'8px'}}>启用后可防止重放攻击</td><td style={{padding:'8px'}}>建议启用</td></tr>
<tr><td style={{padding:'8px'}}>总是更新用户信息</td><td style={{padding:'8px'}}>启用后，每次认证均同步用户信息(仅限姓名、用户名、邮箱、电话、评论，群组仅首次同步)</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>忽略 SSL 证书验证</td><td style={{padding:'8px'}}>启用后，跳过对 OP 服务器 SSL 证书的校验</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>共享会话</td><td style={{padding:'8px'}}>启用后，用户在其他应用注销时会同步注销</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>属性映射</td><td style={{padding:'8px'}}>用户属性映射，JumpServer 字段与 OIDC 字段对应关系</td><td style={{padding:'8px'}}>见下方 JSON 示例</td></tr>
</tbody>
</table>

### 2.3 OIDC 用户属性示例

``` json
{  
	"name": "name",  
	"username": "preferred_username",  
	"email": "email",  
	"groups": "groups"
}
```

## 3 JumpServer OIDC URL 说明


详细 URL 说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  OIDC URL 说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>URL 类型</th><th style={{width:'50%', padding:'8px'}}>地址</th><th style={{width:'30%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>登录网址</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/openid/login/</code></td><td style={{padding:'8px'}}>OIDC 登录入口地址</td></tr>
<tr><td style={{padding:'8px'}}>登录成功回传 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/openid/callback/</code></td><td style={{padding:'8px'}}>OIDC 登录成功后的回调地址</td></tr>
<tr><td style={{padding:'8px'}}>注销 URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/openid/logout/</code></td><td style={{padding:'8px'}}>OIDC 注销地址</td></tr>
</tbody>
</table>
