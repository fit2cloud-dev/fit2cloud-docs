/**
 * 首页大搜索框(白底圆角 + 渐变「搜索」按钮)的受控复用组件。
 *
 * 首页 HomeSearch 与 /search 页共用同一外观。不含外层 .wrap(宽度/边距由
 * 调用方容器决定, 比如首页是 800 居中, /search 页是 hero 盒左列内自适应)。
 * 样式复用 index.module.css 的 .searchBox/.input/.btn。
 */

import React from 'react';
import styles from './index.module.css';

export default function SearchBox({
  value,
  placeholder,
  submitLabel,
  onChange,
  onFocus,
  onKeyDown,
  onSubmit,
  boxRef,
}) {
  return (
    <form className={styles.searchBox} role="search" onSubmit={onSubmit} ref={boxRef}>
      <input
        className={styles.input}
        type="search"
        name="q"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      <button className={styles.btn} type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
