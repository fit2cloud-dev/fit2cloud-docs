---
title: 源码运行
---


请使用 v1.1.1 等已发布分支的代码运行 SQLBot。请勿使用 main 等分支，main 等分支代码均处于开发或测试阶段，可能存在较明显功能缺陷。   
本文所使用源码为 SQLBot main 分支，操作系统为 Ubuntu 24.04，举例说明如何以源码的形式运行 SQLBot 工程。所有操作均在阿里云（新加坡区） 4核8G 环境中执行。



目前支持的源码运行环境有： Windows (x86)、Linux（x86 & arm64）、MacOS（x86 & arm64）。


## 1 项目结构

     ```
    ├── backend                                     # 后端 Python 源码
    ├── docker-compose.yaml                         # docker compose 一键运行文件
    ├── Dockerfile                                  # 构建容器镜像使用的 Dockerfile
    ├── frontend                                    # 前端 Vue 源码
    ├── g2-ssr                                      # MCP 使用到的出图工具
    ├── installer                                   # 安装工程源码
    ├── LICENSE                                     # License 申明
    ├── README.md
    ├── sqlbot-assistant-demo.html                  # SQLBot 嵌入式小助手示例
    └── start.sh                                    
     ```

## 2 配置环境

### 2.1 安装 Python


默认情况下，Ubuntu 24.04 环境中自带了Python，如果没有 Python 环境，可以通过以下命令安装。
```
apt update -y
apt upgrade -y
add-apt-repository ppa:deadsnakes/ppa
apt install -y python3.11 python3.11-full
```


### 2.2 安装 Git

Ubuntu 24.04 默认已安装 Git，如果环境中没有 Git，可执行命令安装 Git。
```
apt-get install -y git 
```


验证 Git。
```
root@iZt4ndy6544y6f1i99ahw0Z:~# git --version
git version 2.43.0
```


### 2.3 安装配置 uv

执行命令安装 uv。
```
# 安装 uv，国内安装慢的，也可以选用 （curl -LsSf https://gitee.com/wangnov/uv-custom/releases/download/0.9.16/uv-installer-custom.sh | sh）
root@iZt4ndy6544y6f1i99ahw0Z:~# curl -LsSf https://astral.sh/uv/install.sh | sh
downloading uv 0.8.13 x86_64-unknown-linux-gnu
no checksums to verify
installing to /root/.local/bin
uv
uvx
everything's installed!

To add $HOME/.local/bin to your PATH, either restart your shell or run:

    source $HOME/.local/bin/env (sh, bash, zsh)
    source $HOME/.local/bin/env.fish (fish)

# 使环境变量生效
root@iZt4ndy6544y6f1i99ahw0Z:~# source $HOME/.local/bin/env

# 验证 uv 命令
root@iZt4ndy6544y6f1i99ahw0Z:~# uv -V
uv 0.8.13
```


### 2.4  安装配置 nodejs

执行命令安装 nodejs。
```
# 下载并安装 nodejs，node 版本可能会变化，如版本升级，请更新连接
wget https://nodejs.org/dist/latest-v22.x/node-v22.21.1-linux-x64.tar.gz
tar xvf node-v22.21.1-linux-x64.tar.gz
mv node-v22.21.1-linux-x64 /opt/node-v22.21.1

# 添加环境变量
echo "export PATH=\$PATH:/opt/node-v22.21.1/bin" >> ~/.bashrc

# 使环境变量生效
source ~/.bashrc
```


验证 nodejs。
```
root@iZt4ndy6544y6f1i99ahw0Z:~# node --version
v22.21.1

root@iZt4ndy6544y6f1i99ahw0Z:~# npm version
{
    npm: '10.9.4',
    node: '22.21.1',
    acorn: '8.15.0',
    ada: '2.9.2',
    amaro: '1.1.4',
    ares: '1.34.5',
    brotli: '1.1.0',
    cjs_module_lexer: '2.1.0',
    cldr: '47.0',
    icu: '77.1',
    llhttp: '9.3.0',
    modules: '127',
    napi: '10',
    nbytes: '0.1.1',
    ncrypto: '0.0.1',
    nghttp2: '1.64.0',
    openssl: '3.5.4',
    simdjson: '3.13.0',
    simdutf: '6.4.2',
    sqlite: '3.50.4',
    tz: '2025b',
    undici: '6.22.0',
    unicode: '16.0',
    uv: '1.51.0',
    uvwasi: '0.0.23',
    v8: '12.4.254.21-node.33',
    zlib: '1.3.1-470d3a2',
    zstd: '1.5.7'
}
```


### 2.5 安装配置 PostgreSQL

从 v1.1.0 版本开始，SQLBot 需要使用到 PG 的向量扩展。为了方便，这里我们使用 docker 镜像来安装 PG。
如果没有安装 docker 环境，可以先[安装相应的 docker 环境](#41-安装-docker)。

执行以下命令启动 PG:
```
docker run -d \
    --name pg \
    -p 5432:5432 \
    -v ./data/postgresql:/var/lib/postgresql/data \
    -e POSTGRES_DB=sqlbot \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=Password123@pg \
    pgvector/pgvector:pg17
```

验证:
```
root@iZt4n8u2tu6392mezufc9rZ:~# docker exec -it pg psql --version
psql (PostgreSQL) 17.6 (Debian 17.6-1.pgdg12+1)
```


## 3  代码运行

### 3.1 源码准备

下载源码到本地
```
root@iZt4ndy6544y6f1i99ahw0Z:~# git clone -b main https://github.com/dataease/SQLBot.git
Cloning into 'SQLBot'...
remote: Enumerating objects: 12884, done.
remote: Counting objects: 100% (589/589), done.
remote: Compressing objects: 100% (219/219), done.
remote: Total 12884 (delta 453), reused 425 (delta 369), pack-reused 12295 (from 2)
Receiving objects: 100% (12884/12884), 19.42 MiB | 16.47 MiB/s, done.
Resolving deltas: 100% (9092/9092), done.
```


### 3.2 配置运行环境

#### 3.2.1 .env 配置


在工程目录下创建配置文件 .env，内容如下（根据自己实际情况修改相应配置）：
```
root@iZt4ndy6544y6f1i99ahw0Z:~/SQLBot# cat .env
PROJECT_NAME="SQLBot"

# Backend
BACKEND_CORS_ORIGINS="http://localhost,http://localhost:5173,https://localhost,https://localhost:5173"
SECRET_KEY=y5txe1mRmS_JpOrUzFzHEu-kIQn3lf7ll0AOv9DQh0s

DEFAULT_PWD="SQLBot@123456"

LOG_LEVEL="DEBUG"  # DEBUG, INFO, WARNING, ERROR
SQL_DEBUG=False

CACHE_TYPE="memory"

# Postgres
POSTGRES_SERVER=localhost
POSTGRES_PORT=5432
POSTGRES_DB=sqlbot
POSTGRES_USER=root
POSTGRES_PASSWORD=Password123@pg # Change this to your pwd

SERVER_IMAGE_HOST=http://192.168.1.112:8001/images/
```


#### 3.2.2 配置内置向量模型

SQLBot 需要使用到内置向量模型，以 Ubuntu 环境为例，比较简单的办法是从现成的 SQLBot 镜像中拷贝到本地开发环境。注意路径放置在 /opt/sqlbot/models。如果是 windows 环境，则放置在项目所在盘的 /opt/sqlbot/models 下，如 D:\opt\sqlbot\models。

假设本地已经启动了一个 SQLBot 容器，则可以通过以下命令 copy 内置向量模型：
```bash
root@iZt4n9ii50pwh74bs5bhuzZ:~# docker cp sqlbot:/opt/sqlbot/models /opt/sqlbot/models
Successfully copied 831MB to /opt/sqlbot/models
```

也可以参考一些其他的安装方式，如 [https://cloud.tencent.com/developer/article/2509399](https://cloud.tencent.com/developer/article/2509399)


#### 3.2.3 Oracle Instant Client 安装

为了支持 Oracle 11 以及 thick 模型，我们需要安装 Oracle Instant Client。可以到 Oracle 官网下载对应的版本，地址是 [https://www.oracle.com/database/technologies/instant-client/downloads.html](https://www.oracle.com/database/technologies/instant-client/downloads.html)

若不需要使用 Oracle thick 模式的话，可以略过此步骤。

以 Ubuntu 为例，安装示例如下：
```bash
root@iZt4n9ii50pwh74bs5bhuzZ:~# wget https://download.oracle.com/otn_software/linux/instantclient/2326000/instantclient-basic-linux.x64-23.26.0.0.0.zip
--2025-11-05 17:12:57--  https://download.oracle.com/otn_software/linux/instantclient/2326000/instantclient-basic-linux.x64-23.26.0.0.0.zip
Resolving download.oracle.com (download.oracle.com)... 23.206.180.77
Connecting to download.oracle.com (download.oracle.com)|23.206.180.77|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 133613627 (127M) [application/zip]
Saving to: ‘instantclient-basic-linux.x64-23.26.0.0.0.zip’

instantclient-basic-linux.x64-23.26.0.0.0.zip                       100%[=================================================================================================================================================================>] 127.42M  11.9MB/s    in 9.7s

2025-11-05 17:13:07 (13.2 MB/s) - ‘instantclient-basic-linux.x64-23.26.0.0.0.zip’ saved [133613627/133613627]

root@iZt4n9ii50pwh74bs5bhuzZ:~# unzip instantclient-basic-linux.x64-23.26.0.0.0.zip

root@iZt4n9ii50pwh74bs5bhuzZ:~# mv instantclient_23_26 oracle_instant_client

root@iZt4n9ii50pwh74bs5bhuzZ:~# mkdir -p /opt/sqlbot/db_client

root@iZt4n9ii50pwh74bs5bhuzZ:~# mv oracle_instant_client /opt/sqlbot/db_client
```

修改 .bashrc，加入以下环境变量：
```
export ORACLE_HOME=/opt/sqlbot/db_client/oracle_instant_client
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$ORACLE_HOME
```

重新加载 .bashrc
```bash
source ~/.bashrc
```

windows 环境类似，将压缩包下载解压后，改名为 oracle_instant_client，放置到项目所在盘的 /opt/sqlbot/db_client 目录下，完整路径示例 D:\opt\sqlbot\db_client\oracle_instant_client


### 3.3 源码编译

```
# 编译前端
cd frontend
npm install && npm run build

# 编译后端
cd ../backend
uv sync --extra cpu
```


### 3.4 运行

进入到 backend 文件夹下，执行下面的命令：

```
source .venv/bin/activate

# 启动 g2-ssr，用来为 mcp 生成图形（可选）
nohup node ../g2-ssr/app.js &

# 启动 MCP Server（可选）
nohup uvicorn main:mcp_app --host 0.0.0.0 --port 8001 &

# 启动 SQLBot
nohup uvicorn main:app --host 0.0.0.0 --port 8000 --workers 1 &
```


## 4 镜像制作
### 4.1 安装 Docker

在服务器上安装 Docker，本文使用 DataEase 项目组编写安装脚本进行安装，用户可自行选择如何安装 Docker（需安装 docker compsose）。
```
curl -fsSL https://resource.fit2cloud.com/get-docker-linux.sh | bash

# 设置 docker 开机自启，并启动 docker 服务
systemctl enable docker; systemctl daemon-reload; service docker start
```


### 4.2 安装 buildx

在服务器上安装 buildx，arm 架构请自行修改对应架构信息：
```
mkdir -p .docker/cli-plugins/
curl -SL https://github.com/docker/buildx/releases/download/v0.9.1/buildx-v0.9.1.linux-amd64 -o .docker/cli-plugins/docker-buildx
chmod a+x .docker/cli-plugins/docker-buildx
```


### 4.3 制作镜像

进入 SQLBot 项目根目录，执行镜像制作命令。
```
docker buildx build -t registry.cn-qingdao.aliyuncs.com/dataease/sqlbot:dev-rc1 .
```


输出日志参考
```
root@iZt4n65gnl36fhkxbx0qgrZ:~/SQLBot# docker buildx build -t registry.cn-qingdao.aliyuncs.com/dataease/sqlbot:dev-rc1 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
        Install the buildx component to build images with BuildKit:
        https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  57.38MB
Step 1/52 : FROM ghcr.io/1panel-dev/maxkb-vector-model:v1.0.1 AS vector-model
v1.0.1: Pulling from 1panel-dev/maxkb-vector-model
81824665db64: Pull complete
Digest: sha256:da730ff243f5502304c390ec5a52cf79b2b3a0a46e52100e288850dafbf2c8bf
Status: Downloaded newer image for ghcr.io/1panel-dev/maxkb-vector-model:v1.0.1
---> e9371e013945
Step 2/52 : FROM --platform=${BUILDPLATFORM} registry.cn-qingdao.aliyuncs.com/dataease/sqlbot-base:latest AS sqlbot-ui-builder
failed to parse platform : "" is an invalid OS component of "": OSAndVersion specifier component must match "^([A-Za-z0-9_-]+)(?:\\(([A-Za-z0-9_.-]*)\\))?$": invalid argument
root@iZt4nj5m4jtf6zc71a7egnZ:~/SQLBot# DOCKER_BUILDKIT=1 docker build -t registry.cn-qingdao.aliyuncs.com/dataease/sqlbot:dev-rc1 .
ERROR: BuildKit is enabled but the buildx component is missing or broken.
    Install the buildx component to build images with BuildKit:
    https://docs.docker.com/go/buildx/
root@iZt4nj5m4jtf6zc71a7egnZ:~/SQLBot# cd
root@iZt4nj5m4jtf6zc71a7egnZ:~# mkdir -p .docker/cli-plugins/
curl -SL https://github.com/docker/buildx/releases/download/v0.9.1/buildx-v0.9.1.linux-amd64 -o .docker/cli-plugins/docker-buildx
chmod a+x .docker/cli-plugins/docker-buildx
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                Dload  Upload   Total   Spent    Left  Speed
0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100 44.6M  100 44.6M    0     0  13.1M      0  0:00:03  0:00:03 --:--:-- 13.1M
root@iZt4nj5m4jtf6zc71a7egnZ:~# cd SQLBot/
root@iZt4nj5m4jtf6zc71a7egnZ:~/SQLBot# docker build -t registry.cn-qingdao.aliyuncs.com/dataease/sqlbot:dev-rc1 .
[+] Building 466.1s (33/33) FINISHED
=> [internal] load build definition from Dockerfile                                                                                                                                                                                                                     0.0s
=> => transferring dockerfile: 3.34kB                                                                                                                                                                                                                                   0.0s
=> [internal] load metadata for registry.cn-qingdao.aliyuncs.com/dataease/sqlbot-python-pg:latest                                                                                                                                                                       1.4s
=> [internal] load metadata for ghcr.io/1panel-dev/maxkb-vector-model:v1.0.1                                                                                                                                                                                            0.0s
=> [internal] load metadata for registry.cn-qingdao.aliyuncs.com/dataease/sqlbot-base:latest                                                                                                                                                                            1.4s
=> [internal] load .dockerignore                                                                                                                                                                                                                                        0.0s
=> => transferring context: 244B                                                                                                                                                                                                                                        0.0s
=> [vector-model 1/1] FROM ghcr.io/1panel-dev/maxkb-vector-model:v1.0.1                                                                                                                                                                                                 0.0s
=> [stage-4 1/9] FROM registry.cn-qingdao.aliyuncs.com/dataease/sqlbot-python-pg:latest@sha256:b995e0d67f058a4edbc61ee747acc0c41ce445252d62866979696390ee4b7e4a                                                                                                        80.3s
=> => resolve registry.cn-qingdao.aliyuncs.com/dataease/sqlbot-python-pg:latest@sha256:b995e0d67f058a4edbc61ee747acc0c41ce445252d62866979696390ee4b7e4a                                                                                                                 0.0s
=> => sha256:b995e0d67f058a4edbc61ee747acc0c41ce445252d62866979696390ee4b7e4a 1.61kB / 1.61kB                                                                                                                                                                           0.0s
=> => sha256:c6b214eb0cadee91c614166729476f47848387968bc76bee1d1702e3d5ac540b 4.30kB / 4.30kB                                                                                                                                                                           0.0s
=> => sha256:94c089151ee5124c0ea4fe99619b0abfd63124e180c1b8bf26fd5718ea079390 13.97kB / 13.97kB                                                                                                                                                                         0.0s
=> => sha256:af7c915c88494a197ce5f1ef0b0e7ca86bdd56a613a975f75d2c6dd9511922c7 29.15MB / 29.15MB                                                                                                                                                                        10.3s
=> => sha256:3166755df2cd1988f231f0033260fc94747f5435503225060769ea4ec3b06f07 1.17kB / 1.17kB                                                                                                                                                                           7.6s
=> => sha256:93c86b7657ed1289b28d79ebbab053d2c8abf7a3e5b27f446a33fcb81311cb0a 4.53MB / 4.53MB                                                                                                                                                                          16.9s
=> => extracting sha256:af7c915c88494a197ce5f1ef0b0e7ca86bdd56a613a975f75d2c6dd9511922c7                                                                                                                                                                                1.9s
=> => sha256:c1499316ffcfa748a10deee3ed7645645a01bc372a8fe9b9bd14e1cd0df5c464 1.45MB / 1.45MB                                                                                                                                                                          10.8s
=> => sha256:6e6162b82c961596fd81c96b0d027c6977b04856b344d4c6b37036fd25804592 8.07MB / 8.07MB                                                                                                                                                                          12.1s
=> => sha256:678fdefd6cc39131fa99ef3e532be8627d17e1b39a17b32b375c23584095d9be 1.20MB / 1.20MB                                                                                                                                                                          12.4s
=> => extracting sha256:3166755df2cd1988f231f0033260fc94747f5435503225060769ea4ec3b06f07                                                                                                                                                                                0.0s
=> => sha256:7960bd43e7e7093fc87228eaf9f132681666766f6fada680c0a498256ce300c7 116B / 116B                                                                                                                                                                              12.6s
=> => sha256:1eef446a2d115c56650f364dc950fc80e4338b8141a9ac82ed6fdc1a34a7adca 3.14kB / 3.14kB                                                                                                                                                                          12.8s
=> => sha256:717379dd4557593dd073a1d33e202a9b43a51fa7497284b3ad6f481345113536 112.82MB / 112.82MB                                                                                                                                                                      29.5s
=> => extracting sha256:93c86b7657ed1289b28d79ebbab053d2c8abf7a3e5b27f446a33fcb81311cb0a                                                                                                                                                                                0.2s
=> => sha256:1752a03d130bcffe8bf13c8808188e4eec0512031f3e9b4c6c3539263b422eac 10.24kB / 10.24kB                                                                                                                                                                        17.2s
=> => sha256:ee33dce80c14236f03e5972d44d90b4eaf7908ab8f2b9bda4c45eb07ee6e32f6 128B / 128B                                                                                                                                                                              17.4s
=> => extracting sha256:c1499316ffcfa748a10deee3ed7645645a01bc372a8fe9b9bd14e1cd0df5c464                                                                                                                                                                                0.1s
=> => extracting sha256:6e6162b82c961596fd81c96b0d027c6977b04856b344d4c6b37036fd25804592                                                                                                                                                                                0.5s
=> => sha256:5332a007b18549726e1810f819ac509c86ed00c15f26e7eb6efeeb94611dfb2b 168B / 168B                                                                                                                                                                              17.6s
=> => sha256:5a24baf7c78c8697fcee99bcca4a2842ae8093ca8a49c1e2d34e87153a21bd1a 5.93kB / 5.93kB                                                                                                                                                                          17.8s
=> => sha256:55772d575d05d04f07bf82489f789c98621f643e5c5f8a49e94588780d69cf5f 186B / 186B                                                                                                                                                                              18.0s
=> => extracting sha256:678fdefd6cc39131fa99ef3e532be8627d17e1b39a17b32b375c23584095d9be                                                                                                                                                                                0.1s
=> => extracting sha256:7960bd43e7e7093fc87228eaf9f132681666766f6fada680c0a498256ce300c7                                                                                                                                                                                0.0s
=> => extracting sha256:1eef446a2d115c56650f364dc950fc80e4338b8141a9ac82ed6fdc1a34a7adca                                                                                                                                                                                0.0s
=> => sha256:d16299ff3f87ff575cc6869657c06c344343b2941738c73387c21b28e0d45908 122.25kB / 122.25kB                                                                                                                                                                      18.4s
=> => sha256:2b715279f55e071fc7c3c5d7b117ce1d087cf17260416a43887b030f5c9b8036 1.45MB / 1.45MB                                                                                                                                                                          20.4s
=> => sha256:e83c38e3d82450264a577f53383bb49b90537787b2105a9e500701a099a9df64 13.39MB / 13.39MB                                                                                                                                                                        38.8s
=> => extracting sha256:717379dd4557593dd073a1d33e202a9b43a51fa7497284b3ad6f481345113536                                                                                                                                                                                5.6s
=> => sha256:79060cd7b9fcbff3b2b61996bb1bfec3941b588dae6163bd37587f04694e7118 3.15MB / 3.15MB                                                                                                                                                                          30.2s
=> => sha256:62e22136165dacf434e813d74f1d0ed2042ff543c2184bad58c7f8cd9b192d2a 17.39MB / 17.39MB                                                                                                                                                                        33.0s
=> => sha256:d2f246b1af8ca97c0f021dabab0db7cc09d5b6f52054373d6d5c99ca4a923bc4 189.59MB / 189.59MB                                                                                                                                                                      62.7s
=> => extracting sha256:1752a03d130bcffe8bf13c8808188e4eec0512031f3e9b4c6c3539263b422eac                                                                                                                                                                                0.0s
=> => extracting sha256:ee33dce80c14236f03e5972d44d90b4eaf7908ab8f2b9bda4c45eb07ee6e32f6                                                                                                                                                                                0.0s
=> => extracting sha256:5332a007b18549726e1810f819ac509c86ed00c15f26e7eb6efeeb94611dfb2b                                                                                                                                                                                0.0s
=> => extracting sha256:5a24baf7c78c8697fcee99bcca4a2842ae8093ca8a49c1e2d34e87153a21bd1a                                                                                                                                                                                0.0s
=> => sha256:bfc58f7df261018ac913c2248856b7f402a21739f778a73667bfac10ce7fccc5 138.67MB / 138.67MB                                                                                                                                                                      65.9s
=> => extracting sha256:55772d575d05d04f07bf82489f789c98621f643e5c5f8a49e94588780d69cf5f                                                                                                                                                                                0.0s
=> => extracting sha256:d16299ff3f87ff575cc6869657c06c344343b2941738c73387c21b28e0d45908                                                                                                                                                                                0.0s
=> => extracting sha256:2b715279f55e071fc7c3c5d7b117ce1d087cf17260416a43887b030f5c9b8036                                                                                                                                                                                0.1s
=> => extracting sha256:e83c38e3d82450264a577f53383bb49b90537787b2105a9e500701a099a9df64                                                                                                                                                                                1.0s
=> => extracting sha256:79060cd7b9fcbff3b2b61996bb1bfec3941b588dae6163bd37587f04694e7118                                                                                                                                                                                0.2s
=> => extracting sha256:62e22136165dacf434e813d74f1d0ed2042ff543c2184bad58c7f8cd9b192d2a                                                                                                                                                                                0.7s
=> => extracting sha256:d2f246b1af8ca97c0f021dabab0db7cc09d5b6f52054373d6d5c99ca4a923bc4                                                                                                                                                                               11.2s
=> => extracting sha256:bfc58f7df261018ac913c2248856b7f402a21739f778a73667bfac10ce7fccc5                                                                                                                                                                                5.7s
=> [ssr-builder 1/7] FROM registry.cn-qingdao.aliyuncs.com/dataease/sqlbot-base:latest@sha256:5f1602bbb306a4f24fb73797eeaa41f539f6dd236936a896063265a9cd655faf                                                                                                         55.0s
=> => resolve registry.cn-qingdao.aliyuncs.com/dataease/sqlbot-base:latest@sha256:5f1602bbb306a4f24fb73797eeaa41f539f6dd236936a896063265a9cd655faf                                                                                                                      0.0s
=> => sha256:5f1602bbb306a4f24fb73797eeaa41f539f6dd236936a896063265a9cd655faf 1.61kB / 1.61kB                                                                                                                                                                           0.0s
=> => sha256:59e22667830bf04fb35e15ed9c70023e9d121719bb87f0db7f3159ee7c7e0b8d 28.23MB / 28.23MB                                                                                                                                                                         6.2s
=> => sha256:60e3dbde8a7285935e47e6122ee0c440d935df1af5277a89e45ed3af8c7f9da0 1.44kB / 1.44kB                                                                                                                                                                           0.0s
=> => sha256:d4112c627f99470a588ac096d77321e2941f1ae66f297b3eae40cbaae0212041 6.30kB / 6.30kB                                                                                                                                                                           0.0s
=> => sha256:abd846fa1cdb2ae1ef7731213cd4f0c40b05fdbeeaef9301a4dc9575b2088ece 3.51MB / 3.51MB                                                                                                                                                                           1.0s
=> => sha256:b7b61708209ad8f9b9a11c61dc9df90f74c1e39eddc169936146259febc2ec24 16.21MB / 16.21MB                                                                                                                                                                         5.0s
=> => sha256:4085babbc5702254267393a22fc7f0d644efddd41dc328f81b1549c13a210b4e 249B / 249B                                                                                                                                                                               1.2s
=> => sha256:41aa4b05abc967567fcc949d31d533c12de0112e53749a28b28bedd32002d89a 17.39MB / 17.39MB                                                                                                                                                                         4.2s
=> => sha256:4ae0ababaedadcb88fa606c101cac74b0544d9b97bc347f637d85f9168eb7b7e 220.27MB / 220.27MB                                                                                                                                                                      41.8s
=> => extracting sha256:59e22667830bf04fb35e15ed9c70023e9d121719bb87f0db7f3159ee7c7e0b8d                                                                                                                                                                                1.9s
=> => extracting sha256:abd846fa1cdb2ae1ef7731213cd4f0c40b05fdbeeaef9301a4dc9575b2088ece                                                                                                                                                                                0.2s
=> => extracting sha256:b7b61708209ad8f9b9a11c61dc9df90f74c1e39eddc169936146259febc2ec24                                                                                                                                                                                1.1s
=> => extracting sha256:4085babbc5702254267393a22fc7f0d644efddd41dc328f81b1549c13a210b4e                                                                                                                                                                                0.0s
=> => extracting sha256:41aa4b05abc967567fcc949d31d533c12de0112e53749a28b28bedd32002d89a                                                                                                                                                                                0.6s
=> => extracting sha256:4ae0ababaedadcb88fa606c101cac74b0544d9b97bc347f637d85f9168eb7b7e                                                                                                                                                                               12.9s
=> [internal] load build context                                                                                                                                                                                                                                        0.4s
=> => transferring context: 31.97MB                                                                                                                                                                                                                                     0.3s
=> [sqlbot-builder 2/7] RUN mkdir -p /opt/sqlbot/app /opt/sqlbot/frontend                                                                                                                                                                                               3.6s
=> [sqlbot-ui-builder 2/4] RUN mkdir -p /opt/sqlbot/app /opt/sqlbot/frontend                                                                                                                                                                                            3.6s
=> [ssr-builder 2/7] WORKDIR /app                                                                                                                                                                                                                                       3.6s
=> [ssr-builder 3/7] RUN apt-get update && apt-get install -y --no-install-recommends     build-essential python3 pkg-config     libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev     libpixman-1-dev libfreetype6-dev     && rm -rf /var/lib/apt/li  10.1s
=> [sqlbot-builder 3/7] WORKDIR /opt/sqlbot/app                                                                                                                                                                                                                         0.1s
=> [sqlbot-ui-builder 3/4] COPY frontend /tmp/frontend                                                                                                                                                                                                                  0.2s
=> [sqlbot-ui-builder 4/4] RUN cd /tmp/frontend && npm install && npm run build && mv dist /opt/sqlbot/frontend/dist                                                                                                                                                  126.9s
=> [ssr-builder 4/7] RUN npm config set fund false     && npm config set audit false     && npm config set progress false                                                                                                                                               1.5s
=> [ssr-builder 5/7] COPY g2-ssr/app.js g2-ssr/package.json /app/                                                                                                                                                                                                       0.1s
=> [ssr-builder 6/7] COPY g2-ssr/charts/* /app/charts/                                                                                                                                                                                                                  0.0s
=> [ssr-builder 7/7] RUN npm install                                                                                                                                                                                                                                   53.0s
=> [stage-4 2/9] RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &&     echo "Asia/Shanghai" > /etc/timezone                                                                                                                                                5.6s
=> [stage-4 3/9] COPY start.sh /opt/sqlbot/app/start.sh                                                                                                                                                                                                                 1.4s
=> [stage-4 4/9] COPY g2-ssr/*.ttf /usr/share/fonts/truetype/liberation/                                                                                                                                                                                                0.6s
=> [sqlbot-builder 4/7] COPY  --from=sqlbot-ui-builder /opt/sqlbot/frontend /opt/sqlbot/frontend                                                                                                                                                                        0.1s
=> [sqlbot-builder 5/7] RUN test -f "./uv.lock" &&     --mount=type=cache,target=/root/.cache/uv     --mount=type=bind,source=backend/uv.lock,target=uv.lock     --mount=type=bind,source=backend/pyproject.toml,target=pyproject.toml     uv sync --frozen --no-insta  0.2s
=> [sqlbot-builder 6/7] COPY ./backend /opt/sqlbot/app                                                                                                                                                                                                                  0.1s
=> [sqlbot-builder 7/7] RUN --mount=type=cache,target=/root/.cache/uv     uv sync --extra cpu                                                                                                                                                                         140.6s
=> [stage-4 5/9] COPY --from=sqlbot-builder /opt/sqlbot /opt/sqlbot                                                                                                                                                                                                    45.4s
=> [stage-4 6/9] COPY --from=ssr-builder /app /opt/sqlbot/g2-ssr                                                                                                                                                                                                       19.1s
=> [stage-4 7/9] COPY --from=vector-model /opt/maxkb/app/model /opt/sqlbot/models                                                                                                                                                                                      14.9s
=> [stage-4 8/9] WORKDIR /opt/sqlbot/app                                                                                                                                                                                                                                0.0s
=> [stage-4 9/9] RUN mkdir -p /opt/sqlbot/images /opt/sqlbot/g2-ssr                                                                                                                                                                                                     0.2s
=> exporting to image                                                                                                                                                                                                                                                  41.2s
=> => exporting layers                                                                                                                                                                                                                                                 41.2s
=> => writing image sha256:619c0d43c10dd87cb47d94d8e125dc823c240bed48772946ba34e72e58393f74                                                                                                                                                                             0.0s
=> => naming to registry.cn-qingdao.aliyuncs.com/dataease/sqlbot:dev-rc1                                                                                                                                                                                                0.0s

2 warnings found (use --debug to expand):
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "POSTGRES_PASSWORD") (line 81)
- UndefinedVar: Usage of undefined variable '$LD_LIBRARY_PATH' (line 84)
```

使用 docker images 可查看镜像是否成功打包.
```
root@iZt4n65gnl36fhkxbx0qgrZ:~/SQLBot# docker images
REPOSITORY                                         TAG       IMAGE ID       CREATED         SIZE
registry.cn-qingdao.aliyuncs.com/dataease/sqlbot   dev-rc1   dfe2e3227a66   8 minutes ago   3.98GB
```

