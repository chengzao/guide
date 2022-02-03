---
title: css常见问题
date: 2020-07-20
sidebar: "auto"
tags:
  - 1像素问题
  - 清除浮动
  - css三角形
  - 百分比单位
  - 字体超出省略
categories:
  - frontend
---

## CSS的border边框圆角

<codepen slug="wvPKdjm" />

```css
/* 半圆 */
.half-circle {
  height: 50px;
  border-radius: 50px 50px 0 0;
}
/* 扇形 */
.sector {
  border-radius: 100px 0 0;
}
/* 三角 */
.triangle {
  width: 0px;
  height: 0px;
  background: none;
  border: 50px solid red;
  border-color: red transparent transparent transparent;
}
/* 梯形 */
.ladder {
  width: 50px;
  height: 0px;
  background: none;
  border: 50px solid red;
  border-color: red transparent transparent transparent;
}
```

## a 伪类的顺序

- `link visited hover active`
  - `link`:平常的状态
  - `visited`:被访问过之后
  - `hover`:鼠标放到链接上的时候
  - `active`:链接被按下的时候

```css
a:link {
  background-color: blue;
}
a:visited {
  background-color: pink;
}
a:hover {
  background-color: purple;
}
a:active {
  background-color: yellow;
}
```

## 1border(1 像素问题)

<codepen slug="MWOaoLj" />

- 只设置单条底部边框

```css
.scale-1px-bottom {
    position: relative;
    border:none;
}
.scale-1px-bottom::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background: #000;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
```

- 同时设置 4 条边框

```css
.scale-1px {
    position: relative;
    margin-bottom: 20px;
    border:none;
}
.scale-1px::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
}
```

## 解决 IE9 不能使用 opacity

```css
opacity: 0.5;
filter: alpha(opacity = 50);
filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);
```

## 清除浮动的方式

- 额外标签法

<codepen slug="OJOyWPw" />

```css
.clear {
  clear: both;
}
```

- 伪元素：

<codepen slug="OJOyWPw" />

```css
.clearfix:after {
  display: block;
  overflow: hidden;
  visibility: hidden;
  height: 0;
  content: "";
  clear: both;
}
.clearfix {
  zoom: 1;
}
```

- 双伪元素

<codepen slug="OJOyWPw" />

```css
.clearfix:after,
.clearfix:before {
  display: table;
  overflow: hidden;
  height: 0;
  content: "";
  clear: both;
}
.clearfix {
  zoom: 1;
}
```

- BFC清除内部浮动

<codepen slug="OJOyWPw" />

```css
/* parent */
.box {
  width: 300px;
  border: 1px solid #000;
  overflow: hidden; /* there */
}
/* child */
.one {
  width: 150px;
  height: 200px;
  background-color: pink;
  float: left;
}
/* child */
.two {
  width: 150px;
  height: 200px;
  background-color: blue;
  float: left;
}
```

## 横屏布局

```css
.landscape-container {
  position: absolute;
  overflow: hidden;
}

// 竖屏
@media screen and (orientation: portrait) {
  .landscape-container {
    width: 100vh;
    height: 100vw;
    top: calc((100vh - 100vw) / 2);
    left: calc((100vw - 100vh) / 2);
    transform: rotate(90deg);
    transform-origin: 50% 50%;
  }
}

// 横屏
@media screen and (orientation: landscape) {
  .landscape-container {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    transform: none;
    transform-origin: 50% 50%;
  }
}
```

## 文字超出省略, 单行、多行文本溢出隐藏

<codepen slug="MWOabdM" />

- 单行文本溢出

```css
.line-camp {
  width: 300px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- 多行文本溢出

```css
.line-camp {
  width: 300px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  text-overflow: -o-ellipsis-lastline;
}
```

## css百分比单位（%）

### 子元素中的百分比到底是谁的百分比

- padding: 子元素的 padding 如果设置百分比，不论是垂直方向或者是水平方向，都相对于`直接父亲元素的width`，而与父元素的 height 无关

- margin: 子元素的 margin 如果设置成百分比，不论是垂直方向还是水平方向，都相对于`直接父元素的width`

### 应用

> forked: [https://juejin.cn/post/6936913689115099143](https://juejin.cn/post/6936913689115099143)

-padding设置百分比

<codepen slug="wvrRagE" />

```html
  <div class="trangle"></div>

  .trangle{
    height:0;
    width:100%;
    padding-top:75%;
  }
```

- CSS 怎么画一个大小为父元素宽度一半的正方形:

<codepen slug="wvrRagE" />

```html
<div class="outer">
  <div class="inner"></div>
</div>

.outer {
  width: 400px;
  height: 600px;
  background: red;
}

.inner {
  width: 50%;
  padding-bottom: 50%;
  background: blue;
}
```

- CSS实现自适应正方形、等宽高比矩形:

<codepen slug="wvrRagE" />

```html
<div class="outer">
  <div class="inner"></div>
</div>

.outer {
  width: 400px;
  height: 600px;
  background: blue;
}

.inner {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background: red;
}
```

### 百分比单位缺点

- 计算困难，如果我们要定义一个元素的宽度和高度，按照设计稿，必须换算成百分比单位

- 各个属性中如果使用百分比，相对父元素的属性并不是唯一的

  - width 和 height 相对于父元素的 width 和 height

  - margin、padding 不管垂直还是水平方向都相对比父元素的宽度

  - border-radius 则是相对于元素自身

- 造成我们使用百分比单位容易使布局问题变得复杂

## 水平居中

- 此类元素需要水平居中，则父级元素必须是块级元素:

<codepen slug="dyVwgMO" />

```css
.parent {
    text-align: center;
}
```

## 垂直居中

- 通过设置上下内间距一致达到垂直居中的效果:

<codepen slug="dyVwgMO" />

```css
.single-line {
  padding-top: 10px;
  padding-bottom: 10px;
}
```

- 通过设置 height 和 line-height 一致达到垂直居中:

<codepen slug="dyVwgMO" />

```css
.single-line {
  height: 100px;
  line-height: 100px;
}
```

## 水平垂直居中

<codepen slug="ymaKoM" />

### 固定宽高的块级盒子

- absolute + 负 margin:

<codepen slug="YzrdJQQ" />

```css
.parent{
  position: relative;
}
.child{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
}
```

- absolute + margin auto:

<codepen slug="YzrdJQQ" />

```css
.parent{
  position: relative;
}
.child{
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
```

- absolute + calc:

<codepen slug="YzrdJQQ" />

```css
.parent{
  position: relative;
}
.child{
  width: 100px;
  height: 100px;
  position: absolute;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
}
```

### 不固定宽高的块级盒子

- absolute + transform:

<codepen slug="qBPLJVq" />

```css
.parent{
  position: relative;
}

.child{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

- flex :

<codepen slug="qBPLJVq" />

```css
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- table-cell

<codepen slug="qBPLJVq" />

```css
.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 600px;
}
.child {
  display: inline-block;
}
```

- grid

<codepen slug="qBPLJVq" />

```css
.parent {
  display: grid;
}
.child {
  align-self: center;
  justify-self: center;
}
```

- line-height + vertical-align

<codepen slug="qBPLJVq" />

```css
.parent{
  line-height: 150px;
  text-align: center;
}

.child{
  display: inline-block;
  line-height: initial;
  vertical-align: middle;
}
```

- writing-mode

<codepen slug="qBPLJVq" />

```css
.parent {
  width: 600px;
  writing-mode: vertical-lr;
  text-align: center;
}
.parent .middle {
  display: inline-block;
  writing-mode: horizontal-tb;
  text-align: center;
  width: 100%;
}
.parent .child {
  display: inline-block;
}
```

## 如何判断元素是否到达可视区域

Fork: [https://juejin.cn/post/6905539198107942919](https://juejin.cn/post/6905539198107942919)

- window.innerHeight 是浏览器可视区的高度；
- document.body.scrollTop || document.documentElement.scrollTop 是浏览器滚动的过的距离；
- imgs.offsetTop 是元素顶部距离文档顶部的高度（包括滚动条的距离）；
- 内容达到显示区域的：img.offsetTop < window.innerHeight + document.body.scrollTop;

![image-isvisible](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/image-isvisible.4mjhm8qyr9m0.webp)

## css实现文字两端对齐

> https://zhuanlan.zhihu.com/p/53428937

```html
// html
<div class="row">
  <span>姓名</span><input type="text">
</div>
<div class="row">
  <span>联系方式</span><input type="text">
</div>

// css 1.0
.row span {
    display: inline-block;
    width: 4em;
    text-align: justify;
    text-align-last: justify;
 }

// css 2.0
.row input {
  vertical-align: top;
}
.row span {
  display: inline-block;
  width: 4em;
  text-align: justify;
  height: 20px;
  overflow: hidden;
}
.row span:after {
  content: '';
  display: inline-block;
  width: 100%;
}
```
