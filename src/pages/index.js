import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
// 与右上角同一个搜索框组件(由 @easyops-cn/docusaurus-search-local 提供)。
// 首页不是文档页, 这里没有 activePlugin / searchContext, 因此会检索全部产品的全部文档。
import SearchBar from '@theme/SearchBar';
// 产品名称/简介/logo/文档链接复用左侧「产品文档」下拉那份数据(单一数据源, 避免两处不一致)。
import {PRODUCTS as DOC_PRODUCTS} from '../theme/NavbarItem/ProductDocs';
import styles from './index.module.css';

// 首页卡片在中英文下要显示产品名/简介: 下拉 PRODUCTS 只有中文 name/desc,
// 这里补一份英文(nameEn/descEn), 按中文 name 匹配; 没有英文的 fallback 到中文。
const EN_INFO = {
  '1Panel': ['1Panel', 'Modern, open-source Linux panel'],
  'JumpServer': ['JumpServer', 'The most popular open-source bastion host'],
  'DataEase': ['DataEase', 'Open-source BI tool for everyone'],
  'MeterSphere': ['MeterSphere', 'Next-gen open-source continuous testing tool'],
  'MaxKB': ['MaxKB', 'Powerful yet easy-to-use enterprise AI agent platform'],
  'Halo': ['Halo', 'Powerful yet easy-to-use open-source website builder'],
  'SQLBot': ['SQLBot', 'LLM-powered Text-to-SQL system'],
  'Cordys CRM': ['Cordys CRM', 'Next-generation open-source AI CRM'],
};

// 按中文名查下拉数据, 拿到 {name, desc, logo, to/link} 作为卡片第一二行的统一信息来源。
const docByName = Object.fromEntries(DOC_PRODUCTS.map((p) => [p.name, p]));

// 1Panel AI 网关是 1Panel 的功能模块, 不在下拉的 8 个开源产品里, 单独给一份数据(走站内 /ai-gateway/)。
const AI_GATEWAY = {
  name: '1Panel AI 网关',
  desc: '企业级 AI 网关',
  to: '/ai-gateway/',
  logo: '1panel-07-蓝色.png', // 复用 1Panel 的彩色小 logo
};

// 所有产品按分类集中在这张表, 每个产品对象来自 docByName(与「产品文档」下拉同源)。
const PRODUCT_GROUPS = [
  {title: 'AI 原生', titleEn: 'AI Native', items: [AI_GATEWAY, docByName['MaxKB']]},
  {title: '运维管理', titleEn: 'Ops Management', items: [docByName['1Panel'], docByName['JumpServer']]},
  {title: 'BI 数据分析', titleEn: 'BI & Analytics', items: [docByName['DataEase'], docByName['SQLBot']]},
  {title: 'CRM、建站及测试', titleEn: 'CRM, Website & Testing', items: [docByName['Cordys CRM'], docByName['MeterSphere'], docByName['Halo']]},
];

// 卡片三层结构: 第一行(小 logo + 产品名) / 第二行(简介) / 第三行(纯文字「进入文档」)。
function ProductCard({item, zh}) {
  const nickname = item.name;
  const en = EN_INFO[nickname];
  const name = zh ? nickname : (en ? en[0] : nickname);
  const desc = zh ? item.desc : (en ? en[1] : item.desc);
  const target = item.to ?? item.link; // 站内 to / 外站 link
  const logo = useBaseUrl(`/img/logo/${encodeURIComponent(item.logo)}`);
  const enter = zh ? '进入文档 →' : 'Enter Docs →';

  return (
    <Link to={target} className={styles.productCard}>
      <span className={styles.productHeader}>
        <img src={logo} alt={name} className={styles.productLogo} loading="lazy" />
        <span className={styles.productName}>{name}</span>
      </span>
      <span className={styles.productDesc}>{desc}</span>
      <span className={styles.productEnter}>{enter}</span>
    </Link>
  );
}

function CategorySection({title, titleEn, items, zh}) {
  return (
    <section className={styles.categorySection}>
      <Heading as="h2" className={styles.categoryTitle}>{zh ? title : titleEn}</Heading>
      <div className={styles.productGrid}>
        {items.map((item) => (
          <ProductCard key={item.name} item={item} zh={zh} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const {i18n} = useDocusaurusContext();
  const zh = i18n.currentLocale === 'zh-Hans';
  const siteTitle = zh ? '文档中心' : 'Docs Center';

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
              zh={zh}
            />
          ))}
        </main>
      </div>
    </Layout>
  );
}
