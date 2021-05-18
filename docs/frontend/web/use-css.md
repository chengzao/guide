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
---

## CSS 画圆半圆扇形三角梯形

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



```html
<style type="text/css">
  body {
    background-color: #dfdfdf;
  }
  .box {
    width: 100px;
    height: 100px;
    text-align: center;
    margin-bottom: 10px;
    background-color: #fff;
  }

  .scale {
    position: relative;
    border: none;
  }

  .scale:after {
    content: "";
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

  .box-shadow-1px {
    box-shadow: inset 0px -1px 1px -1px #000;
  }

  .scale－single {
    position: relative;
    border: none;
  }

  .scale－single:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background: #000;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
</style>

<div class="box scale">scale all</div>
<div class="box box-shadow-1px">box shadow</div>
<div class="box scale－single">scale single</div>
```



## 解决 IE9 不能使用 opacity



```css
opacity: 0.5;
filter: alpha(opacity = 50);
filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);
```



## 清除浮动的方式

- 额外标签法



```css
.clear {
  clear: both;
}
```



- 伪元素



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



- BFC 清除内部浮动:父级触发块级格式化上下文,形成独立渲染区域



```css
/* fu */
.box {
  width: 300px;
  border: 1px solid #000;
  overflow: hidden;
}
/* zi */
.one {
  width: 150px;
  height: 200px;
  background-color: pink;
  float: left;
}
/* zi */
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

## 文字超出省略、文字两端对齐

- 单行

```css
.div {
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- 多行超出省略

```css
.line-camp( @clamp:2 ) {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: @clamp;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
```

## css 百分比单位

### 子元素中的百分比（%）到底是谁的百分比

- 子元素 height 和 width 的百分比

  - 子元素的 height 或 width 中使用百分比，是相对于子元素的直接父元素，width 相对于父元素的 width，height 相对于父元素的 height

- top 和 bottom 、left 和 right

  - 子元素的 top 和 bottom 如果设置百分比，则相对于直接非 static 定位(默认定位)的父元素的高度

  - 子元素的 left 和 right 如果设置百分比，则相对于直接非 static 定位(默认定位的)父元素的宽度

- padding

  - 子元素的 padding 如果设置百分比，不论是垂直方向或者是水平方向，都相对于`直接父亲元素的width`，而与父元素的 height 无关

- margin

  - 子元素的 margin 如果设置成百分比，不论是垂直方向还是水平方向，都相对于`直接父元素的width`

- border-radius

  - border-radius 不一样，如果设置 border-radius 为百分比，则是相对于自身的宽度

- translate

  - 相对于自身

- background-size

  - 相对于自身

### 百分比单位布局应用

- 实现一个固定长宽比的长方形

```html
  <div class="trangle"></div>

  .trangle{
    height:0;
    width:100%;
    padding-top:75%;
  }
```

### 百分比单位缺点

- 计算困难，如果我们要定义一个元素的宽度和高度，按照设计稿，必须换算成百分比单位

- 各个属性中如果使用百分比，相对父元素的属性并不是唯一的

  - width 和 height 相对于父元素的 width 和 height

  - margin、padding 不管垂直还是水平方向都相对比父元素的宽度

  - border-radius 则是相对于元素自身

- 造成我们使用百分比单位容易使布局问题变得复杂
