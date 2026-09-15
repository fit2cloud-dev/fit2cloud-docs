---
title: 资产连接
---


## Linux 资产连接


- 客户端支持 SSH、SFTP、VNC 协议连接目标 Linux 资产，连接后可执行命令，上传下载文件。


- 在 Linux 资产列表中，点击目标资产名称右侧的 **连接** ，弹出连接窗口。
- 在连接窗口中，选择协议，选择需要使用的账号，点击 **确认** 按钮，即可连接资产。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/clientV4_03.png" alt="图 1  Linux 资产连接" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  Linux 资产连接</div>

## Windows 资产连接


- 客户端支持 RDP、VNC、SSH、SFTP 协议连接目标 Windows 资产，连接后可执行命令，上传下载文件。
- 在 Windows 资产列表中，点击目标资产名称右侧的 **连接** ，弹出连接窗口。
- 在连接窗口中，选择协议，选择需要使用的账号，点击 **确认** 按钮，即可连接资产。

## 数据库资产连接

### 本地客户端配置


- 在使用客户端方式连接数据库之前，需要先配置本地客户端调用路径。
- 点击右上角的设置按钮，进入设置页面。
- 点击 **数据库** ，会展开支持连接的数据库列表，这里以 **MySQL** 为例。
- 选中 **MySQL** 后，右侧会出现可连接的应用列表并提供下载方式，点击 **下载应用** 并安装。
- 安装完成后，点击 **Select path** 配置其安装路径后，即可使用该应用进行数据库的连接。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/client_mysql.png" alt="图 2  本地客户端配置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  本地客户端配置</div>

### 连接资产

连接资产参考[web终端](../user/workbench/my_assets/web_terminal.md)中的连接方式