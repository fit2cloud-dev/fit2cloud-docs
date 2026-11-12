---
title: 基准测试
description: 介绍在 1Panel 中准备 Benchmark 镜像与测试方案、创建基准测试、查看测试记录与结果报告。
keywords: [1Panel 基准测试, Benchmark, 测试方案, TTFT, TPOT, 吞吐量, 测点]
---

# 基准测试

**功能说明**：对模型服务进行基准测试，评估不同请求长度和并发配置下的吞吐量、首 Token 延迟及请求耗时等指标。入口为左侧菜单 **AI → 基准测试**，页面包含 **基准测试** 与 **设置** 两个标签页。

**使用顺序**：首次使用请先在 **设置** 标签页完成 Benchmark 镜像与测试方案的准备，再回到 **基准测试** 标签页创建测试；测试完成后可在测试记录中查看参数与结果报告。

## 1 准备镜像与测试方案

首次测试前应先进入 **设置** 标签页。页面提示「请先准备 Benchmark 镜像和测试方案，两项均就绪后即可创建基准测试」。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/benchmark_01_settings.png" alt="图 1  基准测试设置" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  基准测试设置</div>

**Benchmark 镜像**：显示 **镜像名** 与就绪状态，未就绪时可通过 **拉取镜像** 准备。

:::tip[镜像拉取失败]

若 **拉取镜像** 长时间无进展、超时或提示拉取失败，可先配置 Docker 镜像加速：进入 **容器 → 配置 → 镜像加速**，填写加速地址 `https://docker.1panel.live` 后保存，再回到本页重新拉取。配置方法参见 [容器配置](../containers/setting.md)。

:::


**测试方案**：页面说明「测试方案用于定义请求参数、并发配置及执行规则，请至少准备一个可用方案。」提供 **创建**，并对内置方案提供 **克隆**。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  内置测试方案</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'22%', padding:'8px', textAlign:'left'}}>名称</th><th style={{width:'16%', padding:'8px', textAlign:'left'}}>场景</th><th style={{width:'18%', padding:'8px', textAlign:'left'}}>类型</th><th style={{width:'44%', padding:'8px', textAlign:'left'}}>描述</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>快速验证</td><td style={{padding:'8px'}}>共 1 个场景</td><td style={{padding:'8px'}}>内置</td><td style={{padding:'8px'}}>单请求验证服务连通性与测量流程</td></tr>
<tr><td style={{padding:'8px'}}>常规测试</td><td style={{padding:'8px'}}>共 3 个场景</td><td style={{padding:'8px'}}>内置</td><td style={{padding:'8px'}}>短、中、长三类负载，适合日常性能测试</td></tr>
<tr><td style={{padding:'8px'}}>完整测试</td><td style={{padding:'8px'}}>共 7 个场景</td><td style={{padding:'8px'}}>内置</td><td style={{padding:'8px'}}>多场景、多并发与重复测量，包含长输入和共享前缀</td></tr>
</tbody>
</table>

## 2 创建基准测试

在 **基准测试** 标签页单击 **创建** 打开抽屉，左上角为 **返回**，底部为 **取消** 与 **创建**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/benchmark_02_create.png" alt="图 2  创建基准测试" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  创建基准测试</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  创建表单字段</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>字段</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>名称</td><td style={{padding:'8px'}}>测试任务名称，默认自动生成</td></tr>
<tr><td style={{padding:'8px'}}>模型服务</td><td style={{padding:'8px'}}>必填，选择待测试的模型服务；页面提示「选择待测试的模型服务，接口地址可按需修改」</td></tr>
<tr><td style={{padding:'8px'}}>接口地址</td><td style={{padding:'8px'}}>选择模型服务后自动填充，可按需修改</td></tr>
<tr><td style={{padding:'8px'}}>选择模型</td><td style={{padding:'8px'}}>指定参与测试的模型</td></tr>
<tr><td style={{padding:'8px'}}>分词器</td><td style={{padding:'8px'}}>必填，用于测试文本的 Token 编码及统计；提供 <strong>刷新</strong> 与 <strong>前往模型下载</strong> 入口</td></tr>
<tr><td style={{padding:'8px'}}>测试方案</td><td style={{padding:'8px'}}>选择方案并显示场景数量。页面说明「每个场景定义输入/输出 Token、并发档位及请求参数；各并发档位依次测试，每个档位按重复次数执行，每次执行生成一个测点」</td></tr>
<tr><td style={{padding:'8px'}}>场景配置</td><td style={{padding:'8px'}}>包含输入 Token、输出 Token、并发档位、请求数量设置、请求速率、每档请求数、重复次数、预热请求数、公共前缀比例与结果分类；支持 <strong>添加场景</strong>、<strong>编辑</strong> 与 <strong>删除</strong></td></tr>
<tr><td style={{padding:'8px'}}>参数</td><td style={{padding:'8px'}}>准备超时、单测点超时、整轮超时、测点间隔、采样温度、忽略结束标记（EOS）、保存请求明细、遇到错误停止后续测点</td></tr>
<tr><td style={{padding:'8px'}}>高级配置</td><td style={{padding:'8px'}}>CA 证书路径、额外请求头、额外请求体、分词器模式、信任远程代码、开始前检查服务空闲、上下文上限、模板预留 Token、存储上限（MiB）</td></tr>
<tr><td style={{padding:'8px'}}>备注</td><td style={{padding:'8px'}}>选填，记录测试目的或说明</td></tr>
</tbody>
</table>

:::caution[注意]

共享前缀比例为配置的前缀 Token 数占输入长度的比例，不代表实测缓存命中率；创建前请确认 Benchmark 镜像、测试方案与分词器均已就绪。

:::

## 3 测试记录

**基准测试** 标签页列出已创建的测试任务，顶部提供 **创建**、**搜索** 与自动刷新间隔（如 **5s**）。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/benchmark_03_list.png" alt="图 3  基准测试记录" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  基准测试记录</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  测试记录字段</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>字段</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>说明</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>名称</td><td style={{padding:'8px'}}>测试任务名称，创建时自动生成，也可自行修改；单击名称可查看该次测试的参数</td></tr>
<tr><td style={{padding:'8px'}}>模型</td><td style={{padding:'8px'}}>被测试的模型名称</td></tr>
<tr><td style={{padding:'8px'}}>测试方案</td><td style={{padding:'8px'}}>使用的测试方案，例如 <strong>快速验证</strong>、<strong>常规测试</strong></td></tr>
<tr><td style={{padding:'8px'}}>测点</td><td style={{padding:'8px'}}>已完成测点 / 总测点数，例如 <code>12 / 12</code></td></tr>
<tr><td style={{padding:'8px'}}>状态</td><td style={{padding:'8px'}}>任务执行状态，例如 <strong>成功</strong></td></tr>
<tr><td style={{padding:'8px'}}>日志</td><td style={{padding:'8px'}}>提供 <strong>详情</strong> 入口查看执行日志</td></tr>
<tr><td style={{padding:'8px'}}>时间</td><td style={{padding:'8px'}}>任务创建时间</td></tr>
<tr><td style={{padding:'8px'}}>操作</td><td style={{padding:'8px'}}>提供 <strong>报告</strong>、<strong>重新测试</strong> 与 <strong>删除</strong></td></tr>
</tbody>
</table>

## 4 查看测试参数

测试完成后，在测试记录列表中单击某条记录的 **名称**，可打开以「测试名称 · 参数」为标题的抽屉，回看该次测试创建时使用的完整配置。抽屉为只读展示，左上角提供 **返回**。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/benchmark_04_params.png" alt="图 4  已完成测试的参数" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  已完成测试的参数</div>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 4  参数抽屉内容</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>分区</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>内容</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>基础信息</td><td style={{padding:'8px'}}>vLLM 镜像、模型、接口地址、后端、分词器、测试方案与备注</td></tr>
<tr><td style={{padding:'8px'}}>场景配置</td><td style={{padding:'8px'}}>页面显示「共 N 个场景」，每个场景列出输入 / 输出 Token、并发档位、请求数量设置、请求速率、请求数并发倍数、最少请求数、重复次数、预热请求数、公共前缀比例与结果分类；提示语为「每个场景定义输入/输出 Token、并发档位及请求参数；各并发档位依次测试，每个档位按重复次数执行，每次执行生成一个测点。」</td></tr>
<tr><td style={{padding:'8px'}}>参数</td><td style={{padding:'8px'}}>准备超时、单测点超时、整轮超时、测点间隔、采样温度、忽略结束标记（EOS）、保存请求明细、遇到错误停止后续测点</td></tr>
<tr><td style={{padding:'8px'}}>高级配置</td><td style={{padding:'8px'}}>分词器模式、上下文上限、模板预留 Token、存储上限、CA 证书路径、信任远程代码、开始前检查服务空闲与额外请求体</td></tr>
</tbody>
</table>

:::tip[用途]

参数抽屉保存的是该次测试的配置快照，便于在对比多轮结果时确认各轮使用的镜像、分词器与场景是否一致；如需再次执行，可在测试记录中使用 **重新测试**。

:::

## 5 结果报告

在测试记录中单击 **报告** 进入报告页，顶部提供 **返回**、任务名称以及 **JSON**、**CSV**、**HTML**、**ZIP** 四种导出格式。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/1panel/ai/benchmark_05_report.png" alt="图 5  基准测试报告" />
<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  基准测试报告</div>

报告包含 **结果指标**、**测点**、**日志**、**执行环境** 与 **冻结配置** 五个标签页。**结果指标** 页首先展示 **场景与并发对照**，列出场景、并发数、输入 / 输出 Token、共享前缀比例、请求速率、TTFT 平均值与 P99、TPOT 平均值与 P99、单路 / 总输出吞吐、有效 / 总次数；单击场景名称可查看该组合的指标详情。

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 5  报告核心指标</div>
<table style={{display:'table', width:'100%', maxWidth:'100%', tableLayout:'fixed', borderCollapse:'collapse', borderSpacing:'0', border:'1px solid #d9dee8'}}>
<thead>
<tr><th style={{width:'24%', padding:'8px', textAlign:'left'}}>指标</th><th style={{width:'76%', padding:'8px', textAlign:'left'}}>含义</th></tr>
</thead>
<tbody>
<tr><td style={{padding:'8px'}}>TTFT</td><td style={{padding:'8px'}}>首 Token 延迟，报告给出平均值、中位数、P90、P95、P99 与标准差</td></tr>
<tr><td style={{padding:'8px'}}>TPOT</td><td style={{padding:'8px'}}>单 Token 耗时，同样给出平均值与分位数统计</td></tr>
<tr><td style={{padding:'8px'}}>ITL</td><td style={{padding:'8px'}}>Token 间延迟</td></tr>
<tr><td style={{padding:'8px'}}>E2EL</td><td style={{padding:'8px'}}>端到端延迟</td></tr>
<tr><td style={{padding:'8px'}}>吞吐指标</td><td style={{padding:'8px'}}>单路输出吞吐、总输出吞吐、总吞吐与请求吞吐，单位为 <code>tokens/s</code> 或 <code>req/s</code></td></tr>
<tr><td style={{padding:'8px'}}>请求与用量</td><td style={{padding:'8px'}}>成功请求、失败请求、输入 Token、输出 Token 与测试耗时</td></tr>
</tbody>
</table>

页面注明「汇总仅使用成功且无请求异常的重复测试，显示中位数和最小/最大值。P99 是每次测试 P99 的中位数；缓存和外部流量未受控。」报告下方还提供 **并发趋势**，用于观察总输出吞吐随并发数的变化。

## 6 注意事项

- 测试会向模型服务发起大量请求，请在业务低峰期执行，并确认目标服务可承受所选并发档位。
- 测试方案中的并发档位、重复次数越多，生成的测点越多、耗时越长。
- 重新测试会使用原有配置再次执行；删除记录不会影响模型服务本身。
- 报告中的数值受模型服务负载、缓存与外部流量影响，横向对比时应保持环境一致。
