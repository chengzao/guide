# 窗口的兼容写法

## 窗口大小的兼容写法

```js

// 网页元素左上角的视口横坐标
Element.getBoundingClientRect().left
//Element.offsetLeft

// 网页元素左上角的视口纵坐标
Element.getBoundingClientRect().top
//Element.offsetTop

// 网页元素左上角的网页横坐标
Element.getBoundingClientRect().left + document.documentElement.scrollLeft
//Element.offsetLeft + document.documentElement.scrollLeft

// 网页元素左上角的网页纵坐标
Element.getBoundingClientRect().top + document.documentElement.scrollTop
//Element.offsetTop + document.documentElement.scrollTop


// 视口高度
window.innerHeight // 包括滚动条
document.documentElement.clientHeight // 不包括滚动条

// 视口宽度
window.innerWidth // 包括滚动条
document.documentElement.clientWidth // 不包括滚动条

window.outerHeight
window.outerWidth
```

## client兼容写法

```js
// client 兼容写法
function client() {
    if (window.innerWidth != null) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else if (document.compatMode == "CSS1Compat") { //document.compatMode用来判断当前浏览器采用的渲染方式
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    } else {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
}
```

## pageX和pageY兼容

```js
var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;

var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
```

## scrollTop兼容

```js
//页面滚动座标onscroll
//scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
function scroll() {
    if (window.pageYOffset != null) {
        //正常浏览器
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else if (document.compatMode == "CSS1Compat") {
        //有DTD的网页
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    } else {
        //没有DTD的
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        }
    }
}
```

## scrollHeight兼容

```js
// 网页内容实际宽高（包括工具栏和滚动条等边线）
var scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
```

## offset兼容

```js
// 网页内容实际宽高 (不包括工具栏和滚动条等边线）
var offsetWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
var offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
```
