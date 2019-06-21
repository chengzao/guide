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

## markdown slot

::: slot left

- slot left

:::

::: slot right

- solt right

:::

<CodeSplitDemo />

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

## css

```
asdad
```

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

## vuepress-plugin-tabs

:::: tabs :options="{ useUrlFragment: false }"

::: tab css

``` css
html,body{
  color: red;
}
```

:::

::: tab javascript

``` javascript
() => {
  console.log('Javascript code example')
}
```

:::

::::
