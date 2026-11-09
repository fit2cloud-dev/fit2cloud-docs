---
title: 配置 GPU 驱动
description: 介绍在服务器上安装 NVIDIA GPU 驱动的方法，以及 1Panel 无法识别 GPU 时的排查步骤。
---

## 1 NVIDIA GPU 驱动安装指南

让 1Panel 识别并使用 NVIDIA GPU，需要在服务器上完成两项安装：**NVIDIA GPU 驱动**使操作系统识别显卡并提供 `nvidia-smi` 等管理工具；**NVIDIA Container Toolkit** 使 Docker 容器能够调用宿主机 GPU。本文只涉及这两项安装及其配置。需要注意，NVIDIA Container Toolkit 是容器运行时组件，与提供 `nvcc` 等开发工具的 CUDA Toolkit 不是同一个软件；vLLM、Ollama 等容器镜像通常已内置所需的 CUDA 运行环境，宿主机一般无需单独安装 CUDA Toolkit。

### 1.1 安装 NVIDIA GPU 驱动

先在终端执行 `nvidia-smi`。若能正常返回显卡型号、驱动版本与显存信息，说明驱动已就绪，可跳过本节；若提示命令不存在或返回错误，按以下步骤安装（以 Ubuntu 为例，需 root 权限）：

```bash
# 更新系统与内核，完成后重启
sudo apt update && sudo apt upgrade -y
sudo reboot
```

重启后重新登录，查看适用于当前显卡的驱动分支：

```bash
# 若提示 ubuntu-drivers 命令不存在，先执行：sudo apt install -y ubuntu-drivers-common
sudo ubuntu-drivers list --gpgpu
```

由工具自动安装最匹配的服务器版驱动，安装后重启：

```bash
sudo ubuntu-drivers install --gpgpu
sudo reboot
```

也可以按上一步输出的分支号指定版本，例如 `sudo ubuntu-drivers install --gpgpu nvidia:580-server`，分支号以 `ubuntu-drivers list --gpgpu` 的实际输出为准。

再次执行 `nvidia-smi` 确认驱动生效，也可用 `cat /proc/driver/nvidia/version` 查看已加载的驱动版本。

:::caution[启动与兼容]

- 开源驱动 `nouveau` 与 NVIDIA 专有驱动冲突，若 `nvidia-smi` 返回 `No devices were found`，先执行 `lsmod | grep nouveau` 检查，有输出则需禁用该模块、执行 `sudo update-initramfs -u` 并重启后再验证。
- 驱动与内核、操作系统和硬件型号相关。升级内核或驱动可能影响现有 GPU 工作负载，生产环境应先确认兼容性并安排维护窗口。
- `ubuntu-drivers` 默认安装已签名驱动，可兼容开启 Secure Boot 的机器。
- 执行 `ubuntu-drivers` 时输出多行 `udevadm hwdb is deprecated` 属于 Ubuntu 工具链的提示，不影响驱动安装结果。

:::

### 1.2 安装 NVIDIA Container Toolkit

NVIDIA 官方安装指南将「已安装 GPU 驱动」列为前置条件，请先完成 1.1。以下命令需写入系统目录，请逐条带 `sudo` 执行（已切换到 root 的可省略 `sudo`），导入 NVIDIA 官方 GPG 密钥、添加软件源并安装 NVIDIA 容器工具包：

```bash
# 导入 NVIDIA 官方 GPG 密钥
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey \
| gpg --dearmor \
| sudo tee /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg > /dev/null

# 添加 NVIDIA 软件源
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
| sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
| sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

# 更新软件包列表
sudo apt update

# 安装 NVIDIA 容器工具包
sudo apt install -y nvidia-container-toolkit
```

在国内网络环境下，从 `nvidia.github.io` 下载软件包可能较慢，请耐心等待，不要中途中断命令。

### 1.3 配置 Docker

:::caution[仅安装 Toolkit 还不够]

工具包安装完成并不等于 Docker 已能识别 NVIDIA 运行时。若跳过本节直接安装带 GPU 支持的应用（如 Ollama），启动时会报 `could not select device driver "nvidia" with capabilities: [[gpu]]`。

:::

部分新版本 1Panel 支持可视化配置：进入左侧菜单 **容器 → 配置 → 基础配置**，打开 **NVIDIA GPU 支持** 开关即可。该选项用于注册 NVIDIA 容器运行时，页面提示为「注册 NVIDIA 容器运行时，需要先安装 NVIDIA Container Toolkit。具体容器仍需单独分配 GPU」。也就是说，开启开关只是让 Docker 具备 GPU 运行时，具体应用仍需在创建时启用 GPU 加速并分配设备。**稳定版面板若没有该开关，请直接使用下方的命令行方式，两者等价。**

如需自行维护配置文件，可编辑 `/etc/docker/daemon.json`，或执行 NVIDIA 官方命令生成运行时配置（会自动修改该文件并保留已有的镜像加速等配置）：

```bash
sudo nvidia-ctk runtime configure --runtime=docker
```

配置文件中的 NVIDIA runtime 与镜像加速示例如下：

```json
{
  "registry-mirrors": [
    "https://docker.1panel.live",
    "https://status.anye.xyz",
    "https://docker.1ms.run",
    "https://docker.m.ixdev.cn",
    "https://hub.rat.dev",
    "https://docker.xuanyuan.me",
    "https://dockerproxy.net",
    "https://images.cloudlayer.icu"
  ],
  "runtimes": {
    "nvidia": {
      "args": [],
      "path": "nvidia-container-runtime"
    }
  }
}
```

修改后重启 Docker 并验证容器能否访问 GPU。以普通用户执行时，Docker 命令需要 `sudo`（或将用户加入 `docker` 组并重新登录）：

```bash
sudo systemctl restart docker

# CUDA base 镜像仅作示例，可任选带 nvidia-smi 的镜像
sudo docker run --rm --gpus all nvidia/cuda:12.2.0-base-ubuntu22.04 nvidia-smi
```

### 1.4 在 1Panel 中使用 GPU

驱动与容器运行时配置完成后，可在 1Panel 左侧菜单 **AI → GPU 管理** 查看显卡状态（部分版本仍称「GPU 监控」）。该页面包含三个标签页：

- **设备概览**：显示环境检查结果、NUMA 拓扑，以及显卡型号、驱动版本、CUDA 版本、卡数量、系统共享内存等信息，并展示 GPU 使用率、系统共享内存占用、温度、功耗、频率、风扇转速与进程数等监控数据。
- **GPU 分组**：按分组复用 GPU 与 NUMA 配置，分组之间允许成员重叠，但不提供 GPU 独占或显存隔离。
- **历史监控**：查看 GPU 使用率、系统共享内存、功耗、温度、频率、进程数、显存读写活跃率与引擎使用率的历史趋势。

在应用商店安装 Ollama 等应用时，勾选「开启 GPU 支持」或「GPU 加速」即可让容器使用显卡；**Ollama 管理** 页面会检测已安装的 Ollama，未检测到时提示前往应用商店安装。安装应用后，还可在 **AI → 模型服务** 中统一接入公有云、本地推理引擎和 AI 网关等模型服务，供 1Panel 内置智能体及外部智能体调用；**AI → 基准测试** 可对模型服务进行吞吐量、首 Token 延迟等指标测试。

以 vLLM 为例，新版 1Panel 在 **AI → vLLM 管理** 中提供「模型准备 / 模型部署 / 精选模型 / 模型下载 / vLLM Recipes / 设置」等标签页：

- **精选模型**：浏览官方精选模型的规格、适用场景及下载来源，字段包括模型名称、模型类别、权重提供商、模型类型、骨干参数、激活参数、权重体积与描述。
- **模型部署**：通过「新增实例」将已下载的模型部署为模型服务，列表展示名称、版本、端口、模型、状态、服务状态、日志、资源使用率与创建时间。
- **vLLM Recipes**：保存和管理模型的启动命令，部署时可直接选用，也可从 `recipes.vllm.ai` 导入。Recipe 分为「系统同步」与「自定义」两类，包含名称、类型、GPU 类型、模型、描述等字段，支持部署、克隆与编辑。新版以 Recipe 管理启动命令，不再使用旧版的启动命令模板。
- **设置**：配置模型目录、分词器目录，以及 HuggingFace、ModelScope 的加速地址与访问 Token。

:::caution[模型与硬件匹配]

启动命令中的端口需与实际部署端口保持一致；模型的精度与体积须与显存、GPU 架构匹配，例如 FP8、NVFP4 等量化模型对硬件有特定要求，请按实际显卡选择。部分机型需使用对应的 CUDA 版本镜像。

:::

### 1.5 1Panel 无法识别 GPU 的排查

**1. 终端执行 `nvidia-smi` 提示命令不存在或没有输出**

**处理方式**：说明宿主机驱动未安装或未生效，回到 1.1 重新安装驱动并重启，确认 `nvidia-smi` 能返回显卡信息后再检查 1Panel。

**2. `nvidia-smi` 返回 `No devices were found`**

**处理方式**：先检查开源驱动 `nouveau` 是否占用显卡，禁用后重建 initramfs 并重启：

```bash
lsmod | grep nouveau
echo "blacklist nouveau" | sudo tee /etc/modprobe.d/disable-nouveau.conf
echo "options nouveau modeset=0" | sudo tee -a /etc/modprobe.d/disable-nouveau.conf
sudo update-initramfs -u
sudo reboot
```

若 `lsmod | grep nouveau` 无输出，则可能是 `ubuntu-drivers install --gpgpu` 自动选择的驱动分支过新、与显卡架构不匹配。可依据 `ubuntu-drivers list --gpgpu` 的输出改用较旧的分支重新安装，例如 `sudo ubuntu-drivers install --gpgpu nvidia:580-server`，完成后重启验证。

**3. `nvidia-smi` 正常，但「GPU 管理 / GPU 监控」页面无数据**

**处理方式**：1Panel 通过主机上已安装的显卡管理工具读取数据。先确认当前所选节点是否正确（多节点环境展示的是当前节点数据），再检查 1Panel 服务日志；驱动刚安装或升级内核后，重启 1Panel 服务使采集恢复正常。

**4. 安装应用或启动容器时报 `could not select device driver`**

**处理方式**：在应用商店安装应用时勾选「开启 GPU 支持」，1Panel 会向容器注入 `driver: nvidia` 的设备请求；若 Docker 尚未注册 NVIDIA 运行时，安装日志就会直接报此错误（这与显卡驱动是否加载无关）。若面板提供 **NVIDIA GPU 支持** 开关，先在 **容器 → 配置 → 基础配置** 确认已开启；否则直接执行官方配置命令并重启 Docker：

```bash
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
sudo docker run --rm --gpus all nvidia/cuda:12.2.0-base-ubuntu22.04 nvidia-smi
```

若验证命令仍失败，参考 [NVIDIA Container Toolkit 故障排查](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/troubleshooting.html) 检查 `systemd` cgroup 驱动等已知问题。

**5. 升级内核或驱动后 GPU 失效**

**处理方式**：驱动内核模块与当前内核版本不匹配，重新安装与内核匹配的驱动（或使用 DKMS 构建模块）后重启验证。

**参考文档**：

- [1Panel GPU 监控使用说明](https://docs.fit2cloud.com/1panel/user_manual/ai/gpu/)
- [Ubuntu Server NVIDIA 驱动安装](https://ubuntu.com/server/docs/nvidia-drivers-installation/)
- [NVIDIA Container Toolkit 安装指南](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
- [NVIDIA Container Toolkit 示例工作负载](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/sample-workload.html)
- [CUDA Toolkit Linux 安装指南](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
