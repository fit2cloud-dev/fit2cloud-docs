---
title: 离线安装
description: 介绍 1Panel AI 网关的离线安装方式，涵盖离线包内容、下载与解压、交互式安装、安装结果、服务管理、健康检查与离线升级，适用于内网与离线机房等无外网环境。
---

:::tip[推荐使用离线安装]

离线安装是本产品**推荐**的部署方式。相比通过 1Panel 应用商店安装，它具有以下优势：

- **全程离线、开箱即用**：离线包内置 Docker 离线安装包、网关镜像与 PostgreSQL 镜像，安装过程不依赖外网，也无需自行准备数据库实例。
- **自带 1gctl 命令行工具**：安装完成后可直接在部署服务器上执行 `1gctl` 完成服务状态检查、启停、重启、日志查看与卸载；通过 1Panel 应用商店方式部署的网关没有该工具。
- **不受 1Panel 版本限制**：通过 1Panel 应用商店安装 PostgreSQL 版本，需要 **1Panel v2.4.0 及以上版本**；1Panel 版本低于 v2.4.0 时，应用商店的版本列表不会显示 PostgreSQL 版本。
- **避免数据库类型被锁定**：SQLite 与 PostgreSQL 之间不能直接升级，也不能交叉恢复备份。通过 1Panel 应用商店以 SQLite 方式部署后，升级到 v1.5.1 仍只能继续使用 SQLite，无法切换为 PostgreSQL，除非重新部署。

:::

## 1 适用场景

离线安装适用于部署服务器**无法访问外网**的内网、离线机房及涉密环境。

- 离线包内已包含安装所需的 Docker、容器镜像与依赖文件，安装过程**不依赖外网**。
- 社区版不提供 arm 架构离线包，如需在 arm 架构下部署，请采用[在线安装](./online_installation.md)方式。

## 2 环境要求

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  离线部署环境要求</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'22%', padding:'8px'}}>项目</th><th style={{width:'78%', padding:'8px'}}>要求</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>操作系统</td><td style={{padding:'8px'}}>支持主流 Linux 发行版本（基于 Debian / RedHat，包括国产操作系统）</td></tr>
<tr><td style={{padding:'8px'}}>服务器架构</td><td style={{padding:'8px'}}>x86_64</td></tr>
<tr><td style={{padding:'8px'}}>容器运行时</td><td style={{padding:'8px'}}>Docker。离线包内置 Docker 28.4.0 离线安装包：服务器未安装 Docker 时由安装脚本自动离线安装，已安装时跳过该步骤</td></tr>
<tr><td style={{padding:'8px'}}>浏览器</td><td style={{padding:'8px'}}>Chrome、Edge 等现代浏览器</td></tr>
</tbody>
</table>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  离线部署端口要求</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'18%', padding:'8px'}}>端口</th><th style={{width:'26%', padding:'8px'}}>作用</th><th style={{width:'56%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>22</td><td style={{padding:'8px'}}>SSH</td><td style={{padding:'8px'}}>上传安装包、执行安装与后续维护</td></tr>
<tr><td style={{padding:'8px'}}>8080</td><td style={{padding:'8px'}}>Web 控制台与 API</td><td style={{padding:'8px'}}>默认访问端口，Web 管理界面和数据面 API 共用；如使用云服务器，请确保安全组已开放该端口</td></tr>
<tr><td style={{padding:'8px'}}>5432</td><td style={{padding:'8px'}}>PostgreSQL</td><td style={{padding:'8px'}}>仅容器网络内部使用，不对外暴露，无需在安全组或防火墙中开放</td></tr>
</tbody>
</table>

## 3 离线包内容

解压后的离线包目录结构如下所示（以 v1.5.1 amd64 为例）：

```text
1panel-ai-gateway-v1.5.1-linux-amd64/
├── install.sh                      安装脚本
├── upgrade.sh                      升级脚本
├── 1gctl.sh                        控制工具脚本（安装后注册为 1gctl 命令）
├── docker-28.4.0.tar.gz            内置 Docker 离线安装包
├── iptables-deb.tar.gz             内置 iptables 依赖包
├── docker-compose-postgres.yaml    容器编排文件
├── versions.txt                    版本信息
└── images/
    ├── ai-gateway.tar.gz           1Panel AI 网关镜像
    └── postgres.tar.gz             PostgreSQL 镜像
```

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  离线包主要文件说明</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'34%', padding:'8px'}}>文件</th><th style={{width:'66%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}><code>install.sh</code></td><td style={{padding:'8px'}}>安装脚本，交互式引导完成安装</td></tr>
<tr><td style={{padding:'8px'}}><code>upgrade.sh</code></td><td style={{padding:'8px'}}>升级脚本，用于将已有安装升级到当前离线包版本</td></tr>
<tr><td style={{padding:'8px'}}><code>1gctl.sh</code></td><td style={{padding:'8px'}}>控制工具脚本，安装后注册为 <code>/usr/local/bin/1gctl</code> 命令</td></tr>
<tr><td style={{padding:'8px'}}><code>docker-28.4.0.tar.gz</code></td><td style={{padding:'8px'}}>内置的 Docker 离线安装包，服务器未安装 Docker 时使用</td></tr>
<tr><td style={{padding:'8px'}}><code>iptables-deb.tar.gz</code></td><td style={{padding:'8px'}}>内置的 iptables 依赖包，供 Docker 离线安装使用</td></tr>
<tr><td style={{padding:'8px'}}><code>docker-compose-postgres.yaml</code></td><td style={{padding:'8px'}}>容器编排文件，定义网关与 PostgreSQL 两个容器</td></tr>
<tr><td style={{padding:'8px'}}><code>versions.txt</code></td><td style={{padding:'8px'}}>当前离线包的版本信息</td></tr>
<tr><td style={{padding:'8px'}}><code>images/ai-gateway.tar.gz</code></td><td style={{padding:'8px'}}>1Panel AI 网关容器镜像</td></tr>
<tr><td style={{padding:'8px'}}><code>images/postgres.tar.gz</code></td><td style={{padding:'8px'}}>PostgreSQL 容器镜像</td></tr>
</tbody>
</table>

上表中的 `1gctl.sh` 在安装后即为 `1gctl` 命令行工具，其完整说明请参见 [1gctl 命令行工具](./cli.md)。

安装脚本会自动完成以下处理：

- **Docker**：检测服务器是否已安装 Docker。**未安装**时使用包内的 `docker-28.4.0.tar.gz` 离线安装，**已安装**时跳过该步骤。
- **镜像**：将包内的网关镜像与 PostgreSQL 镜像加载到本地，无需从外网或镜像仓库拉取。
- **数据库**：加载 PostgreSQL 镜像并拉起数据库容器，无需自行准备 PostgreSQL 实例。

## 4 下载离线包

打开[飞致云开源社区 1Panel AI 网关社区版下载](https://community.fit2cloud.com/#/products/1panel-ai-gateway/downloads)页面，**登录后**下载最新版本的离线安装包。

<img src="/img/offline_installation/image1-download.png" alt="社区版下载页" style={{display:'block',margin:'16px auto',maxWidth:'100%'}}/>

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'6px 0 20px'}}>图 1  社区版下载页</div>

- 当前最新版本为 **v1.5.1**，安装包文件名为 `1panel-ai-gateway-v1.5.1-linux-amd64.tar.gz`。
- 下载页会同步提供各历史版本的安装包，可按需选择。

下载完成后，将离线包**上传至部署服务器**，下文以 `/home` 目录为例说明安装过程。

## 5 安装部署

### 5.1 解压安装包

以 **root 用户**通过 SSH 登录部署服务器，执行以下命令解压：

```bash
cd /home
# 请将示例文件名替换为实际下载的安装包名称
tar zxvf 1panel-ai-gateway-v1.5.1-linux-amd64.tar.gz
```

<img src="/img/offline_installation/image2-extract.png" alt="解压离线安装包" style={{display:'block',margin:'16px auto',maxWidth:'100%'}}/>

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'6px 0 20px'}}>图 2  解压离线安装包</div>

### 5.2 执行安装脚本

```bash
# 进入解压后的目录（目录名与安装包同名）
cd 1panel-ai-gateway-v1.5.1-linux-amd64

# 执行安装脚本
/bin/bash install.sh
```

安装脚本为**交互式**，会依次询问以下信息，直接回车即使用方括号中的默认值：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  安装脚本交互项</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'34%', padding:'8px'}}>提示</th><th style={{width:'16%', padding:'8px'}}>默认值</th><th style={{width:'50%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>请输入安装基础目录</td><td style={{padding:'8px'}}><code>/opt</code></td><td style={{padding:'8px'}}>安装目录为「基础目录 / 1panel-ai-gateway」，默认即 <code>/opt/1panel-ai-gateway</code></td></tr>
<tr><td style={{padding:'8px'}}>请输入网关端口</td><td style={{padding:'8px'}}><code>8080</code></td><td style={{padding:'8px'}}>Web 管理界面与数据面 API 共用</td></tr>
<tr><td style={{padding:'8px'}}>请输入管理员用户名</td><td style={{padding:'8px'}}><code>admin</code></td><td style={{padding:'8px'}}>登录网关的管理员账号</td></tr>
<tr><td style={{padding:'8px'}}>请输入管理员密码</td><td style={{padding:'8px'}}><code>ChangeMe</code></td><td style={{padding:'8px'}}>需再次输入以确认；使用默认值时请登录后尽快修改</td></tr>
</tbody>
</table>

<img src="/img/offline_installation/image3-install.png" alt="执行安装脚本" style={{display:'block',margin:'16px auto',maxWidth:'100%'}}/>

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'6px 0 20px'}}>图 3  执行安装脚本</div>

填写完成后脚本自动执行，依次完成解压依赖、安装 Docker、加载镜像、生成配置文件、安装控制工具、启动容器，并等待网关就绪：

- 解压 `docker-28.4.0.tar.gz` 与 `iptables-deb.tar.gz`，离线安装 Docker（服务器已安装 Docker 时跳过）；
- 加载 `images/ai-gateway.tar.gz` 与 `images/postgres.tar.gz` 两个镜像；
- 生成配置文件 `<安装目录>/.env`；
- 将控制工具安装到 `/usr/local/bin/1gctl`；
- 启动网关与数据库容器，并轮询 `http://127.0.0.1:<端口>/health/ready` 等待网关就绪。

### 5.3 安装结果

安装完成后，终端会输出访问地址、账号密码与目录信息：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 5  安装完成后的输出信息</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px'}}>项目</th><th style={{width:'76%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>访问地址</td><td style={{padding:'8px'}}><code>http://&lt;服务器 IP 地址&gt;:8080</code></td></tr>
<tr><td style={{padding:'8px'}}>管理员账号</td><td style={{padding:'8px'}}>安装时设置的管理员用户名，默认为 <code>admin</code></td></tr>
<tr><td style={{padding:'8px'}}>管理员密码</td><td style={{padding:'8px'}}>安装时设置的管理员密码，默认为 <code>ChangeMe</code></td></tr>
<tr><td style={{padding:'8px'}}>数据库密码</td><td style={{padding:'8px'}}><code>AI-Gateway@2026!</code>，仅首次初始化生效</td></tr>
<tr><td style={{padding:'8px'}}>安装目录</td><td style={{padding:'8px'}}><code>/opt/1panel-ai-gateway</code></td></tr>
<tr><td style={{padding:'8px'}}>数据目录</td><td style={{padding:'8px'}}><code>/opt/1panel-ai-gateway/data</code></td></tr>
<tr><td style={{padding:'8px'}}>控制工具</td><td style={{padding:'8px'}}><code>1gctl</code>，支持 status / start / stop / restart / logs</td></tr>
<tr><td style={{padding:'8px'}}>安装日志</td><td style={{padding:'8px'}}><code>/opt/1panel-ai-gateway/install.log</code></td></tr>
</tbody>
</table>

<img src="/img/offline_installation/image4-installed.png" alt="安装完成" style={{display:'block',margin:'16px auto',maxWidth:'100%'}}/>

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'6px 0 20px'}}>图 4  安装完成</div>

安装完成后会启动两个容器：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 6  离线安装启动的容器</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'32%', padding:'8px'}}>容器名称</th><th style={{width:'28%', padding:'8px'}}>镜像</th><th style={{width:'40%', padding:'8px'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}><code>1panel-ai-gateway</code></td><td style={{padding:'8px'}}><code>1panel/ai-gateway:v1.5.1</code></td><td style={{padding:'8px'}}>网关服务，映射宿主机 8080 端口</td></tr>
<tr><td style={{padding:'8px'}}><code>1panel-ai-gateway-postgres</code></td><td style={{padding:'8px'}}><code>postgres:18.6</code></td><td style={{padding:'8px'}}>数据库服务，仅在容器网络内提供 5432，不对外暴露</td></tr>
</tbody>
</table>

## 6 登录访问

安装完成后，通过浏览器访问：

```text
http://目标服务器 IP 地址:8080
```

- **用户名**：安装时设置的管理员用户名，默认为 `admin`
- **密码**：安装时设置的管理员密码，默认为 `ChangeMe`

<img src="/img/offline_installation/image5-login.png" alt="1Panel AI 网关登录页" style={{display:'block',margin:'16px auto',maxWidth:'100%'}}/>

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'6px 0 20px'}}>图 5  1Panel AI 网关登录页</div>

若安装时使用了默认密码 `ChangeMe`，请在登录后尽快修改。

## 7 服务管理

离线安装会在部署服务器上注册控制工具 `1gctl`（实际路径 `/usr/local/bin/1gctl`），可直接在服务器上完成服务管理：

```bash
1gctl status     # 查看服务状态与健康检查
1gctl start      # 启动服务
1gctl stop       # 停止服务
1gctl restart    # 快速重启
1gctl logs       # 查看日志
```

完整的命令、环境变量与退出码说明请参见 [1gctl 命令行工具](./cli.md)。

## 8 健康检查

安装脚本在启动容器后会自动等待网关就绪（`http://127.0.0.1:8080/health/ready`）。也可手动检查：

```bash
curl -fsS http://127.0.0.1:8080/health/live
curl -fsS http://127.0.0.1:8080/health/ready
```

- `/health/live` 返回 `{"status":"ok"}`，表示 HTTP 进程可响应。
- `/health/ready` 返回 `{"status":"ok"}`，表示数据库和网关运行时已就绪。
- 就绪检查失败时返回 503 和 `{"status":"not_ready"}`。

## 9 离线升级

离线升级与安装过程基本一致：下载新版本安装包并上传至部署服务器，解压后执行升级脚本即可。

```bash
cd /home
# 请将 <新版本号> 替换为实际下载的版本号
tar zxvf 1panel-ai-gateway-v<新版本号>-linux-amd64.tar.gz
cd 1panel-ai-gateway-v<新版本号>-linux-amd64

# 执行升级脚本
/bin/bash upgrade.sh
```

:::warning

**升级前请先备份数据目录**（默认为 `/opt/1panel-ai-gateway/data`），避免升级异常导致数据丢失。

:::

## 10 注意事项

- **请妥善保管离线包**，不要从第三方渠道下载来源不明的所谓「离线包」，避免镜像被篡改。
- **目录与文件**：安装目录默认为 `/opt/1panel-ai-gateway`，数据目录为安装目录下的 `data`，配置文件为安装目录下的 `.env`，安装日志为安装目录下的 `install.log`；升级与迁移时需一并处理数据目录。
- **安装过程异常**时，可查看安装日志 `/opt/1panel-ai-gateway/install.log` 定位失败步骤。
- **卸载**：执行 `1gctl uninstall` 可移除容器、网络与控制工具；如需一并删除数据，请附加 `--purge` 参数。
- **忘记管理员密码**时，可在部署服务器上执行以下命令重置：

```bash
docker exec -it 1panel-ai-gateway /usr/bin/ai-gateway reset-admin-password
```

  详细操作请参见[重置管理员密码](../faq/reset-admin-password.md)。
- **修改端口等配置**时，可编辑安装目录下的 `.env`，再执行 `1gctl start` 按当前配置重建有变更的容器（`1gctl restart` 为快速重启，不应用配置变更）。
- 离线环境无法访问公有云模型 API 时，需要自行准备本地模型服务（如 vLLM 集群），并通过「账号池」接入。
- 如需使用 Elasticsearch，请另行准备外部实例，网关不负责其安装与运维。
