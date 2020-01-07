# other

- [vuepress](https://github.com/vuejs/vuepress)
- [nuxt.js](https://zh.nuxtjs.org/)

## 项目性能优化

- [原文: Vue 项目性能优化 — 实践指南](https://juejin.im/post/5d548b83f265da03ab42471d)
- [基于vue-cli@3的项目可行性优化方案探索](https://github.com/HaoChuan9421/vue-cli3-optimization)
- [探索vue2项目性能优化的各种可行性方案](https://github.com/HaoChuan9421/vue-optimization/tree/master)
- [vue性能优化9点建议](https://juejin.im/post/5da2c5fb6fb9a04de237a996)

### 代码层面的优化

- `v-if 和 v-show 区分使用场景`
- `computed 和 watch  区分使用场景`
- `v-for 遍历必须为 item 添加 key，且避免同时使用 v-if`
- `长列表性能优化`
- `事件的销毁`
- `图片资源懒加载`
- `路由懒加载`
- `第三方插件的按需引入`
- `优化无限列表性能`
- `服务端渲染 SSR or 预渲染`

### Webpack 层面的优化

- `Webpack 对图片进行压缩`
- `减少 ES6 转为 ES5 的冗余代码`
- `提取公共代码`
- `模板预编译`
- `提取组件的 CSS`
- `优化 SourceMap`
- `构建结果输出分析`
- `Vue 项目的编译优化`

### 基础的 Web 技术的优化

- `开启 gzip 压缩`
- `浏览器缓存`
- `CDN 的使用`
- `使用 Chrome Performance 查找性能瓶颈`

## 插件

```bash
# 骨架屏
vue-skeleton-webpack-plugin

# 预渲染插件
prerender-spa-plugin

# 装饰器
vue-property-decorator

# 自定义滚动条
vue-gemini-scrollbar

# 图片预览
vue-photo-preview

# 基于 Vue 2.x 与高德的地图组件
vue-amap

# 安装webpack
webpack webpack-cli

# 配置 ES6/7/8 转 ES5代码
babel-loader
@babel/core
@babel/preset-env

# ES6/7/8 Api 转es5
@babel-polyfill

# 配置 scss 转 css
sass-loader
dart-sass
css-loader
style-loader

# 配置 postcss 实现自动添加css3前缀
postcss-loader
autoprefixer

html-webpack-plugin
webpack-dev-server

# 解析文件url，并将文件复制到输出的目录中
file-loader

# 功能与 file-loader 类似，如果文件小于限制的大小。则会返回 base64 编码，否则使用 file-loader将文件复制到输出的目录中
url-loader

# 用于解析.vue文件
vue-loader

# 用于编译模板
vue-template-compiler

# 用于缓存loader编译的结果
cache-loader

# 使用 worker 池来运行loader，每个 worker 都是一个 node.js 进程
thread-loader

# 用于压缩css代码
@intervolga/optimize-cssnano-plugin

# 用于提取css到文件中
mini-css-extract-plugin

# 用于删除上次构建的文件
clean-webpack-plugin

# 合并 webpack配置
webpack-merge

# 用户拷贝静态资源
copy-webpack-plugin

# 精灵图自动合成
postcss-sprites

# 使用 vw,vh 自适应
postcss-px-to-viewport

# 自动删除console.log
babel-plugin-transform-remove-console

# 图片压缩
img-loader
imagemin
imagemin-jpegtran
imagemin-pngquant

memory-fs

register-service-worker
workbox

js-cookie
fastclick

raw-loader

iScroll better-scroll
```
