---
title: 数据源
---

## 1 达梦数据源无法连接？


达梦数据库在启用安全特性后，在添加 SQLBot 数据源时会遇到下面的错误：

    
<img src="/img/sqlbot/faq/datasource_dameng.jpg" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px auto 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 1 达梦数据源连接报错</div>

由于不同数据库版本、不同平台架构、不同操作系统的达梦处理方式不同，无法在 SQLBot 镜像里统一处理，所以需要用户根据达梦官方的方案来解决。

可以参考达梦官方的解决方案处理：

[https://eco.dameng.com/community/question/ec52c8c5b36d5445db1ed8399728fb97](https://eco.dameng.com/community/question/ec52c8c5b36d5445db1ed8399728fb97)

docker-compose.yml文件修改示例：


<img src="/img/sqlbot/faq/dameng_issue.jpg" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px auto 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 2 docker-compose.yml 修改示例</div>

## 2 数据源连接无效？


数据源本身服务正常，但添加到 SQLBot 中时，提示数据源连接无效。可能的原因：

- SQLBot 默认以 docker 方式运行，在 SQLBot 容器中访问 localhost，或者 127.0.0.1 等本地地址时，均指向 SQLBot 容器自身，而不是 SQLBot 容器外的其他服务。此时可以将数据源的 IP 换成服务器的内网或公网 IP 即可，如果是本机服务，也可以输入 host.docker.internal
- docker network 配置有问题，导致容器内无法访问到容器外的地址，可以试着将 docker network mode 调整为 host，然后重启服务
- 数据源服务器的防火墙是否开放了对应的端口，公有云的服务器还需要检查服务器对应的安全组规则是否开放了对应端口


## 3 数据库最多支持30张表吗？


社区版和企业版都没有 30 张表的限制。
数据表数量会影响到两个方面：

- 传递给大模型的 token 长度，影响大模型的思考时间
- SQLBot 后台同步数据表信息

v1.3.0 版本之前的 SQLBot 在问数的时候，会将指定数据源下的所有数据表的表结构信息都传给大模型，对于 token 的消耗非常大，会有性能问题。在 v1.3.0 版本中做了数据源、数据表的匹配，减少了问数时表结构的数据量，SQLBot 会根据问题，与数据源的数据表描述信息进行匹配，默认匹配 10 个匹配度最高的数据表，然后这 10 个数据表如果有做表关联，那与这 10 个表关联的数据表也会一同传给大模型。

在后期版本，SQLBot 会开放对默认匹配数据表数量的控制，用户可以通过控制参数来适配自己的实际需求。

