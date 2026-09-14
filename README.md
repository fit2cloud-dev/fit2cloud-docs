<div align="center">

# 飞致云文档中心

</div>

飞致云官方文档仓库（GitHub），作为统一文档门户 **https://docs.fit2cloud.com/** 的内容源，集中维护飞致云旗下所有产品的官方文档。

## 官方文档门户

所有产品文档均可通过统一入口访问：**[https://docs.fit2cloud.com/](https://docs.fit2cloud.com/)**

| 产品 | 简介 | 文档地址 |
|------|------|----------|
| 1Panel | 现代化、开源的 Linux 服务器运维面板 | https://docs.fit2cloud.com/1panel/ |
| 1Panel · AI 网关 | 企业级 AI 统一接入与治理平台 | https://docs.fit2cloud.com/ai-gateway/ |
| JumpServer | 广受欢迎的开源堡垒机（运维安全审计系统） | https://docs.fit2cloud.com/jumpserver/ |
| MaxKB | 强大易用的企业级智能体平台 | https://docs.fit2cloud.com/maxkb/ |
| DataEase | 人人可用的开源 BI 数据分析工具 | https://docs.fit2cloud.com/dataease/ |
| SQLBot | 基于大模型的智能问数系统 | https://docs.fit2cloud.com/sqlbot/ |
| Cordys CRM | 新一代开源 AI CRM 客户管理系统 | https://docs.fit2cloud.com/cordys/ |

## 技术栈

- 基于 [Docusaurus](https://docusaurus.io/) 构建
- 支持简体中文（zh-Hans）与英文（en）双语
- 产品目录独立、支持多版本化管理
- 内置全局搜索，侧边栏支持自动折叠

## 目录结构

```
fit2cloud-docs/
├── 1panel-docs/           # 1Panel 文档
├── ai-gateway-docs/       # AI 网关文档
├── jumpserver-docs/       # JumpServer 文档
├── maxkb-docs/            # MaxKB 文档
├── dataease-docs/         # DataEase 文档
├── sqlbot-docs/           # SQLBot 文档
├── cordys-docs/           # CordysCRM 文档
├── i18n/                  # 国际化内容（中/英）
├── docs/                  # 通用文档
├── sidebars.js            # 侧边栏配置
└── src/、static/          # 站点源码与静态资源
```

## 本地运行

```bash
git clone https://github.com/fit2cloud-dev/fit2cloud-docs.git
cd fit2cloud-docs
npm install
npm start
```

## 贡献

欢迎通过提交 Issue 或 Pull Request 参与文档完善。
