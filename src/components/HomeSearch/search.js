/**
 * 首页/导航栏共用搜索逻辑(纯函数, 不依赖 React)。
 *
 * 从 HomeSearch/index.js 原样迁出, 供首页 HomeSearch 与导航栏
 * HomeNavbarSearch 共同复用: productOf / buildIndex / searchDocs /
 * I18N / 常量 / searchUrlFor。
 */

/* routeBasePath(permalink 第一段) → 产品中文名, 与设计稿 Tag 位置对应 */
export const PRODUCT_BY_ROUTE = {
  '1panel': '1Panel 面板',
  sqlbot: 'SQLBot',
  jumpserver: 'JumpServer',
  dataease: 'DataEase',
  maxkb: 'MaxKB',
  'ai-gateway': '1Panel AI 网关',
  docs: '文档中心',
};

export const MAX_RESULTS = 5; // 设计稿面板展示 5 行
export const MAX_SCAN = 400; // 命中截断, 避免超长列表排序开销

export const I18N = {
  zh: {
    viewAll: '查看全部结果',
    empty: '未找到相关文档，换个关键词试试',
    placeholder: '搜索文档',
  },
  en: {
    viewAll: 'View all results',
    empty: 'No docs found, try another keyword',
    placeholder: 'Search docs',
  },
};

export function productOf(permalink) {
  const seg = (permalink || '').replace(/^\//, '').split('/')[0];
  return PRODUCT_BY_ROUTE[seg] || (seg ? seg.toUpperCase() : '文档中心');
}

/* 精简索引: 只取每个产品的最新版本, 避免 v1/v2 内容重复出现在结果里 */
/* 补上产品名与检索用小写串(插件已去好重、只留最新版本) */
export function buildIndex(items) {
  return (items || []).map((it) => {
    const product = productOf(it.permalink);
    return {
      ...it,
      product,
      haystack: `${it.title} ${it.desc} ${product}`.toLowerCase(),
    };
  });
}

/* 子串匹配: 空格分隔的多个词需全部命中, 标题命中优先于摘要命中 */
export function searchDocs(index, query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return [];
  }
  const terms = q.split(/\s+/).filter(Boolean);
  const hits = [];
  for (const item of index) {
    if (terms.every((t) => item.haystack.includes(t))) {
      hits.push({
        ...item,
        score: item.title.toLowerCase().includes(q) ? 0 : 1,
      });
      if (hits.length >= MAX_SCAN) {
        break;
      }
    }
  }
  return hits.sort((a, b) => a.score - b.score);
}

/* 「查看全部结果」落点: easyops 插件的 /search 全量页 */
export function searchUrlFor(query) {
  return `/search?q=${encodeURIComponent(query.trim())}`;
}
