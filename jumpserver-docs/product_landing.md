---
title: JumpServer 堡垒机
description: JumpServer 产品文档导航页 —— 了解 JumpServer、进阶实战、运维开发资源与热门问题入口。
slug: /
hide_title: true
displayed_sidebar: jumpserver
toc_min_heading_level: 2
toc_max_heading_level: 2
pagination_prev: null
pagination_next: null
---

import Link from '@docusaurus/Link';
import styles from './product_landing.module.css';

{/* ===== Hero 区：左侧标题/简介/按钮，右侧视频卡片 ===== */}
<div className={styles.hero}>
  <h1 className={styles.heroTitle}>JumpServer 堡垒机</h1>
  <div className={styles.heroBody}>
    <p className={styles.heroDesc}>
      JumpServer 是广受欢迎的开源堡垒机，是符合 4A 规范的专业运维安全审计系统。帮助企业以更安全的方式管控和登录所有类型的资产，
      实现事前授权、事中监察、事后审计，满足等保合规要求。支持 SSH、Windows、数据库、云服务（Kubernetes / VMware）、
      Web 站点以及 Remote App 等多种资产类型。
    </p>
    <div className={styles.heroBtns}>
      {/* 顺序按设计稿：产品动态 → 下载安装 → 快速体验 → 如何购买 → 漏洞修复 */}
      <Link className={styles.heroBtn} to="/jumpserver/change_log">产品动态</Link>
      <Link className={styles.heroBtn} to="https://community.fit2cloud.com/#/products/jumpserver/downloads">下载安装</Link>
      <Link className={styles.heroBtn} to="https://demo.jumpserver.org/">快速体验</Link>
      <Link className={styles.heroBtn} to="https://jumpserver.org/enterprise.html">如何购买</Link>
      <Link className={`${styles.heroBtn} ${styles.heroBtnWarn}`} to="https://blog.fit2cloud.com/?p=01a1e884-3022-77bd-9d73-b5f4be74993c">漏洞修复</Link>
    </div>
  </div>
  {/* 产品介绍视频：封面为纯 CSS 绿底（沿用视频原海报的绿）+ 白色镂空 logo + 主题词，
      右下角叠加播放标识（白底 + 品牌色三角），点击跳转飞致云社区 B 站科普视频 */}
  <Link className={styles.videoCard} to="https://www.bilibili.com/video/BV1hErPYrEsn/">
    <span className={styles.videoCover}>
      <img
        className={styles.videoCoverLogo}
        src="/img/jumpserver/video/jumpserver-logo-white.png"
        alt="JumpServer"
      />
      <span className={styles.videoCoverText}>堡垒机是什么</span>
      <span className={styles.videoCoverPlay} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 5.8v12.4c0 .5.55.8.97.53l9.9-6.2a.62.62 0 0 0 0-1.06l-9.9-6.2A.62.62 0 0 0 7 5.8z" />
        </svg>
      </span>
    </span>
    <span className={styles.videoHint}>飞致云开源社区 · 05:22</span>
  </Link>
</div>

{/* ===== 分区 1：了解 JumpServer ===== */}
<div className={styles.section}>
  <div className={styles.sectionHead}>
    <span className={styles.sectionIcon}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    </span>

## 了解 JumpServer

  </div>
  <div className={styles.sectionBody}>
    <div className={styles.linkGridSingle}>
      <div className={styles.linkGroup}>
        <Link className={styles.groupTitle} to="/jumpserver/product-intro">产品介绍</Link>
        {/* 4 个短链接横排铺满分区宽度 */}
        <div className={styles.subLinkRow}>
          <Link className={styles.subLink} to="/jumpserver/product-intro">JumpServer 是什么</Link>
          <Link className={styles.subLink} to="https://www.jumpserver.org/customers.html">客户案例</Link>
          <Link className={styles.subLink} to="https://whitepaper.jumpserver.org/">技术白皮书</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/user/web_terminal/ai_assistant">AI 运维助手</Link>
        </div>
      </div>
    </div>
  </div>
</div>

{/* ===== 分区 2：进阶实战 ===== */}
<div className={styles.section}>
  <div className={styles.sectionHead}>
    <span className={styles.sectionIcon}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    </span>

## 进阶实战

  </div>
  <div className={styles.sectionBody}>
    <div className={styles.linkGridSingle}>
      <div className={styles.linkGroup}>
        <span className={styles.groupLabel}>快速入门</span>
        {/* 与「了解 JumpServer」同一形式：分组标题 + 横排链接铺满分区宽度 */}
        <div className={styles.subLinkRow}>
          <Link className={styles.subLink} to="/jumpserver/installation/setup_linux_standalone/offline_install">安装部署</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/admin/console/assets/assets_list">资产纳管</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/user/web_terminal/overview">登录 Web 终端</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/admin/audit/session_audit/session_record">会话审计</Link>
        </div>
      </div>
      <div className={styles.linkGroup}>
        <span className={styles.groupLabel}>操作指南</span>
        <div className={styles.subLinkRow}>
          {/* 注意：users/users.md 的文件名与父目录同名，Docusaurus 会把 slug 折叠为目录路径
              （路线表里是 /jumpserver/manual/admin/console/users/），写 /users/users 会 404 */}
          <Link className={styles.subLink} to="/jumpserver/manual/admin/console/users/">用户管理</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/admin/console/account_management/account_list">账号管理</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/admin/console/authorization_manage/assets_authorization">授权管理</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/pam/introduction">PAM 管理</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/admin/audit/session_audit/audit_desk">安全审计</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/user/web_terminal/assets_connect">Web 终端连接</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/client/asset_connection">客户端连接</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/user/workbench/job_center/jobs_management">作业中心</Link>
        </div>
      </div>
      <div className={styles.linkGroup}>
        <span className={styles.groupLabel}>最佳实践</span>
        <div className={styles.subLinkRow}>
          <Link className={styles.subLink} to="https://www.jumpserver.org/hardware.html">一体机</Link>
          <Link className={styles.subLink} to="https://www.jumpserver.org/xinchuang.html">信创堡垒机</Link>
          <Link className={styles.subLink} to="https://www.jumpserver.org/remoteapp.html">应用虚拟化</Link>
          <Link className={styles.subLink} to="https://www.jumpserver.org/e-commerce.html">跨境电商</Link>
          <Link className={styles.subLink} to="https://www.jumpserver.org/database.html">数据库运维安全审计</Link>
          <Link className={styles.subLink} to="https://www.jumpserver.org/pam.html">PAM 特权账号管理</Link>
        </div>
      </div>
    </div>
  </div>
</div>

{/* ===== 分区 3：运维开发资源 ===== */}
<div className={styles.section}>
  <div className={styles.sectionHead}>
    <span className={styles.sectionIcon}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    </span>

## 运维开发资源

  </div>
  <div className={styles.sectionBody}>
    <div className={styles.linkGridSingle}>
      <div className={styles.linkGroup}>
        <span className={styles.groupLabel}>运维指南</span>
        {/* 4 个短链接横排铺满分区宽度，与「了解 JumpServer」保持一致 */}
        <div className={styles.subLinkRow}>
          <Link className={styles.subLink} to="/jumpserver/manual/common/system_settings">系统设置</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/ops/system_params">系统参数设置</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/ops/cli_tools">命令行工具</Link>
          <Link className={styles.subLink} to="/jumpserver/manual/ops/system_logs">系统日志</Link>
        </div>
      </div>
      <div className={styles.linkGroup}>
        <span className={styles.groupLabel}>开发文档</span>
        <div className={styles.subLinkRow}>
          <Link className={styles.subLink} to="/jumpserver/dev/rest_api">API 文档</Link>
          <Link className={styles.subLink} to="/jumpserver/dev/shell">交互命令</Link>
        </div>
      </div>
    </div>
  </div>
</div>

{/* ===== 分区 4：热门问题 ===== */}
<div className={styles.section}>
  <div className={styles.sectionHead}>
    <span className={styles.sectionIcon}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </span>

## 热门问题

  </div>
  <div className={styles.sectionBody}>
    <div className={styles.linkGridSingle}>
      <div className={styles.linkGroup}>
        <Link className={styles.subLink} to="https://kb.fit2cloud.com/?p=53">JumpServer 登录密码忘记及用户锁定如何处理</Link>
        <Link className={styles.subLink} to="https://kb.fit2cloud.com/?p=98f1d391-fb98-4651-8051-9083a48934cf">通过 SSL 证书访问 JumpServer 的配置方案</Link>
        <Link className={styles.subLink} to="https://kb.fit2cloud.com/?p=a1828b09-cad5-4ef4-bbc5-a494874f5224">JumpServer 存储目录迁移</Link>
        <Link className={styles.subLink} to="https://kb.fit2cloud.com/?p=199">如何限制某个资产只允许通过某个 IP 登录 JumpServer 之后进行连接？</Link>
        <Link className={styles.subLink} to="https://kb.fit2cloud.com/?p=157">如何修改 JumpServer 的上传文件大小的限制并修改上传文件的超时时间？</Link>
      </div>
    </div>
  </div>
</div>
