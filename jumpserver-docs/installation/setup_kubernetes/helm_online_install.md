---
title: 安装指南
---

## 1 环境要求

- Kubernetes 1.20+
- Helm 3.0

## 2 安装部署
### 2.1 添加 JumpServer 的 Helm 源地址

```sh
helm repo add jumpserver https://jumpserver.github.io/helm-charts
helm repo list
```


<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  JumpServer Helm Chart 参数说明</div>

| Name                      | Description                                     | Value                   |
| :------------------------ | :---------------------------------------------- | :---------------------- |
| global.imageRegistry      | Global Docker image registry                    | docker.io               |
| global.imageOwner         | Global Docker image owner                       | jumpserver              |
| global.imagePullSecrets   | Global Docker registry secret names as an array | []                      |
| global.storageClass       | Global StorageClass for Persistent Volume(s)    | ""                      |
| externalDatabase.engine   | External database engine                        | postgresql              |
| externalDatabase.host     | External database host                          | localhost               |
| externalDatabase.port     | External database port                          | 5432                    |
| externalDatabase.user     | External database user                          | postgres                |
| externalDatabase.password | External database password                      | ""                      |
| externalDatabase.database | External database name                          | jumpserver              |
| externalRedis.host        | External Redis host                             | localhost               |
| externalRedis.port        | External Redis port                             | 6379                    |
| externalRedis.password    | External Redis password                         | ""                      |
| ingress.enabled           | Enable ingress                                  | true                    |
| ingress.hosts             | Ingress hosts                                   | ["test.jumpserver.org"] |
| core.config.secretKey     | Core secret key                                 | ""                      |
| core.config.bootstrapToken| Core bootstrap token                            | ""                      |
| core.env.DOMAINS          | CSRF_TRUSTED_ORIGINS                            | "test.jumpserver.org    |

### 2.2 编辑 JumpServer values.yaml 文件

```sh
vi values.yaml
```

### 2.3 安装 JumpServer


```sh
helm install jms-k8s jumpserver/jumpserver -n default -f values.yaml
```

### 2.4 卸载 JumpServer


```sh
helm uninstall jms-k8s -n default
```
