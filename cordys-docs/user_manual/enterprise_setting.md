---
title: 企业设置
description: 介绍 Cordys CRM 企业设置中的界面设置、三方设置、邮件设置、模型设置与术语设置。
---

企业设置管理集中维护平台的全局配置，涵盖界面品牌、第三方平台对接、系统邮件、AI 模型以及企业术语五类内容。这些配置对整个企业生效，通常由管理员在系统上线初期完成，后续按需调整。

## 1 功能简介

企业设置由五个页签组成：**界面设置** 用于自定义平台的主题、Logo 与名称；**三方设置** 用于对接企业协同软件、数据分析工具、智能体平台、标讯平台与企业信息查询平台；**邮件设置** 用于配置系统发信服务器；**模型设置** 用于接入 AI 模型；**术语设置** 用于统一企业内部的标准表述。

## 2 入口位置

在左侧导航点击 **系统 › 企业设置**，进入企业设置页面，默认停留在“界面设置”页签。

## 3 界面设置

界面设置分为主题色、背景色、登录页面设置与设置四个区域。主题色与背景色均支持“默认”与“自定义”，背景色还可选择“跟随主题色”。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/enterprise-ui.png" alt="图 1  界面设置 - 登录页面设置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  界面设置 - 登录页面设置</div>

“登录页面设置”右侧提供登录页的预览，可配置以下内容：

- **网站 Logo**：顶部网站显示的 Logo。建议使用 SVG 或 PNG 格式透明背景图片，高度小于 32px，图片大小不超过 200KB。
- **登录 Logo**：登录页面左侧显示的 Logo。建议使用 SVG 或 PNG 格式透明背景图片，高度小于 48px，图片大小不超过 200KB。
- **登录背景图**：建议使用 SVG 格式；矢量图建议尺寸 1440 × 900，位图建议尺寸 1920 × 1080，图片大小不超过 800KB。
- **Slogan**：必填，展示在产品 Logo 下方的一行标语。
- **网站名称**：显示在网页标签页上的平台名称。

页面下方的“设置”区域用于配置主界面的 Logo 与帮助文档地址。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/enterprise-ui-end.png" alt="图 2  界面设置 - 主界面配置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  界面设置 - 主界面配置</div>

- **Logo**：主界面顶部栏显示的 Logo，要求与网站 Logo 一致（SVG 或 PNG 透明背景，高度小于 32px，不超过 200KB）。
- **帮助文档**：帮助文档的跳转链接，默认为官方帮助文档地址。修改后成员点击顶栏“帮助中心 › 帮助文档”将跳转到该地址，具体说明请参见[帮助文档](./help_docs.md)。

## 4 三方设置

三方设置按平台类型分组，每个平台以卡片形式展示当前配置状态（未配置 / 成功），并提供“去配置”或“测试连接”操作，配置完成后通过开关控制该能力是否启用。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/enterprise-third.png" alt="图 3  三方设置 - 协同、BI 与智能体平台" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  三方设置 - 协同、BI 与智能体平台</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/enterprise-third-end.png" alt="图 4  三方设置 - 智能体、标讯与企业信息查询平台" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  三方设置 - 智能体、标讯与企业信息查询平台</div>

各分组的可配置平台如下：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  三方设置可对接的平台</div>

| 分组 | 平台 | 配置说明 |
|---|---|---|
| 企业协同软件 | 企业微信 / 钉钉 / 飞书 | 配置企业应用信息，可开启“同步用户”将成员同步到系统。步骤见下方[企业微信](#41-企业微信)、[钉钉](#42-钉钉)、[飞书](#43-飞书) |
| 数据分析工具 | DataEase | 配置连接信息并测试连接，开启后启用“仪表板”能力 |
| 智能体平台 | MaxKB | 配置连接信息，开启后启用“智能体”能力 |
| 标讯平台 | 大单网 | 配置后测试连接，开启后启用标讯模块数据 |
| 企业信息查询平台 | 企查查 | 配置后启用企业信息查询能力 |

### 4.1 企业微信


#### 1 企业微信配置


**1 企业微信管理员权限**

需要使用“企业微信管理员账号”（或具有通讯录管理权限的子管理员），普通成员账号没有权限创建应用或同步通讯录。

**2 登录** [企业微信管理后台](https://work.weixin.qq.com/wework_admin/loginpage_wx?from=myhome)

![企业微信管理后台](/img/cordys/user_manual/wecom_bg.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  企业微信管理后台</div>


**3 配置通讯录 API 权限**

  在企业微信后台为应用开启“通讯录读写权限”。常见需要的权限包括：

  - 通讯录组织架构只读（同步组织结构）
  - 通讯录组织架构读写（创建/修改部门和成员）

![配置](/img/cordys/user_manual/wecom-settings.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  配置通讯录 API 权限</div>


**4 创建应用并获取凭证**

在企业微信管理后台创建自建应用或“第三方应用”，并获取以下关键凭证：

 - 企业 ID（CorpID）
 - 应用的 AgentId
 - 应用的 Secret

![配置](/img/cordys/user_manual/wecom_app.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  创建应用并获取凭证步骤1</div>
![配置](/img/cordys/user_manual/wecom_app_create.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8 创建应用并获取凭证步骤2</div>


**5 安全配置**

  - 配置应用的“可信 IP 白名单”，确保调用 API 时不被拒绝
  - 部署 HTTPS 服务
  - 配置回调 URL

![配置](/img/cordys/user_manual/wecom_app_config.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  安全配置</div>


 **域名归属认证说明**

  在配置可信域名之前，需要先完成域名归属认证。请按照以下步骤操作：
  
  1. **将企业微信提供的验证文件上传至域名根目录**
     下载企业微信提供的 `WW_verify_xxxxx.txt` 文件，并将其放置在域名的根目录下。

     根目录位置可能因服务器环境不同而有所差异，通常包括以下路径：
   
      * `/var/www/html/`
      * `/usr/share/nginx/html/`
      * `/var/www/`
        
     请根据实际服务器配置确认，完成后可通过以下地址访问验证：

     ```
     https://yourdomain/WW_verify_xxxxx.txt
     ```
  
  2. **使用 Nginx 反向代理时的配置方法**
     如果当前服务通过 Nginx 反向代理，可以在站点配置中添加如下规则，以直接返回验证文件内容：
   
     ```nginx
     location = /WW_verify_xxxxx.txt { # 企业微信下载的文件名称
         add_header Content-Type 'text/html; charset=utf-8';
         return 200 'Cv9TeWwxxxjAMOak';  # 该内容为企业微信验证文件中的实际文本
     }
     ```

![配置](/img/cordys/user_manual/wecom_app_domain.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  设置可信任域名</div>


**5 数据准备**

  确认外部系统中的部门、成员数据字段与企业微信字段对应：

  - 部门 ID、父部门 ID、部门名称
  - 成员账号（userid）、姓名、职位

**注意:**
- 手机号、邮箱等敏感字段默认不会在组织架构同步中返回，如需获取需额外授权；
- 如果要使用 【组织架构同步】和【OAuth2 认证】功能 Cordys CRM 部署地址必须是可信域名，不能使用 IP 地址或自己做的内网穿透地址。

#### 2 Cordys CRM 配置同步组织架构

##### 2.1 配置企业微信信息

![开启同步开关示意图](/img/cordys/user_manual/wecom-enable2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  开启同步开关示意图</div>

##### 2.2 同步企业微信组织架构


1. 点击【系统】菜单，进入【组织架构】页面
2. 点击“更多”按钮下的“企业微信同步”选项，系统将自动触发同步流程
3. 同步完成后，页面左侧的组织架构区域将自动展示从企业微信同步过来的完整组织架构

**后续维护说明**：当企业微信中新增成员或调整组织架构后，只需重复执行上述“企业微信同步”操作，即可完成最新组织架构的更新。

![同步组织架构](/img/cordys/user_manual/wecom-sync2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  同步组织架构</div>


 **重要提醒：**

   - 获取成员详情接口（user/get）从 2025 年 6 月 20 日 20:00 起，所有新创建的自建应用和代开发应用在调用 `user/get` 接口时，将不再返回头像、性别、手机号、邮箱、企业邮箱、地址等敏感字段。只有通过 OAuth2 授权流程，并获得管理员以及成员本人授权后，才能获取完整信息。  

   - 同步通讯录接口仅返回组织架构和成员基础信息，不会包含手机号、邮箱等敏感字段。  
     
 官方文档：[通讯录同步](https://developer.work.weixin.qq.com/document/path/91039)

#### 3 企业微信工作台访问 Cordys CRM

![工作台访问](/img/cordys/user_manual/wecom_workbench2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  工作台访问</div>
![移动端界面](/img/cordys/user_manual/wecom_workbench_main2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 14  移动端界面</div>

### 4.2 钉钉


#### 1 钉钉配置


**1 钉钉管理员权限**

需要使用“钉钉管理员账号”（或具有通讯录管理权限的子管理员），普通成员账号无法创建应用或同步通讯录。

**2 登录** [钉钉管理后台](https://open-dev.dingtalk.com/) 并获取以下关键凭证：

- 企业 ID（CorpID）

![钉钉管理后台](/img/cordys/user_manual/dingtalk_bg2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 15  钉钉管理后台</div>


**3 创建应用并获取凭证**

在钉钉管理后台应用开发页面选择企业内部应用-钉钉应用-创建自建应用，在应用列表页面点击更多，查看应用详情-应用凭证与基础信息，并获取以下关键凭证：

- 创建应用

![配置](/img/cordys/user_manual/dingtalk_app2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 16  创建应用</div>


 - 点击应用详情获取配置信息：
     - 原企业内部应用AgentId (内部应用id，用于发送钉钉的应用通知) 
     - 应用的 Client ID (应用id)
     - 应用的 Client Secret  (应用密钥)

![配置](/img/cordys/user_manual/dingtalk_config2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 17  获取凭证</div>


**4 配置通讯录 API 权限**

  在权限管理页面为应用开启 API 权限。常见需要的权限包括：

    - 个人权限-个人手机号信息（同步组织结构）
    - 个人权限-通讯录个人信息读取权限（同步组织结构）
    - 通讯录管理-通讯录部门信息读取权限（同步组织结构）
    - 通讯录管理-成员信息读取权限（同步组织结构）

![配置](/img/cordys/user_manual/dingtalk-settings2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 18  配置通讯录 API 权限</div>


**5 安全配置**

    - 安全设置-服务器IP出口配置应用的“可信 IP 白名单”，确保调用 API 时不被拒绝, 配置回调 URL
    - 分享设置-配置回调 URL(用户免登录)

![配置](/img/cordys/user_manual/dingtalk_app_config2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 19  安全配置</div>


**6 应用能力**

- **添加应用能力**
    - 添加网页应用（此功能可选）。如果需要在钉钉工作台访问 Cordys CRM，则必须添加此功能。
  - **配置网页应用**
      - **PC端访问地址**  
        `https://你的域名`  
        或  
        `https://login.dingtalk.com/oauth2/auth?redirect_uri=https://你的域名&response_type=code&client_id=dingxxxxxxx&scope=openid&state=dddd&prompt=consent`
      - **移动端访问地址**  
        `https://你的域名`  
        或  
        `https://login.dingtalk.com/oauth2/auth?redirect_uri=https://你的域名%2Fmobile&response_type=code&client_id=dingxxxxxxx&scope=openid&state=dddd&prompt=consent`
    
![配置](/img/cordys/user_manual/dingtalk_net_work_settings2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 20  网页应用配置</div>


  - **配置分享设置**
      - 配置回调地址：  
        `https://你的域名`  
        或  
        `https://login.dingtalk.com`

![配置](/img/cordys/user_manual/dingtalk_net_work_config2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 21  配置分享设置</div>


**7 数据准备**

确认外部系统中的部门、成员数据字段与钉钉字段对应：
  - 部门 ID、父部门 ID、部门名称
  - 成员账号（userid）、姓名、职位

#### 2 Cordys CRM 配置同步组织架构

##### 2.1 配置钉钉信息

![开启同步开关示意图](/img/cordys/user_manual/dingtalk-enable2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 22  开启同步开关示意图</div>

##### 2.2 同步钉钉组织架构


1. 点击【系统】菜单，进入【组织架构】页面
2. 点击“更多”按钮下的“钉钉同步”选项，系统将自动触发同步流程
3. 同步完成后，页面左侧的组织架构区域将自动展示从钉钉同步过来的完整组织架构

**后续维护说明**：当钉钉中新增成员或调整组织架构后，只需重复执行上述“钉钉同步”操作，即可完成最新组织架构的更新。

![同步组织架构](/img/cordys/user_manual/dingtalk-sync2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 23  同步组织架构</div>


**重要提醒：**
   - 所有钉钉配置均需要应用发布成功后生效

钉钉官方文档：[通讯录同步](https://open.dingtalk.com/document/orgapp/contacts-overview)
      
![发布应用](/img/cordys/user_manual/dingtalk_public2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 24  发布应用</div>

#### 2.2 钉钉工作台访问 Cordys CRM

![工作台访问](/img/cordys/user_manual/dingtalk_workbench2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 25  工作台访问</div>

![移动端界面](/img/cordys/user_manual/dingtalk_workbench_main2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 26  移动端界面</div>

### 4.3 飞书


#### 1 飞书配置


**1 飞书管理员权限**

需要使用“飞书管理员账号”（或具有通讯录管理权限的子管理员），普通成员账号无法创建应用或同步通讯录。

**2 登录** [飞书管理后台](https://open.feishu.cn/app) 创建应用：

![飞书管理后台](/img/cordys/user_manual/lark_bg2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 27  飞书管理后台</div>


**3 获取应用凭证**

创建自建应用后，在后台点击应用卡片，查看应用详情-应用凭证与基础信息，并获取以下关键凭证：

 - 点击应用详情获取配置信息：
     - 应用的 App ID (应用id)
     - 应用的 App Secret  (应用密钥)

![配置](/img/cordys/user_manual/lark_app2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 28  获取应用凭证1</div>


点击功能菜单按钮，选择管理后台选项，获取企业信息：

 - 企业编码（CorpID）

![配置](/img/cordys/user_manual/lark_config2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 29  获取应用凭证2</div>
![配置](/img/cordys/user_manual/lark_corp2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 30  获取应用凭证3</div>


**4 配置通讯录 API 权限**

  在权限管理页面为应用开启 API 权限。常见需要的权限包括：

  - 企业信息-获取企业信息（同步组织结构时获取您的企业名称，否则会赋予统一默认值-公司名称）
  - 组织架构-应用身份权限-调用API功能相关权限以及获取员工邮箱权限（同步组织结构，员工邮箱权限可自选）
  - 组织架构-用户身份权限-调用API功能相关权限以及部门信息相关读取权限（同步组织结构）
  - 通讯录-获取通讯录，部门，用户基本信息，获取通讯录部门组织架构， 用户组织架构信息， 获取用户 user ID（同步组织结构）
  - 消息与群组-获取与发送单聊、群组消息，以应用的身份发消息（Cordys CRM 通过应用发送通知）

![配置](/img/cordys/user_manual/lark_permission2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 31  配置通讯录 API 权限</div>


**5 安全设置**

  - 重定向URL-添加重定向 URL 作为免登授权码跳转地址。其他重定向 URL 将无法获取免登授权码。（必须添加 Cordys CRM 可访问的域名，eg:https://example.com (域名后缀不要有/)，如需在移动端访问，还需添加 Cordys CRM 可访问的移动端URL，eg:https://example.com/mobile）
  - IP白名单-开启 IP 白名单后，仅白名单中的来源请求可以正常调用开放平台 API，不在白名单中的来源请求会被拒绝
  - H5可信域名-添加可信域名，确保在飞书内访问时不会被拦截

![配置](/img/cordys/user_manual/lark_app_config2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 32  安全配置</div>


**6 应用能力**

- **添加应用能力**
    - 添加网页应用（此功能可选）。如果需要在飞书工作台访问 Cordys CRM，则必须添加此功能。
    - 添加机器人（此功能可选）。如果需要在飞书接收 Cordys CRM 通知，则必须添加此功能。
    - 注意：如果机器人应用与网页应用同时开启，则打开应用时需要点击机器人应用图标，选择打开应用。（客户端与移动端都是如此）

  - **配置网页应用**
      - **桌面端主页**   
        `https://open.feishu.cn/open-apis/authen/v1/authorize?app_id=cli_****************&redirect_uri=https%3A%2F%2F你的域名&state=LARK`

      - **移动端访问地址**  
        `https://open.feishu.cn/open-apis/authen/v1/authorize?app_id=cli_****************&redirect_uri=https%3A%2F%2F你的域名&state=LARK`

    
![配置](/img/cordys/user_manual/lark_net_work_settings2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 33  网页应用配置</div>


**7 数据准备**

  确认外部系统中的部门、成员数据字段与飞书字段对应：

  - 部门 ID、父部门 ID、部门名称
  - 成员账号（userid）、姓名、职位

#### 2 Cordys CRM 配置同步组织架构

##### 2.1 配置飞书信息

![开启同步开关示意图](/img/cordys/user_manual/lark_enable2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 34  开启同步开关示意图</div>

##### 2.2 同步飞书组织架构


1. 点击【系统】菜单，进入【组织架构】页面
2. 点击“更多”按钮下的“飞书同步”选项，系统将自动触发同步流程
3. 同步完成后，页面左侧的组织架构区域将自动展示从飞书同步过来的完整组织架构

**后续维护说明**：当飞书中新增成员或调整组织架构后，只需重复执行上述“飞书同步”操作，即可完成最新组织架构的更新。

![同步组织架构](/img/cordys/user_manual/lark_sync2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 35  同步组织架构</div>


**重要提醒：**

   - 所有飞书配置均需要应用发布成功后生效
     
  👉 飞书官方文档：[通讯录同步](https://open.feishu.cn/document/server-docs/contact-v3/department/children)

![发布应用](/img/cordys/user_manual/lark_public2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 36  发布应用</div>

#### 3 飞书工作台访问 Cordys CRM 

![工作台访问](/img/cordys/user_manual/lark_workbench2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 37  工作台访问</div>

![打开应用](/img/cordys/user_manual/lark_workbench_main2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 38  打开应用</div>

## 5 邮件设置

邮件设置用于配置系统发信服务器，配置完成后再决定哪些消息场景需要发送邮件（具体场景开关在[消息设置](./message_setting.md)中维护）。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/enterprise-mail.png" alt="图 39  邮件设置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 39  邮件设置</div>

需填写的内容包括 SMTP 主机、SMTP 端口、SMTP 账户、SMTP 密码、指定发件人与测试收件人，并可开启 SSL 与 TLS 加密。填写完成后点击“测试连接”验证配置是否可用。

## 6 模型设置

模型设置用于接入 AI 模型，供智能体等能力调用。点击“模型供应商”可添加模型，列表展示模型名称、模型 ID、提供商、状态、日调用量上限（tokens）、今日调用量（tokens）、创建时间与创建人。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/enterprise-model.png" alt="图 40  模型设置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 40  模型设置</div>

## 7 术语设置

术语设置用于统一企业内部的标准表述。左侧按业务域分为销售类、客户类、合同财务类、流程审批类，右侧维护该业务域下的标准术语、同义词与禁用词，并支持启用或停用。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/user_manual/enterprise-term.png" alt="图 41  术语设置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 41  术语设置</div>

:::important[重要]
界面设置中的 Logo、背景图与邮件配置会直接影响全局展示与消息投递，请在修改前准备好符合格式与体积要求的素材，并保留原始文件以便回滚。
:::
