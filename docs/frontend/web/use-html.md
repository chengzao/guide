---
title: html常见布局
date: 2020-07-20
sidebar: "auto"
tags:
  - layout
---

## 布局

### Flex 布局

```html
<style>
  .container {
    display: flex;
    justify-content: center;
    height: 200px;
    background: #eee;
  }
  .left {
    width: 200px;
    background-color: red;
    height: 100%;
  }
  .main {
    background-color: yellow;
    flex: 1;
  }
  .right {
    width: 200px;
    background-color: green;
  }
</style>

<div class="container">
  <div class="left">1</div>
  <div class="main">2</div>
  <div class="right">3</div>
</div>
```

### 绝对定位布局

```html
<style>
  .container {
    position: relative;
    background: #eee;
    height: 200px;
  }
  .main {
    height: 200px;
    margin: 0 120px;
    background-color: yellow;
  }
  .left {
    position: absolute;
    width: 100px;
    height: 200px;
    left: 0;
    top: 0;
    background-color: red;
  }
  .right {
    position: absolute;
    width: 100px;
    height: 200px;
    background-color: green;
    right: 0;
    top: 0;
  }
</style>
<div class="container">
  <div class="left">1</div>
  <div class="main">2</div>
  <div class="right">3</div>
</div>
```

### 圣杯布局

```html
<style>
  .container {
    margin-left: 120px;
    margin-right: 220px;
  }
  .main {
    float: left;
    width: 100%;
    height: 300px;
    background-color: yellow;
  }
  .left {
    float: left;
    width: 100px;
    height: 300px;
    margin-left: -100%;
    position: relative;
    left: -120px;
    background-color: blue;
  }
  .right {
    float: left;
    width: 200px;
    height: 300px;
    margin-left: -200px;
    position: relative;
    right: -220px;
    background-color: green;
  }
</style>
<div class="container">
  <div class="main"></div>
  <div class="left"></div>
  <div class="right"></div>
</div>
```

### 双飞翼布局

```html
<style>
  .content {
    float: left;
    width: 100%;
  }
  .main {
    height: 200px;
    margin-left: 110px;
    margin-right: 220px;
    background-color: yellow;
  }
  .left {
    float: left;
    height: 200px;
    width: 100px;
    margin-left: -100%;
    background-color: red;
  }
  .right {
    width: 200px;
    height: 200px;
    float: right;
    margin-left: -200px;
    background-color: green;
  }
</style>
<div class="content">
  <div class="main"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```
