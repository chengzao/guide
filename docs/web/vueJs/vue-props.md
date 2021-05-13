---
title: vue2.x组件通讯方法
date: 2020-07-30
sidebar: "auto"
tags:
  - vue
---

:::tip

原文地址: [Vue 开发必须知道的 36 个技巧【近1W字】](https://juejin.im/post/5d9d386fe51d45784d3f8637#heading-7)

:::

## props

```js
// 数组:不建议使用
props:[]

// 对象
props:{
 inpVal:{
  type: Number, //传入值限定类型
  // type 值可为String,Number,Boolean,Array,Object,Date,Function,Symbol
  // type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认
  required: true, //是否必传
  default:200,  //默认值,对象或数组默认值必须从一个工厂函数获取如 default:()=>[]
  validator:(value) {
    // 这个值必须匹配下列字符串中的一个
    return ['success', 'warning', 'danger'].indexOf(value) !== -1
  }
 }
}
```

## $emit

```js
// 父组件
<home @title="setTitle">

// 子组件
this.$emit('title',{title:'这是title'})
```

- `v-model`

```js
 //把input输入框的value属性值和vue实例的message属性进行绑定，同时监听输入事件。
 <input v-bind:value="message" v-on:input="message = $event.target.value" />

// v-model 是 @input 与 value 的语法糖
```

- `v-bind`: [vue2.x v-bind](https://cn.vuejs.org/v2/api/#v-bind)

```vue
<!-- 绑定一个 attribute -->
<img v-bind:src="imageSrc">

<!-- 动态 attribute 名 (2.6.0+) -->
<button v-bind:[key]="value"></button>

<!-- 缩写 -->
<img :src="imageSrc">

<!-- 动态 attribute 名缩写 (2.6.0+) -->
<button :[key]="value"></button>

<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName">

<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]">

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 绑定一个全是 attribute 的对象 -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- 通过 prop 修饰符绑定 DOM attribute -->
<div v-bind:text-content.prop="text"></div>

<!-- prop 绑定。“prop”必须在 my-component 中声明。-->
<my-component :prop="someThing"></my-component>

<!-- 通过 $props 将父组件的 props 一起传给子组件 -->
<child-component v-bind="$props"></child-component>

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```

- v-on: [vue2.x v-on](https://cn.vuejs.org/v2/api/#v-on)

```vue
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>

<!-- 动态事件 (2.6.0+) -->
<button v-on:[event]="doThis"></button>

<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 动态事件缩写 (2.6.0+) -->
<button @[event]="doThis"></button>

<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>

<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>

<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>

<!--  串联修饰符 -->
<button @click.stop.prevent="doThis"></button>

<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter">

<!-- 键修饰符，键代码 -->
<input @keyup.13="onEnter">

<!-- 点击回调只会触发一次 -->
<button v-on:click.once="doThis"></button>

<!-- 对象语法 (2.4.0+) -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

<!-- 监听自定义事件 -->
<my-component @my-event="handleThis"></my-component>

<!-- 内联语句 -->
<my-component @my-event="handleThis(123, $event)"></my-component>

<!-- 组件中的原生事件 -->
<my-component @click.native="onClick"></my-component>
```

- `v-cloak`

```html
<!-- css -->
div[v-cloak] {
  display: none;
}

<!-- body -->
<div id="app" v-cloak>
  {{ message }}
</div>
```

## vuex

```js
state: // 定义存贮数据的仓库 ,可通过this.$store.state 或mapState访问

getter: // 获取 store 值,可认为是 store 的计算属性,可通过this.$store.getter 或 mapGetters访问

mutation: // 同步改变 store 值,为什么会设计成同步,因为mutation是直接改变 store 值,
          // vue 对操作进行了记录,如果是异步无法追踪改变.可通过mapMutations调用

action: // 异步调用函数执行mutation,进而改变 store 值,可通过 this.$dispatch或mapActions访问

modules: // 模块,如果状态过多,可以拆分成模块,最后在入口通过...解构引入
```

## attrs和listeners

- attrs获取子传父中未在 props 定义的值

```js
// 父组件
<home title="这是标题" width="80" height="80" imgUrl="imgUrl"/>

// 子组件
mounted() {
  console.log(this.$attrs) //{title: "这是标题", width: "80", height: "80", imgUrl: "imgUrl"}
},
```

- 如果子组件定义了 props,打印的值就是剔除定义的属性

```js
props: {
  width: {
    type: String,
    default: ''
  }
},
mounted() {
  console.log(this.$attrs) //{title: "这是标题", height: "80", imgUrl: "imgUrl"}
},
```

- listeners 传入内部组件

```js
// 父组件
<home @change="change"/>

// 子组件
mounted() {
  console.log(this.$listeners) //即可拿到 change 事件
}

-----------------------------

// 父组件
<home v-on="$listeners"/>

// 例如 自定义 element-ui的table组件

<template>
  <el-table
    :data="data"
    v-bind="$attrs"
    v-on="$listeners"
  >
    // ...
  </el-table>
</template>
```

- inheritAttrs

```js
// 父组件
<home title="这是标题" width="80" height="80" imgUrl="imgUrl"/>

// 子组件
mounted() {
  console.log(this.$attrs)
  //{title: "这是标题", width: "80", height: "80", imgUrl: "imgUrl"}
},

// inheritAttrs默认值为true，是将父组件中除了props外的属性添加到子组件的根节点上
// 说明，即使设置为true，子组件仍然可以通过$attr获取到props意外的属性
// 将inheritAttrs:false 后,属性就不会显示在根节点上了
```

## provide和inject

```js
//父组件:
provide: { //provide 是一个对象,提供一个属性或方法
  foo: '这是 foo',
  fooMethod:()=>{
    console.log('父组件 fooMethod 被调用')
  }
},

// 子或者孙子组件
inject: ['foo','fooMethod'], //数组或者对象,注入到子组件
mounted() {
  this.fooMethod()
  console.log(this.foo)
}
//在父组件下面所有的子组件都可以利用inject
```

- provide 和 inject 绑定并不是可响应的

```js
//父组件:
provide: {
  foo: '这是 foo'
},
mounted(){
  this.foo='这是新的 foo'
}

// 子或者孙子组件
inject: ['foo'],
mounted() {
  console.log(this.foo) //子组件打印的还是'这是 foo'
}
```

- provide和inject响应方法

```js
// 父组件
provide() {
  return {
    staticValue: this.staticValue, // 直接返回值，不可响应
    staticObject: this.staticObject, // 返回一个对象，可响应
    getReactiveValue: () => this.staticValue // 返回一个对象的函数，可响应
  }
},

// 子组件
inject: ["staticValue", "getReactiveValue", "staticObject"],
computed: {
  reactiveValue() {
    return this.getReactiveValue(); // 返回注入的对象函数，通过计算属性来监听值的变化
  },
},
```

## parent和children

```js
//父组件
mounted(){
  console.log(this.$children)
  //可以拿到 一级子组件的属性和方法
  //所以就可以直接改变 data,或者调用 methods 方法
}

//子组件
mounted(){
  console.log(this.$parent)
  //可以拿到 parent 的属性和方法
}
```

## $refs

```js
// 父组件
<home ref="home"/>

mounted(){
  console.log(this.$refs.home)
  //即可拿到子组件的实例,就可以直接操作 data 和 methods
}
```

## `.sync`修饰符

```js
// 父组件
<home :title.sync="title" />
//编译时会被扩展为
<home :title="title"  @update:title="val => title = val"/>

// 子组件
// 所以子组件可以通过$emit 触发 update 方法改变
mounted(){
  this.$emit("update:title", '这是新的title')
}
```

## v-slot

- 默认

```js
// 父组件
<todo-list>
    <template v-slot:default>
       任意内容
       <p>我是匿名插槽 </p>
    </template>
</todo-list>

// 子组件
<slot>我是默认值</slot>
//v-slot:default写上感觉和具名写法比较统一,容易理解,也可以不用写
```

- 具名插槽

```js
// 父组件
<todo-list>
    <template v-slot:todo>
       任意内容
       <p>我是具名插槽 </p>
    </template>
</todo-list>

//子组件
<slot name="todo">我是默认值</slot>
```

- 作用域插槽

```js
// 父组件
<todo-list>
 <template v-slot:todo="slotProps" >
   {{slotProps.user.firstName}}
 </template>
</todo-list>
//slotProps 可以随意命名
//slotProps 接取的是子组件标签slot上属性数据的集合所有v-bind:user="user"

// 子组件
<slot name="todo" :user="user" :test="test">
    {{ user.lastName }}
 </slot>
data() {
    return {
      user:{
        lastName:"Zhang",
        firstName:"yue"
      },
      test:[1,2,3,4]
    }
  },
// {{ user.lastName }}是默认数据  v-slot:todo 当父页面没有(="slotProps")
```

## EventBus

```js
// 在 main.js
Vue.prototype.$eventBus=new Vue()

// 传值组件
this.$eventBus.$emit('eventTarget','这是eventTarget传过来的值')

// 接收组件
this.$eventBus.$on("eventTarget",v=>{
  console.log('eventTarget',v);//这是eventTarget传过来的值
})
```

## broadcast和dispatch

```js
// 派发事件
vue.prototype.$dispatch = function(eventName, value) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(eventName, value);
    parent = parent.$parent;
  }
};

// 广播事件
Vue.prototype.$broadcast = function(eventName, value) {
  let broadcast = children => {
    children.forEach(child => {
      child.$emit(eventName, value);
      if (child.$children) {
        broadcast(child.$children);
      }
    });
  };
  broadcast(this.$children);
};

/*
inheritAttrs: false // 绑定的属性不在dom上显示 ：<div name="xxx"></div> 不显示
v-bind="$attrs"  // 将 $attrs 上所有属性绑定到dom上传递给子组件
v-on="$listeners" // 表示将方法绑定到dom上传递给子组件
*/
```

## 路由传参

- 方案一

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

- 方案二

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

- 方案三

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
  `}
)
// 页面获取
this.$route.query.id
```

## Vue.observable

```js
// store/store.js
import Vue from 'vue'

export const store = Vue.observable({ count: 0 })
export const mutations = {
  setCount (count) {
    store.count = count
  }
}

//使用
<template>
    <div>
        <label for="bookNum">数 量</label>
        <button @click="setCount(count+1)">+</button>
        <span>{{count}}</span>
        <button @click="setCount(count-1)">-</button>
    </div>
</template>

<script>
import { store, mutations } from '../store/store' // Vue2.6新增API Observable

export default {
  name: 'Add',
  computed: {
    count () {
      return store.count
    }
  },
  methods: {
    setCount: mutations.setCount
  }
}
</script>
```

## $root

```js
// 父组件
mounted(){
  console.log(this.$root) //获取根实例,最后所有组件都是挂载到根实例上
  console.log(this.$root.$children[0]) //获取根实例的一级子组件
  console.log(this.$root.$children[0].$children[0]) //获取根实例的二级子组件
}
```

## 其他

- window.localStorage的方式
- 服务端接口
