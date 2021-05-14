---
title: react生命周期
date: 2020-07-20
sidebar: "auto"
tags:
  - react
---

## lifecycle

- [原文：你真的了解 React 生命周期吗](https://juejin.im/post/5df648836fb9a016526eba01)
- [react 生命周期图谱](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

  ![react lifecycle](https://gitee.com/cxyz/imgbed/raw/img/img/wojtekmaj-pl-react-lifecycle-methods-diagram-1576117898899.png)

- 旧版

  ![react lifecycle](https://gitee.com/cxyz/imgbed/raw/img/img/20200101233506.png)

- 代码



```js
import React, { Component } from 'react'

export default class LifeCycle extends Component {
  static defaultProps = {
      name:'计数器'
  }
  constructor(props){
    super();
    this.state = {number:0,users:[]};//初始化默认的状态对象
    console.log('1. constructor 初始化 props and state');

  }
  //componentWillMount在渲染过程中可能会执行多次
  componentWillMount(){
    console.log('2. componentWillMount 组件将要挂载');
    //localStorage.get('userss');
  }
  //componentDidMount在渲染过程中永远只有执行一次
  //一般是在componentDidMount执行副作用，进行异步操作
  componentDidMount(){
    console.log('4. componentDidMount 组件挂载完成');
    fetch('https://api.github.com/users').then(res=>res.json()).then(users=>{
        console.log(users);
        this.setState({users});
    });
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log('Counter',nextProps,nextState);
    console.log('5. shouldComponentUpdate 询问组件是否需要更新');
    return true;
  }
  componentWillUpdate(nextProps, nextState){
    console.log('6. componentWillUpdate 组件将要更新');
  }
  componentDidUpdate(prevProps, prevState)){
    console.log('7. componentDidUpdate 组件更新完毕');
  }
  add = ()=>{
      this.setState({number:this.state.number});
  };
  render() {
    console.log('3.render渲染，也就是挂载')
    return (
      <div style={{border:'5px solid red',padding:'5px'}}>
        <p>{this.props.name}:{this.state.number}</p>
        <button onClick={this.add}>+</button>
        <ul>
            {
                this.state.users.map(user=>(<li>{user.login}</li>))
            }
        </ul>
        {this.state.number%2==0&&<SubCounter number={this.state.number}/>}
      </div>
    )
  }
}

// Sub Component
class SubCounter extends Component{
    constructor(props){
        super(props);
        this.state = {number:0};
    }
    componentWillUnmount(){
        console.log('SubCounter componentWillUnmount');
    }
    //调用此方法的时候会把新的属性对象和新的状态对象传过来
    shouldComponentUpdate(nextProps,nextState){
        console.log('SubCounter',nextProps,nextState);
        if(nextProps.number%3==0){
            return true;
        }else{
            return false;
        }
    }
    //componentWillReceiveProp 组件收到新的属性对象
    componentWillReceiveProps(){
      console.log('SubCounter 1.componentWillReceiveProps')
    }
    render(){
        console.log('SubCounter  2.render')
        return(
            <div style={{border:'5px solid green'}}>
                <p>{this.props.number}</p>
            </div>
        )
    }
}
```



- 父子组件触发示意图

![父子组件触发示意图](https://gitee.com/cxyz/imgbed/raw/img/img/20200101234008.png)

## `static getDerivedStateFromProps`

- 接收父组件传递过来的 props 和组件之前的状态，返回一个对象来更新 state 或者返回 null 来表示接收到的 props 没有变化，不需要更新 state
- 该生命周期钩子的作用： 将父组件传递过来的 props 映射 到子组件的 state 上面，这样组件内部就不用再通过 this.props.xxx 获取属性值了，统一通过 this.state.xxx 获取。映射就相当于拷贝了一份父组件传过来的 props ，作为子组件自己的状态。注意：子组件通过 setState 更新自身状态时，不会改变父组件的 props

```js
import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <AAA />
    </div>
  );
}

class AAA extends React.Component {
  state = {
    age: 666
  };

  add = () => {
    this.setState({ age: this.state.age + 1 });
  };

  render() {
    return (
      <div>
        <ChildA onChangeParent={this.add} age={this.state.age} />
      </div>
    );
  }
}

class ChildA extends React.Component {
  state = {
    num: 888
  };
  // 根据新的属性对象派生状态对象
  // nextProps——新的属性对象 prevState——旧的状态对象
  static getDerivedStateFromProps(nextprops, state) {
    console.log("props", nextprops);
    // 返回一个对象来更新 state 或者返回 null 来表示接收到的 props 不需要更新 state
    if (nextprops.age !== state.age) {
      console.log("更新吧");
      return {
        onChangeParent: nextprops.onChangeParent,
        age: nextprops.age
        // 注意：这里不需要把组件自身的状态也放进来
        // num:state.num
      };
    }
    return null;
  }

  add = () => {
    this.setState({ num: this.state.num + 1 });
  };
  render() {
    const { onChangeParent } = this.state;
    console.log("state", this.state);
    return (
      <>
        <div onClick={onChangeParent}>change</div>
        <div onClick={this.add}>add</div>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## getSnapshotBeforeUpdate

- 接收父组件传递过来的 props 和组件之前的状态，此生命周期钩子必须有返回值，返回值将作为第三个参数传递给`componentDidUpdate`。
- 该生命周期钩子触发的时机 ：被调用于 render 之后、更新 DOM 和 refs 之前
- **`getSnapshotBeforeUpdate`要与`componentDidUpdate` 一起使用，否则会报错**

```js
import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <GetSnapshotBeforeUpdate />
    </div>
  );
}

class GetSnapshotBeforeUpdate extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = { messages: [] };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        messages: ["msg:" + this.state.messages.length, ...this.state.messages]
      });
      //this.setState({messages:[...this.state.messages,this.state.messages.length]});
    }, 1000);
  }
  getSnapshotBeforeUpdate() {
    // 返回更新内容的高度 300px
    return this.wrapper.current.scrollHeight;
  }
  componentDidUpdate(prevProps, prevState, prevScrollHeight) {
    this.wrapper.current.scrollTop =
      this.wrapper.current.scrollTop +
      (this.wrapper.current.scrollHeight - prevScrollHeight);
  }
  render() {
    let style = {
      height: "100px",
      width: "200px",
      border: "1px solid red",
      overflow: "auto"
    };
    return (
      <ul style={style} ref={this.wrapper}>
        {this.state.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
