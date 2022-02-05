---
title: 20210722代码片段
date: 2021-07-22
sidebar: "auto"
tags:
  - array
categories:
  - frontend
---

## 升序算法

```js
function AscOrder(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var c = arr[j]; //交换两个变量的位置
        arr[j] = arr[j + 1];
        arr[j + 1] = c;
      }
    };
  };
  return arr.toString();
}
console.log(AscOrder([23, 45, 18, 37, 92, 13, 24]));
```

## 降序排列

```js
function DesOrder(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i; j++) {
      if (arr[j] < arr[j + 1]) {
        var c = arr[j]; //交换两个变量的位置
        arr[j] = arr[j + 1];
        arr[j + 1] = c;
      }
    };
  };
  return arr.toString();
}
console.log(DesOrder([13, 45, 18, 37, 9, 13, 24]));
```

## 数组去重

```js
function unique(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var arri = arr[i];
    if (result.indexOf(arri) < 0) {
      result.push(arri);
    }

  }
  return result;
}

function unique(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1)
        len--;
        j--
      }
    }
  }
  return arr
}

function unique(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

function unique(arr) {
  return [...new Set(arr)]
}

function unique(arr) {
  var obj = []
  return arr.filter(item => {
    console.log(obj);
    return obj.hasOwnProperty(typeof item + item) ?
      false : (obj[typeof item + item] = true)
  })
}

function unique(array) {
  // res用来存储结果
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break;
      }
    }
    // 如果array[i]是唯一的，那么执行完循环，j等于resLen
    if (j === resLen) {
      res.push(array[i])
    }
  }
  return res;
}
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

## 找出字符串中重复次数最多

```js
function deduplication(str) {

  var json = {};
  //将存在字符的加入到json中；
  for (var i = 0; i < str.length; i++) {
    if (!json[str.charAt(i)]) {
      json[str.charAt(i)] = 1;
    } else {
      json[str.charAt(i)]++;
    }
  }

  //遍历json对象。比较json[key]的value值大小
  var iMax = 0;
  var iIndex = "";
  var str = '';
  for (var j in json) {
    str += j
    if (json[j] > iMax) {
      iMax = json[j];
      iIndex = j;
    }
  }
  console.log('去重后的为: ' + str);
  console.log('出现次数最多的是: ' + iIndex + " 出现了: " + iMax);
}
var str = 'asdfssmmmaaasasasasaa';
deduplication(str);
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

## 查找 1-9 中缺少的数字

```js
var str = '236489';
if (str.indexOf('1') != -1) {
  findOneOfNumber(str);
} else {
  findOneOfNumber(str);
  console.log('1');
}

function findOneOfNumber(str) {
  str = str.split('').sort(function (a, b) {
    return a - b;
  }).reverse();
  console.log(str);
  for (var i = 0; i < (str.length - 1); i++) {
    var s = str[i] - str[i + 1];
    //console.log(s)
    if (s == 1) {

    } else {
      console.log(str[i] + "***" + str[i + 1]);
    }
  }
}
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

## array2Tree

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

- 其他

```js
function array2tree({ key, pKey, data }) {
  let obj = {};
  let result = [];
  // 生成map
  obj = data.reduce((acc, current) => {
    acc[current[key]] = current;
    return acc;
  }, {});
  data.forEach((item) => {
    // 获取父节点
    let pNode = obj[item[pKey]];
    if (pNode) {
      if (pNode.children) {
        pNode.children.push(item);
      } else {
        pNode.children = [item];
      }
    } else {
      result.push(item);
    }
  });
  return result;
}
//
let arr = [{ id: 1 },{ id: 2, pId: 1 },{ id: 3, pId: 2 },{ id: 4 },{ id: 5, pId: 2 },{ id: 6, pId: 4 }];
let rs = array2tree({ key: "id", pKey: "pId", data: arr });
console.log(rs);
```

## tree2Array

```js
function tree2array(arr) {
  let result = [];
  let next = function (list) {
    list.forEach((item) => {
      if (item.children) {
        next(item.children);
      }
      delete item.children;
      result.push(item);
    });
  };
  next(arr);
  return result;
}
//
let rs2 = tree2array(rs);
console.log(rs2);
```

- 其他

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

## 有序数组合并为一个数组

```js
function mergeArray (left, right) {
  let result = [],
       il = 0,
       ir = 0;
  while(il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++]);
    } else {
      result.push(right[ir++]);
    }
  }
  return result.concat(left[il] ? left.slice(il) : right.slice(ir));
}

mergeArray([2,4,5], [1,3,6])
```
