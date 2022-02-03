---
title: 浏览器对象介绍
date: 2020-07-22
sidebar: "auto"
tags:
  - 浏览器
categories:
  - frontend
---

- 什么是 BOM? BOM 是 Browser Object Model，浏览器对象模型，提供与浏览器交互的方法和接口
- 什么是 DOM? DOM 是 Document Object Model，文档对象模型，提供操作页面元素的方法和属性

## 浏览器内核

```bash
safari    Webkit
chrome    Blink (current) / Webkit (pre)   -webkit-
chromium  Blink
firefox   Gecko   -moz-
ie        Trident -ms-
edge      EdgeHTML
Opera12.17及更早版本曾经采用的内核  Presto  -o-
```

## Navigator 对象

- `navigator.userAgent`返回浏览器的`User-Agent`字符串，标示浏览器的厂商和版本信息
- `navigator.geolocation` 返回一个`Geolocation`对象，包含用户地理位置的信息

```js
navigator.geolocation.getCurrentPosition(function(position) {
  console.log(
    " latitude " +
      position.coords.latitude +
      " \n longitude " +
      position.coords.longitude
  );
});
```

- `navigator.cookieEnabled`返回一个布尔值，表示浏览器是否能储存`Cookie`

## location 对象

- `location`属性返回 location 对象,提供了当前文档的 URL 信息

```js
location.href; // "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
location.protocol; // "http:"
location.host; // "www.example.com:4097"
location.hostname; // "www.example.com"
location.port; // "4097"
location.pathname; // "/path/a.html"
location.search; // "?x=111"
location.hash; // "#part1"
location.user; // "user"
location.password; // "passwd"
```

- location 对象方法

```js
// 跳转到另一个网址
location.assign("http://www.google.com");
// 优先从服务器重新加载
location.reload(true);
// 优先从本地缓存重新加载(默认值)
location.reload(false);
// 跳转到新网址,并将取代掉history对象中的当前记录
location.replace("http://www.google.com");
// 将location对象转为字符串,等价于location.href
location.toString();
//新的网址赋值给location对象,网页就会自动跳转到新网址
location = "http://www.example.com";
// 等同于
location.href = "http://www.example.com";
//指定相对URL
location = "page2.html";
//如果指定的是锚点,浏览器会自动滚动到锚点处
location = "#top";

//document.location属性与window.location属性等价
document.location === window.location; // true
```

## history 对象

### 方法

- `go()` 接受一个整数作为参数, 移动到参数指定的网址
- `forward()` 移动到下一个网址
- `back()` 移动到上一个网址
- `pushState()` `window.history.pushState(state, title, url)`
- `replaceState()` `history.replaceState({page: 1}, 'title 1', '?page=1')`

### 属性

- `length` 当前窗口访问过的网址数量（包括当前网页）
- `state` History 堆栈最上层的状态值

### popState 事件

- 每当同一个文档的浏览历史（即`history`对象）出现变化时，就会触发`popstate`事件
- 仅仅调用`pushState()`方法或`replaceState()`方法 ，并不会触发该事件

## URL 统一资源标识符

URI: 统一资源标识符,是用来标识互联网上的资源（例如，网页或文件）和怎样访问这些资源的传输协议（例如，HTTP 或 FTP）的字符串

### URL 组成

- `protocol`: 协议头，譬如有 http，ftp 等
- `host`: 主机域名或 IP 地址
- `port`: 端口号
- `path`: 目录路径
- `query`: 即查询参数
- `fragment`: 即#后的 hash 值，一般用来定位到某个位置

### URLSearchParams

- `URLSearchParams()` 返回一个 URLSearchParams 对象
- `URLSearchParams.append()` 插入一个指定的键/值对作为新的搜索参数
- `URLSearchParams.delete()` 从搜索参数列表里删除指定的搜索参数及其对应的值
- `URLSearchParams.set()` 设置一个搜索参数的新值，假如原来有多个值将删除其他所有的值
- `URLSearchParams.sort()` 按键名排序
- `URLSearchParams.toString()` 返回搜索参数组成的字符串，可直接使用在 URL 上

```js
var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === ""; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=%E5%B0%8F%E6%98%8E&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=%E5%B0%8F%E6%98%8E&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=%E5%B0%8F%E6%98%8E"

for (let p of searchParams) {
  console.log(p);
}
// ["q", "小明"]
// ["topic", "api"]
```

### Url常见方法

- 将对象解析成 url 字符串

```js
/**
 * 将对象解析成url字符串 object => string
 * @param  {Object} obj 参数对象
 * @param  {Boolean} unEncodeURI 不使用编码
 * @return {String} 转换之后的url参数
 */
const param = (obj = {}, unEncodeURI) => {
  let result = [];
  for (let name of Object.keys(obj)) {
    let value = obj[name];

    result.push(name + "=" + (unEncodeURI ? value : encodeURIComponent(value)));
  }
  if (result.length) {
    return "?" + result.join("&");
  } else {
    return "";
  }
};
```

- 将 url 字符串解析成对象

```js
/**
 * 将url字符串解析成对象 sting => object
 * @param  {String} str 带url参数的地址
 * @param  {Boolean} unDecodeURI 不使用解码
 * @return {Object} 转换之后的url参数
 */
const unparam = (str = "", unDecodeURI) => {
  let result = {};
  let queries = str.split("?")
  let query = queries.length == 1 ? queries[0]: queries[1];
  if (!query) return result;
  let arr = query.split("&");
  arr.forEach((item, idx) => {
    // let name = param[0];
    // let value = param[1] || '';
    let [name, value=''] = item.split("=");
    if (name) {
      result[name] = unDecodeURI ? value : decodeURIComponent(value);
    }
  });
  return result;
};
```

### encodeURIComponent 与 decodeURIComponent

```js
const url = "http://www.domain.com/abc?user=Alan&age=123&name=小明";
console.log(encodeURIComponent(url));
// http%3A%2F%2Fwww.domain.com%2Fabc%3Fuser%3DAlan%26age%3D123%26name%3D%E5%B0%8F%E6%98%8E
console.log(decodeURIComponent(encodeURIComponent(url)));
// http://www.domain.com/abc?user=Alan&age=123&name=小明
```

### encodeURI 与 decodeURI

```js
const url = "http://www.domain.com/abc?user=Alan&age=123&name=小明";
console.log(encodeURI(url));
// http://www.domain.com/abc?user=Alan&age=123&name=%E5%B0%8F%E6%98%8E
console.log(decodeURI(encodeURI(url)));
// http://www.domain.com/abc?user=Alan&age=123&name=小明
```
