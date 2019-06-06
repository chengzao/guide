# Array常见算法

[[toc]]

## 快速排序

<CodeBlock>

```js
function quickSort(arr) {
        //如果数组长度<=1,则直接返回
        if (arr.length <= 1) {
            return arr;
        }
        // 中间位(基准)取长度的一半向下取整
        var pivotIndex = Math.floor(arr.length / 2);
        //把中间位从原数组切割出来, splice 会改变原数组!!!!
        var pivot = arr.splice(pivotIndex, 1)[0];

        //定义两个空数组来存放比对后的值
        var left = [];
        var right = [];

        //比基准小的放在left，比基准大的放在right
        for (var i = 0, j = arr.length; i < j; i++) {
            if (arr[i] <= pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return quickSort(left).concat([pivot], quickSort(right));
    }

    var _arr = quickSort([1, 34, 5, 6, 7, 23, 1, 33])
    console.log('_arr', _arr);
```

</CodeBlock>

## 冒泡

<CodeBlock>

```js
function bubbleSort(arr) {
    var i = arr.length - 1; //初始时,最后位置保持不变
    while (i > 0) {
        var pos = 0; //每趟开始时,无记录交换
        for (var j = 0; j < i; j++)
            console.log(arr[j],arr[j+1])
            if (arr[j] > arr[j + 1]) {
                pos = j; //记录交换的位置
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        i = pos; //为下一趟排序作准备
    }
    return arr;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort(arr));
```

</CodeBlock>

## currying

<CodeBlock>

```js
  let log = console.log.bind(console);
  function currying(fn) {
      var allArgs = [];

      return function next() {
          var args = [].slice.call(arguments);
          log(args)
          if (args.length > 0) {
              allArgs = allArgs.concat(args);
              return next;
          } else {
              return fn.apply(null, allArgs);
          }
      }
  }
  var add = currying(function () {
      var sum = 0;
      for (var i = 0; i < arguments.length; i++) {
          sum += arguments[i];
      }
      log(sum);
      return sum;
  });
  add(1,2,3)(4)()


//
Function.prototype.curry = function () {
  if (!arguments.length) return this;
  var _this = this,
      args = [].slice.call(arguments, 0);
  return function () {
      return _this.apply(this, [].concat(
          [].slice.call(args, 0), [].slice.call(arguments, 0)));
  }
}


add4 = function (x) {
  return (function (x, y) {
      return x + y
  }).curry(x)
}

// console.log(add4(2)(3))
```

</CodeBlock>

## 随机生成范围内不重复数字

<CodeBlock>

```js
// 随机生成范围内不重复数字
// aArray空数组 len数组个数  min最小值  max最大值
function randomNub(aArray, len, min, max) {
    if (len >= (max - min)) {
        console.log('超过' + min + '-' + max + '之间的个数范围' + (max - min - 1) + '个的总数');
        return;
    }
    if (aArray.length >= len) {
        aArray.sort(function(a, b) {
            return a - b
        });
        return aArray;
    }
    var nowNub = parseInt(Math.random() * (max - min - 1)) + (min + 1);
    //判断数组内是否有重复
    for (var j = 0; j < aArray.length; j++) {
        if (nowNub == aArray[j]) {
            // 再次执行函数
            randomNub(aArray, len, min, max);
            return;
        }
    }
    // 添加到数组
    aArray.push(nowNub);
    //再次执行函数
    randomNub(aArray, len, min, max);
    return aArray;
}

//定义一个空数组接收
var arr2 = [];
randomNub(arr2, 8, 1, 10);
console.log(arr2);
```

</CodeBlock>

## 查找1-9中缺少的数字

<CodeBlock>

```js
var str = '236489';
  if (str.indexOf('1') != -1) {
      fn(str);
  } else {
      fn(str);
      console.log('1');
  }

function fn(str) {
    str = str.split('').sort(function(a, b) {
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

</CodeBlock>

## 升序算法

<CodeBlock>

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

</CodeBlock>

## 降序排列

<CodeBlock>

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

</CodeBlock>

## 数组去重

- 方法1

<CodeBlock>

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
```

</CodeBlock>

- 方法2

<CodeBlock>

```js
function unique2(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var arri = arr[i];
        var isExist = false;
        for (var j = i + 1, len2 = arr.length; j < len2; j++) {
            if (arr[j] == arri) {
                isExist = true;
            }
        }
        if (!isExist) {
            result.push(arri);
        }
    }
    return result;
}
```

</CodeBlock>

- 方法3

<CodeBlock>

```js
function unique3(arr) {
    var tmp = {},
        newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!tmp[arr[i]]) {
            tmp[arr[i]] = 1;
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

console.log(unique3([55, 1, 2, 2, 33, 44, 44]))
```

</CodeBlock>

- 方法4

<CodeBlock>

```js
function unique4(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] < arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    for (i = 0; i < arr.length; i++) {
        var c = arr[i];
        for (var s = i + 1; s < arr.length; s++) {
            if (arr[s] == c) {
                //debugger;
                arr.splice(s, 1);
                s--;
            }
        }
    }
    return arr;
}
console.log(unique4([5, 2, 3, 6, 8, 6, 5, 4, 7, 1, 9]).toString());
```

</CodeBlock>

- 方法5

<CodeBlock>

```js
var array = [1, 1, '1', '1'];

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

console.log(unique(array)); // [1, "1"]
```

</CodeBlock>

## 找出字符串中重复次数最多

<CodeBlock>

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

</CodeBlock>

## 最大值 / 最小值

- 最小值

<CodeBlock>

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
Math.min.apply(Math,[32, 18, 38, 12, 43, 31, 17])
```

</CodeBlock>

- 最大值

<CodeBlock>

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

</CodeBlock>

## toRMB形式

<CodeBlock>

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

</CodeBlock>

## 字符串反转

<CodeBlock>

```js
// 字符串反转，如将 '12345678' 变成 '87654321'
// split : 将字符串分割成字符串数组,反序,在将数组转换为字符串
var str = '123456789';
str = str.split('').reverse().join('');
console.log(str);
```

</CodeBlock>
