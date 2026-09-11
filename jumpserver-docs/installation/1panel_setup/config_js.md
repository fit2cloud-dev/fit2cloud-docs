---
title: 运维指南
---

## 1 SSL/TLS 证书配置
:::warning[注意]

- 首先，请确保在 1Panel 中已经安装部署了 openresty 应用。
:::

- 打开 1Panel，在左侧导航栏中依次点击 **网站** → **证书** → **上传证书** 按钮，进入到 **上传证书** 模块，用户可通过粘贴代码/选择服务器文件两种方式配置证书的私钥与证书信息。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_1panel_config1.png" alt="图 1  上传证书" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  上传证书</div>

当然也可以通过申请证书和自签证书的方式来创建证书。
系统会基于提交的私钥与证书文件自动识别域名、证书颁发组织等信息。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_1panel_config2.png" alt="图 2  证书列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  证书列表</div>

- 以下基于 OpenResty 实现在左侧导航栏中依次点击 **网站** →**网站**→**创建网站**，在已装应用中选择 **JumpServer** ，并配置相关的域名信息，同时在最下方选择启用 **HTTPS** ，点击 **确认** 按钮，即可完成网站的创建。

## 2 修改配置文件

- 在左侧菜单栏找到 **容器** ，点击上方的 **容器** 进入到具体的容器显示,然后找到 **jms_all** 对应的镜像，在右侧 **操作** 栏中点击 **更多** ，然后点击编辑。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_1panel_config3.png" alt="图 3  编辑容器" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  编辑容器</div>

- 在编辑页面中下划到页面最底端， 默认在 **网络** 栏中，我们点击该栏中的 **标签&环境变量** 进入到具体的文件配置栏目。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_1panel_config4.png" alt="图 4  配置环境变量" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  配置环境变量</div>

- 下拉到 **环境变量** 部分，可以修改，添加和删除各种环境变量的内容，修改完毕后点击 **确认** 即可完成配置文件的修改。

## 3 升级操作

- 首先在 1panel Linux 运维面板左侧导航栏中点击 **容器**。然后在右侧上方导航栏中点击 **容器** 按钮，即可查询当前所有当前服务器正在管理的容器。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_1panel_config5.png" alt="图 5  查看容器" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  查看容器</div>

- 找到 jms_all 容器（JumpServer 服务提供者），在右侧操作按钮中依次点击 **更多**→**升级** ，在目标镜像中选择合适的新版本镜像，最后点击 **确认** 按钮，即可完成JumpServer的升级。
<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/jumpserver/V4_1panel_config6.png" alt="图 6  升级容器" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  升级</div>
## 4 日志查看

- 容器--&gt;找到jumpserver容器 --&gt; 操作 日志查看容器日志。

## 5 应用备份
### 5.1 进入应用管理

- 登录 1Panel 控制台。
- 左侧菜单选择 **应用商店** → **已安装**。
- 找到 JumpServer 应用，点击右侧 **备份** 按钮。

### 5.2 进行备份操作

- 在备份页面找到 **备份** 按钮。
- 可输入压缩或解压缩密码（如有），以及对备份的描述（如有）。
- 点击确认，即可自动完成备份操作。

### 5.3 备份内容恢复

- 点击右上方备份，选中需要恢复的备份文件。
- 点击 **恢复** 即可返回备份时候的状态。
