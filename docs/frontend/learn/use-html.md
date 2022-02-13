---
title: html常见布局
date: 2020-07-20
sidebar: "auto"
tags:
  - 布局
categories:
  - frontend
---

> 原文：[1.5 万字 CSS 基础拾遗（核心知识、常见需求）](https://juejin.cn/post/6941206439624966152)

## 两栏布局（边栏定宽主栏自适应）

- float + overflow（BFC 原理）

<codepen slug="WNXERZm" />

```html
<div class="section">
  <div class="left">aside</div>
  <div class="main">main</div>
</div>
<style>
  .left {
    width: 200px;
    height: 50px;
    float: left;
  }
  .main {
    height: 100px;
    overflow: hidden;
  }
</style>
```

- float + margin

<codepen slug="yLPogvL" />

```html
<div class="section">
  <div class="left">aside</div>
  <div class="main">main</div>
</div>
<style>
  .left {
    width: 200px;
    height: 50px;
    float: left;
  }
  .main {
    height: 100px;
    margin-left: 200px;
  }
</style>
```

- flex

<codepen slug="podrRKo" />

```html
<div class="section flex">
  <div class="left">aside</div>
  <div class="main">main</div>
</div>
<style>
  .flex{
    display: flex;
  }
  .left {
    width: 200px;
    height: 50px;
  }
  .main {
    height: 100px;
    flex: 1;
  }
</style>
```

- grid

<codepen slug="yLPogqy" />

```html
<div class="section grid">
  <div class="left">aside</div>
  <div class="main">main</div>
</div>
<style>
  .grid {
    display: grid;
    grid-template-columns: 200px auto;
  }
  .left {
    width: 200px;
    height: 50px;
  }
  .main {
    height: 100px;
    flex: 1;
  }
</style>
```

## 三栏布局（两侧栏定宽主栏自适应）

- 圣杯布局

<codepen slug="mdqMRGj" />

```html
<div class="section clearfix">
  <div class="main">main</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
<style>
  .section{
    /* there */
    padding: 0 150px;
  }
  .main {
    height: 100px;
    /* there */
    width: 100%;
    float: left;
  }
  .left {
    width: 150px;
    height: 50px;
    /* there */
    float: left;
    position: relative;
    left: -150px;
    margin-left: -100%;
  }
  .right {
    width: 150px;
    height: 50px;
    /* there */
    float: left;
    position: relative;
    right: -150px;
    margin-left: -150px;
  }
</style>
```

- 双飞翼布局

<codepen slug="oNoeZXd" />

```html
<div class="section clearfix">
  <div class="main"><div class="inner">inner</div></div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
<style>
  .main {
    height: 100px;

    float: left;
    width: 100%;
  }
  .inner{
    margin: 0 150px;
    height: 100px;
  }

  .left {
    width: 150px;
    height: 50px;

    float: left;
    margin-left: -100%;
  }
  .right {
    width: 150px;
    height: 50px;

    float: left;
    margin-left: -150px;
  }
</style>
```

- float + overflow (BFC原理)

<codepen slug="rNYzyMw" />

```html
<div class="section clearfix">
  <div class="left">left</div>
  <div class="right">right</div>
  <div class="main">main</div>
</div>
<style>
.main {
  height: 100px;

  overflow:hidden;
}

.left {
  width: 150px;
  height: 50px;

  float: left;
}
.right {
  width: 150px;
  height: 50px;

  float: right;
}
</style>
```

- flex

<codepen slug="rNYzyjw" />

```html
<div class="section flex">
  <div class="left">left</div>
  <div class="main">main</div>
  <div class="right">right</div>
</div>
<style>
.flex {
  display: flex;
}
.main {
  height: 100px;

  flex:1;
}

.left {
  width: 150px;
  height: 50px;
}
.right {
  width: 150px;
  height: 50px;
}
</style>
```

- grid

<codepen slug="YzExZVd" />

```html
<div class="section grid">
  <div class="left">left</div>
  <div class="main">main</div>
  <div class="right">right</div>
</div>
<style>
.grid {
  display: grid;
  grid-template-columns: 150px auto 150px;
}

.main {
  height: 100px;
}
.left {
  width: 150px;
  height: 50px;
}
.right {
  width: 150px;
  height: 50px;
}
</style>
```

## 多列等高布局

- padding + 负margin

<codepen slug="PoOKpOY" />

```html
<main>
  <section class="padmar green">
    <p>111</p>
  </section>
  <section class="padmar orange">
    <p>222</p>
    <p>222</p>
    <p>222</p>
  </section>
  <section class="padmar blue">
    <p>333</p>
    <p>333</p>
  </sectoin>
</main>
<style>
main {
  overflow: hidden;
}
.padmar {
  padding-bottom: 1000px;
  margin-bottom: -1000px;
}
section {
  float: left;
  width: 33.33%;
  color: #fff;
}
</style>
```

## 三行布局（头尾定高主栏自适应）

<codepen slug="YzrdJJY" />

- calc

<codepen slug="oNoeZmV" />

```html
<div class="layout">
    <header>header</header>
    <main>
        <div class="inner">main</div>
    </main>
    <footer>footer</footer>
</div>
<style>
  main{
    height: calc(100% - 100px);
    background: #87e8de;
  }
  header, footer {
    height: 50px;
    background: #bfbfbf;
  }
</style>
```

- absolute

<codepen slug="mdqMWgd" />

```html
<div class="layout">
    <header></header>
    <main>
        <div class="inner"></div>
    </main>
    <footer></footer>
</div>
<style>
.layout{
  position: relative;
}
header{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
}
footer{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
main{
  height: 100%;
  padding: 50px 0;
  box-sizing: border-box;
}
header, footer {
  height: 50px;
  background: #bfbfbf;
}
</style>
```

- flex

<codepen slug="YzExVyz" />

```html
<div class="layout">
    <header></header>
    <main>
        <div class="inner"></div>
    </main>
    <footer></footer>
</div>
<style>
.layout{
  display: flex;
  flex-direction: column;
}
main{
  flex: 1
}
header, footer {
  height: 50px;
  background: #bfbfbf;
}
</style>
```

- grid

<codepen slug="QWOMvyM" />

```html
<div class="layout">
    <header></header>
    <main>
        <div class="inner"></div>
    </main>
    <footer></footer>
</div>
<style>
.layout{
  display: grid;
  grid-template-rows: 50px 1fr 50px;
}
header, footer {
  height: 50px;
  background: #bfbfbf;
}
</style>
```

## css实现文字两端对齐

> <https://zhuanlan.zhihu.com/p/53428937>

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
