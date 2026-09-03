/**
 * 自定义 navbar 项: 「产品文档」下拉, 仿 fit2cloud 官网顶部菜单。
 * 每个产品一条: 左侧 logo 小图标 + 右侧(加粗产品名 + 灰色一行描述), 整条链接跳转到对应产品**文档站**。
 *
 * 实现说明:
 * - 外层容器复用 theme 的全局下拉类(.navbar__item/.dropdown/.dropdown--hoverable/
 *   .dropdown__menu/.dropdown__link), 所以 hover 展开、菜单样式、链接高亮等原生行为无需手写。
 * - 产品 logo 放在 static/img/logo/ 下, 亮色/暗色主题统一用彩色版(不随主题切换黑版)。
 * - 链接: 站内文档(本门户)用 `to` + <Link>(同站跳转); 独立文档站用 `link` + <a target="_blank">。
 * - 与右上角 navbar 外链不同: 这里的 item 是自己渲染的, 不受
 *   custom.css 里"隐藏 navbar 外链小箭头"影响, 也就不会有 ↗ 图标。
 */
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ProductDocs.module.css';

// 开源产品集中维护在这张表: 改名称/链接/描述/logo 只动这里。
// 与首页 PRODUCT_GROUPS(src/pages/index.js) 同源的 8 个产品, 链接指向各自文档站。
// export 出来供首页引用(首页卡片的第一二行名称/简介共用这份数据)。
export const PRODUCTS = [
  {name: '1Panel AI 网关', to: '/ai-gateway/', desc: '企业级 AI 网关', logo: 'AI网关logo.png'},
  {name: '1Panel', to: '/1panel/', desc: '现代化、开源的 Linux 面板', logo: '1panel-07-蓝色.png'},
  {name: 'JumpServer', link: 'https://docs.jumpserver.org/zh/v4/', desc: '广受欢迎的开源堡垒机', logo: 'JumpServer-辅助图形-绿色.png'},
  {name: 'DataEase', link: 'https://dataease.cn/docs/v2/', desc: '人人可用的开源 BI 工具', logo: 'DataEase-07-蓝色.png'},
  {name: 'MaxKB', link: 'https://maxkb.cn/docs/v2/', desc: '强大易用的企业级智能体平台', logo: 'MaxKB-03.png'},
  {name: 'SQLBot', link: 'https://sqlbot.org/docs/v1/', desc: '基于大模型的智能问数系统', logo: '【辅助图形】SQLBot.png'},
  {name: 'Cordys CRM', link: 'https://cordys.cn/docs/', desc: '新一代的开源 AI CRM 系统', logo: 'CORDYS-辅助图形.png'},
  {name: 'MeterSphere', link: 'https://metersphere.io/docs/v3.x/', desc: '新一代的开源持续测试工具', logo: 'MeterSphere-辅助图形-紫色.png'},
  {name: 'Halo', link: 'https://docs.halo.run/', desc: '强大易用的开源建站工具', logo: 'Halo-03.png'},
];

function ProductItem({p, imgSrc}) {
  const className = `${styles.link} dropdown__link`;
  const inner = (
    <>
      <span className={styles.icon}>
        <img src={imgSrc(p.logo)} alt={p.name} loading="lazy" />
      </span>
      <span className={styles.text}>
        <span className={styles.name}>{p.name}</span>
        <span className={styles.desc}>{p.desc}</span>
      </span>
    </>
  );
  // 站内文档用 Link 同站跳转; 独立文档站用 <a> 新窗口打开。
  if (p.to) {
    return (
      <Link className={className} to={p.to}>
        {inner}
      </Link>
    );
  }
  return (
    <a className={className} href={p.link} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
}

export default function ProductDocs() {
  const base = useBaseUrl('/img/logo/');
  // 文件名含中文/【】等字符, 统一 URL 编码, 避免路径里出现裸中文。
  const imgSrc = (name) => base + encodeURIComponent(name);

  return (
    <div className="navbar__item dropdown dropdown--hoverable">
      <a
        className="navbar__link"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="false">
        产品文档
        {/* 下拉箭头, 参考 docs.halo.run 顶部「版本」旁的 chevron 图标 */}
        <svg
          className={styles.caretIcon}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <ul className={`${styles.menu} dropdown__menu`}>
        {PRODUCTS.map((p) => (
          <li key={p.name}>
            <ProductItem p={p} imgSrc={imgSrc} />
          </li>
        ))}
      </ul>
    </div>
  );
}
