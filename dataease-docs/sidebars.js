// @ts-check
// DataEase v3 侧边栏：按「在线文档目录整改说明」重建
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

/**
 * @param {string} id
 * @param {string} label
 * @param {string} key
 */
function doc(id, label, key) {
  return { type: /** @type {const} */ ("doc"), id, label, key };
}

/**
 * @param {string} label
 * @param {import('@docusaurus/plugin-content-docs').PropSidebarItem[]} items
 * @param {string} key
 */
function cat(label, items, key) {
  return {
    type: /** @type {const} */ ("category"),
    label,
    collapsed: true,
    items,
    key,
  };
}

const 数据源 = cat(
  "数据源",
  [
    doc("user_manual/datasource_description", "数据源概述", "doc:使用手册/用户使用手册/数据准备/数据源/数据源概述"),
    doc("user_manual/datasource_configuration/MySQL_datasource_configuration", "配置 MySQL 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 MySQL 数据源"),
    doc("user_manual/datasource_configuration/ClickHouse_datasource_configuration", "配置 ClickHouse 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 ClickHouse 数据源"),
    doc("user_manual/datasource_configuration/Doris_datasource_configuration", "配置 Doris 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 Doris 数据源"),
    doc("user_manual/datasource_configuration/Impala_datasource_configuration", "配置 Impala 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 Impala 数据源"),
    doc("user_manual/datasource_configuration/MariaDB_datasource_configuration", "配置 MariaDB 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 MariaDB 数据源"),
    doc("user_manual/datasource_configuration/MongoDB-BI_datasource_configuration", "配置 MongoDB-BI 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 MongoDB-BI 数据源"),
    doc("user_manual/datasource_configuration/Oracle_datasource_configuration", "配置 Oracle 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 Oracle 数据源"),
    doc("user_manual/datasource_configuration/PostgreSQL_datasource_configuration", "配置 PostgreSQL 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 PostgreSQL 数据源"),
    doc("user_manual/datasource_configuration/Kingbase_datasource_configuration", "配置 Kingbase 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 Kingbase 数据源"),
    doc("user_manual/datasource_configuration/SQL_Server_datasource_configuration", "配置 SQL Server 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 SQL Server 数据源"),
    doc("user_manual/datasource_configuration/StarRocks_datasource_configuration", "配置 StarRocks 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 StarRocks 数据源"),
    doc("user_manual/datasource_configuration/TiDB_datasource_configuration", "配置 TiDB 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 TiDB 数据源"),
    doc("user_manual/datasource_configuration/AWS_Redshift_datasource_configuration", "配置 AWS Redshift 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 AWS Redshift 数据源"),
    doc("user_manual/datasource_configuration_api", "配置 API 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 API 数据源"),
    doc("user_manual/datasource_configuration/DB2_datasource_configuration", "配置 DB2 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 DB2 数据源"),
    doc("user_manual/datasource_configuration/Elasticsearch_datasource_configuration", "配置 Elasticsearch 数据源", "doc:使用手册/用户使用手册/数据准备/数据源/配置 Elasticsearch 数据源"),
    doc("user_manual/datasource_configuration/datasource_configuration_excel", "配置本地 Excel/CSV 数据", "doc:使用手册/用户使用手册/数据准备/数据源/配置本地 Excel/CSV 数据"),
    doc("user_manual/datasource_configuration/datasource_configuration_remote_excel", "配置远程 Excel/CSV 数据", "doc:使用手册/用户使用手册/数据准备/数据源/配置远程 Excel/CSV 数据"),
  ],
  "cat:使用手册/用户使用手册/数据准备/数据源"
);

const 数据集 = cat(
  "数据集",
  [
    doc("user_manual/dataset_description", "数据集概述", "doc:使用手册/用户使用手册/数据准备/数据集/数据集概述"),
    doc("user_manual/dataset_design", "数据集功能设计", "doc:使用手册/用户使用手册/数据准备/数据集/数据集功能设计"),
    doc("xpack/dataset", "行列权限", "doc:使用手册/用户使用手册/数据准备/数据集/行列权限"),
  ],
  "cat:使用手册/用户使用手册/数据准备/数据集"
);

const 仪表板图表 = cat(
  "图表",
  [
    doc("user_manual/view_module/view_generation", "图表概述", "doc:使用手册/用户使用手册/仪表板/图表/图表概述"),
    doc("user_manual/view_module/view_create", "添加图表", "doc:使用手册/用户使用手册/仪表板/图表/添加图表"),
    doc("user_manual/view_module/view_data_design", "图表数据设计", "doc:使用手册/用户使用手册/仪表板/图表/图表数据设计"),
    doc("user_manual/view_module/view_style_design", "图表样式设计", "doc:使用手册/用户使用手册/仪表板/图表/图表样式设计"),
    doc("user_manual/view_module/view_advanced_design", "图表高级设计", "doc:使用手册/用户使用手册/仪表板/图表/图表高级设计"),
    doc("user_manual/view_module/view_gallery", "图表图库", "doc:使用手册/用户使用手册/仪表板/图表/图表图库"),
  ],
  "cat:使用手册/用户使用手册/仪表板/图表"
);

const 仪表板查询 = cat(
  "查询组件",
  [
    doc("user_manual/filter_module/filtert_module", "查询组件概览", "doc:使用手册/用户使用手册/仪表板/查询组件/查询组件概览"),
    doc("user_manual/filter_module/filtertime_module", "时间查询组件", "doc:使用手册/用户使用手册/仪表板/查询组件/时间查询组件"),
    doc("user_manual/filter_module/filtertext_module", "文本查询组件", "doc:使用手册/用户使用手册/仪表板/查询组件/文本查询组件"),
    doc("user_manual/filter_module/filternumber_module", "数字查询组件", "doc:使用手册/用户使用手册/仪表板/查询组件/数字查询组件"),
  ],
  "cat:使用手册/用户使用手册/仪表板/查询组件"
);

const 数据大屏图表 = cat(
  "图表",
  [
    doc("user_manual/view_module/panel_generation", "图表概述", "doc:使用手册/用户使用手册/数据大屏/图表/图表概述"),
    doc("user_manual/view_module/panel_view_create", "添加图表", "doc:使用手册/用户使用手册/数据大屏/图表/添加图表"),
    doc("user_manual/view_module/panel_view_data_design", "图表数据设计", "doc:使用手册/用户使用手册/数据大屏/图表/图表数据设计"),
    doc("user_manual/view_module/panel_view_style_design", "图表样式设计", "doc:使用手册/用户使用手册/数据大屏/图表/图表样式设计"),
    doc("user_manual/view_module/panel_view_advanced_design", "图表高级设计", "doc:使用手册/用户使用手册/数据大屏/图表/图表高级设计"),
    doc("user_manual/view_module/panel_view_gallery", "图表图库", "doc:使用手册/用户使用手册/数据大屏/图表/图表图库"),
  ],
  "cat:使用手册/用户使用手册/数据大屏/图表"
);

const 数据大屏查询 = cat(
  "查询组件",
  [
    doc("user_manual/filter_module/filtert_module_panel", "查询组件概览", "doc:使用手册/用户使用手册/数据大屏/查询组件/查询组件概览"),
    doc("user_manual/filter_module/filtertime_module_panel", "时间查询组件", "doc:使用手册/用户使用手册/数据大屏/查询组件/时间查询组件"),
    doc("user_manual/filter_module/filtertext_module_panel", "文本查询组件", "doc:使用手册/用户使用手册/数据大屏/查询组件/文本查询组件"),
    doc("user_manual/filter_module/filternumber_module_panel", "数字查询组件", "doc:使用手册/用户使用手册/数据大屏/查询组件/数字查询组件"),
  ],
  "cat:使用手册/用户使用手册/数据大屏/查询组件"
);

const 嵌入式示例 = cat(
  "嵌入式示例",
  [
    doc("embedded/setting", "基础设置说明", "doc:使用手册/嵌入式 BI 使用手册/嵌入式示例/基础设置说明"),
    doc("embedded/div", "DIV 嵌入", "doc:使用手册/嵌入式 BI 使用手册/嵌入式示例/DIV 嵌入"),
    doc("embedded/iframe", "Iframe 嵌入", "doc:使用手册/嵌入式 BI 使用手册/嵌入式示例/Iframe 嵌入"),
    doc("embedded/interaction", "嵌入式数据交互", "doc:使用手册/嵌入式 BI 使用手册/嵌入式示例/嵌入式数据交互"),
  ],
  "cat:使用手册/嵌入式 BI 使用手册/嵌入式示例"
);

const 嵌入式附加 = cat(
  "嵌入式附加功能",
  [
    doc("embedded/sso", "单点登录", "doc:使用手册/嵌入式 BI 使用手册/嵌入式附加功能/单点登录"),
    doc("embedded/simulated", "模拟登录", "doc:使用手册/嵌入式 BI 使用手册/嵌入式附加功能/模拟登录"),
  ],
  "cat:使用手册/嵌入式 BI 使用手册/嵌入式附加功能"
);

const 电子表格 = cat(
  "电子表格",
  [
    doc("xpack/spreadsheet_description", "电子表格概述", "doc:使用手册/用户使用手册/电子表格/电子表格概述"),
    doc("xpack/spreadsheet_resource", "资源目录与管理", "doc:使用手册/用户使用手册/电子表格/资源目录与管理"),
    doc("xpack/spreadsheet_features", "电子表格功能详解", "doc:使用手册/用户使用手册/电子表格/电子表格功能详解"),
    doc("xpack/spreadsheet_special", "电子表格特殊功能", "doc:使用手册/用户使用手册/电子表格/电子表格特殊功能"),
    doc("xpack/spreadsheet_publish", "发布运维", "doc:使用手册/用户使用手册/电子表格/发布运维"),
  ],
  "cat:使用手册/用户使用手册/电子表格"
);

const sidebars = {
  dataease: [
    cat(
      "产品介绍",
      [
        doc("index", "概述", "doc:产品介绍/概述"),
        doc("system_arch", "系统架构", "doc:产品介绍/系统架构"),
      ],
      "cat:产品介绍"
    ),
    doc("quick_start", "快速入门", "doc:快速入门"),
    cat(
      "更新日志",
      [
        doc("changelog", "日志详情", "doc:更新日志/日志详情"),
        cat(
          "更新说明",
          [doc("change-v3-0-0", "v3.0.0", "doc:更新日志/更新说明/v3.0.0")],
          "cat:更新日志/更新说明"
        ),
      ],
      "cat:最新动态"
    ),
    doc("purchase", "购买指南", "doc:购买指南"),
    cat(
      "安装部署",
      [
        doc("installation/offline_INSTL_and_UPG", "安装指南", "doc:安装部署/安装指南"),
        doc("installation/online_INSTL_and_UPG", "在线安装指南", "doc:安装部署/在线安装指南"),
        doc("installation/multi_database_deployment", "外部数据库部署", "doc:安装部署/外部数据库部署"),
        doc("installation/offline_upgrade", "升级指南", "doc:安装部署/升级指南"),
        doc("installation/online_upgrade", "在线升级", "doc:安装部署/在线升级"),
        doc("installation/deployment_installation", "源码部署", "doc:安装部署/源码部署"),
        doc("installation/data_migration", "数据迁移", "doc:安装部署/数据迁移"),
      ],
      "cat:安装部署"
    ),
    cat(
      "使用手册",
      [
        cat(
          "通用功能",
          [
            doc("user_manual/homepage", "工作台", "doc:使用手册/通用功能/工作台"),
            doc("user_manual/template_market", "模板市场", "doc:使用手册/通用功能/模板市场"),
            cat(
              "帮助",
              [doc("instructional_video", "教学视频", "doc:使用手册/通用功能/帮助/教学视频")],
              "cat:使用手册/通用功能/帮助"
            ),
            cat(
              "工具箱",
              [
                doc("xpack/toolbox", "工具箱概述", "doc:使用手册/通用功能/工具箱/工具箱概述"),
                doc("user_manual/system_management/module", "模板管理", "doc:使用手册/通用功能/工具箱/模板管理"),
                doc("xpack/sys_management_report", "定时报告", "doc:使用手册/通用功能/工具箱/定时报告"),
                doc("xpack/alarm_management", "告警管理", "doc:使用手册/通用功能/工具箱/告警管理"),
                doc("xpack/blood_relationship", "血缘分析", "doc:使用手册/通用功能/工具箱/血缘分析"),
                doc("xpack/operation_log", "操作日志", "doc:使用手册/通用功能/工具箱/操作日志"),
              ],
              "cat:使用手册/通用功能/工具箱"
            ),
          ],
          "cat:使用手册/通用功能"
        ),
        cat(
          "管理员使用手册",
          [
            doc("xpack/user_management_user", "用户管理", "doc:使用手册/管理员使用手册/用户管理"),
            doc("xpack/sys_management_organization", "组织管理", "doc:使用手册/管理员使用手册/组织管理"),
            doc("xpack/sys_management_permission", "权限配置", "doc:使用手册/管理员使用手册/权限配置"),
            cat(
              "系统参数",
              [
                doc("user_manual/system_management/param", "基础设置", "doc:使用手册/管理员使用手册/系统参数/基础设置"),
                doc("xpack/Param_configuration", "登录与平台参数", "doc:使用手册/管理员使用手册/系统参数/登录与平台参数"),
              ],
              "cat:使用手册/管理员使用手册/系统参数"
            ),
            doc("xpack/system_variables", "系统变量", "doc:使用手册/管理员使用手册/系统变量"),
            doc("xpack/appearance_configuration", "外观配置", "doc:使用手册/管理员使用手册/外观配置"),
            doc("xpack/identification_setting", "认证配置", "doc:使用手册/管理员使用手册/认证配置"),
            doc("xpack/multidimensional_embedding", "嵌入式管理", "doc:使用手册/管理员使用手册/嵌入式管理"),
            doc("xpack/platform_abutment", "平台对接", "doc:使用手册/管理员使用手册/平台对接"),
            doc("xpack/plugin_management", "插件管理", "doc:使用手册/管理员使用手册/插件管理"),
            doc("xpack/watermark", "水印管理", "doc:使用手册/管理员使用手册/水印管理"),
            doc("xpack/Security_settings", "安全管理", "doc:使用手册/管理员使用手册/安全管理"),
            doc("user_manual/system_management/font_management", "字体管理", "doc:使用手册/管理员使用手册/字体管理"),
          ],
          "cat:使用手册/管理员使用手册"
        ),
        cat(
          "组织管理员使用手册",
          [
            doc("xpack/org_center_member", "成员管理", "doc:使用手册/组织管理员使用手册/成员管理"),
            doc("xpack/org_center_permission", "权限配置", "doc:使用手册/组织管理员使用手册/权限配置"),
            doc("xpack/data_synchronization_management", "同步管理", "doc:使用手册/组织管理员使用手册/同步管理"),
            doc("xpack/Webhook", "Webhook 管理", "doc:使用手册/组织管理员使用手册/Webhook 管理"),
          ],
          "cat:使用手册/组织管理员使用手册"
        ),
        cat(
          "用户使用手册",
          [
            cat("数据准备", [数据源, 数据集], "cat:使用手册/用户使用手册/数据准备"),
            cat(
              "仪表板",
              [
                doc("user_manual/dashboard_description", "仪表板概述", "doc:使用手册/用户使用手册/仪表板/仪表板概述"),
                doc("user_manual/dashboard_create", "创建仪表板", "doc:使用手册/用户使用手册/仪表板/创建仪表板"),
                doc("user_manual/dashboard_basicfunctions", "仪表板基础功能", "doc:使用手册/用户使用手册/仪表板/仪表板基础功能"),
                doc("user_manual/module_basicfunctions", "组件基础功能", "doc:使用手册/用户使用手册/仪表板/组件基础功能"),
                doc("user_manual/dashboard_using_copy", "仪表板使用", "doc:使用手册/用户使用手册/仪表板/仪表板使用"),
                仪表板图表,
                仪表板查询,
                doc("user_manual/other_module/style_module", "其他组件", "doc:使用手册/用户使用手册/仪表板/其他组件"),
                doc("user_manual/app_description", "移动端", "doc:使用手册/用户使用手册/仪表板/移动端"),
              ],
              "cat:使用手册/用户使用手册/仪表板"
            ),
            cat(
              "数据大屏",
              [
                doc("user_manual/panel_description", "数据大屏概述", "doc:使用手册/用户使用手册/数据大屏/数据大屏概述"),
                doc("user_manual/panel_create", "创建数据大屏", "doc:使用手册/用户使用手册/数据大屏/创建数据大屏"),
                doc("user_manual/panel_basicfunctions", "数据大屏基础功能", "doc:使用手册/用户使用手册/数据大屏/数据大屏基础功能"),
                doc("user_manual/panel_module_basicfunctions", "组件基础功能", "doc:使用手册/用户使用手册/数据大屏/组件基础功能"),
                doc("user_manual/panel_using", "数据大屏使用", "doc:使用手册/用户使用手册/数据大屏/数据大屏使用"),
                数据大屏图表,
                数据大屏查询,
                doc("user_manual/other_module/panel_style_module", "其他组件", "doc:使用手册/用户使用手册/数据大屏/其他组件"),
              ],
              "cat:使用手册/用户使用手册/数据大屏"
            ),
            电子表格,
            doc("xpack/data_filing", "数据填报", "doc:使用手册/用户使用手册/数据填报"),
            doc("user_manual/system_management/data_export_center", "数据导出中心", "doc:使用手册/用户使用手册/数据导出中心"),
          ],
          "cat:使用手册/用户使用手册"
        ),
        cat(
          "嵌入式 BI 使用手册",
          [
            doc("embedded/summary", "嵌入式概述", "doc:使用手册/嵌入式 BI 使用手册/嵌入式概述"),
            doc("embedded/process", "嵌入式流程", "doc:使用手册/嵌入式 BI 使用手册/嵌入式流程"),
            嵌入式示例,
            doc("embedded/question", "嵌入式常见问题", "doc:使用手册/嵌入式 BI 使用手册/嵌入式常见问题"),
            嵌入式附加,
          ],
          "cat:使用手册/嵌入式 BI 使用手册"
        ),
        cat(
          "第三方集成",
          [doc("skill/index", "Skills", "doc:使用手册/第三方集成/Skills")],
          "cat:使用手册/第三方集成"
        ),
      ],
      "cat:使用手册"
    ),
    doc("desktop/index", "桌面版说明", "doc:桌面版说明"),
    doc("faq/enterprise_faq", "企业版功能", "doc:企业版功能"),
    cat(
      "API 文档",
      [doc("xpack/sys_management_develop", "系统 API", "doc:API 文档/系统 API")],
      "cat:API 文档"
    ),
    cat(
      "运维指南",
      [doc("installation/cli", "命令行工具", "doc:运维指南/命令行工具")],
      "cat:运维指南"
    ),
    cat(
      "常见问题",
      [doc("faq/system_management", "系统管理", "doc:常见问题/系统管理")],
      "cat:常见问题"
    ),
    cat(
      "最佳实践",
      [doc("faq/security", "安全建议", "doc:最佳实践/安全建议")],
      "cat:最佳实践"
    ),
    doc("contact", "联系我们", "doc:联系我们"),
  ],
};

export default sidebars;
