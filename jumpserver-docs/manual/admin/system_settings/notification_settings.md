---
title: 通知设置
---


- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **通知设置** ，进入通知设置页面。

## 1 邮箱设置

- 邮件设置界面主要配置邮件的发件邮箱信息，用于发送创建用户密码设置邮件、危险命令邮件、授权过期邮件等邮件到JumpServer用户邮箱。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_notification_settings1.png" alt="图 1  邮箱设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  邮箱设置</div>


<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  邮箱设置参数说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'25%', padding:'8px'}}>参数</th><th style={{width:'75%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>协议</td><td style={{padding:'8px'}}>邮件服务使用的协议</td></tr>
<tr><td style={{padding:'8px'}}>主机</td><td style={{padding:'8px'}}>邮件服务器的地址</td></tr>
<tr><td style={{padding:'8px'}}>端口</td><td style={{padding:'8px'}}>邮件服务器使用的端口</td></tr>
<tr><td style={{padding:'8px'}}>账户</td><td style={{padding:'8px'}}>登录到邮件服务器的用户名</td></tr>
<tr><td style={{padding:'8px'}}>密码</td><td style={{padding:'8px'}}>登录到邮件服务器的密码</td></tr>
<tr><td style={{padding:'8px'}}>发件人</td><td style={{padding:'8px'}}>发件人的电子邮件地址</td></tr>
<tr><td style={{padding:'8px'}}>使用SSL</td><td style={{padding:'8px'}}>与SMTP服务器通信时是否使用隐式TLS连接</td></tr>
<tr><td style={{padding:'8px'}}>使用TLS</td><td style={{padding:'8px'}}>与SMTP服务器通信时是否使用TLS连接</td></tr>
<tr><td style={{padding:'8px'}}>邮件模板</td><td style={{padding:'8px'}}>用于发送邮件的模版，包括邮件标题前缀和邮件内容</td></tr>
<tr><td style={{padding:'8px'}}>收件人</td><td style={{padding:'8px'}}>用于测试电子邮件服务器是否连通的测试邮箱地址</td></tr>
</tbody>
</table>

## 2 短信设置

### 2.1 功能概述

- 可以设置短信MFA认证方式(目前支持阿里云、腾讯云、华为云、CMPP V2.0和自定义方式对接)。
- JumpServer还支持使用手机短信找回用户密码，管理员需要开启SMS服务，且用户信息需要配置手机号。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_notification_settings2.png" alt="图 2  短信设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  短信设置</div>

### 2.2 配置说明

- 选择对应的短信服务商，填入服务商平台认证相关信息，点击 **测试** 按钮可测试配置是否正确。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_notification_settings3.png" alt="图 3  短信服务商配置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  短信服务商配置</div>

- 您的 JumpServer 动态码为：$\{code\}，验证码 1 分钟内有效，请勿泄露！

### 2.3 用户侧配置

- 点击用户头像-个人信息在手机一栏配置用户个人手机号。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_notification_settings4.png" alt="图 4  配置用户手机号" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  配置用户手机号</div>


- 点击MFA认证设置按钮，进入设置页面。
- 点击启用MFA按钮，再点击启用SMS按钮即可使用短信认证功能。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_notification_settings5.png" alt="图 5  启用 MFA 认证" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  启用 MFA 认证</div>
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_notification_settings6.png" alt="图 6  启用短信认证" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  启用短信认证</div>

## 3 消息订阅
### 3.1 功能概述

- 可以设置 JumpServer 平台监控消息的接收人。
- 可以设置监控消息的发送方式(站内信和邮件)。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_notification_settings7.png" alt="图 7  消息订阅" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  消息订阅</div>
### 3.2 设置消息接收人

- 点击 **编辑消息接收人** 按钮，进入设置界面。
- 在可选择列表中勾选用户，会将其移入已选择。在已选择列表中勾选用户，会将其移入未选择。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_notification_settings8.png" alt="图 8  设置消息接收人" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  设置消息接收人</div>
