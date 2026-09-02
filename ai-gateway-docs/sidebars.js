// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  aiGateway: [
    // ── 根目录：部署与账号接入 ──
    { type: "doc", id: "index", label: "AI 网关" },
    { type: "doc", id: "overview", label: "概述" },
    { type: "doc", id: "quick_start", label: "快速入门" },
    { type: "doc", id: "quick_deployment", label: "安装部署" },
    { type: "doc", id: "introduction", label: "功能介绍" },
    { type: "doc", id: "account_pool", label: "账号池" },
    { type: "doc", id: "model_group", label: "模型组" },
    { type: "doc", id: "smart_route", label: "智能路由" },
    { type: "doc", id: "content_compliance", label: "内容合规" },
    { type: "doc", id: "model-square", label: "模型广场" },
    { type: "doc", id: "user", label: "用户管理" },
    { type: "doc", id: "user_group", label: "用户组" },
    { type: "doc", id: "api-keys", label: "API Keys" },
    { type: "doc", id: "integrate_third_party", label: "接入客户端" },
    { type: "doc", id: "account-settings-and-notes", label: "账号与系统设置" },

    // ── end-user-manual：普通用户功能页 ──
    {
      type: "category",
      label: "普通用户手册",
      collapsed: false,
      items: [
        { type: "doc", id: "end-user-manual/overview", label: "概述" },
        { type: "doc", id: "end-user-manual/usage-statistics", label: "用量统计" },
        { type: "doc", id: "end-user-manual/call-logs", label: "调用日志" },
        { type: "doc", id: "end-user-manual/settings", label: "设置" },
      ],
    },
  ],
};

export default sidebars;
