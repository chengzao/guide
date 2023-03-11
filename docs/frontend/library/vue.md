---
title: Vue
date: 2022-02-24
sidebar: "auto"
tags:
  - vue
categories:
  - frontend
---


## 官网

- [vue2](https://v2.vuejs.org/)
- [vuex](https://github.com/vuejs/vuex)
- [vue-router](https://github.com/vuejs/vue-router)
- [awesome-vue](https://github.com/vuejs/awesome-vue)
- [vuepress](https://github.com/vuejs/vuepress)
- [nuxt.js](https://zh.nuxtjs.org/)
- [vue-cli](https://github.com/vuejs/vue-cli)

## vue2生命周期

> [https://v2.vuejs.org/v2/guide/instance.html](https://v2.vuejs.org/v2/guide/instance.html#Lifecycle-Diagram)

![lifecycle](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/lifecycle.6jyenz2z3i40.png)

## vue3

> [https://vuejs.org/guide/essentials/lifecycle.html](https://vuejs.org/guide/essentials/lifecycle.html)

![vue3 lifecycle](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/lifecycle.4oqnk7mo0c80.png)

## vuex工作流

[vuex 工作流程-图来源官网](https://vuex.vuejs.org/zh/)

![vuex](https://vuex.vuejs.org/vuex.png)

- `store` ➡️ `dispatch` ➡️ `action` ➡️ `mutation` ➡️ `state`

## vue3与vue2的区别

> 原文 https://juejin.cn/post/7146996646394462239

- vue3性能比Vue2.x快
- proxy取代Object.defineproperty
- diff方法优化： vue3新增了静态标记（patchflag）
- 静态提升
- 事件侦听器缓存
- 按需引入，通过treeSharking 体积比vue2.x更小
- 组合API（类似react hooks），可以将data与对应的逻辑写到一起，更容易理解
- 更好的Ts支持

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
