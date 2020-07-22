---
title: ajax and cors
date: 2020-07-20
sidebar: "auto"
tags:
  - cors
  - XMLHttpRequest
categories:
  - web
---

- 简易版 1

<<< @/utils/libs/js/XMLHttpRequest.js

- 简易版 2

<<< @/utils/libs/js/ajax.js

## API 详解

- `xhr.open()` 发起请求，可以是 get、post 方式
- `xhr.setRequestHeader()` 设置请求头
- `xhr.send()` 发送请求主体 get 方式使用`xhr.send(null)`
- `xhr.onreadystatechange = function () {}` 监听响应状态
- `xhr.readyState`
  - `xhr.readyState = 0`时，`UNSENT` open 尚未调用
  - `xhr.readyState = 1`时，`OPENED` open 已调用
  - `xhr.readyState = 2`时，`HEADERS_RECEIVED` 接收到头信息
  - `xhr.readyState = 3`时，`LOADING` 接收到响应主体
  - `xhr.readyState = 4`时，`DONE` 响应完成
- `xhr.status`表示响应码，如 200
- `xhr.statusText`表示响应信息，如 OK
- `xhr.getAllResponseHeaders()` 获取全部响应头信息
- `xhr.getResponseHeader('key')` 获取指定头信息
- `xhr.responseText`、`xhr.responseXML`都表示响应主体
- **GET 和 POST 请求方式的差异**
  - GET 没有请求主体，使用`xhr.send(null)`
  - GET 可以通过在请求 URL 上添加请求参数
  - POST 可以通过`xhr.send('name=xiaoming&age=10')`
  - POST 需要设置 `xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');`
  - GET 效率更好
  - GET 大小限制约 4K，POST 则没有限制

## GET 请求

```js
var xhr = new XMLHttpRequest();
// 请求行
xhr.open("get", "/get");
// 请求头
xhr.setRequestHeader("Content-Type", "text/html");
// 请求主体
xhr.send(null);
// 事件的监听，来监听状态的变化
xhr.onreadystatechange = function() {
  //console.log(xhr.status);
  if (xhr.readyState == 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
```

## POST 请求

```js
var xhr = new XMLHttpRequest();
// 请求行
xhr.open("post", "/post");
// 请求头  POST
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// 请求主体
xhr.send("name=xiaowang&age=30");

// 事件的监听，来监听状态的变化
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
```

## XML

- XML 是一种标记语言，很类似 HTML，其宗旨是用来传输数据，具有自我描述性（固定的格式的数据）
- 语法规则
  - 必须有一个根元素
  - 不可有空格、不可以数字或.开头、大小写敏感
  - 不可交叉嵌套
  - 属性双引号（浏览器自动修正成双引号了）
  - 特殊符号要使用实体 ps:`&lt; &gt;`
  - 注释和 HTML 一样
  - `<?xml version="1.0" encoding="UTF-8"?>` 文档最开始

## XMLHttpRequest 兼容性

- IE5、IE6 中使用 `ActiveObject("Microsoft.XMLHTTP")`

```js
var xhr;
if (XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveObject("Microsoft.XMLHTTP");
}
```

## 同源

- 同源策略是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同。

## 跨域场景

```bash
主域名： http://www.example.com/

http://api.example.com/index.html    不同源  域名不同

https//www.example.com/index.htm    不同源  协议不同

http://www.example.com:8080/index.html  不同源  端口不同

http://api.example.com:8080/index.html  不同源  域名、端口不同

https://api.example.com/index.html  不同源  协议、域名不同

https://www.example.com:8080/index.html   不同源    端口、协议不同

http://www.example.com/detail/index.html    同  源    只是目录不同
```

## 跨域方案

- 通过 jsonp 跨域
- document.domain + iframe 跨域
- location.hash + iframe
- window.name + iframe 跨域
- postMessage 跨域
- 跨域资源共享（CORS）
- nginx 代理跨域
- nodejs 中间件代理跨域
- WebSocket 协议跨域

## fetch 发送 2 次请求的原因

fetch 的 post 请求的时候，导致 fetch 第一次发送了一个 Options 请求，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的请求

## jsonp

- JSONP 的优点是：它不像 XMLHttpRequest 对象实现的 Ajax 请求那样受到同源策略的限制；它的兼容性更好，在更加古老的浏览器中都可以运行，不需要 XMLHttpRequest 或 ActiveX 的支持；并且在请求完毕后可以通过调用 callback 的方式回传结果
- JSONP 的缺点则是：它只支持 GET 请求而不支持 POST 等其它类型的 HTTP 请求；它只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面之间如何进行 JavaScript 调用的问题

<<< @/utils/libs/js/jsonp.js

## [CORS](./cors.md)和 JSONP 对比

- JSONP 只能实现 GET 请求，而 CORS 支持所有类型的 HTTP 请求
- 使用 CORS，开发者可以使用普通的 XMLHttpRequest 发起请求和获得数据，比起 JSONP 有更好的错误处理
- JSONP 主要被老的浏览器支持，它们往往不支持 CORS，而绝大多数现代浏览器都已经支持了 CORS）

## 相关链接

- [Ajax 知识体系大梳理](https://juejin.im/post/58c883ecb123db005311861a)
- [Nginx 通过 CORS 实现跨域](https://mp.weixin.qq.com/s?__biz=MzI3MTI2NzkxMA==&mid=2247484408&idx=1&sn=5c64dd43ff2060e1c4a22d93e4e887c9&scene=1&srcid=0901vPdwJR0crm8vJmjboYzI#rd)
- [Fetch 进阶指南](http://louiszhai.github.io/2016/11/02/fetch/)
- [XMLHttpRequest2 新技巧](https://www.html5rocks.com/zh/tutorials/file/xhr2/)
- [浏览器跨域方法与基于 Fetch 的 Web 请求最佳实践](https://segmentfault.com/a/1190000006095018)
- [fetch-jsonp](https://github.com/camsong/fetch-jsonp)
- [前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)
- [navigator.sendBeacon](<https://developer.mozilla.org/zh-CN/docs/Web/API/Beacon_API/Using_the_Beacon_API#WorkerNavigator.sendBeacon()>)
- [Web sendBeacon 刷新/关闭页面之前发送请求](http://obkoro1.com/web_accumulate/accumulate/)
