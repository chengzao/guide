---
title: vue2.x常见问题
date: 2020-07-21
sidebar: "auto"
tags:
  - vue
categories:
  - frontend
---

## 异步组件

- 工厂函数返回 Promise

```js
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

- 路由的按需加载

```js
const Home = () => import(/* webpackChunkName: "group-home" */ './views/Home.vue')

{
  path:'/',
  name:'home',
  components: Home
}
```

## 动态组件

```js
<component v-bind:is="currentTabComponent"></component>
```

- keep-alive

```js
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>


```

- 根据配置参数cache

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

- transition

```js
<transition>
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
</transition>
```

## 递归组件

```js
<template>
  <div v-for="(item,index) in treeArr">
      子组件，当前层级值： {{index}} <br/>
      <!-- 递归调用自身, 后台判断是否不存在改值 -->
      <tree :item="item.children" v-if="item.children"></tree>
  </div>
</template>
<script>
export default {
  // 必须定义name，组件内部才能递归调用
  name: 'tree',
  data(){
    return {}
  },
  // 接收外部传入的值
  props: {
     item: {
      type:Array,
      default: ()=>[]
    }
  }
}
</script>

// 父级
import Tree from "./components/Tree";
<Tree :item="arr"/>

arr = [{name:'A', chilren:[{name: 'A-1'}]},...]
```

## 函数式组件

- template

```js
<template functional>
  <div v-for="(item,index) in props.arr">{{item}}</div>
</template>
```

- js

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

## components和 Vue.component

- 局部注册组件

```js
export default{
  components:{home}
}
```

- 全局注册组件

```js
Vue.component('home',home)
```

## Vue.extend

```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{extendData}}</br>实例传入的数据为:{{propsExtend}}</p>',//template对应的标签最外层必须只有一个标签
  data: function () {
    return {
      extendData: '这是extend扩展的数据',
    }
  },
  props:['propsExtend']
})

// 创建的构造器可以挂载到元素上, 通过propsData传参
new Profile({propsData:{propsExtend:'我是实例传入的数据'}}).$mount('#app-extend')

// 通过 components 或 Vue.component()注册
Vue.component('Profile',Profile)
```

## mixins

```js
const mixin={
    created(){
      this.dealTime()
    },
    methods:{
      dealTime(){
        console.log('这是mixin的dealTime里面的方法');
      }
  }
}

export default{
  mixins:[mixin]
}
```

## extends

```js
const extend={
    created(){
      this.dealTime()
    },
    methods:{
      dealTime(){
        console.log('这是mixin的dealTime里面的方法');
      }
  }
}

export default{
  extends:extend
}
```

## install

```js
var MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  // 方式一：添加全局资源,第二个参数传一个值默认是update对应的值
  Vue.directive('xxx', {})

  // 方式二：注入组件
  Vue.mixin({
    created: function () {
      console.log('options的值为',options)
    }
  })

  // 方式三：添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    console.log('实例方法myMethod被调用啦');
  }
}

// Vue 调用 MyPlugin
Vue.use(MyPlugin,{someOption: true })

// 挂载Vue实例
new Vue({
  el: '#app'
});
```

## Vue.nextTick

```js
mounted(){ //因为 mounted 阶段 dom 并未渲染完毕,所以需要$nextTick
  this.$nextTick(() => {
    this.$refs.inputs.focus() //通过 $refs 获取dom 并绑定 focus 方法
  })
}
```

## Vue.directive

```js
Vue.directive('click', {
  bind(el, binding, vnode, oldVnode) {
    // binding {name, value, oldValue, expression, arg, modifiers}
    // 只调用一次 做绑定的准备工作,添加事件监听
    console.log('bind');
  },
  inserted: function(el){
    // 被绑定元素插入父节点时调用
    // 获取绑定的元素
    console.log('inserted');
  },
  update: function(){
    // 所在组件的 VNode 更新时调用
    // 对于初始值也会调用一次
    console.log('update');
  },
  componentUpdated: function(){
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    console.log('componentUpdated');
  },
  unbind: function(){
    // 只调用一次，指令与元素解绑时调用
    // 比如移除bind时绑定的事件监听器
    console.log('unbind');
  }
})
```

- 使用

```js
// 全局定义
Vue.directive("change-color",function(el,binding,vnode){
  el.style["color"]= binding.value;
})

// 使用
<template>
<div v-change-color=“color”>{{message}}</div>
</template>
<script>
  export default{
    data(){
      return{
        color:'green'
      }
    }
  }
</script>
```

## Vue.filter

```js
// 使用
// 在双花括号中
{{ message | capitalize }}

// 在 `v-bind` 中
<div v-bind:id="rawId | formatId"></div>

// 全局注册
Vue.filter('stampToYYMMDD', (value) =>{
  // 处理逻辑
})

// 局部注册
filters: {
  stampToYYMMDD: (value)=> {
    // 处理逻辑
  }
}

// 多个过滤器全局注册
// /src/common/filters.js
let dateServer = value => value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1/$2/$3')
export { dateServer }

// /src/main.js
Object.keys(customs).forEach(key => Vue.filter(key, customs[key]))
```

## Vue.compile

```js
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```

## Vue.set

```js
// 利用 set
this.$set(arr,index,item)

// 利用数组 push(),splice()
```

## errorHandler/warnHandler

```js
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}

Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
}
```

## Vue.config.warnHandler

```js

```

## vue-cli为路径设置别名

- vue-cli 2.x

```js
// 在 webpack.base.config.js中的 resolve 配置项，在其 alias 中增加别名
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
```

- vue-cli 3.x

```js
// 在根目录下创建vue.config.js
var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set(key, value) // key,value自行定义，比如.set('@@', resolve('src/components'))
  }
}
```

## deep 属性

- [深度作用选择器](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8)

```css
/* 上面样式加一个 /deep/ */
<style lang="less" scoped>
  .demo{
    font-size: 14px;
  }
  .demo /deep/ .content{
    color: blue;
  }
</style>
```

## Object.freeze

```js
new Vue({
    data: {
        // vue不会对list里的object做getter、setter绑定
        list: Object.freeze([
            { value: 1 },
            { value: 2 }
        ])
    },
    mounted () {
        // 界面不会有响应,因为单个属性被冻结
        this.list[0].value = 100;

        // 下面两种做法，界面都会响应
        this.list = [
            { value: 100 },
            { value: 200 }
        ];

        // 冻结object
        this.list = Object.freeze([
            { value: 100 },
            { value: 200 }
        ]);
    }
})
```

## 调试 template log 技巧

```js
// main.js
Vue.prototype.$log = window.console.log;

// 组件内部
<div>{{$log(info)}}</div>
```

## vue2 element-ui

- loadmore

```js
export const loadmore = {
    bind(el, binding) {
        const SELECTWRAP = el.querySelector(
            '.el-select-dropdown .el-select-dropdown__wrap'
        );
        SELECTWRAP.addEventListener('scroll', function() {
            const CONDITION =
                this.scrollHeight - Math.ceil(this.scrollTop) <= this.clientHeight;
            if (CONDITION && this.scrollTop !== 0) {
                binding.value();
            }
        });
    }
};
```

- v-int

```js
// directives.js
const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
};

export const int = {
    bind: function (el) {
        const input = el.getElementsByTagName('input')[0];
        input.onkeyup = function () {
            input.value = input.value.replace(/[^\d.-]/g, '');
            input.value = input.value.replace(/\.+/g, '.');
            input.value = input.value.replace(/-+/g, '-');
            trigger(input, 'input');
        };
        input.onblur = function () {
            input.value = input.value.replace(/[^\d.-]/g, '');
            input.value = input.value.replace(/\.+/g, '.');
            input.value = input.value.replace(/-+/g, '-');
            trigger(input, 'input');
            trigger(input, 'input');
        };
    }
};
```

- input 输入数字问题

```js
// onKeypress="return (/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
// onkeypress="return (event.keyCode>=48&&event.keyCode<=57)||(event.keyCode === 46)"
// https://juejin.im/post/6844903838009294855
<el-input
  :disabled="!editable"
  onkeypress="return (event.keyCode>=48&&event.keyCode<=57)||(event.keyCode === 46)"
  v-model.trim="formData.totalCostAmount">
```

- table合计显示问题

```js
<xx-table-pro
  name="table"
  source="local"
  :localData="tableData"
  :columns="columns"
  :show-summary="showSummary"
  :summary-method="getSummaries"
>
  <el-table-column>
    <template>
    <div slot="append">重要提示：合计计算规则 未税金额合计=含税金额合计/（1+税率）</div>
  </template>
  </el-table-column>
</xx-table-pro>

// 合计
        getSummaries(params) {
            const { columns } = params;
            const popoverEl = <el-popover
                placement="top"
                trigger="hover">
                <span class="red">计算公式：未税金额合计=含税金额合计/（1+税率）</span>
                <span slot="reference">合计 <i class="el-icon-warning" style="color: #409EFF"></i></span>
            </el-popover>;
            return columns.slice(1).reduce(
                (prev, cur) => {
                    const { property } = cur;
                    let total = '';
                    if(['amountWithTaxYuan', 'amountWithoutTaxYuan'].includes(property)) {
                        total = this.totalFields[property];
                    }
                    prev.push(total);
                    return prev;
                },
                [popoverEl]
            );
        },

// css
/deep/ .el-table{
    overflow: auto;
}
/deep/ .el-table .el-table__body-wrapper,
/deep/ .el-table .el-table__header-wrapper,
/deep/ .el-table .el-table__footer-wrapper{
    overflow: visible;
}
/deep/ .el-table::after{
    position:relative !important;
}
```

- table校验问题

```vue
<template>
  <div class="app-container">
    <el-form :model="fromData" ref="from">
      <el-table :data="fromData.domains">
        <el-table-column label="age">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.age'"
              :rules="fromData.fromaDataRules.age"
            >
              <el-input v-model.number="scope.row.age"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button type="warning" @click="submit('from')">submit</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fromData: {
        fromaDataRules: {
          age: [
            {
              required: true,
              type: "number",
              message: "非数字",
              trigger: "blur",
            },
          ],
        },
        domains: [
          {
            age: "1",
          },
          {
            age: "2",
          },
        ],
      },
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

// 自定义校验
<template>
  <div class="app-container">
    <el-form :model="fromData" ref="from">
      <el-table :data="fromData.domains">
        <el-table-column label="age">
          <template slot-scope="scope">
            <el-form-item
              :prop="'domains.' + scope.$index + '.age'"
              :rules="fromData.fromaDataRules.age"
            >
              <el-input v-model.number="scope.row.age"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button type="warning" @click="submit('from')">submit</el-button>
  </div>
</template>
<script>
export default {
  data() {
    let validateAge = (rule, value, callback) => {
      console.log("value", value);
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      fromData: {
        fromaDataRules: {
          age: [
            {
              validator: validateAge,
              trigger: "blur",
            },
          ],
        },
        domains: [
          {
            age: "1",
          },
          {
            age: "2",
          },
        ],
      },
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
```

- element Input number

```vue
<template>
    <el-input
        v-model.number="val"
        v-int
        v-bind="$attrs"
        v-on="$listeners"
        @input="$emit('input', $event)"
    />
</template>

<script>

const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
};

export default {
    name: 'IntElInput',
    directives: {
        int: {
            bind(el) {
                const input = el.getElementsByTagName('input')[0];
                el.handler = () => {
                    input.value = input.value.replace(/[^\d.-]/g, '');
                    input.value = input.value.replace(/\.+/g, '.');
                    input.value = input.value.replace(/-+/g, '-');
                    trigger(input, 'input');
                };
                el.addEventListener('keyup', el.handler);
                el.addEventListener('blur', el.handler);
            },
            unbind(el) {
                el.removeEventListener('keydown', el.handler);
                el.removeEventListener('blur', el.handler);
            },
        },
    },
    model: {
        prop: 'value',
        event: 'input',
    },
    props: {
        value: {
            type: [Number, String],
            required: true,
        },
    },
    data() {
        return {
            val: this.value,
        };
    },
    watch: {
        value(value) {
            this.val = value;
        },
    },
};
</script>
```
