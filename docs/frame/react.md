# react

- [facebook/react](https://github.com/facebook/react)
- [reactjs英文官网](https://reactjs.org/)
- [reactjs中文文档](https://react.docschina.org/)
- [react 中文论坛](http://react-china.org/)
- [create-react-app](https://github.com/facebook/create-react-app)
- [react-router](https://github.com/ReactTraining/react-router)

- [react-transition-group](https://github.com/reactjs/react-transition-group)
- [styled-components](https://github.com/styled-components/styled-components)

- [snabbdom](https://github.com/snabbdom/snabbdom)
- [preact](https://github.com/developit/preact/)
- [iceworks](https://alibaba.github.io/ice/iceworks)

- [DvaJS](https://dvajs.com/)
- [umiJS](https://umijs.org/zh/)
- [nextjs](https://nextjs.org/)
- [redux](https://github.com/reduxjs/redux)
- [awesome-redux](https://github.com/xgrommx/awesome-redux)
- [redux-actions](https://github.com/redux-utilities/redux-actions)
- [Reselect](https://github.com/reduxjs/reselect)
- [redux-amrc](https://github.com/lewis617/redux-amrc)
- [redux英文官网](https://redux.js.org/)
- [redux中文文档](https://cn.redux.js.org/)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [redux-immutable](https://github.com/facebook/immutable-js)

- mobx:

  - https://github.com/mobxjs/mobx

  - awesome-mobx: https://github.com/mobxjs/awesome-mobx

- handleFunction:


  - ramda: http://ramda.cn/docs/

  - lodash: https://www.lodashjs.com/

  - RxJS: https://cn.rx.js.org/


- hoc `hoist-non-react-statics`
- className `classnames`
- react-app-rewired

- [React模态框设计思想](https://www.vq0599.com/article/2017/1111.html)
- [异步组件](https://segmentfault.com/a/1190000009820646)

- React-select

  - https://www.npmjs.com/package/react-pinyin-select-2

  - https://github.com/xcatliu/react-select-pinyin

  - https://github.com/react-component/select

  - https://github.com/jedwatson/react-select

  - https://github.com/enkidevs/react-search-input

  - https://github.com/hotoo/pinyin

  - https://github.com/ctq123/rcSearchSelect

- pinyin

<CodeBlock>

```bash
npm i pinyin pinyinlite string_score

option.pinyin = pinyinlite(option.label)
        .join('')
        .toLowerCase()
      option.py = pinyinlite(option.label)
        .map(label => label.toString().substr(0, 1))
        .join('')
        .toLowerCase()
      return option

option.pinyin = pinyin(option.label, {
        style: pinyin.STYLE_NORMAL
      }).join('').toLowerCase();
      option.py = pinyin(option.label, {
        style: pinyin.STYLE_FIRST_LETTER
      }).join('').toLowerCase();
      return option;
```

</CodeBlock>

- 移动端页面输入底部被软键盘遮挡问题

  - [移动端页面输入底部被软键盘遮挡问题](https://www.cnblogs.com/dongcanliang/p/7383508.html)
  - [iOS下Html页面中input获取焦点弹出键盘时挡住input解决方案—scrollIntoView()](https://www.cnblogs.com/wx1993/p/6059668.html)
  - 通过 window.onresize 监听页面大小变化，然后通过 window.scrollTo 使页面滚动到所需位置
  - 通过 Element.scrollIntoView()
  - 通过 Element.scrollIntoViewIfNeeded()
  - [移动端软键盘监听（弹出，收起），及影响定位布局的问题](https://www.cnblogs.com/wangyihong/p/7514304.html)
  - [input光标位置设置至行末端](https://blog.csdn.net/shuanger112/article/details/81704208)
  - [JedWatson/react-select Mobile support](https://github.com/JedWatson/react-select/issues/2692)

- `this.setState`异步执行, `(callback[, callback2])` ,return object
- `this.state({})`, return object
- `return: jsx`
- `constructor(props context)`
- 事件的 this 指向问题 `this.hander = this.hander.bind(this)`
- 无状态组件: 无生命周期函数
- 有状态组件: 有生命周期

---

- [reactnative doc](http://reactnative.cn/docs/0.40/getting-started.html#content)
- [Ant Design](https://ant.design/index-cn)
- [react.parts](https://react.parts/native)
- [js.coach](https://js.coach/)
- [React Router 使用教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html)
- [react-apollo](https://apollographqlcn.github.io/react-docs-cn/index.html)
- [react-apollo video](https://www.howtographql.com/basics/0-introduction/)
- [apollographql](https://www.apollographql.com/docs/react/essentials/get-started.html)
- [react-redux connect](https://www.cnblogs.com/isLiu/p/8119861.html)
- [async component / react-loadable](https://github.com/jamiebuilds/react-loadable)
- [Reselect](https://github.com/reduxjs/reselect)
