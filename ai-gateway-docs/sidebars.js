// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  aiGateway: [
    // ── 根目录：部署与账号接入 ──
    { type: "doc", id: "index", label: "产品介绍" },
    { type: "doc", id: "quick_start", label: "快速入门" },

    // ── installation：安装部署页 ──
    {
      type: "category",
      label: "安装部署",
      collapsed: false,
      items: [
        { type: "doc", id: "installation/deployment_instructions", label: "部署说明", key: "installation-deployment" },
        { type: "doc", id: "installation/online_installation", label: "在线安装" },
        { type: "doc", id: "installation/1panel_installation", label: "1Panel安装" },
      ],
    },
    
    // ── admin-user-manual：管理员手册功能页 ──
    {
      type: "category",
      label: "管理员手册",
      collapsed: false,
      items: [
        { type: "doc", id: "admin-user-manual/overview", label: "概览", key: "doc-overview" },
        { type: "doc", id: "admin-user-manual/account_pool", label: "账号池" },
        { type: "doc", id: "admin-user-manual/model_group", label: "模型组" },
        { type: "doc", id: "admin-user-manual/user", label: "用户" },
        { type: "doc", id: "admin-user-manual/user_group", label: "用户组" },
        { type: "doc", id: "admin-user-manual/smart_route", label: "智能路由" },
        { type: "doc", id: "admin-user-manual/content_compliance", label: "内容合规" },
        { type: "doc", id: "admin-user-manual/call-logs", label: "调用日志" },
        { type: "doc", id: "admin-user-manual/usage-statistics", label: "用量统计", key: "admin-manual-usage-statistics" },
        { type: "doc", id: "admin-user-manual/settings", label: "设置" },
      ],
    },

    // ── end‑user-manual：普通用户手册功能页（注意：目录名第一段连字符是 U+2011 不换行连字符，非普通 -，勿改）──
    {
      type: "category",
      label: "普通用户手册",
      collapsed: false,
      items: [
        { type: "doc", id: "end‑user-manual/introduction", label: "功能介绍" },
        { type: "doc", id: "end‑user-manual/model-square", label: "模型广场" },
        { type: "doc", id: "end‑user-manual/api-keys", label: "API Keys" },
        { type: "doc", id: "end‑user-manual/usage-statistics", label: "用量统计", key: "user-manual-usage-statistics" },
        { type: "doc", id: "end‑user-manual/account-settings-and-notes", label: "账号与系统设置" },
      ],
    },

    { type: "doc", id: "integrate_third_party", label: "接入第三方" },
  ],
};

export default sidebars;
