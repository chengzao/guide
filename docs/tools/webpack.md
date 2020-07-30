---
title: webpack
date: 2020-07-20
sidebar: "auto"
tags:
  - webpack
categories:
  - tools
---

## entry

- 单个入口: `string|object`
- 多页面: `object`
- 动态入口

## output

- `单入口: object`
- `多入口: object`
- `publicPath: string`
- `chunkFilename: string`

## plugins

- `plugins: []`

## module

- `module.rules:[]`

## mode

- `development`
- `production`

## devServer

- `npm package: mocker-api`

```js
...
{
  "open": true,
  "overlay": true,
  "hot": true,
  "host": "0.0.0.0",
  "port": 8080,
  "inline": true,
  "disableHostCheck": true,
  "stats": {
    "colors": true
  },
  "historyApiFallback": true,
  "before": app => {
    // mock api:
    // const ApiMocker = require('mocker-api');
    apiMocker(app, path.join(__dirname, "./mock/index.js"));
  },
  "proxy": {
    "/api": {
      "target": "http://example.com/api", // trunk 环境
      "changeOrigin": true,
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api": ""
      }
    }
  }
}
```

## 自动引入某文件夹下的文件

```js
/* 目录结构如下
router
├── index.js
├── other
│   └── index.js
├── order
│   └── index.js
└── routes.js
*/
// 自动引入router目录下文件夹内的index.js文件（例：project/index.js）

/**
require.context(directory,useSubdirectories,regExp)

  directory：说明需要检索的目录
  useSubdirectories：是否检索子目录
  regExp: 匹配文件的正则表达式,一般是文件名
*/

const routerContext = require.context("./", true, /index\.js$/);
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith("./index")) {
    return;
  }
  const routerModule = routerContext(route);
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = [...routes, ...(routerModule.default || routerModule)];
});
```

## 相关链接

- [webpack 插件总结归类](https://segmentfault.com/a/1190000016816813)
- [poetries/mywiki@github](https://github.com/poetries/mywiki/wiki/webpack)
- [babel@juejin](https://juejin.im/post/5c20e870e51d4548ac6f6956)
- [使用 webpack 的各种插件提升你的开发效率](https://juejin.im/post/5c8852f95188257a323f5cee)
- [webpack 中文](https://doc.webpack-china.org/guides/)
- [webpack：从入门到真实项目配置](https://juejin.im/post/59bb37fa6fb9a00a554f89d2)
- [webpack 集](https://github.com/poetries/mywiki/wiki/webpack)
- [JSDoc](http://usejsdoc.org/index.html)
