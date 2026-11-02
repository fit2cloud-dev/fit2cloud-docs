---
title: "OAuth2.0"
---

## 1 OAuth2.0 配置

:::note

使用 GitHub 平台作为 OAuth2.0 配置环境，进入 [创建应用](https://github.com/settings/applications/new) 页面，填写信息进行创建应用。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oauth2/oauth2应用.png)

图 1  OAuth2 应用

:::note

获取 Client ID 和 Client secrets 凭证信息。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oauth2/获取凭证.png)

图 2  获取凭证

:::note

点击【系统设置-系统-系统参数-认证设置-添加认证-OAuth2.0】填写认证信息，点击【添加】即可。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oauth2/oauth2配置.png)

图 3  OAuth2 配置

:::note[字段说明]

- 【授权端地址】格式为 `https://github.com/login/oauth/authorize`
- 【Token 端点地址】格式为 `https://github.com/login/oauth/access_token`
- 【用户信息端点地址】格式为 `https://api.github.com/user`
- 【回调地址】格式为 `http://MeterSphere 访问地址/sso/callback/oauth2`
- 【注销会话端地址】格式为 `https://github.com/loginout`
- 【属性映射】格式为 `{"userid":"login","username":"name","email":"email"}`

:::

## 2 OAuth2.0 登录

:::note

在 MeterSphere 登录页面，点击【OAuth2.0】跳转 OAuth2.0 登录页面进行登录。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oauth2/oauth2登录页面.png)

图 4  OAuth2 登录页面

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oauth2/源页面登录.png)

图 5  源页面登录

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oauth2/github页面登录.png)

图 6  GitHub 页面登录

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oauth2/成功登录.png)

图 7  成功登录
