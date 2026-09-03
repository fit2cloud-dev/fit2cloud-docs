## 1 安装 1Panel

    关于 1Panel 的安装部署与基础功能介绍，请参考 [1Panel 官方文档](https://1panel.cn/docs/) 。在完成了 1Panel 的安装部署后，根据提示网址打开浏览器进入 1Panel，界面如下。    

![图 1  1panel 面板界面](/img/ai-gateway/1panel.png)

## 2 安装 1Panel AI 网关

    进入应用商店应用列表，找到 1Panel AI 网关应用进行安装。    

![图 2  1Panel 应用商店一键部署](/img/ai-gateway/deploy_app_store.png)  
 
    在安装页面配置 1Panel AI 网关应用参数：

    - 名称：要创建的 1Panel AI 网关应用的名称。   
    - 版本：选择 1Panel AI 网关的版本。
    - 密码：1Panel AI 网关应用的初始管理员密码。
    - 端口：1Panel AI 网关应用的服务端口。   
    - 容器名称：1Panel AI 网关应用容器名称。    
    - CPU 限制：1Panel AI 网关应用可以使用的 CPU 核心数。   
    - 内存限制：1Panel AI 网关应用可以使用的内存大小。    
    - 端口外部访问：1Panel AI 网关应用可以使用 IP:PORT 进行访问（1Panel AI 网关应用必须勾选外部端口访问）。   

![图 3  1Panel AI 网关应用配置](/img/ai-gateway/ai_gateway_settting.png)  

    点击确认开始安装，页面自将动跳转到已安装应用列表，等待 1Panel AI 网关应用状态变为已启动。   

![图 4  安装完成](/img/ai-gateway/ai_gateway_start.png)    

## 3 访问 MaxKB 

    安装成功后，通过浏览器访问如下页面登录 1Panel AI 网关：   

    ```bash
    地址: http://目标服务器IP地址:服务运行端口（默认 8080）     
    用户名: admin    
    密码: 安装时设置的初始管理员密码
    ``` 

    为了安全，admin 第一次登录时将要求修改初始密码，修改密码后，重新登录系统即可使用 1Panel AI 网关。   

![图 5  1Panel 应用商店一键部署](/img/ai-gateway/login.png)  
