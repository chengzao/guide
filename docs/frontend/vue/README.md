---
title: vue.js导航
date: 2020-07-21
sidebar: "auto"
tags:
  - vue
categories:
  - frontend
---

<!-- dirToc -->

## menu (7)

- [vue2.x常见问题](./vue-issues.md)
- [vue中的工具函数](./vue-libs.md)
- [pagination/i18n/alert](./vue-pagination.md)
- [vue 常用插件](./vue-plugins.md)
- [vue2.x组件通讯方法](./vue-props.md)
- [vue2.x 路由](./vue-router.md)
- [vue2.x的slot使用](./vue-slot.md)

<!-- dirToc -->

## 官网

- [vue](https://cn.vuejs.org/index.html)
- [vuex](https://github.com/vuejs/vuex)
- [vue-router](https://github.com/vuejs/vue-router)
- [awesome-vue](https://github.com/vuejs/awesome-vue)
- [vuepress](https://github.com/vuejs/vuepress)
- [nuxt.js](https://zh.nuxtjs.org/)
- [vue-cli](https://github.com/vuejs/vue-cli)

## vue生命周期

- [vue 生命周期-图来源官网](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

  ![lifecycle](https://cn.vuejs.org/images/lifecycle.png)

## vuex工作流

- [vuex 工作流程-图来源官网](https://vuex.vuejs.org/zh/)

  ![vuex](https://vuex.vuejs.org/vuex.png)

- `store` ➡️ `dispatch` ➡️ `action` ➡️ `mutation` ➡️ `state`

## vue自动注册全局组件

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

## 相关链接

- [基于 vue-cli@3 的项目可行性优化方案探索](https://github.com/HaoChuan9421/vue-cli3-optimization)
- [vue 源码解析](https://ustbhuangyi.github.io/vue-analysis/)
- [快速搭建一个 Vue Live Markdown](https://zhuanlan.zhihu.com/p/34466243)
- [VV-UI/VV-UI](https://github.com/VV-UI/VV-UI.git)
- [QingWei-Li/vue-markdown-loader](https://github.com/QingWei-Li/vue-markdown-loader)
- [wxsms/vue-md-loader](https://github.com/wxsms/vue-md-loader)
- [深度解析！Vue3 & React Hooks 新 UI 组件原理：Modal 弹窗](https://juejin.im/post/5e774a1ae51d4527271ebc92)
- [vue-cli3](https://kuangpf.com/vue-cli-analysis/start/npm.html)
- [vue-magic-tree](https://github.com/pengqiangsheng/vue-magic-tree/blob/master/src/components/ztree.vue)
- [vue3 & vite template repo](https://github.com/cuixiaorui/vite-scaffold-template)
