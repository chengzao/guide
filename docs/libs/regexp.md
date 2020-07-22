---
title: regexp
date: 2020-07-20
sidebar: "auto"
tags:
  - regexp
categories:
  - libs
---

## regExp

```js
let str = "abcdef1234www123com";
let nums = [...str].filter(item => !Number.isNaN(parseInt(item)));
console.log(nums.join("")); // 1234123
console.log(str.match(/\d/g).join("")); // 1234123
```

## 字面量

```js
let str = "abcdef1234www123com";
let a = "abc";
console.log(eval(`/${a}/`).test(str)); // true
```

## 对象创建表达式

```js
var str = "www.baidu.com";
var reg = new RegExp("b", "g");
console.log(reg.test(str)); // true

var str = "www.baidu.com";
var s = "b";
var reg = new RegExp(s, "g");
console.log(reg.test(str)); // true
```

- 示例

```html
<div>Lorem ipsum dolor sit amet.</div>

let con = prompt("输入内容匹配") let div = document.querySelector('div') let reg
= new RegExp(con, "g") div.innerHTML = div.innerHTML.replace(reg, search =>
`<span style="color: red">${search}</span>`)
```

## 选择符

```js
let tel = "010-1234567";
console.log(/^(010|020)\-\d{7,8}$/.test(tel));
```

## 原子表和原子组

```js
let reg = /[123456]/;
let str = "123345";
console.log(reg.test(str)); // true

let reg = /(12|34)/;
let str = "123345";
console.log(reg.test(str)); // true
```

## 转义字符

```js
let num = "123.234";
console.log(/\d+\.\d+/.test(num)); // true
```
