---
title: vue2插件
date: 2020-07-21
sidebar: "auto"
tags:
  - vue
categories:
  - frontend
---


## vue2自动注册全局组件

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
