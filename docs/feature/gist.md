---
title: feature gist
time: 2019-6-4

lang: en-US

meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO

pageClass: custom-page-class

sidebar: auto
---

目录

[[toc]]

<CodeBlock>

```bash
[[toc]]
```

</CodeBlock>

# gist

## vue template in markdown

  <template>
    <div>
      vue template in markdown
    </div>
  </template>

<CodeBlock>

```vue
<template>
  <div>
    vue template in markdown
  </div>
</template>
```

</CodeBlock>

## `import()`动态引入js

<template>
  <div class="feature-gist">
    <p>vue template in markdown : {{ ver }}</p>
    <h1>Click Button : {{count}}</h1>
    <button @click="AddCount">Click Me Add Count</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ver: '',
      count: 0
    }
  },
  methods:{
    AddCount(){
      this.count++
    }
  },
  mounted () {
    import('./gist.js').then(module => {
      this.ver = module.version
    })
  }
}
</script>

<style scope>
.feature-gist p{
  color: red;
}
</style>

<CodeBlock>

```vue
<template>
  <div class="feature-gist">
    <p>vue template in markdown : {{ ver }}</p>
    <h1>Click Button : {{count}}</h1>
    <button @click="AddCount">Click Me Add Count</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ver: '',
      count: 0
    }
  },
  methods:{
    AddCount(){
      this.count++
    }
  },
  mounted () {
    import('./gist.js').then(module => {
      this.ver = module.version
    })
  }
}
</script>

<style scope>
.feature-gist p{
  color: red;
}
</style>
```

</CodeBlock>

## 访问网站以及页面的数据

{{ $page }}

<CodeBlock>

```bash
# 头部添加
---
title: feature gist
time: 2019-6-4

lang: en-US

meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO

pageClass: custom-page-class

sidebar: auto
---

# 正文
{{ $page }}
```

</CodeBlock>

## Escaping

::: v-pre
`{{ This will be displayed as-is }}`
:::

<CodeBlock>

```bash
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

</CodeBlock>

## markdown table

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

<CodeBlock>

```bash
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

</CodeBlock>

## tab

:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "template" id="first-tab"

```html
<template>
  <div class="feature-gist">
    <p>vue template in markdown : {{ ver }}</p>
    <h1>Click Button : {{count}}</h1>
    <button @click="AddCount">Click Me Add Count</button>
  </div>
</template>
```

:::
::: tab javascript id="second-tab"

```js
<script>
export default {
  data(){
    return {
      ver: '',
      count: 0
    }
  },
  methods:{
    AddCount(){
      this.count++
    }
  },
  mounted () {
    import('./gist.js').then(module => {
      this.ver = module.version
    })
  }
}
</script>
```

:::
::: tab style id="third-tab"

```css
<style scope>
.feature-gist p{
  color: red;
}
</style>
```

:::
::: tab preview id="four-tab"
<template>
  <div class="feature-gist">
    <p>vue template in markdown : {{ ver }}</p>
    <h1>Click Button : {{count}}</h1>
    <button @click="AddCount">Click Me Add Count</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ver: '',
      count: 0
    }
  },
  methods:{
    AddCount(){
      this.count++
    }
  },
  mounted () {
    import('./gist.js').then(module => {
      this.ver = module.version
    })
  }
}
</script>

<style scope>
.feature-gist p{
  color: red;
}
</style>
:::
::::

## custom container

::: theorem 牛顿第一定律
假若施加于某物体的外力为零，则该物体的运动速度不变。

::: right
From [维基百科](https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E8%BF%90%E5%8A%A8%E5%AE%9A%E5%BE%8B)
:::
