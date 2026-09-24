---
title: API 文档
description: 介绍 Cordys CRM 开放 API 的接口分组、鉴权方式与调用方法，并说明在线接口文档的查看位置。
---

Cordys CRM 以 REST API 的形式对外开放业务能力，第三方系统无需登录界面即可读写线索、客户、商机、合同、订单等数据，可用于与自建业务系统对接、批量同步数据或搭建自动化流程。接口按 OpenAPI 3.1 规范描述，并随产品内置一份可交互的在线接口文档。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/api/api-swagger-ui.png" alt="图 1  在线接口文档界面" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  在线接口文档界面</div>

## 1 功能简介

Cordys CRM 的开放 API 覆盖 15 个业务分组、共 854 个接口，囊括 CRM 的主要业务对象及其配置项。所有接口统一使用 API Key 鉴权，请求与响应均为 JSON 格式：`POST` 类接口多用于分页查询、新建、更新与批量操作，`GET` 类接口多用于获取详情与下拉选项数据。

调用方只需持有 API Key，即可在不依赖界面登录态的前提下集成 Cordys CRM 的能力，例如把官网表单收集的线索写入线索池、把订单同步到 ERP 系统，或定时拉取客户与合同数据用于经营分析。

### 1.1 接口分组

接口按业务模块划分为 15 个分组，可在在线接口文档左上角的分组选择框中切换查看。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  接口分组一览</div>

| 分组 | 覆盖范围 | 接口数 |
|---|---|---|
| `account` | 客户、联系人、公海客户及相关视图 | 124 |
| `approval` | 审批流设置与审批操作 | 26 |
| `contract` | 合同、工商抬头、发票、回款计划与回款记录 | 122 |
| `dashboard` | 仪表板看板的组织与授权 | 16 |
| `follow` | 跟进记录、跟进计划及其评论 | 39 |
| `form` | 自定义表单数据与表单角色 | 29 |
| `home` | 首页数据概览统计 | 5 |
| `integration` | 智能体、单点登录与标讯 | 32 |
| `lead` | 线索、线索池及相关视图 | 80 |
| `opportunity` | 商机、报价单、阶段与规则设置 | 75 |
| `order` | 订单与订单状态流设置 | 36 |
| `product` | 产品与价格表 | 29 |
| `search` | 全局搜索、高级搜索与字段配置 | 20 |
| `system` | 用户、角色、组织架构、模块配置、消息与日志 | 144 |
| `xpack` | 智能体对话、模型配置、术语与执行日志等增强能力 | 77 |

## 2 前提条件

- 已部署 Cordys CRM，并可通过浏览器正常访问。
- 已准备一个可登录产品界面的账号，该账号可进入 **个人中心** 的 **API Keys** 页签。

## 3 在线接口文档

Cordys CRM 内置一份基于 Swagger UI 的在线接口文档，随产品一同部署，无需额外安装。文档按业务分组列出全部接口，可查看每个接口的请求方法、接口路径、请求参数、请求体结构与响应结构。

打开在线接口文档有两种方式：一是在顶栏单击 **帮助中心**，在下拉菜单中选择 **API 文档**；二是直接访问产品地址下的接口文档页面，即 `<产品访问地址>/swagger-ui/index.html`。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/api/api-entry.png" alt="图 2  API 文档入口" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  API 文档入口</div>

接口文档页面的主要区域包括：

- **分组选择框**：位于页面左上角，用于在 15 个业务分组之间切换，切换后页面只显示该分组的接口。
- **接口列表**：每个接口占一行，行首的标签表示请求方法（`POST`、`GET` 等），其后是接口路径与中文接口名称。
- **接口详情**：单击任意一行可展开详情，查看请求参数、请求体示例值与响应结构。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/api/api-swagger-groups.png" alt="图 3  切换接口分组" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  切换接口分组</div>

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/api/api-swagger-detail.png" alt="图 4  查看接口详情" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  查看接口详情</div>

## 4 获取 API Key

调用开放 API 前，需要在产品界面中创建一个 API Key，由系统生成的 Access Key 与 Secret Key 成对使用。

### 4.1 创建 API Key

1. 在左侧导航底部单击账号头像，选择 **个人中心**。
2. 选择 **API Keys** 页签。
3. 单击 **新增**，系统随即生成一组 Access Key 与 Secret Key，无需填写其他信息。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/api/api-keys.png" alt="图 5  个人中心 API Keys" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  个人中心 API Keys</div>

每个 API Key 以卡片形式展示，卡片中的信息包括：

- **Access Key**：公开的访问标识，调用接口时随请求发送。
- **Secret Key**：默认以掩码显示，单击右侧的眼睛图标可查看明文。
- **描述**：该 API Key 的备注说明。
- **创建时间**：API Key 的生成时间。
- **有效时间**：该 API Key 的生效期限，默认永久有效。

:::important[重要]
Secret Key 与密码同等敏感，请勿写入前端代码、客户端程序或提交到代码仓库。如怀疑已泄露，请删除该 API Key 后重新创建。
:::

### 4.2 管理 API Key

每个卡片右下角提供启用开关，卡片底部提供 **有效时间** 与 **删除** 两个操作。停用开关或删除 API Key 后，使用该 Key 发起的调用会立即失败。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/cordys/api/api-keys-delete.png" alt="图 6  删除 API Key 的确认提示" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  删除 API Key 的确认提示</div>

:::warning[警告]
删除 API Key 不可撤销，删除后正在使用该 Key 的集成会立即失效，调用接口将返回 HTTP 401。请在确认没有业务依赖后再执行删除。
:::

## 5 调用接口

### 5.1 请求地址

接口地址由产品访问地址与接口路径拼接而成，接口路径可在在线接口文档中查到。例如产品访问地址为 `https://<产品访问地址>`，调用客户列表接口 `POST /account/page`，则完整请求地址为 `https://<产品访问地址>/account/page`。

### 5.2 鉴权方式

每个请求都需要在 HTTP 请求头中携带 API Key，字段如下：

- **X-Access-Key**：API Key 的 Access Key。
- **X-Secret-Key**：API Key 的 Secret Key。
- **Content-Type**：固定为 `application/json`，`POST` 请求必填。

请求头字段名不区分大小写。缺少请求头或 Key 不正确时，接口返回 HTTP 401，响应体为空。

### 5.3 调用示例

以调用客户列表接口为例：

```bash
curl -X POST 'https://<产品访问地址>/account/page' \
  -H 'X-Access-Key: <Access Key>' \
  -H 'X-Secret-Key: <Secret Key>' \
  -H 'Content-Type: application/json' \
  -d '{"current": 1, "pageSize": 10}'
```

响应示例（数据为示例值，已简化）：

```json
{
  "code": 100200,
  "message": null,
  "messageDetail": null,
  "data": {
    "list": [
      {
        "id": "347910123550687743",
        "name": "示例客户",
        "ownerName": "示例负责人"
      }
    ]
  }
}
```

### 5.4 响应结构

所有接口返回统一的外层结构，业务数据位于 `data` 字段中：

- **code**：业务状态码，`100200` 表示成功。
- **message**：提示信息，成功时为 `null`。
- **messageDetail**：异常的详细信息，排查问题时使用。
- **data**：业务数据，结构随接口不同而变化。

常见失败情形如下：

- 请求头缺少 `X-Access-Key` 或 `X-Secret-Key`、Key 不正确、Key 已被停用或删除时，返回 HTTP 401，响应体为空。
- `Content-Type` 不是 `application/json`、请求体缺失或字段类型错误时，返回 HTTP 500，`code` 为 `100500`，`message` 中给出具体原因。

## 6 注意事项

:::note[说明]
在线接口文档随产品部署，其访问地址为 `<产品访问地址>/swagger-ui/index.html`。产品升级后接口文档会同步更新，接口的新增与调整以该页面为准。
:::

接口文档中列出的部分接口属于系统内部使用场景（例如需要登录态、会话或额外权限校验的接口），使用 API Key 调用时可能返回 401 或空数据。集成时请优先选用与业务对象增删改查直接相关的接口，并在正式对接前于测试环境验证。

## 7 后续操作

若希望通过 AI 客户端调用 Cordys CRM 的业务能力，而无需自行编写对接代码，可使用产品内置的 MCP 服务，由智能体完成线索创建、客户查询、跟进记录录入等操作，具体配置请参见 [MCP 服务开放](./mcp_server.md)。
