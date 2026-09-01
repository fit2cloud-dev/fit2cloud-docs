import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function ProductCard({linkTo, name, desc, enter}) {
  return (
    <Link to={linkTo} className={styles.productCard}>
      <div className={styles.productName}>{name}</div>
      <div className={styles.productDesc}>{desc}</div>
      <div className={styles.productEnter}>{enter}</div>
    </Link>
  );
}

function CategorySection({title, children}) {
  return (
    <section className={styles.categorySection}>
      <Heading as="h2" className={styles.categoryTitle}>{title}</Heading>
      <div className={styles.productGrid}>{children}</div>
    </section>
  );
}

export default function Home() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const zh = i18n.currentLocale === 'zh-Hans';

  const siteTitle = zh ? '文档中心' : 'Docs Center';
  const portalSubtitle = zh ? '多个产品文档，一个站点，全局搜索' : 'Multiple product docs, one site, global search';
  const searchHint = zh ? '使用右上角搜索框，跨全部产品进行全局检索' : 'Use the search box at top-right to search across all products';
  const catOps = zh ? '运维管理' : 'Ops & Management';
  const catBI = zh ? 'BI 数据分析' : 'BI & Analytics';
  const catAI = zh ? 'AI 人工智能' : 'AI';
  const bipName = '1Panel 运维管理面板';
  const bipDesc = zh ? '开源 Linux 服务器运维管理面板 & AI 管理平台' : 'Open-source Linux server ops panel & AI management platform';
  const jsName = 'JumpServer 运维安全审计';
  const jsDesc = zh ? '开源的堡垒机与运维安全审计系统' : 'Open-source bastion host & ops security audit system';
  const dataeaseName = zh ? 'DataEase 数据分析' : 'DataEase Analytics';
  const dataeaseDesc = zh ? '开源的数据可视化分析工具' : 'Open-source data visualization & analytics tool';
  const maxkbName = 'MaxKB 知识库问答';
  const maxkbDesc = zh ? '开源的智能知识库问答系统' : 'Open-source intelligent knowledge base Q&A system';
  const enter = zh ? '进入文档 →' : 'Enter Docs →';

  return (
    <Layout title={siteTitle} description={portalSubtitle}>
      <div className={styles.portalPage}>
        <header className={styles.portalHeader}>
          <Heading as="h1" className={styles.portalTitle}>{siteTitle}</Heading>
          <p className={styles.portalSubtitle}>{portalSubtitle}</p>
          <div className={styles.searchHint}>{searchHint}</div>
        </header>
        <main className="container">
          <CategorySection title={catOps}>
            <ProductCard linkTo="/1panel/" name={bipName} desc={bipDesc} enter={enter} />
            <ProductCard linkTo="/jumpserver/" name={jsName} desc={jsDesc} enter={enter} />
          </CategorySection>
          <CategorySection title={catBI}>
            <ProductCard linkTo="/dataease/" name={dataeaseName} desc={dataeaseDesc} enter={enter} />
          </CategorySection>
          <CategorySection title={catAI}>
            <ProductCard linkTo="/maxkb/" name={maxkbName} desc={maxkbDesc} enter={enter} />
          </CategorySection>
        </main>
      </div>
    </Layout>
  );
}
