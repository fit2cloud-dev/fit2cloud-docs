/**
 * 关键词高亮: 把标题/摘要里命中的词包进 <mark class="search-mark">(淡蓝底)。
 *
 * 供首页下拉(ResultsPanel)、右上角下拉(ResultsPanel)与 /search 页共用,
 * 因此不归属到某个具体组件, 放在 HomeSearch 目录下作为共享小工具。
 *
 * 匹配规则与 search.js 的 searchDocs 一致: 空格分隔的多个词, 各自独立
 * 在文本中做大小写不敏感的子串匹配(高亮只看单个词是否出现, 不做交集)。
 */

import React from 'react';

/* 把查询串切成小写的词数组(与 searchDocs 的分词一致) */
export function tokenizeQuery(query) {
  return (query || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
}

/* 将 text 中所有命中词替换为 <mark class="search-mark">。
   split 带一个捕获组: 偶数下标是普通片段, 奇数下标是命中片段。 */
export function highlightText(text, query) {
  const terms = tokenizeQuery(query).filter((t) => t.length > 0);
  if (!text || terms.length === 0) {
    return text;
  }
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(re);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="search-mark">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
