---
title: MCP 服务开放
---


Cordys CRM 支持通过 MCP 进行服务端智能创建（线索/客户/商机/联系人）、智能录入（跟进记录）、智能查重等。

## 1 服务配置


Cordys CRM MCP Server 安装 All in one 镜像中就包含了，默认端口是 8082，支持以下两种通信协议：

- SSE（Server-Sent Events）：基于 HTTP 协议的单向通信协议，适用于实时数据推送场景。
- Streamable-HTTP：基于 HTTP/1.1 的双向通信协议，适用于需要持续数据流传输的场景。

默认配置文件位于 `/opt/cordys/conf/cordys-crm.properties`。

示例配置内容：

```properties
server.port=8082

# Logging Settings
logging.file.path=/opt/cordys/logs/mcp-server

# stdio server settings
spring.ai.mcp.server.stdio=false

# Cordys CRM server settings
cordys.crm.url=http://127.0.0.1:8081
spring.mvc.async.request-timeout=60000

spring.ai.mcp.server.type=ASYNC
spring.ai.mcp.server.name=cordys-crm-mcp-server
spring.ai.mcp.server.version=1.0.0

# 可选：启用 Streamable 模式
# spring.ai.mcp.server.protocol=STREAMABLE
# spring.ai.mcp.server.streamable-http.mcp-endpoint=/mcp
```

## 2 客户端配置

Cordys CRM MCP Server 默认监听端口为 8082，支持 SSE 和 Streamable-HTTP 协议进行通信。基本配置如下：

```
{
   "cordys-crm-mcp-server": {
       "url": "http://<your-server-ip>:8082/sse", // 将 IP 替换为部署机器的地址
       "transport": "sse",
        "headers": {
			"X-Access-Key": "ak", // 替换为实际的 Access Key
			"X-Secret-Key": "sk" // 替换为实际的 Secret Key
		}
    }
}
```
服务端开启了 Streamable-HTTP 协议，只需将 `transport` 字段修改为 `streamable_http` 即可。


登录 Cordys CRM 从左下角 【 个人中心 - API Keys 】中获取 Access Key 和 Secret Key

![APIKeys](/img/cordys/index/api_keys2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  API Keys</div>


Cordys CRM 的 MCP Server 和 基础镜像安装方式相同，具体可以参考：[**Cordys CRM 安装部署**](./installation/1panel_installtion)

## 3 MCP 工具说明

Cordys CRM 的 MCP Server 提供以下工具。
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1 工具说明</div>
| 工具名称            | 功能描述     | 输入参数参考 input_schema | 输出结果                |
|---------------------|------------|--------------------------|------------------------|
| global_search       | 通用查询     | 查询关键字                | 查询结果集 ｜ 失败原因   |
| add_lead            | 添加线索     | 自定义表单内容            | 添加成功对象 ｜ 失败原因 |
| add_account         | 添加客户     | 自定义表单内容            | 添加成功对象 ｜ 失败原因 |
| add_opportunity     | 添加商机     | 自定义表单内容            | 添加成功对象 ｜ 失败原因 |
| add_contact         | 添加联系人   | 自定义表单内容            | 添加成功对象 ｜ 失败原因 |
| add_follow_record   | 添加跟进记录 | 自定义表单内容            | 添加成功对象 ｜ 失败原因 |
| add_follow_plan     | 添加跟进计划 | 自定义表单内容            | 添加成功对象 ｜ 失败原因 |
| update_account      | 更新客户     | 需要更新的属性和值        | 更新成功信息 ｜ 失败原因 |
| update_lead         | 更新线索     | 需要更新的属性和值        | 更新成功信息 ｜ 失败原因 |
| update_opportunity  | 更新商机     | 需要更新的属性和值        | 更新成功信息 ｜ 失败原因 |
| update_contact      | 更新联系人   | 需要更新的属性和值        | 更新成功信息 ｜ 失败原因 |


`Tools` 将 Cordys CRM 系统中配置的动态表单参数输出为标准的 `input_schema`，客户端需根据该格式传递正确参数。


以 add_lead 为例，其他工具用法类似，输入参数 (input_schema)
```
{
  "type" : "object",
  "properties" : {
    "公司" : {
      "type" : "string"
    },
    "负责人" : {
      "type" : "string"
    },
    "区域" : {
      "type" : "string",
      "enum" : [ "东区", "北区", "南区"]
    },
    "所属产品" : {
      "type" : "array",
      "items" : {
        "type" : "string"
      }
    },
    "线索来源" : {
      "type" : "string",
      "enum" : [ "官网下载", "400电话" ]
    },
    "联系人姓名" : {
      "type" : "string"
    },
    "联系人手机" : {
      "type" : "string",
      "description" : "手机号"
    }
  },
  "required" : [ "公司", "负责人", "区域", "所属产品", "线索来源"]
}
```

参数说明：
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  参数说明</div>
| 字段         | 说明       | 示例/可选值                     |
| ------------ | ---------- | ------------------------------- |
| `type`       | 参数类型   | `string` / `number` / `array`… |
| `enum`       | 字段可选值 | 枚举值列表                      |
| `description`| 字段描述   | 文本说明                        |
| `required`   | 必填字段   | `true` / `false`                |

## 4 使用示例

###  4.1 MaxKB 集成示例

![agent](/img/cordys/mcp/agent_mcp2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  MaxKB 集成示例</div>


步骤⼀： 创建或进入一个高级编排类型的应用。

步骤二： 在“基本信息”里添加两个用户输入，分别是 ak 和 sk，添加两个会话变量，分别是 Cordys CRM 的 Access Key 和 Secret Key。

步骤三： 添加 Cordys CRM MCP 工具。

步骤四： 根据自身量身定做的业务场景，设计提示词和工具调用逻辑。

添加 MCP 调用节点

- MCP Server Config 服务配置：
    ```
    {
        "cordys-crm-mcp-server": {
            "url": "http://<Cordys_MCP_IP>:8082/sse",
            "transport": "sse",
            "headers": {
                "X-Access-Key": "{{global.ak}}",
                "X-Secret-Key": "{{global.sk}}"
            }
        }
    }
    ```
服务端开启了 Streamable-HTTP 协议，只需将 `transport` 字段修改为 `streamable_http` 即可。


方式一：Cordys CRM 智能查询效果

![智能查询客户](/img/cordys/user_manual/agent-query-customer2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  智能查询客户</div>


方式二：Cordys CRM 智能添加效果

![智能创建线索](/img/cordys/user_manual/agent-Create-lead2.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  智能创建线索</div>

###  4.2 开发工具 TRAE 集成示例


第一步: 配置 `MCP Server`
```
{
    "cordys-crm-mcp-server": {
        "url": "http://<Cordys_MCP_IP>:8082/sse",
        "headers": {
            "X-Access-Key": "ak",
            "X-Secret-Key": "sk"
        }
    }
}
```

第二步: 通过`Agent`对话验证工具可用性

![Trae.png](/img/cordys/mcp/trae.png)

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  验证</div>