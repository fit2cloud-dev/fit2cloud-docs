---
title: 内容合规
description: 介绍 1Panel AI 网关内容合规功能，包括敏感词、审核样本、策略组与审核日志。
---

## 1 概述

内容合规用于对模型请求内容进行检测与处置，防止违规、敏感或有害内容进入模型调用链路。内容合规通过检测方式识别命中内容，并按策略组定义的处置动作执行仅审计或拦截。

页面内通过顶部标签切换 4 个管理视图：

- **敏感词**：用于维护一批需要拦截或审核的重点词汇，基于**精确关键词匹配**进行命中判定。
- **审核样本**：用于维护违规语料库，将其转换为向量后参与语义比对，基于**语义向量相似度**进行命中判定。
- **策略组**：将敏感词与审核样本按照动作、风险等级进行组合，形成可复用的策略，并**统一执行处理动作**。
- **审核日志**：用于记录每一次请求的检测结果及命中详情，形成**全程可追溯**的审计记录。

## 2 敏感词

敏感词以"是否包含某词"进行判定，是最直接、最可控的一类审核方式。对于明确不允许出现的内容，通过配置敏感词即可实现精确、即时的命中与处置，避免漏放或误判。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image1_Sensitive_Words_List.png" alt="敏感词列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 1  敏感词列表</div>


### 2.1 敏感词添加

点击「**添加敏感词**」按钮，在弹出的表单中填写以下内容：

- **策略组**：选择该敏感词所属的策略组（带星号 `*` 为必填），决定命中后的处置方式。

- **敏感词**：填写需要匹配的词或短语（带星号 `*` 为必填）。

- **备注**：填写补充说明（选填）。

- **状态**：通过开关决定该敏感词是否启用。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image2_Add_Sensitive_Word.png" alt="添加敏感词"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 2  添加敏感词</div>

确认无误后点击「保存」，敏感词即添加完成，此后请求内容命中该词时将按所属策略组的动作处理。

### 2.2 敏感词批量导入

当敏感词数量较多时，可点击「**批量导入**」按钮，一次导入多条敏感词。导入表单包含策略组与敏感词内容，且支持逐行输入，便于快速建立敏感词库。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image3_Batch_Import_Sensitive_Words.png" alt="批量导入敏感词"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 3  批量导入敏感词</div>

### 2.3 敏感词维护

- **启停**：通过行内开关控制敏感词是否参与判定，禁用后该敏感词将不再命中。

- **编辑**：修改敏感词内容、所属策略组、备注等信息。

- **删除**：移除不再需要的敏感词。删除后该词将不再参与判定，请确认后操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/imag4_sensitive_word_maintain.png" alt="维护敏感词"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 4  维护敏感词</div>

### 2.4 敏感词筛查

当敏感词数量较多时，逐一翻阅难以定位目标。通过筛查，可快速检索并聚焦符合条件的敏感词，便于核查配置或确认某类词的管理情况。页面顶部工具栏提供以下筛查方式：

- **按策略组筛选**：通过「全部策略组」下拉框，仅显示归属于某个策略组的敏感词，便于按处置规则分类查看。

- **按状态筛选**：通过「全部状态」下拉框，仅显示"启用"或"禁用"的敏感词，便于核对哪些词正在生效。

- **按关键词搜索**：在「搜索敏感词」输入框中输入关键词，可定位包含该内容的敏感词。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image5_sensitive_word_screen.png" alt="敏感词筛查"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 5  敏感词筛查</div>

## 3 审核样本

审核样本用于支撑语义向量检测。部分不合规内容并无固定关键词，仅靠敏感词难以覆盖。**审核样本**通过语义匹配来判定：将样本向量化后，系统将请求内容与样本进行相似度比对，命中即可识别语义相近的不合规内容，从而弥补敏感词无法覆盖的灵活场景。

- **添加审核样本**：录入新的审核样本，样本录入完成后需要构建向量，才可用于检测。
- **构建选中向量**：对勾选的样本生成语义向量。
- **构建全部向量**：为列表中所有样本构建语义向量。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image6_Audit_Samples_List.png" alt="审核样本列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 6  审核样本列表</div>

### 3.1 审核样本添加

点击「**添加审核样本**」按钮，在弹出的表单中填写以下内容：

- **策略组**：选择样本所属的策略组。

- **样本文本**：填写用于语义匹配的样本内容。

- **备注**：补充说明（选填）。

- **状态**：通过开关决定样本是否启用。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image7_audit_sample_add.png" alt="添加审核样本"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 7  审核样本列表</div>

### 3.2 审核样本构建向量

系统无法直接比较两段文本的语义相似度，需先将样本转换为**向量**。样本未经向量化，就无法参与语义匹配。因此新增或修改样本后，需构建对应向量，样本才能真正生效。页面提供以下构建操作：

- **构建选中向量**：勾选列表中的样本后，为选中的样本构建向量。

- **构建全部向量**：为列表中的全部样本构建向量。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image8_audit_sample_build_vector.png" alt="审核样本构建向量"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 8  审核样本构建向量</div>

### 3.3 审核样本维护

- **编辑**：修改审核样本内容、所属策略组、备注、状态。

- **删除**：移除不再需要的样本。删除后该样本将不再参与语义匹配，请确认后操作。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image9_audit_sample_manage.png" alt="审核样本维护"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 9  审核样本维护</div>

## 4 策略组

策略组用于定义一套完整的检测处置策略。敏感词与审核样本命中后，系统需要对"如何处置"给出明确动作，例如仅做记录，还是直接拦截。若为每个敏感词、样本单独配置处置方式，管理将十分繁琐。**策略组**将这些判定依据与处置动作、风险等级统一绑定，既避免了重复配置，也便于整体调整某类内容的处置策略。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image10_Policy_Groups_List.png" alt="策略组列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 10  策略组列表</div>


### 4.1 策略组添加

点击「**添加策略组**」按钮，在弹出的表单中填写以下内容：

- **名称**：设置策略组名称（带星号 `*` 为必填）。

- **动作**：选择命中后的处置动作（带星号 `*` 为必填），如"拦截"，决定是记录还是阻断。

- **风险等级**：选择对应的风险等级（带星号 `*` 为必填），如"中"。

- **状态**：通过开关决定策略组是否启用。

- **描述**：填写策略组说明（选填），帮助理解其用途。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image11_Add_Policy_Group.png" alt="添加策略组"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 11  添加策略组</div>

:::warning[警告]
策略组动作设置为拦截后，命中内容将直接拦截请求，不向模型发送；仅审计则只记录日志、不做拦截。配置前请确认处置预期。
:::

### 4.2 策略组维护

- **启停**：通过开关控制策略组是否生效，禁用后其处置规则不再应用。

- **编辑**：修改策略组的动作、风险等级、描述等信息。

- **删除**：移除不再需要的策略组。删除前请确认没有敏感词或样本仍在引用它，以免影响相关判定。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image12_strategy_group_manage.png" alt="维护策略组"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 12  维护策略组</div>

## 5 审核日志

审核过程由系统自动完成，若只看结果而缺少记录，将难以判断请求为何被拦截、命中了哪条依据。**审核日志**详细记录每一次请求的审核结果与命中详情，使处置过程可追溯、可审查，便于排查误拦、漏放并优化策略。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image13_Audit_Logs_List.png" alt="审核日志列表"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 13  审核日志列表</div>


### 5.1 查看日志详情

点击某条记录的「查看」，可打开审核详情面板，包含以下信息：

- **审核信息**：请求的 Request ID、审核时间、请求模型、客户端协议、动作、风险等级、状态码等。

- **命中详情**：本次判定所命中的依据，包括检测方式（如"关键词"）、所属策略组、证据（如命中的敏感词）、置信度及对应动作、风险。

- **策略详情**：本次实际应用的处置策略与匹配的敏感词。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image14_Audit_Log_Detail.png" alt="审核日志详情"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 14  审核日志详情</div>

### 5.2 审核日志筛查

审核日志会随着请求量增长而快速累积，若不进行筛选，将难以在大量记录中定位目标。通过筛查，可快速聚焦特定动作、风险等级或某类来源的审核记录，便于追踪与核查。页面顶部工具栏提供以下筛查方式：

- **按动作筛选**：通过下拉框仅显示特定处置动作的记录，如"拦截"。

- **按风险等级筛选**：通过下拉框仅显示对应风险等级（如低、中、高）的记录。

- **按检测方式筛选**：通过下拉框仅显示某一检测方式产生的记录，如基于关键词或基于样本语义的检测。

- **按策略组 / 来源筛选**：通过下拉框仅显示归属于某个策略组或来源的记录。

- **按关键词搜索**：在输入框中输入 **Request ID、模型或证据**相关内容，可快速定位对应记录。

通过组合使用上述筛查条件，可快速缩小范围、定位到目标审核记录，完成追踪排查或进一步核验处置结果。

<img style={{display:"block",margin:"16px auto",maxWidth:"100%"}} src="/img/content_compliance/image15_audit_log_detect.png" alt="审核日志详情"/>

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"6px 0 20px"}}>图 15  审核日志详情</div>

## 6 注意事项

- 敏感词与审核样本需归属于某个策略组，请先在 **策略组** 中创建策略并以启用状态运行。
- 策略组动作设置为拦截后，命中内容将直接拦截请求，配置前请确认处置预期。
- 审核样本需构建语义向量后方可生效，新增样本后请及时构建向量。
- 实时数据（请求记录、敏感词条数等）随实际流量动态变化，本文截图中的具体数值仅作示例展示。
