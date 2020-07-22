---
title: vue-pagination
date: 2020-07-21
sidebar: "auto"
tags:
  - vue
---

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
