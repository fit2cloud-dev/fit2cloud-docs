/**
 * 覆盖默认的浏览器标签页标题格式化逻辑。
 * 文档页(浏览具体文档时)标题改为: 「当前文档标题 - 产品名 | 飞致云文档中心」,
 * 例如「快速入门 - 1Panel AI 网关 | 飞致云文档中心」。
 * 其它页面(首页/门户说明等)沿用 Docusaurus 默认格式「页面标题 | 站点标题」。
 *
 * 产品名的来源: docusaurus.config.js plugins 里各产品文档实例声明的 id
 * (1panel / jumpserver / dataease / maxkb / ai-gateway), 此处据此映射出中文产品名。
 */
import React from 'react';
import {TitleFormatterProvider} from '@docusaurus/theme-common/internal';

const PRODUCT_NAMES = {
  '1panel': '1Panel',
  jumpserver: 'JumpServer',
  dataease: 'DataEase',
  maxkb: 'MaxKB',
  'ai-gateway': '1Panel AI 网关',
};

const formatter = (params) => {
  const {title, siteTitle, plugin, defaultFormatter} = params;
  const productName = PRODUCT_NAMES[plugin?.id];
  // 仅对「映射出产品名的文档页」套用新模板; 其它页面走默认格式。
  if (productName && title && title !== siteTitle) {
    return `${title} - ${productName} | 飞致云文档中心`;
  }
  return defaultFormatter(params);
};

export default function ThemeProviderTitleFormatter({children}) {
  return (
    <TitleFormatterProvider formatter={formatter}>
      {children}
    </TitleFormatterProvider>
  );
}
