import React, {useEffect} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HOME_PRODUCTS from '../data/products';
import HomeSearch from '../components/HomeSearch';
import styles from './index.module.css';

/* ------------------------------------------------------------------
 * Figma 主页设计稿像素级还原 (node 488-3119 / frame '2', 画布 1920, 内容容器 1200)
 *
 * 规格来源: figma-data/spec_full.txt (节点树精确解析)
 * - 顶栏: 白色圆角悬浮卡 1200x70 r12 (由 custom.css 的 navbar 覆盖实现)
 * - Hero: 整页底色 #eaf1ff + 左上蓝色光晕(#3370ff 10%) + 右下紫色光晕(#b459ff 5%)
 *     标题 '文档中心' 48px/600 #001222 居中(原右侧插画已移除, 与副标题/搜索框共用中轴线)
 *     副标题 16px/400 #6c7280 居中
 *     大搜索框 800x72 r12 白底 居中; placeholder 20px #c8cbcb; 按钮 104x52 r8 品牌蓝
 * - 产品区: 标题 '全部产品' 36px/600 居中; 3列卡片 384x256 间距24 r20
 *     卡底渐变 #f7fbff→#ffffff; 内边距 32
 *     logo(高30)+名称 24px/700 #1f2329; 副标题 16px #1f2329; 描述 14px/24 #646a73
 *     '进入文档' 按钮 320x32 r4 渐变描边 #1075e3→#333dff, 文字 16px #0c7be0
 * - 底部横幅: 渐变 #f7fbff→#f8f9ff; 'FIT2CLOUD 飞致云' 32px/600 居中 + 说明 16px #6c7280
 * - 设计稿的「热门检索/换一批」榜单按要求不做
 * ------------------------------------------------------------------ */

/* 卡片排列顺序: 行1 1Panel/AI 网关/Cordys CRM; 行2 JumpServer/MaxKB/DataEase; 行3 SQLBot/MeterSphere/Halo */
const CARD_ORDER = [
  '1Panel 面板',
  '1Panel AI 网关',
  'Cordys CRM',
  'JumpServer',
  'MaxKB',
  'DataEase',
  'SQLBot',
  'MeterSphere',
  'Halo',
];

/* 卡片描述区的长文案 (副标题用 products.js 的短定位句, 此处为完整描述)。
   文案口径对齐 fit2cloud 官网产品介绍; 未覆盖的产品回退为副标题同文。 */
const PRODUCT_DESC = {
  '1Panel AI 网关':
    '1Panel 是一个现代化、开源的 Linux 服务器运维管理面板，帮助你快速建设与管理数字化基础设施。',
  '1Panel 面板':
    '1Panel 是一个现代化、开源的 Linux 服务器运维管理面板，帮助你轻松部署和管理网站、数据库与容器等应用。',
  JumpServer:
    'JumpServer 是广受欢迎的开源堡垒机，是符合 4A 规范的运维安全审计系统，广受企业用户喜爱。',
  MaxKB: 'MaxKB 是强大易用的企业级智能体平台，广泛应用于智能客服、知识库问答、员工 AI 助手等场景。',
  DataEase:
    'DataEase 是人人可用的开源 BI 工具，帮助用户快速分析数据并洞察业务趋势，实现业务的改进与优化。',
  SQLBot: 'SQLBot 是基于大模型和 RAG 的智能问数系统，让各类应用快速拥有智能问数能力。',
  'Cordys CRM':
    'Cordys CRM 是新一代的开源 AI CRM 系统，深度融合信息化、数字化与智能化能力，支持私有化部署。',
  MeterSphere:
    'MeterSphere 是新一代的开源持续测试工具，让测试工作更简单、更高效，不再成为持续交付的瓶颈。',
  Halo: 'Halo 是强大易用的开源建站工具，无需太多技术知识就可以快速搭建博客、知识库、企业官网和在线商城。',
};

const I18N = {
  zh: {
    title: '文档中心',
    subtitle: '我们秉持"软件用起来才有价值，才有改进机会"的核心价值观，向中国数字化团队交付被广泛验证、可信赖的开源软件。',
    searchPlaceholder: '请输入关键词回车检索，例如：1Panel 如何安装',
    searchBtn: '搜索',
    enter: '进入文档',
  },
  en: {
    title: 'Docs Center',
    subtitle:
      "FIT2CLOUD is China's leading open-source software company, building great software for the data-driven economy.",
    searchPlaceholder: 'Type keywords and press Enter, e.g. FIT2CLOUD',
    searchBtn: 'Search',
    productsTitle: 'All Products',
    enter: 'Enter Docs',
    bannerTitle: 'FIT2CLOUD',
    bannerSub:
      'We hold the core value that software is valuable only when it is used, and deliver trusted open-source software to digital teams in China.',
  },
};

function Hero({site, zh}) {
  // hero 右侧插画: 主题图(文件名含中文/【】, 用 URL 编码)
  const illustration = useBaseUrl('/img/%E3%80%90%E4%B8%BB%E9%A2%98%E3%80%91%E9%A3%9E%E8%87%B4%E4%BA%91%E6%96%87%E6%A1%A3%E4%B8%AD%E5%BF%83.png');
  return (
    <section className={styles.hero}>
      {/* 背景光晕: 对应设计稿 Ellipse 1(#3370ff 10%) / Ellipse 2(#b459ff 5%) */}
      <span className={clsx(styles.heroDecor, styles.heroDecorBlue)} aria-hidden="true" />
      <span className={clsx(styles.heroDecor, styles.heroDecorPurple)} aria-hidden="true" />
      <div className={styles.heroInner}>
        {/* 右侧插画: 高度锁到 hero 组件高度(340px)等比缩放, ≤996px 隐藏 */}
        <img
          src={illustration}
          alt="FIT2CLOUD 文档中心"
          className={styles.heroIllustration}
          loading="eager"
        />
        <h1 className={styles.heroTitle}>{site.title}</h1>
        <p className={styles.heroSubtitle}>{site.subtitle}</p>
        {/* 搜索框 + 输入后的即时结果下拉面板(Figma frame '交互' 的 Search + Frame 1564942) */}
        <HomeSearch
          zh={zh}
          placeholder={site.searchPlaceholder}
          submitLabel={site.searchBtn}
        />
      </div>
    </section>
  );
}function ProductCard({item, site}) {
  const target = item.to ?? item.link;
  const logo = useBaseUrl(`/img/logo/${encodeURIComponent(item.logo)}`);
  const desc = PRODUCT_DESC[item.name] || item.desc;
  return (
    <Link to={target} className={styles.productCard}>
      <span className={styles.productHeader}>
        <img src={logo} alt={item.name} className={styles.productLogo} loading="lazy" />
        <span className={styles.productName}>{item.name}</span>
      </span>
      <span className={styles.productSubtitle}>{item.desc}</span>
      <span className={styles.productDesc}>{desc}</span>
      <span className={styles.productEnter}>{site.enter}</span>
    </Link>
  );
}

function ProductsSection({site}) {
  const ordered = CARD_ORDER.map(
    (name) => HOME_PRODUCTS.find((p) => p.name === name),
  ).filter(Boolean);
  return (
    <section className={styles.productsSection}>
      <div className={styles.productsInner}>
        <h2 className={styles.productsTitle}>{site.productsTitle}</h2>
        <div className={styles.productGrid}>
          {ordered.map((item) => (
            <ProductCard key={item.name} item={item} site={site} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {i18n, siteConfig} = useDocusaurusContext();
  const zh = i18n.currentLocale === 'zh-Hans';
  const site = zh ? I18N.zh : I18N.en;

  // 给 body 挂 home-page: 让顶部(navbar 悬浮卡外围)背景色与 Hero 的 #eaf1ff 一致。
  // 对应 custom.css 的 body.home-page(作为 body:has(.portalPage) 的旧浏览器兜底)。
  useEffect(() => {
    document.body.classList.add('home-page');
    return () => document.body.classList.remove('home-page');
  }, []);

  return (
    <Layout title={siteConfig.title} description={site.subtitle}>
      <div className={styles.portalPage}>
        <Hero site={site} zh={zh} />
        <ProductsSection site={site} />
      </div>
    </Layout>
  );
}
