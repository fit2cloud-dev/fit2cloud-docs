// @ts-check
// 侧边栏(中文label, 顺序与 mkdocs.yml nav 一致)
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  "1panel": [
    {
      "type": "doc",
      "id": "index",
      "label": "产品介绍"
    },
    {
      "type": "category",
      "label": "安装部署",
      "collapsed": false,
      "items": [
        {
          "type": "doc",
          "id": "installation/enterprise-installation",
          "label": "离线安装"
        },
        {
          "type": "doc",
          "id": "installation/online-installation",
          "label": "在线安装"
        },
        {
          "type": "doc",
          "id": "installation/migrate-to-enterprise",
          "label": "迁移至企业版"
        },
        {
          "type": "category",
          "label": "从 V1 版本升级",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "installation/v1-migrate",
              "label": "升级说明"
            },
            {
              "type": "doc",
              "id": "installation/v1-migrate-steps",
              "label": "操作步骤"
            }
          ]
        },
        {
          "type": "doc",
          "id": "installation/master-migrate",
          "label": "主从节点切换"
        },
        {
          "type": "doc",
          "id": "installation/cli",
          "label": "1pctl 命令行工具"
        }
      ],
      "key": "cat:安装部署"
    },
    {
      "type": "category",
      "label": "功能手册",
      "collapsed": false,
      "items": [
        {
          "type": "doc",
          "id": "user-manual/dashboard",
          "label": "首页",
          "key": "doc:user-manual/dashboard @ 功能手册"
        },
        {
          "type": "category",
          "label": "应用商店",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "user-manual/appstore/appstore",
              "label": "概述",
              "key": "doc:user-manual/appstore/appstore @ 功能手册 / 应用商店"
            },
            {
              "type": "doc",
              "id": "user-manual/appstore/install",
              "label": "安装部署",
              "key": "doc:user-manual/appstore/install @ 功能手册 / 应用商店"
            },
            {
              "type": "doc",
              "id": "user-manual/appstore/installed",
              "label": "应用操作"
            },
            {
              "type": "doc",
              "id": "user-manual/appstore/setting",
              "label": "应用商店设置"
            }
          ]
        },
        {
          "type": "category",
          "label": "AI",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "user-manual/ai/agent",
              "label": "智能体"
            },
            {
              "type": "doc",
              "id": "user-manual/ai/model",
              "label": "模型管理"
            },
            {
              "type": "doc",
              "id": "user-manual/ai/vllm",
              "label": "vLLM"
            },
            {
              "type": "doc",
              "id": "user-manual/ai/gateway",
              "label": "AI 网关"
            },
            {
              "type": "doc",
              "id": "user-manual/ai/benchmark",
              "label": "基准测试"
            },
            {
              "type": "doc",
              "id": "user-manual/ai/skills-hub",
              "label": "Skills Hub"
            },
            {
              "type": "doc",
              "id": "user-manual/ai/mcp",
              "label": "MCP"
            },
            {
              "type": "doc",
              "id": "user-manual/ai/gpu",
              "label": "GPU 监控"
            }
          ]
        },
        {
          "type": "category",
          "label": "网站",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "user-manual/websites/websites",
              "label": "概述",
              "key": "doc:user-manual/websites/websites @ 功能手册 / 网站"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/website-create",
              "label": "创建网站"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/website-config-basic",
              "label": "网站配置"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/website-config-other",
              "label": "网站操作"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/website-group",
              "label": "网站分组"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/website-backup",
              "label": "网站备份"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/openresty",
              "label": "OpenResty 设置"
            }
          ]
        },
        {
          "type": "category",
          "label": "证书",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "user-manual/websites/certificate",
              "label": "证书概述"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/certificate-create",
              "label": "申请证书"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/certificate-upload",
              "label": "上传证书"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/certificate-self-sign",
              "label": "自签证书"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/certificate-renew",
              "label": "续签证书"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/certificate-acme",
              "label": "ACME 账户"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/certificate-dns",
              "label": "DNS 账户"
            }
          ]
        },
        {
          "type": "category",
          "label": "运行环境",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "user-manual/websites/php",
              "label": "PHP"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/node",
              "label": "Node.js"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/java",
              "label": "Java"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/golang",
              "label": "Go"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/python",
              "label": "Python"
            },
            {
              "type": "doc",
              "id": "user-manual/websites/dotnet",
              "label": ".NET"
            }
          ]
        },
        {
          "type": "category",
          "label": "数据库",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "user-manual/databases/mysql",
              "label": "MySQL",
              "key": "doc:user-manual/databases/mysql @ 功能手册 / 数据库"
            },
            {
              "type": "doc",
              "id": "user-manual/databases/postgresql",
              "label": "PostgreSQL"
            },
            {
              "type": "doc",
              "id": "user-manual/databases/redis",
              "label": "Redis",
              "key": "doc:user-manual/databases/redis @ 功能手册 / 数据库"
            },
            {
              "type": "doc",
              "id": "user-manual/databases/mongodb",
              "label": "MongoDB",
              "key": "doc:user-manual/databases/mongodb @ 功能手册 / 数据库"
            }
          ]
        },
        {
          "type": "category",
          "label": "容器",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "user-manual/containers/overview",
              "label": "概览"
            },
            {
              "type": "doc",
              "id": "user-manual/containers/container",
              "label": "容器",
              "key": "doc:user-manual/containers/container @ 功能手册 / 容器"
            },
            {
              "type": "doc",
              "id": "user-manual/containers/compose",
              "label": "编排"
            },
            {
              "type": "doc",
              "id": "user-manual/containers/image",
              "label": "镜像"
            },
            {
              "type": "doc",
              "id": "user-manual/containers/network",
              "label": "网络"
            },
            {
              "type": "doc",
              "id": "user-manual/containers/volume",
              "label": "存储卷"
            },
            {
              "type": "doc",
              "id": "user-manual/containers/repo",
              "label": "仓库"
            },
            {
              "type": "doc",
              "id": "user-manual/containers/compose-template",
              "label": "编排模板"
            },
            {
              "type": "doc",
              "id": "user-manual/containers/setting",
              "label": "配置"
            }
          ],
          "key": "cat:功能手册 / 容器"
        },
        {
          "type": "category",
          "label": "系统",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "user-manual/hosts/file",
              "label": "文件"
            },
            {
              "type": "doc",
              "id": "user-manual/hosts/monitor",
              "label": "监控"
            },
            {
              "type": "doc",
              "id": "user-manual/hosts/firewall",
              "label": "防火墙"
            },
            {
              "type": "doc",
              "id": "user-manual/hosts/disk",
              "label": "磁盘管理"
            },
            {
              "type": "doc",
              "id": "user-manual/hosts/process",
              "label": "进程管理"
            },
            {
              "type": "doc",
              "id": "user-manual/hosts/ssh",
              "label": "SSH 管理"
            }
          ]
        },
        {
          "type": "doc",
          "id": "user-manual/terminal",
          "label": "终端"
        },
        {
          "type": "doc",
          "id": "user-manual/cronjobs",
          "label": "计划任务"
        },
        {
          "type": "category",
          "label": "工具箱",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "user-manual/toolbox/quick-settings",
              "label": "快速设置"
            },
            {
              "type": "doc",
              "id": "user-manual/toolbox/clean",
              "label": "缓存清理"
            },
            {
              "type": "doc",
              "id": "user-manual/toolbox/supervisor",
              "label": "进程守护"
            },
            {
              "type": "doc",
              "id": "user-manual/toolbox/clam",
              "label": "病毒扫描"
            },
            {
              "type": "doc",
              "id": "user-manual/toolbox/ftp",
              "label": "FTP"
            },
            {
              "type": "doc",
              "id": "user-manual/toolbox/fail2ban",
              "label": "Fail2ban"
            }
          ]
        },
        {
          "type": "category",
          "label": "高级功能",
          "collapsed": false,
          "items": [
            {
              "type": "doc",
              "id": "user-manual/xpack/mobile-app",
              "label": "移动端"
            },
            {
              "type": "category",
              "label": "WAF",
              "collapsed": false,
              "items": [
                {
                  "type": "doc",
                  "id": "user-manual/xpack/waf/waf",
                  "label": "概述",
                  "key": "doc:user-manual/xpack/waf/waf @ 功能手册 / 高级功能 / WAF"
                },
                {
                  "type": "doc",
                  "id": "user-manual/xpack/waf/dashboard",
                  "label": "首页",
                  "key": "doc:user-manual/xpack/waf/dashboard @ 功能手册 / 高级功能 / WAF"
                },
                {
                  "type": "doc",
                  "id": "user-manual/xpack/waf/stat",
                  "label": "攻击报表"
                },
                {
                  "type": "doc",
                  "id": "user-manual/xpack/waf/log",
                  "label": "拦截记录"
                },
                {
                  "type": "doc",
                  "id": "user-manual/xpack/waf/block",
                  "label": "封锁记录"
                },
                {
                  "type": "doc",
                  "id": "user-manual/xpack/waf/blackwhite",
                  "label": "黑白名单"
                },
                {
                  "type": "doc",
                  "id": "user-manual/xpack/waf/site",
                  "label": "网站设置"
                },
                {
                  "type": "doc",
                  "id": "user-manual/xpack/waf/global",
                  "label": "全局设置"
                }
              ]
            },
            {
              "type": "doc",
              "id": "user-manual/xpack/node",
              "label": "节点管理"
            },
            {
              "type": "doc",
              "id": "user-manual/xpack/website-monitor",
              "label": "网站监控"
            },
            {
              "type": "doc",
              "id": "user-manual/xpack/database-cluster",
              "label": "数据库集群"
            },
            {
              "type": "doc",
              "id": "user-manual/xpack/tamper",
              "label": "网站防篡改"
            },
            {
              "type": "doc",
              "id": "user-manual/xpack/resource-sync",
              "label": "资源同步"
            },
            {
              "type": "doc",
              "id": "user-manual/xpack/appearance",
              "label": "界面设置"
            },
            {
              "type": "doc",
              "id": "user-manual/enterprise/user-management",
              "label": "用户管理"
            },
            {
              "type": "doc",
              "id": "user-manual/enterprise/vm",
              "label": "虚拟机"
            },
            {
              "type": "doc",
              "id": "user-manual/enterprise/ops-report",
              "label": "安全运维报表"
            }
          ]
        },
        {
          "type": "doc",
          "id": "user-manual/logs",
          "label": "日志审计"
        },
        {
          "type": "doc",
          "id": "user-manual/settings",
          "label": "面板设置"
        }
      ]
    },
    {
      "type": "category",
      "label": "常用软件",
      "collapsed": false,
      "items": [
        {
          "type": "doc",
          "id": "user-manual/appstore/openclaw",
          "label": "OpenClaw"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/hermes-agent",
          "label": "Hermes Agent"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/deepseek-harness",
          "label": "DeepSeek Harness"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/openresty",
          "label": "OpenResty"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/mysql",
          "label": "MySQL",
          "key": "doc:user-manual/appstore/mysql @ 常用软件"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/redis",
          "label": "Redis",
          "key": "doc:user-manual/appstore/redis @ 常用软件"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/ollama",
          "label": "Ollama"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/halo",
          "label": "Halo"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/openlist",
          "label": "OpenList"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/maxkb",
          "label": "MaxKB"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/phpmyadmin",
          "label": "phpMyAdmin"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/wordpress",
          "label": "WordPress"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/zabbix",
          "label": "Zabbix"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/alist",
          "label": "AList"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/frp",
          "label": "frp"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/qinglong",
          "label": "青龙"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/nginx-proxy-manager",
          "label": "Nginx Proxy Manager"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/ddns-go",
          "label": "ddns-go"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/gitea",
          "label": "Gitea"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/dataease",
          "label": "DataEase"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/openwebui",
          "label": "Open WebUI"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/mariadb",
          "label": "MariaDB"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/rustdesk",
          "label": "RustDesk"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/minio",
          "label": "MinIO"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/bitwarden",
          "label": "Bitwarden"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/home-assistant",
          "label": "Home Assistant"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/mongodb",
          "label": "MongoDB",
          "key": "doc:user-manual/appstore/mongodb @ 常用软件"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/nextcloud",
          "label": "Nextcloud"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/lobechat",
          "label": "LobeChat"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/jumpserver",
          "label": "Jumpserver"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/stirling-pdf",
          "label": "Stirling-PDF"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/chatgpt-next-web",
          "label": "ChatGPT-Next-Web"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/cloudreve",
          "label": "Cloudreve"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/uptime-kuma",
          "label": "Uptime Kuma"
        },
        {
          "type": "doc",
          "id": "user-manual/appstore/vscode",
          "label": "VS Code"
        }
      ]
    },
    {
      "type": "category",
      "label": "Skills 技能",
      "collapsed": false,
      "items": [
        {
          "type": "doc",
          "id": "dev-manual/skills",
          "label": "1Panel 运维技能"
        },
        {
          "type": "doc",
          "id": "dev-manual/appstore-skills",
          "label": "1Panel 应用商店技能"
        }
      ]
    },
    {
      "type": "doc",
      "id": "dev-manual/api-manual",
      "label": "API 接口"
    },
    {
      "type": "category",
      "label": "常见问题",
      "collapsed": false,
      "items": [
        {
          "type": "doc",
          "id": "faq/faq",
          "label": "产品 FAQ"
        },
        {
          "type": "doc",
          "id": "faq/operating-system",
          "label": "操作系统相关"
        },
        {
          "type": "doc",
          "id": "faq/system-function",
          "label": "系统功能相关"
        },
        {
          "type": "doc",
          "id": "faq/server-architecture",
          "label": "服务器架构相关"
        },
        {
          "type": "doc",
          "id": "faq/openclaw",
          "label": "OpenClaw 相关"
        },
        {
          "type": "doc",
          "id": "faq/ai-coding",
          "label": "AI 编程接入指南"
        }
      ]
    },
    {
      "type": "category",
      "label": "版本迭代",
      "collapsed": false,
      "items": [
        {
          "type": "doc",
          "id": "changelog",
          "label": "社区版/专业版"
        },
        {
          "type": "doc",
          "id": "enterprise-changelog",
          "label": "企业版"
        }
      ]
    },
    {
      "type": "category",
      "label": "1Panel 商业版本",
      "collapsed": false,
      "items": [
        {
          "type": "link",
          "label": "版本功能对比",
          "href": "https://1panel.cn/versions.html"
        },
        {
          "type": "link",
          "label": "1Panel 专业版",
          "href": "https://www.lxware.cn/1panel"
        },
        {
          "type": "link",
          "label": "1Panel 企业版",
          "href": "https://1panel.cn/enterprise.html"
        }
      ]
    },
    {
      "type": "category",
      "label": "1Panel AI 一体机",
      "collapsed": false,
      "items": [
        {
          "type": "link",
          "label": "1Panel AI 通用一体机",
          "href": "https://1panel.cn/deepseek-appliance.html"
        },
        {
          "type": "link",
          "label": "1Panel AI 编程一体机",
          "href": "https://1panel.cn/aicoding_gb10.html"
        },
        {
          "type": "link",
          "label": "1Panel AI 助理一体机",
          "href": "https://1panel.cn/openclaw.html"
        }
      ]
    },
    {
      "type": "doc",
      "id": "contact",
      "label": "联系我们"
    }
  ]
};
export default sidebars;
