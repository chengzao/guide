---
title: vue-i18n
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
