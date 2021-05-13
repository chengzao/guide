---
title: vue2.x 路由
date: 2020-07-29
sidebar: "auto"
tags:
  - vue
---

:::tip

- [vue-router](https://github.com/vuejs/vue-router)

:::

## 开始使用

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
```

## 全局路由钩子

- beforeEach

```js
router.beforeEach((to, from, next) => {
  //一般登录拦截用这个,也叫导航钩子守卫
  if (path === '/login') {
    next()
    return
  }
  if (token) {
    next();
  }
})

// beforeResolve

// afterEach
```

## 组件路由钩子

- beforeRouteEnter

```js
beforeRouteEnter (to, from, next) {
  // 这里还无法访问到组件实例，this === undefined
  next( vm => {
    // 通过 `vm` 访问组件实例
  })
}

// beforeRouteUpdate

// beforeRouteLeave
```

## Vue.$router

```js
// 跳转到不同的url，但这个方法回向history栈添加一个记录，点击后退会返回到上一个页面
this.$router.push()
// 不会有记录
this.$router.replace()
// n可为正数可为负数。正数返回上一个页面,类似 window.history.go(n)
this.$router.go(n)
```

## Vue.$route

```js
// 获取通过 params 或/:id传参的参数
this.$route.params.id

// 获取通过 query 传参的参数
this.$route.query.id
```

## router render

```js
component: {
  render: h => h("router-view");
}
```

## 路由传参

- 方式一

```js
// 路由定义
{
  path: '/describe/:id',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path: `/describe/${id}`,
})
// 页面获取
this.$route.params.id
```

- 方式二

```js
// 路由定义
{
  path: '/describe',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  name: 'Describe',
  params: {
    id: id
  }
})
// 页面获取
this.$route.params.id
```

- 方式三

```js
// 路由定义
{
  path: '/describe',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path: '/describe',
    query: {
      id: id
  }
)
// 页面获取
this.$route.query.id
```

## 路由拆分

- 目录

```bash
# router
├── router
│   ├── index.js
│   └── router.js

# views目录下
views
├── Page
│   ├── api.js # 接口定义
│   ├── router.js # 路由配置
│   └── src
│       └── layered
│           ├── detail.vue
│           ├── index.vue
```

- `src/router/index.js`

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
```

- `src/router/router.js`

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

- `src/views/Page/router.js`

```js
export default {
  path: '/page',
  name: 'Page',
  component: () => import('@/components/RouterCache.vue'),
  meta: {
    keepAlive: true,
    title: 'Page A',
  },
  children: [
    {
      path: 'detail/:id',
      name: 'PageDetail',
      component: () => import('./src/detail/index.vue'),
      meta: {
        keepAlive: true,
      }
    }
  ]
}
```

## 缓存和动画

```js
<transition>
  <keep-alive :include="['a', 'b']">
  //或include="a,b" :include="/a|b/",a 和 b 表示组件的 name
  //因为有些页面,如试试数据统计,要实时刷新,所以就不需要缓存
    <router-view/> //路由标签
  </keep-alive>
  <router-view exclude="c"/>
  // c 表示组件的 name值
</transition>
```

- Cached Router: `RouterCache.vue`

```js
<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'RouterCache'
}
</script>
```

## router-view 的 key

```js
//  Vue 会复用相同组件, key可以解决 组件的 created 和 mounted 不调用问题
<router-view :key="$route.fullPath"></router-view>
```
