---
title: vue2.x 路由
date: 2020-07-29
sidebar: "auto"
tags:
  - vue
---


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

- `src/components/RouterCache.vue`

```vue
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
