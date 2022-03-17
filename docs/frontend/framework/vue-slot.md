---
title: vue2.x的slot使用
date: 2020-07-30
sidebar: "auto"
tags:
  - vue
categories:
  - frontend
---

:::tip

- codesandbox：[vue2.x-slot](https://codesandbox.io/s/vue25x-slot-2s6v7)

- vue2.x solt: [components-slots](https://cn.vuejs.org/v2/guide/components-slots.html)

:::

## old solt

- `Parent.vue`

```html
<template>
  <child>
    <!-- 默认插槽 -->
    <div slot>default solt</div>
    <!-- 具名插槽 -->
    <div slot="header">header solt</div>
    <!-- 作用域插槽 -->
    <div slot="footer" slot-scope="slotProps">
      <span>footer solt</span>
      <p>reviced data from child component : {{slotProps.testProps}}</p>
    </div>
  </child>
</template>

<script>
import Child from "./Child.vue";
export default {
  data() {
    return {
      name: "old solt"
    };
  },
  components: {
    Child
  }
};
</script>
```

- `Child.vue`

```html
<template>
  <div>
    <main>
      <h3>old solt child main</h3>
      <slot>
        <h3>没传内容</h3>
      </slot>
    </main>
    <header>
      <slot name="header">
        <h3>没传header插槽</h3>
      </slot>
    </header>
    <footer>
      <slot name="footer" :testProps="test">
        <h3>没传footer插槽</h3>
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "child-component",
  data() {
    return {
      test: "child value"
    };
  }
};
</script>
```

## new solt (vue2.6.x)

- `Parent.vue`

```html
<template>
  <Child>
    <!--默认插槽-->
    <template v-slot>
      <div>default slot</div>
    </template>
    <!--具名插槽-->
    <template v-slot:header>
      <div>header slot</div>
    </template>
    <!--作用域插槽-->
    <template #footer="slotProps">
      <span>footer slot</span>
      <div>reviced data from child component : {{slotProps.testProps}}</div>
    </template>
  </Child>
</template>

<script>
import Child from "./Child";

// v-slot，可以缩写为【#】
export default {
  data() {
    return {
      name: "new solt"
    };
  },
  components: {
    Child
  }
};
</script>
```

- `Child.vue`

```html
<template>
  <div>
    <main>
      <h3>new solt child main</h3>
      <slot>
        <h3>没传内容</h3>
      </slot>
    </main>

    <header>
      <slot name="header">
        <h3>没传header插槽</h3>
      </slot>
    </header>

    <footer>
      <slot name="footer" :testProps="test">
        <h3>没传footer插槽</h3>
      </slot>
    </footer>
  </div>
</template>
<script>
export default {
  name: "child-component",
  data() {
    return {
      test: "child value"
    };
  }
};
</script>
```
