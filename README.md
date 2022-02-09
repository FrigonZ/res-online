# 线上订单系统后台
山东大学软件工程专业毕业设计

## 技术选型

nodejs + koa + typescript + redis

- 使用koa框架提供模块化的http服务
- 面向对象
- 提供服务端stateless的RESTful风格接口
- 使用ws提供websocket服务
- pm2集群部署
- redis共享集群数据
- pm2容灾恢复, 负载均衡

## 部署

使用腾讯云进行部署

- 2核4g云服务器
- mysql云数据库
- cos服务
