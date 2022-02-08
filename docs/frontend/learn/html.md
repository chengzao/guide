---
title: html的简单介绍
date: 2020-07-22
sidebar: "auto"
tags:
  - html
categories:
  - frontend
---

## html 和 xhtml

HTML 是一种基本的 WEB 网页设计语言，XHTML 是一个基于 XML 的置标语言

## 页面三层结构

- `结构层`HTML
- `表现层`CSS
- `行为层`JavaScript

## 文档声明

- `<!DOCTYPE>` 声明对大小写不敏感
- `<!DOCTYPE>` 声明必须是 `HTML` 文档的第一行，位于 `<html>` 标签之前
- `<!DOCTYPE>` 声明不是 `HTML` 标签；告诉浏览器以何种方式来渲染页面
  - 这里有两种模式，`严格模式`和`混杂模式`。
  - 严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行
  - 混杂模式，向后兼容，模拟老式浏览器，防止浏览器无法兼容页面

### 文档类型定义（DTD）

- `HTML 5`

```html
<!DOCTYPE html>
```

- `HTML 4.01 Strict`

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

- `HTML 4.01 Transitional`

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

- `HTML 4.01 Frameset`

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

## html 转义符

```bash
`&times；` -> `×`

`&nbsp;` 半角的不断行的空白格（推荐使用）

`&ensp;` 半角的空格

`&emsp;` 全角的空格
```

## 页面加载事件

- `DOMContentLoaded` dom 内容加载完毕
- `onload` 页面上所有的资源（图片，音频，视频等）被加载以后才会触发`load`事件
- `$(document).ready()` 监听`DOMContentLoaded`事件
- `$(document).load()` 监听的是 `load` 事件

- 兼容

```html
<!-- cc:ie6 快捷键 -->
<!--[if lte IE 8]>
  <script src="http://cdn.bootcss.com/html5shiv/r29/html5.js"></script>
<![endif]-->
```

## DOM

### 获取 DOM

```js
document.getElementById("id"); //通过id获取
document.getElementsByTagName("tag"); //通过标签名获取
document.getElementsByClassName("class"); //通过类名获取元素，以类数组形式存在。
document.querySelector("selector"); //通过CSS选择器获取元素，符合匹配条件的第1个元素。
document.querySelectorAll("selector"); //通过CSS选择器获取元素，以类数组形式存在。
```

### className

```js
// Node指一个有效的DOM节点
Node.classList.add("class"); //添加class
Node.classList.remove("class"); //移除class
Node.classList.toggle("class"); //切换class，有则移除，无则添加
Node.classList.contains("class"); //检测是否存在class
```

### 自定义属性 data-\*

- 设置自定义属性格式:`data-*=""`

```js
/*
data-info="我是自定义属性"

通过Node.dataset['info'] 我们便可以获取到自定义的属性值。
Node.dataset是以类数组形式存在的

当我们如下格式设置时，则需要以驼峰格式才能正确获取
html: data-my-name="my"，js获取 Node.dataset['myName']
*/

Node.dataset["name"]; // 获取
Node.dataset["name"] = "nav"; // 设置

Node.getAttribute(); //获取
Node.setAttribute(`name`, value); //设置
Node.removeAttribute(`name`); // 方法删除指定的属性
```

## drag 拖拽

- 我们可以通过为元素增加`draggable="true"`来设置此元素是否可以进行拖拽操作，其中图片、链接默认是开启的

```js
// 拖拽元素
// 页面中设置了draggable="true"属性的元素
// 页面中任何一个元素都可以成为目标元素
ondrag; // 应用于拖拽元素，整个拖拽过程都会调用
ondragstart; // 应用于拖拽元素，当拖拽开始时调用
ondragleave; // 应用于拖拽元素，当鼠标离开拖拽元素时调用
ondragend; // 应用于拖拽元素，当拖拽结束时调用

// 目标元素
ondragenter; // 应用于目标元素，当拖拽元素进入时调用
ondragover; // 应用于目标元素，当停留在目标元素上时调用
ondrop; // 应用于目标元素，当在目标元素上松开鼠标时调用
ondragleave; //应用于目标元素，当鼠标离开目标元素时调用

// 数据传递
ev.dataTransfer.setData(); // 设置数据
ev.dataTransfer.getData(); // 读取数据
```

## History Api

```js
history.back(); // 回退
history.forward(); // 前进
history.go(n); // 前进/后退n步
history.length; //历史记录条数
/*
追加一条历史记录
data 用于存储自定义数据，通常设为null
title 网页标题，基本上没有被支持，一般设为空
url 以当前域为基础增加一条历史记录，不可跨域设置
*/
pushState(data, title, url); //
// 与pushState()基本相同，不同之处在于replaceState()，只是替换当前url，不会增加/减少历史记录。
replaceState(data, title, url);
// 事件监听:  当前进或后退时则触发，通过事件对象ev.state可以读取到存储的数据
window.addEventListener("popState", stat => {}, false);
```

## localStorage

- localStorage 与 sessionStorage
- `window.sessionStorage`容量约 5M ,生命周期为关闭浏览器窗口, 在同一个窗口下数据可以共享
- `window.localStorage`容量约 20M, 永久生效，除非手动删除, 可以多窗口共享
- `localStorage.setItem(key, value)` 设置存储内容
- `localStorage.getItem(key)` 读取存储内容
- `localStorage.removeItem(key)` 删除键值为 key 的存储内容
- `localStorage.clear()` 清空所有存储内容
- `localStorage.key(n)` 以索引值来获取存储内容

- 获取本地localStorage所有存储内容

```js
var localStore = [];

for (var i = 0; i < localStorage.length; i++) {
  localStore.push({ key: localStorage.key(i), value: localStorage.getItem(localStorage.key(i)) });
}
```

- 获取本地sessionStorage所有存储内容

```js
var sessionStore = [];

for (var i = 0; i < sessionStorage.length; i++) {
  sessionStore.push({ key: sessionStorage.key(i), value: sessionStorage.getItem(sessionStorage.key(i)) });
}
```

## FullScreen

- `document.fullScreen` 检测当前是否处于全屏
- `requestFullScreen()` 开启全屏显示
- `cancleFullScreen()` 关闭全屏显示
- `不同浏览器需要添加前缀如`
  - `webkitRequestFullScreen、mozRequestFullScreen`
  - `webkitCancleFullScreen、mozCancleFullScreen`
- 不同浏览器需要添加前缀 `document.webkitIsFullScreen、document.mozFullScreen`
- 全屏伪类 `:full-screen .box {}、:-webkit-full-screen {}、:moz-full-screen {}`

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: red;
  }
</style>

<div class="box"></div>
<button class="btn">点击全屏</button>

<script>
  var btn = document.querySelector(".btn");
  var box = document.querySelector(".box");
  btn.addEventListener("click", function() {
    // box.webkitRequestFullScreen();
    document.documentElement.webkitRequestFullScreen();
  });
</script>
```

## noreferrer/noopener

- a 链接`noopener noreferrer nofollow`

```html
<a
  href="https://an.evil.site"
  target="_blank"
  rel="noopener noreferrer nofollow"
  >a链接</a
>
```
