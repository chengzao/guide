# 常用方法

[[toc]]

## 简易克隆对象

<CodeBlock>

<<< @/example/docs/object/cloneObject.js

</CodeBlock>

## formatNumber

```js
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
```

## formateMoney

```js
const formatMoney = function (num) {
  if (num == '0') {
    return "0.00";
  }
  if (num == undefined || num == '' || num == null) {
    return '-';
  }
  return parseFloat(num).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}
```

## 获取类名ClassName

<CodeBlock>

<<< @/example/docs/dom/getClassName.js

</CodeBlock>

## 动画animate

- 简易版

<CodeBlock>

<<< @/example/docs/animate/animate01.js

</CodeBlock>

- animate

<CodeBlock>

<<< @/example/docs/animate/animate02.js

</CodeBlock>

- animate多属性动画

<CodeBlock>

<<< @/example/docs/animate/animate03.js

</CodeBlock>

## 根据属性得到具体元素

<CodeBlock>

<<< @/example/docs/dom/atrGetEle.js

</CodeBlock>

## 对象深度克隆

<CodeBlock>

<<< @/example/docs/object/cloneDeep.js

</CodeBlock>

## 横竖屏

<CodeBlock>

<<< @/example/docs/client/changeOrientation.js

</CodeBlock>

## other

<CodeBlock>

<<< @/example/docs/js/createScript.js

</CodeBlock>

## log

<<< @/example/docs/js/log.js

## cached

<CodeBlock>

<<< @/example/docs/js/cached.js

</CodeBlock>

## UrlToObject

<CodeBlock>

<<< @/example/docs/js/urlToObject.js

</CodeBlock>
