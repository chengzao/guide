# Html5

## 新语义标签

```html
<nav> 表示导航
<header> 表示页眉
<footer> 表示页脚
<section> 表示区块
<article> 表示文章 如文章、评论、帖子、博客
<aside> 表示侧边栏 如文章的侧栏
<figure> 表示媒介内容分组 与 ul > li 做个比较
<mark> 表示标记 (带用“UI”，不怎么用)
<progress> 表示进度 (带用“UI”，不怎么用)
<time> 表示日期
<hgroup> 标题列表
<details>
<summary>
```

- 兼容

```html
<!-- cc:ie6 快捷键 -->
<!--[if lte IE 8]>
    <script src='http://cdn.bootcss.com/html5shiv/r29/html5.js'></script>
<![endif]-->
```

## input标签

- type

```html
email     输入email格式
tel       手机号码
url       只能输入url格式
number    只能输入数字
search    搜索框
range     范围
color     拾色器
time	  时间
date      日期 不是绝对的
datetime  时间日期
month     月份
week      星期
```

- `property`

```html
placeholder     占位符
autofocus       获取焦点
multiple        文件上传多选或多个邮箱地址
autocomplete    自动完成，用于表单元素，也可用于表单自身
form            指定表单项属于哪个form，处理复杂表单时会需要
novalidate      关闭验证，可用于<form>标签
required        验证条件，必填项
pattern         正则表达式 验证表单
```

- 表单事件

```html
oninput       用户输入内容时触发，可用于移动端输入字数统计
oninvalid     验证不通过时触发
```

## 多媒体标签

### 音频

- `autoplay` 自动播放
- `controls` 是否显不默认播放控件
- `loop` 循环播放
- `preload` 预加载 同时设置`autoplay`时些属性失效
- 多浏览器支持的方案:

```html
<audio controls class="audio">
	<!-- 通过source标签指定多格式音频文件 -->
	<source src="./music/See You Again.mp3">
	<source src="./music/See You Again.wav">
	<source src="./music/See You Again.ogg">
	您的浏览器不支持HTML音频播放功能
</audio>
```

### 视频

- `autoplay` 自动播放
- `controls` 是否显示默认播放控件
- `loop` 循环播放
- `preload` 预加载，同时设置了autoplay，此属性将失效
- `width` 设置播放窗口宽度
- `height` 设置播放窗口的高度
- 多浏览器支持的方案

```html
<video controls="controls">
	<!-- 通过source标签指定多格式视频文件 -->
	<source src="./video/movie.ogg">
	<source src="./video/movie.mp4">
	您的浏览器不支持HTML视频播放功能
</video>
```

## DOM扩展

### 获取元素

```js
document.getElementById('id') //通过id获取
document.getElementsByTagName('tag') //通过标签名获取
document.getElementsByClassName ('class') //通过类名获取元素，以类数组形式存在。
document.querySelector('selector') //通过CSS选择器获取元素，符合匹配条件的第1个元素。
document.querySelectorAll('selector') //通过CSS选择器获取元素，以类数组形式存在。
```

### classNme操作

```js
// Node指一个有效的DOM节点
Node.classList.add('class') //添加class
Node.classList.remove('class') //移除class
Node.classList.toggle('class') //切换class，有则移除，无则添加
Node.classList.contains('class') //检测是否存在class
```

### 自定义属性data-*

- 设置自定义属性格式:`data-*=""`

```js
/*
data-info="我是自定义属性"

通过Node.dataset['info'] 我们便可以获取到自定义的属性值。
Node.dataset是以类数组形式存在的

当我们如下格式设置时，则需要以驼峰格式才能正确获取
html: data-my-name="my"，js获取 Node.dataset['myName']
*/

Node.dataset['name']  // 获取
Node.dataset['name'] = 'nav'  // 设置

Node.getAttribute() //获取
Node.setAttribute(`name`, value) //设置
Node.removeAttribute(`name`) // 方法删除指定的属性
```

## drag拖拽

- 我们可以通过为元素增加`draggable="true"`来设置此元素是否可以进行拖拽操作，其中图片、链接默认是开启的

```js
// 拖拽元素
// 页面中设置了draggable="true"属性的元素
// 页面中任何一个元素都可以成为目标元素
ondrag 		// 应用于拖拽元素，整个拖拽过程都会调用
ondragstart	// 应用于拖拽元素，当拖拽开始时调用
ondragleave	// 应用于拖拽元素，当鼠标离开拖拽元素时调用
ondragend	 // 应用于拖拽元素，当拖拽结束时调用

// 目标元素
ondragenter	// 应用于目标元素，当拖拽元素进入时调用
ondragover	// 应用于目标元素，当停留在目标元素上时调用
ondrop		// 应用于目标元素，当在目标元素上松开鼠标时调用
ondragleave	 //应用于目标元素，当鼠标离开目标元素时调用

// 数据传递
ev.dataTransfer.setData() // 设置数据
ev.dataTransfer.getData() // 读取数据
```

## History Api

```js
history.back() // 回退
history.forward() // 前进
history.go(n) // 前进/后退n步
history.length //历史记录条数
/*
追加一条历史记录
data 用于存储自定义数据，通常设为null
title 网页标题，基本上没有被支持，一般设为空
url 以当前域为基础增加一条历史记录，不可跨域设置
*/
pushState(data, title, url) //
// 与pushState()基本相同，不同之处在于replaceState()，只是替换当前url，不会增加/减少历史记录。
replaceState(data, title, url)
// 事件监听:  当前进或后退时则触发，通过事件对象ev.state可以读取到存储的数据
window.addEventListener('popState', (stat)=>{},false)
```

## h5本地存储

- localStorage与sessionStorage
- `window.sessionStorage`容量约5M ,生命周期为关闭浏览器窗口, 在同一个窗口下数据可以共享
- `window.localStorage`容量约20M, 永久生效，除非手动删除, 可以多窗口共享
- `localStorage.setItem(key, value)`  设置存储内容
- `localStorage.getItem(key)`  读取存储内容
- `localStorage.removeItem(key)`  删除键值为key的存储内容
- `localStorage.clear()`  清空所有存储内容
- `localStorage.key(n)`  以索引值来获取存储内容

## 地理定位

- 获取当前地理信息`navigator.getCurrentPosition(successCallback, errorCallback, options)`
- 当成功获取地理信息后，会调用`succssCallback`，并返回一个包含位置信息的对象`position`
  - `position.coords.latitude`  纬度
  - `position.coords.longitude`  经度
  - `position.coords.accuracy`  精度
  - `position.coords.altitude`  海拔高度
- 重复获取当前地理信息`navigator.watchPosition(successCallback, errorCallback, options)`
- 当获取地理信息失败后，会调用`errorCallback`，并返回错误信息`error`, `options`对象
  - `a)`enableHighAccuracy 高精度模式
  - `b)`timeout 超时设置，单位为ms
  - `c)`maximumAge表示浏览器重新获取位置信息的时间间隔，单位为ms

## 全屏FullScreen

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
var btn = document.querySelector('.btn');
var box = document.querySelector('.box');
btn.addEventListener('click', function () {
  // box.webkitRequestFullScreen();
  document.documentElement.webkitRequestFullScreen();
});
</script>
```

## 应用缓存

- [Manifest应用缓存](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)

## 文件读取

- [FileReader文件读取](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader#toc)

## 多媒体

- [HTML 5 视频/音频参考手册](http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp)

## `rel="noopener noreferrer nofollow"`

- a链接

```html
<a href="https://an.evil.site" target="_blank" rel="noopener noreferrer nofollow">a链接</a>
```

- `font-family`

```css
font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
```
