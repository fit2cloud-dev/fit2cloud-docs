---
title: "文件管理"
---

:::note

点击【项目管理-文件管理】，进入文件管理页面。

:::

![!文件管理](/img/metersphere/project_management/file_management/文件管理.png)

图 1  文件管理

## 1 模块管理

:::note

点击【添加子模块】，添加模块节点。

:::

![!添加子节点](/img/metersphere/project_management/file_management/添加子节点.png)

图 2  添加子节点

:::note[操作说明]

- 【展开/收缩】展开或收起左侧模块树全部节点。
- 【添加子模块】输入模块名称回车键进行保存。
- 【重命名】重命名节点。
- 【删除】删除操作会删除模块及其下所有资源，请谨慎操作！！！

:::

![!左侧节点功能](/img/metersphere/project_management/file_management/左侧节点功能.png)

图 3  左侧节点功能

## 2.上传文件

:::note

点击【添加文件】，选择文件类型，将文件拖拽到指定区域即可上传。以 JAR 文件上传为例。

:::

![!文件上传功能](/img/metersphere/project_management/file_management/文件上传功能.png)

图 4  文件上传功能

:::note

JAR 文件上传后，默认是【禁用】状态，需要点击【启用】，否则在接口前后置脚本中引用不到 JAR 包内容。

:::

![!启用jar包](/img/metersphere/project_management/file_management/启用jar包.png)

图 5  启用 jar 包

:::note[操作说明]

- 【下载】下载文件到本地。
- 【删除】删除文件，会导致关联该文件的用例执行失败，请谨慎操作！！！
- 【移动】移动文件到其他模块。
- 【开启/禁用】JAR 包需要设置为开启状态，否则在接口前后置脚本中无法引用对应 JAR 包内容。
- 【切换显示】文件列表形式切换到图形样式。

:::

![!上传文件功能操作](/img/metersphere/project_management/file_management/上传文件功能操作.png)

图 6  上传文件功能操作

![!上传文件展示形式](/img/metersphere/project_management/file_management/上传文件展示形式.png)

图 7  上传文件展示形式

## 3 存储库

:::note

点击【添加存储库】，对接第三方仓库，如 Gitea、GitHub、GitLab、Gitee 和其他仓库等。

:::

![!第三方仓库](/img/metersphere/project_management/file_management/第三方仓库.png)

图 8  第三方仓库

![!第三方具体仓库](/img/metersphere/project_management/file_management/第三方具体仓库.png)

图 9  第三方具体仓库

:::note

以 Gitea 仓库为例，【存储库地址】要以【.git】结尾，输入 Token 后，点击【测试连接】验证输入信息是否正确。

:::

![!gitea仓库为例](/img/metersphere/project_management/file_management/gitea仓库为例.png)

图 10  Gitea 仓库为例

:::note

点击【储存库-添加文件】，填写分支和文件路径。

:::

![!配置存储库拉取文件](/img/metersphere/project_management/file_management/配置存储库拉取文件.png)

图 11  配置存储库拉取文件

:::note[操作说明]

- 【下载】下载文件到本地。
- 【删除】删除文件，会导致关联该文件的用例执行失败，请谨慎操作！！！

:::

![!拉取文件下来的功能](/img/metersphere/project_management/file_management/拉取文件下来的功能.png)

图 12  拉取文件下来的功能
