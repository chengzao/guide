---
title: pm2
date: 2020-07-21
sidebar: "auto"
tags:
  - node.js
categories:
  - server
---

- `npm install express`

```js
// app.js
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Example app listening on port 3000!"));
```

## 安装

```bash
npm install -g pm2
```

## 直接启动项目

```bash
# Start and Daemonize any application:
pm2 start app.js
# Make pm2 auto-boot at server restart
pm2 startup
```

## 查看应用列表

```bash
pm2 list
```

## 查看应用详情

```bash
pm2 show id
# example
pm2 show 0
```

## 监控 CPU/内存

```bash
pm2 monit
```

## 监听代码变化

```bash
pm2 start app.js --watch
```

- 忽略某些文件，配置文件`ecosystem.config.js`

```bash
{
  "watch": ["server", "client"],
  "ignore_watch" : ["node_modules", "client/img"],
  "watch_options": {
    "followSymlinks": false
  }
}
```

## 配置文件

- Generate configuration: `pm2 ecosystem|init`

```js
module.exports = {
  apps: [
    {
      name: "API",
      script: "app.js",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "one two",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "node",
      host: "0.0.0.0",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
```

- `ecosystem.config.js`

```js
module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
// multiple application
module.exports = {
  apps: [
    {
      name: "worker",
      script: "./worker.js",
      watch: true,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    },
    {
      name: "api-app",
      script: "./api.js",
      instances: 4,
      exec_mode: "cluster"
    }
  ]
};
```

- `pm2 [start|restart|reload|stop|delete] ecosystem.config.js`

```bash
# Start all applications
pm2 start ecosystem.config.js

# Start only the app named worker-app
pm2 start ecosystem.config.js --only worker-app

# Stop all
pm2 stop ecosystem.config.js

# Restart all
pm2 start   ecosystem.config.js
## Or
pm2 restart ecosystem.config.js

# Reload all
pm2 reload ecosystem.config.js

# Delete all
pm2 delete ecosystem.config.js
```

- Switching environments

```bash
# Inject what is declared in env_production
pm2 start ecosystem.config.js --env production
pm2 start ecosystem.config.js --watch --env production

# Inject what is declared in env_development
pm2 start ecosystem.config.js --env development
pm2 start ecosystem.config.js --watch --env development

# Inject what is declared in env_staging
pm2 restart ecosystem.config.js --env staging
```

## 停止应用进程

```bash
# 停止所有的应用进程
pm2 stop all
# 停止id为0的应用进程
pm2 stop 0
```

## 删除应用进程

```bash
# 终止并删除所有的应用进程
pm2 delete all
# 终止并id为0的应用进程
pm2 delete 0

# 杀掉所有pm2管理的应用进程
pm2 kill
```

## 应用部署

```bash
# 通过配置文件给远程服务器（生产环境）部署项目
pm2 deploy app.json prod setup

# 通过配置文件给远程服务器（生产环境）更新已部署项目
pm2 deploy app.json prod

# # Revert "prod" remote server by 2
pm2 deploy app.json prod revert 2
```

## 集群模式

```bash
# 在集群模式下启动4个应用实例，自动分配请求给每个实例，实现负载均衡
pm2 start app.js -i 4
# 将集群应用实例缩放到10个
pm2 scale [app-name] 10
# 增加10个应用进程
pm2 scale [app-name] +10

# 集群模式下优雅地重启所有应用
pm2 gracefulReload all
```

## 日志管理

- 以特殊日期格式查看日志

```bash
# 以特殊日期格式查看server应用的日志
pm2 logs server --format
```

- 以 JSON 格式查看日志

```bash
pm2 logs server --json
```

- 查看近 3 行日志

```bash
pm2 logs server --lines 3
```

- 清除所有的旧志信息

```bash
pm2 flush
```

- 重载所有的日志信息

```bash
pm2 reloadLogs
```
