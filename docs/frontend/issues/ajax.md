---
title: ajax和cors
date: 2020-07-20
sidebar: "auto"
tags:
  - cors
  - XMLHttpRequest
categories:
  - frontend
---

## XMLHttpRequest

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

## XMLHttpRequest兼容性

```js
var xhr;
if (XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveObject("Microsoft.XMLHTTP");
}
```

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

## JSONP

```js
function jsonp({ url, params, cb }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    window[cb] = function (data) {
      resolve(data);
      document.body.removeChild(script)
    }
    params = { ...params, cb }
    let queries = [];
    for (let key in params) {
      queries.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${queries.join('&')}`
    document.body.appendChild(script)
  })
}

// node server
app.get('/get',function(req,res){
    let { cb } = req.query; // 定义好的字段
    const data = {"message": "data jsonp"}
    res.send( `${cb}(${JSON.stringify(data)})` );
})

// web 使用
jsonp({
  url: 'http://localhost:3000/get',
  cb: 'show' // 定义好的字段
}).then(data => {
  console.log(data)
})
```

## cors

- 对比cors， JSONP 只能实现 GET 请求，而 CORS 支持所有类型的 HTTP 请求
- 如果 Origin 指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段

```bash
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true  # 表示是否允许发送 Cookie, 默认跨域不支持
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

### withCredentials 属性

- CORS 请求默认不发送 Cookie 和 HTTP 认证信息。如果要把 Cookie 发到服务器，
  需要指定`Access-Control-Allow-Credentials`字段

```bash
Access-Control-Allow-Credentials: true
```

- 在 AJAX 请求中打开`withCredentials`属性

```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

- 否则，即使服务器同意发送 Cookie，浏览器也不会发送。或者，服务器要求设置 Cookie，浏览器也不会处理

## 相关链接

- [XMLHttpRequest2 新技巧](https://www.html5rocks.com/zh/tutorials/file/xhr2/)
- [浏览器跨域方法与基于 Fetch 的 Web 请求最佳实践](https://segmentfault.com/a/1190000006095018)
- [fetch-jsonp](https://github.com/camsong/fetch-jsonp)
- [前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)
- [navigator.sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Beacon_API/Using_the_Beacon_API#WorkerNavigator.sendBeacon())
- [Web sendBeacon 刷新/关闭页面之前发送请求](http://obkoro1.com/web_accumulate/accumulate/)
