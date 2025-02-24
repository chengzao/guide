---
title: 常见问题整理（二）
date: 2022-02-12
sidebar: "auto"
tags:
  - array2tree
  - tree2array
categories:
  - frontend
---

## array2tree

- 递归

```js
let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]

function array2tree(array, pid){
  return array.reduce((pre, cur) =>{
    if(cur.pid == pid){
      pre.push(cur);
      const children = array2tree(array, cur.id)
      if(children.length){
        cur.children = children;
      }
    }
    return pre;
  }, [])
}
```

- 使用object

```js
function array2tree(items, rootId) {
    const result = [];   // 存放结果集
    const map = {};  //

    // map存储
    for (const item of items) {
        map[item.id] = { ...item }
    }

    for (const item of items) {
        const id = item.id; // 当前节点id
        const pid = item.pid; // 当前节点的父节点id
        const treeItem = map[id]; // 当前节点对应的树对象
        if (pid === rootId) {  // 找到根节点
            result.push(treeItem);
        } else {
            // 找到当前节点的父级
            if (map[pid] && !map[pid].children) {
                map[pid].children = []
            }
            // 添加到父级
            map[pid].children.push(treeItem)
        }
    }
    return result;
}

let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]
let rs = array2tree(arr, 0);
console.log(rs);
```

## tree2array

```js
function tree2array(tree){
  return tree.reduce((acc, cur) => {
    if(cur.children){
      const sub = tree2array(cur.children);
      delete cur.children;
      acc.push(cur, ...sub);
    }else{
      acc.push(cur);
    }
    return acc;
  }, [])
}

let rs2 = tree2array(rs);
console.log(rs2)
```

## js使用filter递归过滤树形结构数组

> Fork from : https://www.jianshu.com/p/5b816c76298f

```js
// 菜单列表
const menuList = [{
    name: '系统管理',
    code: 'system_manage',
    children: [{
        name: '用户管理',
        code: 'user_manage',
        children: [{
            name: '添加用户',
            code: 'add_user'
        }, {
            name: '编辑用户',
            code: 'edit_user'
        }, {
            name: '删除用户',
            code: 'del_user'
        }]
    }, {
        name: '角色管理',
        code: 'role_manage',
        children: [{
            name: '添加角色',
            code: 'add_role'
        }]
    }]
}, {
    name: '业务管理',
    code: 'bus_manage',
    children: [{
        name: '流程管理',
        code: 'process_manage'
    }]
}, {
    name: '订单管理',
    code: 'order_manage'
}]

// 权限列表
const myMenuCode = ['system_manage', 'user_manage', 'add_user', 'order_manage']

const filterMenu = (menuList, menuCode) => {
    return menuList.filter(item => {
        return menuCode.indexOf(item.code) > -1
    }).map(item => {
        item = Object.assign({}, item)
        if (item.children) {
            item.children = filterMenu(item.children, menuCode)
        }
        return item
    })
}

// 过滤后的菜单
const myMenu = filterMenu(menuList, myMenuCode)

console.log(myMenu)
```

## cached

```js
function cached(fn) {
  const cache = Object.create(null)
  return function cachedFn(str) {
    if (!cache[str]) {
      cache[str] = fn(str)
    }
    return cache[str]
  }
}
// test
var cachedComputed = cached(computed)
cachedComputed('ss')
// 打印2000s have passed
cachedComputed('ss')
// 不再打印
```

## Url2Object

```js
function serilizeUrl(url) {
  var urlObject = {}
  if (/\?/.test(url)) {
    var urlString = url.substring(url.indexOf('?') + 1)
    console.log(urlString)
    var urlArray = urlString.split('&')
    for (var i = 0, len = urlArray.length; i < len; i++) {
      var urlItem = urlArray[i]
      console.log(urlItem)
      var item = urlItem.split('=')
      if (
        item.length == 2 &&
        item[0] != '' &&
        item[0] != '""' &&
        item[0] != '"'
      ) {
        urlObject[item[0]] = encodeURIComponent(item[1])
      }
    }
    return urlObject
  }
  return {}
}
```

## formateMoney

```js
const formatMoney = function(num) {
  if (num == "0") {
    return "0.00";
  }
  if (num == undefined || num == "" || num == null) {
    return "-";
  }
  return parseFloat(num)
    .toFixed(2)
    .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
};

```

## formateNumber

```js
function formatNumber(num) {
  let numStr = num + "";
  let arr = num < 0 ? numStr.slice(1).split(".") : numStr.split(".");
  let a = arr[0].split("");
  for (let i = a.length - 3; i > 0; i = i - 3) {
    a.splice(i, 0, ",");
  }
  let res = arr[1] ? a.join("") + "." + arr[1] : a.join("");
  return num < 0 ? "-" + res : res;
}
```

## 获取标签的ClassName

```js
//获取类名ClassName
function getClassName(str) {
  //为了火狐和谷歌及IE9-11
  if (document.getElementsByClassName) {
    return document.getElementsByClassName(str);
  }
  //获取所有标签节点(数组)
  var allNodes = document.getElementsByTagName("*");
  //定义数组(哪个标签满足我的需求，就把他push到arr中，最后返回)
  var arr = [];
  //遍历数组（所有标签的数组）
  for (var i = 0; i < allNodes.length; i++) {
    //把类名变成数组
    var arrClassName = allNodes[i].className.split(" ");
    //遍历数组中所有的元素（遍历数组中所有的元素用的）
    for (var j = 0; j < arrClassName.length; j++) {
      //在判断，如果Class属性值是传过来的值。放进数组。
      if (arrClassName[j] == str) {
        arr.push(aarrClassName[j]);
      }
    }
  }
  return arr;
}
```

## js动画animate

- 简易版

```js
//动画animate
function animateOne(ele, target) {
  //清理定时器
  clearInterval(ele.timer);
  ele.timer = setInterval(function () {
    var step = 9;
    //如果对象的位置在目标的左边 往右走 step是正数
    //如果对象的位置在目标的右边 往左走 step是负数
    //对象的位置在目标的左边 ele.offsetLeft<target
    step = ele.offsetLeft < target ? step : -step;
    //终点检测 对象到目标的距离 > step的距离 就要继续走
    if (Math.abs(ele.offsetLeft - target) > Math.abs(step)) {
      ele.style.left = ele.offsetLeft + step + "px";
    } else {
      //距有可能 离终点还有一点点距离 我们手动把他放置到终点位置
      ele.style.left = target + "px";
      clearInterval(ele.timer);
    }
  }, 30)
}

// animate 缓动动画
function animate(obj, target) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var leader = obj.offsetLeft;
    var step = (target - leader) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    obj.style.left = obj.offsetLeft + step + "px";
    if (leader == target) {
      clearInterval(obj.timer);
    }
  }, 25)
}
```

- animate

```js
//animate fn回调
function animateTwo(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var flag = true;
    for (var k in json) {
      var target = json[k];
      var leader = parseInt(getStyle(obj, k));
      var step = (target - leader) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      leader = leader + step;
      obj.style[k] = leader + "px";
      if (leader != target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        //alert(fn);
        fn();
      }
    }
  }, 30)
}
```

- animate 多属性动画

```js
//fn为回调函数
//{attr:target,attr:target}
function animate(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var flag = true;
    for (var attr in json) {
      //step = (target-leader)/10
      //leader = leader + step
      if (attr == "opacity") {
        var target = json[attr] * 100;
        var leader = Math.round(parseInt(getStyle(obj, attr || "filter") * 100)) || 100;
      } else {
        var target = json[attr];
        var leader = parseInt(getStyle(obj, attr));
      }
      var step = (target - leader) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      leader = leader + step;
      //obj.style.left = leader + "px";
      //obj.style["left"] = leader + "px";
      if (attr == "opacity") {
        obj.style.opacity = leader / 100;
        obj.style.filter = "alpha(opacity=" + leader + ")";
        //filter:alpha(opacity=x);
      } else if (attr == "zIndex") {
        obj.style.zIndex = attr;
      } else {
        obj.style[attr] = leader + "px";
      }
      /*if (leader == target) {
       clearInterval(obj.timer);
       }*/
      if (leader != target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      //alert(fn);
      if (fn) {
        fn();
      }
    }
  }, 30)
}
```

## getEleArributeValue

```js
// 根据属性得到具体元素
function atrGetEle(ele, attr, value) {
  var aElements = document.getElementsByTagName(ele);
  var aEle = [];
  for (var i = 0; i < aElements.length; i++) {
    if (aElements[i].getAttribute(attr) == value)
      aEle.push(aElements[i]);
  }
  return aEle;
}
```

## console

```js
const log = (type) => console.log.bind(console, type);
```

## hexToRGB

- 16 进制颜色值转 RGB 值

```js
const hexToRGB = (hex) => {
  if (!/(^\#([a-fA-F0-9]{3})$)|(^\#([a-fA-F0-9]{6})$)/g.test(hex)) return null
  let allNumberStr = '0123456789abcdef' // 十六进制的所有数字
  let len = hex.slice(1).length;
  let str = len === 6 ? hex.slice(1) : hex.slice(1)[0].repeat(2) + hex.slice(1)[1].repeat(2) + hex.slice(1)[2].repeat(2);
  let arrStr = str.split('');
  let newArrStr = arrStr.map((item, index) => {
    return allNumberStr.indexOf((item + '').toLowerCase())
  })
  let num1 = newArrStr[0] * 16 + newArrStr[1];
  let num2 = newArrStr[2] * 16 + newArrStr[3];
  let num3 = newArrStr[4] * 16 + newArrStr[5];
  return `rgb(${num1}, ${num2}, ${num3})`
}
// console.log(hexToRGB('#fffaaa'))
```

## toCamelCaseVar

- 转换驼峰命名

```js
const toCamelCaseVar = (variable) => {
  variable = variable.replace(/[\_|-](\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
  return variable.slice(0, 1).toLowerCase() + variable.slice(1)
}

// console.log(toCamelCaseVar('Foo_style_css')) // fooStyleCss
```

## numToChinese

> 将数字1234转换为'一千二百三十四' (10000以内)

```js
function numToChinese(num) {
  num += ''
  let numLength = num.length
  let numStr = '零一二三四五六七八九十'
  let unitArr = ['', '十', '百', '千', '万']
  function helper(str) {
    let res = '';
    if (str.length > 5) {
      let first = str.slice(-5);
      let second = str.slice(0, str.length - 5);
      for (let i in second) {
        res = res + numStr[second[i]] + unitArr[second.length - i];
      }
      for (let i in first) {
        res = res + numStr[first[i]] + unitArr[first.length - i - 1];
      }
    } else {
      let first = str.slice(-5);
      for (let i in first) {
        res = res + numStr[first[i]] + unitArr[first.length - i - 1];
      }
    }
    res = res.replace(/零[零十百千]+/g, '零').replace(/零+$/g, '').replace(/零万/g, '万')
    return res;
  }

  if (numLength > 8) {
    return helper(num.slice(0, numLength - 8)) + '亿' + helper(num.slice(-8))
  }
  return helper(num)
}
```

- 一亿以内

```js

/**
 * 将数字转换为中文大写
 * @param {number} num 要转换的数字
 * @returns {string} 转换后的中文大写
 */
export function digitToChinese(num) {
  // 基本数字到中文的映射
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

  // 如果是0，直接返回零
  if (num === 0) return '零';

  // 将数字转为字符串
  const numStr = num.toString();

  // 处理亿级别
  if (num >= 100000000) {
    const yi = Math.floor(num / 100000000);
    const rest = num % 100000000;
    let result = digitToChinese(yi) + '亿';
    if (rest > 0) {
      // 如果余数小于一万，需要加"零"
      if (rest < 10000) {
        result += '零' + digitToChinese(rest);
      } else {
        // 如果余数大于一万但小于十万，需要加"零"
        if (rest < 100000) {
          result += '零' + digitToChinese(rest);
        } else {
          result += digitToChinese(rest);
        }
      }
    }
    return result;
  }

  // 处理万级别
  if (num >= 10000) {
    const wan = Math.floor(num / 10000);
    const rest = num % 10000;
    let result = digitToChinese(wan) + '万';
    if (rest > 0) {
      // 如果余数小于一千，需要加"零"
      if (rest < 1000) {
        result += '零' + digitToChinese(rest);
      } else {
        result += digitToChinese(rest);
      }
    }
    return result;
  }

  // 处理千级别及以下
  let result = '';
  const units = ['', '十', '百', '千'];
  for (let i = 0; i < numStr.length; i++) {
    const digit = parseInt(numStr[i]);
    if (digit === 0) {
      // 当数字是0时
      if (i < numStr.length - 1 && parseInt(numStr[i + 1]) !== 0) {
        result += '零';
      }
    } else {
      // 处理一十的特殊情况
      if (digit === 1 && i === 0 && numStr.length === 2) {
        result += '十';
      } else {
        result += digits[digit] + units[numStr.length - 1 - i];
      }
    }
  }

  // 处理末尾的零
  result = result.replace(/零+$/, '');

  // 处理连续的零
  result = result.replace(/零+/g, '零');

  return result;
}

// 测试用例
console.log(digitToChinese(1234)); // 一千二百三十四
console.log(digitToChinese(1001)); // 一千零一
console.log(digitToChinese(1010)); // 一千零一十
console.log(digitToChinese(10000)); // 一万
console.log(digitToChinese(123456789)); // 一亿二千三百四十五万六千七百八十九
console.log(digitToChinese(100000000)); // 一亿
console.log(digitToChinese(100000001)); // 一亿零一
console.log(digitToChinese(100010001)); // 一亿零一万零一
```

## randomString

```js
const randomString = function(boolean, min, max=0) {
  var str = "",
    range = min,
    arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  // 随机产生
  if (boolean) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};
// demo
console.log(randomString(true, 1, 4));
```

## 如何避开 JavaScript 浮点数计算精度问题

- 如`0.1+0.2!==0.3`
- 简单的进制转换：`5..toString(2) //0101`
- 解决相关此问题的类库：[bignumber.js](https://github.com/MikeMcl/bignumber.js)
- 简单解决方案：将小数转成整数来运算，之后再转回小数

```js
'use strict'

var accAdd = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var dec1, dec2, times;
  try { dec1 = countDecimals(num1) + 1; } catch (e) { dec1 = 0; }
  try { dec2 = countDecimals(num2) + 1; } catch (e) { dec2 = 0; }
  times = Math.pow(10, Math.max(dec1, dec2));
  // var result = (num1 * times + num2 * times) / times;
  var result = (accMul(num1, times) + accMul(num2, times)) / times;
  return getCorrectResult("add", num1, num2, result);
  // return result;
};

var accSub = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var dec1, dec2, times;
  try { dec1 = countDecimals(num1) + 1; } catch (e) { dec1 = 0; }
  try { dec2 = countDecimals(num2) + 1; } catch (e) { dec2 = 0; }
  times = Math.pow(10, Math.max(dec1, dec2));
  // var result = Number(((num1 * times - num2 * times) / times);
  var result = Number((accMul(num1, times) - accMul(num2, times)) / times);
  return getCorrectResult("sub", num1, num2, result);
  // return result;
};

var accDiv = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var t1 = 0, t2 = 0, dec1, dec2;
  try { t1 = countDecimals(num1); } catch (e) { }
  try { t2 = countDecimals(num2); } catch (e) { }
  dec1 = convertToInt(num1);
  dec2 = convertToInt(num2);
  var result = accMul((dec1 / dec2), Math.pow(10, t2 - t1));
  return getCorrectResult("div", num1, num2, result);
  // return result;
};

var accMul = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var times = 0, s1 = num1.toString(), s2 = num2.toString();
  try { times += countDecimals(s1); } catch (e) { }
  try { times += countDecimals(s2); } catch (e) { }
  var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
  return getCorrectResult("mul", num1, num2, result);
  // return result;
};

var countDecimals = function (num) {
  var len = 0;
  try {
    num = Number(num);
    var str = num.toString().toUpperCase();
    if (str.split('E').length === 2) { // scientific notation
      var isDecimal = false;
      if (str.split('.').length === 2) {
        str = str.split('.')[1];
        if (parseInt(str.split('E')[0]) !== 0) {
          isDecimal = true;
        }
      }
      let x = str.split('E');
      if (isDecimal) {
        len = x[0].length;
      }
      len -= parseInt(x[1]);
    } else if (str.split('.').length === 2) { // decimal
      if (parseInt(str.split('.')[1]) !== 0) {
        len = str.split('.')[1].length;
      }
    }
  } catch (e) {
    throw e;
  } finally {
    if (isNaN(len) || len < 0) {
      len = 0;
    }
    return len;
  }
};

var convertToInt = function (num) {
  num = Number(num);
  var newNum = num;
  var times = countDecimals(num);
  var temp_num = num.toString().toUpperCase();
  if (temp_num.split('E').length === 2) {
    newNum = Math.round(num * Math.pow(10, times));
  } else {
    newNum = Number(temp_num.replace(".", ""));
  }
  return newNum;
};

var getCorrectResult = function (type, num1, num2, result) {
  var temp_result = 0;
  switch (type) {
    case "add":
      temp_result = num1 + num2;
      break;
    case "sub":
      temp_result = num1 - num2;
      break;
    case "div":
      temp_result = num1 / num2;
      break;
    case "mul":
      temp_result = num1 * num2;
      break;
  }
  if (Math.abs(result - temp_result) > 1) {
    return temp_result;
  }
  return result;
};
// 用法
// 加法： accAdd(0.1, 0.2)  // 得到结果：0.3
// 减法： accSub(1, 0.9)    // 得到结果：0.1
// 除法： accDiv(2.2, 100)  // 得到结果：0.022
// 乘法： accMul(7, 0.8)    // 得到结果：5.6

// 工具函数
countDecimals() //方法：计算小数位的长度

convertToInt() //方法：将小数转成整数

getCorrectResult() //方法：确认我们的计算结果无误，以防万一
```

## 监听数组变化

```js
function ObservableArray() {
  return new Proxy([], {
    get(target, propKey) {
      const matArr = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
      matArr.indexOf(propKey) > -1 && console.log(propKey);
      return target[propKey]
    }
  })
}
const arr = new ObservableArray()

arr.push('Good')
arr.unshift('Good2')
console.log(arr)
```

## FIFO

- 一种缓存算法，设置缓存上限，当达到了缓存上限的时候，按照先进先出的策略进行淘汰，再增加进新的 k-v

```js
class FIFOCache {
  constructor(limit) {
    this.limit = limit || 10;
    this.map = {};
    this.keys = [];
  }
  set(key, value) {
    let map = this.map;
    let keys = this.keys;
    if (!Object.prototype.hasOwnProperty.call(map, key)) {
      if (keys.length === this.limit) {
        delete map[keys.shift()]; //先进先出，删除队列第一个元素
      }
      keys.push(key);
    }
    map[key] = value; //无论存在与否都对map中的key赋值
  }
  get(key) {
    return this.map[key];
  }
}

let fifo = new FIFOCache(10);

for (let i = 0; i < 10; i++) {
  fifo.set(`name-${i}`, i);
}
fifo.set("name-10", 10);
console.log(fifo);
```

## 字符串正则去重

```js
var str = "adaaasfjjjbkk";

var res = str.replace(/(.).*(\1)/g, function($1, $2, $3) {
  $1 = $2 + $1.substring(1).replace(new RegExp($2, "g"), "");
  return $1;
});
```

## 使用 toString(16)取随机字符串

```js
Math.random()
  .toString(16)
  .substring(2, 15);
```

## 伪数组（类数组）转数组

```js
Array.prototype.slice.call(arguments);
Array.prototype.concat.apply([], arguments);
Array.from(arguments)
```

## 最大值 / 最小值

- 最小值

```js
function MinNum(arr) {
  var min = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i]
    }
  }
  return min;
}
console.log(MinNum([2, 3, -44, 555, 222]))

// 最小值
Math.min.apply(Math, [32, 18, 38, 12, 43, 31, 17])
```

- 最大值

```js
function MaxNum(arr) {
  var max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }
  return max;
}

console.log(MaxNum([2, 3, 3, 42, 1123]))

var a = [1, 2, 3, [5, 6],
  [1, 4, 8]
];
var ta = a.join(",").split(","); //转化为一维数组
console.log(Math.max.apply(null, ta)); //最大值
console.log(Math.min.apply(null, ta)); //最小值
```

## 随机生成范围内不重复数字

```js
// 随机生成范围内不重复数字
// aArray空数组 len数组个数  min最小值  max最大值
function randomNumber(aArray, len, min, max) {
  if (len >= (max - min)) {
    console.log('超过' + min + '-' + max + '之间的个数范围' + (max - min - 1) + '个的总数');
    return;
  }
  if (aArray.length >= len) {
    aArray.sort(function (a, b) {
      return a - b
    });
    return aArray;
  }
  var nowNub = parseInt(Math.random() * (max - min - 1)) + (min + 1);
  //判断数组内是否有重复
  for (var j = 0; j < aArray.length; j++) {
    if (nowNub == aArray[j]) {
      // 再次执行函数
      randomNumber(aArray, len, min, max);
      return;
    }
  }
  // 添加到数组
  aArray.push(nowNub);
  //再次执行函数
  randomNumber(aArray, len, min, max);
  return aArray;
}

//定义一个空数组接收
var arr2 = [];
randomNumber(arr2, 8, 1, 10);
console.log(arr2);
```

## toRMB 形式

```js
// 将数字12345678转化成 RMB形式
function re(str) {
  str += '';
  return str.split("").reverse().join("");
}

function toRMB(num) {
  var tmp = '';
  for (var i = 1; i <= re(num).length; i++) {
    tmp += re(num)[i - 1];
    // console.log(tmp)
    if (i % 3 == 0 && i != re(num).length) {
      tmp += ',';
    }
  }
  return re(tmp);
}

var num1 = 12345789;
console.log(toRMB(num1));
```

## 字符串反转

```js
// 字符串反转，如将 '12345678' 变成 '87654321'
// split : 将字符串分割成字符串数组,反序,在将数组转换为字符串
var str = '123456789';
str = str.split('').reverse().join('');
console.log(str);
```

## 最大公约数与最小公倍数

- 最大公约数: 能同时被两数整除的最大数字

```js
function maxDivisor(num1, num2) {
  let max = num1 > num2 ? num1 : num2,
    min = num1 > num2 ? num2 : num1;
  for (var i = min; i >= 1; i--) {
    if (max % i == 0 && min % i == 0) {
      return i;
    }
  }
}

console.log(maxDivisor(60, 30)); // 30
```

- 最小公倍数: 能同时整除两数的最小数字

```js
function minDivisor(num1, num2) {
  let max = num1 > num2 ? num1 : num2,
    min = num1 > num2 ? num2 : num1,
    result = 0;
  // 这个循环，当两数同为质数时，终止的最大条件值为 i = min
  for (var i = 1; i <= min; i++) {
    result = i * max;
    if (result % max == 0 && result % min == 0) {
      return result;
    }
  }
}
console.log(minDivisor(6, 8)); // 24
```

## 验证是否为回文

```js
// 数组方法生成倒装的新字符串与原字符串对比
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  return (
    Array.from(str)
      .reverse()
      .join('') === str
  );
}

// 倒序循环生成新字符串与原字符串对比
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  var newStr = '';
  for (var i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return str1 === str;
}

// 以中间点为基点，从头至中与从尾至中逐一字符串进行对比，若有一个不同，则 return false
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
```

## 判断一个数是否为质数

```js
function isPrime(num) {
  if (num === 1) {
    return "1 不是质数，请输入大于1的数字";
  } else if (num <= 3) {
    return num > 1;
  } else {
    let sq = Math.sqrt(num);
    for (let i = 2; i <= sq; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
}
```
