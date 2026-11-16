---
title: 系统功能相关
---

## 1 使用自建 Nginx 反向代理 1Panel，导致主机和容器终端均不能正常使用。

**需要在 Nginx 配置文件中增加以下配置：**

```nginx
location / {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $http_host;
}
```

其中 `proxy_set_header Host $http_host;` 用于将客户端原始 Host（含端口）透传给 1Panel。1Panel 会校验终端 WebSocket 连接的 Origin 与 Host 是否一致；反向代理若未透传原始 Host，校验失败会返回 403 并中断终端连接。此处须使用 `$http_host`（保留端口），不可使用 `$host`。

**特殊情况**：如果 OpenResty 版本为 `1.31.1.1-2-4-noble`，需要将上述配置中的 Host 行改为：

```nginx
proxy_set_header Host $host$is_request_port$request_port;
```

> **或者直接在 1Panel 系统中新建反向代理网站也可以实现上述功能**
