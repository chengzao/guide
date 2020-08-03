---
title: 数据类型判断
date: 2020-07-20
sidebar: "auto"
tags:
  - typeOf
  - instanceof
  - hasOwnProperty
  - 工具函数
categories:
  - libs
---

## typeOf 类型判断

<<< @/utils/libs/type/typeOf.js

## eqeqeq

<<< @/utils/libs/type/eqeqeq.js

## 判断类型

- `typeof` 判断类型
- `Object.prototype.toString.call(obj).slice(8,-1);` 判断类型
- `(obj).constructor.name.toString().toLowerCase()` `obj != null || obj != undefined`除外
- `Array.isArray()` 确定传递的值是否是一个 `Array`
- `isNaN(testValue)` 用来确定一个值是否为`NaN`
- `Object.is(value1, value2);` 判断两个值是否是相同的值
- `object instanceof constructor` 检测 `constructor.prototype` 是否存在于参数 `object` 的原型链

<CodeBlock>

## instanceof

<<< @/utils/libs/type/instanceof.js

</CodeBlock>

## hasOwnProperty

- `obj.hasOwnProperty(prop)` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性

<CodeBlock>

<<< @/utils/libs/type/hasOwnProperty.js

</CodeBlock>

<CodeBlock title="Object.prototype.toString.call >>">

<<< @/utils/libs/type/Object.prototype.toString.call.js

</CodeBlock>

## toRawType

- Object.prototype.toString.call(arg) 和 String(arg) 的区别？

<CodeBlock>

<<< @/utils/libs/type/toString.js

</CodeBlock>

- toRawType

<CodeBlock>

<<< @/utils/libs/type/toRawType.js

</CodeBlock>

## 浏览器标识

<CodeBlock>

<<< @/utils/libs/type/getMobileDevice.js

</CodeBlock>

## 判断浏览器平台

<CodeBlock>

<<< @/utils/libs/type/checkPlatform.js

</CodeBlock>

## BrowserInfo

<CodeBlock>

<<< @/utils/libs/type/browserInfo.js

</CodeBlock>
