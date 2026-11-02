---
title: "系统设置相关"
description: "MeterSphere 一站式开源持续测试平台官方文档。MeterSphere 涵盖测试管理、接口测试、UI 测试和性能测试等功能，全面兼容 JMeter、Selenium 等主流开源标准，有效助力开发和测试团队充分利用云弹性进行高度可 扩展的自动化测试，加速高质量的软件交付。"
---

## 1 如何理解 MeterSphere 测试资源池？

:::note

测试资源池是 MeterSphere 中的执行机集合，用于执行指定的接口或性能测试。目前支持添加 Node 资源池和 K8S 资源池，详细说明请参考[资源池配置](../installation/build_node_controller.md)。

:::

## 2 LDAP测试连接，提示`用户不存在或者不唯一`如何处理？

:::note

在【系统设置-系统参数设置-LDAP 设置】更改用户过滤器为`(cn={0})`；LDAP属性映射为`｛"username": "cn"｝`。

:::

## 3 项目如何配置通用的域名？

:::note

在【系统设置-工作空间-环境配置】页面，【通用设置】启用 Hosts，可以为项目配置通用的域名。

:::

## 4 邮件服务器连接不成功如何处理？

:::note

 导致邮箱链接不成功的原因可能是 465 端口未开放， 可在【系统设置-系统参数设置-邮件设置设置】将邮件设置中的 465 端口改成 25 端口并去掉 ssl 选项.

:::

## 5 环境配置数据库连接不通， 提示：`WARN: Establishing SSL connection without server's identity verification is not recommended.`

:::note

数据库默认开启了 SSL 验证相应的配置导致，可在【系统设置-环境管理】数据库的 URL 增加`？useSSL=false` 来解决。

:::

![! 数据库配置](/img/metersphere-v2/faq/数据库配置1.png)

图 1  数据库配置

## 6 在一个SQL请求下如何执行多条SQL？

:::note

在【系统设置-环境管理】编辑环境数据源配置的 URL 后面加上 `allowMultiQueries=true`。

:::

## 7 环境配置数据库配置提示：`no database selected`，如何解决？

:::note

需要在【系统设置-环境管理】编辑环境数据源连接 URL 中增加数据库库名信息。例如：`jdbc:mysql://127.0.0.1:3306/database`。

:::
