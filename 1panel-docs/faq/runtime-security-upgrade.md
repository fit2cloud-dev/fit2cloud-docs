---
title: PHP 与 Node.js 运行环境安全升级说明
---

## PHP 安全更新通知（2026 年 11 月 19 日）

PHP 官方于 2026 年 11 月 19 日发布了 PHP 8.2、8.3、8.4 和 8.5 系列的安全更新。本次更新修复了多个安全漏洞，最高严重级别为严重（Critical）。部分漏洞仅在特定配置或较少见的运行环境下才可能触发。

请及时检查网站正在使用的 PHP 版本，并升级至对应的安全修复版本：

- PHP 8.2 → 8.2.36
- PHP 8.3 → 8.3.37
- PHP 8.4 → 8.4.28
- PHP 8.5 → 8.5.13

1Panel 已发布上述版本的 PHP 镜像。建议升级前备份网站文件、数据库及相关配置，并在新版运行环境中确认 PHP 扩展兼容性及网站功能正常后，再切换正式网站。

PHP 官方发布公告：[https://www.php.net/releases/](https://www.php.net/releases/)

为修复 PHP 近期披露的两项高危漏洞，并同步 Node.js 最新安全更新，1Panel 开源面板已经完成相关运行环境版本升级。使用受影响版本的用户请及时更新，并且根据业务情况完成版本切换。

## 1 PHP 运行环境升级

2026 年 10 月 21 日，PHP 官方发布紧急安全更新，修复了两个可被未授权利用的远程代码执行漏洞：CVE-2026-109618 与 CVE-2026-109619。两项漏洞的 CVSS v4.0 评分均为 9.2（严重），攻击者可未经身份验证实现远程代码执行（RCE）。

### 1.1 漏洞说明

- **CVE-2026-109618（内存耗尽处理异常导致远程代码执行）**：处理内存耗尽（OOM）异常时，PHP 可能在内部请求数据仅部分初始化时被中断，后续清理过程会把无效数据当作有效数据使用，可能导致远程代码执行；
- **CVE-2026-109619（全局状态残留导致远程代码执行）**：请求所属的内部状态在关联内存释放后仍然保留，同一工作进程处理后续请求时，可能在正常初始化重置前使用这些失效状态，可能导致远程代码执行。

**影响范围**：所有处理 Web 请求的 PHP 安装，包括 PHP-FPM、Apache mod_php、php-cgi、FrankenPHP 和 LiteSpeed 等。官方认为 mod_php 风险最高，已有验证案例表明未认证请求可在应用代码运行前触发漏洞。

### 1.2 官方修复版本

PHP 官方修复版本如下：

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'16px 0 8px'}}>表 1 PHP 官方修复版本</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'50%', padding:'8px', textAlign:'left'}}>原版本</th><th style={{width:'50%', padding:'8px', textAlign:'left'}}>升级版本</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>PHP 8.2.x</td><td style={{padding:'8px'}}><code>8.2.35</code></td></tr>
<tr><td style={{padding:'8px'}}>PHP 8.3.x</td><td style={{padding:'8px'}}><code>8.3.36</code></td></tr>
<tr><td style={{padding:'8px'}}>PHP 8.4.x</td><td style={{padding:'8px'}}><code>8.4.27</code></td></tr>
<tr><td style={{padding:'8px'}}>PHP 8.5.x</td><td style={{padding:'8px'}}><code>8.5.12</code></td></tr>
</tbody>
</table>

以上版本已包含上述两个漏洞的修复。1Panel 已经基于 PHP 官方版本完成运行环境镜像封装（`1panel/php:<版本>`，如 `1panel/php:8.2.35`），建议相关用户尽快升级。

### 1.3 PHP 7.4 / 8.0 / 8.1 安全补丁版本

PHP 官方已不再为 7.4、8.0、8.1 分支发布新版本。1Panel 为仍在使用这些版本的用户提供已回补本次漏洞的安全补丁镜像：

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'16px 0 8px'}}>表 2 PHP 7.4 / 8.0 / 8.1 安全补丁镜像</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'30%', padding:'8px', textAlign:'left'}}>PHP 分支</th><th style={{width:'35%', padding:'8px', textAlign:'left'}}>1Panel 维护版本</th><th style={{width:'35%', padding:'8px', textAlign:'left'}}>镜像内实际版本</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>PHP 7.4</td><td style={{padding:'8px'}}><code>7.4.34</code></td><td style={{padding:'8px'}}>7.4.33</td></tr>
<tr><td style={{padding:'8px'}}>PHP 8.0</td><td style={{padding:'8px'}}><code>8.0.31</code></td><td style={{padding:'8px'}}>8.0.30</td></tr>
<tr><td style={{padding:'8px'}}>PHP 8.1</td><td style={{padding:'8px'}}><code>8.1.35</code></td><td style={{padding:'8px'}}>8.1.34</td></tr>
</tbody>
</table>

**说明**：1Panel 的运行环境镜像均由 1Panel 统一封装（`1panel/php:<版本>`）。其中 8.2–8.5 版本基于 PHP 官方安全版本；7.4.34、8.0.31、8.1.35 版本则是 PHP 官方停止该分支发布新版本后，1Panel 基于官方提供的最小化源码回补封装的维护版本标签，并非 PHP 官方发布版本。建议仍在使用 7.4 / 8.0 / 8.1 版本的业务先升级至对应补丁版本，并且尽快规划迁移至 PHP 官方仍在维护的版本。

## 2 Node.js 运行环境升级

2026 年 10 月 21 日，Node.js 官方同步发布安全更新，22.x、24.x、26.x 分支共修复 10 项漏洞（4 项高危、3 项中危、3 项低危），涉及 TLS 证书主机名校验绕过、DNS 解析异常、Brotli 解码器越界写入（CVE-2026-111497，可导致远程代码执行）等风险，并且包含 c-ares、OpenSSL、Undici 等依赖更新。1Panel 同步更新情况如下：

<div style={{textAlign:'center',color:'#8a8f99',fontSize:'13px',margin:'16px 0 8px'}}>表 3 Node.js 各分支更新情况</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'50%', padding:'8px', textAlign:'left'}}>原版本</th><th style={{width:'50%', padding:'8px', textAlign:'left'}}>新版本</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>Node.js 22.22.2</td><td style={{padding:'8px'}}><code>22.23.4</code></td></tr>
<tr><td style={{padding:'8px'}}>Node.js 24.15.0</td><td style={{padding:'8px'}}><code>24.22.1</code></td></tr>
<tr><td style={{padding:'8px'}}>—</td><td style={{padding:'8px'}}><code>26.12.1</code>（新增）</td></tr>
</tbody>
</table>

其中 22.23.4、24.22.1 版本为官方安全更新版本，26.12.1 版本为 26.x 当前版本。生产环境建议优先选择仍处于官方长期维护周期内的 LTS 版本，并且结合项目实际情况验证后升级。

## 3 运行环境升级步骤

运行环境升级步骤如下：

1. 进入 1Panel 应用商店。
2. 点击【更新远程应用】按钮获取最新应用。
3. 在运行环境配置中，将版本切换至新版本（如果编辑的时候获取不到新版本，可以切换一下大版本）。
4. 重启相关项目或服务，确认业务运行正常。

## 4 安全建议

本次 PHP 两项漏洞风险较高，尤其是面向公网提供 Web 服务的 PHP 环境，建议尽快完成安全更新：

- **PHP 8.2 版本及以上**：升级至对应版本的 1Panel 运行环境镜像（基于 PHP 官方安全版本封装）；
- **PHP 7.4 / 8.0 / 8.1 版本**：先升级至 1Panel 的安全补丁镜像，并且尽快规划迁移至 PHP 官方仍支持的版本；
- **使用 Node.js 的用户**：同步检查当前运行版本，及时升级至最新安全版本。

1Panel 开源项目组将持续关注 PHP、Node.js 等运行环境的安全更新进展，并且及时同步相关版本，为用户提供更加安全、稳定的运行环境。
