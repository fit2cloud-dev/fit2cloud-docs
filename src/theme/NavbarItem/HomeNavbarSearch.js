/**
 * 导航栏右上角的即时搜索框, 复用首页 HomeSearch 的搜索逻辑与结果面板。
 *
 * - 索引: 与首页相同, usePluginData('home-search-index')(构建期由
 *   plugins/home-search-index.js 注入), 无额外构建步骤。
 * - 匹配: 复用 search.js 的 buildIndex/searchDocs(纯函数)。
 * - 面板: 复用 ResultsPanel(createPortal + position:fixed)。
 *   导航栏为 position:fixed;top:0, 面板用视口坐标定位天然可用。
 * - 定位: 输入框较窄(~215px), 面板若等宽太窄, 故面板右对齐输入框右缘、
 *   固定宽度 panelWidth(min(480, 视口宽-24)), 避免右缘溢出屏外。
 * - i18n: 用 useDocusaurusContext().i18n.currentLocale 判定, 与首页一致。
 */

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './HomeNavbarSearch.module.css';
import {buildIndex, searchDocs, I18N, MAX_RESULTS, searchUrlFor} from '../../components/HomeSearch/search';
import ResultsPanel from '../../components/HomeSearch/ResultsPanel';

const PANEL_WIDTH = 480; // 面板固定宽度, 右对齐输入框右缘

export default function HomeNavbarSearch() {
  const {i18n} = useDocusaurusContext();
  const zh = i18n.currentLocale === 'zh-Hans';
  const t = zh ? I18N.zh : I18N.en;

  const history = useHistory();
  const {items} = usePluginData('home-search-index');
  const index = useMemo(() => buildIndex(items), [items]);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  // 面板 position:fixed 的视口坐标; null 表示尚未测量
  const [rect, setRect] = useState(null);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const results = useMemo(() => searchDocs(index, query), [index, query]);
  const visible = open && query.trim().length > 0;
  const rows = results.slice(0, MAX_RESULTS);
  const searchUrl = searchUrlFor(query);

  const go = useCallback(
    (url) => {
      setOpen(false);
      history.push(url);
    },
    [history],
  );

  /* 测量输入框在视口内的位置; 面板右对齐输入框右缘、固定宽度, 避免右缘溢出。
     width 用 min(480, 视口宽-24) 兜底小屏。 */
  const updatePos = useCallback(() => {
    const el = inputRef.current;
    if (!el) {
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.width === 0) {
      return;
    }
    const width = Math.min(PANEL_WIDTH, window.innerWidth - 24);
    setRect({
      top: r.bottom + 8,
      left: r.right - width,
      width,
    });
  }, []);

  // 面板打开时: 测一次位置, 并挂在 scroll/resize 上跟随
  useEffect(() => {
    if (!visible) {
      return undefined;
    }
    updatePos();
    window.addEventListener('resize', updatePos);
    document.addEventListener('scroll', updatePos, true);
    return () => {
      window.removeEventListener('resize', updatePos);
      document.removeEventListener('scroll', updatePos, true);
    };
  }, [visible, updatePos]);

  // 点击面板外部关闭(面板在 body 上, 需同时判断 wrap 与 portal 面板)
  useEffect(() => {
    if (!visible) {
      return undefined;
    }
    const onPointerDown = (e) => {
      const inWrap = wrapRef.current && wrapRef.current.contains(e.target);
      const inPanel = panelRef.current && panelRef.current.contains(e.target);
      if (!inWrap && !inPanel) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [visible]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (active >= 0 && rows[active]) {
      go(rows[active].permalink);
      return;
    }
    go(searchUrl);
  };

  const onKeyDown = (e) => {
    if (!visible || rows.length === 0) {
      if (e.key === 'Escape') {
        setOpen(false);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % rows.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i <= 0 ? rows.length - 1 : i - 1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const panel = visible ? (
    <ResultsPanel
      rect={rect}
      rows={rows}
      query={query}
      active={active}
      emptyText={t.empty}
      viewAllText={t.viewAll}
      searchUrl={searchUrl}
      onOpen={setActive}
      onNavigate={go}
      panelRef={panelRef}
    />
  ) : null;

  return (
    <div className={`${styles.search} navbar-search-home`} ref={wrapRef}>
      <form className={styles.searchBox} role="search" onSubmit={onSubmit}>
        <span className={styles.searchIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
        <input
          className={styles.input}
          ref={inputRef}
          type="search"
          name="q"
          value={query}
          placeholder={t.placeholder}
          autoComplete="off"
          aria-label={t.placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </form>
      {panel}
    </div>
  );
}
