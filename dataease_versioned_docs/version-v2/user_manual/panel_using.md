---
title: 数据大屏使用
---

## 1 分享公共链接

:::note

点击下图中所示位置，创建公共链接进行数据大屏分享。
:::

![仪表板_创建公共链接](/img/dataease-v2/panel_generation/数据大屏进行分享.png)

![仪表板_创建公共链接](/img/dataease-v2/panel_generation/数据大屏进行分享2.png)

:::note

打开下图中所示链接分享的按钮，链接自动生成，点击【复制链接】进行分享。  
**分享链接可设置有效期及密码保护。**
:::

![仪表板_创建公共链接_复制链接](/img/dataease-v2/dashboard_generation/数据大屏设置公共链接.png)

:::note

支持自定义公共链接后缀。
:::
![更新1](/img/dataease-v2/newimg/1.21%20支持自定义公共链接后缀1.png)![更新1](/img/dataease-v2/newimg/1.21%20支持自定义公共链接后缀2.png)
:::note

支持自定义公共链接密码。
:::

![更新1](/img/dataease-v2/newimg/1.22%20公共链接支持自定义密码.png)

:::note

公共连接复制链接和密码可以直接访问。
:::

![更新1](/img/dataease-v2/newimg/数据大屏公共连接复制链接和密码可以直接访问.png)

:::note

公共链接功能现已集成 Ticket 机制，公共链接外部参数可以直接在 Ticket 参数中简易设置，增强外部传参的安全性和灵活性。  
**注意：设置 Ticket 的同时，需要开启 [设置仪表板外部参数](./panel_basicfunctions#8-外部参数设置)。**   
打开 Ticket 设置，并单独配置其有效期与参数，每个 Ticket 均可独立设定有效期，例如配置有效期为 30 天，参数为 \{"国家":"Lebanon"\}：
:::

![更新1](/img/dataease-v2/newimg/ticket设置.png)

![更新1](/img/dataease-v2/newimg/添加ticket.png)

:::note

复制 Ticket 链接，那么，使用 Ticket 的公共链接格式为 https://example.dataease.com/link/bcg48L2W?ticket=xk59xiHJ。在此情况下，无需传递 Ticket 参数，DataEase 将从数据库自动获取 Ticket 相关参数。当启用 Ticket “必选”选项时，只有在 URL 中附带 ticket 参数的情况下，公共链接才能被成功访问。
:::

![更新1](/img/dataease-v2/newimg/复制ticket链接.png)

## 2 数据大屏导出

:::note

点击下图中所示位置，导出数据大屏的模板、应用、PDF、图片到本地，可在本地的下载目录中查看。
:::

![仪表板_导出为模版](/img/dataease-v2/dashboard_generation/数据大屏导出.png)

:::note

**注意：分类中样式模板与应用模板的区别：**

- **样式模板** ：更注重仪表板本身的样式设计布局等内容，DataEase 生成仪表板并附带示例数据，需要根据自己的数据情况自行手动创建数据源、数据集并将仪表板中的示例数据替换为自己的真实数据；
- **应用模板** ：有一定的针对性，适用于应用系统的对接，例如 DataEase 日志应用。DataEase 生成仪表板并同时生成其所对应的数据集，无需再手动替换数据。

**关于样式模板与应用模板的详细差异可参考** ：https://kb.fit2cloud.com/?p=72aab3f5-2706-4c6c-a0e9-6dcd58aa00a0。
:::

![模板内容](/img/dataease-v2/template_market/模板内容.png)

## 3 数据大屏预览

:::note

点击下图中所示位置，新打开页面预览。
:::

![仪表板_预览](/img/dataease-v2/dashboard_generation/数据大屏预览.png)

## 4 数据大屏刷新

:::note

数据大屏新刷新提供手动与自动两种方式。自动刷新支持开关控制，可开启固定刷新功能，实时刷新数据，若当前仪表板一般长时间无数据更新，不需要固定刷新功能则可关闭此功能，完成配置后需保存仪表板进入预览界面查看效果。
具体设置如下：

- 刷新频率：可以通过输入时间（以秒为单位）设置数据大屏的自动刷新间隔。例如，设置为 10 秒表示每 10 秒刷新一次数据，确保显示的数据是最新的。  
- 整体刷新：勾选此选项后，数据大屏会在每次刷新时重载整个浏览器页面内容。适合那些希望页面全局数据和样式都保持最新的情况。注意整体刷新仅公共链接和新 Tab 预览生效，避免在设计时频繁刷新影响编辑体验。  
- 图表加载提示：开启后当数据大屏图表在刷新或加载时，会显示一个加载中的提示，告知用户当前正在获取或更新数据。
:::

![仪表板_刷新](/img/dataease-v2/dashboard_generation/数据大屏刷新设置.png)

:::note

同时，数据大屏提供手动刷新按钮，用户需要时可自行点击进行刷新。
:::

![仪表板_刷新](/img/dataease-v2/dashboard_generation/数据大屏刷新.png)

## 5 数据大屏全屏

:::note

数据大屏新支持一键全屏预览。
:::

![仪表板_刷新](/img/dataease-v2/dashboard_generation/数据大屏全屏.png)

## 6 移动端访问

:::note

数据大屏支持移动端直接访问数据大屏。数据大屏没有单独移动端设置，可在大屏配置中设置手机合适对尺寸。
:::

![更新1](/img/dataease-v2/newimg/支持移动端访问数据大屏.png)

