---
title: vue2.x函数式组件
date: 2020-07-21
sidebar: "auto"
tags:
  - vue
---

- `custom-table.vue`

```vue
<template>
  <el-table
    :data="data"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(column, index) of columns">
      <!-- render -->
      <el-table-column
        v-if="column.render"
        :key="index"
        v-bind="column"
      >
        <template slot-scope="scope">
          <extend
            :render="column.render"
            :row="scope"
          />
        </template>
      </el-table-column>
      <!-- no render -->
      <el-table-column
        v-else
        :key="index"
        v-bind="column"
      />
    </template>
  </el-table>
</template>
<script>
import extend from './render'
export default {
  components: { extend },
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  }
}
</script>
```

- `render.js`

```js
export default {
  functional: true,
  props: {
    row: {
      type: Object
    },
    render: {
      type: Function
    }
  },
  render (h, ctx) {
    return ctx.props.render(h, ctx.props.row)
  }
}
```
