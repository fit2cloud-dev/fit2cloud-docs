/**
 * /search 全量结果页(重写 easyops 默认 SearchPage)。
 *
 * - 数据源: 与首页/右上角搜索一致, 用 home-search-index 插件注入的
 *   globalData, 前端 buildIndex/searchDocs 子串匹配。
 * - 层级: 顶部导航栏不变; 页面背景用主页同款蓝→白渐变。
 *   下方一个 hero 盒子: 左侧「全部结果(N)」标题 + 首页大搜索框(SearchBox),
 *   右侧为【主题】飞致云文档中心 插画; 盒子下方把全部匹配结果按首页下拉的
 *   行样式(文档图标+标题+分类Tag+摘要)平铺, 命中关键词淡蓝高亮。
 * - 版式: 内容容器 1200px 宽; 结果列表分页, 每页 10 条。
 * - 行为: 输入即时过滤; 空关键词 = 展示全部; 换关键词回到第 1 页;
 *   ?q= 实时同步地址栏(replace), 进入 /search?q=xxx 时自动搜索。
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {useHistory, useLocation} from '@docusaurus/router';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './SearchPage.module.css';
import {buildIndex, searchDocs} from '../components/HomeSearch/search';
import {highlightText} from '../components/HomeSearch/highlight';
import {DocIcon} from '../components/HomeSearch/ResultsPanel';
import SearchBox from '../components/HomeSearch/SearchBox';

/* 与主页 Hero 同款插画(文件名含中文/【】, 用 URL 编码) */
const ILLU = '/img/%E3%80%90%E4%B8%BB%E9%A2%98%E3%80%91%E9%A3%9E%E8%87%B4%E4%BA%91%E6%96%87%E6%A1%A3%E4%B8%AD%E5%BF%83.png';

/* 分页: 每页条数 */
const PAGE_SIZE = 10;

/* 本页文案: 与主页 index.js 的大搜索框文案保持一致 */
const COPY = {
  zh: {
    searchPlaceholder: '请输入关键词回车检索，例如：1Panel 如何安装',
    searchBtn: '搜索',
    allResults: '全部结果',
    empty: '未找到相关文档，换个关键词试试',
    prev: '上一页',
    next: '下一页',
    range: (a, b, total) => `第 ${a}-${b} 条，共 ${total} 条`,
  },
  en: {
    searchPlaceholder: 'Type keywords and press Enter, e.g. FIT2CLOUD',
    searchBtn: 'Search',
    allResults: 'All results',
    empty: 'No docs found, try another keyword',
    prev: 'Prev',
    next: 'Next',
    range: (a, b, total) => `${a}-${b} of ${total}`,
  },
};

export default function SearchPage() {
  const {i18n, siteConfig} = useDocusaurusContext();
  const zh = i18n.currentLocale === 'zh-Hans';
  const t = zh ? COPY.zh : COPY.en;
  const history = useHistory();
  const location = useLocation();

  // 初始关键词来自 URL ?q=
  const [query, setQuery] = useState(
    () => new URLSearchParams(location.search).get('q') || '',
  );
  // 当前页码(仅本页状态; 换关键词回到第 1 页)
  const [page, setPage] = useState(1);

  // 给 body 挂 search-page: 隐藏右上角 navbar 搜索框(本页自带 hero 大搜索框)。
  // 对应 custom.css 的 body.search-page [class*='navbar-search-home']。
  useEffect(() => {
    document.body.classList.add('search-page');
    return () => document.body.classList.remove('search-page');
  }, []);

  const {items} = usePluginData('home-search-index');
  const index = useMemo(() => buildIndex(items), [items]);

  // 即时过滤: 空关键词 = 展示全部; 有词则子串匹配
  const results = useMemo(
    () => (query.trim() ? searchDocs(index, query) : index),
    [index, query],
  );

  // ?q= 实时同步地址栏(replace, 不产生历史记录)
  const syncUrl = useCallback(
    (q) => {
      const sep = q.trim() ? `?q=${encodeURIComponent(q.trim())}` : '';
      history.replace(`${location.pathname}${sep}`);
    },
    [history, location.pathname],
  );

  const handleChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    setPage(1); // 换关键词回到第一页
    syncUrl(v);
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 即时过滤, 回车无需额外动作
  };

  // 分页切片
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const curPage = Math.min(page, totalPages);
  const pageResults = results.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);
  const rangeStart = (curPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(curPage * PAGE_SIZE, results.length);

  const goPage = (p) => setPage(Math.max(1, Math.min(p, totalPages)));

  // 生成页码(含首尾与当前附近, 间隔用省略号)
  const pageList = (() => {
    const set = new Set([1, totalPages]);
    for (let p = curPage - 2; p <= curPage + 2; p++) {
      if (p >= 1 && p <= totalPages) set.add(p);
    }
    return [...set].sort((a, b) => a - b);
  })();

  const illustration = useBaseUrl(ILLU);

  const pageTitle =
    (query.trim() ? `${query.trim()} - ` : '') +
    (zh ? '搜索' : 'Search');

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Head>
        {/* 搜索结果页不应被索引 */}
        <meta property="robots" content="noindex, follow" />
        <title>{pageTitle}</title>
      </Head>
      <div className={styles.page}>
        <div className={styles.container}>
          {/* hero 盒子: 左 全部结果+搜索框, 右 插画 */}
          <div className={styles.heroBox}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                {t.allResults}
              </h1>
              <div className={styles.searchWrap}>
                <SearchBox
                  value={query}
                  placeholder={t.searchPlaceholder}
                  submitLabel={t.searchBtn}
                  onChange={handleChange}
                  onKeyDown={() => {}}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
            <img className={styles.heroIllu} src={illustration} alt="" />
          </div>

          {/* 结果列表: 白底盒子铺满整行, 内容 1200px 居中, 每页 10 条 */}
          <div className={styles.results}>
            <div className={styles.resultsInner}>
            {pageResults.length === 0 && results.length === 0 && (
              <div className={styles.empty}>{t.empty}</div>
            )}

            {pageResults.map((item) => (
              <a key={item.permalink} className={styles.row} href={item.permalink}>
                <span className={styles.rowIcon}>
                  <DocIcon />
                </span>
                <span className={styles.rowBody}>
                  <span className={styles.rowTitleRow}>
                    <span className={styles.rowTitle}>{highlightText(item.title, query)}</span>
                    <span className={styles.rowTag}>{item.product}</span>
                  </span>
                  <span className={styles.rowDesc}>{highlightText(item.desc, query)}</span>
                </span>
              </a>
            ))}

            {/* 分页条 */}
            {results.length > PAGE_SIZE && (
              <div className={styles.pagination}>
                <span className={styles.pageInfo}>{t.range(rangeStart, rangeEnd, results.length)}</span>
                <div className={styles.pager}>
                  <button
                    className={styles.pageBtn}
                    type="button"
                    disabled={curPage <= 1}
                    onClick={() => goPage(curPage - 1)}>
                    {t.prev}
                  </button>
                  {pageList.map((p, idx) => {
                    const prev = pageList[idx - 1];
                    const showGap = prev !== undefined && p - prev > 1;
                    return (
                      <span key={p} className={styles.pageItemWrap}>
                        {showGap && <span className={styles.pageEllipsis}>…</span>}
                        <button
                          className={`${styles.pageNum} ${p === curPage ? styles.pageActive : ''}`}
                          type="button"
                          onClick={() => goPage(p)}>
                          {p}
                        </button>
                      </span>
                    );
                  })}
                  <button
                    className={styles.pageBtn}
                    type="button"
                    disabled={curPage >= totalPages}
                    onClick={() => goPage(curPage + 1)}>
                    {t.next}
                  </button>
                </div>
              </div>
            )}
            </div>
            </div>
          </div>
        </div>
    </Layout>
  );
}
