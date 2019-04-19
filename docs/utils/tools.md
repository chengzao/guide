# 常用方法

## 简易克隆对象

```js
//简易克隆对象
function extend2(tag, source) {
    for (var item in source) {
        tag[item] = source[item];
    }
    return tag;
}

JSON.parse(JSON.stringify(obj))
Object.create({},obj)
```

## 获取类名ClassName

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

// 查找所有兄弟节点
function siblings(elm) {
    var a = [];
    var p = elm.parentNode.children;
    for (var i = 0, pl = p.length; i < pl; i++) {
        if (p[i] !== elm) {
            a.push(p[i]);
        }
        return a;
    }
}

```

## 动画animate

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

- animate多属性动画

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

## getStyle

```js
// 获取计算后的样式
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]; //ie678
    } else {
        return getComputedStyle(obj, null)[attr]; //正常浏览器
    }
}
```

## `__proto__`兼容

```js
// __proto__ 兼容
function getProto(attr) {
    if (attr.__proto__) {
        return attr.__proto__;
    } else {
        return attr.constructor.prototype;
    }
}

/*example:
    function Hello(){}
    var hello = new Hello();
    getProto(hello).sayHello=function(){
      console.log('hello');
    }
    hello.sayHello();

 */
```

## 根据属性得到具体元素

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

## 对象深度克隆

```js
// 对象数组的深拷贝
var objDeepCopy = function (source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}


var objDeepCopy = function (obj) {
    if (typeof obj !== 'object') return obj;
    if (typeof window !== 'undefined' && window.JSON) { // 浏览器环境下 并支持window.JSON 则使用 JSON
        return JSON.parse(JSON.stringify(obj));
    } else {
        var newObj = obj.constructor === Array ? [] : {};
        for (var key in obj) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
        return newObj;
    }
}


const deepClone = function (target) {
  if (typeof target !== 'object') {
    throw new TypeError('arguments must be a Object!')
  }
  // 已经访问过的对象集合
  const visitedObjs = []
  // 克隆的对象集合
  const clonedObjs = []
  const clone = function (source) {
    if (visitedObjs.indexOf(source) === -1) { // 这里是判断该原对象是否被访问过
      visitedObjs.push(source) // 放入数组中
      const obj = {} // 创建一个待克隆的新对象
      // 设置原型
      const prototype = Reflect.getPrototypeOf(source)
      Reflect.setPrototypeOf(obj, prototype)
      clonedObjs.push(obj); // 将其置入克隆对象集合中
      // 设置属性
      Reflect.ownKeys(source).forEach((key) => {
        const value = source[key]
        try {
          const Constructor = Reflect.getPrototypeOf(value).constructor
          if (Constructor === Date || Constructor === RegExp) {
            obj[key] = new Constructor(value.valueOf())
          } else {
            obj[key] = clone(value) // 此处不能再递归调用 deepClone，而是要改为 clone 方法
          }
        } catch (e) {
          obj[key] = value
        }
      })
      return obj
    } else {
      // 如果该对象已经被访问过了，则直接从克隆对象中返回。返回的对象的索引是 source 在 visitedObjs 中的索引位置。
      return clonedObjs[visitedObjs.indexOf(source)]
    }
  }
  return clone(target)
}
```

## 横竖屏

```js
/**
 * 横竖屏
 * @param {Object}
 */
function changeOrientation($print) {
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    if (width < height) {
        $print.width(height);
        $print.height(width);
        $print.css('top', (height - width) / 2);
        $print.css('left', 0 - (height - width) / 2);
        $print.css('transform', 'rotate(90deg)');
        $print.css('transform-origin', '50% 50%');
    }

    var evt = "onorientationchange" in window ? "orientationchange" : "resize";

    window.addEventListener(evt, function () {

        setTimeout(function () {
            var width = document.documentElement.clientWidth;
            var height = document.documentElement.clientHeight;
            // 刷新城市的宽度
            initCityWidth();
            // 初始化每个气泡和自行车碰撞的距离
            cityCrashDistanceArr = initCityCrashDistance();

            if (width > height) {
                $print.width(width);
                $print.height(height);
                $print.css('top', 0);
                $print.css('left', 0);
                $print.css('transform', 'none');
                $print.css('transform-origin', '50% 50%');
            }
            else {
                $print.width(height);
                $print.height(width);
                $print.css('top', (height - width) / 2);
                $print.css('left', 0 - (height - width) / 2);
                $print.css('transform', 'rotate(90deg)');
                $print.css('transform-origin', '50% 50%');
            }
        }, 300);
    }, false);
}
```

## other

```js
/**
 * GetFocSel ：滑动按钮 ,input 获得 焦点;鼠标划过input全选 value 值
 * id ：盒子的id
 * 事件,盒子属性都可以更换
 */
function GetFocSel() {
    // 滑动按钮 ,input 获得 焦点
    var btn = document.getElementById("btn");
    var input1 = document.getElementById("input");
    btn.onmouseover = function () {
        input1.focus();
    }

    // 鼠标划过input全选 value 值
    var input2 = document.getElementById("input2");
    input2.onmouseover = function () {
        this.select();
    }
}

function Oninput() {
    var txt = document.getElementById("text");
    var box = document.getElementById("span");
    txt.oninput = txt.onpropertychange = function () {
        if (txt.value == "") {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    }
}


var calendarLink = {
    // 插入script标签
    createSrc: function (url) {
        var scrEle = document.createElement("script");
        scrEle.src = url;
        document.body.appendChild(scrEle);
    },
    // 插入样式表
    createStyle: function (url) {
        var scrEle = document.createElement("link");
        scrEle.rel = "stylesheet";
        scrEle.href = url;
        document.head.appendChild(scrEle);
    },
    on: function (url) {
        if (!url) {
            return false;
        }
        if (window.addEventListener)
            window.addEventListener("load", this.createSrc.bind(this, url), false);
        else if (window.attachEvent)
            window.attachEvent("onload", this.createSrc.bind(this, url));
        else window.onload = this.createSrc.bind(this, url);
    },
    removeDom: function () {
        var reSrc = document.querySelector('#appendEle');
        reSrc.parentNode.removeChild(reSrc);
    },
}


//
Function.prototype.before = function (beforefn) {
    let _self = this; // 缓存原函数的引用
    return function () { // 代理函数
        beforefn.apply(this, arguments); // 执行前置函数
        return _self.apply(this, arguments); // 执行原函数
    }
}

Function.prototype.after = function (afterfn) {
    let _self = this;
    return function () {
        let set = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return set;
    }
}

let func = () => console.log('func');
func = func.before(() => {
    console.log('===before===');
}).after(() => {
    console.log('===after===');
});

func();
// ===before===
// func
// ===after===
```

## log

- log `const log = (type) => console.log.bind(console, type);`

## cached

```js
function cached(fn){
  const cache = Object.create(null)
  return function cachedFn (str) {
    if ( !cache[str] ) {
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

## UrlToObject

```js
  serilizeUrl(url) {
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
  },
```
