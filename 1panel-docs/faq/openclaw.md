---
title: OpenClaw 相关
---

## 1 OpenClaw 是什么？

OpenClaw 是一个运行在你自己设备上的个人 AI 助理。它可以在你已经使用的各种沟通渠道中与你对话，包括：飞书、钉钉、企业微信、QQ、WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、Microsoft Teams、WebChat 等。

如果你想要一个可以在本地 7x24 运行的个人 AI 助理，那就是它了。

## 2 1Panel 如何安装 OpenClaw？

OpenClaw 支持通过 1Panel 的智能体功能快速部署，具体可参考 [安装部署文档](./../user_manual/appstore/openclaw)。

## 3 如何通过 Ollama 运行本地模型？


OpenClaw 支持对接 Ollama 本地大模型，无需依赖云端 Token，即可在本地完成对话与推理，兼顾隐私与成本。

了解更多 OpenClaw 与 Ollama 的集成方式，请参考：[OpenClaw 集成 Ollama 本地模型](https://openclaw.club/quick-start) 。

## 4 OpenClaw 从 v7.1 升级到 v9.1 或更高版本失败怎么办？

OpenClaw v7.1 无法通过应用商店直接升级到 v9.1 或更高版本，需要手动修改 Compose 文件并执行修复命令。步骤如下：

1. 进入 OpenClaw v7.1 的安装目录，修改 Compose 文件中的 Image 版本为 v9.1。

    ![应用列表中选择 OpenClaw 参数设置](/img/1panel/faq/openclaw_upgrade_image_version.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1 OpenClaw 从 v7.1 升级到 v9.1 或更高版本失败怎么办？界面</div>

    ![修改 docker-compose.yml 中的 image 版本](/img/1panel/faq/openclaw_upgrade_compose_edit.png)
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2 OpenClaw 从 v7.1 升级到 v9.1 或更高版本失败怎么办？界面（续）</div>

2. 在 OpenClaw 目录下执行以下命令：

    ```bash
    docker compose config --services
    ```

    这一步会返回你的 Service 名称，以下以 openclaw 作为 Service 名称进行操作。

    ```bash
    docker compose stop openclaw
    docker compose run --rm --no-deps openclaw openclaw doctor --fix
    docker compose up -d
    ```

3. 完成后应用商店中显示的版本没有变化，这是正常现象。后续再升级到 v9.2 版本即可。