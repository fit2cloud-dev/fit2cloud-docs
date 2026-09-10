# 文档发布 Action

本版以原始 `deploy-oss.yml` 为基准，保持一个 YAML、一个 Job、一次手动点击：
检出代码 → 安装依赖 → `npm run build` → OSS 同步 → 可选 CDN 刷新。
构建与上传在同一 Runner 中直接交接 `build/`。

## 本次优化

- OSS 多文件并发从默认 `3` 提高到 `20`，缩短大量图片上传时的等待。
- `npm ci --no-audit --no-fund` 保持 lockfile 安装方式，跳过安装阶段的审计请求和资助提示。
- 使用原有 npm 下载缓存，构建产物在同一 Runner 内直接用于上传。

核心同步命令：

```bash
./ossutil sync ./build/ "oss://$ALIYUN_OSS_BUCKET/" --delete --checksum -f --job 20
```

`ossutil 2.4.0` 的 `--checksum` 仅对 OSS 对象间拷贝生效。因此本版沿用原有上传判断，
并发优化不等于按内容增量上传；上传量仍可能是完整站点。
官方参数说明：https://www.alibabacloud.com/help/en/oss/developer-reference/sync-synchronize-local-files-to-oss

## 与原流程的兼容性

- 继续仅通过 `workflow_dispatch` 手动执行，沿用 `purge_cdn`、`cdn_refresh_mode` 两个输入及其默认值。
- 构建语言继续由 `package.json` 的 `npm run build` 决定，当前为中文站。
- 沿用原有 Node、ossutil、aliyun-cli 版本，Secrets、地域推导方式及 GitHub 权限。
- 继续以完整 `build/` 镜像 Bucket 根目录；云端多余文件按原来的 `--delete` 规则删除。
- 同大小但内容不同的文件仍会覆盖，上传失败时后续 CDN 步骤不会执行。
- 沿用原有目录刷新、全部 HTML URL 刷新及关闭 CDN 刷新的分支逻辑。
- 沿用 `cancel-in-progress: true` 和 30 分钟超时，重复触发、失败重跑方式与原流程一致。

## 验证与耗时

已使用真实 ossutil 2.4.0 对本机模拟 OSS 对比默认并发和 `--job 20`，检查最终文件内容、
上传与删除请求、同大小 HTML 更新、重复发布和失败行为，结果一致。
120 个文件、每次上传模拟 150ms 延迟时，耗时从 6.564 秒降至 1.123 秒。
该实验只验证延迟场景下的并发收益，线上耗时需按真实带宽测量。
YAML 语义对比及 actionlint 检查均通过：除安装附加参数、同步并发和显示文字外，其他配置与原备份一致。

上线后直接比较 Actions 中 `Build site`、`Sync build to OSS` 两个步骤及整个 Job 的耗时。
并发不会按比例提升受总带宽限制的传输速度，应以真实运行结果验收。

原始 YAML 备份保留在
[`workflow-backups/deploy-oss.20260910-162735.yml.bak`](workflow-backups/deploy-oss.20260910-162735.yml.bak)。
回退可直接使用该备份覆盖工作流文件。
