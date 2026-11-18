---
title: MCP 管理
description: 介绍如何在 1Panel 中创建与管理 MCP Server，以及如何通过访问凭据将 1Panel MCP 服务接入 AI 客户端。
slug: /1panel/user_manual/ai/mcp
---

## 1 功能简介

MCP（Model Context Protocol，模型上下文协议）用于让 AI 客户端以标准方式调用外部工具。1Panel 的 MCP 管理功能包含两类能力：一是将通过 `npx` 或 `uvx` 启动的 stdio MCP Server 封装为 SSE 或 Streamable HTTP 服务；二是提供内置的 1Panel MCP 服务，通过访问凭据将面板能力接入 AI 客户端。

在左侧导航栏选择 **AI > MCP 管理** 进入功能页。该页面按能力来源划分为两个逻辑区域：**1Panel MCP 接入** 将面板原生能力以受控工具的形式开放给 AI 客户端，属于托管式接入；**MCP 服务** 负责纳管第三方 MCP Server，把基于 stdio 的进程桥接为可被远程调用的 HTTP 服务。二者分别覆盖内置能力与外部能力的接入诉求。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/mcp-overview.png" alt="图 1  MCP 管理功能入口" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  MCP 管理功能入口</div>


## 2 MCP 服务管理

在 **MCP 服务** 页面中，可以将 stdio MCP Server 转换为可供客户端访问的 SSE 或 Streamable HTTP 服务。

### 2.1 创建 MCP 服务

在 **MCP 服务** 页面单击 **创建**，依次填写基础信息、传输配置与容器参数，确认后由 1Panel 将指定的 stdio 进程封装为容器化服务，并对外暴露 HTTP 端点。各字段的具体含义与取值范围说明如下。


<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/create-mcp-server.png" alt="图 2  创建 MCP Server 表单" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建 MCP Server 表单</div>

:::note[参数说明]
    - **名称**：MCP Server 名称，创建后不可修改，同时用于生成默认容器名称和访问路径。
    - **类型**：`npx` 适用于 npx 命令或二进制启动命令；`uvx` 适用于 uvx 命令。
    - **运行命令**：实际启动 stdio MCP Server 的命令，例如 `npx -y @modelcontextprotocol/server-github` 或 `uvx mcp-server-fetch`。
    - **外部访问路径**：客户端访问时使用的协议、主机名或 IP。
    - **输出类型**：支持 `sse` 和 `streamableHttp`。
    - **SSE 路径 / 流式传输路径**：当前实例的访问路径，同一地址下不能重复。
    - **协议版本**：仅在 Streamable HTTP 模式中使用，用于无状态初始化下游 stdio MCP Server。
    - **参数**：追加到 Supergateway 启动命令的自定义参数，不能覆盖由 1Panel 管理的传输、端口、路径和协议参数。
    - **镜像**：运行网关的容器镜像。修改默认镜像前，应确认其与所选启动类型兼容。
    - **容器名称**：创建的容器名称，在当前 Docker 环境中必须唯一。
    - **端口 / 端口外部访问**：配置映射端口，并决定绑定到 `0.0.0.0` 或仅绑定到 `127.0.0.1`。
    - **环境变量 / 挂载**：向 MCP Server 传入凭证、配置或主机目录。
:::


### 2.2 导入 MCP Server 配置

对于已有 `mcpServers` JSON 配置的场景，可通过导入功能批量还原启动命令与环境变量，避免逐项录入。在 **MCP 服务** 标签页单击 **创建**，选择 **导入 MCP Server 配置**，粘贴配置并核对命令与环境变量后提交即可。

:::note[配置导入说明]
导入前请检查配置中的命令、参数与环境变量，确认来源可信后再提交。
:::

### 2.3 管理与连接

创建完成后，实例以独立条目纳入 **MCP 服务** 统一管理。列表集中呈现各实例的运行状态与对外连接地址，便于运维人员掌握服务可用性，并对实例执行配置调整、日志排查等生命周期操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/mcp-server-list.png" alt="图 3  MCP Server 列表管理" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  MCP Server 列表管理</div>

客户端连接地址由外部基础地址、端口与当前输出类型的路径共同组成，建议直接使用列表或连接详情中提供的地址，避免手工拼接出错。

:::warning[连接失败排查]
如果实例无法连接，请依次检查容器状态与日志、启动命令、外部基础地址、端口监听、防火墙以及反向代理配置。
:::

### 2.4 绑定网站

**绑定网站** 用于将所有已安装的 MCP Server 通过统一的 Web 入口对外提供，避免逐个暴露服务端口。绑定后，1Panel 自动改写各实例的外部访问地址并关闭端口的直接外部访问，使流量收敛至网站入口；不同实例依靠各自的 SSE 或 Streamable HTTP 路径实现路由隔离。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/bind-website.png" alt="图 4  绑定网站" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  绑定网站</div>

在网站侧可进一步启用 HTTPS 证书与访问控制策略，使 MCP 端点继承站点的传输加密与鉴权能力，无需为每个实例单独配置安全规则。

:::note[端口暴露建议]
已通过网站提供服务时，建议保持实例端口仅监听本机，避免网站入口与直接端口同时暴露。
:::

## 3 1Panel MCP 服务接入

**1Panel MCP 接入** 是 1Panel 以内置 MCP 服务形式对外提供的面板能力入口。AI 客户端需使用访问凭据完成鉴权，并仅能在该凭据授权的节点与工具范围内调用相应能力。

### 3.1 安装 1Panel MCP 服务

内置 MCP 服务以容器化组件的形式部署于主节点。首次进入 **1Panel MCP 接入** 时，若该组件尚未部署，则处于 **未安装** 状态；只有完成安装并启用后，系统才具备创建访问凭据与响应工具调用的能力。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/install-mcp-entry.png" alt="图 5  1Panel MCP 服务未安装状态" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  1Panel MCP 服务未安装状态</div>

在 **1Panel MCP 接入** 页面单击 **立即安装** 后，系统依次完成镜像拉取、版本与工具契约校验、容器启动及健康检查，并持久化服务配置。安装过程可通过 **安装日志** 追溯；当组件状态转为 **运行中** 时，表明服务已就绪，可开始配置访问凭据。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/install-success-log.png" alt="图 6  1Panel MCP 服务安装成功日志" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  1Panel MCP 服务安装成功日志</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/mcp-install-complete.png" alt="图 7  1Panel MCP 服务安装完成状态" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  1Panel MCP 服务安装完成状态</div>


安装 1Panel MCP 服务需要主节点 Docker 正常运行，且 Core、主节点与子节点 Agent 及前端组件版本配套。安装过程会拉取容器镜像，请确保服务器可访问镜像仓库。

### 3.2 创建访问凭据

访问凭据是客户端调用内置 MCP 服务的身份凭证，其权限由节点范围与工具集合共同界定。在 **1Panel MCP 接入** 标签页单击 **创建凭据**，填写名称与描述，指定可访问的节点范围，并按业务需要勾选开放的工具，确认后即生成一枚具备相应权限的凭据。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/create-credential.png" alt="图 8  创建访问凭据" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  创建访问凭据</div>

访问凭据创建成功后，系统生成唯一的访问令牌，并给出可直接使用的客户端配置。该令牌用于客户端鉴权，请妥善保管。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/credential-token.png" alt="图 9  凭据令牌与客户端配置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  凭据令牌与客户端配置</div>

凭据同时受节点权限、工具权限与账号权限限制。新增节点或新增工具后，需要单独为凭据授权。

### 3.3 获取连接配置

创建凭据后，需将其转换为客户端可识别的连接配置。在凭据列表中定位目标凭据并单击 **连接详情**，页面提供接入地址及对应的客户端配置片段；单击 **复制** 后粘贴至 MCP 客户端即可完成对接。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/connection-details.png" alt="图 10  连接详情与客户端配置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  连接详情与客户端配置</div>

客户端配置中的 `<MCP_TOKEN>` 需替换为实际的凭据 Token。配置示例如下：

```json
{
  "mcpServers": {
    "1panel": {
      "type": "http",
      "url": "<接入地址>",
      "headers": {
        "Authorization": "Bearer <MCP_TOKEN>"
      }
    }
  }
}
```

:::warning[凭据保管]
凭据 Token 等同于访问身份，请勿提交到代码仓库或对外公开。泄露后应及时删除原凭据并重新创建。
:::

### 3.4 服务设置

**服务配置** 用于调整内置 MCP 服务的监听与对外暴露方式。在 **1Panel MCP 接入** 标签页单击 **设置**，可查看本地监听端口并指定接入地址；需要升级组件版本时，可在 **镜像升级** 中完成。修改后单击 **保存** 使配置生效。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/service-settings.png" alt="图 11  1Panel MCP 服务设置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  1Panel MCP 服务设置</div>

接入地址的取值决定客户端实际连接的入口：留空时复用面板访问地址，适用于直连场景；若服务位于反向代理之后，应填写代理的完整地址，以确保客户端请求能够正确路由至 MCP 端点。

### 3.5 查看日志与调用记录

内置 MCP 服务提供多维度的可观测信息：**运行日志** 记录服务进程的实时输出，用于诊断异常；**安装日志** 保留组件部署全过程，便于追溯部署问题；**调用记录** 按状态筛选并呈现每一次工具调用的时间、访问凭据、目标节点、结果代码与耗时，是审计与权限核验的主要依据。在 **1Panel MCP 接入** 标签页单击相应入口即可查看。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/runtime-log.png" alt="图 12  1Panel MCP 运行日志" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  1Panel MCP 运行日志</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/call-records.png" alt="图 13  1Panel MCP 调用记录" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  1Panel MCP 调用记录</div>


## 4 WorkBuddy 接入与运维示例

WorkBuddy 通过自定义连接器接入符合 MCP 协议的服务。将 1Panel MCP 服务配置为 WorkBuddy 的自定义连接器后，可直接在对话中以自然语言调用面板工具，完成日常巡检与运维操作。

在 WorkBuddy 左侧边栏选择 **专家 > 技能 > 连接器** 进入连接器页面，单击右上角的 **添加 MCP**。将 3.3 节获取的客户端配置填入编辑框，把 `<MCP_TOKEN>` 替换为实际的访问令牌后单击 **保存**：

```json
{
  "mcpServers": {
    "1panel": {
      "type": "http",
      "url": "<接入地址>",
      "headers": {
        "Authorization": "Bearer <MCP_TOKEN>"
      }
    }
  }
}
```

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/workbuddy-add-mcp-config.png" alt="图 14  在 WorkBuddy 中添加 1Panel MCP 配置" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 14  在 WorkBuddy 中添加 1Panel MCP 配置</div>


配置保存后，连接器列表中出现对应的 1Panel 服务条目。首次连接该服务需要确认信任，定位到目标条目并单击 **信任** 完成启用：

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/workbuddy-trust-mcp.png" alt="图 15  信任并启用 1Panel MCP 连接器" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 15  信任并启用 1Panel MCP 连接器</div>


启用后展开该条目，可查看当前凭据授权范围内的工具清单，包括 `list_nodes`、`get_system_info`、`get_dashboard_info`、`list_websites` 等：

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/workbuddy-mcp-tools.png" alt="图 16  1Panel MCP 连接器工具列表" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 16  1Panel MCP 连接器工具列表</div>


工具调用受访问凭据的节点范围和工具集合约束，只能访问该凭据已授权的资源。例如，输入「查看当前服务器的系统信息与资源使用情况」，WorkBuddy 调用 `get_system_info` 工具返回操作系统、内核版本、主机名、CPU 等实时数据：

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/mcp/workbuddy-ai-ops-result.png" alt="图 17  WorkBuddy 调用工具返回系统信息" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 17  WorkBuddy 调用工具返回系统信息</div>


有了这层连接，运维人员可以用对话方式完成日常巡检：查询系统信息、网站与 HTTPS 配置、数据库、SSL 证书和应用版本等。对于创建网站、签发证书、安装应用等写入类操作，建议先让 WorkBuddy 汇总待执行的变更内容，确认无误后再执行，避免因自然语言理解偏差造成误操作。

## 5 注意事项

:::important[命令与挂载安全]
1Panel 会在服务器上运行所填写的命令。导入第三方配置前，应检查命令、镜像、环境变量与挂载目录，不要运行来源不明或权限范围过大的 MCP Server。
:::

为访问凭据授权工具与节点时，仅开放业务所需的范围，并定期清理不再使用的凭据。接受 `nodeId` 的工具默认使用 `local`，调用 `list_nodes` 可获取有权查看的节点 ID，业务工具须使用节点 ID，不能使用节点名称或 IP，两种模式均不会在节点不可用时自动回退到主节点。证书签发与应用安装返回的 `accepted` 仅表示请求已提交，不代表已完成，提交后如遇网络异常或服务错误，在手动重试前应先在 1Panel 检查实际资源或任务状态，避免重复写入，断开连接或撤销凭据不会回滚已受理的操作。
