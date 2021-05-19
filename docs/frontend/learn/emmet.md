---
title: emmet的简写示例
date: 2020-07-22
sidebar: "auto"
tags:
  - emmet
categories:
  - frontend
---

- `div.box.box1`

```html
<div class="box box1"></div>
```

- `div#box.box1+p.div`

```html
<div id="box" class="box1"></div>
<p class="div"></p>
```

- `div#box.box1>p.div`

```html
<div id="box" class="box1">
  <p class="div"></p>
</div>
```

- `cc:ie6`

```html
<!--[if lte IE 6]

<![endif]-->
```

- `ul>li.abc$*3`

```html
<ul>
  <li class="abc1"></li>
  <li class="abc2"></li>
  <li class="abc3"></li>
</ul>
```

- `ul>li>a{item}*5`

```html
<ul>
  <li>
    <a href="">item</a>
    <a href="">item</a>
    <a href="">item</a>
    <a href="">item</a>
    <a href="">item</a>
  </li>
</ul>
```

- `ul>li>a{$\*1 item}*5`

```html
<ul>
  <li>
    <a href="">1*1 item</a>
    <a href="">2*1 item</a>
    <a href="">3*1 item</a>
    <a href="">4*1 item</a>
    <a href="">5*1 item</a>
  </li>
</ul>
```

- `lorem` 生成随机字符

```html
<!-- lorem5 生成5个字符串 -->
Lorem ipsum dolor sit amet.
```
