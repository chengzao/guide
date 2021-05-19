---
autoGroup-3: vue
title: vue2.x
date: 2020-07-21
sidebar: "auto"
tags:
  - vue
categories:
  - frontend
---

::: tip

- [vue](https://cn.vuejs.org/index.html)
- [vuex](https://github.com/vuejs/vuex)
- [vue-router](https://github.com/vuejs/vue-router)
- [awesome-vue](https://github.com/vuejs/awesome-vue)
- [vuepress](https://github.com/vuejs/vuepress)
- [nuxt.js](https://zh.nuxtjs.org/)
  :::

## cli

- [vue-cli](https://github.com/vuejs/vue-cli)

## lifecycle

- [vue 生命周期-图来源官网](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

  ![lifecycle](https://cn.vuejs.org/images/lifecycle.png)

## vuex

- [vuex 工作流程-图来源官网](https://vuex.vuejs.org/zh/)

  ![vuex](https://vuex.vuejs.org/vuex.png)

- `store` ➡️ `dispatch` ➡️ `action` ➡️ `mutation` ➡️ `state`

## vue 自动注册全局组件

```js
const path = require("path");
/**
 * 首字母大写
 * @param str 字符串
 * @example heheHaha
 * @return {string} HeheHaha
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * 对符合'xx/xx.vue'组件格式的组件取组件名
 * @param str fileName
 * @example abc/bcd/def/basicTable.vue
 * @return {string} BasicTable
 */
function validateFileName(str) {
  return (
    /^\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))
  );
}

const requireComponent = require.context("../../components", true, /\.vue$/);
// 找到组件文件夹下以.vue命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
requireComponent.keys().forEach(filePath => {
  // 解析文件路径： 返回文件内容
  const componentConfig = requireComponent(filePath);
  const fileName = validateFileName(filePath);
  const _filePath = path.join(__dirname, "../../components", filePath);
  if (!componentConfig.default.name) {
    console.error(
      `Vue Components path: (${_filePath}) should have a component name!!!`
    );
  }
  const componentName = componentConfig.default.name
    ? componentConfig.default.name
    : fileName + "Com";

  console.log({ componentName });
  Vue.component(componentName, componentConfig.default || componentConfig);
});
```

## 自动注册views下的路由

- `router.js`

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
```

- `routes.js`

```js
// 利用 webpack 读取 views 目录下的 router.js
const routerFile = require.context('../', true, /^\.\/views\/[\w.-]+\/router.js$/)

// 返回的 routerFile.keys() 是一个路由配置的路径数组列表 ['./views/Page/router.js']
// 循环递归调用 routerFile 去解析 每一项的路径地址 './views/Page/router.js'
// 返回 文件内容: Module { default: { path: "/page", name: 'xxx', children:[{},...]}, ... }

// 获取返回路由集合
const routesConfig = (r => {
  return r.keys().map(key => r(key).default)
})(routerFile)

// redirect
const redirectConfig = {
  path: '*',
  redirect: '/'
}

const routes = routesConfig.concat(redirectConfig)
return routes
```

## 项目性能优化

- [原文: Vue 项目性能优化 — 实践指南](https://juejin.im/post/5d548b83f265da03ab42471d)
- [基于 vue-cli@3 的项目可行性优化方案探索](https://github.com/HaoChuan9421/vue-cli3-optimization)
- [探索 vue2 项目性能优化的各种可行性方案](https://github.com/HaoChuan9421/vue-optimization/tree/master)
- [vue 性能优化 9 点建议](https://juejin.im/post/5da2c5fb6fb9a04de237a996)

### 代码层面的优化

- `v-if 和 v-show 区分使用场景`
- `computed 和 watch 区分使用场景`
- `v-for 遍历必须为 item 添加 key，且避免同时使用 v-if`
- `长列表性能优化/ Object.freeze`
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
- [vue vnode 解析](http://hcysun.me/vue-design/zh/)
- [Vue3.0 前的 TypeScript 最佳入门实践](https://juejin.im/post/5d0259f2518825405d15ae62)
- [7 个有用的 Vue 开发技巧](https://juejin.im/post/5ce3b519f265da1bb31c0d5f?#heading-2)
- [为 vue 项目添加骨架屏](https://juejin.im/entry/59e425296fb9a0451542ed44)
- [Vue3.0 前的 TypeScript 最佳入门实践](https://juejin.im/post/5d0259f2518825405d15ae62)
- [VUE 防抖与节流的最佳解决方案——函数式组件](https://juejin.im/post/5ce3e400f265da1bab298359)
- [cube-ui](https://github.com/didi/cube-ui)
- [mint-ui](http://mint-ui.github.io/#!/zh-cn)
- [vuepress](https://vuepress.docschina.org/guide/)
- [element ui](https://github.com/ElemeFE/element)
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [Apollo Boost](https://akryum.github.io/vue-apollo/zh-cn/)
- [Vue + GraphQL 初试](https://juejin.im/post/5b2640bee51d45588d4d68d2#heading-8)
- [VUE 组件汇总](https://juejin.im/post/5af16a2cf265da0b8636353b)
- [vue-awesome-swipe](https://github.com/surmon-china/vue-awesome-swiper)
- [hilongjw/vue-lazyload](https://github.com/hilongjw/vue-lazyload)
- [vue-pull-to-refresh](https://github.com/bajian/vue-pull-to-refresh)
- [vue+element 的动态路由案例](https://github.com/vkcyan/vue-element-asyncLogin)
- [xinxin-huang/vue-live-doc](https://github.com/xinxin-huang/vue-live-doc)
- [快速搭建一个 Vue Live Markdown](https://zhuanlan.zhihu.com/p/34466243)
- [参考 ElementUI 的文档实现方案，实现自己组件库的说明文档](https://segmentfault.com/a/1190000016342795)
- [hsian/vue-component](https://github.com/hsian/vue-component)
- [从零开始搭建 Vue 组件库 VV-UI](https://juejin.im/entry/5a06de2151882574d17266b0)
- [VV-UI/VV-UI](https://github.com/VV-UI/VV-UI.git)
- [QingWei-Li/vue-markdown-loader](https://github.com/QingWei-Li/vue-markdown-loader)
- [wxsms/vue-md-loader](https://github.com/wxsms/vue-md-loader)
- [基于 webpack4.0 的用于开发 vue 组件的全自动脚手架配置](https://github.com/Richard-Choooou/vue-component-webpack)
- [vue 中 8 种组件通信方式](https://juejin.im/post/5d267dcdf265da1b957081a3)
- [Vue 组件间通信六种方式（完整版）](https://juejin.im/post/5cde0b43f265da03867e78d3)
- [vue 2.6 中 slot 的新用法](https://juejin.im/post/5d23d9ddf265da1bbf6941c9)
- [30 道 Vue 面试题，内含详细讲解](https://juejin.im/post/5d59f2a451882549be53b170)
- [通过 vue-cli3 构建一个 SSR 应用程序](https://juejin.im/post/5b98e5875188255c8320f88a)
- [vue-cli3 项目从搭建优化到 docker 部署](https://juejin.im/post/5c4a6fcd518825469414e062)
- [从零开发一套完整的 vue 项目开发环境](https://juejin.im/post/5e0cba76f265da5d4e27480c)
- [深度解析！Vue3 & React Hooks 新 UI 组件原理：Modal 弹窗](https://juejin.im/post/5e774a1ae51d4527271ebc92)
- [vue-cli3](https://kuangpf.com/vue-cli-analysis/start/npm.html)
- [一个基于 Vue.js 开发的个人博客](https://github.com/XNAL/don-blog)
- [vue-cli3](https://kuangpf.com/vue-cli-analysis/start/npm.html)
- [ztree](http://www.treejs.cn/v3/demo.php#_204)
- [vue-magic-tree](https://github.com/pengqiangsheng/vue-magic-tree/blob/master/src/components/ztree.vue)
