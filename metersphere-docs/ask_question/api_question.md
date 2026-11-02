---
title: "接口测试"
---

## 1 离线包安装，如何引用 Python3 第三方依赖包？

:::note[注意]

Python3 引用第三方依赖包有【挂载本地目录】和【容器共享目录】两种方式，任选其中一种方式即可。

:::

:::note[挂载本地目录]

```
# 安装python3.11 及虚拟环境
apt update && sudo apt upgrade -y
apt install software-properties-common -y
add-apt-repository ppa:deadsnakes/ppa
apt install -y python3.11 python3.11-venv

# 创建一个目录用于python虚拟环境
mkdir /root/.venv
cd /root/.venv
python3.11 -m venv .
source bin/activate

# 安装三方包
pip install requests
pip install pinyin
```

配置 task-runner 的目录挂载 /root/.venv/lib/python3.11/site-packages:/usr/local/lib/python3.11/site-packages

![接口测试](/img/metersphere/ask_question/api_question/task_runner_volumn.png)

图 1  Task-Runner 目录挂载

配置完成后执行 msctl reload，服务启动后就可以在 Python3 脚本中直接使用三方包了

![接口测试](/img/metersphere/ask_question/api_question/python3代码.png)

图 2  Python3 代码

:::

:::note[容器共享目录]

使用 Dockerfile 制作一个 python 容器

```
FROM python:3.11-alpine

RUN pip install requests pinyin -i https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple 

VOLUME ["/usr/local/lib/python3.11/site-packages"]
```

修改 docker-compose-task-runner.yml 文件
```
version: "3"
services:
  python:
    container_name: python
    image: python:3.11
    command: sh -c "tail -f /dev/null"  # 保持容器运行

  task-runner:
    image: ${MS_IMAGE_PREFIX}/metersphere-ce:${MS_IMAGE_TAG}
    container_name: task-runner
    deploy:
      resources:
        limits:
          memory: ${MS_RUNNER_MEM_LIMIT}
    entrypoint:
      - sh
      - -c
      - |
        sh /shells/task-runner.sh
    environment:
      TOTP_ENABLED: ${MS_TOTP_ENABLED}
      TOTP_SECRET: ${MS_TOTP_SECRET}
    ports:
      - ${MS_TASK_RUNNER_PORT}:8000
    healthcheck:
      test: [ "CMD", "nc", "-zv", "localhost", "8000" ]
      interval: 6s
      timeout: 5s
      retries: 50
    volumes:
      - ${MS_BASE}/metersphere/logs/task-runner:/opt/metersphere/logs/task-runner
    volumes_from:
      - python
    restart: always
    networks:
      - ms-network
```

:::

## 2 本地执行检测，出现 “网络异常，请检查您的网络连接是否正常”

:::note[配置 localhost 异常]

【个人执行-本地执行】配置 [http://localhost:8000](http://localhost:8000)，页面报“网络异常，请检查您的网络连接是否正常”

:::

![接口测试](/img/metersphere/ask_question/api_question/本地执行localhost.png)

图 3  本地执行 localhost

:::note

在 Chrome 浏览器上访问【chrome://flags/#block-insecure-private-network-requests】将该项设置为【disabled】，重启浏览器即可

:::

![接口测试](/img/metersphere/ask_question/api_question/localhost设置.png)

图 4  localhost 设置

:::note

若是 Edge 浏览器，则输入【edge://flags】后，搜索【block-insecure-private-network-requests】将其设置【disabled】

:::

![接口测试](/img/metersphere/ask_question/api_question/Edge浏览器.png)

图 5  Edge 浏览器

:::note

点击【检测并保存】即可检测通过

:::

![接口测试](/img/metersphere/ask_question/api_question/localhost检测通过.png)

图 6  localhost 检测通过

:::note[配置本地IP异常]

【本地执行】配置 `http://本地IP:8000` 则会出现如下的跨域问题。

:::

![接口测试](/img/metersphere/ask_question/api_question/本地执行.png)

图 7  本地执行

:::note

在 Chrome 浏览器上访问【chrome://settings/】后，点击【隐私和安全-网站设置-更多内容设置-不安全内容-允许显示不安全内容-添加】

:::

![接口测试](/img/metersphere/ask_question/api_question/IP浏览器设置.png)

图 8  IP 浏览器设置

![接口测试](/img/metersphere/ask_question/api_question/IP不安全内容.png)

图 9  IP 不安全内容

:::note

添加 MeterSphere 平台域名后，点击小三角后，在"不安全内容"处设置"允许"

:::

![接口测试](/img/metersphere/ask_question/api_question/IP添加运行域名.png)

图 10  IP 添加运行域名

![接口测试](/img/metersphere/ask_question/api_question/不安全内容允许.png)

图 11  不安全内容允许

:::note

若是 Edge 浏览器，则输入【edge://settings】后，搜索【不安全内容】后，点击不安全内容，添加 MeterSphere 平台域名即可

:::

![接口测试](/img/metersphere/ask_question/api_question/Edge不安全.png)

图 12  Edge 不安全

![接口测试](/img/metersphere/ask_question/api_question/Edge添加域名.png)

图 13  Edge 添加域名

:::note

点击【检测并保存】即可检测通过

:::

![接口测试](/img/metersphere/ask_question/api_question/IP检测通过.png)

图 14  IP 检测通过

## 3 资源池无法访问当前站点

:::note[问题现象]

【接口测试】执行请求时，页面提示"资源池无法访问当前站点"

:::

![接口测试](/img/metersphere/ask_question/api_question/资源池无法访问当前站点.png)

图 15  资源池无法访问当前站点

:::note[解决方法]

【系统设置-系统-资源池】编辑页面，工作节点 URL 填写为 MeterSphere 服务地址，该地址与 task-runner 容器服务之间网络要通。

:::

![接口测试](/img/metersphere/ask_question/api_question/配置当前站点.png)

图 16  配置当前站点
