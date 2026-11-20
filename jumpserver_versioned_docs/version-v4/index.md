---
title: 产品介绍
---

:::warning[重要通知丨JumpServer 漏洞通知及修复方案（JS-2026.11.18）]

2026 年 11 月，JumpServer 开源项目组陆续收到多位安全研究人员提交的漏洞报告，并且已完成包括资源缓存机制缺陷导致身份认证绕过在内的 10 项漏洞修复。本文汇总本次修复涉及的漏洞、受影响版本以及对应的安全版本，使用受影响版本的用户请参照本文内容尽快完成升级。

**1 修复方案**

建议用户尽快升级至对应的安全修复版本，以降低潜在的安全风险。各版本分支当前的最新安全版本如表 1 所示。

**表 1 JumpServer 最新安全版本**

| 版本分支 | 最新安全版本 | 版本说明 |
| --- | --- | --- |
| JumpServer V3 | `v3.10.24` | LTS 版本 |
| JumpServer V4 | `v4.10.21` | LTS 版本 |
| JumpServer V5 | `v5.1.1` | 当前版本 |

已升级到上述版本的实例不受本次漏洞影响。若当前版本低于表 1 中的安全版本，且尚未完成升级，建议先评估所在网络的暴露面，再尽快安排升级窗口。

**2 漏洞明细**

经验证，JumpServer 开源项目在 2026 年 11 月完成了表 2 中 10 项安全漏洞的修复工作。其中资源缓存机制缺陷导致的身份认证绕过、密码重置验证码泄露导致的账号接管两项漏洞直接关系到登录入口，建议优先处理。

**表 2 2026 年 11 月漏洞修复明细**

| 序号 | 漏洞名称 | 漏洞描述 | 影响版本 |
| --- | --- | --- | --- |
| 1 | 资源缓存机制缺陷导致身份认证绕过 | JumpServer 资源 ID 缓存与身份认证 Token 缓存存在命名空间混用问题，导致身份认证过程中可能读取非授权生成的缓存数据。 | V3 `v3.0.0` 至 `v3.10.23` LTS<br />V4 `v4.0.0` 至 `v4.10.19` LTS<br />V5 `v5.0.0` 至 `v5.1.0` |
| 2 | 密码重置验证码泄露导致账号接管 | JumpServer 在处理密码重置请求时，部分验证码信息可能通过 Celery 异步任务参数被记录，并且通过任务执行记录接口暴露。 | V3 `v3.0.0` 至 `v3.10.23` LTS<br />V4 `v4.0.0` 至 `v4.10.19` LTS<br />V5 `v5.0.0` 至 `v5.1.0` |
| 3 | Ansible 自动化模板渲染不安全 Lookup 插件调用 | 具有相关 Ansible 自动化任务权限的已认证用户，可能通过构造恶意模板内容调用不安全的 Lookup 插件，导致 Ansible 执行环境内的命令执行或敏感信息泄露。 | V4 `v4.0.0` 至 `v4.10.16` LTS |
| 4 | SSH 网关 ProxyCommand 参数注入 | 具有相关权限的已认证用户，可能通过构造恶意 SSH 网关配置参数，在 Ansible 自动化任务执行过程中注入额外的 SSH 选项或系统命令，导致 Ansible 执行环境内的命令执行或敏感信息泄露。 | V4 `v4.0.0` 至 `v4.10.16` LTS |
| 5 | SQL Server 账户自动化 SQL 注入 | 具有资产账号管理权限的用户，可能通过构造恶意账号信息，在 SQL Server 账号推送、密码修改或账号删除等自动化任务执行过程中触发 SQL 注入，导致目标数据库中的数据泄露、篡改、删除或权限提升。 | V4 `v4.0.0` 至 `v4.10.16` LTS |
| 6 | Chen 组件查询控制台 SQL 文件路径遍历 | 具有 Chen 组件查询控制台访问权限的已认证用户，可能通过构造恶意 SQL 文件路径，绕过临时目录限制，导致 Chen 服务读取非预期文件，并且可能通过错误信息或日志泄露文件内容，或者尝试删除服务进程有权限操作的文件。 | V4 `v4.0.0` 至 `v4.10.16` LTS |
| 7 | Chen 组件数据库上下文切换 SQL 注入 | 具有数据库控制台访问权限的已认证用户，可能通过构造恶意数据库或 Schema 上下文参数，在切换数据库上下文时触发 SQL 注入，导致非预期的 SQL 执行，或者绕过部分 SQL 操作限制。实际影响取决于数据库驱动及账号权限。 | V4 `v4.0.0` 至 `v4.10.16` LTS |
| 8 | DBeaver Applet 命令参数注入 | 具有相关资产账号操作权限的已认证用户，可能通过恶意构造资产账号用户名等连接参数，在启动 DBeaver Applet 时注入额外的程序启动选项，从而导致运行 DBeaver Applet 的主机执行非预期命令。 | V4 `v4.0.0` 至 `v4.10.16` LTS |
| 9 | 钉钉扫码账号绑定校验不充分 | 在启用钉钉登录功能的环境中，由于扫码绑定回调存在状态校验不充分的问题，已认证用户可能将自己的钉钉身份绑定至其他尚未绑定钉钉的 JumpServer 账号，从而影响目标账号的身份绑定关系，并且可能导致后续的非预期账号登录。 | V4 `v4.0.0` 至 `v4.10.19` LTS<br />V5 `v5.0.0` |
| 10 | Ansible 自动化输入数据 Jinja 模板注入 | 部分自动化参数、资产信息及账号字段在进入 Ansible 执行流程时，未统一处理 Jinja 模板语法。部分任务在关闭隔离配置的前提下执行，经过构造的输入可能被当作模板求值，导致 Ansible 执行环境内的命令执行或信息泄露。实际影响取决于输入来源、任务权限、执行环境及隔离配置。 | V5 `v5.0.0` |

**3 升级说明**

升级前请先确认当前版本所处的分支，再选择对应的目标版本：V3 分支升级到 `v3.10.24` LTS，V4 分支升级到 `v4.10.21` LTS，V5 分支升级到 `v5.1.1`。同一大版本内的升级可以直接覆盖安装，升级步骤与离线包获取方式请参阅[升级指南](installation/setup_linux_standalone/offline_upgrade)。

跨大版本升级需要按顺序逐级进行，即 V3 先升级到 V3 的最新版本，再升级到 V4，最后升级到 V5，不能直接从 V3 跳到 V5，否则会因表结构变更导致升级失败。升级完成后，建议核对组件版本与登录、资产连接、账号改密等核心功能是否正常，并且确认当前版本已高于表 2 中对应漏洞的影响上限。

**4 特别鸣谢**

感谢以下安全研究人员向 JumpServer 开源社区及时反馈上述安全漏洞，帮助 JumpServer 持续提升产品的安全性：0xr1ngs、outx-sec、thezakman、PineBlizz、TateYdq、singkwoklam、0MrYang0、Lucidsec、Cywat（以上均为 GitHub 账号）。
:::


[信创合规、开箱即用、全栈优化丨飞致云联合宏时数据发布 Zabbix 信创一体机！](https://fit2cloud.com/zabbix/index.html)
## 1 JumpServer 是什么？

JumpServer 是广受欢迎的开源堡垒机，是符合 4A 规范的专业运维安全审计系统。JumpServer 帮助企业以更安全的方式管控和登录所有类型的资产，实现事前授权、事中监察、事后审计，满足等保合规要求。

![index_02](/img/jumpserver/jumpserver-arch-light.png)


JumpServer 堡垒机支持的资产类型包括：

- SSH  (Linux / Unix / 网络设备 等)
- Windows (Web 方式连接 / 原生 RDP 连接)
- 数据库 (MySQL / MariaDB / Oracle / SQLServer / PostgreSQL / ClickHouse 等)
- NoSQL (Redis / MongoDB 等)
- GPT (ChatGPT 等)
- 云服务 (Kubernetes / VMware vSphere 等)
- Web 站点 (各类系统的 Web 管理后台)
- 应用 (通过 Remote App 连接各类应用)


- [**产品官网**](https://jumpserver.org/)
- [**安装部署**](installation/setup_linux_standalone/requirements)  
- [**在线体验**](https://demo.jumpserver.org/)  
- [**企业版试用**](https://jinshuju.net/f/kyOYpi)  
- [**社区论坛**](https://bbs.fit2cloud.com/c/js/5) 
- [**视频教学**](https://www.bilibili.com/video/BV11AsDegEo8/) 
- [**技术白皮书**](https://whitepaper.jumpserver.org/)

## 2 产品特色

JumpServer 的产品特色包括：

- 开源：零门槛，线上快速获取和安装；
- 分布式：轻松支持大规模并发访问；
- 无插件：仅需浏览器，极致的 Web Terminal 使用体验；
- 多云支持：一套系统，同时管理不同云上面的资产；
- 云端存储：审计录像云端存储，永不丢失；
- 多租户：一套系统，多个子公司和部门同时使用；
- 多应用支持：数据库，Windows 远程应用，Kubernetes。

## 3 页面展示
![界面展示](/img/jumpserver/dashboard.png)

## 4 应用商店

JumpServer 的远程应用功能，社区版默认支持 Chrome、DBeaver 应用，企业版支持更丰富的远程应用，可点击 [应用商店](https://apps.fit2cloud.com/jumpserver) 来获取更多远程应用。

## 5 安全说明

- JumpServer 是一款安全产品，请遵循 [基本安全建议](faq/security) 进行安装部署
- 如果你发现安全问题，可以直接联系我们：support@fit2cloud.com

## 6 商业产品

- [JumpServer 企业版](https://jumpserver.org/enterprise.html)
- [JumpServer 一体机](https://jumpserver.org/hardware.html)

## 7 了解更多

- [如何向团队介绍 JumpServer？](https://www.fit2cloud.com/jumpserver/documents/introduce-jumpserver_2026.pdf)
- [JumpServer 技术白皮书](https://whitepaper.jumpserver.org/)
- [JumpServer 知识库](https://kb.fit2cloud.com/categories/jumpserver)
- [教学视频](https://space.bilibili.com/510493147?spm_id_from=333.337.0.0)
