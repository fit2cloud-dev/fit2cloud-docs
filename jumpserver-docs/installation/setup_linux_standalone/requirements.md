---
title: 环境要求
---

## 1. 操作系统


- 支持主流 Linux 发行版本（基于 Debian / RedHat，包括国产操作系统）

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 1  操作系统要求</div>

| 操作系统   | 架构 | Linux 内核  | 软件要求       | 最小化硬件配置     |
| :------------ | :----------- | :-------- | :------------------------------------ | :-------------------- |
| linux/amd64   | x86_64       | &gt;= 4.0    | wget curl tar gettext iptables python | 4Core/8GB RAM/100G HDD |
| linux/arm64   | aarch64      | &gt;= 4.0    | wget curl tar gettext iptables python | 4Core/8GB RAM/100G HDD |

### Debian / Ubuntu


```sh
apt-get update
apt-get install -y wget curl tar gettext iptables
```
### RedHat / CentOS


```sh
yum update
yum install -y wget curl tar gettext iptables
```
## 2 数据库

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 2  数据库要求</div>

| 名称        | 版本    | 默认字符集        | 默认字符编码        | TLS/SSL          |
| :--------- | :------ | :--------------- | :----------------- | :--------------- |
| PostgreSQL | &gt;= 16  | UTF8             | en_US.utf8         | ✓ |
| MySQL      | &gt;= 8.0  | utf8             | utf8_general_ci    | ✓ |
| MariaDB    | &gt;= 10.6 | utf8mb3          | utf8mb3_general_ci | ✓ |

<div style={{textAlign:"center",color:"#8a8f99",fontSize:"13px",margin:"16px 0 8px"}}>表 3  Redis 要求</div>

| 名称    | 版本 | Sentinel         | Cluster            | TLS/SSL          |
| :------ | :------ | :--------------- | :----------------- | :--------------- |
| Redis   | &gt;= 7.0  | ✓ | ✗   | ✓ |


### PostgreSQL


```pgsql
create database jumpserver with encoding='UTF8';
```
```pgsql
postgres=# \l
                                                         List of databases
    Name      |   Owner    | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |   Access privileges   
--------------+------------+----------+-----------------+------------+------------+------------+-----------+-----------------------
jumpserver    | postgres   | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | 
(1 rows)
```
### MySQL


```mysql
create database jumpserver default charset 'utf8';
```
```mysql
mysql> show create database jumpserver;
+------------+---------------------------------------------------------------------+
| Database   | Create Database                                                     |
+------------+---------------------------------------------------------------------+
| jumpserver | CREATE DATABASE `jumpserver` /*!40100 DEFAULT CHARACTER SET utf8 */ |
+------------+---------------------------------------------------------------------+
1 row in set (0.00 sec)
```
### MariaDB


```mysql
create database jumpserver default charset 'utf8';
```
```mysql
MariaDB> show create database jumpserver;
+------------+-----------------------------------------------------------------------+
| Database   | Create Database                                                       |
+------------+-----------------------------------------------------------------------+
| jumpserver | CREATE DATABASE `jumpserver` /*!40100 DEFAULT CHARACTER SET utf8mb3*/ |
+------------+-----------------------------------------------------------------------+
1 row in set (0.001 sec)
```
