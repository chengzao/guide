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



```js
const path = require("path");

module.exports = {
  // entry 表示 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
  // 类型可以是 string | object | array
  entry: "./app/entry", // 只有1个入口，入口只有1个文件
  entry: ["./app/entry1", "./app/entry2"], // 只有1个入口，入口有2个文件
  entry: {
    // 有2个入口
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },

  // 如何输出结果：在 Webpack 经过一系列处理后，如何输出最终想要的代码。
  output: {
    // 输出文件存放的目录，必须是 string 类型的绝对路径。
    path: path.resolve(__dirname, "dist"),

    // 输出文件的名称
    filename: "bundle.js", // 完整的名称
    filename: "[name].js", // 当配置了多个 entry 时，通过名称模版为不同的 entry 生成不同的文件名称
    filename: "[chunkhash].js", // 根据文件内容 hash 值生成文件名称，用于浏览器长时间缓存文件

    // 发布到线上的所有资源的 URL 前缀，string 类型
    publicPath: "/assets/", // 放到指定目录下
    publicPath: "", // 放到根目录下
    publicPath: "https://cdn.example.com/", // 放到 CDN 上去

    // 导出库的名称，string 类型
    // 不填它时，默认输出格式是匿名的立即执行函数
    library: "MyLibrary",

    // 导出库的类型，枚举类型，默认是 var
    // 可以是 umd | umd2 | commonjs2 | commonjs | amd | this | var | assign | window | global | jsonp ，
    libraryTarget: "umd",

    // 是否包含有用的文件路径信息到生成的代码里去，boolean 类型
    pathinfo: true,

    // 附加 Chunk 的文件名称
    chunkFilename: "[id].js",
    chunkFilename: "[chunkhash].js",

    // JSONP 异步加载资源时的回调函数名称，需要和服务端搭配使用
    jsonpFunction: "myWebpackJsonp",

    // 生成的 Source Map 文件名称
    sourceMapFilename: "[file].map",

    // 浏览器开发者工具里显示的源码模块名称
    devtoolModuleFilenameTemplate: "webpack:///[resource-path]",

    // 异步加载跨域的资源时使用的方式
    crossOriginLoading: "use-credentials",
    crossOriginLoading: "anonymous",
    crossOriginLoading: false
  },

  // 配置模块相关
  module: {
    rules: [
      // 配置 Loader
      {
        test: /\.jsx?$/, // 正则匹配命中要使用 Loader 的文件
        include: [
          // 只会命中这里面的文件
          path.resolve(__dirname, "app")
        ],
        exclude: [
          // 忽略这里面的文件
          path.resolve(__dirname, "app/demo-files")
        ],
        use: [
          // 使用那些 Loader，有先后次序，从后往前执行
          "style-loader", // 直接使用 Loader 的名称
          {
            loader: "css-loader",
            options: {
              // 给 html-loader 传一些参数
            }
          }
        ]
      }
    ],
    noParse: [
      // 不用解析和处理的模块
      /special-library\.js$/ // 用正则匹配
    ]
  },

  // 配置插件
  plugins: [],

  // 配置寻找模块的规则
  resolve: {
    modules: [
      // 寻找模块的根目录，array 类型，默认以 node_modules 为根目录
      // "node_modules",
      path.resolve(__dirname, 'node_modules'), // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
      path.resolve(__dirname, "app")
    ],
    extensions: [".js", ".json", ".jsx", ".css"], // 模块的后缀名
    alias: {
      // 模块别名配置，用于映射模块
      // 把 'module' 映射 'new-module'，同样的 'module/path/file' 也会被映射成 'new-module/path/file'
      module: "new-module",
      // 使用结尾符号 $ 后，把 'only-module' 映射成 'new-module'，
      // 但是不像上面的，'module/path/file' 不会被映射成 'new-module/path/file'
      "only-module$": "new-module"
    },
    alias: [
      // alias 还支持使用数组来更详细的配置
      {
        name: "module", // 老的模块
        alias: "new-module", // 新的模块
        // 是否是只映射模块，如果是 true 只有 'module' 会被映射，如果是 false 'module/inner/path' 也会被映射
        onlyModule: true
      }
    ],
    symlinks: true, // 是否跟随文件软链接去搜寻模块的路径
    descriptionFiles: ["package.json"], // 模块的描述文件
    mainFields: ["main"], // 模块的描述文件里的描述入口的文件的字段名称
    enforceExtension: false // 是否强制导入语句必须要写明文件后缀
  },

  // 输出文件性能检查配置
  performance: {
    hints: "warning", // 有性能问题时输出警告
    hints: "error", // 有性能问题时输出错误
    hints: false, // 关闭性能检查
    maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
    maxEntrypointSize: 400000, // 最大入口文件大小 (单位 bytes)
    assetFilter: function(assetFilename) {
      // 过滤要检查的文件
      return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
    }
  },

  devtool: "source-map", // 配置 source-map 类型

  context: __dirname, // Webpack 使用的根目录，string 类型必须是绝对路径

  // 配置输出代码的运行环境
  target: "web", // 浏览器，默认
  target: "webworker", // WebWorker
  target: "node", // Node.js，使用 `require` 语句加载 Chunk 代码
  target: "async-node", // Node.js，异步加载 Chunk 代码
  target: "node-webkit", // nw.js
  target: "electron-main", // electron, 主线程
  target: "electron-renderer", // electron, 渲染线程

  // Webpack 在打包时忽略文件
  externals: {
    // 使用来自 JavaScript 运行环境提供的全局变量
    jquery: "jQuery"
  },

  stats: {
    // 控制台输出日志控制
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true
  },

  devServer: {
    // DevServer 相关的配置
    proxy: {
      // 代理到后端服务接口
      "/api": "http://localhost:3000"
    },
    contentBase: path.join(__dirname, "public"), // 配置 DevServer HTTP 服务器的文件根目录
    compress: true, // 是否开启 gzip 压缩
    historyApiFallback: true, // 是否开发 HTML5 History API 网页
    hot: true, // 是否开启模块热替换功能
    https: false // 是否开启 HTTPS 模式
  },

  profile: true, // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳

  cache: false, // 是否启用缓存提升构建速度

  watch: true, // 是否开始
  watchOptions: {
    // 监听模式选项
    // 不监听的文件或文件夹，支持正则匹配。默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每隔1000毫秒询问一次
    poll: 1000
  },
  // 用来告诉 Webpack 如何去寻找 Loader
  resolveLoader:{
    // 去哪个目录下寻找 Loader
    modules: ['node_modules'],
    // 入口文件的后缀
    extensions: ['.js', '.json'],
    // 指明入口文件位置的字段
    mainFields: ['loader', 'main']
  }
};
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
- [深入浅出 Webpack](http://webpack.wuhaolin.cn)
