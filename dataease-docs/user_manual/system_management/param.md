---
title: 系统参数
---

## 1 基础设置

![系统设置](/img/dataease/system_management/系统设置.png)

图 1  系统设置

:::note

如下图所示，可设置请求超时时间、数据源检测时间间隔，日志保留时间。  
通过 X-Pack 进行认证设置或平台对接后，可以设置是否开启第三方自动创建用户、用户组织和角色。 
可以配置嵌入式数据导出方式 、告警数据限制、 电子表格查询数量上限。
:::

![系统管理界面](/img/dataease/system_management/基础设置.png)

图 2  基础设置

:::note

支持设置请求超时时间、后台导出文件 / 操作日志 / 阈值告警记录保留时间与数据源有效性检测的间隔时间。
:::

![数据源检测时间](/img/dataease/system_management/数据源检测时间.png)

图 3  数据源检测时间

:::note

支持全局禁用分享链接功能与开启分享有效期密码必填。
禁用分享链接功能后，所有在此之前创建的分享链接将无法访问。
开启分享有效期密码必填后，之前创建的所有分享链接将无法访问
:::

![全局禁用分享链接设置](/img/dataease/newimg/新增全局禁用分享链接设置1.png)

图 4  全局禁用分享链接设置

:::note

禁用分享后访问分享链接将显示以下页面：
:::

![全局禁用分享链接设置](/img/dataease/newimg/新增全局禁用分享链接设置2.png)

图 5  全局禁用分享链接设置

:::note

开启分享有效期密码必填后，创建分享链接时，系统将提示有效期和密码为必填项。
:::

![全局分享链接有效期和密码必填设置](/img/dataease/newimg/新增全局分享链接有效期和密码必填设置2.png)

图 6  全局分享链接有效期和密码必填设置

:::note

未设置有效期和密码的分享链接访问时会显示以下页面：
:::

![全局分享链接有效期和密码必填设置](/img/dataease/newimg/新增全局分享链接有效期和密码必填设置3.png)

图 7  全局分享链接有效期和密码必填设置

:::note

系统设置增加页面打开方式选项。
:::

![系统设置增加页面打开方式选项](/img/dataease/newimg/系统设置增加页面打开方式选项.png)

图 8  系统设置增加页面打开方式选项

:::note

增加资源默认排序方式的配置项。  
系统管理员可以设置各类资源的默认排序方式，用户则可以根据个人需求调整资源的排序。用户自定义的排序方式将保存在浏览器本地，优先级高于系统默认设置。
:::

![增加资源默认排序方式的配置项](/img/dataease/newimg/增加资源默认排序方式的配置项.png)

图 9  增加资源默认排序方式的配置项

:::note

可以配置数据集跨源功能是否开启，开启后会在数据集界面顶部展示跨源的功能开关，开启跨源后需使用 Calcite 语法。
:::

![增加资源默认排序方式的配置项](/img/dataease/newimg/增加资源默认排序方式的配置项.png)

图 10  增加资源默认排序方式的配置项

![数据集跨源开启效果](/img/dataease/newimg/数据集跨源开启效果.png)

图 11  数据集跨源开启效果

:::note

可以配置告警数量与电子表格查询数量上限。
:::

![告警与电子表格限制](/img/dataease/newimg/告警与电子表格限制.png)

图 12  告警与电子表格限制

## 2 邮件设置

:::note

用户可通过配置邮件的基本信息，来接收仪表板分享、数据集同步或数据源失效的信息。
:::

![地图设置1](/img/dataease/system_management/邮件设置.png)

图 13  邮件设置

## 3 地图设置

### 3.1 自定义区域

:::note

地图支持自定义区域及其区域下钻。在【系统设置】→【系统参数】→【地图设置】中，可以添加自定义地理区域，并对中国省份进行自定义组合。
:::

![地图自定义区域及其区域下钻](/img/dataease/newimg/地图支持自定义区域及其区域下钻.png)

图 14  地图自定义区域及其区域下钻

![地图自定义区域及其区域下钻](/img/dataease/newimg/地图支持自定义区域及其区域下钻2.png)

图 15  地图自定义区域及其区域下钻

:::note

在地图和气泡地图等离线地图中，可以选择并显示自定义区域，在维度中添加区域字段（数据值如东区、南区、北区）。配置区域与省份的下钻，可支持从区域下钻到省份。
:::

![地图自定义区域及其区域下钻](/img/dataease/newimg/地图支持自定义区域及其区域下钻3.png)

图 16  地图自定义区域及其区域下钻

![地图自定义区域及其区域下钻](/img/dataease/newimg/地图支持自定义区域及其区域下钻.gif)

图 17  地图自定义区域及其区域下钻

### 3.2 地理信息

:::note

支持设置自定义地图文件。
:::

![地图设置1](/img/dataease/system_management/地图界面.png)

图 18  地图界面

![地图设置2](/img/dataease/system_management/添加地图文件.png)

图 19  添加地图文件

:::note

**世界各国的地图文件可以自行在网上下载。**  
**提示：** 因为各个国家的行政架构不一致，无法统一处理，目前世界地图不支持钻取。  
1.下载指定国家的 geo 地图文件，文件缀名需修改为 .json，如下载俄罗斯的 russia.geojson 改为 russia.json；
`https://github.com/codeforgermany/click_that_hood/blob/main/public/data/russia.geojson`；  
2.确认 geo 文件是否正确，并在 properties 中包含 name 字段；
:::

![地图设置geo文件](/img/dataease/system_management/地图设置geo文件.png)

图 20  地图设置geo文件

:::note

3.在下拉框中选择该国家，如俄罗斯地区的代码为 643，区域代码会自动填充 643100000；
:::

![俄罗斯地图](/img/dataease/system_management/下拉框选择俄罗斯.png)

图 21  下拉框选择俄罗斯

:::note

4.在 DataEase 中创建俄罗斯地图；
:::

![俄罗斯地图](/img/dataease/system_management/俄罗斯地图.png)

图 22  俄罗斯地图

:::note

5.创建测试数据文件；
:::

![数据文件](/img/dataease/system_management/数据文件.png)

图 23  数据文件

:::note

country 需要和地球村文件里的 name 字段名称保持一致；
:::

![country](/img/dataease/system_management/country.png)

图 24  地理信息

:::note

province 需要和国家 geo 文件中 properties 下的 name 字段保持一致；
:::

![province](/img/dataease/system_management/地图设置geo文件.png)

图 25  地图设置geo文件

:::note

6.制作俄罗斯地图视图，在地图中选择俄罗斯即可；
:::

![俄罗斯](/img/dataease/system_management/俄罗斯.png)

图 26  俄罗斯

![世界地图](/img/dataease/system_management/世界地图.png)

图 27  世界地图

### 3.3 在线地图

:::note

在线地图（符号地图、流向地图、热力地图）支持以下地图服务类型：高德地图、天地图、腾讯地图，以及**自定义地图**（自建或第三方瓦片 / Style 底图）。前三种需申请并配置对应的地图 Key；自定义地图无需 Key，按服务类型填写瓦片地址或 Style JSON 地址即可。当前页面保存的地图服务即为 DataEase 仪表板和数据大屏中使用的地图服务。更改地图服务后，需刷新仪表板或数据大屏以使更改生效。

天地图：

- 创建 Key 的官方文档：[天地图授权指南](http://lbs.tianditu.gov.cn/authorization/authorization.html)。
- 限制：
    - 不支持去除地图标注。
    - 不支持地图倾斜。  

腾讯地图：

- 创建 Key 的官方文档：[腾讯地图开发指南](https://lbs.qq.com/mobile/androidMapSDK/developerGuide/getKey)。
- 主题配置参考：[个性地图](https://lbs.qq.com/dev/console/custom/mapStyle)。

高德地图：

- 创建 Key 的官方文档：[高德开放平台官网](https://lbs.amap.com/)。
- 支持自定义地图风格：[自定义地图风格步骤参考](https://kb.fit2cloud.com/?p=2f66b59f-1e89-4263-8db3-8bc5ec4a56c1)。  
  （说明：此处为高德控制台中的个性化风格 URL，与下文「自定义地图」不是同一能力。）
:::

![在线地图天地图、腾讯地图](/img/dataease/newimg/在线地图支持天地图、腾讯地图1.png)

图 28  在线地图天地图、腾讯地图

:::note

自定义地图：

- 适用场景：使用自建瓦片服务、内网地图服务，或其他兼容标准协议的第三方底图，作为在线地图底图。
- 服务类型二选一：
    - **栅格瓦片 URL**：填写标准 `\{z\}/\{x\}/\{y\}` 瓦片地址模板（示例：`http://localhost:18080/\{z\}/\{x\}/\{y\}.png`）。切片方案支持 XYZ / TMS，瓦片尺寸支持 256 / 512。
    - **矢量地图 Style JSON**：填写完整的 MapLibre Style JSON 地址（示例：`http://localhost:18081/styles/basic-preview/style.json`）。Style 中引用的瓦片、字体、图标等资源需允许浏览器跨域访问。
- 可选配置：最小 / 最大缩放层级（0–24，最多 1 位小数）、是否显示版权说明及版权文案。
- 注意：
    - 自定义地图不需要填写厂商 Key / 安全密钥。
    - 若页面为 HTTPS，地图资源也需使用 HTTPS，否则可能被浏览器拦截。
    - 地址中的 `localhost` 指向访问者本机；远程访问时请改为浏览器可访问的服务地址。
    - 与【地理信息】中上传 GeoJSON 自定义区域文件、以及高德「自定义地图风格」均不同，请按实际需求选择。
:::

![自定义地图](/img/dataease/system_management/自定义地图.png)

图 29  选择数据源

:::note

举例配置高德地图 Key 步骤：
:::

![高德【平台](/img/dataease/system_management/高德平台.PNG)

图 30  高德平台

:::note

选择【文档与支持】-&gt;【API】-&gt;【web 服务 API】。
:::

![web服务](/img/dataease/system_management/高德平台.PNG)

图 31  高德平台

:::note

点开【开发指南】-&gt;【获取 Key】。
:::

![开发指南](/img/dataease/system_management/高德开发指南.PNG)

图 32  高德开发指南

:::note

登录【高德开放平台控制台】，注册开发者，后续按照文档进行即可。
:::

![地图指南](/img/dataease/system_management/高德地图指南.PNG)

图 33  高德地图指南

:::note

如下即为验证成功，以及创建应用获取 Key。
:::

![高德验证成功](/img/dataease/system_management/高德验证成功.PNG)

图 34  高德验证成功

![高德创建应用](/img/dataease/system_management/高德创建应用.png)

图 35  高德创建应用

![高德添加KEY](/img/dataease/system_management/高德添加KEY.png)

图 36  高德添加KEY

:::note

在 DataEase 在线地图 Key 配置中，填入获取的地图服务 Key，点击保持即可。
:::

![配置KEY](/img/dataease/system_management/配置KEY.png)

图 37  填写连接信息

## 4 引擎设置

:::note

默认数据引擎是 DataEase 自带的 MySQL，用以存储 Excel 及 API 数据集数据。目前该引擎跟随元数据的类型进行变化，更改方式参考外部数据库部署文档；  
系统会自动检查是否设置了引擎参数，若无设置，则读取 dataease.properties 配置文件中 MySQL 连接信息，并填入其中。
:::

![MySQL设置](/img/dataease/system_management/引擎管理.png)

图 38  填写连接信息
