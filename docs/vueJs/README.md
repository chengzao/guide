---
title: vue
date: 2020-07-21
sidebar: "auto"
tags:
  - vue
---

::: tip

- [vue](https://cn.vuejs.org/index.html)
- [vuex](https://github.com/vuejs/vuex)
- [vue-router](https://github.com/vuejs/vue-router)
- [awesome-vue](https://github.com/vuejs/awesome-vue)
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

## router

```js
component: {
  render: h => h("router-view");
}
```

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
