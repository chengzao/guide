---
title: vue alert
date: 2020-07-21
sidebar: "auto"
tags:
  - vue
---

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
