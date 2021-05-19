---
title: 数据类型-document
date: 2020-07-20
sidebar: "auto"
categories:
  - frontend
---

## 文档基本结构

```js
document.head; // 文档的头标签
typeof document.head; // object

document.title; // 文档标题
typeof document.title; // string

document.body; // 文档的body标签
typeof document.body; // object

document.documentElement; // 文档的根节点 注意：没有document.html这个东西
typeof document.documentElement; // object

document.html; // 这个是错的!!!

document.defaultView === window; // true
document.activeElement; // 属性返回当前文档中获得焦点的那个元素
document.defaultView;
```

## 文档兼容模式

- `document type`声明文档类型 DTD：`<!DOCTYPE html>`
- `BackCompat` 未声明 DTD(怪异模式)firefox
- `CSS1Compat` 已经声明 DTD(标准模式)chrome ,ie
- `document.compatMode` 获取文档类型

## document

### 节点获取

- 对于正常的网页,直接使用`document`或`window.document`
- 对于 iframe 载入的网页,使用 iframe 节点的`contentDocument`属性
- 对 Ajax 操作返回的文档,使用`XMLHttpRequest`对象的`responseXML`属性

### 节点集合属性

- `document.links`属性返回当前文档所有设定了 href 属性的 a 及 area 元素
- `document.images`属性返回页面所有图片元素(即 img 标签)
- `document.scripts`属性返回当前文档的所有脚本(即 script 标签)
- `document.styleSheets`属性返回一个类似数组的对象,代表当前网页的所有样式表

### 文档信息属性

- `document.documentURI`属性和`document.URL`属性都返回一个字符串,表示当前文档的网址
- `documentURI`属性可用于所有文档(包括 XML 文档),URL 属性只能用于 HTML 文档
- `document.domain`属性返回当前文档的域名
- `document.lastModified`属性返回当前文档最后修改的时间戳,格式为字符串
- `document.title`属性返回当前文档的标题,该属性是可写的
- `document.referrer`

- `document.characterSet`属性返回渲染当前文档的字符集 //UTF-8
- `document.readyState`属性返回当前文档的状态

- **三种可能的值:**

  - `loading`：加载 HTML 代码阶段(尚未完成解析)
  - `interactive`：加载外部资源阶段时
  - `complete`：加载完成时

- `document.designMode`属性控制当前文档是否可编辑
- `document.implementation`属性返回一个对象,用来甄别当前环境部署了哪些 DOM 相关接口
- `implementation`属性的`hasFeature`方法,可以判断当前环境是否部署了特定版本的特定接口


```js
document.implementation.hasFeature("HTML", "2.0"); // true

document.implementation.hasFeature("MutationEvents", "2.0"); // true
```

- `document.cookie`属性用来操作浏览器 Cookie

## visibilityChange 判断页面可见状态

- [原文](https://github.com/chenxiaochun/blog/issues/9)

```js
var hidden, state, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
  state = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
  state = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
  state = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
  state = "webkitVisibilityState";
}

// 添加监听器，在title里显示状态变化
document.addEventListener(
  visibilityChange,
  function() {
    document.title = document[state];
  },
  false
);

// 初始化
document.title = document[state];
```

- js

```js
function getHidden (){
    let prefixs = ['webkit','moz','mos','o'];
    if ('hidden' in document) return document.hidden;
    for (let i = 0; i < prefixs.length; i++) {
        if (`${prefixs[i]}Hidden` in document){
            return document[`${prefixs[i]}Hidden`];
        }
    }
    // not support
    return null;
}

function getVivibilityState (){
    let prefixs = ['webkit','moz','mos','o'];
    if ('visibilityState' in document) return document.visibilityState;
    for (let i = 0; i < prefixs.length; i++) {
        if (`${prefixs[i]}VisibilityState` in document){
            return document[`${prefixs[i]}VisibilityState`];
        }
    }
    // not support
    return null;
}

function pageHiddenHandler () {
    let isHidden = getHidden();
    // 改变页面title用户观察状态
    document.title = isHidden ? '藏起来了' : '闪现';
}
document.addEventListener('visibilitychange',pageHiddenHandler,false);
```

## 监听屏幕旋转变化接口: orientationchange

- js

```js
var screenOrientation = function() {
  let self = this;
  let orientation =
    screen.orientation || screen.mozOrientation || screen.msOrientation;
  window.addEventListener(
    "onorientationchange" in window ? "orientationchange" : "resize",
    function() {
      self.angle = orientation.angle;
    }
  );
};
```

- css

```css
/* 竖屏 */
@media screen and (orientation: portrait) {
  /* some css code */
}
/* 横屏 */
@media screen and (orientation: landscape) {
  /* some css code */
}
```

## 电池状态：navigator.getBattery

```js
let getBatteryInfo = function() {
  let self = this;
  if (navigator.getBattery) {
    navigator.getBattery().then(function(battery) {
      // 判断是否在充电
      self.batteryInfo = battery.charging
        ? `在充电 : 剩余 ${battery.level * 100}%`
        : `没充电 : 剩余 ${battery.level * 100}%`;
      // 电池充电状态改变事件
      battery.addEventListener("chargingchange", function() {
        self.batteryInfo = battery.charging
          ? `在充电 : 剩余 ${battery.level * 100}%`
          : `没充电 : 剩余 ${battery.level * 100}%`;
      });
    });
  } else {
    self.batteryInfo = "不支持电池状态接口";
  }
};
```

## 让你的手机震动: window.navigator.vibrate

```js
let vibrateFun = function() {
  let self = this;
  if (navigator.vibrate) {
    navigator.vibrate([500, 500, 500, 500, 500, 500, 500, 500, 500, 500]);
  } else {
    self.vibrateInfo = "您的设备不支持震动";
  }
  // 清除震动
  navigator.vibrate(0);
  // 持续震动
  setInterval(function() {
    navigator.vibrate(200);
  }, 500);
};
```

## 当前语言：navigator.language

```js
function getThisLang() {
  const langList = ["cn", "hk", "tw", "en", "fr"];
  const langListLen = langList.length;
  const thisLang = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase();
  for (let i = 0; i < langListLen; i++) {
    let lang = langList[i];
    if (thisLang.includes(lang)) {
      return lang;
    } else {
      return "en";
    }
  }
}
```

## 联网状态：navigator.onLine

```js
mounted(){
    let self = this;
    window.addEventListener('online',  self.updateOnlineStatus, true);
    window.addEventListener('offline', self.updateOnlineStatus, true);
},
methods: {
    updateOnlineStatus: function(){
        var self = this;
        self.onLineInfo = navigator.onLine ? "online" : "offline";
    },
}
```

## 页面可编辑：contentEditable

```bash
data:text/html, <html contenteditable>
```

## 浏览器活跃窗口监听: window.onblur & window.onfocus

```js
mounted(){
  let self = this;
  window.addEventListener('blur',  self.doFlashTitle, true);
  window.addEventListener('focus', function () {
      clearInterval(self.timer);
      document.title = '微信网页版';
  }, true);
},
methods: {
    doFlashTitle: function(){
        var self = this;
        self.timer = setInterval( () => {
            if (!self.flashFlag) {
                document.title = "微信网页版";
            } else {
                document.title = `微信（${self.infoNum}）`;
            }
            self.flashFlag = ! self.flashFlag
        }, 500)
    },
}
```

## 全屏 API（Fullscreen API）

```js
let fullScreenFun = function() {
  let self = this;
  var fullscreenEnabled =
    document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.msFullscreenEnabled;

  if (fullscreenEnabled) {
    let de = document.documentElement;
    if (self.fullScreenInfo === "打开全屏") {
      if (de.requestFullscreen) {
        de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
      }
      self.fullScreenInfo = "退出全屏";
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      self.fullScreenInfo = "打开全屏";
    }
  } else {
    self.fullScreenInfo = "浏览器当前不能全屏";
  }
};
```

## asyncToGenerator

```js
function asyncToGenerator(generatorFunc) {
  return function() {
    const gen = generatorFunc.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
        const { value, done } = generatorResult;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            val => step("next", val),
            err => step("throw", err)
          );
        }
      }
      step("next");
    });
  };
}
```
