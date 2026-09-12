---
title: 嵌入式对接
---


SQLBot 支持通过【小助手嵌入】和【网页嵌入】的方式将智能问数能力嵌入到外部系统页面中。

其中【小助手嵌入】包含【基础应用】和【高级应用】两种模式，每种模式都支持「浮窗嵌入」和「全屏嵌入」两种呈现方式。

嵌入式 Demo 地址：[https://github.com/dataease/sqlbot-embedded-demo](https://github.com/dataease/sqlbot-embedded-demo)

三类方式的区别主要按照权限划分，请对照选择合适的嵌入方式：

<div style={{textAlign:"left",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1 嵌入方式对比</div>

| 类别 | 权限 | 数据源 | 场景 |
|------|---|------|----------|
| 基础应用 | 游客/员工 | SQLBot | 数据源 | 简单嵌入，无权限要求 |
| 高级应用 | 宿主权限 | 宿主数据源(api 接口) | 有权限要求，有自己的权限体系 |
| 页面嵌入 | SQLBot 权限 | SQLBot 数据源 | 有权限要求，无自己的权限体系 |


## 1 新建应用

### 1.1 小助手嵌入

#### 1.1.1 基础应用


使用 admin 账号登录 SQLBot，点击小助手应用，新建对应的应用。


<img src="/img/sqlbot/embedding/sqlbot_basic_assistant.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 1 SQLBot 基础助手</div>


填写名称、描述、跨域设置以及模型的选择。


<img src="/img/sqlbot/embedding/sqlbot_basic_info.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 2 SQLBot 基础信息</div>


进行数据源权限的设置。


<img src="/img/sqlbot/embedding/sqlbot_basic_datasource.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 3 SQLBot 基础数据源</div>


小助手-基础应用有“游客/员工”简单权限模式，游客只能访问“公共”数据源，模式的选择根据业务侧传递的 online 参数进行调整。


#### 1.1.1 高级应用


高级应用与基础应用在“新建”阶段的核心区别在于：高级应用的数据源是通过 API 接口方式获取的。

<img src="/img/sqlbot/embedding/sqlbot_advanced_info.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 4 SQLBot 高级信息</div>
<img src="/img/sqlbot/embedding/sqlbot_advanced_interface.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 5 SQLBot 高级接口</div>


- AES 加密：当开启 AES 加密时，宿主系统提供的 API 接口需对相关字段进行 AES 加密处理。

- 接口认证
    - 在常见场景下，宿主 API 接口通常具备认证机制（如 Token、Cookie 等）。

    - 这些认证凭证一般由前端页面存储，用户在 SQLBot 中填写接口凭证后，SQLBot 会在宿主页面上按需读取凭证并调用 API 接口，但 不会存储任何凭证信息。

    - 凭证的读取发生在每次“问数”时，SQLBot 根据获取到的凭证调用宿主系统的 API 接口。

- httpOnly Cookie 场景：对于基于 httpOnly Cookie 的认证方式，由于 SQLBot 无法直接读取此类 Cookie，可以在数据源接口中额外定义一个认证凭证以实现访问。


<img src="/img/sqlbot/embedding/sqlbot_advanced_interface2.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 6 SQLBot 高级接口 2</div>


**注意**：目标凭证字段（非必填）支持 JS 表达式，可灵活处理凭证值。

Demo 系统示例：


<img src="/img/sqlbot/embedding/sqlbot_advanced_demo.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 7 SQLBot 高级示例</div>


以下分别说明接口凭证各字段的含义：

源系统凭证：

  - 类型：localStorage

  - 凭证名称：sqlbot-embedded-token

  - 含义：从 localStorage 中读取 key 为 sqlbot-embedded-token 的值。

  - 示例代码：

```
var source_val = localStorage.getItem('sqlbot-embedded-token')
```

目标凭证

  - 值： `Bearer $\{JSON.parse(JSON.parse(source_val).v)\}`。

  - 含义：基于上一步获取的 source_val 进行解析并拼接成最终凭证。
  - 示例代码：

```
source_val = `Bearer ${JSON.parse(JSON.parse(source_val).v)}` 
```

目标凭证位置

  - 位置：header

  - 名称：sqlbot-embedded-token

  - 含义：将拼接好的凭证放在请求头中，以 sqlbot-embedded-token 作为 Header 名称调用 API。


### 1.2 页面嵌入


填写名称、跨域设置。记录 APP ID 以及 APP Secret，后面编码环节用得到。


<img src="/img/sqlbot/embedding/sqlbot_page.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 8 SQLBot 页面</div>

    
## 2 宿主系统实现


下载 Demo 代码 [https://github.com/dataease/sqlbot-embedded-demo](https://github.com/dataease/sqlbot-embedded-demo) 。

配置数据库信息：


<img src="/img/sqlbot/embedding/project_config.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 9 项目配置</div>


在 frontend 目录执行：
```
npm install;npm run build
```

在 backend 目录执行：
```
npm install;npm run dev
```

访问 `http://localhost:3000`，如下图即运行正常。


<img src="/img/sqlbot/embedding/project_demo.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 10 项目示例</div>


根据 SQLBot 中填写的信息填写系统设置表单，保存。当前是游客模式，登录后是 online 模式。

代码层面基础应用和高级应用嵌入方式基本没有区别。


<img src="/img/sqlbot/embedding/sqlbothandler.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 11 SQLBot 处理器</div>


sqlbot_assistant_handler 用于浮动窗口模式（页面悬浮小助手），而 sqlbot_embedded_handler 用于全屏或区域模式（嵌入整个对话区域），两者分别适用于不同的嵌入方式，可根据业务需求选择使用。


### 2.1 浮窗模式


参考 assistan/float.vue 文件


<img src="/img/sqlbot/embedding/project_float.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 12 项目浮窗</div>


把 sqlbot 提供的嵌入 js 加载到宿主系统。

如果是高级应用，必须登录才可以，因为要从页面获取凭证信息.

注意：

- online 参数用来区别是否是游客；
- userFlag 参数用来区分问数记录归属，userFlag 是大于 1 的数字；加载 js 资源最好判断一下是否已经加载过。

如接入成功，访问小助手浮窗宿主页面，右下角会出现浮动图标，如下图：

<img src="/img/sqlbot/embedding/project_float_demo.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 13 项目浮窗示例</div>

### 2.2 全屏模式


参考 assistant/full.vue 文件

    
<img src="/img/sqlbot/embedding/project_fullscreen.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 14 项目全屏</div>


如果是高级应用，必须登录才可以，因为要从页面获取凭证信息

接入成功页面如下


<img src="/img/sqlbot/embedding/project_fullscreen_demo.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 15 项目全屏示例</div>

### 2.3 页面嵌入


参考 embedded/index.vue 文件


<img src="/img/sqlbot/embedding/project_page.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 16 项目页面</div>


核心代码与全屏接入一样，只是调用 mounted 方法参数有区别。这里的 token 请在后端生成，避免泄漏 app secret。token 生成的逻辑是把 appId 和 account 作为 payload，appSecret 作为 secret。

接入成功页面如下


<img src="/img/sqlbot/embedding/project_page_demo.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 17 项目页面示例</div>


问数需要先选择数据源，与 SQLBot 页面一致


<img src="/img/sqlbot/embedding/project_page_demo2.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 18 项目页面示例 2</div>

### 2.4 高级应用 API 接口


接口基本信息：

<div style={{textAlign:"left",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2 获取数据源信息接口基本信息</div>

|项目 |描述|
|---|---|
|接口名称 |获取数据源信息|
|接口地址 |自定义(例如：/datasource)|
|请求方法 |GET|
|Content-Type |application/json|
|权限要求 |根据宿主系统|

响应说明：  
成功响应HTTP 

- 状态码：200

响应体结构：

<div style={{textAlign:"left",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3 响应体字段说明</div>

|名称 |类型 |示例值 |描述|
|---|---|---|---|
|code |Integer |200 |状态码，200 或者 0 成功|
|data |Array[ds] |[\{...\}, ...] |数据源信息|
|ds.name |String |demo-ds |名称，require|
|ds.type |String |pg |类型，require|
|ds.host |String |localhost |require|
|ds.port |Integer |5432 |require|
|ds.dataBase |String |sqlbot_demo |require|
|ds.user |String |root |require|
|ds.password |String |xxxx |require|
|ds.schema |String |public| |
|ds.comment |String |sqlbot-test-ds |描述，require|
|ds.tables |Array[table] |[\{...\},\{...\},...] |require|
|table.name |String |categories |require|
|table.sql |String | |sql 优先级高于 table.name|
|table.comment |String |商品品类表 |表描述，requre|
|table.fields |Array[field] |[\{...\},\{...\},...] |require|
|field.name |String |category_name |require|
|field.comment |String |品类名称 |require|
|field.type |String |TEXT |跟随具体数据库的字段类型 require|

响应示例：
```json
{
    "code": 200,
    "data": [
        {
            "name": "数据源" ,                   //（数据库IP  | 类型：string）
            "type": "mysql " ,                 //（数据库种类 | 类型：string）
            "host": "192.168.1.1 ",             //（数据库IP  | 类型：string）
            "port": 3306,                      //（数据库开放的端口 | 类型：integer(int32)）
            "user": "user",                     //（数据库用户名 | 类型：string）
            "password": "password",            //（数据库密码 | 类型：string）
            "dataBase": "sqlbot_demo",          //（数据库内的库名 | 类型：string）
            "schema": "schema",                //（数据库模式，部分数据库会有 | 类型：string）
            "comment": "数据源备注信息",         //（针对数据源的描述，可在数据源处查看编辑，详细的描述可以帮助 SQLBot 生成答案 | 类型：string）
            "tables": [ 
                                                  // 无权限规则的数据表
                {
                    "name": "数据表",             //（构建数据集的数据表名称 | 类型：string）
                    "comment": "数据表备注信息",  //（数据集的名字，详细的以及和问题相关的描述也能够帮助 SQLBot 生成答案 | 类型：string）
                    "rule": "",                //（DataEase 无具体赋值 在 SQLBot 中该该字段会传值给 AiModelQuestion类，帮助 AI 以字段内容规定回答格式 | 类型：string）
                    "fields": [
                        {
                            "name": "age",               //（字段名 | 类型：string）
                            "type": "bigint" ,          //（字段的数据类型 | 类型：string）
                            "comment": "字段 1备注信息"  //（字段描述 | 类型：string）
                        },
                        {
                            "name": "gender",            //（字段名 | 类型：string）
                            "type": "text" ,            //（字段的数据类型 | 类型：string）
                            "comment": "字段 2备注信息"  //（字段描述 | 类型：string）
                        }
                    ]
                },
                                               // 有权限限制的数据表，通过 SQL 字段来限制
                {
                    "name": "数据表2",            //（构建数据集的数据表名称 | 类型：string）
                    "comment": "数据表 2",       //（数据集的名字，详细的以及和问题相关的描述也能够帮助 SQLBot 生成答案 | 类型：string）
                    "rule": "" ,               //（DataEase 无具体赋值 在 SQLBot 中该字段会传值给 AiModelQuestion 类，帮助 AI 以字段内容规定回答格式 | 类型：string）
                    "sql": "select name, gender, class, score from student where class = 1 and score > 80 //（展示了数据表到数据集的 SQL 语句，当有行列权限限制时，将会进行一次查询的嵌套，实现行列权限的规定 | 类型：string）",
                    "fields": [
                        {
                            "name": "name",       //（字段名 | 类型：string）
                            "type": "TEXT" ,     //（字段的数据类型 | 类型：string）
                            "comment": "姓名"    //（字段描述 | 类型：string）
                        },
                        {
                            "name": "class" ,      //（字段名 | 类型：string）
                            "type": "int" ,       //（字段的数据类型 | 类型：string）
                            "comment": "字段2"    //（字段描述 | 类型：string）
                        },
                        {
                            "name": "score" ,      //（字段名 | 类型：string）
                            "type": "int" ,       //（字段的数据类型 | 类型：string）
                            "comment": "字段3"    //（字段描述 | 类型：string）
                        }
                    ]
                }
            ]
        }
    ]
}
```

API 接口可 预留 dsId、tableId 等参数，用于限定问数范围到指定数据源或数据表。在多数据源场景下，该方式可显著提升 问数执行效率与结果准确性。

问数之前，SQLBot 会在宿主页面获取凭证信息调用 API，可以利用 param 类型的凭证作为参数，但是要保证实时更新页面中的凭证。比如设置一个限定数据源 ID 的参数。


<img src="/img/sqlbot/embedding/advanced_interface.png" alt="示例" style={{maxWidth:'720px',width:'100%',display:'block',margin:'16px 0 6px',borderRadius:'4px'}} />
<div style={{fontSize:'14px',color:'#666',margin:'0 0 16px',textAlign:'center'}}>图 19 高级接口</div>


前端代码执行 localStorage.setItem(‘dsId’, xxx)

使用问数功能时，SQLBot 会获取存储在 localStorage 中的 dsId 拼接到 API 接口地址中 `http://localhost:3000/api/datasource?dsId=xxx`

若需要将问数范围精确限定到某一张数据表，只需要在宿主页面前端执行：

```
localStorage.setItem(‘dsId’, xxx);localStorage.setItem(‘tableId’, xxx)
```

