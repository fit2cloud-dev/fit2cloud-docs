// @ts-check
// JumpServer 侧边栏(中文 label, 顺序与 mkdocs.yml nav 一致)
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  "jumpserver": [
    {
      "type": "doc",
      "id": "index",
      "label": "产品介绍",
      "key": "doc:产品介绍"
    },
    {
      "type": "link",
      "label": "版本对比",
      "href": "https://jumpserver.org/features.html",
      "key": "link:版本对比"
    },
    {
      "type": "doc",
      "id": "quick_start",
      "label": "快速入门",
      "key": "doc:快速入门"
    },
    {
      "type": "doc",
      "id": "change_log",
      "label": "更新日志",
      "key": "doc:更新日志"
    },
    {
      "type": "link",
      "label": "购买指南",
      "href": "https://jumpserver.org/enterprise.html",
      "key": "doc:购买指南"
    },
    {
      "type": "category",
      "label": "安装部署",
      "collapsed": true,
      "items": [
        {
          "type": "category",
          "label": "Linux 单机部署",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "installation/setup_linux_standalone/requirements",
              "label": "环境要求",
              "key": "doc:安装部署/Linux 单机部署/环境要求"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_standalone/offline_install",
              "label": "安装指南",
              "key": "doc:安装部署/Linux 单机部署/安装指南"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_standalone/offline_upgrade",
              "label": "升级指南",
              "key": "doc:安装部署/Linux 单机部署/升级指南"
            }
          ],
          "key": "cat:安装部署/Linux 单机部署"
        },
        {
          "type": "category",
          "label": "Linux 集群模式部署",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "installation/setup_linux_lb/requirements",
              "label": "准备工作",
              "key": "doc:安装部署/Linux 集群模式部署/准备工作"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_lb/nfs_install",
              "label": "部署 NFS 服务",
              "key": "doc:安装部署/Linux 集群模式部署/部署 NFS 服务"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_lb/pgsql_install",
              "label": "部署 PostgreSQL 服务",
              "key": "doc:安装部署/Linux 集群模式部署/部署 PostgreSQL 服务"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_lb/redis_install",
              "label": "部署 Redis 服务",
              "key": "doc:安装部署/Linux 集群模式部署/部署 Redis 服务"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_lb/installation_node01",
              "label": "部署 JumpServer 01 节点",
              "key": "doc:安装部署/Linux 集群模式部署/部署 JumpServer 01 节点"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_lb/installation_node02",
              "label": "部署 JumpServer 02 节点",
              "key": "doc:安装部署/Linux 集群模式部署/部署 JumpServer 02 节点"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_lb/haproxy_install",
              "label": "部署 HAProxy 服务",
              "key": "doc:安装部署/Linux 集群模式部署/部署 HAProxy 服务"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_lb/minio_install",
              "label": "部署 MinIO 服务",
              "key": "doc:安装部署/Linux 集群模式部署/部署 MinIO 服务"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_lb/elasticsearch_install",
              "label": "部署 Elasticsearch 服务",
              "key": "doc:安装部署/Linux 集群模式部署/部署 Elasticsearch 服务"
            },
            {
              "type": "doc",
              "id": "installation/setup_linux_lb/linux_lb_upgrade",
              "label": "注意事项",
              "key": "doc:安装部署/Linux 集群模式部署/注意事项"
            }
          ],
          "key": "cat:安装部署/Linux 集群模式部署"
        },
        {
          "type": "category",
          "label": "1Panel 模式部署",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "installation/1panel_setup/setup_js",
              "label": "安装指南",
              "key": "doc:安装部署/1Panel 模式部署/安装指南"
            },
            {
              "type": "doc",
              "id": "installation/1panel_setup/config_js",
              "label": "运维指南",
              "key": "doc:安装部署/1Panel 模式部署/运维指南"
            }
          ],
          "key": "cat:安装部署/1Panel 模式部署"
        },
        {
          "type": "category",
          "label": "Kubernetes Helm 模式部署",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "installation/setup_kubernetes/helm_online_install",
              "label": "安装指南",
              "key": "doc:安装部署/Kubernetes Helm 模式部署/安装指南"
            },
            {
              "type": "doc",
              "id": "installation/setup_kubernetes/helm_online_upgrade",
              "label": "升级指南",
              "key": "doc:安装部署/Kubernetes Helm 模式部署/升级指南"
            }
          ],
          "key": "cat:安装部署/Kubernetes Helm 模式部署"
        },
        {
          "type": "doc",
          "id": "installation/network_port",
          "label": "网络端口说明",
          "key": "doc:安装部署/网络端口说明"
        },
        {
          "type": "doc",
          "id": "installation/backup_recovery",
          "label": "数据备份以及恢复指南",
          "key": "doc:安装部署/数据备份以及恢复指南"
        },
        {
          "type": "doc",
          "id": "manual/env",
          "label": "参数说明",
          "key": "doc:安装部署/参数说明"
        }
      ],
      "key": "cat:安装部署"
    },
    {
      "type": "category",
      "label": "使用手册",
      "collapsed": true,
      "items": [
        {
          "type": "category",
          "label": "通用功能",
          "collapsed": true,
          "link": {
            "type": "doc",
            "id": "manual/common/index"
          },
          "items":[],
          "key": "cat:使用手册/通用功能"
        },
        {
          "type": "category",
          "label": "管理员手册",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "manual/admin/profile",
              "label": "个人设置",
              "key": "doc:使用手册/管理员手册/个人设置"
            },
            {
              "type": "category",
              "label": "控制台",
              "collapsed": true,
              "items": [
                {
                  "type": "category",
                  "label": "用户管理",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/console/users/users",
                      "label": "用户列表",
                      "key": "doc:使用手册/管理员手册/控制台/用户管理/用户列表"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/console/users/user-groups",
                      "label": "用户组",
                      "key": "doc:使用手册/管理员手册/控制台/用户管理/用户组"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/控制台/用户管理"
                },
                {
                  "type": "category",
                  "label": "资产管理",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/console/assets/assets_list",
                      "label": "资产列表",
                      "key": "doc:使用手册/管理员手册/控制台/资产管理/资产列表"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/console/assets/net_list",
                      "label": "网域列表",
                      "key": "doc:使用手册/管理员手册/控制台/资产管理/网域列表"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/console/assets/web_assets",
                      "label": "Web资产",
                      "key": "doc:使用手册/管理员手册/控制台/资产管理/Web资产"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/控制台/资产管理"
                },
                {
                  "type": "category",
                  "label": "账号管理",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/console/account_management/account_list",
                      "label": "账号列表",
                      "key": "doc:使用手册/管理员手册/控制台/账号管理/账号列表"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/console/account_management/account_template",
                      "label": "账号模板",
                      "key": "doc:使用手册/管理员手册/控制台/账号管理/账号模板"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/控制台/账号管理"
                },
                {
                  "type": "category",
                  "label": "授权管理",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/console/authorization_manage/assets_authorization",
                      "label": "资产授权",
                      "key": "doc:使用手册/管理员手册/控制台/授权管理/资产授权"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/console/access_control/acls",
                      "label": "访问控制",
                      "key": "doc:使用手册/管理员手册/控制台/授权管理/访问控制"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/console/authorization_manage/session_sharing",
                      "label": "会话分享",
                      "key": "doc:使用手册/管理员手册/控制台/授权管理/会话分享"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/控制台/授权管理"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/console/else/tag_list",
                  "label": "标签列表",
                  "key": "doc:使用手册/管理员手册/控制台/标签列表"
                }
              ],
              "key": "cat:使用手册/管理员手册/控制台"
            },
            {
              "type": "category",
              "label": "PAM",
              "collapsed": true,
              "items": [
                {
                  "type": "category",
                  "label": "自动化",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/pam/automation/account_discovery",
                      "label": "账号发现",
                      "key": "doc:使用手册/管理员手册/PAM/自动化/账号发现"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/pam/automation/account_push",
                      "label": "账号推送",
                      "key": "doc:使用手册/管理员手册/PAM/自动化/账号推送"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/pam/automation/account_backup",
                      "label": "账号备份",
                      "key": "doc:使用手册/管理员手册/PAM/自动化/账号备份"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/PAM/自动化"
                },
                {
                  "type": "category",
                  "label": "安全设置",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/pam/security/change_secrets",
                      "label": "账号改密",
                      "key": "doc:使用手册/管理员手册/PAM/安全设置/账号改密"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/pam/security/risk_detection",
                      "label": "风险检测",
                      "key": "doc:使用手册/管理员手册/PAM/安全设置/风险检测"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/PAM/安全设置"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/pam/applications_manage",
                  "label": "应用管理",
                  "key": "doc:使用手册/管理员手册/PAM/应用管理"
                }
              ],
              "key": "cat:使用手册/管理员手册/PAM"
            },
            {
              "type": "category",
              "label": "审计台",
              "collapsed": true,
              "items": [
                {
                  "type": "category",
                  "label": "会话审计",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/session_record",
                      "label": "会话记录",
                      "key": "doc:使用手册/管理员手册/审计台/会话审计/会话记录"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/session_command",
                      "label": "会话命令",
                      "key": "doc:使用手册/管理员手册/审计台/会话审计/会话命令"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/file_transfer",
                      "label": "文件传输",
                      "key": "doc:使用手册/管理员手册/审计台/会话审计/文件传输"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/online_user",
                      "label": "在线用户",
                      "key": "doc:使用手册/管理员手册/审计台/会话审计/在线用户"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/审计台/会话审计"
                },
                {
                  "type": "category",
                  "label": "日志审计",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/log_audit/login_logs",
                      "label": "登录日志",
                      "key": "doc:使用手册/管理员手册/审计台/日志审计/登录日志"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/log_audit/password_change_logs",
                      "label": "改密日志",
                      "key": "doc:使用手册/管理员手册/审计台/日志审计/改密日志"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/log_audit/operation_logs",
                      "label": "操作日志",
                      "key": "doc:使用手册/管理员手册/审计台/日志审计/操作日志"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/审计台/日志审计"
                },
                {
                  "type": "category",
                  "label": "作业审计",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/job_audit/job_list",
                      "label": "作业列表",
                      "key": "doc:使用手册/管理员手册/审计台/作业审计/作业列表"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/job_audit/job_logs",
                      "label": "作业日志",
                      "key": "doc:使用手册/管理员手册/审计台/作业审计/作业日志"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/审计台/作业审计"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/audit/session_audit/ticket_audit",
                  "label": "工单审计",
                  "key": "doc:使用手册/管理员手册/审计台/工单审计"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/audit/session_audit/reports",
                  "label": "报表",
                  "key": "doc:使用手册/管理员手册/审计台/报表"
                }
              ],
              "key": "cat:使用手册/管理员手册/审计台"
            },
            {
              "type": "category",
              "label": "工作台",
              "collapsed": true,
              "items": [
                {
                  "type": "category",
                  "label": "我的资产",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/my_assets/assets_connect",
                      "label": "连接资产",
                      "key": "doc:使用手册/管理员手册/工作台/我的资产/连接资产"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/my_assets/web_terminal",
                      "label": "Web终端",
                      "key": "doc:使用手册/管理员手册/工作台/我的资产/Web终端"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/my_assets/file_transfer",
                      "label": "文件传输",
                      "key": "doc:使用手册/管理员手册/工作台/我的资产/文件传输"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/my_assets/file_explorer",
                      "label": "文件管理",
                      "key": "doc:使用手册/管理员手册/工作台/我的资产/文件管理"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/工作台/我的资产"
                },
                {
                  "type": "category",
                  "label": "作业中心",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/job_center/adhoc",
                      "label": "快捷命令",
                      "key": "doc:使用手册/管理员手册/工作台/作业中心/快捷命令"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/job_center/jobs_management",
                      "label": "作业管理",
                      "key": "doc:使用手册/管理员手册/工作台/作业中心/作业管理"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/job_center/templates_management",
                      "label": "模板管理",
                      "key": "doc:使用手册/管理员手册/工作台/作业中心/模板管理"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/job_center/execute_history",
                      "label": "执行历史",
                      "key": "doc:使用手册/管理员手册/工作台/作业中心/执行历史"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/工作台/作业中心"
                },
                {
                  "type": "category",
                  "label": "其他",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/other/system_tool",
                      "label": "系统工具",
                      "key": "doc:使用手册/管理员手册/工作台/其他/系统工具"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/工作台/其他"
                }
              ],
              "key": "cat:使用手册/管理员手册/工作台"
            },
            {
              "type": "category",
              "label": "系统设置",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/overview",
                  "label": "概览",
                  "key": "doc:使用手册/管理员手册/系统设置/概览"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/basic_settings",
                  "label": "基本设置",
                  "key": "doc:使用手册/管理员手册/系统设置/基本设置"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/organization_manage",
                  "label": "组织管理",
                  "key": "doc:使用手册/管理员手册/系统设置/组织管理"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/role_list",
                  "label": "角色列表",
                  "key": "doc:使用手册/管理员手册/系统设置/角色列表"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/platforms",
                  "label": "平台列表",
                  "key": "doc:使用手册/管理员手册/系统设置/平台列表"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/notification_settings",
                  "label": "通知设置",
                  "key": "doc:使用手册/管理员手册/系统设置/通知设置"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/feature_settings",
                  "label": "功能设置",
                  "key": "doc:使用手册/管理员手册/系统设置/功能设置"
                },
                {
                  "type": "category",
                  "label": "认证设置",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/basic_settings",
                      "label": "基本设置",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/基本设置"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/LDAP",
                      "label": "LDAP",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/LDAP"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/Passkey",
                      "label": "Passkey",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/Passkey"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/CAS",
                      "label": "CAS",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/CAS"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/LDAPHA",
                      "label": "LDAP HA (X-Pack)",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/LDAP HA (X-Pack)"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/OIDC",
                      "label": "OIDC (X-Pack)",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/OIDC (X-Pack)"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/OAuth2",
                      "label": "OAuth2 (X-Pack)",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/OAuth2 (X-Pack)"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/SAML2",
                      "label": "SAML2 (X-Pack)",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/SAML2 (X-Pack)"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/WeCom",
                      "label": "企业微信 (X-Pack)",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/企业微信 (X-Pack)"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/DingTalk",
                      "label": "钉钉 (X-Pack)",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/钉钉 (X-Pack)"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/Feishu",
                      "label": "飞书 (X-Pack)",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/飞书 (X-Pack)"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/Lark",
                      "label": "Lark (X-Pack)",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/Lark (X-Pack)"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/Slack",
                      "label": "Slack (X-Pack)",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/Slack (X-Pack)"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/system_settings/authentication_settings/Radius",
                      "label": "Radius (X-Pack)",
                      "key": "doc:使用手册/管理员手册/系统设置/认证设置/Radius (X-Pack)"
                    }
                  ],
                  "key": "cat:使用手册/管理员手册/系统设置/认证设置"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/storage",
                  "label": "存储设置",
                  "key": "doc:使用手册/管理员手册/系统设置/存储设置"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/components",
                  "label": "组件设置",
                  "key": "doc:使用手册/管理员手册/系统设置/组件设置"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/remote_apps",
                  "label": "远程应用",
                  "key": "doc:使用手册/管理员手册/系统设置/远程应用"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/virtual_apps",
                  "label": "虚拟应用",
                  "key": "doc:使用手册/管理员手册/系统设置/虚拟应用"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/security",
                  "label": "安全设置",
                  "key": "doc:使用手册/管理员手册/系统设置/安全设置"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/appearance",
                  "label": "界面设置",
                  "key": "doc:使用手册/管理员手册/系统设置/界面设置"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/tools",
                  "label": "系统工具",
                  "key": "doc:使用手册/管理员手册/系统设置/系统工具"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/system_tasks",
                  "label": "系统任务",
                  "key": "doc:使用手册/管理员手册/系统设置/系统任务"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/system_settings/licenses",
                  "label": "许可证",
                  "key": "doc:使用手册/管理员手册/系统设置/许可证"
                }
              ],
              "key": "cat:使用手册/管理员手册/系统设置"
            },
            {
              "type": "category",
              "label": "其他设置",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "manual/admin/others/MFA_Facelive",
                  "label": "人脸识别 (X-Pack)",
                  "key": "doc:使用手册/管理员手册/其他设置/人脸识别 (X-Pack)"
                }
              ],
              "key": "cat:使用手册/管理员手册/其他设置"
            }
          ],
          "key": "cat:使用手册/管理员手册"
        },
        {
          "type": "category",
          "label": "审计员手册",
          "collapsed": true,
          "items": [
            {
              "type": "category",
              "label": "审计台",
              "collapsed": true,
              "items": [
                {
                  "type": "category",
                  "label": "会话审计",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/session_record",
                      "label": "会话记录",
                      "key": "doc:使用手册/审计员手册/审计台/会话审计/会话记录"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/session_command",
                      "label": "会话命令",
                      "key": "doc:使用手册/审计员手册/审计台/会话审计/会话命令"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/file_transfer",
                      "label": "文件传输",
                      "key": "doc:使用手册/审计员手册/审计台/会话审计/文件传输"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/online_user",
                      "label": "在线用户",
                      "key": "doc:使用手册/审计员手册/审计台/会话审计/在线用户"
                    }
                  ],
                  "key": "cat:使用手册/审计员手册/审计台/会话审计"
                },
                {
                  "type": "category",
                  "label": "日志审计",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/log_audit/login_logs",
                      "label": "登录日志",
                      "key": "doc:使用手册/审计员手册/审计台/日志审计/登录日志"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/log_audit/password_change_logs",
                      "label": "改密日志",
                      "key": "doc:使用手册/审计员手册/审计台/日志审计/改密日志"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/log_audit/operation_logs",
                      "label": "操作日志",
                      "key": "doc:使用手册/审计员手册/审计台/日志审计/操作日志"
                    }
                  ],
                  "key": "cat:使用手册/审计员手册/审计台/日志审计"
                },
                {
                  "type": "category",
                  "label": "作业审计",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/job_audit/job_list",
                      "label": "作业列表",
                      "key": "doc:使用手册/审计员手册/审计台/作业审计/作业列表"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/audit/session_audit/job_audit/job_logs",
                      "label": "作业日志",
                      "key": "doc:使用手册/审计员手册/审计台/作业审计/作业日志"
                    }
                  ],
                  "key": "cat:使用手册/审计员手册/审计台/作业审计"
                },
                {
                  "type": "doc",
                  "id": "manual/admin/audit/session_audit/ticket_audit",
                  "label": "工单审计",
                  "key": "doc:使用手册/审计员手册/审计台/工单审计"
                }
              ],
              "key": "cat:使用手册/审计员手册/审计台"
            },
            {
              "type": "doc",
              "id": "manual/admin/audit/session_audit/reports",
              "label": "报表",
              "key": "doc:使用手册/审计员手册/报表"
            }
          ],
          "key": "cat:使用手册/审计员手册"
        },
        {
          "type": "category",
          "label": "普通使用手册",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "manual/user/profile",
              "label": "个人设置",
              "key": "doc:使用手册/普通使用手册/个人设置"
            },
            {
              "type": "category",
              "label": "工作台",
              "collapsed": true,
              "items": [
                {
                  "type": "category",
                  "label": "我的资产",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/my_assets/assets_connect",
                      "label": "连接资产",
                      "key": "doc:使用手册/普通使用手册/工作台/我的资产/连接资产"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/my_assets/web_terminal",
                      "label": "Web终端",
                      "key": "doc:使用手册/普通使用手册/工作台/我的资产/Web终端"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/my_assets/file_transfer",
                      "label": "文件传输",
                      "key": "doc:使用手册/普通使用手册/工作台/我的资产/文件传输"
                    },
                    {
                      "type": "doc",
                      "id": "manual/admin/workbench/my_assets/file_explorer",
                      "label": "文件管理",
                      "key": "doc:使用手册/普通使用手册/工作台/我的资产/文件管理"
                    }
                  ],
                  "key": "cat:使用手册/普通使用手册/工作台/我的资产"
                }
              ],
              "key": "cat:使用手册/普通使用手册/工作台"
            },
            {
              "type": "doc",
              "id": "manual/user/ticket",
              "label": "工单",
              "key": "doc:使用手册/普通使用手册/工单"
            },
            {
              "type": "category",
              "label": "客户端使用",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "manual/client/client_installation",
                  "label": "客户端下载与安装",
                  "key": "doc:使用手册/普通使用手册/客户端使用/客户端下载与安装"
                },
                {
                  "type": "doc",
                  "id": "manual/client/asset_connection",
                  "label": "资产连接",
                  "key": "doc:使用手册/普通使用手册/客户端使用/资产连接"
                },
                {
                  "type": "doc",
                  "id": "manual/client/connection_settings",
                  "label": "连接设置",
                  "key": "doc:使用手册/普通使用手册/客户端使用/连接设置"
                },
                {
                  "type": "doc",
                  "id": "manual/client/tool",
                  "label": "工具",
                  "key": "doc:使用手册/普通使用手册/客户端使用/工具"
                }
              ],
              "key": "cat:使用手册/普通使用手册/客户端使用"
            }
          ],
          "key": "cat:使用手册/普通使用手册"
        },
        {
          "type": "category",
          "label": "PAM 管理",
          "collapsed": true,
          "link": {
            "type": "doc",
            "id": "manual/pam/index"
          },
          "items": [],
          "key": "doc:使用手册/PAM 管理"
        },
        {
          "type": "category",
          "label": "第三方集成",
          "collapsed": true,
          "link": {
            "type": "doc",
            "id": "manual/third_party/index"
          },
          "items": [],
          "key": "doc:使用手册/第三方集成"
        }
      ],
      "key": "cat:使用手册"
    },
    {
      "type": "category",
      "label": "常见问题",
      "collapsed": true,
      "items": [
        {
          "type": "doc",
          "id": "faq/faq",
          "label": "产品 FAQ",
          "key": "doc:常见问题/产品 FAQ"
        },
        {
          "type": "doc",
          "id": "faq/security",
          "label": "安全建议",
          "key": "doc:常见问题/安全建议"
        },
        {
          "type": "link",
          "label": "企业版",
          "href": "https://www.jumpserver.org/enterprise.html",
          "key": "link:常见问题/企业版"
        }
      ],
      "key": "cat:常见问题"
    },
    {
      "type": "doc",
      "id": "user_stories",
      "label": "企业版功能",
      "key": "doc:企业版功能"
    },
    {
      "type": "category",
      "label": "开发文档",
      "collapsed": true,
      "items": [
        {
          "type": "doc",
          "id": "dev/rest_api",
          "label": "API 文档",
          "key": "doc:开发文档/API 文档"
        },
        {
          "type": "doc",
          "id": "dev/shell",
          "label": "交互命令",
          "key": "doc:开发文档/交互命令"
        }
      ],
      "key": "cat:开发文档"
    },
    {
      "type": "doc",
      "id": "user_stories",
      "label": "运维指南",
      "key": "doc:运维指南"
    },
    {
      "type": "doc",
      "id": "user_stories",
      "label": "最佳实践",
      "key": "doc:最佳实践"
    },
    {
      "type": "doc",
      "id": "user_stories",
      "label": "安全建议",
      "key": "doc:安全建议"
    },
    {
      "type": "doc",
      "id": "contact",
      "label": "联系我们",
      "key": "doc:联系我们"
    }
  ]
};

export default sidebars;
