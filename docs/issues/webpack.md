# 编译工具

## webpack

### entry

- 单个入口: `string|object`
- 多页面: `object`
- 动态入口

### output

- `单入口: object`
- `多入口: object`
- `publicPath: string`
- `chunkFilename: string`

### plugins

- `plugins: []`

### module

- `module.rules:[]`

### mode

- `development`
- `production`

### devtool

## gulp

## parcel

## rollup

## Babel

Babel是一个JavaScript编译器@babel/polyfill

## browsersync

## browserify

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
const routerContext = require.context('./', true, /index\.js$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = [...routes, ...(routerModule.default || routerModule)]
})
```

## 相关链接

- [webpack 插件总结归类](https://segmentfault.com/a/1190000016816813)
- [poetries/mywiki@github](https://github.com/poetries/mywiki/wiki/webpack)
- [babel@juejin](https://juejin.im/post/5c20e870e51d4548ac6f6956)
- [使用 webpack 的各种插件提升你的开发效率](https://juejin.im/post/5c8852f95188257a323f5cee)
