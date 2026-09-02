## 接入客户端

完成网关部署与管理员配置后，即可将客户端接入 1Panel AI 网关。以下分别说明 Work Buddy、DeepSeek Harness、codex 三类客户端的接入步骤。

### 接入 Work Buddy

首先查看模型名称：登录管理端后，在「模型管理」或「用户组」页面查看当前已配置的模型标识，后续客户端配置需使用完全一致的模型名称。

![图1：查看模型名称](/img/1panel/ai/image1_view_model_names.png)
<center><em>图1：查看模型名称</em></center>

该用户需要创建 API Key：进入「API Key 管理」页面，为该用户或用户组创建新的 API Key。Key 仅在创建时完整显示一次，请务必立即复制保存。

![图2：创建 API Key](/img/1panel/ai/image2_create_apikey.png)
<center><em>图2：创建 API Key</em></center>

复制 API Key：妥善保管生成的 Key，避免泄露。如 Key 遗忘或泄露，需在管理端重新生成并更新所有客户端配置。

![图3：复制 API Key](/img/1panel/ai/image3_copy_apikey.png)
<center><em>图3：复制 API Key</em></center>

下载好 Work Buddy 客户端后，点击配置自定义模型：在客户端设置中找到「自定义模型」或「添加模型」入口。

![图4：配置自定义模型](/img/1panel/ai/image4_workbuddy_custom_model.png)
<center><em>图4：配置自定义模型</em></center>

提供商选择自定义：类型选择「自定义」或「OpenAI 兼容」，不要选择预设的 OpenAI 官方选项。

![图5：选择自定义提供商](/img/1panel/ai/image5_select_custom_provider.png)
<center><em>图5：选择自定义提供商</em></center>

填入：

- 接口地址（Base URL）：`https://1router.1panel.cn/v1`
- API Key：刚才复制的 API Key
- 模型名称：系统用户中配置好的模型名称

三者需完全一致。

![图6：填写接入配置](/img/1panel/ai/image6_fill_integration_config.png)
<center><em>图6：填写接入配置</em></center>

> 注意：接口地址末尾的 `/v1` 路径不可省略，部分客户端会自动补全，但建议显式写入以避免请求失败。

点击保存，选择刚才配置的模型进行测试：在模型列表中发送测试消息，验证请求是否正常返回。

![图7：保存并测试模型](/img/1panel/ai/image7_save_and_test_model.png)
<center><em>图7：保存并测试模型</em></center>

若请求返回 401 或 403，请优先检查 API Key 是否有效、是否复制完整；若返回 404，请检查接口地址与模型名称是否与配置一致。

### 接入 DeepSeek Harness

进入 DeepSeek Harness，点击设置、模型、添加自定义提供方。

![图8：添加自定义提供方](/img/1panel/ai/image8_deepseek_harness_add_provider.png)
<center><em>图8：添加自定义提供方</em></center>

自定义提供方：在请求中唯一标识该提供方，并用于派生凭据名。配置好显示名称、API 地址、API 密钥，API 协议默认即可，可以点击获取可用，若获取不了可以点击添加。

![图9：填写提供方配置](/img/1panel/ai/image9_fill_provider_config.png)
<center><em>图9：填写提供方配置</em></center>

选择配置好的模型进行测试：保存后在底部输入框左侧的提供商下拉菜单中选择刚添加的提供方，发送消息验证连接。

![图10：选择模型并测试](/img/1panel/ai/image10_deepseek_select_test_model.png)
<center><em>图10：选择模型并测试</em></center>

### 接入 codex

Codex CLI 本身不提供可视化的供应商管理界面，直接修改 `~/.codex/config.toml` 的方式门槛较高。这里借助 CC Switch 这一小工具完成配置：它负责管理 Codex 的供应商配置，并把请求路由到 1Panel AI 网关，无需手工编辑配置文件。

首先下载并安装 CC Switch，安装完成后打开软件，进入供应商管理界面，点击右上角「添加」按钮，新建一个供应商配置。

![图11：点击添加](/img/1panel/ai/image11_ccswitch_add_button.png)
<center><em>图11：点击添加</em></center>

在弹出的表单中选择「自定义配置」，并填写以下信息：

- API Key：粘贴在 1Panel AI 网关管理端创建的 API Key
- API 请求地址：`https://1router.1panel.cn/v1`（注意末尾的 `/v1` 不可省略）

同时打开「本地路由映射」开关。该功能会在本机启动一个代理地址，Codex 的请求先发往本地代理，再由 CC Switch 转发到 1Panel AI 网关，从而绕开 Codex 对官方接口地址的限制。

![图12：填写配置并启用路由](/img/1panel/ai/image12_enter_apikey_enable_routing.png)
<center><em>图12：填写配置并启用路由</em></center>

点击「获取模型列表」，CC Switch 会通过网关的 `/v1/models` 接口拉取当前可用的模型。在返回的列表中选择要使用的模型（或手动添加，名称需与管理端模型映射中的请求模型名称完全一致），确认无误后点击「添加」按钮保存该供应商配置。

![图13：获取模型列表并提交](/img/1panel/ai/image13_fetch_model_list_submit.png)
<center><em>图13：获取模型列表并提交</em></center>

回到 CC Switch 的开始界面，在供应商列表中选中刚创建的配置，点击「启动」，CC Switch 会将本地路由代理与 Codex 配置一并写入。之后重启 codex（退出正在运行的 Codex CLI 进程后重新启动），使新配置生效。

![图14：重启 codex](/img/1panel/ai/image14_restart_codex_after_ccswitch.png)
<center><em>图14：重启 codex</em></center>

在 codex 中发起一次对话测试：选择映射到 1Panel AI 网关的模型（如 `1Panel-Auto`），发送一条简单消息。若能正常返回回复，说明整条链路（codex → CC Switch 本地路由 → 1Panel AI 网关 → 上游模型）已经打通；若报 401 请检查 API Key，若报 404 请核对请求地址与模型名称。

![图15：codex 测试对话](/img/1panel/ai/image15_codex_select_model_test.png)
<center><em>图15：codex 测试对话</em></center>
