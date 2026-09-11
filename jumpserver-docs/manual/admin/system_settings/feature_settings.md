---
title: 功能设置
---


- 通过点击页面右上角小齿轮进入 **系统设置** 页面，点击 **功能设置** ，进入功能设置页面。

## 1 公告

- 点击页面上方的 **公告** ，即进入公告设置页面。
- 该页面可以自定义是否启用公告功能，并设置公告内容，在JumpServer页面全局展示。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_feature1.png" alt="图 1  公告设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  公告设置</div>


- 启用公告后效果如下。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_feature2.png" alt="图 2  启用公告效果" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  启用公告效果</div>

## 2 工单

- 点击页面上方的 **工单** ，即进入工单设置页面。
- 可以自定义是否启用工单功能，用户可以通过工单来申请资源授权。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_feature3.png" alt="图 3  工单设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  工单设置</div>


- 启用工单后效果如下。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_feature4.png" alt="图 4  启用工单效果" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  启用工单效果</div>

## 3 作业中心

- 点击页面上方的 **作业中心** ，即进入作业中心设置页面。
- 批量命令执行选项决定是否允许用户在 **工作台 &gt; 作业中心** 中执行批量命令。
- 作业中心命令黑名单设置不允许在批量命令中使用的命令。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_feature5.png" alt="图 5  作业中心设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  作业中心设置</div>

## 4 账号存储


- 点击页面上方的 **账号存储** ，即进入账号存储设置页面。
- 账号密钥支持对接HashiCorp Vault第三方密钥存储系统，用户需要在 `config.txt` 配置文件中修改参数 `VAULT_ENABLED = true` 以及按照存储引擎配置 `VAULT_BACKEND = [local/hcp/azure/aws]` 参数，然后回到页面进行配置即可。
- 进行数据同步，同步是单向的，只会从本地数据库同步到远端 Vault，同步完成后本地数据库不再存储密码，请备份好数据。
- 二次修改 Vault 配置后需重启服务。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_feature6.png" alt="图 6  账号存储设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  账号存储设置</div>

## 5 智能问答


- 点击页面上方的 智能问答，即可进入智能问答设置页面。
- 智能问答支持对接 ChatGPT、Deepseek 以及自定义模型服务（自定义模型功能需在 &gt;= V4.10.14 版本中才可使用），开启后即可启动聊天 AI 功能进行智能问答。
- 填写聊天服务的基本地址、API Key，点击 **保存** ，再点击 **测试**；测试连接成功后，即可开始与智能问答小助手进行对话。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_feature7.png" alt="图 7  智能问答设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  智能问答设置</div>

## 6 虚拟应用


- 点击页面上方的 **虚拟应用** ，即进入虚拟应用设置页面。
- JumpServer支持使用Linux系统作为远程应用功能的运行载体，在此页面开启以Linux系统为底层的虚拟应用功能。
- 使用配置见[虚拟应用配置说明](virtual_apps)。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_systemsetting_feature8.png" alt="图 8  虚拟应用设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  虚拟应用设置</div>
