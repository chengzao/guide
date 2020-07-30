---
title: 浏览器的navigator/document
date: 2020-07-20
sidebar: "auto"
tags:
  - 工具函数
categories:
  - libs
---

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
  // some css code
}
/* 横屏 */
@media screen and (orientation: landscape) {
  // some css code
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
