---
title: Passkey
---

## 1 关于 Passkey


- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **认证设置 &gt; Passkey** ，进入 Passkey 配置页面。
- **Passkey** 是一种基于公钥加密的无密码身份认证技术，符合 FIDO2 标准（包括 WebAuthn 和 CTAP），支持通过生物识别（如指纹、面部）、PIN 或安全密钥进行身份验证，提升安全性和用户体验。
- 部分认证器需要 JumpServer 启用 HTTPS 访问，否则认证流程可能无法正常进行。

## 2 配置参数


详细参数说明：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  Passkey 配置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>参数</th><th style={{width:'55%', padding:'8px'}}>说明</th><th style={{width:'25%', padding:'8px'}}>示例</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>Passkey</td><td style={{padding:'8px'}}>启用 Passkey 无密码认证</td><td style={{padding:'8px'}}>启用/禁用</td></tr>
<tr><td style={{padding:'8px'}}>服务域名</td><td style={{padding:'8px'}}>Passkey 服务可用的完整域名，多个域名用逗号分隔</td><td style={{padding:'8px'}}><code>jumpserver.example.com</code></td></tr>
<tr><td style={{padding:'8px'}}>服务名称</td><td style={{padding:'8px'}}>Passkey 服务名称</td><td style={{padding:'8px'}}><code>JumpServer</code></td></tr>
</tbody>
</table>


- 服务域名如未设置，默认取请求主机，并匹配 `config.txt` 文件中的 `DOMAINS`。

## 3 操作说明


- 配置完成后，点击 **提交** 保存设置。
