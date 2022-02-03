---
title: html常见布局
date: 2020-07-20
sidebar: "auto"
tags:
  - layout
categories:
  - frontend
---

> Fork原文：https://juejin.cn/post/6941206439624966152


## 两栏布局（边栏定宽主栏自适应）

<codepen slug="WNZLaKm" />

### float + overflow（BFC 原理）

```html
<div class="section">
  <aside class="float">aside</aside>
  <main class="hidden">main</main>
</div>

aside {
  width: 200px;
  height: 50px;
}
main {
  height: 100px;
}

.hidden {
  overflow: hidden;
}
.float {
  float: left;
}
```

### float + margin

```html
<div class="section">
  <aside class="float">aside</aside>
  <main class="margin">main</main>
</div>

aside {
  width: 200px;
  height: 50px;
}
main {
  height: 100px;
}

.float {
  float: left;
}

.margin {
  margin-left: 200px;
}
```

### flex

```html
<div class="section flex">
  <aside class="orange">aside</aside>
  <main class="green">main</main>
</div>

aside {
  width: 200px;
  height: 50px;
}
main {
  height: 100px;
}

.flex {
  display: flex;
}
.flex main {
  flex: 1;
}
```

### grid

```html
<div class=" grid">
  <aside class="orange">aside</aside>
  <main class="green">main</main>
</div>

aside {
  width: 200px;
  height: 50px;
}
main {
  height: 100px;
}
.grid {
  display: grid;
  grid-template-columns: 200px auto;
}
```

## 三栏布局（两侧栏定宽主栏自适应）

<codepen slug="vYevVzp" />

### 圣杯布局

```html
<section class="grail clearfix">
  <main class="green">main</main>
  <aside class="w150 left orange">aside</aside>
  <aside class="w150 right orange">aside</aside>
</section>

.grail main {
  width: 100%;
  float: left;
}
.grail .left {
  float: left;
  position: relative;
  left: -150px;
  margin-left: -100%;
}
.grail .right {
  float: left;
  position: relative;
  right: -150px;
  margin-left: -150px;
}
```

### 双飞翼布局

```html
<section class="wings clearfix">
  <main><div class="green inner">main</div></main>
  <aside class="w150 left orange">aside</aside>
  <aside class="w150 right orange">aside</aside>
</section>

.wings main {
  float: left;
  width: 100%;
}
.wings .inner {
  margin: 0 150px;
  height: 100px;
}
.wings .left {
  margin-left: -100%;
}
.wings .right {
  float: left;
  margin-left: -150px;
}
```

### float + overflow (BFC原理)

```html
<section>
  <aside class="w150 left orange">aside</aside>
  <aside class="w150 right orange">aside</aside>
  <main class="green hidden">main</main>
</section>

.left {
  float: left;
}
.right {
  float: right;
}
.hidden {
  overflow: hidden;
}
```

### flex

```html
<section class="flex">
  <aside class="w150  orange">aside</aside>
  <main class="green">main</main>
  <aside class="w150  orange">aside</aside>
</section>

.flex {
  display: flex;
}
.flex main {
  flex: 1;
}
```

### grid

```html
<section class="grid">
  <aside class=" orange">aside</aside>
  <main class="green">main</main>
  <aside class=" orange">aside</aside>
</section>

.grid {
  display: grid;
  grid-template-columns: 150px auto 150px;
}
.grid aside {
  height: 50px;
}
```

## 多列等高布局

<codepen slug="poWqxOM" />

### padding + 负margin

```html
<main>
  <section class="padmar green">
    <p>111</p>
  </section>
  <section class="padmar orange">
    <p>222</p>
    <p>222</p>
    <p>222</p>
    <p>222</p>
  </section>
  <section class="padmar blue">
    <p>333</p>
    <p>333</p>
  </sectoin>
</main>

main {
  overflow: hidden;
}
section {
  float: left;
  width: 33.33%;
  color: #fff;
}
.padmar {
  padding-bottom: 1000px;
  margin-bottom: -1000px;
}
```

### 设置父级背景图片

```html
<main class="bg">
  <section class="green">
    <p>111</p>
  </section>
  <section class="orange">
    <p>222</p>
    <p>222</p>
    <p>222</p>
    <p>222</p>
  </section>
  <section class="blue">
    <p>333</p>
    <p>333</p>
  </sectoin>
</main>

main {
  overflow: hidden;
}
section {
  float: left;
  width: 33.33%;
  color: #fff;
}

.bg {
  background: url(https://bubuzou.oss-cn-shenzhen.aliyuncs.com/blog/202102/line_bg.png) repeat-y;
  background-size: 700px 1px;
}
```


## 三行布局（头尾定高主栏自适应）

<codepen slug="YzrdJJY" />

### calc

```html
<div class="layout">
    <header></header>
    <main>
        <div class="inner"></div>
    </main>
    <footer></footer>
</div>

html,body,.layout {
    height: 100%;
}
body {
  margin: 0;
}
header, footer {
  height: 50px;
}
main {
  overflow-y: auto;
}
<!-- ///////////////////// -->
main{
  height: calc(100% - 100px);
}
```

### absolute

```html
<div class="layout">
    <header></header>
    <main>
        <div class="inner"></div>
    </main>
    <footer></footer>
</div>

html,body,.layout {
    height: 100%;
}
body {
  margin: 0;
}
header, footer {
  height: 50px;
}
main {
  overflow-y: auto;
}
<!-- /////////////////////// -->
.layout{
  position: relative;
}
header{
  positon: absolute;
  width: 100%;
}
main{
  height: 100%;
  padding: 50px 0;
  box-sizing: border-box;
}

footer{
  position: absolute;
  bootom: 0;
  width: 100%;
}
```


### flex

```html
<div class="layout">
    <header></header>
    <main>
        <div class="inner"></div>
    </main>
    <footer></footer>
</div>

html,body,.layout {
    height: 100%;
}
body {
  margin: 0;
}
header, footer {
  height: 50px;
}
main {
  overflow-y: auto;
}

<!-- /////////////////////// -->
.layout{
  display: flex;
  flex-direction: column;
}
main{
  flex: 1
}
```

### grid


```html
<div class="layout">
    <header></header>
    <main>
        <div class="inner"></div>
    </main>
    <footer></footer>
</div>

html,body,.layout {
    height: 100%;
}
body {
  margin: 0;
}
header, footer {
  height: 50px;
}
main {
  overflow-y: auto;
}

<!-- /////////////////////// -->
.layout{
  display: grid;
  grid-template-rows: 50px 1fr 50px;
}
```
