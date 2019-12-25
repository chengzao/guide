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

## formateNumber

```js
function formatNumber (num) {
    let numStr = num + '';
    let arr = num < 0 ? numStr.slice(1).split('.') : numStr.split('.');
    let a = arr[0].split('');
    for(let i = a.length - 3; i > 0; i=i-3) {
      a.splice(i, 0, ',')
    }
    let res = arr[1] ? a.join('') + '.' + arr[1] : a.join('')
    return num < 0 ? '-' + res : res;
}
```

## 二分查找

```js
// 二分查找，前提是数组为有序数组, 返回索引值, O(㏒n)复杂度
function binarySearch(target, arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = parseInt(start + (end - start) / 2);
    if (target == arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}
let arr = [1, 4, 6, 8, 9, 21, 45, 67, 98];
console.log(binarySearch(67, arr));
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

## hexToRGB

- 16进制颜色值转RGB值

<<< @/example/docs/issue/hexToRGB.js

## toCamelCaseVar

- 转换驼峰命名

<<< @/example/docs/issue/toCamelCaseVar.js

## toChineseNum

<<< @/example/docs/issue/toChineseNum.js
