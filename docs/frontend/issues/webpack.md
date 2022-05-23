---
title: webpack
date: 2020-07-20
sidebar: "auto"
tags:
  - webpack
  - gulp
  - px2rem
categories:
  - frontend
---

## webpack

- [tapable（webpack核心模块）使用手册](https://mp.weixin.qq.com/s/DtBfVFTuznD0en_-OUPKJQ)
- [分享15个Webpack实用的插件！！！](https://mp.weixin.qq.com/s?__biz=MzAxOTAzNjUwMg==&mid=2448543713&idx=1&sn=58c9f7098c00d8e0d8451b7f7227baa7&scene=58&subscene=0)]

## 其他打包工具

- [esbuild](https://esbuild.org/)
- [parcel](https://parceljs.org/)
- [rollup](https://rollupjs.org/)

## mock server

- [YApi](https://github.com/YMFE/yapi)
- [mockjs](http://mockjs.com/)
- [easy-mock](https://www.easy-mock.com/)
- [mswjs/msw](https://github.com/mswjs/msw)

## 配置mock api

- [https://github.com/jaywcjlove/mocker-api](https://github.com/jaywcjlove/mocker-api)
- version: "mocker-api": "^2.8.1"

- 创建`/mocker/index.js`

```js
// mocker-api: https://github.com/jaywcjlove/mocker-api
const delay = require("mocker-api/lib/delay");

const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
  _proxy: {
    priority: "mocker",
    proxy: {
      "/api/(.*)": "http://xxx/mock/35",
    },
    changeHost: true,
  },
  "GET /api/info/:id": (req, res) => {},
};

module.exports = (noProxy ? {} : delay(proxy, 1000));
```

- 配置`vue.config.js`

```js
module.exports = {
    devServer: {
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
        proxy: {
          "/api": {
            "target": "http://xxx.com/api", // trunk 环境
            "changeOrigin": true,
            "secure": false,
            "logLevel": "debug",
            "pathRewrite": {
              "^/api": ""
            }
          },
          // '/': {
          //   target: '//xxx.com',
          //   ws: false,
          //   secure: false,
          //   changeOrigin: true
          // }
        },
        before: function (app, server, compiler) {
          if(process.NODE_ENV !== 'production'){
            const mockerFile = path.resolve('./mocker/index.js');
            apiMocker(app, mockerFile, {})
          }
        },
    },
}
```

- 配置webpack devServer

```js
module.exports = {
    devServer: {
      port: port,
      proxy: {
      // 代理 /api/user/login 到 http://127.0.0.1:3000/user/login
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
}
```

- axios

```js
// request.js
import axios from 'axios'
import { message } from 'ant-design-vue'
import store from '@/store'

function showErrorMessage(errMessage) {
  const content = errMessage || 'error'
  message.error(content, 5 * 1000)
}
// 创建axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15 * 1000,
  withCredentials: true // 跨域时cookies设置该选项
})

// 请求拦截
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截
service.interceptors.response.use(
  response => {
    // 进返回数据部分
    const res = response.data
    // 仅仅返回数据部分
    if (res.code !== 1) {
      showErrorMessage(res.message)
      //  todo
      if (res.code === 1004) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    showErrorMessage(error.message)
    return Promise.reject(error)
  }
)

export default service
```

## webpack自动引入某文件夹下的文件

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

## 配置externals引入cdn资源

- webpack.config.js

```js
module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: "Vue",
      "element-ui": "ELEMENT",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios"
    };
  },
  chainWebpack: config => {
    const cdn = {
      // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
      css: ["//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css"],
      js: [
        "//unpkg.com/vue@2.6.10/dist/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
        "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
        "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
        "//unpkg.com/axios@0.19.0/dist/axios.min.js",
        "//unpkg.com/element-ui@2.10.1/lib/index.js"
      ]
    };

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap(args => {
      // html中添加cdn
      args[0].cdn = cdn;
      return args;
    });
  }
};
```

- html template

```html
<!-- 使用CDN的CSS文件 -->
<% for (var i in htmlWebpackPlugin.options.cdn &&
htmlWebpackPlugin.options.cdn.css) { %>
<link rel="stylesheet" href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" />
<% } %>

<!-- 使用CDN的JS文件 -->
<% for (var i in htmlWebpackPlugin.options.cdn &&
htmlWebpackPlugin.options.cdn.js) { %>
<script
  type="text/javascript"
  src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"
></script>
<% } %>
```

## 浏览器调试vue

- 快速获取浏览器中选中dom节点的vue实例。`$0.vue`
- 本地调试https，跳过https证书验证方法，在浏览器里输入：`thisisunsafe`

## chrome调试mouseenter事件
- 1.选中调试的element节点
- 2.控制台执行：`$0.dispatchEvent(new MouseEvent('mouseenter', { 'bubbles': true }))`

## splitChunks配置

```js
const path = require("path")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin
const TerserPlugin = require("terser-webpack-plugin")

const { name } = require("./package")
const resolve = (dir) => path.join(__dirname, dir)

const isProd = ["production", "prod"].includes(process.env.NODE_ENV)
const port = 8081

// console.log("isProd", isProd, process.env)

module.exports = {
	publicPath:
		process.env.NODE_ENV === "production" ? "/xxx/" : "./",
	lintOnSave: false,
	outputDir: "dist",
	assetsDir: "static",
	filenameHashing: true,
	productionSourceMap: !isProd, // 生产环境的 source map
	parallel: require("os").cpus().length > 1,
	devServer: {
		open: true,
		host: "0.0.0.0",
		// 监听端口
		port,
		hot: true,
		// 关闭主机检查，使微应用可以被 fetch
		disableHostCheck: true,
		overlay: {
			warnings: false,
			errors: true,
		},
		// 配置跨域请求头，解决开发环境的跨域问题
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	},
	// 自定义webpack配置
	configureWebpack: (config) => {

		if (isProd) {
			config.optimization.minimizer.push(
				new TerserPlugin({
					sourceMap: !isProd, // Must be set to true if using source-maps in production
					terserOptions: {
						compress: {
							drop_console: true,
							drop_debugger: true,
							pure_funcs: [
								"console.log",
								"console.info",
								"console.debug",
								"console.warn",
							],
						},
					},
				}),
			)
			// 利用 splitChunks 单独打包第三方模块
			config.optimization.splitChunks = {
				cacheGroups: {
					common: {
						name: "chunk-common",
						chunks: "initial",
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0,
						priority: 1,
						reuseExistingChunk: true,
						enforce: true,
					},
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
							// or node_modules/packageName
							const packageName = module.context.match(
								/[\\/]node_modules[\\/](.*?)([\\/]|$)/,
							)[1]
							// https://docs.npmjs.com/cli/v7/configuring-npm/package-json
							// npm包名满足URL-safe
							return `npm.${packageName.replace("@", "")}`
						},
						// name: "chunk-vendors",
						chunks: "all",
						priority: 2,
						reuseExistingChunk: true,
						enforce: true,
					},
					vue: {
						name: "chunk-vue",
						test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
						chunks: "all",
						priority: 3,
						reuseExistingChunk: true,
						enforce: true,
					},
					elementUI: {
						name: "chunk-element",
						test: /[\\/]node_modules[\\/]element-ui[\\/]/,
						chunks: "all",
						priority: 4,
						reuseExistingChunk: true,
						enforce: true,
					},
					echarts: {
						name: "chunk-echarts",
						test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
						chunks: "all",
						priority: 5,
						reuseExistingChunk: true,
						enforce: true,
					}
				},
			}
		} else {
			config.devtool = "source-map"
		}
	},
	chainWebpack: (config) => {
		// 修复HMR
		config.resolve.symlinks(true)

		config.resolve.alias
			.set("@", resolve("src"))
			.set("@components", resolve("src/components"))
			.set("@router", resolve("src/router"))
			.set("@store", resolve("src/store"))

		if (isProd) {
			config.optimization.delete("splitChunks")
		}

		if (process.env.npm_config_report) {
			config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin, [
				{
					analyzerMode: "static",
				},
			])
		}

		return config
	},
	css: {
		sourceMap: !isProd,
	},
}
```

## yapi mock

- 结构

```bash
dev-server
├── index.js
├── module
│   ├── a.js
│   └── b.js
└── proxy.js
```

- index.js

```js
const chalk = require('chalk')
const proxy = require('./proxy')

const isDev = process.env.ENV === 'test'

// 输入日志
function printProxyLog () {
  console.log(chalk.green('\nRunning yApi Mock Server: '), chalk.yellow(process.env.VUE_APP_USE_MOCK ? 'Yes' : 'No'))
  console.log(chalk.red('\n =========接口代理列表 start========='))
  Object.keys(proxy).forEach(key => {
    const target = proxy[key].target
    console.log(chalk.green(`路径：${key}----->目标地址：${target}`))
  })
  console.log(chalk.red('=========接口代理列表 end========= \n'))
}

if (isDev) { printProxyLog() }

module.exports = {
  host: process.env.HOST || 'dev.xueersi.com',
  proxyTable: proxy
}
```

- proxy.js

```js
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

// 获取模块目录
const moduleName = process.argv[2] || ''
console.log(chalk.green('Running moduleName: ', moduleName))

if (!moduleName) {
  console.log(chalk.red('\n Please enter the module name \n'))
  process.exit(1)
}

let defaultMockApi = {}
let createYapiMockProxy

const findModuleDir = function () {
  const result = []
  fs.readdirSync(path.join(__dirname, '../module')).forEach(file => {
    let filePath = path.join(__dirname, '../module/' + file)
    let isDir = fs.statSync(filePath).isDirectory()
    if (isDir) { result.push(file) }
  })
  return result
}

try {
  const MockProxy = require(`./module/${moduleName}.js`)
  defaultMockApi = MockProxy.defaultMockApi
  createYapiMockProxy = MockProxy.createYapiMockProxy
} catch (error) {
  console.error(chalk.red('\nerror: '), error)
  const moduleDirStr = findModuleDir().join('|')
  console.info(chalk.red('\n 请使用: npm run [dev|build] [' + moduleDirStr + '] \n'))
  process.exit(1)
}

const yapiProxyConfig = process.env.VUE_APP_USE_MOCK ? createYapiMockProxy() : {}
module.exports = {
  ...yapiProxyConfig,
  ...defaultMockApi
}
```

- module/a.js

```js
// 默认的代理地址
const defaultMockApi = {
  '/api1': {
    'target': 'https://api.domain.com',
    'changeOrigin': true
  },
  '/api2': {
    'target': 'http://abc.domain.com',
    'changeOrigin': true
  }
}

const YapiMockApi = []

/**
 * @desc: 生成yapi的proxy
 */
const createYapiMockProxy = () => {
  let obj = {}
  YapiMockApi.forEach(key => {
    obj[key] = {
      target: 'http://yapi.domain.com/mock/1767', // yapi代理的接口地址
      ws: false,
      changeOrigin: true
    }
  })
  return obj
}

module.exports = { defaultMockApi, createYapiMockProxy }
```

## min-webpack

> [video: 手摸手带你实现打包器 仅需 80 行代码理解 webpack 的核心](https://www.bilibili.com/video/BV1oL411V7BQ)

### 获取import的路径

```js
import parser from '@babel/parser'
import traverse from '@babel/traverse'

function createAssets(filePath){
	const source = fs.readFileSync(filePath, {encoding: 'UTF8'})
  const ast = paser.parser(source, {sourceType: 'module'})
  const deps = []

  traverse.default(ast, {
    // 获取 import 后的 路径
  	ImportDeclaration({node}){
    	deps.push(node.source.value)
    }
  })

  return {source, deps}
}
```

### require

```js
(function(modules){
  function require(id){
  	const [fn, mapping] = modules[id]

    const module = { exports: {} }

    function localRequire(filePath){
    	const id = mapping[filePath]
      return require(id)
    }

    fn(localRequire, module, module.exports)

    return module.exports
  }

  require(1)
})({
	1: [function(require, module, module.exports){
        const { foo } = require('./foo.js')
        foo()
        console.log('main.js')
      },{'./foo.js: 2}
    ],
	2: [function(require, module, module.exports){
        function foo(){
          console.log('foo')
        }
    		module.exports = { foo }
  		}, {}
   ]
});
```

### mini

```js
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import { transformFromAst } from 'babel-core'
let id = 0

function createAssets(filePath){
	const source = fs.readFileSync(filePath, {encoding: 'utf-8'})

  const ast = parser.parser(source, {sourceType: 'module'})

  const deps = []

  traverse.default(ast, {
  	ImportDeclaration({node}){
    	deps.push(node.source.value)
    }
  })
  // install babel-preset-env
  const code = transformFromAst(ast, null, { presets: ['env'] })

  return { filePath, code , deps, mapping: {}, id: id++ }
}

function createGraph(){
  const mainAssets = createAssets('./example/main.js');

  const queue = [mainAssets]
  for( const asset of queue ) {
  	asset.deps.forEach( relativePath => {
    	const child = createAssets(path.resolve('./example', relativePath))
    	asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }
  return queue
}

function build(graph){
	const template = fs.readFileSync('./template/build.ejs', {encoding: 'utf-8'})

  const data = graph.map(asset => {
  	const { id, code, mapping } = asset
    return { id, code, mapping}
  })

  const code = ejs.render(tempalte, {data})

  fs.writeFileSync( './dist/bundle.js', {encoding: 'utf-8'})
}

// use
const graph = createGraph()
build(graph)
```
