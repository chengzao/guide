---
title: react
date: 2020-07-20
sidebar: "auto"
tags:
  - react
---

:::tip

- [facebook/react](https://github.com/facebook/react)
- [react.js en](https://reactjs.org/)
- [react.js cn](https://react.docschina.org/)
- [react-china](http://react-china.org/)
- [30-seconds-of-react](https://github.com/30-seconds/30-seconds-of-react)

- [https://esprima.org/demo/parse.html#](https://esprima.org/demo/parse.html#)
- [https://astexplorer.net/](https://astexplorer.net/)
- [https://babeljs.io/repl](https://babeljs.io/repl)

:::

- [overreacted](https://overreacted.io/)
- [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [为什么 React 元素有一个\$\$typeof 属性？](https://overreacted.io/zh-hans/why-do-react-elements-have-typeof-property/)
- [将 React 作为 UI 运行时](https://overreacted.io/zh-hans/react-as-a-ui-runtime/)

React15 架构可以分为两层：

- Reconciler（协调器）—— 负责找出变化的组件

- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

React16 架构可以分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**

- Reconciler（协调器）—— 负责找出变化的组件

- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

![react process](https://kasong.gitee.io/just-react/img/process.png)

## cli

- [create-react-app](https://github.com/facebook/create-react-app)
- [react-app-rewired](https://github.com/timarney/react-app-rewired)

## router

- [react-router](https://github.com/ReactTraining/react-router)

## Redux

- [Redux 关系图解](https://segmentfault.com/a/1190000011473973)

  ![react-redux](https://gitee.com/cxyz/imgbed/raw/img/img/react-redux-01.png)

- `store` ➡️ `dispatch` ➡️ `action` ➡️ `reducer` ➡️ `state`

- [redux](https://github.com/reduxjs/redux)
- [awesome-redux](https://github.com/xgrommx/awesome-redux)
- [redux-actions](https://github.com/redux-utilities/redux-actions)
- [Reselect](https://github.com/reduxjs/reselect)
- [redux-amrc](https://github.com/lewis617/redux-amrc)
- [redux 英文官网](https://redux.js.org/)
- [redux 中文文档](https://cn.redux.js.org/)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [redux-immutable](https://github.com/facebook/immutable-js)

## libs

- [mobx](https://github.com/mobxjs/mobx)
- [awesome-mobx](https://github.com/mobxjs/awesome-mobx)
- [DvaJS](https://dvajs.com/)
- [umiJS](https://umijs.org/zh/)
- [nextjs](https://nextjs.org/)
- [ramda](http://ramda.cn/docs/)
- [lodash](https://www.lodashjs.com/)
- [RxJS](https://cn.rx.js.org/)
- [react/rematch](https://rematch.github.io/rematch/#/README?id=rematch)
- [react-loadable-visibility](https://github.com/stratiformltd/react-loadable-visibility)
- [react-spinkit/](http://kyleamathews.github.io/react-spinkit/)

## hooks

- [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
- [hooks.umijs.org](https://hooks.umijs.org/zh-CN)

- [React Hooks 最佳实践](https://juejin.im/post/5ec7372cf265da76de5cd0c9#heading-14)
- [React Hooks 完全指南，读 React 作者博文感悟（2W 字精华）](https://juejin.im/post/5e0edfe05188253a833b1d7c)
- [10 分钟教你手写 8 个常用的自定义 hooks](https://juejin.im/post/5e57d0dfe51d4526ce6147f2)
- [整理了 N 个实用案例帮你快速迁移到 React Hooks](https://juejin.im/post/5d594ea5518825041301bbcb)

- custom cra

```bash
create-react-app
customize-cra
react-app-rewired

config-overrides.js

pre-commit
```
