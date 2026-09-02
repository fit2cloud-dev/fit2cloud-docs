---
title: 安装部署
description: 介绍 1Panel AI 网关的安装部署方式，包括官方镜像部署、首次启动、健康检查与客户端接入。

## 安装部署

系统支持以下数据库与部署组合：

- SQLite 单机：单个网关实例，适合快速部署和中小规模使用。
- PostgreSQL 单机：单个网关实例共享 PostgreSQL 数据库。
- PostgreSQL 高可用：多个网关实例共享 PostgreSQL，并由外部负载均衡和高可用 Redis 等基础设施提供高可用支撑。

部署边界：软件通过官方容器镜像交付，并提供部署参考；不负责安装和运维外部负载均衡、PostgreSQL、Redis 或可选的 Elasticsearch 集群。

### 默认运行参数

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  1Panel AI 网关默认运行参数</div>

| 项目 | 默认值 | 说明 |
| --- | --- | --- |
| 监听地址 | 0.0.0.0 | 监听全部 IPv4 接口。 |
| HTTP 端口 | 8080 | Web 管理界面和数据面 API 共用。 |
| 数据库 | SQLite | 默认数据库文件位于 /opt/ai-gateway/data/db/ai-gateway.db。 |
| 凭据密钥 | 自动管理 | SQLite 首次启动时生成 /opt/ai-gateway/data/security/credential.key。 |
| 优雅退出 | 60 秒 | 接收终止信号后等待请求退出。 |

### 使用官方镜像安装

在已安装 Docker 的服务器上拉取 1Panel AI 网关官方镜像：

```bash
docker pull 1panel/ai-gateway
```

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image1_pull_official_image.png" alt="拉取官方镜像"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  拉取官方镜像</div>

镜像拉取完成后，以 SQLite 单机模式启动：

```bash
docker run -d \
  --name 1panel-ai-gateway \
  --restart unless-stopped \
  -p 8080:8080 \
  -v /opt/ai-gateway:/opt/ai-gateway \
  1panel/ai-gateway
```

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image2_start_sqlite_standalone.png" alt="SQLite 单机模式启动"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  SQLite 单机模式启动</div>

启动后在浏览器访问 `http://服务器地址:8080`。生产环境建议通过 HTTPS 反向代理访问。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image3_browser_access.png" alt="浏览器访问"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  浏览器访问</div>

### 镜像版本与升级

正式镜像名称为 `1panel/ai-gateway`，标签与产品 Release 保持一致；不指定标签时，Docker 默认使用 `latest`。升级前执行：

```bash
docker pull 1panel/ai-gateway
```

拉取完成后，按 1.3 的参数重新创建容器，并持续保留 `/opt/ai-gateway` 数据目录。

### 首次启动

1. 确认 `/opt/ai-gateway` 数据目录可持久化，并限制无关用户访问。

2. 启动软件。空数据库会创建名为 Default 的默认用户组和唯一管理员。

3. 若未显式指定管理员密码，在本次启动日志中查找 `initial administrator created` 记录，复制一次性临时密码。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image4_find_initial_admin_password.png" alt="查找初始管理员密码"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  查找初始管理员密码</div>

4. 使用管理员用户名 `admin` 和临时密码登录；系统将强制跳转到密码修改页。

5. 设置 12 至 128 字节的新密码后进入管理端，立即配置上游账号与模型组。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image5_admin_login.png" alt="管理员登录"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  管理员登录</div>

首次密码：通过 `AI_GATEWAY_INITIAL_ADMIN_PASSWORD` 显式传入的密码不会写入日志；无论采用哪种方式，数据库只保存 Argon2id 强哈希。首次初始化完成后，重启不会覆盖已有管理员。

### 健康检查

可使用以下无需登录的接口检查进程与就绪状态：

```bash
curl -fsS http://127.0.0.1:8080/health/live
curl -fsS http://127.0.0.1:8080/health/ready
```

- `/health/live` 返回 `{"status":"ok"}`，表示 HTTP 进程可响应。
- `/health/ready` 返回 `{"status":"ok"}`，表示数据库和网关运行时已就绪。
- 就绪检查失败时返回 503 和 `{"status":"not_ready"}`。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image6_health_check_normal.png" alt="健康检查正常"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  健康检查正常</div>

## 接入客户端

完成网关部署与管理员配置后，即可将客户端接入 1Panel AI 网关。以下分别说明 Work Buddy、DeepSeek Harness、codex 三类客户端的接入步骤。

### 接入 Work Buddy

首先查看模型名称：登录管理端后，在「模型管理」或「用户组」页面查看当前已配置的模型标识，后续客户端配置需使用完全一致的模型名称。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image7_view_model_names.png" alt="查看模型名称"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  查看模型名称</div>

该用户需要创建 API Key：进入「API Key 管理」页面，为该用户或用户组创建新的 API Key。Key 仅在创建时完整显示一次，请务必立即复制保存。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image8_create_apikey.png" alt="创建 API Key"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  创建 API Key</div>

复制 API Key：妥善保管生成的 Key，避免泄露。如 Key 遗忘或泄露，需在管理端重新生成并更新所有客户端配置。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image9_copy_apikey.png" alt="复制 API Key"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  复制 API Key</div>

下载好 Work Buddy 客户端后，点击配置自定义模型：在客户端设置中找到「自定义模型」或「添加模型」入口。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image10_workbuddy_custom_model.png" alt="配置自定义模型"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  配置自定义模型</div>

提供商选择自定义：类型选择「自定义」或「OpenAI 兼容」，不要选择预设的 OpenAI 官方选项。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image11_select_custom_provider.png" alt="选择自定义提供商"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  选择自定义提供商</div>

填入：

- 接口地址（Base URL）：`https://1router.1panel.cn/v1`
- API Key：刚才复制的 API Key
- 模型名称：系统用户中配置好的模型名称

三者需完全一致。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image12_fill_integration_config.png" alt="填写接入配置"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  填写接入配置</div>

:::note[注意]
接口地址末尾的 `/v1` 路径不可省略，部分客户端会自动补全，但建议显式写入以避免请求失败。
:::

点击保存，选择刚才配置的模型进行测试：在模型列表中发送测试消息，验证请求是否正常返回。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/image13_save_and_test_model.png" alt="保存并测试模型"/>
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  保存并测试模型</div>

若请求返回 401 或 403，请优先检查 API Key 是否有效、是否复制完整；若返回 404，请检查接口地址与模型名称是否与配置一致。