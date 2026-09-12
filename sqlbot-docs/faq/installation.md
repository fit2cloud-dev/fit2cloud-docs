---
title: 安装部署
---

## 1 部署的过程中，找不到依赖包：sqlbot-xpack 


包依赖地址：[https://test.pypi.org/simple/sqlbot-xpack/](https://test.pypi.org/simple/sqlbot-xpack/) ，找到对应操作系统的依赖，执行 uv 命令自动拉取即可。


## 2 出现了报错信息：Signature has expired  


升级版本至 v1.1.2 及以上。如果不升级版本，清理缓存后可正常运行。


## 3 镜像拉取超时


如果是 1Panel 方式安装 SQLBot 遇到镜像拉取超时的问题，可以[参考文档](https://bbs.fit2cloud.com/t/topic/5886)。

如果以 docker 命令，或者 docker-compose 命令启动时遇到镜像拉取超时，可以给 docker 设置镜像加速，具体步骤：

- 在 /etc/docker/daemon.json 文件中添加镜像地址，若没有此文件，则新建即可。在该文件中添加 registry-mirrors 部分内容，示例如下：
```json
{
    "log-driver":"json-file",
    "log-opts": {"max-size":"50m", "max-file":"3"},
    "registry-mirrors": [
        "https://docker.chenby.cn",
        "https://docker.1panel.live",
        "https://dockerproxy.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn"
    ]
}
```
- 修改完成后，重启 docker 服务即可


## 4 如何访问 SQLBot 内置的 PG 数据库


docker 命令启动的 SQLBot，可以先停止服务，加上 PG 的运行端口： -p 5432:5432
```
docker run -d \
    --name sqlbot \
    --restart unless-stopped \
    -p 8000:8000 \
    -p 8001:8001 \
    -p 5432:5432 \
    -v ./data/sqlbot/excel:/opt/sqlbot/data/excel \
    -v ./data/sqlbot/file:/opt/sqlbot/data/file \
    -v ./data/sqlbot/images:/opt/sqlbot/images \
    -v ./data/sqlbot/logs:/opt/sqlbot/logs \
    -v ./data/postgresql:/var/lib/postgresql/data \
    --privileged=true \
    dataease/sqlbot
```

以 docker compose 方式运行（离线包或 docker-compose 命令）的 SQLBot，可以修改 docker-compose.yml 文件，将 PG 的运行端口暴露出来，如下面示例代码中的 「5432:5432」。

若服务器 5432 端口已被占用，可以将冒号前的端口修改为其他可用端口，保持冒号后 PG 的内部端口 5432 不变即可。修改完 docker-compose.yml 文件后，请重新启动 SQLBot 服务。

```yml
services:
  sqlbot:
    image: registry.cn-qingdao.aliyuncs.com/dataease/sqlbot
    container_name: sqlbot
    restart: always
    privileged: true
    networks:
      - sqlbot-network
    ports:
      - ${SQLBOT_WEB_PORT}:8000
      - ${SQLBOT_MCP_PORT}:8001
      - 5432:5432
    env_file:
      - conf/sqlbot.conf
    volumes:
      - ./data/sqlbot/excel:/opt/sqlbot/data/excel
      - ./data/sqlbot/file:/opt/sqlbot/data/file
      - ./data/sqlbot/images:/opt/sqlbot/images
      - ./data/sqlbot/logs:/opt/sqlbot/app/logs
      - ./data/postgresql:/var/lib/postgresql/data

networks:
  sqlbot-network:
```

默认 PG 的访问信息如下：
```
POSTGRES_PORT=5432
POSTGRES_DB=sqlbot
POSTGRES_USER=root
POSTGRES_PASSWORD=Password123@pg
```


## 5 如何备份和还原 SQLBot？


SQLBot 没有独立的备份命令。内置 PostgreSQL 建议停服后打包运行目录中的 `data`、`conf` 和 `.env`；外置 PostgreSQL 请使用 `pg_dump`，并同时备份 Excel、图片等文件目录。完整步骤见 [备份还原](../installation/backup)。

