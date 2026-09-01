/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * Admonition Layout 覆盖版: 无自定义标题时不渲染标题栏(含默认"备注"标题文字)
 */
import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import styles from './styles.module.css';

function AdmonitionContainer({type, className, children, id}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition,
        className,
      )}
      id={id}>
      {children}
    </div>
  );
}

function AdmonitionHeading({icon, title}) {
  return (
    <div className={styles.admonitionHeading}>
      <span className={styles.admonitionIcon}>{icon}</span>
      {title}
    </div>
  );
}

function AdmonitionContent({children}) {
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

export default function AdmonitionLayout(props) {
  const {type, icon, title, children, className, id} = props;
  return (
    <AdmonitionContainer type={type} className={className} id={id}>
      {/* 仅当有自定义标题时才渲染标题栏; 无标题(note 默认的"备注")不显示,
          避免满屏 "备注" 二字, 贴近原 MkDocs 空标题提示框 */}
      {title ? <AdmonitionHeading title={title} icon={icon} /> : null}
      <AdmonitionContent>{children}</AdmonitionContent>
    </AdmonitionContainer>
  );
}
