/** 首页、产品菜单、文档切换和页脚共用的产品展示顺序。 */
export const PRODUCT_ORDER = Object.freeze([
  '1panel',
  'ai-gateway',
  'jumpserver',
  'maxkb',
  'dataease',
  'sqlbot',
  'metersphere',
  'halo',
  'cordys',
]);

const PRODUCT_RANK = new Map(PRODUCT_ORDER.map((id, index) => [id, index]));

/**
 * 按稳定的产品 id 排序，子集保留相对顺序，不修改原数组。
 * 尚未登记顺序的产品保留在末尾，避免新增入口被意外隐藏。
 * @template {{id: string}} T
 * @param {T[]} products
 * @returns {T[]}
 */
export function sortProducts(products) {
  return [...products].sort(
    (a, b) =>
      (PRODUCT_RANK.get(a.id) ?? PRODUCT_ORDER.length) -
      (PRODUCT_RANK.get(b.id) ?? PRODUCT_ORDER.length),
  );
}
