---
title: "企业微信"
---

## 1 创建应用

:::note

- 打开 [企业微信管理后台](https://work.weixin.qq.com/)，用管理员权限用户登录。
- 点击【工作台-应用管理-创建应用】

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/企业微信应用管理.png)

图 1  企业微信应用管理

:::note

在创建应用的信息设置页面进行相关设置，可见范围可以选择接收消息通知的部门或个人。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/应用程序名称.png)

图 2  应用程序名称

## 2 获取凭据

:::note

创建完应用后，可以进入应用查看相关的访问凭证信息，记录 AgentId、Secret 对应的值。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/获取agentId和secret.png)

图 3  获取 agentId 和 secret

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/secret下发.png)

图 4  secret 下发

:::note

应用管理页面滑向页面底部，选中【企业微信授权登陆-设置】页面进行配置

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/企业微信授权登录.png)

图 5  企业微信授权登录

:::note

【授权回调域】填写 MeterSphere 访问地址

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/企业微信回调.png)

图 6  企业微信回调

:::note

点击【企业可信 IP-配置】按钮进入配置页面，填写 MeterSphere 服务器 IP 即可。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/配置企业可信IP.png)

图 7  配置企业可信 IP

:::note[注意]

【企业可信 IP】首次配置时，需要先配置可信域名。下载 txt 文件，并将其放到填写域名根目录下，可在 nginx 代理配置端口以便该 txt 能正常访问。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/nginx配置txt.png)

图 8  Nginx 配置 txt

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/可信域名配置.png)

图 9  可信域名配置

:::note

点击【我的企业-企业信息】获取企业ID。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/获取企业ID.png)

图 10  获取企业 ID

## 3 企业微信认证配置

:::note

点击【系统-系统参数-扫码登录-企业微信】，添加企业ID、应用ID、应用秘钥等信息后，测试连接成功后点击保存即可。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/企业微信连接成功.png)

图 11  企业微信连接成功（1）

## 4 企业微信登录

:::note

点击【系统-系统参数-扫码登录-企业微信】，添加企业ID、应用ID、应用秘钥等信息后，测试连接成功后点击保存即可。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/企业微信连接成功.png)

图 12  企业微信连接成功（2）

:::note

在 MeterSphere 登录页面，点击【更多登录方式】进行企业微信扫码登录。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/企业微信登录页面.png)

图 13  MeterSphere 登录页面

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/企业微信扫码登录.png)

图 14  企业微信扫码登录

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/work_weixin/正常登录.png)

图 15  正常登录
