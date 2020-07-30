---
title: pagination/i18n/alert
date: 2020-07-21
sidebar: "auto"
tags:
  - vue
---

## vue2.x自定义element-ui表格

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

## pagination

<CodeBlock title="vue网页版分页">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>vue分页组件</title>
    <style>
      .pagination-vue .page-list {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .pagination-vue .page-list span {
        font-size: 14px;
        color: #333333;
      }

      .pagination-vue .page-list .jump {
        padding: 2px 6px;
        text-align: center;
        cursor: pointer;
        margin-left: 5px;
        background: rgba(204, 204, 204, 0.3);
        border-radius: 6px;
      }

      .pagination-vue .page-list .jump:hover {
        cursor: pointer;
        color: #fff;
        background: #ff1e1b;
        border-radius: 6px;
      }

      .pagination-vue .page-list .current {
        cursor: default;
        color: #fff;
        background: #ff1e1b;
        border-radius: 6px;
      }

      .pagination-vue .page-list .jump.disabled {
        pointer-events: none;
        color: #999999;
      }

      .pagination-vue .page-list .go-btn {
        font-size: 14px;
      }

      .pagination-vue .page-list .jump-inp input {
        width: 44px;
        height: 20px;
        font-size: 13px;
        border: 1px solid #ccc;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        text-align: center;
        outline: none;
      }

      .pagination-vue .page-list .ellipsis {
        padding: 0px 8px;
        text-align: center;
        cursor: pointer;
        margin-left: 5px;
        background: rgba(204, 204, 204, 0);
        border-radius: 6px;
      }

      .pagination-vue .page-list .jump-point {
        margin-left: 10px;
      }

      .pagination-vue .pageNum {
        display: inline-block;
        height: 28px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 28px;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <h1>{{msg}}</h1>
      <vue-pagination2></vue-pagination2>
      <pagination-com
        :total="total"
        :current="current"
        @update:current="handleCurrentPage"
      ></pagination-com>
      <pagination-com :total="total" :current.sync="current"></pagination-com>
    </div>

    <script src="https://cdn.bootcss.com/vue/2.6.11/vue.js"></script>
    <script>
      var template = `<div class="pagination-vue" v-show="show">
      <div class="page-list">
        <span class="jump" @click="jumpPage(1)">首页</span>
        <span class="jump" :class="{disabled: startPage }" @click="prev">上一页</span>
        <span class="jump" :class="{current: startPage}" @click="jumpPage(1)">1</span>
        <span class="ellipsis" v-show="sMore">...</span>
        <span class="jump" v-for="num in mids" :class="{current:current_page==num}" @click="jumpPage(num)">{{num}}</span>
        <span class="ellipsis" v-show="eMore">...</span>
        <span class="jump" :class="{current:endPage}" @click="jumpPage(total)">{{total}}</span>
        <span :class="{disabled: endPage }" class="jump" @click="next">下一页</span>
        <span class="jump" @click="jumpPage(total)">末页</span>
        <span class="jump-point">前往：</span>
        <span class="jump-inp"><input type="number" v-model.number="changePage"></span>
        <span class="jump go-btn" @click="jumpPage(changePage)">GO</span>
      </div>
      <span class="pageNum">第{{current_page||1}}页/共{{total}}页</span>
      <div>
        Setting Pages: <input type="text" v-model="total">
      </div>
    </div>`;

      var PaginationCom = Vue.extend({
        data: function() {
          return {
            current_page: this.current, //当前页
            page: 7,
            changePage: "" //跳转页
          };
        },
        props: {
          total: {
            type: Number,
            require: true
          },
          current: {
            type: Number,
            default: 1
          }
        },
        watch: {
          current(val) {
            this.current_page = val;
          }
        },
        template: template,
        computed: {
          // 是否展示
          show: function() {
            return this.total && this.total != 1;
          },
          startPage: function() {
            return this.current_page == 1;
          },
          endPage: function() {
            return this.current_page == this.total;
          },
          // 显示前...
          sMore: function() {
            if (this.total <= this.page) return false;
            var mids = this.mids;
            var len = mids.length;
            return mids[len - 1] > this.page - 1;
          },
          // 显示后...
          eMore: function() {
            if (this.total < this.page) return false;
            var mids = this.mids;
            var len = mids.length;
            return mids[0] + len < this.total;
          },
          // 中间显示的页数
          mids: function() {
            var left = this.current_page + 1,
              right = this.total - 1,
              mid = this.page - 2,
              mid_pages = [];

            // 总页数大于当前显示最大页
            if (this.total > this.page) {
              if (
                this.current_page > mid &&
                this.current_page < this.total - (mid - 1)
              ) {
                left = Number(this.current_page) - 3;
                right = Number(this.current_page) + 1;
              } else {
                if (this.current_page <= mid) {
                  left = 2;
                  right = this.page - 1;
                } else {
                  right = this.total - 1;
                  left = this.total - this.page + 2;
                }
              }
            } else {
              right = this.total - 1;
              left = 2;
            }
            while (left <= right) {
              mid_pages.push(left);
              left++;
            }
            return mid_pages;
          }
        },
        methods: {
          prev: function() {
            this.current_page--;
            this.$emit("update:current", this.current_page);
          },
          next: function() {
            this.current_page++;
            this.$emit("update:current", this.current_page);
          },
          jumpPage: function(current) {
            if (current <= this.total && current > 0) {
              this.current_page = current;
              this.$emit("update:current", current);
            }
          }
        }
      });

      Vue.component("vue-pagination2", {
        data: function() {
          return {
            current_page: 1, //当前页
            total: 8, //总页数
            page: 7,
            changePage: "" //跳转页
          };
        },
        template: template,
        computed: {
          // 是否展示
          show: function() {
            return this.total && this.total != 1;
          },
          startPage: function() {
            return this.current_page == 1;
          },
          endPage: function() {
            return this.current_page == this.total;
          },
          // 显示前...
          sMore: function() {
            if (this.total <= this.page) return false;
            var mids = this.mids;
            var len = mids.length;
            return mids[len - 1] > this.page - 1;
          },
          // 显示后...
          eMore: function() {
            if (this.total < this.page) return false;
            var mids = this.mids;
            var len = mids.length;
            return mids[0] + len < this.total;
          },
          // 中间显示的页数
          mids: function() {
            var left = this.current_page + 1,
              right = this.total - 1,
              mid = this.page - 2,
              mid_pages = [];

            // 总页数大于当前显示最大页
            if (this.total > this.page) {
              if (
                this.current_page > mid &&
                this.current_page < this.total - (mid - 1)
              ) {
                left = Number(this.current_page) - 2;
                right = Number(this.current_page) + 2;
              } else {
                if (this.current_page <= mid) {
                  left = 2;
                  right = this.page - 1;
                } else {
                  right = this.total - 1;
                  left = this.total - this.page + 2;
                }
              }
            } else {
              right = this.total - 1;
              left = 2;
            }
            while (left <= right) {
              mid_pages.push(left);
              left++;
            }
            return mid_pages;
          }
        },
        methods: {
          prev: function() {
            this.current_page--;
            this.$emit("update:current", this.current_page);
          },
          next: function() {
            this.current_page++;
            this.$emit("update:current", this.current_page);
          },
          jumpPage: function(current) {
            if (current <= this.total && current > 0) {
              this.current_page = current;
              this.$emit("update:page", current);
            }
          }
        }
      });

      new Vue({
        el: "#app",
        data: {
          msg: "Hello",
          total: 30,
          current: 3
        },
        components: {
          "pagination-com": PaginationCom
        },
        methods: {
          handleCurrentPage: function(current) {
            console.log("current page", current);
          }
        },
        watch: {
          current: function(val) {
            console.log(val);
          }
        },
        mounted() {
          console.log("mounted");
          this.current = 6;
        }
      });
    </script>
  </body>
</html>
```

</CodeBlock>

## i18n

<CodeBlock title="vue网页版i18n">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>vue i18n</title>
  </head>
  <body>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>

    <div id="app">
      <select name="" v-model="lang">
        <option value="cn">中文</option>
        <option value="en">英文</option>
        <option value="ja">日文</option>
      </select>

      <p>{{ lang }}</p>

      <p>{{ $t("message.hello") }}</p>
    </div>
    <script>
      const messages = {
        en: {
          message: {
            hello: "hello world"
          }
        },
        ja: {
          message: {
            hello: "こんにちは、世界"
          }
        },
        cn: {
          message: {
            hello: "你好"
          }
        }
      };

      // 通过选项创建 VueI18n 实例
      const i18n = new VueI18n({
        locale: "en", // 设置地区
        messages // 设置地区信息
      });

      // console.log(i18n.locale = 'ja');

      // 通过 `i18n` 选项创建 Vue 实例
      const vm = new Vue({
        data: {
          lang: "en"
        },
        i18n,
        watch: {
          lang(val) {
            this.$i18n.locale = val;
          }
        }
      }).$mount("#app");
    </script>
  </body>
</html>
```

</CodeBlock>

## alert

<CodeBlock title="vue网页版alert">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue Alert</title>
    <style>
      .shadow {
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        height: 100%;
        left: 0;
        position: fixed;
        top: 0;
        transition: opacity 0.3s ease;
        width: 100%;
        z-index: 50;
      }

      .modal {
        display: table-cell;
        vertical-align: middle;
        overflow-x: hidden;
        position: fixed;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.33) 0px 2px 8px;
        border-radius: 5px;
        outline: 0px;
        overflow: hidden;
        transition: all 0.3s ease;
        width: 600px;
        height: 400px;
        top: 50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -300px;
      }

      .header {
        align-items: center;
        background-color: #62a39e;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
        color: #fff;
        font-weight: bold;
        display: -ms-flexbox;
        display: flex;
        height: 3.5rem;
        padding: 0 1.5rem;
        position: relative;
        z-index: 1;
      }

      .body {
        align-items: center;
        padding: 1.5rem;
      }

      .footer {
        justify-content: flex-end;
        padding: 1.5rem;
        position: absolute;
        bottom: 0;
        width: 100%;
        float: right;
      }

      .item {
        color: white;
        text-align: center;
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;
        display: inline-block;
      }

      .info {
        background-color: #2196f3;
      }

      .success {
        background-color: #62a39e;
      }

      .red {
        background-color: #e95358;
      }

      .smSize {
        height: 200px;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <h1>App</h1>
      <button @click="display">Click</button>
      <button @click="other">Click other</button>
      <alert-modal ref="chat-modal"></alert-modal>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      var template = `
      <div class="shadow" v-show="showModal">
        <div class="modal" :class="{'smSize': otherText.small || small}">
            <div class="header">{{ otherText.title || title}}</div>
            <div class="body">
                <slot></slot>
            </div>
            <div class="footer">
                <div class="item success" ref="sure" v-show="otherText.sureText || sureText">{{ otherText.sureText || sureText }}</div>
                <div class="item red" ref="cancel" v-show="otherText.cancelText || cancelText">{{ otherText.cancelText || cancelText }}</div>
            </div>
        </div>
      </div>
      `;

      var vm = {
        template: template,
        data() {
          return {
            otherText: {
              sureText: "确认",
              cancelText: "取消",
              title: "标题",
              small: true
            },
            showModal: false
          };
        },
        methods: {
          openModal(otherText) {
            this.otherText = { ...this.otherText, ...otherText };
            this.showModal = true;
            var pms = new Promise((resolve, reject) => {
              this.$refs["sure"].addEventListener("click", () => {
                this.showModal = false;
                resolve("点击了确定");
              });
              this.$refs["cancel"].addEventListener("click", () => {
                this.showModal = false;
                reject("点击了取消");
              });
            });
            return pms;
          }
        }
      };

      var tpl = `
        <div class="shadow">
          <div class="modal">
              <div class="header">{{ title }}</div>
              <div class="body">
                  {{content}}
              </div>
              <div class="footer">
                  <div class="item success" @click="handleConfirm">{{ sureText }}</div>
                  <div class="item red" @click="handleCancel">{{ cancelText }}</div>
              </div>
          </div>
        </div>
        `;

      var Toast = Vue.extend({
        template: tpl,
        data() {
          return {
            title: "标题",
            content: "",
            sureText: "确认",
            cancelText: "取消"
          };
        },
        methods: {
          handleConfirm() {
            this.remove();
            this.confirm && this.confirm();
          },
          handleCancel() {
            this.remove();
            this.cancel && this.cancel();
          },
          remove() {
            var doc = document.body;
            doc.removeChild(this.$el);
          }
        }
      });

      var showToast = function(options) {
        options = Object.assign({}, options);
        const instance = new Toast({
          data: options
        });
        let doc = document.body;
        instance.$mount();
        doc.appendChild(instance.$el);
        return instance;
      };

      Vue.prototype.$toast = showToast;

      new Vue({
        el: "#app",
        components: {
          "alert-modal": vm
        },
        methods: {
          display() {
            this.$refs["chat-modal"]
              .openModal({
                title: "弹窗标题",
                sureText: "确认",
                cancelText: "取消"
              })
              .then(
                res => {
                  //点击确认的回调
                  console.log("确认", res);
                },
                res => {
                  //点击取消的回调
                  console.log("取消 ", res);
                }
              );
          },
          other() {
            this.$toast({
              title: "弹窗标题",
              content: "123131"
            });
          }
        }
      });
    </script>
  </body>
</html>
```

</CodeBlock>
