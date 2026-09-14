import React from 'react';
import {isMultiColumnFooterLinks} from '@docusaurus/theme-common';
import FooterLinksOriginal from '@theme-original/Footer/Links';
import {sortProducts} from '../../../data/productOrder';

// 仅调整带产品标识的链接，保留普通链接的位置及各列原有结构。
function sortProductLinks(items) {
  const products = sortProducts(
    items
      .filter((item) => item['data-product-id'])
      .map((item) => ({id: item['data-product-id'], item})),
  );
  let productIndex = 0;
  return items.map((item) =>
    item['data-product-id'] ? products[productIndex++].item : item,
  );
}

export default function FooterLinks({links, ...props}) {
  const orderedLinks = isMultiColumnFooterLinks(links)
    ? links.map((column) => ({
        ...column,
        items: sortProductLinks(column.items),
      }))
    : sortProductLinks(links);

  return <FooterLinksOriginal {...props} links={orderedLinks} />;
}
