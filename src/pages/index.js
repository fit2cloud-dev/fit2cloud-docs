import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
// 与右上角同一个搜索框组件(由 @easyops-cn/docusaurus-search-local 提供)。
// 首页不是文档页, 这里没有 activePlugin / searchContext, 因此会检索全部产品的全部文档。
import SearchBar from '@theme/SearchBar';
import styles from './index.module.css';

// 所有产品集中维护在这里; 改链接/描述/分类/换图都只动这张表。
// - link 是站内路由时, Docusaurus Link 自动加 baseUrl 并用 <a> 同站跳转
// - link 是 http(s):// 时, Link 自动加 target="_blank" rel="noopener noreferrer"
// - logo 只用 light 版: 首页内容在 light/dark 主题下保持一致的浅色视觉, 不切换 logo
// - 中英双语: title/desc/name 是中文, titleEn/descEn/nameEn 是英文, 按 i18n.currentLocale 切换。
//   nameEn 可省略(品牌名本身就是拉丁字母时), 组件里 fallback 到 name。
const PRODUCT_GROUPS = [
  {
    title: 'AI 原生',
    titleEn: 'AI Native',
    items: [
      {
        name: '1Panel AI 网关',
        nameEn: '1Panel AI Gateway',
        desc: '企业级 AI 网关',
        descEn: 'Enterprise-grade AI gateway',
        link: '/1panel/user-manual/ai/gateway',
        // SVG(viewBox 960x260, 约 3.69:1): 矢量图, 缩放不糊; 文件名含中文+【】,
        // useBaseUrl 会自动 URL 编码。卡片里受 .productLogo 的 max-width:220px 约束。
        logo: { light: '【logo】1Panel AI 网关 2.svg' },
      },
      {
        name: 'MaxKB',
        desc: '强大易用的企业级智能体平台',
        descEn: 'Powerful yet easy-to-use enterprise AI agent platform',
        link: 'https://maxkb.cn/docs/v2/',
        logo: { light: 'MaxKB-05.png' },
      },
    ],
  },
  {
    title: '运维管理',
    titleEn: 'Ops Management',
    items: [
      {
        name: '1Panel 运维管理面板',
        nameEn: '1Panel Linux Panel',
        desc: '现代化、开源的 Linux 面板',
        descEn: 'Modern open-source Linux panel',
        link: '/1panel/',
        logo: { light: '1panel-01.png' },
      },
      {
        name: 'JumpServer',
        desc: '广受欢迎的开源堡垒机',
        descEn: 'The most popular open-source bastion host',
        // 注意: JumpServer 文档站没有英文版(/en/v4/ 会 302 回 /zh/v4/), 所以中英文共用中文地址
        link: 'https://docs.jumpserver.org/zh/v4/',
        logo: { light: 'JumpServer-绿色.png' },
      },
    ],
  },
  {
    title: 'BI 数据分析',
    titleEn: 'BI & Analytics',
    items: [
      {
        name: 'DataEase',
        desc: '人人可用的开源 BI 工具',
        descEn: 'Open-source BI tool for everyone',
        link: 'https://dataease.cn/docs/v2/',
        logo: { light: 'DataEase-01.png' },
      },
      {
        name: 'SQLBot',
        desc: '基于大模型的智能问数系统',
        descEn: 'LLM-powered Text-to-SQL system',
        link: 'https://sqlbot.org/docs/v1/',
        // 文件名含【】和中文, useBaseUrl + img.src 会自动 URL 编码, 没问题
        logo: { light: '【logo】SQLBot.png' },
      },
    ],
  },
  {
    title: 'CRM、建站及测试',
    titleEn: 'CRM, Website & Testing',
    items: [
      {
        name: 'Cordys CRM',
        desc: '新一代的开源 AI CRM 系统',
        descEn: 'Next-generation open-source AI CRM',
        link: 'https://cordys.cn/docs/',
        logo: { light: 'CORDYS.png' },
      },
      {
        name: 'MeterSphere',
        desc: '新一代的开源持续测试工具',
        descEn: 'Next-generation open-source continuous testing tool',
        link: 'https://metersphere.io/docs/v3.x/',
        logo: { light: 'MeterSphere-紫色.png' },
      },
      {
        name: 'Halo',
        desc: '强大易用的开源建站工具',
        descEn: 'Powerful yet easy-to-use open-source website builder',
        link: 'https://docs.halo.run/',
        logo: { light: 'Halo-01.png' },
      },
    ],
  },
];

function ProductCard({ item, enter, zh }) {
  // 首页统一用亮色版 logo, 不参与站点 data-theme 切换。
  const lightSrc = useBaseUrl(`/img/${item.logo.light}`);

  return (
    <Link to={item.link} className={styles.productCard}>
      <img
        src={lightSrc}
        alt={zh ? item.name : item.nameEn || item.name}
        className={styles.productLogo}
        loading="lazy"
      />
      <div className={styles.productBody}>
        {/* 不再渲染产品名: logo 图片本身已带产品名文字, 重复展示显冗余。
            name 字段仍保留 —— 用作 React key、以及 alt(无障碍/图片加载失败时的兜底文案)。 */}
        <div className={styles.productDesc}>{zh ? item.desc : item.descEn}</div>
        <div className={styles.productEnter}>{enter}</div>
      </div>
    </Link>
  );
}

function CategorySection({ title, titleEn, items, enter, zh }) {
  return (
    <section className={styles.categorySection}>
      <Heading as="h2" className={styles.categoryTitle}>{zh ? title : titleEn}</Heading>
      <div className={styles.productGrid}>
        {items.map((item) => (
          <ProductCard key={item.name} item={item} enter={enter} zh={zh} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { i18n } = useDocusaurusContext();
  const zh = i18n.currentLocale === 'zh-Hans';
  const siteTitle = zh ? '文档中心' : 'Docs Center';
  const enter = zh ? '进入文档 →' : 'Enter Docs →';

  return (
    <Layout title={siteTitle} description={siteTitle}>
      <div className={styles.portalPage}>
        <header className={styles.portalHeader}>
          <Heading as="h1" className={styles.portalTitle}>{siteTitle}</Heading>
          <div className={styles.searchBox}>
            <SearchBar />
          </div>
        </header>
        <main className="container">
          {PRODUCT_GROUPS.map((g) => (
            <CategorySection
              key={g.title}
              title={g.title}
              titleEn={g.titleEn}
              items={g.items}
              enter={enter}
              zh={zh}
            />
          ))}
        </main>
      </div>
    </Layout>
  );
}
