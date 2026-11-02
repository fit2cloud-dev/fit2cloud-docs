---
title: 常见问题
---

本页汇总 1Panel 技术交流群中用户咨询频率较高的常见问题及处理方式，内容持续更新。

## 1 安装部署

### 1.1 1Panel 安装脚本不支持 Anolis 系统怎么办？

**问题**：安装 1Panel 时提示安装脚本不支持 Anolis 系统，该怎么处理？

**处理方式**：

1Panel 安装脚本不支持 Anolis 系统，需更换为受支持的操作系统后再安装。1Panel 支持主流 Linux 发行版本（基于 Debian / RedHat，包括国产操作系统），常规 Ubuntu 等系统均支持。

### 1.2 V1 升级 V2 时没有节点也要执行从节点命令吗？

**问题**：原来 V1 没有节点，升级 V2 时还需要执行从节点相关的升级命令吗？

**处理方式**：

不需要。V1 没有节点时按主节点方式升级即可：先执行 `1panel-migrator upgrade core`，确认 V2 服务启动成功后再执行 `1panel-migrator upgrade website`。`1panel-migrator upgrade agent` 及在主节点「节点管理」页面添加从节点的步骤仅用于升级为从节点的场景。

完整升级流程请参阅[操作步骤](../installation/v1-migrate-steps.md)。

### 1.3 离线版支持 arm64 架构吗？

**问题**：1Panel 离线安装包有没有 arm 架构的？

**处理方式**：

商用版支持 `arm64`架构的安装包，有需求请到官网联系商务同事获取。

## 2 主机与系统管理

### 2.1 1Panel 服务无法启动，报 GODEBUG "tlskyber" 错误怎么办？

**问题**：1Panel 服务无法启动，直接执行 `/usr/local/bin/1panel-core` 时报错：

```text
fatal error: removed GODEBUG "tlskyber" set to old value "0" in environment (https://go.dev/doc/godebug#go-124)
```

**处理方式**：

启动环境中存在新版 Go 已不支持的 `GODEBUG=tlskyber=0` 配置，按以下步骤处理。

**1. 排查配置来源**

```bash
sudo systemctl show-environment | grep '^GODEBUG='

sudo grep -RnsE 'GODEBUG|tlskyber' \
  /etc/systemd /run/systemd /usr/lib/systemd /lib/systemd \
  /etc/default /etc/sysconfig /etc/profile /etc/profile.d /etc/environment \
  2>/dev/null
```

**2. 修改对应配置文件**

如果 `/etc/systemd/system.conf` 中存在以下配置，删除或注释整行：

```ini
#DefaultEnvironment="GODEBUG=tlskyber=0"
```

如果包含其他环境变量或 GODEBUG 参数，只移除 `tlskyber=0` 对应的配置，保留其余内容。

**3. 重新加载并验证**

```bash
sudo systemctl daemon-reload
sudo systemctl show-environment | grep '^GODEBUG='
```

确认不再包含 `tlskyber=0` 后，重启服务：

```bash
1pctl restart
1pctl status
```

**注意**：修改全局配置会影响之后启动的其他服务；终端执行 `unset GODEBUG` 只影响当前终端，不能代替修改 systemd 配置。若不便改动全局配置，也可只在 `/etc/systemd/system` 下的 `1panel-core.service` 与 `1panel-agent.service` 中，为 `[Service]` 段补充 `UnsetEnvironment=GODEBUG`，使该变量不传入 1Panel 进程。

### 2.2 文件管理里为什么看不到 /etc/fstab？

**问题**：面板文件管理里明明有 /etc/fstab，为什么列表里不显示？

**处理方式**：

文件列表默认每页显示 100 条，文件较多时目标文件会排在第二页。点击下一页，或把每页显示条数改为 500 条即可看到。

### 2.3 1Panel 社区版支持管理虚拟机吗？

**问题**：1Panel 社区版是不是不支持管理虚拟机？

**处理方式**：

不支持。虚拟机管理仅在 1Panel 企业版中可用，需要有效企业版许可证和虚拟机权限，宿主机还必须通过页面的虚拟化环境检查。

## 3 应用商店与容器

### 3.1 应用安装拉取镜像失败怎么办？

**问题**：安装应用时一直拉取不到镜像、提示 image pull failed，怎么处理？

**处理方式**：

应用安装失败、镜像拉取超时，可在【容器】-【配置】中配置镜像加速器进行优化，加速地址填写 `https://docker.1panel.live`。若配置后拉取应用镜像仍然失败，可在论坛中进一步讨论。

### 3.2 智能路由为什么没有生效？

**问题**：配置了智能路由，但请求没有走智能路由，是什么原因？

**处理方式**：

只有客户端请求使用 `model=auto` 时才会触发智能路由；请求其他模型名时，仍按普通 AI 网关流程转发。

### 3.3 应用商店安装应用后无法访问怎么办？

**问题**：在 1Panel 应用商店安装应用后，外部访问地址该怎么填、为什么装完进不去？

**处理方式**：

安装时需在参数中填写外部访问地址（主机 IP + 应用端口），并确保该端口已在防火墙中放行；若未放行，可在应用安装页面的高级设置中编辑 compose 文件调整端口配置。

### 3.4 拉取镜像失败提示 image pull failed 怎么办？

**问题**：安装应用或创建环境时一直拉取不到镜像、提示 image pull failed，怎么处理？

**处理方式**：

应用安装失败、镜像拉取超时，可在【容器】-【配置】中配置镜像加速器进行优化，加速地址填写 `https://docker.1panel.live`。若配置后拉取应用镜像仍然失败，可在论坛中进一步讨论。

## 4 网站与数据库管理

### 4.1 PHP 高危漏洞如何升级修复？

**问题**：PHP 出现高危漏洞，1Panel 里怎么升级 PHP 版本修复？

**处理方式**：

官方已发布单独的 PHP 与 Node.js 运行环境安全升级说明，请用户尽快升级 PHP 环境。完整升级说明请参阅[PHP 漏洞修复](../faq/runtime-security-upgrade.md)。

### 4.2 网站如何切换 PHP 版本？

**问题**：已创建的网站要切换 PHP 版本，只能删除重建吗？

**处理方式**：

不需要删除重建。在网站列表点击【配置】，进入基本配置的 PHP 项即可切换：静态页面类型的网站可在此选择 PHP 运行环境切换为 PHP 类型网站，PHP 类型的网站可以切换不同的 PHP 运行环境。

### 4.3 证书申请或续签失败怎么排查？

**问题**：1Panel 里申请证书一直不成功、自动续签也失败，日志只显示「开始申请证书」后面就没有了，是什么原因？

**处理方式**：

证书申请或续签失败时，先查看证书日志或任务日志中的错误信息，日志中会记录任务状态和失败原因。续签依赖 ACME 账户、DNS 账户或 HTTP 验证路径持续可用，域名解析、API 凭证、网络或网站配置变化都可能导致失败；使用手动 DNS 验证或手动上传的证书不能自动续签，是否支持自动续签以证书列表开关状态为准。

详细说明请参阅[续签证书](../user_manual/websites/certificate-renew.md)

### 4.4 WAF 地区访问限制为什么没拦住境外 IP？

**问题**：WAF 里设置了地区访问限制只放行中国，为什么美国 IP 还能访问？

**处理方式**：

地区访问限制属于专业版、企业版功能，需确认已开启有效许可证；同时该规则生效要求 WAF 总开关和对应网站的 WAF 开关同时开启。若日志中该 IP 先返回 403、随后返回 302，说明请求已被重定向到拦截页面，属于规则正常生效。

## 5 AI 网关与智能路由

### 5.1 AI 门户只有企业版才能对接使用吗？

**问题**：1Panel AI 门户是不是只有企业版才可以对接使用？

**处理方式**：

是的，AI 门户是企业版功能，只有企业版才可对接使用。
