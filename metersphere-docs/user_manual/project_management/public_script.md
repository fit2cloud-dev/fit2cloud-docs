---
title: "公共脚本"
---

:::note

维护当前项目接口测试里使用的参数、前后置脚本。<br />
点击【项目管理-公共脚本-添加公共脚本】，进入添加公共脚本页面。

:::

![!公共脚本页面](/img/metersphere/project_management/public_script/公共脚本页面.png)

图 1  公共脚本页面

:::note

设置【传递参数】时，参数值使用内置 Mock 函数和 JMeter 函数。以 Mock 函数为例。

:::

![!公共脚本使用内置函数](/img/metersphere/project_management/public_script/公共脚本使用内置函数.png)

图 2  公共脚本使用内置函数

:::note

设置【公共脚本】时，需选择脚本语言类型，然后自定义脚本。此处以导入 API 定义的登录接口获取 Token 为例。

:::

![!公共脚本新增脚本](/img/metersphere/project_management/public_script/公共脚本新增脚本.png)

图 3  公共脚本新增脚本

:::note

编写【公共脚本】完成后，点击【调试】，【执行结果】控制台打印了需要的 Token，点击【保存】即可。

:::

![!项目设置](/img/metersphere/project_management/public_script/脚本调试通过.png)

图 4  脚本调试通过

:::note

将参数进行参数化，并在脚本里进行引用。

:::

![!项目设置](/img/metersphere/project_management/public_script/传递参数.png)

图 5  传递参数

:::note

【公共脚本】保存后，在【接口测试-接口-前置-引用公共脚本】处，点击【引用公共脚本】即可进行引用。

:::

![!引用公共脚本](/img/metersphere/project_management/public_script/引用公共脚本.png)

图 6  引用公共脚本

![!选择公共脚本进行引用](/img/metersphere/project_management/public_script/选择公共脚本进行引用.png)

图 7  选择公共脚本进行引用

![!选择公共脚本进行引用](/img/metersphere/project_management/public_script/接口执行公共脚本.png)

图 8  接口执行公共脚本

:::note[操作说明]

- 【编辑】编辑公共脚本名称、状态、标签、参数、脚本等内容。
- 【删除】删除脚本可能会导致引用该脚本的测试用例执行失败，请谨慎操作！！！

:::

![!公共脚本的功能操作](/img/metersphere/project_management/public_script/公共脚本的功能操作.png)

图 9  公共脚本的功能操作
