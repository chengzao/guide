---
title: ajax和cors
date: 2020-07-20
sidebar: "auto"
tags:
  - cors
  - XMLHttpRequest
---

- 简易版 1

```js
// 1.实例化
var xhr = new XMLHttpRequest();
// 2.请求行
//第三个参数：true 为 异步 ; false 为同步
// GET传参
xhr.open('get', 'index.php?name=xiaoming&&age=10', true);
//POST
xhr.open('post', 'index.php', true);
// 3.请求头:
//GET方式可以不设请求头
xhr.setRequestHeader('Content-Type', 'text/html');
// POST方式必须要设置请求头
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 4.请求主体
// GET方式
xhr.send(null);
// POST参数放到请求主体里
xhr.send('name=xiaoming&age=10');
// 5.响应状态 ：request.responseText或者request.responseXML
// 事件的监听，来监听状态的变化
xhr.onreadystatechange = function () {
  // console.log(xhr.readyState);
  // console.log(xhr.status);

  // 此状态则为响应结果完成
  if (xhr.readyState == 4 && xhr.status == 200) {
    // 通过DOM操作将内容放到页面上
    document.getElementById('result').innerHTML = xhr.responseText;
  }
}
```

- 简易版 2

```js
var Ajax = {
  params: function (params) {
    var data = '';
    // 拼凑参数
    for (key in params) {
      data += key + '=' + params[key] + '&';
    }

    // 将最后一个&字符截掉
    return data.slice(0, -1);
  },
  // 兼容
  createXHR: function () {
    if (typeof XMLHttpRequest != "undefined") {
      return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
      if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
          "MSXML2.XMLHttp"
        ],
          i, len;

        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {
            //skip
          }
        }
      }
      return new ActiveXObject(arguments.callee.activeXString);
    } else {
      throw new Error("No XHR object available.");
    }
  },
  // 字符串转json
  strToJson: function (str) {
    var json = (new Function("return " + str))();
    return json;
  },
  // Ajax实例
  ajax: function (options) {
    // 实例化XMLHttpRequest
    // var xhr = new XMLHttpRequest,
    var _this = this,
      xhr = _this.createXHR(),

      // 默认为get方式
      type = options.type || 'GET',
      // 默认请求路径
      url = options.url || location.pathname,
      // 格式化数据key1=value1&key2=value2
      data = _this.params(options.data);

    // get 方式将参数拼接到URL上并将data设置成null
    if (type == 'get') {
      url = url + '?' + data;
      data = null;
    }

    xhr.open(type, url);

    // post 方式设置请求头
    if (type == 'post') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    // 发送请求主体
    xhr.send(data);

    // 监听响应
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // 获取响应类型
        var contentType = xhr.getResponseHeader('Content-Type');

        var data = xhr.responseText;

        // 解析JSON
        if (contentType.indexOf('json') != -1 && typeof JSON != "undefined") {
          data = JSON.parse(data);
        }

        // 调用success
        options.success(data);
      } else {
        options.error('请求失败!');
      }
    }

  }
};
```

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

fetch 的 post 请求的时候，导致 fetch 第一次发送了一个 Options 请求，询问服务器是否支持修改的请求头，
如果服务器支持，则在第二次中发送真正的请求

## jsonp

- JSONP 的优点是：它不像 XMLHttpRequest 对象实现的 Ajax 请求那样受到同源策略的限制；它的兼容性更好，
  在更加古老的浏览器中都可以运行，不需要 XMLHttpRequest 或 ActiveX 的支持；
  并且在请求完毕后可以通过调用 callback 的方式回传结果

- JSONP 的缺点则是：它只支持 GET 请求而不支持 POST 等其它类型的 HTTP 请求；它只支持跨域 HTTP 请求这种情况，
  不能解决不同域的两个页面之间如何进行 JavaScript 调用的问题

```js
function jsonp({ url, params, cb }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    window[cb] = function (data) {
      resolve(data);
      document.body.removeChild(script)
    }
    params = { ...params, cb }
    let arrs = [];
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}
```

## cors

- 对比cors， JSONP 只能实现 GET 请求，而 CORS 支持所有类型的 HTTP 请求

- 对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个 Origin 字段

  Origin: `http://api.bob.com`

  Origin 字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求

  如果 Origin 指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段，就知道出错了，从而抛出一个错误，被 XMLHttpRequest 的 onerror 回调函数捕获。注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是 200

- 如果 Origin 指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段

```bash
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

上面的头信息之中，有三个与 CORS 请求相关的字段，都以 Access-Control-开头

- `Access-Control-Allow-Origin`

  - 该字段是必须的。它的值要么是请求时 Origin 字段的值，要么是一个\*，表示接受任意域名的请求

- `Access-Control-Allow-Credentials`

  - 该字段可选。它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求之中。
    设为 true，即表示服务器明确许可，Cookie 可以包含在请求中，一起发给服务器。这个值也只能设为 true，
    如果服务器不要浏览器发送 Cookie，删除该字段即可

- `Access-Control-Expose-Headers`

  - 该字段可选。CORS 请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法
    只能拿到 6 个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expire`s、`Last-Modified`、`Pragma`。
    如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定

### withCredentials 属性

- CORS 请求默认不发送 Cookie 和 HTTP 认证信息。如果要把 Cookie 发到服务器，
  一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段

  `Access-Control-Allow-Credentials: true`

- 另一方面，开发者必须在 AJAX 请求中打开`withCredentials`属性

```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

- 否则，即使服务器同意发送 Cookie，浏览器也不会发送。或者，服务器要求设置 Cookie，浏览器也不会处理

- 需要注意的是，如果要发送 Cookie，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名

- 同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的
  Cookie 并不会上传，且（跨源）原网页代码中的 document.cookie 也无法读取服务器域名下的 Cookie

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
