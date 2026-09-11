/**
 * 首页/导航栏共用的即时搜索结果下拉面板。
 *
 * 抽自 HomeSearch/index.js 的面板部分:
 * - createPortal 渲染到 <body> + position:fixed, 以调用方传入的 rect
 *   (top/left/width) 定位。调用方负责用搜索框/面板锚点 getBoundingClientRect
 *   计算 rect; 宽度走内联 style.rect.width, 因此同一份 CSS 可服务首页 800px
 *   与导航栏 ~480px 的不同宽度, 无需参数化。
 * - 渲染 5 行结果(标题 + 分类 Tag + 摘要), 底部「查看全部结果」。
 */

import React from 'react';
import {createPortal} from 'react-dom';
import styles from './ResultsPanel.module.css';
import {highlightText} from './highlight';

export function DocIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden="true">
      <path
        d="M8.5 5.8h9.2a1.2 1.2 0 01.85.35l5.3 5.3a1.2 1.2 0 01.35.85v13.9a1.2 1.2 0 01-1.2 1.2H8.5a1.2 1.2 0 01-1.2-1.2V7a1.2 1.2 0 011.2-1.2z"
        fill="#ffffff"
        stroke="#b7bfd2"
        strokeWidth="1.5"
      />
      <path d="M18 5.8v6.2h6.2" stroke="#b7bfd2" strokeWidth="1.5" />
      <path
        d="M11.5 17.5h9M11.5 21h9M11.5 24.5h5.5"
        stroke="#c8cbcb"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ResultsPanel({
  rect,
  rows,
  query,
  active,
  emptyText,
  viewAllText,
  searchUrl,
  onOpen,
  onNavigate,
  panelRef,
}) {
  return createPortal(
    <div
      ref={panelRef}
      className={styles.panel}
      style={rect ? {top: rect.top, left: rect.left, width: rect.width} : {visibility: 'hidden'}}>
      {rows.length === 0 ? (
        <div className={styles.empty}>{emptyText}</div>
      ) : (
        <>
          {rows.map((item, i) => (
            <a
              key={item.permalink}
              href={item.permalink}
              className={`${styles.row} ${i === active ? styles.rowActive : ''}`}
              onMouseEnter={() => onOpen(i)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.permalink);
              }}>
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
          <a
            className={styles.viewAll}
            href={searchUrl}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(searchUrl);
            }}>
            {viewAllText}
          </a>
        </>
      )}
    </div>,
    document.body,
  );
}
