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
    // 简单的无埋点浏览追踪: Google Analytics 4 (gtag)
    {tagName: 'script', attributes: {async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-PRP2HJ49K6'}},
    {
      tagName: 'script',
      attributes: {}, // 校验要求 headTags 每项必有 attributes(内联脚本可空缺)
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-PRP2HJ49K6');
      `,
    },
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
    'ai-gateway-docs/static',
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
    // AI 分类：AI 网关(独立产品文档)
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ai-gateway',
        path: 'ai-gateway-docs',
        routeBasePath: 'ai-gateway',
        sidebarPath: 'ai-gateway-docs/sidebars.js',
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
      // 侧边栏分类展开策略:
      // - autoCollapseCategories: 原为 true(手风琴效果, 展开某分类时自动收起同级其他分类)。
      //   现已配合 src/theme/DocSidebarItems 改为「一级+二级默认全展开」, 若继续保留 true,
      //   用户一点某个一级分类就会把其他一级全收起, 与「进来就看到完整结构」的初衷冲突,
      //   故置为 false(各分类互相独立, 收起一个不影响其他)。
      //   想恢复手风琴效果, 把下面改回 true 即可。
      // - collapsed / collapsible 的改写统一在 src/theme/DocSidebarItems/index.js 里做,
      //   这里不再逐个 sidebars.js 配置(那样对 v1 的 versioned JSON 和未来新增分类无效)。
      docs: {
        sidebar: {
          autoCollapseCategories: false, // 各分类互相独立: 展开一个不会自动收起别的(避免手风琴)
        },
      },
      navbar: {
        // 左上角 logo: 文档中心 logo(相对路径, 相对 baseUrl /img/...)。
        // src = 亮色主题(01),  srcDark = 暗色主题(02)
        // title 留空: 只显示 logo, 不显示文字(若省略 title, Docusaurus 会用站点标题作为文字)
        title: '',
        logo: {
          src: 'img/FIT2CLOUD 飞致云 文档中心-01.png',
          srcDark: 'img/FIT2CLOUD 飞致云 文档中心-02.png',
          alt: '文档中心',
        },
        items: [
          {to: '/', label: '首页', position: 'left'},
          {
            // 产品文档: 仿 fit2cloud 官网顶部菜单, 每个产品带 logo 小图标 + 产品名 + 描述。
            // 实现: src/theme/NavbarItem/ProductDocs.js (产品/文档链接/图标集中维护在该组件 PRODUCTS 表)。
            // logo 图片在 static/img/logo/ 下, 亮/暗主题统一用彩色版。
            // 站内文档用 <Link> 同站跳转, 独立文档站用 <a target="_blank"> 外链。
            type: 'custom-ProductDocs',
            position: 'left',
          },
          {
            type: 'custom-VersionSwitcher',
            position: 'right',
          },
          // 官网 / 论坛 / 培训认证: 放在右侧、中英文切换(localeDropdown)之前。
          // 外部链接一律用 href(不用 to), NavbarNavLink 会自动加
          // target="_blank" + rel="noopener noreferrer" + 外链小图标
          {href: 'https://www.fit2cloud.com/', label: '官网', position: 'right'},
          {href: 'https://bbs.fit2cloud.com/', label: '论坛', position: 'right'},
          {href: 'https://edu.fit2cloud.com/', label: '培训认证', position: 'right'},
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
            title: '常用链接',
            items: [
              {label: '飞致云开源社区', to: 'https://community.fit2cloud.com/'},
              {label: '培训认证中心', to: 'https://edu.fit2cloud.com/'},
              {label: '案例中心', to: 'https://www.fit2cloud.com/customers/index.html'},
              {label: '如何购买', to: 'https://www.fit2cloud.com/purchase/index.html'},
              {label: '官方应用商店', to: 'https://apps.fit2cloud.com/'},
            ],
          },
          {
            title: '联系我们',
            items: [
              {label: 'support@fit2cloud.com', to: 'mailto:support@fit2cloud.com'},
              {label: '400-052-0755', to: 'tel:400-052-0755'},
              {label: '客户支持门户', to: 'https://support.fit2cloud.com/'},
              {label: '产品预约演示', to: 'https://jsj.top/f/UFPJsq'},
              {label: '合作伙伴', to: 'https://fit2cloud.com/partners/index.html'},
            ],
          },
          {
            title: '资料下载',
            items: [
              {label: '1Panel 产品资料下载', to: 'https://fit2cloud.com/1panel/download/introduce-1panel_2026.pdf'},
              {label: 'JumpServer 产品资料下载', to: 'https://fit2cloud.com/jumpserver/documents/introduce-jumpserver_2026.pdf'},
              {label: 'DataEase 产品资料下载', to: 'https://fit2cloud.com/dataease/download/introduce-dataease_2026.pdf'},
              {label: 'MaxKB 产品资料下载', to: 'https://fit2cloud.com/maxkb/download/introduce-maxkb_2026.pdf'},
              {label: 'Cordys 产品资料下载', to: 'https://fit2cloud.com/cordys/download/introduce-cordys_2026.pdf'},
            ],
          },
        ],
        // 注意: copyright 是 dangerouslySetInnerHTML 直接渲染的(见 theme-classic
        // Footer/Copyright), 不走 i18n —— i18n/*/footer.json 里的 copyright 条目是
        // write-translations 的历史残留, 改这里才生效。
        // 外层容器已带 text--center, 所以三行天然居中。
        // 给 <a> 加 footer__link-item 是为了复用 custom.css 里那条白色半透明样式,
        // 否则裸 <a> 在 dark footer 上会走全局链接色、对比度不对。
        copyright: `<a class="footer__link-item" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">浙ICP备14038283号</a>
        2014-${new Date().getFullYear()} 版权所有©杭州飞致云信息科技有限公司
        <br>
        <a class="footer__link-item" href="https://fit2cloud.com/legal/privacy-policy.html" target="_blank" rel="noopener noreferrer">隐私政策</a>
        <span class="footer__link-separator">|</span>
        <a class="footer__link-item" href="https://fit2cloud.com/legal/licenses.html" target="_blank" rel="noopener noreferrer">社区软件许可协议</a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
