# 判断类型标识

## typeof类型判断

- `typeof undefined`  -->  `return undefined`
- `typeof 1` -->  `return number`
- `typeof ' ni '`  -->  `return string`
- `typeof Function`  -->  `return function`
- `typeof Symbol`  -->  `return function`
- `typeof []`  -->  `return object`
- `typeof null`  -->  `return object`
- `typeof {}`  -->  `return object`
- `typeof RegExp`  -->  `return function`
- `typeof new RegExp()`  -->  `return object`
- `typeof Math`  -->  `return object`
- `typeof Date`  -->  `return function`
- `typeof new Date()`  -->  `return object`
- `typeof JSON`  -->  `return object`

## eqeqeq

- `null` == `undefined` --> `return true`
- `{}` == `{}` --> `return false`

## 判断类型

- `typeof` 判断类型
- `Object.prototype.toString.call(obj).slice(8,-1);`  判断类型
- `(obj).constructor.name.toString().toLowerCase()`  `obj != null || obj != undefined`除外
- `Array.isArray()` 确定传递的值是否是一个 `Array`
- `isNaN(testValue)` 用来确定一个值是否为`NaN`
- `Object.is(value1, value2);` 判断两个值是否是相同的值
- `object instanceof constructor` 检测 `constructor.prototype` 是否存在于参数 `object` 的原型链
- `obj.hasOwnProperty(prop)` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性

```js
// 判断类型
var arr = [];
console.log(Object.prototype.toString.call(arr)) //"[object Array]"
console.log(Object.prototype.toString.apply(arr)) //"[object Array]"

function fn() {}
// 判断
Object.prototype.toString.call(obj).slice(8,-1);

// obj != null || obj != undefined
(obj).constructor.name.toString().toLowerCase()
```

## 浏览器标识

<details>
<summary>详情</summary>

```js
// 判断浏览器标识
 (function getMobileDevice(window) {
        var ua = navigator.userAgent;
        var mobile = /AppleWebKit.*Mobile.*/.test(ua) || /AppleWebKit/.test(ua); // 是否为移动终端
        var ios = /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua); // ios终端
        var android = /(Android);?[\s\/]+([\d.]+)?/.test(ua); // android终端或者uc浏览器
        var iphone = /iphone/i.test(ua); // iphone
        var iPad = /iPad/i.test(ua); // ipad
        var weixin = /micromessenger/i.test(ua); // weixin
        var chrome = /Chrome\/([\d.]+)/.test(ua) || /CriOS\/([\d.]+)/.test(ua); // Chrome
        var mozilla = ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1; // 火狐内核
        var webkit = /AppleWebKit/i.test(ua); // 苹果、谷歌内核
        var opera = /Presto/i.test(ua); // opera内核
        var safari = /safari/i.test(ua) && !/Chrome/i.test(ua); // 苹果浏览器
        var msie = /msie/i.test(ua); // 微软
        window.device = {
            isMobile: mobile,
            isIos: ios,
            isAndroid: android,
            isIPhone: iphone,
            isIPad: iPad,
            isWeiXin: weixin,
            isChrome: chrome,
            isMozilla: mozilla,
            isWebkit: webkit,
            isOpera: opera,
            isSafari: safari,
            isMsie: msie
        }
    })(window);

    let url = navigator.userAgent.toLowerCase();
    //使用toLowerCase将字符串全部转为小写 方便我们判断使用
    if (url.indexOf("15b202 qq") > -1) {
    //单独判断QQ内置浏览器
    alert("QQ APP 内置浏览器，做你想做的操作");
    }
    if (url.indexOf("micromessenger") > -1) {
    //单独判断微信内置浏览器
    alert('微信内置浏览器，做你想做的操作');
    }
    if (url.indexOf("15b202") > -1) {
    //判断微信内置浏览器，QQ内置浏览器
    alert("QQ和微信内置浏览器，做你想做的操作");
    }
```

</details>

## 匹配机型

```js
 window.location.href =  /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "https://www.baidu.com/" : "http://news.baidu.com/"
```

## BrowserInfo

```js
var BrowserInfo = function() {
    var json = {
      userAgent: navigator.userAgent.toLowerCase(),
      isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
      isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
      isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
      isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
    }
    return json;
  }
```
