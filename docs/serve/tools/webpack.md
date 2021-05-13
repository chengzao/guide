---
title: webpack
date: 2020-07-20
sidebar: "auto"
tags:
  - webpack
  - gulp
  - px2rem
categories:
  - tools
---

## webpack 优化

- 缩小文件搜索范围
- 使用 DllPlugin
- 使用 HappyPack
- 使用 ParallelUglifyPlugin
- 压缩代码 UglifyJSPlugin
- CDN(Content Delivery Network) 加速 `output：publicPath`
- 使用 Tree Shaking, 消除无用的 js 代码
- 提取公共代码
- 分割代码按需加载
- webpack-bundle-analyzer 是另一个可视化分析工具

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

## gulp

- 项目目录

```bash
├── gulpfile.js
├── output
├── package-lock.json
├── package.json
└── src
    ├── index.js
    ├── m
    │   └── m.css
    ├── other
    │   ├── m
    │   │   └── other-m.css
    │   └── pc
    │       └── other-pc.css
    └── pc
        └── pc.css
```

- `gulpfile.js`

```js
// 将 `src/xxx/m/xxx.css`转换为rem

const { src, dest } = require("gulp");
var postcss = require("gulp-postcss");
var pxtorem = require("postcss-pxtorem");
exports.default = function() {
  // https://github.com/cuth/postcss-pxtorem 配置
  var processors = [
    pxtorem({
      replace: true,
      propList: ["*"],
      exclude: function(path) {
        const matchPath = /src\/(.+\/)*m\//.test(path);
        return !matchPath;
      }
    })
  ];

  return src("src/**/*.css")
    .pipe(postcss(processors))
    .pipe(dest("output/css"));
};
```

## webpack 配置

- [原文地址](http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-8%E6%95%B4%E4%BD%93%E9%85%8D%E7%BD%AE%E7%BB%93%E6%9E%84.html)

<CodeBlock>

<<< @/utils/libs/js/webpackConfig.js

</CodeBlock>

## 相关链接

- [webpack 插件总结归类](https://segmentfault.com/a/1190000016816813)
- [poetries/mywiki@github](https://github.com/poetries/mywiki/wiki/webpack)
- [babel@juejin](https://juejin.im/post/5c20e870e51d4548ac6f6956)
- [使用 webpack 的各种插件提升你的开发效率](https://juejin.im/post/5c8852f95188257a323f5cee)
- [webpack 中文](https://doc.webpack-china.org/guides/)
- [webpack：从入门到真实项目配置](https://juejin.im/post/59bb37fa6fb9a00a554f89d2)
- [webpack 集](https://github.com/poetries/mywiki/wiki/webpack)
- [JSDoc](http://usejsdoc.org/index.html)
- [深入浅出 Webpack](http://webpack.wuhaolin.cn)
