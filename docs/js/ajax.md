# AJAX

## XMLHttpRequest

### 实例化

<CodeBlock title="XMLHttpRequest >>">

<<< @/example/docs/js/XMLHttpRequest.js

</CodeBlock>

<CodeBlock title="ajax简易版">

<<< @/example/docs/js/ajax.js

</CodeBlock>

### API详解

- `xhr.open()` 发起请求，可以是get、post方式
- `xhr.setRequestHeader()` 设置请求头
- `xhr.send()` 发送请求主体get方式使用`xhr.send(null)`
- `xhr.onreadystatechange = function () {}` 监听响应状态
- `xhr.readyState`
  - `xhr.readyState = 0`时，`UNSENT` open尚未调用
  - `xhr.readyState = 1`时，`OPENED` open已调用
  - `xhr.readyState = 2`时，`HEADERS_RECEIVED` 接收到头信息
  - `xhr.readyState = 3`时，`LOADING` 接收到响应主体
  - `xhr.readyState = 4`时，`DONE` 响应完成
- `xhr.status`表示响应码，如200
- `xhr.statusText`表示响应信息，如OK
- `xhr.getAllResponseHeaders()` 获取全部响应头信息
- `xhr.getResponseHeader('key')` 获取指定头信息
- `xhr.responseText`、`xhr.responseXML`都表示响应主体
- **GET和POST请求方式的差异**
  - GET没有请求主体，使用`xhr.send(null)`
  - GET可以通过在请求URL上添加请求参数
  - POST可以通过`xhr.send('name=xiaoming&age=10')`
  - POST需要设置 `xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');`
  - GET效率更好
  - GET大小限制约4K，POST则没有限制

## XML

- XML是一种标记语言，很类似HTML，其宗旨是用来传输数据，具有自我描述性（固定的格式的数据）
- 语法规则
  - 必须有一个根元素
  - 不可有空格、不可以数字或.开头、大小写敏感
  - 不可交叉嵌套
  - 属性双引号（浏览器自动修正成双引号了）
  - 特殊符号要使用实体  ps:`&lt; &gt;`
  - 注释和HTML一样
  - `<?xml version="1.0" encoding="UTF-8"?>` 文档最开始

## XMLHttpRequest兼容性

- IE5、IE6中使用 `ActiveObject("Microsoft.XMLHTTP")`

<CodeBlock title="XMLHttpRequest兼容性 >>">

```js
var xhr;
if(XMLHttpRequest){
  xhr = new XMLHttpRequest();
}else{
  xhr = new ActiveObject("Microsoft.XMLHTTP");
}
```

</CodeBlock>

### 同源

- 同源策略是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同。

### 跨域CORS

- 不同源则跨域

<CodeBlock>

```bash
例如：http://www.example.com/

http://api.example.com/detail.html    不同源  域名不同
https//www.example.com/detail.htm   不同源  协议不同
http://www.example.com:8080/detail.html 不同源  端口不同
http://api.example.com:8080/detail.html 不同源  域名、端口不同
https://api.example.com/detail.html 不同源  协议、域名不同
https://www.example.com:8080/detail.html  不同源    端口、协议不同
http://www.example.com/detail/index.html  同  源    只是目录不同
```

</CodeBlock>

### 跨域方案

- 顶级域名相同的可以通过`domain.name`来解决，即同时设置 `domain.name = 顶级域名`（如example.com）
- `document.domain + iframe`
- `window.name + iframe`
- `location.hash + iframe`
- `window.postMessage()`
- 服务器端解决`cors`
- `jsonp`
- `Fetch`

### CORS和JSONP对比

- JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求
- 使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理
- JSONP主要被老的浏览器支持，它们往往不支持CORS，而绝大多数现代浏览器都已经支持了CORS）

## fetch发送2次请求的原因

fetch的post请求的时候，导致fetch 第一次发送了一个Options请求，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的请求

## jsonp

- JSONP的优点是：它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制；它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持；并且在请求完毕后可以通过调用callback的方式回传结果
- JSONP的缺点则是：它只支持GET请求而不支持POST等其它类型的HTTP请求；它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题

<CodeBlock title="jsonp简易版">

<<< @/example/docs/js/jsonp.js

</CodeBlock>

## 参考链接

- [前端跨域整理](https://juejin.im/post/5815f4abbf22ec006893b431)
- [Ajax 知识体系大梳理](https://juejin.im/post/58c883ecb123db005311861a)
- [Nginx通过CORS实现跨域](https://mp.weixin.qq.com/s?__biz=MzI3MTI2NzkxMA==&mid=2247484408&idx=1&sn=5c64dd43ff2060e1c4a22d93e4e887c9&scene=1&srcid=0901vPdwJR0crm8vJmjboYzI#rd)
- [Fetch进阶指南](http://louiszhai.github.io/2016/11/02/fetch/)
