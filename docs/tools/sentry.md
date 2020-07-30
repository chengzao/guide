---
title: 前端监控sentry使用
date: 2020-07-20
sidebar: "auto"
tags:
  - sentry
categories:
  - tools
---

[sentry](https://sentry.io/welcome/)

[docs/docker](https://docs.sentry.io/server/installation/docker/)

## 安装

- Step1

```bash
git clone git@github.com:getsentry/onpremise.git
```

- Step2: `cd onpremise`

* Step3: 创建 name volume，持久化

```bash
docker volume create --name=sentry-data && docker volume create --name=sentry-postgres
```

- Step4: `cp -n .env.example .env`

- Step5

```bash
# onpremise下 创建目录
mkdir -p data/{sentry,postgres}
# 一定执行，不然报错，然后再生成key
docker-compose build
```

- Step6: 生成 key 放到 `.env` 文件中

```bash
# 获取项目的key
docker-compose run --rm web config generate-secret-key
```

- Step7: 生成数据库，并在这一步设置超级用户

```bash
docker-compose run --rm web upgrade
```

- Step8: 开启 sentry 服务

```bash
docker-compose up -d
```

- Step9: `http:://localhost:9000 即可进入sentry`

- DSN

```bash
# DSN位置：项目 - 选择目标项目 - 设置 - 客户端密钥 (DSN) - 配置
{PROTOCOL}://{PUBLIC_KEY}:{SECRET_KEY}@{HOST}/{PATH}{PROJECT_ID}

PROTOCOL 使用的协议: http或https
PUBLIC_KEY 验证sdk的公钥
SECRET_KEY 验证sdk的密钥
HOST 目标sentry服务器
PATH 通常为空
PROJECT_ID 验证用户绑定的项目id
```

- 客户端中使用

```js
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "http://PUBLIC_KEY:SECRET_KEY@localhost:9000/PROJECT_ID",
  release: "sentry_app@20190710",
  environment: process.env.NODE_ENV
});
```

## example

- 工程目录部分文件 [示例](https://github.com/chengzao/react-demo/tree/master/sentry-react)

```bash
.
├── .gitignore
├── .sentryclirc # sentry配置文件
├── config-overrides.js # react-app-rewired配置文件
├── README.md
├── build # 打包后的文件
│   └── static
│       ├── js
│       │   ├── main.28cb07aa.chunk.js
│       │   └── main.28cb07aa.chunk.js.map
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.js
│   ├── Button.js
│   ├── index.js
│   └── serviceWorker.js
└── yarn.lock
```

- `package.json`部分配置

```json
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build"
  },
  "devDependencies": {
    "@sentry/webpack-plugin": "^1.7.0",
    "react-app-rewired": "^2.1.3"
  }
```

- `npx create-react-app react-sentry`
- `.sentryclirc`

```bash
[defaults]
url = http://localhost:9000
org = sentry
project = react-sentry

[auth]
token = 9210xxxxxxxx42b5823d8b0f6ebfdbb4
```

- `Button.js`

```js
import React, { Component } from "react";
class Button extends Component {
  constructor() {
    this.methodDoesNotExist = this.methodDoesNotExist.bind(this);
  }
  methodDoesNotExist() {
    throw new Error(`我是一个抛出的错误日志: ${new Date()}`);
  }
  render() {
    return <button onClick={this.methodDoesNotExist}> Break the world</button>;
  }
}
export default Button;
```

- `App.js`

```js
import React from "react";
import * as Sentry from "@sentry/browser";
import Button from "./Button";

// 自建sentry服务的dsn组成部分
// dsn: PROTOCOL://PUBLIC_KEY:SECRET_KEY@localhost:9000/PROJECT_ID
Sentry.init({
  dsn: "http://05bdfb2xxxx77:00a40ae1bxxxxf0@localhost:9000/4",
  release: "react-sentry@20190711",
  environment: process.env.NODE_ENV
});
function App() {
  return (
    <div className="App">
      <Button />
    </div>
  );
}
export default App;
```

- 上传 sourcemap 文件：`sentry-cli`

```bash
# sentry-cli releases -o 组织 -p 项目 files staging@1.0.1 upload-sourcemaps js文件所在目录 --url-prefix 线上资源URI

# 运行如下命令
sentry-cli releases files react-sentry@20190711 upload-sourcemaps ./build/ --url-prefix '~/static/js/'
```

- 上传 sourcemap 文件：`@sentry/webpack-plugin`

```bash
# 通过配置webpack： config-overrides.js
# 安装：react-app-rewired
$ `npm install react-app-rewired --save-dev`
```

- 配置`config-overrides.js`

```js
const SentryCliPlugin = require("@sentry/webpack-plugin");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  if (process.env.NODE_ENV === "production") {
    config.plugins.push(
      new SentryCliPlugin({
        include: "./build",
        urlPrefix: "~/static/js/",
        ignoreFile: ".sentrycliignore",
        ignore: ["node_modules", "webpack.config.js"],
        configFile: "sentry.properties"
      })
    );
  }
  return config;
};
```

- 运行`npm run build`上传 sourcemap

## 相关链接

- [异常监控服务 Sentry 的部署](https://juejin.im/post/5d12b99cf265da1bb77677c5)
- [前端异常监控之 Sentry 的部署和使用](https://juejin.im/post/5b55c33ae51d45198f5c7a91)
- [给你的项目装个探头 — Sentry](https://juejin.im/post/5d1461e1f265da1bbb03ecc2)
- [webfunny](https://www.webfunny.cn/webfunny/createProject)
