---
title: GPU 管理
description: 介绍在 1Panel 中查看 GPU 实时状态、历史监控数据，以及基于 NUMA 拓扑的分组管理与使用注意事项。
keywords: [1Panel GPU 管理, 实时状态, 监控数据, 分组管理, NUMA, NVIDIA GPU]
---

# GPU 管理

**功能说明**：GPU 管理用于查看当前节点显卡的实时状态、历史监控数据与分组配置。入口为左侧菜单 **AI → GPU 管理**，页面包含 **实时状态**、**监控数据** 与 **分组管理** 三个标签页。

:::caution[使用前提]

1Panel 通过主机上已安装的显卡管理工具读取数据。以 NVIDIA GPU 为例，需要先安装与显卡和操作系统匹配的驱动，并确保在服务器终端执行 `nvidia-smi` 能正常返回信息；需要在容器中使用 GPU 时，还应完成 NVIDIA Container Toolkit 的安装与运行时配置，参见 [配置 GPU 驱动](../../faq/gpu-driver.md)。

:::

:::caution[驱动安装]

显卡驱动与内核、操作系统和硬件型号相关。升级内核或驱动可能影响现有 GPU 工作负载，生产环境应先确认兼容性并安排维护窗口。

:::

## 1 实时状态

实时状态展示环境检查结果与显卡概览。页面顶部提供 **检测详情**，并显示 **采集时间** 与刷新控制（默认「不刷新」，可设置自动刷新间隔）。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/gpu_management_realtime.png" alt="图 1  GPU 管理实时状态" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  GPU 管理实时状态</div>

设备概览区域汇总当前显卡的关键信息：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  设备概览信息</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'26%', padding:'8px', textAlign:'left'}}>项目</th><th style={{width:'74%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>显卡型号</td><td style={{padding:'8px'}}>当前检测到的 GPU 型号</td></tr>
<tr><td style={{padding:'8px'}}>驱动版本</td><td style={{padding:'8px'}}>宿主机已加载的显卡驱动版本</td></tr>
<tr><td style={{padding:'8px'}}>CUDA 版本</td><td style={{padding:'8px'}}>驱动对应的 CUDA 版本</td></tr>
<tr><td style={{padding:'8px'}}>卡数量</td><td style={{padding:'8px'}}>当前节点检测到的 GPU 数量</td></tr>
<tr><td style={{padding:'8px'}}>显存总计</td><td style={{padding:'8px'}}>全部显卡显存的已用量、总量与占用比例</td></tr>
</tbody>
</table>

下方按 GPU 编号逐张展示实时卡片，每张卡片显示进程数，并提供 **详情** 与 **监控数据** 入口。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  单卡实时指标</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'26%', padding:'8px', textAlign:'left'}}>指标</th><th style={{width:'74%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>GPU 使用率</td><td style={{padding:'8px'}}>当前 GPU 计算单元利用率</td></tr>
<tr><td style={{padding:'8px'}}>显存使用</td><td style={{padding:'8px'}}>已用显存 / 单卡显存总量</td></tr>
<tr><td style={{padding:'8px'}}>温度</td><td style={{padding:'8px'}}>显卡当前温度</td></tr>
<tr><td style={{padding:'8px'}}>功耗</td><td style={{padding:'8px'}}>显卡当前功耗</td></tr>
<tr><td style={{padding:'8px'}}>频率</td><td style={{padding:'8px'}}>当前核心频率</td></tr>
<tr><td style={{padding:'8px'}}>风扇转速</td><td style={{padding:'8px'}}>风扇转速百分比，无风扇设备显示为 <code>N/A</code></td></tr>
</tbody>
</table>

## 2 监控数据

监控数据用于查看显卡指标的历史趋势。页面顶部可切换 **设备信息**（选择具体 GPU）与 **时间** 范围，并提供刷新控制。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/gpu_management_history.png" alt="图 2  GPU 管理监控数据" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  GPU 管理监控数据</div>

可查看的历史指标包括 **GPU 使用率**、**显存**、**功耗**、**温度**、**频率**、**风扇转速**、**进程数**、**显存读写活跃率** 与 **引擎使用率**。

:::caution[注意]

只有已被采集并保存的数据才能形成历史曲线；更换节点时，应重新确认当前所选节点与查询的时间范围。

:::

## 3 分组管理

分组管理按 NUMA 拓扑组织 GPU 资源。页面说明为「分组用于复用 GPU 和 NUMA 配置；允许成员重叠，不提供 GPU 独占或显存隔离」。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/gpu_management_groups.png" alt="图 3  GPU 管理分组管理" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  GPU 管理分组管理</div>

### 3.1 什么是 NUMA

NUMA（Non-Uniform Memory Access，非一致性内存访问）是多路 CPU 服务器组织内存与 PCIe 设备的方式。在这类服务器上，每个 CPU 插槽连同直连的内存、PCIe 设备（包括 GPU）构成一个 **NUMA 节点**：

- CPU 访问**本节点**的内存与 GPU 时走本地通道，延迟低、带宽高
- 访问**其他节点**的内存或 GPU 时，数据要经过 CPU 之间的互联总线（如 Intel UPI、AMD Infinity Fabric），延迟更高、可用带宽更低

也就是说，同一张 GPU 挂在不同的 NUMA 节点下，实际表现并不相同。模型权重常驻在哪个节点的内存里、推理进程跑在哪个节点的 CPU 核心上，都会影响权重加载与数据搬运速度。多卡多路服务器上，如果进程与 GPU 跨节点绑定，容易出现吞吐下降、延迟抖动，而显卡利用率看起来却不高。

单路 CPU 或只有一张 GPU 的机器通常只有一个 NUMA 节点，此时分组主要起整理配置的作用；多路多卡机器才需要重点按 NUMA 规划。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  NUMA 相关概念</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'26%', padding:'8px', textAlign:'left'}}>概念</th><th style={{width:'74%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>NUMA 节点</td><td style={{padding:'8px'}}>一个 CPU 插槽及其直连内存、PCIe 设备构成的一组本地资源</td></tr>
<tr><td style={{padding:'8px'}}>本地访问</td><td style={{padding:'8px'}}>CPU 访问本节点内存或本节点直连的 GPU，延迟低、带宽高</td></tr>
<tr><td style={{padding:'8px'}}>跨节点访问</td><td style={{padding:'8px'}}>CPU 经互联总线访问其他节点的内存或 GPU，延迟与带宽均受影响</td></tr>
<tr><td style={{padding:'8px'}}>CPU 核心范围</td><td style={{padding:'8px'}}>归属于该 NUMA 节点的 CPU 核心编号区间，页面按节点展示</td></tr>
<tr><td style={{padding:'8px'}}>GPU 分组</td><td style={{padding:'8px'}}>把若干 GPU 及其 NUMA 配置保存为一组，供应用复用</td></tr>
</tbody>
</table>

### 3.2 为什么要按 NUMA 分组

在多卡机器上运行 vLLM、Ollama 等推理服务时，通常需要同时指定「用哪几张卡」以及「进程绑在哪些 CPU 核心上」。如果每次部署都手工挑一次卡和核心，既容易选错，也很难保证 GPU 与 CPU 处在同一个 NUMA 节点。

分组解决的正是这个问题：把同一 NUMA 节点下的 GPU 与对应 CPU 核心范围整理成一组，部署应用时直接选用该分组，一次性复用组内的 GPU 与 NUMA 配置，让模型进程尽量与 GPU 保持「就近」访问。需要多卡并行的模型，优先把同一 NUMA 节点内的卡放进同一分组，可以减少跨节点通信。

### 3.3 在 1Panel 中使用分组

分组管理页面分为两部分：

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  分组管理页面内容</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'26%', padding:'8px', textAlign:'left'}}>区域</th><th style={{width:'74%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>GPU 设备</td><td style={{padding:'8px'}}>按 NUMA 节点展示 CPU 核心范围及其归属的 GPU，可在 NUMA 节点或单张 GPU 上单击 <strong>创建</strong> 新建分组</td></tr>
<tr><td style={{padding:'8px'}}>分组</td><td style={{padding:'8px'}}>列出已有分组名称、包含的 GPU 数量与驱动类型</td></tr>
</tbody>
</table>

**1. 查看拓扑**：先在 **GPU 设备** 区域确认机器有几个 NUMA 节点、每个节点对应哪些 CPU 核心与 GPU，判断哪些卡属于同一个节点。

**2. 创建分组**：在目标 NUMA 节点或单张 GPU 上单击 **创建**，把希望一起使用的 GPU 归入一个分组并命名。多卡并行场景优先选择同一 NUMA 节点内的 GPU。

**3. 复用配置**：后续部署或配置模型应用时选用该分组，即可复用组内的 GPU 与 NUMA 配置，不必为每个应用重新挑选设备。

**4. 分配设备**：分组不等于资源隔离。需要给具体容器分配 GPU 时，仍要在应用的 GPU 加速设置中单独指定设备，并可结合 **实时状态**、**监控数据** 观察利用率是否符合预期。

:::caution[注意]

分组仅用于复用配置，成员允许重叠，**不提供 GPU 独占或显存隔离**。多个应用使用同一分组时仍会共享显卡资源；需要限制显存或独占设备时，请在应用侧单独配置。

:::

## 4 注意事项

**1. 页面无数据**

**处理方式**：「GPU 管理」页面无数据时，先在服务器终端执行 `nvidia-smi` 验证显卡管理命令，再检查驱动状态与 1Panel 服务日志；多节点环境中确认当前所选节点是否正确。

**2. 容器无法使用 GPU**

**处理方式**：应用安装或容器启动时报 `could not select device driver "nvidia"`，说明 Docker 尚未注册 NVIDIA 运行时，需先安装 NVIDIA Container Toolkit 并完成运行时配置，参见 [配置 GPU 驱动](../../faq/gpu-driver.md)。
