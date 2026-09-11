---
title: SAML2 (X-Pack)
---

## 1 关于 SAML2


- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **认证设置 &gt; SAML2** ，进入 SAML2 配置页面。
- **SAML2(Security Assertion Markup Language 2.0)** 是一种开放标准，用于在身份提供者(IdP)和服务提供者(SP)之间安全交换身份认证和授权数据。JumpServer 认证支持标准 SAML2。

## 2 配置参数


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  SAML2 配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>SAML2</td><td style={{padding:'8px'}}>启用 SAML2 身份认证</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>SP 密钥</td><td style={{padding:'8px'}}>上传 SP 私钥文件，用于签名 SAML 请求和解密 IdP 响应</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>SP 证书</td><td style={{padding:'8px'}}>上传 SP 证书文件，由 SP 私钥生成，供 IdP 验证签名和加密响应</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>IdP Metadata 地址</td><td style={{padding:'8px'}}>IdP 元数据地址 URL</td><td style={{padding:'8px'}}><code>https://saml2.example.com/realms/JumpServer/protocol/saml/descriptor</code></td></tr>
<tr><td style={{padding:'8px'}}>IdP Metadata XML</td><td style={{padding:'8px'}}>手动输入 IdP 元数据 XML，优先级低于地址</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>高级设置</td><td style={{padding:'8px'}}>生成 SP Metadata 的高级参数，详见下方示例</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>映射属性</td><td style={{padding:'8px'}}>用户属性映射，SAML2 字段与 JumpServer 字段对应关系</td><td style={{padding:'8px'}}>见下方 JSON 示例</td></tr>
<tr><td style={{padding:'8px'}}>组织</td><td style={{padding:'8px'}}>认证和创建后，用户将被添加到所选组织</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>总是更新用户信息</td><td style={{padding:'8px'}}>启用后，每次认证均同步用户信息(仅限姓名、用户名、邮箱、电话、评论，群组仅首次同步)</td><td style={{padding:'8px'}}></td></tr>
<tr><td style={{padding:'8px'}}>同步注销</td><td style={{padding:'8px'}}>启用后，注销也会同步注销 SAML2 服务</td><td style={{padding:'8px'}}></td></tr>
</tbody>
</table>


- SP 密钥和 SP 证书需配套使用，确保 SAML2 认证通信安全。SP 私钥用于签名和解密，SP 证书用于验证和加密。
- IdP Metadata 地址和 XML 只需填写其一，若都填写则优先使用地址。
- 高级设置示例:

```json
{
    "organization": {
        "en": {
            "name": "JumpServer",
            "displayname": "JumpServer",
            "url": "https://jumpserver.com/"
        }
    },
    "strict": true,
    "security": {}
}
```


- SP Metadata 提供服务提供者的实体 ID、端点 URL、证书等信息，便于 IdP 配置。
- 可在 **SP 证书** 字段下方点击 **查看** 获取 SP Metadata。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_SAML2.png" alt="图 1  SP Metadata" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  SP Metadata</div>


- 属性映射示例:

```json
{
    "uid": "username",
    "email": "email",
    "member": "groups"
}
```

## 3 JumpServer SAML2 URL 说明


详细 URL 说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  SAML2 URL 说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>URL 类型</th><th style={{width:'50%', padding:'8px'}}>地址</th><th style={{width:'30%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>Login URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/saml2/login/</code></td><td style={{padding:'8px'}}>SAML2 登录入口地址</td></tr>
<tr><td style={{padding:'8px'}}>Login Success Callback URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/saml2/callback/</code></td><td style={{padding:'8px'}}>SAML2 登录成功后的回调地址</td></tr>
<tr><td style={{padding:'8px'}}>Logout URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/saml2/logout/</code></td><td style={{padding:'8px'}}>SAML2 注销地址</td></tr>
<tr><td style={{padding:'8px'}}>SP Metadata URL</td><td style={{padding:'8px'}}><code>https://jumpserver.example.com/core/auth/saml2/metadata/</code></td><td style={{padding:'8px'}}>SAML2 服务提供者元数据地址</td></tr>
</tbody>
</table>
