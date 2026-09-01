/**
 * 自定义 navbar 项: 版本切换下拉。
 * 仅在"当前处于有多个版本的文档实例页面"时显示; 离开文档页/单版本产品时自动隐藏。
 */
import React, {useState, useRef, useEffect} from 'react';
import Link from '@docusaurus/Link';
import {
  useActivePluginAndVersion,
  useVersions,
  useActiveDocContext,
} from '@docusaurus/plugin-content-docs/client';
import {translate} from '@docusaurus/Translate';
import styles from './VersionSwitcher.module.css';

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default function VersionSwitcher(props) {
  const apv = useActivePluginAndVersion();
  if (!apv) return null; // 非文档页
  const pluginId = apv.activePlugin.pluginId;
  const versions = useVersions(pluginId);
  if (!versions || versions.length <= 1) return null; // 单版本不显示

  const activeDocContext = useActiveDocContext(pluginId);
  const activeName = activeDocContext?.activeVersion?.name;

  const items = versions.map((v) => {
    const target =
      activeDocContext?.alternateDocVersions?.[v.name] ??
      v.docs.find((d) => d.id === v.mainDocId);
    return {name: v.name, label: v.label, path: target?.path ?? v.path};
  });

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));
  const current = items.find((it) => it.name === activeName) ?? items[0];

  const ariaLabel = translate({id: 'theme.docs.versionDropdown', message: '选择版本'});

  return (
    <div className={styles.versionDropdown} ref={ref}>
      <button
        className={styles.versionButton}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={ariaLabel}
        title={ariaLabel}>
        <span className={styles.versionLabel}>{current?.label}</span>
        <span className={styles.versionCaret}>▾</span>
      </button>
      {open && (
        <ul className={styles.versionMenu}>
          {items.map((it) => (
            <li key={it.name}>
              <Link
                className={
                  it.name === current?.name ? styles.versionActive : styles.versionItem
                }
                to={it.path}>
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
