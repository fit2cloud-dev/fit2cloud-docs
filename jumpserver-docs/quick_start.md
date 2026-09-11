---
title: 快速入门
---

## 1 安装 JumpServer

- 支持主流 Linux 发行版本（基于 Debian / RedHat，包括国产操作系统）
- 参照 [Linux 单机安装部署指南](installation/setup_linux_standalone/offline_install) 来快速部署 JumpServer


```sh
地址: http://<JumpServer服务器IP地址>:<服务运行端口>
用户名: admin
密码: ChangeMe
```

## 2 资产管理
### 2.1 准备工作

[//]: # (- 准备两个测试资产和一个数据库来验证功能。)

[//]: # ()
[//]: # ()
[//]: # (|   IP 地址     |    主机名       |    端口    | 操作系统         |  管理员用户    |    密码       |)

[//]: # (| ------------ | --------------- | ---------- | ---------------- |--- ---------- |--- ---------- |)

[//]: # (| 172.16.80.11 |    test_ssh01   |     22     |     Centos 7     |      root     |  Test2020.L   |)

[//]: # (| 172.16.80.21 |    test_rdp01   |    3389    |    Windows 10    | administrator |  Test2020.W   |)

[//]: # (| 172.16.80.31 |   test_mysql01  |    3306    |      MySQL 5     |      root     |  Test2020.M   |)

:::warning[注意]

- Windows 资产如需执行 `更新资产` 信息、`可连接性测试` 等自动化任务，需先完成 Windows SSH 设置；此非登录 Windows 资产的必填项。
- MySQL 应用需要授权 `Core` 和 `KoKo` 的远程访问权限。
:::

### 2.2 编辑资产树

- 点击页面左侧的 `资产管理` - `资产列表`，在根节点 `Default` 右键新建 `SSH Server` 、 `RDP Server` 、`Database` 三个节点。

- 资产树样式如下：

```
Default
├─ SSH Server
└─ RDP Server
└─ DB Server
```

:::warning[注意]

- 根节点 `Default` 不能重命名，右击节点可以 `添加`、`删除` 和 `重命名` 节点，以及进行资产相关的操作。
:::

### 2.3 创建资产

- 点击页面左侧的 `资产管理` - `资产列表` - `主机` - `创建` 创建一台 Linux 服务器，并在创建资产过程中，创建特权用户，内容就是上面表单的 `管理员用户` 和 `密码`。
- Windows 资产的创建流程同样如此。


- 创建 Linux 资产样式如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  创建 Linux 资产示例</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'16%', padding:'8px'}}>名称</th><th style={{width:'16%', padding:'8px'}}>IP/主机</th><th style={{width:'16%', padding:'8px'}}>资产平台</th><th style={{width:'22%', padding:'8px'}}>节点</th><th style={{width:'14%', padding:'8px'}}>协议组</th><th style={{width:'16%', padding:'8px'}}>账号列表</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>test_ssh01</td><td style={{padding:'8px'}}>172.16.80.11</td><td style={{padding:'8px'}}>Linux</td><td style={{padding:'8px'}}>/Default/SSH Server</td><td style={{padding:'8px'}}>ssh 22</td><td style={{padding:'8px'}}>添加</td></tr>
</tbody>
</table>

- 添加登录资产用户样式如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  添加登录资产用户示例</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>名称</th><th style={{width:'20%', padding:'8px'}}>用户名</th><th style={{width:'20%', padding:'8px'}}>特权用户</th><th style={{width:'20%', padding:'8px'}}>密文类型</th><th style={{width:'20%', padding:'8px'}}>密码</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>172.16.80.11_root</td><td style={{padding:'8px'}}>root</td><td style={{padding:'8px'}}>是</td><td style={{padding:'8px'}}>密码</td><td style={{padding:'8px'}}>Test2020.L</td></tr>
</tbody>
</table>

:::warning[注意]

- `名称` 不能重名，`密码` 或者 `密钥` 二选一即可，一些资产不允许通过 `密码` 认证可以改用 `私钥` 认证。  
- `特权用户` 仅支持 `SSH` 协议，用于资产 `可连接性测试`、`推送用户`、`批量改密` 等自动化任务。
- 资产创建信息填写好保存之后隔几秒钟时间刷新一下网页，`ssh` 协议资产的可连接图标会显示 `绿色`，且 `硬件信息` 会显示出来。  
- 如果 `可连接` 的图标是 `黄色` 或者 `红色`，可以点击 `资产` 的 `名称`，在右侧 `快速修改` - `测试可连接性` 点击 `测试` 按钮，根据错误提示处理。  
- 被连接 `Linux` 资产需要 `python` 组件，且版本大于等于 `2.6`，`Ubuntu` 等资产默认不允许 `root` 用户远程 `ssh` 登录，请自行处理，`Windows` 资产需要手动安装 `OpenSSH Server `。
- 如果资产不能正常连接，请检查 特权用户 的 `用户名` 和 `密码` 是否正确以及该 `特权用户` 是否能使用 `SSH` 从 `JumpServer` 主机正确登录到资产主机上。
:::

### 2.4 创建数据库应用

- 点击页面左侧的 `资产管理` - `资产列表` - `创建` - `数据库下选择 MySQL 数据库`。


- 创建 MySQL 数据库应用样式如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  创建 MySQL 数据库应用示例</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'16%', padding:'8px'}}>名称</th><th style={{width:'16%', padding:'8px'}}>地址</th><th style={{width:'16%', padding:'8px'}}>节点</th><th style={{width:'16%', padding:'8px'}}>数据库</th><th style={{width:'18%', padding:'8px'}}>协议组</th><th style={{width:'18%', padding:'8px'}}>账号列表</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>test_mysql01</td><td style={{padding:'8px'}}>172.16.80.31</td><td style={{padding:'8px'}}>/Default/DB Server</td><td style={{padding:'8px'}}>test</td><td style={{padding:'8px'}}>mysql:3306</td><td style={{padding:'8px'}}>添加</td></tr>
</tbody>
</table>

- 添加登录数据库用户样式如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  添加登录数据库用户示例</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>名称</th><th style={{width:'20%', padding:'8px'}}>用户名</th><th style={{width:'20%', padding:'8px'}}>特权用户</th><th style={{width:'20%', padding:'8px'}}>密文类型</th><th style={{width:'20%', padding:'8px'}}>密码</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>172.16.80.23_root</td><td style={{padding:'8px'}}>root</td><td style={{padding:'8px'}}>root</td><td style={{padding:'8px'}}>密码</td><td style={{padding:'8px'}}>Test2020.M</td></tr>
</tbody>
</table>

:::warning[注意]

- 名称、主机、数据库选项为必填项。
:::

## 3 创建授权规则

- 点击页面左侧的 `权限管理` - `资产授权` - `创建` 创建一个授权。
- Windows 资产、MySQL 数据库 的授权流程和下述内容相同。


- 创建登录授权规则（例如 Linux 资产），样式如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 5  创建登录授权规则示例</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'14%', padding:'8px'}}>名称</th><th style={{width:'14%', padding:'8px'}}>用户</th><th style={{width:'14%', padding:'8px'}}>用户组</th><th style={{width:'14%', padding:'8px'}}>资产</th><th style={{width:'14%', padding:'8px'}}>节点</th><th style={{width:'14%', padding:'8px'}}>账号</th><th style={{width:'14%', padding:'8px'}}>动作</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>admin_ssh01</td><td style={{padding:'8px'}}>Administrator(admin)</td><td style={{padding:'8px'}}>-</td><td style={{padding:'8px'}}>test_ssh01(172.16.80.11)</td><td style={{padding:'8px'}}>-</td><td style={{padding:'8px'}}>所有账号</td><td style={{padding:'8px'}}>✓ 全部</td></tr>
</tbody>
</table>

:::warning[注意]

- `名称`，授权的名称，不能重复。  
- `用户` 和 `用户组` 二选一，不推荐即选择 `用户` 又选择 `用户组`。  
- `资产` 和 `节点` 二选一，选择 `节点` 会包含 `节点` 下面的所有 `资产`。  
- `账号`，`账号` 为连接资产的 `认证凭据`。  
- `用户(组)`，`资产(节点)` 是一对一的关系，所以当拥有 `Linux`、`Windows` 不同类型资产时，应该分别给 `Linux` 资产和 `Windows` 资产创建 `授权规则`。
:::

## 4 用户登录

- 点击页面右上角的 `Web 终端` 进行资产连接。

:::warning[注意]

- 用户只能看到自己被管理员授权了的 `资产`，如果登录后无资产，请联系管理员进行确认。
:::

## 5 系统设置

- 点击页面右上角的 `系统设置` 进行配置。

### 5.1 基本设置

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 6  基本设置示例</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'20%', padding:'8px'}}>名称</th><th style={{width:'35%', padding:'8px'}}>示例</th><th style={{width:'45%', padding:'8px'}}>备注</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>当前站点URL</td><td style={{padding:'8px'}}><code>https://demo.jumpserver.org</code></td><td style={{padding:'8px'}}>不设置的话，邮件收到的地址为 <code>http://localhost</code></td></tr>
<tr><td style={{padding:'8px'}}>用户向导URL</td><td style={{padding:'8px'}}></td><td style={{padding:'8px'}}>用户首次登录可以看到此 <code>超链接</code>，可以不设置</td></tr>
<tr><td style={{padding:'8px'}}>忘记密码URL</td><td style={{padding:'8px'}}></td><td style={{padding:'8px'}}>使用了 LDAP, OPENID 等外部认证系统，可以自定义</td></tr>
</tbody>
</table>

### 5.2 邮件设置

- 我们支持通过`SMTP`或`EXCHANGE`方式来对接邮件配置。

### SMTP


| 名称 | 示例 | 备注 |
| ---------- | ---------------- | ---------------------------------- |
| SMTP主机   | smtp.qq.com      | 服务商提供的 smtp 服务器             |
| SMTP端口   | 25               | 通常是 `25`                         |
| SMTP账号   | **********@qq.com | 通常是 `user@domain.com`            |
| SMTP密码   | **************** | 每次 `测试连接` 都需要重新输入密码    |
| 使用SSL    | [ ]              | 如果端口使用 `465`，必须勾选此项      |
| 使用TLS    | [ ]              | 如果端口使用 `587`，必须勾选此项      |
| 发件人     | **********@qq.com | `测试连接` 必须要输入                |
| 主题前缀   | [JMS]            | 邮件的标题，收到的邮件是 `[JMS]` 开头 |
| 测试收件人 | **********@qq.com | 测试连接必填                         |

:::warning[注意]

- 不可以同时勾选 `使用 SSL` 和 `使用 TLS`。
:::
## 6 常用功能操作

- **[通过 SFTP 上传下载][通过 SFTP 上传下载]**
- **[Windows 上传下载][Windows 上传下载]**
- **[限制 IP 登录][限制 IP 登录]**
- **[纳管数据库应用][纳管数据库应用]**
- **[Redis 数据库纳管][Redis 数据库纳管]**

[通过 SFTP 上传下载]: https://kb.fit2cloud.com/?p=115
[Windows 上传下载]: https://kb.fit2cloud.com/?p=87
[限制 IP 登录]: https://kb.fit2cloud.com/?p=199
[Redis 数据库纳管]: https://kb.fit2cloud.com/?p=91
[纳管数据库应用]: https://kb.fit2cloud.com/?p=79
