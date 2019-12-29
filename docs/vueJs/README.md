# vue

- [vue cn](https://cn.vuejs.org/index.html)
- [awesome-vue](https://github.com/vuejs/awesome-vue)

## cli

- [vue-cli](https://github.com/vuejs/vue-cli)

## lifecycle

- vue生命周期-图来源官网

  ![lifecycle](https://cn.vuejs.org/images/lifecycle.png)

## vuex

- [vuex](https://github.com/vuejs/vuex)

- vuex工作流程-图来源官网

  ![vuex](https://vuex.vuejs.org/vuex.png)

- `store` ➡️ `dispatch` ➡️ `action` ➡️ `mutation` ➡️ `state`

## router

- [vue-router](https://github.com/vuejs/vue-router)

```js
component: { render: h => h("router-view") }
```

## 项目性能优化

- [原文: Vue 项目性能优化 — 实践指南](https://juejin.im/post/5d548b83f265da03ab42471d)

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

## 相关链接

- [vue 源码解析](https://ustbhuangyi.github.io/vue-analysis/)
- [vue vnode解析](http://hcysun.me/vue-design/zh/)
- [Vue3.0 前的 TypeScript 最佳入门实践](https://juejin.im/post/5d0259f2518825405d15ae62)
- [「从源码中学习」Vue源码中的JS骚操作](https://juejin.im/post/5c73554cf265da2de33f2a32)
- [详解vue组件三大核心概念](https://juejin.im/post/5cef2f5e6fb9a07ea712f41a)
- [7个有用的Vue开发技巧](https://juejin.im/post/5ce3b519f265da1bb31c0d5f?#heading-2)
- [为vue项目添加骨架屏](https://juejin.im/entry/59e425296fb9a0451542ed44)
- [vue-cli3 项目从搭建优化到docker部署](https://juejin.im/post/5c4a6fcd518825469414e062)
- [Vue3.0 前的 TypeScript 最佳入门实践](https://juejin.im/post/5d0259f2518825405d15ae62)
- [VUE防抖与节流的最佳解决方案——函数式组件](https://juejin.im/post/5ce3e400f265da1bab298359)
- [vue-chat demo](https://github.com/microzz/vue-chat)
- [vue2.0生态的后台管理系统模板](https://github.com/lss5270/vue-admin-spa)
- [Vue 学习指南](https://zhuanlan.zhihu.com/p/33642051)
- [vue实现一个简单的天气选择功能](https://github.com/huang303513/NodejsVuePractice)
- [cube-ui](https://github.com/didi/cube-ui)
- [mint-ui](http://mint-ui.github.io/#!/zh-cn)
- [vuepress](https://vuepress.docschina.org/guide/)
- [element ui](https://github.com/ElemeFE/element)
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [Apollo Boost](https://akryum.github.io/vue-apollo/zh-cn/)
- [Vue + GraphQL初试](https://juejin.im/post/5b2640bee51d45588d4d68d2#heading-8)
- [VUE组件汇总](https://juejin.im/post/5af16a2cf265da0b8636353b)
- [vue-awesome-swipe](https://github.com/surmon-china/vue-awesome-swiper)
- [hilongjw/vue-lazyload](https://github.com/hilongjw/vue-lazyload)
- [vue-pull-to-refresh](https://github.com/bajian/vue-pull-to-refresh)
- [基于vue-cli@3的项目可行性优化方案探索](https://github.com/HaoChuan9421/vue-cli3-optimization)
- [探索vue2项目性能优化的各种可行性方案](https://github.com/HaoChuan9421/vue-optimization/tree/master)
- [weex](http://weex.apache.org/cn/)
- [vue+element 的动态路由案例](https://github.com/vkcyan/vue-element-asyncLogin)
- [xinxin-huang/vue-live-doc](https://github.com/xinxin-huang/vue-live-doc)
- [快速搭建一个Vue Live Markdown](https://zhuanlan.zhihu.com/p/34466243)
- [参考ElementUI的文档实现方案，实现自己组件库的说明文档](https://segmentfault.com/a/1190000016342795)
- [hsian/vue-component](https://github.com/hsian/vue-component)
- [从零开始搭建Vue组件库 VV-UI](https://juejin.im/entry/5a06de2151882574d17266b0)
- [VV-UI/VV-UI](https://github.com/VV-UI/VV-UI.git)
- [QingWei-Li/vue-markdown-loader](https://github.com/QingWei-Li/vue-markdown-loader)
- [wxsms/vue-md-loader](https://github.com/wxsms/vue-md-loader)
- [基于webpack4.0的用于开发vue组件的全自动脚手架配置](https://github.com/Richard-Choooou/vue-component-webpack)
- [vue中8种组件通信方式](https://juejin.im/post/5d267dcdf265da1b957081a3)
- [Vue 组件间通信六种方式（完整版）](https://juejin.im/post/5cde0b43f265da03867e78d3)
- [vue 2.6 中 slot 的新用法](https://juejin.im/post/5d23d9ddf265da1bbf6941c9)
- [vue性能优化9点建议](https://juejin.im/post/5da2c5fb6fb9a04de237a996)
- [30 道 Vue 面试题，内含详细讲解](https://juejin.im/post/5d59f2a451882549be53b170)
