---
title: vue2实现tab组件
date: 2023-03-12
sidebar: "auto"
tags:
  - vue
categories:
  - frontend
---

> [使用Vue一步一步实现一个Tabs选项卡组件](https://juejin.cn/post/6844904035019915271)
> [Vue:造轮子-05:tabs组件](https://juejin.cn/post/6978849927321518087)

## tab组件使用

```vue
<tabs value="name2"
      @change="changeTab">
  <tab-panel label="标签1"
             name="name1">标签一的内容</tab-panel>
  <tab-panel label="标签2"
             name="name2">标签二的内容</tab-panel>
  <tab-panel label="标签3"
             name="name3">标签三的内容</tab-panel>
</tabs>
```

## 实现tabs

```vue
<template>
  <!--tabs容器-->
  <div class="tabs">
    <!--标签页容器-->
    <div ref="navWrap"
         class="tabs-nav-wrap">
      <!--底部底部条-->
      <div class="tabs-inv-bar"
           :style="barStyle" />
      <!--标签页头label-->
      <div v-for="(item, index) in navList"
           :key="index"
           class="tabs-tab"
           @click="handleChange(index)">{{ item.label }}</div>
    </div>
    <!--所有pane组件使用的slot容器-->
    <div class="pane-content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  provide () {
    return { TabsInstance: this }
  },
  props: {
    value: {
      required: true,
      type: [String, Number]
    }
  },
  data () {
    return {
      navList: [],
      activeKey: this.value,
      barWidth: 0,
      barOffset: 0
    }
  },
  computed: {
    barStyle () {
      return {
        width: `${this.barWidth}px`,
        transform: `translate3d(${this.barOffset}px,0px,0px)`
      }
    }
  },
  watch: {
    value (val) {
      this.activeKey = val
    },
    activeKey () {
      this.updateStatus()
      this.updateBar()
    }
  },
  methods: {
    // 初始化更新
    initTabs () {
      this.updateNav()
      this.updateStatus()
      this.updateBar()
    },
    // 显示当前tab激活的content的内容
    updateStatus () {
      const tabs = this.getTabs()
      tabs.forEach(tab => (tab.show = tab.name === this.activeKey))
    },
    // 获取tabs下的所有pane实例
    getTabs () {
      return this.$children.filter(item => item.$options.name === 'TabPanel')
    },
    // 获取所有pane组件用户传入的props
    updateNav () {
      this.navList = []
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        })
        // 如果不传value,默认选中第一项
        if (index === 0 && !this.activeKey) {
          this.activeKey = pane.name
        }
      })
    },
    // 改变activeKey，并监听activeKey重新更新显示状态
    handleChange (index) {
      const nav = this.navList[index]
      this.activeKey = nav.name
      this.$emit('change', index)
    },
    updateBar () {
      // 等待dom更新完毕后获取dom节点
      this.$nextTick(() => {
        // 当前选中的activeKey下标
        const index = this.navList.findIndex(nav => nav.name === this.activeKey)
        // 获取navWrap元素下的所有tab的元素
        const elemTabs = this.$refs.navWrap.querySelectorAll('.tabs-tab')
        // 获取当前选中的元素
        const elemTab = elemTabs[index]
        this.barWidth = elemTab ? elemTab.offsetWidth : 0
        // 计算需要移动的距离,当index > 0时进行累加
        if (index > 0) {
          let offset = 0
          for (let i = 0; i < index; i++) {
            offset += elemTabs[i].offsetWidth
          }
          this.barOffset = offset
        } else {
          this.barOffset = 0
        }
      })
    }

  }
}
</script>
<style>
.tabs{
  position: relative;
}
.tabs-nav-wrap {
  position: relative;
  border-bottom: 1px solid #dcdee2;
  margin-bottom: 16px;
}
.tabs-tab {
  display: inline-block;
  padding: 8px 16px;
  cursor: pointer;
}
.tabs-inv-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #2d8cf0;
  height: 2px;
  transition: transform 300ms ease-in-out;
}
</style>
```

- 更新 tab line css

```js
if (index > 0) {
  let offset = elemTab.offsetWidth / 2
  for (let i = 0; i < index; i++) {
    offset += elemTabs[i].offsetWidth
  }
  this.barOffset = offset
} else {
  this.barOffset = elemTab.offsetWidth / 2
}

barStyle () {
  return {
    // width: `${this.barWidth}px`,
    transform: `translate3d(${this.barOffset}px,0,0) translateX(-50%)`
  }
}
```

## 实现tabPanel

```vue
<template>
  <div v-show="show">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TabPanel',
  inject: ['TabsInstance'],
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: [String, Function],
      default: ''
    }
  },
  data () {
    return {
      show: true
    }
  },
  watch: {
    name () {
      this.TabsInstance.initTabs()
    }
  },
  mounted () {
    this.TabsInstance.initTabs()
  }
}
</script>
```
