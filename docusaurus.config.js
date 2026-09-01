// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
// 站点标题按语言区分：构建 zh-Hans 时显示中文，构建 en 时显示英文
const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE || 'zh-Hans';
const config = {
  title: currentLocale === 'en' ? 'Docs Center' : '文档中心',
  tagline: currentLocale === 'en' ? 'Multiple product docs, one site, global search' : '多个产品文档，一个站点，全局搜索',

  // favicon 用 headTags 绝对路径提供(避免 Docusaurus 在英文站 /en/ 下自动加 /en 前缀导致 404)
  headTags: [
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico'}},
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', href: '/img/favicon.png', sizes: '180x180'}},
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', href: '/img/favicon.png', sizes: '32x32'}},
  ],

  future: { v4: true },

  // 各产品图片自包含: 图片放在各自产品目录的 static/ 里, 统一平铺映射到 /（URL 保持 /img/<ns>/...）
  // 注意: 'static'(门户自身, favicon/social-card/undraw)必须放在第一位, 避免同路径被产品目录覆盖。
  // 1Panel 已按自包含架构迁移; dataease/maxkb/jumpserver 当前为单 index.md 占位(无图片), 预留注册项(建立后自动生效)。
  staticDirectories: [
    'static',
    '1panel-docs/static',
    '1panel_versioned_docs/version-v1/static',
    // 以下为预留(当前无图片, 建立后自动生效)
    'dataease-docs/static',
    'maxkb-docs/static',
  ],

  url: 'https://docs.fit2cloud.com',
  baseUrl: '/',

  organizationName: 'demo',
  projectName: 'doc-portal-demo',

  onBrokenLinks: 'warn',

  // 原 1Panel 文档有 8 张引用了但仓库缺失的图(死链), 忽略避免构建失败
  markdown: {
    hooks: {
      onBrokenMarkdownImages: 'ignore',
    },
  },

  // 中英文双语站点
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {label: '简体中文'},
      en: {label: 'English'},
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          // 门户自己的说明文档
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // 产品文档实例：最多产品的文档均按 MkDocs 迁移，schema 统一
  plugins: [
    // 1Panel 官方文档(从 MkDocs 迁移), 支持 v1/v2 版本切换
    [
      '@docusaurus/plugin-content-docs',
      {
        id: '1panel',
        path: '1panel-docs',
        routeBasePath: '1panel',
        sidebarPath: '1panel-docs/sidebars.js',
        // 版本化: current(1panel-docs) = v2, 历史版本 v1
        lastVersion: 'current',
        versions: {
          current: { label: 'v2', badge: false, banner: 'none' },
          v1: { label: 'v1', badge: false, banner: 'none' },
        },
      },
    ],
    // JumpServer 官方文档(从 MkDocs 迁移), 支持 v3.0/v4.0 版本切换
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'jumpserver',
        path: 'jumpserver-docs',
        routeBasePath: 'jumpserver',
        sidebarPath: 'jumpserver-docs/sidebars.js',
        // 版本化: current(jumpserver-docs) = v4.0, 历史版本 v3.0
        lastVersion: 'current',
        versions: {
          current: { label: 'v4.0', badge: false, banner: 'none' },
          v3: { label: 'v3.0', badge: false, banner: 'none' },
        },
      },
    ],
    // BI 分类：DataEase(模拟)
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dataease',
        path: 'dataease-docs',
        routeBasePath: 'dataease',
        sidebarPath: 'dataease-docs/sidebars.js',
      },
    ],
    // AI 分类：MaxKB(模拟)
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'maxkb',
        path: 'maxkb-docs',
        routeBasePath: 'maxkb',
        sidebarPath: 'maxkb-docs/sidebars.js',
      },
    ],
  ],

  // 本地全文搜索（支持中文分词）
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['zh', 'en'],
        indexBlog: false,
        indexPages: true,
        searchResultLimits: 8,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: { respectPrefersColorScheme: true },
      // 侧边栏分类: 同时只展开一个分类, 避免导航过度展开(配合各 sidebars 里的 collapsed: true 默认折叠)
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        // 左上角 logo: 文档中心 logo(相对路径, 相对 baseUrl /img/...)。
        // src = 亮色主题(02),  srcDark = 暗色主题(01)
        logo: {
          src: 'img/FIT2CLOUD 飞致云 文档中心-02.png',
          srcDark: 'img/FIT2CLOUD 飞致云 文档中心-01.png',
          alt: '文档中心',
        },
        items: [
          {to: '/', label: '首页', position: 'left'},
          {
            type: 'dropdown',
            label: '产品文档',
            position: 'left',
            items: [
              {to: '/1panel/', label: '1Panel · 运维管理面板'},
              {to: '/jumpserver/', label: 'JumpServer · 运维安全审计'},
              {to: '/dataease/', label: 'DataEase · BI 数据分析'},
              {to: '/maxkb/', label: 'MaxKB · AI 知识库'},
            ],
          },
          {
            type: 'custom-VersionSwitcher',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '产品文档',
            items: [
              {label: '1Panel · 运维管理面板', to: '/1panel/'},
              {label: 'JumpServer · 运维安全审计', to: '/jumpserver/'},
              {label: 'DataEase · BI 数据分析', to: '/dataease/'},
              {label: 'MaxKB · AI 知识库', to: '/maxkb/'},
            ],
          },
          {
            title: '更多',
            items: [
              {label: '首页', to: '/'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Demo, Inc. 统一文档门户 demo`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
