---
title: 其他
---

## 1 RAG 在 SQLBot 的哪些地方起到作用了呢？


目前 RAG 主要用于 SQLBot 根据问题自动匹配数据源、数据表、术语、SQL 示例，减少问数时对大模型的 token 消耗。

- 问题中明确指定了使用哪个数据源
- 在 SQLBot 数据源的描述信息中添加了与问题相关的信息，问数时会将问题与数据源描述信息进行相似度匹配，以此确定使用哪个数据源
- SQLBot 中仅有一个数据源时无需确认，会默认使用该数据源


## 2 SQLBot 支持 API 调用吗？


SQLBot 全版本均支持 API 调用，但不同版本的认证方式、密钥获取逻辑存在差异，以下为 v1.4.0 及之前版本的核心规则：

采用 RSA 非对称加密认证：调用 API 时，需将用户名和密码通过 RSA 公钥加密后传输；对应的 RSA 密钥对存储在 PostgreSQL 数据库的 rsa 表中。

如需了解 SQLBot 自身的 API 调用方式，可通过浏览器开发者工具查看其网络请求。目前版本尚未提供基于 API Key 的认证方式，但支持通过 Token 进行接口调用。用户可在登录过程中获取 Token，相应的获取接口可在登录时观察请求获得。

完整的 API 接口列表可在 SQLBot 访问地址后追加 /docs进行查看，例如：`https://your-sqlbot-domain/docs`。


## 3 如何使用 SQLBot 的 API？


SQLBot v1.5.0 版本开始正式支持了 API 的调用。可以在 API Key 页面获取对应的 Access Key 和 Secret Key。如下图所示：

<img src="/img/sqlbot/faq/api_key.png" alt="api_key" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px auto 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 1 API Key</div>


生成 JWT Token。Token 的生成过程是标准化的，这里拿在线工具（[https://www.bejson.com/jwt/](https://www.bejson.com/jwt/)）举例。其中 header 参考下图，Payload 中填入 SQLBot 的 Access Key，对称密钥填写 SQLBot 的 Secret Key。 点击编码按钮，生成对应的 Token。如下图所示：

<img src="/img/sqlbot/faq/api_jwt.png" alt="api_jwt" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px auto 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 2 API JWT</div>


生成 token 后，可以通过 API 调用工具来使用该 token 调用对应的接口。这里用在线工具（[https://getman.cn/](https://getman.cn/)）举例。将生成的 token 复制下来，在请求的 header 里输入：
```
# 下面的 xxx 为 token
x-sqlbot-ask-token: sk xxx
```
在 URL 里输入需要调用的 API 接口地址，如下图所示：
<img src="/img/sqlbot/faq/api_call.png" alt="api_call" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px auto 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 3 API 调用</div>


    