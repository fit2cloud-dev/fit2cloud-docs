---
title: GPU 管理
description: 介绍在 1Panel 中查看 GPU 实时状态、历史监控数据与分组管理，以及页面无数据时的排查方法。
keywords: [1Panel GPU 管理, 实时状态, 监控数据, 分组管理, NVIDIA GPU]
---

# GPU 管理

**功能说明**：GPU 管理用于查看当前节点显卡的实时状态、历史监控数据与分组配置。入口为左侧菜单 **AI → GPU 管理**，页面包含 **实时状态**、**监控数据** 与 **分组管理** 三个标签页。

:::caution[使用前提]

1Panel 通过主机上已安装的显卡管理工具读取数据。以 NVIDIA GPU 为例，需要先安装与显卡和操作系统匹配的驱动，并确保在服务器终端执行 `nvidia-smi` 能正常返回信息；需要在容器中使用 GPU 时，还应完成 NVIDIA Container Toolkit 的安装与运行时配置，参见 [配置 GPU 驱动](../faq/gpu-driver.md)。

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

分组管理用于按 NUMA 拓扑组织 GPU 资源。页面说明为「分组用于复用 GPU 和 NUMA 配置；允许成员重叠，不提供 GPU 独占或显存隔离」。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/gpu_management_groups.png" alt="图 3  GPU 管理分组管理" />

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  GPU 管理分组管理</div>

- **GPU 设备**：按 NUMA 节点展示 CPU 核心范围及其归属的 GPU，可在 NUMA 节点或单张 GPU 上单击 **创建** 新建分组
- **分组**：列出已有分组名称、包含的 GPU 数量与驱动类型

:::caution[注意]

分组仅用于复用配置，成员允许重叠，**不提供 GPU 独占或显存隔离**。需要对容器分配具体设备时，请在应用的 GPU 加速设置中单独指定。

:::

## 4 页面无数据或容器无法使用 GPU

**1. 「GPU 管理」页面无数据**

**处理方式**：先在服务器终端执行 `nvidia-smi` 验证显卡管理命令，再检查驱动状态与 1Panel 服务日志；多节点环境中确认当前所选节点是否正确。

**2. 应用安装或容器启动时报 `could not select device driver "nvidia"`**

**处理方式**：说明 Docker 尚未注册 NVIDIA 运行时，需先安装 NVIDIA Container Toolkit 并完成运行时配置，参见 [配置 GPU 驱动](../faq/gpu-driver.md)。

## 5 相关文档

- [配置 GPU 驱动](../faq/gpu-driver.md)：安装 NVIDIA GPU 驱动与 NVIDIA Container Toolkit
- [基准测试](./benchmark.md)：对模型服务进行吞吐量与延迟测试
