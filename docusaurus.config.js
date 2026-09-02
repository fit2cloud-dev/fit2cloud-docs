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
          autoCollapseCategories: false,
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
            // 与首页 PRODUCT_GROUPS(src/pages/index.js)、footer 的「产品文档」列三方保持一致。
            // href 外部链接由 NavbarItem/NavbarNavLink 自动加 target=_blank + 外链图标
            // (isExternalLink = label && href && !isInternalUrl(href))。
            type: 'dropdown',
            label: '产品文档',
            position: 'left',
            items: [
              {label: '1Panel · AI 网关', to: '/1panel/user-manual/ai/gateway'},
              {label: '1Panel · 运维管理面板', to: '/1panel/'},
              {label: 'JumpServer · 运维安全审计', href: 'https://docs.jumpserver.org/zh/v4/'},
              {label: 'DataEase · BI 数据分析', href: 'https://dataease.cn/docs/v2/'},
              {label: 'MaxKB · 企业级智能体平台', href: 'https://maxkb.cn/docs/v2/'},
              {label: 'SQLBot · 智能问数', href: 'https://sqlbot.org/docs/v1/'},
              {label: 'Cordys CRM · AI CRM', href: 'https://cordys.cn/docs/'},
              {label: 'MeterSphere · 持续测试', href: 'https://metersphere.io/docs/v3.x/'},
              {label: 'Halo · 开源建站', href: 'https://docs.halo.run/'},
            ],
          },
          {
            // 开源产品: 与「产品文档」同源的 8 个产品, 但链接指向各产品**官网**(不是文档站)。
            // 1Panel AI 网关不单列 —— 它是 1Panel 的功能模块, 官网同 1panel.cn。
            // href 外部链接由 NavbarItem/NavbarNavLink 自动加 target=_blank + 外链图标。
            type: 'dropdown',
            label: '开源产品',
            position: 'left',
            items: [
              {label: '1Panel', href: 'https://1panel.cn/'},
              {label: 'MaxKB', href: 'https://maxkb.cn/'},
              {label: 'JumpServer', href: 'https://www.jumpserver.org/'},
              {label: 'DataEase', href: 'https://dataease.cn/'},
              {label: 'SQLBot', href: 'https://sqlbot.org/'},
              {label: 'Cordys CRM', href: 'https://cordys.cn/'},
              {label: 'MeterSphere', href: 'https://metersphere.io/'},
              {label: 'Halo', href: 'https://www.halo.run/'},
            ],
          },
          {
            type: 'custom-VersionSwitcher',
            position: 'right',
          },
          // 官网 / 论坛 / 开源社区 / 培训认证: 放在右侧、中英文切换(localeDropdown)之前。
          // 外部链接一律用 href(不用 to), NavbarNavLink 会自动加
          // target="_blank" + rel="noopener noreferrer" + 外链小图标
          // 注意: 「开源社区」(community 社区站) 与左侧的「开源产品」(下拉, 链各产品官网) 是两回事,
          //   两者 label 不同, i18n key 也不同(item.label.开源社区 / item.label.开源产品), 别合并。
          {href: 'https://www.fit2cloud.com/', label: '官网', position: 'right'},
          {href: 'https://bbs.fit2cloud.com/', label: '论坛', position: 'right'},
          {href: 'https://community.fit2cloud.com/', label: '开源社区', position: 'right'},
          {href: 'https://edu.fit2cloud.com/', label: '培训认证', position: 'right'},
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
      // footer 三列(常用链接/联系我们/资料下载)。下列 URL 均已实测返回 200。
      // 内容来源说明(2026-09-02 改版): 「常用链接」这一列取自官网**导航栏**, 不是官网 footer ——
      //   官网自身的 footer 里「常用链接」仍是旧版(多云管理平台/Halo 商城版/JumpServer 国际站/
      //   1Panel 国际站/UPage AI 建站), 而官网导航栏里才是新版(开源社区/培训认证/案例中心/
      //   如何购买/官方应用商店)。本处以导航栏新版为准。
      // 外部链接一律用 href(不用 to): Footer/LinkItem 判断 !isInternalUrl(href) 后自动
      // 渲染 target=_blank + rel=noopener + 外链小图标。mailto:/tel: 同样有协议, 也会被
      // 判为外链(带 ↗ 图标), 这是 Docusaurus 的默认行为。
      // 注意 1: 官网原文把 JumpServer 资料下载拼成了 "JumpSever", 这里按正确拼写修正。
      // 注意 2: 官网各处混用 www.fit2cloud.com 与 fit2cloud.com(裸域)。本处除「案例中心」
      //   「如何购买」沿用官网导航栏的相对路径换算结果(带 www)外, 其余按给定地址用裸域。
      //   两者实测均 200, 但长期建议统一成一种写法。
      footer: {
        style: 'dark',
        links: [
          {
            title: '常用链接',
            items: [
              {label: '飞致云开源社区', href: 'https://community.fit2cloud.com/'},
              {label: '培训认证中心', href: 'https://edu.fit2cloud.com/'},
              {label: '案例中心', href: 'https://www.fit2cloud.com/customers/index.html'},
              {label: '如何购买', href: 'https://www.fit2cloud.com/purchase/index.html'},
              {label: '官方应用商店', href: 'https://apps.fit2cloud.com/'},
            ],
          },
          {
            title: '联系我们',
            items: [
              {label: 'support@fit2cloud.com', href: 'mailto:support@fit2cloud.com'},
              {label: '400-052-0755', href: 'tel:400-052-0755'},
              {label: '客户支持门户', href: 'https://support.fit2cloud.com/'},
              {label: '产品预约演示', href: 'https://jsj.top/f/UFPJsq'},
              {label: '合作伙伴', href: 'https://fit2cloud.com/partners/index.html'},
            ],
          },
          {
            title: '资料下载',
            items: [
              {label: '1Panel 产品资料下载', href: 'https://fit2cloud.com/1panel/download/introduce-1panel_2026.pdf'},
              {label: 'JumpServer 产品资料下载', href: 'https://fit2cloud.com/jumpserver/documents/introduce-jumpserver_2026.pdf'},
              {label: 'DataEase 产品资料下载', href: 'https://fit2cloud.com/dataease/download/introduce-dataease_2026.pdf'},
              {label: 'MaxKB 产品资料下载', href: 'https://fit2cloud.com/maxkb/download/introduce-maxkb_2026.pdf'},
              {label: 'Cordys 产品资料下载', href: 'https://fit2cloud.com/cordys/download/introduce-cordys_2026.pdf'},
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
        <br />
        2014-${new Date().getFullYear()} 版权所有©杭州飞致云信息科技有限公司
        <br />
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
