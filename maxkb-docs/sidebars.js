// @ts-check
// MaxKB 侧边栏(中文 label, 顺序与 mkdocs.yml nav 一致)
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  "maxkb": [
    {
      "type": "doc",
      "id": "index",
      "label": "产品介绍",
      "key": "doc:产品介绍"
    },
    {
      "type": "doc",
      "id": "quick_start",
      "label": "快速入门",
      "key": "doc:快速入门"
    },
    {
      "type": "doc",
      "id": "changelog",
      "label": "更新日志",
      "key": "doc:更新日志"
    },
    {
      "type": "link",
      "label": "购买指南",
      "href": "https://maxkb.cn/price",
      "key": "link:购买指南"
    },
    {
      "type": "doc",
      "id": "system_arch",
      "label": "系统架构",
      "key": "doc:系统架构"
    },
    {
      "type": "category",
      "label": "安装部署",
      "collapsed": true,
      "items": [
        {
          "type": "doc",
          "id": "installation/offline_installtion",
          "label": "离线安装",
          "className": "sidebar-item-badge-rec",
          "key": "doc:安装部署/离线安装"
        },
        {
          "type": "doc",
          "id": "installation/online_installtion",
          "label": "在线安装",
          "key": "doc:安装部署/在线安装"
        },
        {
          "type": "doc",
          "id": "installation/1panel_installtion",
          "label": "1Panel 安装",
          "key": "doc:安装部署/1Panel 安装"
        },
        {
          "type": "doc",
          "id": "installation/aliyun",
          "label": "阿里云安装",
          "key": "doc:安装部署/阿里云安装"
        },
        {
          "type": "doc",
          "id": "installation/migrate",
          "label": "迁移工具",
          "key": "doc:安装部署/迁移工具"
        },
        {
          "type": "doc",
          "id": "installation/cli",
          "label": "命令行工具",
          "key": "doc:安装部署/命令行工具"
        },
        {
          "type": "doc",
          "id": "installation/backup",
          "label": "备份还原",
          "key": "doc:安装部署/备份还原"
        }
      ],
      "key": "cat:安装部署"
    },
    {
      "type": "category",
      "label": "功能手册",
      "collapsed": true,
      "items": [
        {
          "type": "category",
          "label": "首页",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "user_manual/index/index",
              "label": "概览",
              "key": "doc:功能手册/首页/概览"
            }
          ],
          "key": "cat:功能手册/首页"
        },
        {
          "type": "category",
          "label": "模型",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "user_manual/model/model_summary",
              "label": "模型概述",
              "key": "doc:功能手册/模型/模型概述"
            },
            {
              "type": "category",
              "label": "模型对接",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "user_manual/model/bailian_model",
                  "label": "对接阿里云百炼",
                  "key": "doc:功能手册/模型/模型对接/对接阿里云百炼"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/anthropic_model",
                  "label": "对接Anthropic",
                  "key": "doc:功能手册/模型/模型对接/对接Anthropic"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/amazon_bedrock_model",
                  "label": "对接Amazon Bedrock",
                  "key": "doc:功能手册/模型/模型对接/对接Amazon Bedrock"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/azure_openai_model",
                  "label": "对接Azure OpenAI",
                  "key": "doc:功能手册/模型/模型对接/对接Azure OpenAI"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/deepseek_model",
                  "label": "对接DeepSeek",
                  "key": "doc:功能手册/模型/模型对接/对接DeepSeek"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/gemini_model",
                  "label": "对接Gemini",
                  "key": "doc:功能手册/模型/模型对接/对接Gemini"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/kimi_model",
                  "label": "对接Kimi",
                  "key": "doc:功能手册/模型/模型对接/对接Kimi"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/openai_model",
                  "label": "对接OpenAI",
                  "key": "doc:功能手册/模型/模型对接/对接OpenAI"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/1panel_ai_gateway_model",
                  "label": "对接1Panel AI 网关",
                  "key": "doc:功能手册/模型/模型对接/对接1Panel AI 网关"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/Regolo_model",
                  "label": "对接Regolo",
                  "key": "doc:功能手册/模型/模型对接/对接Regolo"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/siliconflow_model",
                  "label": "对接SILICONFLOW",
                  "key": "doc:功能手册/模型/模型对接/对接SILICONFLOW"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/tencentcloud_model",
                  "label": "对接腾讯云",
                  "key": "doc:功能手册/模型/模型对接/对接腾讯云"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/hunyuan_model",
                  "label": "对接腾讯混元",
                  "key": "doc:功能手册/模型/模型对接/对接腾讯混元"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/doubao_model",
                  "label": "对接火山引擎",
                  "key": "doc:功能手册/模型/模型对接/对接火山引擎"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/qianfan_model",
                  "label": "对接百度千帆",
                  "key": "doc:功能手册/模型/模型对接/对接百度千帆"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/spark_model",
                  "label": "对接讯飞星火",
                  "key": "doc:功能手册/模型/模型对接/对接讯飞星火"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/zhipu_model",
                  "label": "对接智谱AI",
                  "key": "doc:功能手册/模型/模型对接/对接智谱AI"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/local_model",
                  "label": "对接本地大模型",
                  "key": "doc:功能手册/模型/模型对接/对接本地大模型"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/ollama_model",
                  "label": "对接Ollama",
                  "key": "doc:功能手册/模型/模型对接/对接Ollama"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/vllm_model",
                  "label": "对接vLLM",
                  "key": "doc:功能手册/模型/模型对接/对接vLLM"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/X-Infer_model",
                  "label": "对接Xorbits Inference",
                  "key": "doc:功能手册/模型/模型对接/对接Xorbits Inference"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/dockerai_model",
                  "label": "对接Docker AI",
                  "key": "doc:功能手册/模型/模型对接/对接Docker AI"
                },
                {
                  "type": "doc",
                  "id": "user_manual/model/minimax",
                  "label": "对接MiniMax",
                  "key": "doc:功能手册/模型/模型对接/对接MiniMax"
                }
              ],
              "key": "cat:功能手册/模型/模型对接"
            },
            {
              "type": "doc",
              "id": "user_manual/model/model_param",
              "label": "模型操作",
              "key": "doc:功能手册/模型/模型操作"
            }
          ],
          "key": "cat:功能手册/模型"
        },
        {
          "type": "category",
          "label": "工具",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "user_manual/tool/tool",
              "label": "工具",
              "key": "doc:功能手册/工具/工具"
            },
            {
              "type": "doc",
              "id": "user_manual/tool/tool_param",
              "label": "工具操作",
              "key": "doc:功能手册/工具/工具操作"
            }
          ],
          "key": "cat:功能手册/工具"
        },
        {
          "type": "category",
          "label": "知识库",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "user_manual/dataset/dataset",
              "label": "知识库",
              "key": "doc:功能手册/知识库/知识库"
            },
            {
              "type": "doc",
              "id": "user_manual/dataset/doclist",
              "label": "文档",
              "key": "doc:功能手册/知识库/文档"
            },
            {
              "type": "doc",
              "id": "user_manual/dataset/workflow",
              "label": "工作流",
              "key": "doc:功能手册/知识库/工作流"
            },
            {
              "type": "doc",
              "id": "user_manual/dataset/problem",
              "label": "问题",
              "key": "doc:功能手册/知识库/问题"
            },
            {
              "type": "doc",
              "id": "user_manual/dataset/word_tokenize",
              "label": "自定义分词",
              "key": "doc:功能手册/知识库/自定义分词"
            },
            {
              "type": "doc",
              "id": "user_manual/dataset/hit-testing",
              "label": "命中测试",
              "key": "doc:功能手册/知识库/命中测试"
            }
          ],
          "key": "cat:功能手册/知识库"
        },
        {
          "type": "category",
          "label": "智能体",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "user_manual/app/app",
              "label": "智能体概述",
              "key": "doc:功能手册/智能体/智能体概述"
            },
            {
              "type": "category",
              "label": "智能体创建",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "user_manual/app/simple_app",
                  "label": "简易智能体",
                  "key": "doc:功能手册/智能体/智能体创建/简易智能体"
                },
                {
                  "type": "doc",
                  "id": "user_manual/app/workflow_app",
                  "label": "高级智能体",
                  "key": "doc:功能手册/智能体/智能体创建/高级智能体"
                }
              ],
              "key": "cat:功能手册/智能体/智能体创建"
            },
            {
              "type": "doc",
              "id": "user_manual/app/app-view",
              "label": "智能体概览",
              "key": "doc:功能手册/智能体/智能体概览"
            },
            {
              "type": "doc",
              "id": "user_manual/app/log",
              "label": "对话日志",
              "key": "doc:功能手册/智能体/对话日志"
            }
          ],
          "key": "cat:功能手册/智能体"
        },
        {
          "type": "doc",
          "id": "user_manual/trigger/trigger",
          "label": "触发器",
          "key": "doc:功能手册/触发器"
        },
        {
          "type": "doc",
          "id": "user_manual/user_community",
          "label": "用户管理",
          "key": "doc:功能手册/用户管理"
        },
        {
          "type": "doc",
          "id": "user_manual/X-Pack/authorization_resources",
          "label": "资源授权",
          "key": "doc:功能手册/资源授权"
        },
        {
          "type": "doc",
          "id": "user_manual/email",
          "label": "系统设置",
          "key": "doc:功能手册/系统设置"
        },
        {
          "type": "doc",
          "id": "user_manual/Customlanguage",
          "label": "自定义语言包",
          "key": "doc:功能手册/自定义语言包"
        }
      ],
      "key": "cat:功能手册"
    },
    {
      "type": "category",
      "label": "企业版功能",
      "collapsed": true,
      "items": [
        {
          "type": "doc",
          "id": "user_manual/X-Pack/user",
          "label": "用户管理",
          "key": "doc:企业版功能/用户管理"
        },
        {
          "type": "doc",
          "id": "user_manual/X-Pack/workspace",
          "label": "工作空间",
          "key": "doc:企业版功能/工作空间"
        },
        {
          "type": "doc",
          "id": "user_manual/X-Pack/role",
          "label": "角色管理",
          "key": "doc:企业版功能/角色管理"
        },
        {
          "type": "doc",
          "id": "user_manual/X-Pack/resource_management",
          "label": "资源管理",
          "key": "doc:企业版功能/资源管理"
        },
        {
          "type": "doc",
          "id": "user_manual/X-Pack/shared_resources",
          "label": "共享资源",
          "key": "doc:企业版功能/共享资源"
        },
        {
          "type": "doc",
          "id": "user_manual/X-Pack/chat_user",
          "label": "对话用户",
          "key": "doc:企业版功能/对话用户"
        },
        {
          "type": "category",
          "label": "知识库",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "user_manual/X-Pack/feishu_doc",
              "label": "飞书文档知识库",
              "key": "doc:企业版功能/知识库/飞书文档知识库"
            },
            {
              "type": "doc",
              "id": "user_manual/X-Pack/dataset_chatuser",
              "label": "对话用户",
              "key": "doc:企业版功能/知识库/对话用户"
            }
          ],
          "key": "cat:企业版功能/知识库"
        },
        {
          "type": "category",
          "label": "智能体",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "user_manual/X-Pack/app_logo_settting",
              "label": "显示设置",
              "key": "doc:企业版功能/智能体/显示设置"
            },
            {
              "type": "doc",
              "id": "user_manual/X-Pack/app_integrate",
              "label": "接入第三方",
              "key": "doc:企业版功能/智能体/接入第三方"
            },
            {
              "type": "doc",
              "id": "user_manual/X-Pack/app_auth",
              "label": "身份验证",
              "key": "doc:企业版功能/智能体/身份验证"
            },
            {
              "type": "doc",
              "id": "user_manual/X-Pack/app_chatueser",
              "label": "对话用户",
              "key": "doc:企业版功能/智能体/对话用户"
            }
          ],
          "key": "cat:企业版功能/智能体"
        },
        {
          "type": "category",
          "label": "系统设置",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "user_manual/X-Pack/theme_settings",
              "label": "系统外观",
              "key": "doc:企业版功能/系统设置/系统外观"
            },
            {
              "type": "doc",
              "id": "user_manual/X-Pack/login_auth",
              "label": "登录认证",
              "key": "doc:企业版功能/系统设置/登录认证"
            }
          ],
          "key": "cat:企业版功能/系统设置"
        },
        {
          "type": "doc",
          "id": "user_manual/X-Pack/operation_log",
          "label": "操作日志",
          "key": "doc:企业版功能/操作日志"
        },
        {
          "type": "doc",
          "id": "user_manual/X-Pack/system_API",
          "label": "系统API",
          "key": "doc:企业版功能/系统API"
        }
      ],
      "key": "cat:企业版功能"
    },
    {
      "type": "category",
      "label": "常见问题",
      "collapsed": true,
      "items": [
        {
          "type": "doc",
          "id": "faq/install_configuration",
          "label": "安装部署",
          "key": "doc:常见问题/安装部署"
        },
        {
          "type": "doc",
          "id": "faq/system_management",
          "label": "系统管理",
          "key": "doc:常见问题/系统管理"
        },
        {
          "type": "doc",
          "id": "faq/function_library",
          "label": "工具",
          "key": "doc:常见问题/工具"
        },
        {
          "type": "doc",
          "id": "faq/knowledge_base",
          "label": "知识库",
          "key": "doc:常见问题/知识库"
        },
        {
          "type": "doc",
          "id": "faq/apply_setting",
          "label": "智能体",
          "key": "doc:常见问题/智能体"
        }
      ],
      "key": "cat:常见问题"
    },
    {
      "type": "category",
      "label": "实践教程",
      "collapsed": true,
      "items": [
        {
          "type": "doc",
          "id": "user_manual/choose_model_dataset",
          "label": "问答页面自主选择模型或知识库",
          "key": "doc:实践教程/问答页面自主选择模型或知识库"
        },
        {
          "type": "doc",
          "id": "user_manual/chat_to_API",
          "label": "通过 API KEY 进行对话",
          "key": "doc:实践教程/通过 API KEY 进行对话"
        },
        {
          "type": "doc",
          "id": "faq/Offline_install_OllamaModel",
          "label": "Ollama 离线部署 LLM 模型",
          "key": "doc:实践教程/Ollama 离线部署 LLM 模型"
        },
        {
          "type": "doc",
          "id": "faq/GPU_runOllama",
          "label": "Ollama 使用 GPU 运行 LLM 模型",
          "key": "doc:实践教程/Ollama 使用 GPU 运行 LLM 模型"
        },
        {
          "type": "doc",
          "id": "faq/wps_contract_review",
          "label": "WPS合同审核助手的设计与实现",
          "key": "doc:实践教程/WPS合同审核助手的设计与实现"
        },
        {
          "type": "doc",
          "id": "faq/maxkb_multimodal_workflow",
          "label": "通过知识库工作流构建MaxKB图、音、视多模态知识",
          "key": "doc:实践教程/通过知识库工作流构建MaxKB图、音、视多模态知识"
        },
        {
          "type": "doc",
          "id": "faq/maxkb_In_halo",
          "label": "将 MaxKB 小助手集成到 Halo 中",
          "key": "doc:实践教程/将 MaxKB 小助手集成到 Halo 中"
        },
        {
          "type": "doc",
          "id": "faq/doc_segment",
          "label": "知识库文档如何合理分段",
          "key": "doc:实践教程/知识库文档如何合理分段"
        },
        {
          "type": "doc",
          "id": "user_manual/workbuddy_maxkb_skills",
          "label": "WorkBuddy + MaxKB 技能",
          "key": "doc:实践教程/WorkBuddy + MaxKB 技能"
        }
      ],
      "key": "cat:实践教程"
    },
    {
      "type": "category",
      "label": "MaxKB Skills 技能",
      "collapsed": true,
      "items": [
        {
          "type": "doc",
          "id": "Skills/MaxKB_Skills",
          "label": "MaxKB Skills",
          "key": "doc:MaxKB Skills 技能/MaxKB Skills"
        }
      ],
      "key": "cat:MaxKB Skills 技能"
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
