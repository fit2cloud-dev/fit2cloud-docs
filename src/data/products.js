/**
 * 首页产品卡片(panel)的自有数据源。
 *
 * 背景: 最初首页卡片与顶部「产品文档」下拉共用一份 PRODUCTS 表(单一数据源)。
 * 后续顶部下拉改为「开源产品」并跳官方产品官网, 需求两处内容解耦:
 * 首页卡片仍指向各产品「文档站/文档页」, 顶部下拉指向「官网」, 两者目的不同,
 * 不应再强行共用同一份数据。故从 ProductDocs.js 的 PRODUCTS 拆出此文件,
 * 由首页(src/pages/index.js)独立维护(保留原本内容与跳转), 与顶部下拉互不影响。
 *
 * 与顶部下拉(src/theme/NavbarItem/ProductDocs.js)再无依赖关系。
 */
const HOME_PRODUCTS = [
  {name: '1Panel AI 网关', to: '/ai-gateway/', desc: '企业级 AI 网关', logo: '1panel-07-蓝色.png'},
  {name: '1Panel 面板', to: '/1panel/', desc: '现代化、开源的 Linux 面板', logo: '1panel-07-蓝色.png'},
  {name: 'JumpServer', to: '/jumpserver/', desc: '广受欢迎的开源堡垒机', logo: 'JumpServer-辅助图形-绿色.png'},
  {name: 'DataEase', to: '/dataease/', desc: '人人可用的开源 BI 工具', logo: 'DataEase-07-蓝色.png'},
  {name: 'MaxKB', to: '/maxkb/', desc: '强大易用的企业级智能体平台', logo: 'MaxKB-03.png'},
  {name: 'SQLBot', to: '/sqlbot/', desc: '基于大模型的智能问数系统', logo: '【辅助图形】SQLBot.png'},
  {name: 'Cordys CRM', to: '/cordys/', desc: '新一代的开源 AI CRM 系统', logo: 'CORDYS-辅助图形.png'},
  {name: 'MeterSphere', link: 'https://metersphere.io/docs/v3.x/', desc: '新一代的开源持续测试工具', logo: 'MeterSphere-辅助图形-紫色.png'},
  {name: 'Halo', link: 'https://docs.halo.run/', desc: '强大易用的开源建站工具', logo: 'Halo-03.png'},
];

export default HOME_PRODUCTS;
