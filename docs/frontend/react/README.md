---
title: react.js导航
date: 2020-07-20
sidebar: "auto"
tags:
  - react
categories:
  - frontend
---

<toc>

## menu (4)

- [使用canvas生成poster](./rc-canvas-poster.md)
- [react使用hooks案例](./rc-hooks-reducer.md)
- [react生命周期](./rc-lifecycle.md)
- [react redux](./rc-redux.md)

<toc>

:::tip

- [facebook/react](https://github.com/facebook/react)
- [react.js](https://reactjs.org/)
- [30-seconds-of-react](https://github.com/30-seconds/30-seconds-of-react)

:::

- [https://esprima.org/demo/parse.html#](https://esprima.org/demo/parse.html#)
- [https://astexplorer.net/](https://astexplorer.net/)
- [https://babeljs.io/repl](https://babeljs.io/repl)

- [overreacted](https://overreacted.io/)
- [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [为什么 React 元素有一个\$\$typeof 属性？](https://overreacted.io/zh-hans/why-do-react-elements-have-typeof-property/)
- [将 React 作为 UI 运行时](https://overreacted.io/zh-hans/react-as-a-ui-runtime/)

React15 架构可以分为两层：

- Reconciler（协调器）—— 负责找出变化的组件

- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

React16 架构可以分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**

- Reconciler（协调器）—— 负责找出变化的组件 （render 阶段）

- Renderer（渲染器）—— 负责将变化的组件渲染到页面上 (commit 阶段)

![react process](https://kasong.gitee.io/just-react/img/process.png)

## cli

- [create-react-app](https://github.com/facebook/create-react-app)
- [react-app-rewired](https://github.com/timarney/react-app-rewired)
- [craco](https://github.com/gsoft-inc/craco)

## router

- [react-router](https://github.com/ReactTraining/react-router)

## libs

- [mobx](https://github.com/mobxjs/mobx)
- [awesome-mobx](https://github.com/mobxjs/awesome-mobx)
- [DvaJS](https://dvajs.com/)
- [umiJS](https://umijs.org/zh/)
- [nextjs](https://nextjs.org/)
- [ramda](http://ramda.cn/docs/)
- [lodash](https://www.lodashjs.com/)
- [RxJS](https://cn.rx.js.org/)
- [react-loadable-visibility](https://github.com/stratiformltd/react-loadable-visibility)
- [react-spinkit](http://kyleamathews.github.io/react-spinkit/)
- [remix](https://github.com/remix-run/remix)

## hooks

- [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
- [hooks.umijs.org](https://hooks.umijs.org/zh-CN)

## 参考文档

- [react-transition-group](https://github.com/reactjs/react-transition-group)
- [styled-components](https://github.com/styled-components/styled-components)
- [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics)
- [classnames](https://github.com/JedWatson/classnames)
- [React 源码解析](https://react.jokcy.me/)
- [React 技术揭秘](https://react.iamkasong.com/)
- [详解 requestIdleCallback](https://juejin.im/post/5e5f7dc2e51d4526fb5de615)
- [react live](https://github.com/FormidableLabs/react-live)
- [「React进阶」 React 全部 api 解读+基础实践大全](https://mp.weixin.qq.com/s/wdChmE2-UDNFVyzG7RV0sg)
- [图解react](https://7kms.github.io/react-illustration-series/main/macro-structure/)
- [100行代码实现React核心调度功能](https://mp.weixin.qq.com/s/uuxHlanqyN2HneYOz7DMVw)
