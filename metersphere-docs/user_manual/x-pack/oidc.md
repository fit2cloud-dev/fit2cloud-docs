---
title: "OIDC"
---

## 1 OIDC 系统配置

:::note

点击【Realm Setting】，输入名称后，点击【保存】。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/oidc配置.png)

图 1  OIDC 配置

:::note

点击【Client-Create】进入页面，填写 Client ID、Root URL 信息后，进行保存。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/oidc创建.png)

图 2  OIDC 创建

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/配置地址.png)

图 3  配置地址

:::note

【Access Type】选择 confidential。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/oidc详细配置信息.png)

图 4  OIDC 详细配置信息

:::note

点击【User】创建用户后，切到【Credentials】页面，关闭临时，并设置用户密码。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/创建用户.png)

图 5  创建用户

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/用户信息.png)

图 6  用户信息

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/设置密码.png)

图 7  设置密码

:::note

点击【Realm Settings】后，切到【General】页面，点击【OpenID Endpoint Configuration】进入 openid-configuration 页面。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/点击OpenID.png)

图 8  点击 OpenID

:::note

留存此页面，用于 MeterSphere OIDC 配置参考。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/信息页面.png)

图 9  信息页面

:::note

点击【client-metersphere-Credentials】获取 Secret 值。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/secret页面.png)

图 10  secret 页面

## 2 MeterSphere 配置 OIDC

:::note

点击【系统设置-系统-系统参数-认证设置-添加认证-OIDC】填写认证信息，点击【添加】即可。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/MeterSphere配置内容.png)

图 11  MeterSphere 配置内容

:::note[字段获取]

- 【授权端地址】对应 openid-configuration 页面 authorization_endpoint 参数
- 【Token 端点地址】对应 openid-configuration 页面 token_endpoint 参数
- 【用户信息端点地址】对应 openid-configuration 页面 userinfo_endpoint 参数
- 【回调地址】格式为 `http://Metersphere 访问地址/sso/callback/oidc/${authId}`
- 【注销会话端地址】对应 openid-configuration 页面 end_session_endpoint 参数

:::

## 3 OIDC 登录

:::note

在 MeterSphere 登录页面，点击【OIDC】跳转 OIDC 登录页面进行登录。

:::

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/oidc登录页面.png)

图 12  OIDC 登录页面

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/oidc源页面登录.png)

图 13  OIDC 源页面登录

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/oidc登录.png)

图 14  OIDC 登录

![!资源池列表页面](/img/metersphere/X-Pack/single_sign/oidc/oidc登录成功.png)

图 15  OIDC 登录成功
