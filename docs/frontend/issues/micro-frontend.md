---
title: micro frontend
date: 2022-01-12
sidebar: "auto"
tags:
  - micro
categories:
  - frontend
---


## pnpm & rush.js

- https://github.com/pnpm/pnpm
- https://rushjs.io/
- https://github.com/changesets/changesets

## yarn & leran

- https://yarnpkg.com/
- https://github.com/lerna/lerna


## microrepo

- https://github.com/micro-zoe/micro-app
- https://github.com/modern-js-dev/garfish
- https://github.com/umijs/qiankun
- https://github.com/ice-lab/icestark
- https://github.com/efoxTeam/emp
- https://github.com/vercel/turborepo

## webpack5 module federation

- https://github.com/module-federation/module-federation-examples
- https://github.com/Shenfq/Webpack5-Module-Federation-Demo
- https://github.com/yuzhanglong/mf-lite


## 系列文章

- https://github.com/a1029563229/micro-front-template
- [微前端qiankun从搭建到部署的实践](https://segmentfault.com/a/1190000024551391)
- [fengxianqi/qiankun-example](https://github.com/fengxianqi/qiankun-example)
- [qiankun 微前端实践及常见问题](https://juejin.cn/post/6943763969576271879)
- [微前端 | 7. 微应用沙箱实现原理](https://zhuanlan.zhihu.com/p/145169867)
- [深入浅出解析阿里成熟的微前端框架 qiankun 源码](https://mp.weixin.qq.com/s/8qHSYHFECn-y-OHI3XjiqQ)

## qiankun

- jsconfig.json

```json
{
    "include": [
        "./src/**/*"
    ],
    "compilerOptions": {
        "target": "esnext",
        "module": "esnext",
        "moduleResolution":"node",
        "allowSyntheticDefaultImports": true,
        "experimentalDecorators": true,
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "src/*"
            ]
        },
    },
    "exclude": [
        "node_modules","dist",
        "bower_components", "jspm_packages"
    ]
}
```

- tsconfig.json

```json
{
  "include": [
    "./src/**/*"
  ],
  "compilerOptions": {
      "target": "esnext",
      "module": "esnext",
      "strict": true,
      "jsx": "preserve",
      "importHelpers": true,
      "moduleResolution": "node",
      "experimentalDecorators": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "allowJs": true,
      "sourceMap": true,
      "baseUrl": ".",
      "types": [
          "webpack-env"
      ],
      "paths": {
          "@/*": [
              "src/*"
          ]
      },
      "lib": [
          "esnext",
          "dom",
          "dom.iterable",
          "scripthost"
      ]
  },
  "exclude": [
      "node_modules"
  ]
}
```

- vue.config.js

```js
const path = require("path");
const { name } = require("./package");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const port = 7101; // dev port

module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    outputDir: "dist",
    assetsDir: "static",
    filenameHashing: true,
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    devServer: {
        // host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        port,
        overlay: {
            warnings: false,
            errors: true,
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    // 自定义webpack配置
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src"),
            },
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        entry: "./src/main.js",
        output: {
            // 把子应用打包成 umd 库格式
            library: `${name}-[name]`,
            libraryTarget: "umd",
            jsonpFunction: `webpackJsonp_${name}`,
        },
    },
    css: {
        requireModuleExtension: true,
    },
};
```

- public-path.js

```js
if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

- main.js

```js
import "./public-path";
import Vue from "vue";
// import VueRouter from "vue-router";
import App from "./App.vue";

// import router from "./router";
import createRouter from "./router";
import store from "./store";

Vue.config.productionTip = false;

let router = null;
let instance = null;

function render(props = {}) {
    const { container } = props;
    router = createRouter();
    instance = new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

function storeTest(props) {
    props.onGlobalStateChange &&
        props.onGlobalStateChange(
            (value, prev) =>
                console.log(
                    `[onGlobalStateChange - ${props.name}]:`,
                    value,
                    prev
                ),
            true
        );
    props.setGlobalState &&
        props.setGlobalState({
            ignore: props.name,
            user: {
                name: props.name,
            },
        });
}

export async function bootstrap() {
    console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
    console.log("[vue] props from main framework", props);
    storeTest(props);
    render(props);
}

export async function unmount() {
    instance.$destroy();
    instance.$el.innerHTML = "";
    instance = null;
    router = null;
}
```

- vue-router

```js
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = () => {
    return new VueRouter({
        base: window.__POWERED_BY_QIANKUN__ ? "/vue" : "/",
        mode: "history",
        routes,
    });
};

export default router;
```
