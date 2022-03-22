---
title: 文档属性兼容
date: 2022-02-20
sidebar: "auto"
tags:
  - dom
categories:
  - frontend
---

## getComputedStyle

- 访问属性的两种方式: `div.style.width`, 只能得到行内样式
- 另外一种写法: `div.style["width"]` 引号内写属性的名字
- 计算后样式的获取:

```js
// IE678:
// element.currentStyle.属性名 或 element.currentStyle["属性名"]
demo.currentStyle.left;
demo.currentStyle["left"];
```

- 兼容写法

```js
//window.getComputedStyle(element,伪元素)["属性名"]
// 第二个参数：
//    表示指定节点的伪元素（比如:before、:after、:first-line、:first-letter等）
var result = window.getComputedStyle(div, ':before');
// 一般情况下没有伪元素,我们用 null 来替代.
window.getComputedStyle(demo, null)["left"]

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr]; //ie678
  } else {
    return getComputedStyle(obj, null)[attr]; //正常浏览器
  }
}
```

## pageX/pageY

- `以当前文档的左上角为基准点`

```js
var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;

var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
```

- example

```js
let doc = document.documentElement || document.body;
doc.addEventListener("click", function(event) {
  var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
  var pageX =
    event.pageX || event.clientX + document.documentElement.scrollLeft;
  console.log({ pageX, pageY });
});
```

## screenX/screenY

- `当前屏幕的左上角为基准点`

```js
let doc = document.documentElement || document.body;
doc.addEventListener("click", function(event) {
  console.log(event.screenX, event.screenY);
});
```

## screen

```js
// screen object
console.log(screen);
```

## IntersectionObserver

- [IntersectionObserver](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

```js
const options = {
  threshold: 1.0
};
const target = document.querySelector(".target");
const callback = function(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const observer = new IntersectionObserver(callback, options);
observer.observe(target);
```

## getBoundingClientRect

- example

```html
<div class="client"></div>
<script>
  let client = document.querySelector(".client");
  client.getBoundingClientRect();
</script>
```

```js
// 网页元素左上角的视口横坐标
Element.getBoundingClientRect().left
// Element.offsetLeft

// 网页元素左上角的视口纵坐标
Element.getBoundingClientRect().top
// Element.offsetTop

// 网页元素左上角的网页横坐标
Element.getBoundingClientRect().left + document.documentElement.scrollLeft
// Element.offsetLeft + document.documentElement.scrollLeft

// 网页元素左上角的网页纵坐标
Element.getBoundingClientRect().top + document.documentElement.scrollTop
// Element.offsetTop + document.documentElement.scrollTop

// 视口高度
window.innerHeight // 包括滚动条
document.documentElement.clientHeight // 不包括滚动条

// 视口宽度
window.innerWidth // 包括滚动条
document.documentElement.clientWidth // 不包括滚动条

window.outerHeight
window.outerWidth
```

## clientHeight/clientWidth

- `clientHeight`：表示的是可视区域的高度，`不包含border和滚动条`
- `clientTop`：表示边框 border 的厚度，在未指定的情况下一般为 0

![client](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/client.png)

- element example

```html
<!-- css -->
.client{ width: 200px; height: 150px; border: 10px solid #cccccc; margin: 50px;
padding: 30px; background-color: aqua; }
<!-- dom -->
<div class="client"></div>
<!-- js -->
let dom = document.querySelector(".client");
let {clientHeight, clientWidth,clientLeft, clientTop} = dom;

```

| dom client   | value | expr                 |
| ------------ | ----- | -------------------- |
| clientWidth  | 260   | width + 2\* padding  |
| clientHeight | 210   | height + 2\* padding |
| clientLeft   | 10    | border               |
| clientTop    | 10    | boder                |

- document 兼容写法

```js
// 正常浏览器（包括IE9+）
window.innerWidth
// 标准模式
document.documentElement.clientWidth
// 怪异模式
document.body.clientWidth

// client 兼容写法
function client() {
  if (window.innerWidth != null) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
    // document.compatMode 用来判断当前浏览器采用的渲染方式
  } else if (document.compatMode == "CSS1Compat") {
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

- document example

```js
let doc = document.documentElement || document.body;
let { clientHeight, clientWidth } = doc;
console.table({ clientHeight, clientWidth, clientLeft, clientTop });
```

## offsetHeight/offsetWidth

- offsetHeight 和 style.height 的区别: `style.height是字符串,offsetHeight是数值`
- `demo.style.height`是用来获取和设置行内样式的,`offsetHeight`是只读属性
- `demo.style.height`只能获取和设置行内样式
- `offsetHeight = height+padding+border`,`包括 自身高度 内边距 边框 不包括 外边距`
- example

```html
<!-- css -->
html,body{padding:0;margin:0} .client{ width: 200px; height: 150px; border: 10px
solid #cccccc; margin: 50px; padding: 30px; background-color: aqua; }
<!-- dom -->
<div class="client"></div>
<!-- js -->
let dom = document.querySelector(".client"); let {offsetWidth, offsetHeight,
offsetLeft, offsetTop} = dom;
```

| offset       | value | expr                            |
| ------------ | ----- | ------------------------------- |
| offsetWidth  | 280   | width + 2*padding + 2* border  |
| offsetHeight | 230   | height + 2*padding + 2* border |
| offsetLeft   | 50    | margin                          |
| offsetTop    | 50    | margin                          |

- 兼容写法

```js
// 网页内容实际宽高 (不包括工具栏和滚动条等边线）
var offsetWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
var offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
```

- document example

```js
// css
html{height: 500px;width: 1000px;border: 1px solid red;}
// js
let doc = document.documentElement || document.body
let {offsetWidth , offsetHeight} = doc;
```

## offsetLeft/offsetTop

- `offsetLeft`和`style.left`的区别:
  - 最大区别在于`offsetLeft`可以计算没有定位的盒子到左侧的距离,而`style.left`可能会出问题
  - 如果没有给 HTML 元素指定 left 样式,则`style.left`返回的是空字符串.
  - `offsetLeft`只读,而`style.left`可读写.
  - `offsetLeft`返回的是数字,而`style.left`返回的是字符串,除了数字外还带有单位：`px`.
- `offsetLeft`的构成:

  - 到最近的（带有定位的）父元素的 左侧/顶部 的距离
  - 如果所有父级都没有定位则以 body 为准
  - `offsetLeft` 是到父亲的`padding`左侧的距离（不是`border`更不是`margin`）

- example

```html
<!-- css -->
html,body{padding:0;margin:0} .client { width: 200px; height: 150px; margin:
100px; background-color: pink; /* position: relative; */ } .box{
background-color: red; width: 100px; height: 100px; }
<!-- html -->
<div class="client">
  <div class="box"></div>
</div>
<!-- js -->
let dom = document.querySelector(".box"); let {offsetLeft, offsetTop} = dom;
```

- 父级无定位

| offset     | value | expr   |
| ---------- | ----- | ------ |
| offsetLeft | 100   | margin |
| offsetTop  | 100   | margin |

![dom-offsetLeft](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/dom-offsetLeft.png)

- 父级有定位

| offset     | value | expr   |
| ---------- | ----- | ------ |
| offsetLeft | 100   | margin |
| offsetTop  | 100   | margin |

![dom-offsetleft2](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/dom-offsetleft2.png)

- offset img

![dom-offset](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/dom-offset.png)

## scrollHeight/scrollWidth

- event `window.onscroll = function () { //code }`

- dom 对象内部实际内容的高度/宽度

```html
<style>
  html,
  body {
    padding: 0;
    margin: 0;
  }
  .client {
    width: 200px;
    height: 150px;
    margin: 100px;
    background-color: pink;
    overflow: auto;
    padding: 10px;
  }
  .box {
    background-color: red;
    width: 300px;
    height: 1000px;
    padding: 50px;
    border: 40px;
  }
</style>
<!-- html -->
<div class="client">
  <div class="box"></div>
</div>
<!-- js -->
<script>
  let dom = document.querySelector(".box");
  let { scrollWidth, scrollHeight } = dom;
  console.table({ scrollWidth, scrollHeight });
  // => 400 , 1100
</script>
```

| scroll       | value | expr                 |
| ------------ | ----- | -------------------- |
| scrollWidth  | 400   | width + padding \* 2 |
| scrollHeight | 1100  | width + padding \*2  |

- document

```js
// 网页内容实际宽高（包括工具栏和滚动条等边线）
var scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
```

```js
// css
html{height: 5000px;width: 2000px;}
// js
let doc = document.documentElement || document.body
let {scrollHeight, scrollWidth} = doc;
console.table({scrollHeight, scrollWidth});
// 5000 , 2000
```

## scrollTop/scrollLeft

- `scrollTop`和`scrollLeft` 被卷去部分的 `顶部/左侧` 到可视区域 `顶部/左侧` 的距离

```js
// 正常浏览器（除了ie678之外的浏览器）
window.pageYOffset
// 已经声明DTD（标准模式）
document.documentElement.scrollTop
// 未声明 DTD（怪异模式）
document.body.scrollTop

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

![dom-scroll](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/dom-scroll.png)

- document example

```js
let doc = document.documentElement || document.body;
window.addEventListener("scroll", function() {
  let { scrollTop, scrollLeft } = doc;
  console.table({ scrollTop, scrollLeft });
});
```

- dom example

```html
<style>
  html,
  body {
    padding: 0;
    margin: 0;
  }
  .client {
    width: 200px;
    height: 150px;
    margin: 100px;
    background-color: pink;
    overflow: auto;
    padding: 10px;
  }
  .box {
    background-color: red;
    width: 300px;
    height: 1000px;
    padding: 50px;
    border: 40px;
  }
</style>
<div class="client">
  <div class="box"></div>
</div>
<script>
  let client = document.querySelector(".client");
  client.addEventListener("scroll", function() {
    let { scrollWidth, scrollHeight, scrollTop, scrollLeft } = client;
    console.table({
      scrollWidth,
      scrollHeight,
      scrollTop,
      scrollLeft
    });
  });
</script>
```

- 页面滚动座标: `window.scrollTo(xpos,ypos)`窗体（左上角）滚动到页面这个座标`position`

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

## js在textarea和input光标处

1.[How to insert text into the textarea at the current cursor position?](https://stackoverflow.com/questions/11076975/how-to-insert-text-into-the-textarea-at-the-current-cursor-position)
2.[Javascript实现点击插入内容到textarea光标处](https://www.awaimai.com/2073.html)

- html

```html
<form id="form1" name="form1" method="post" action="">
    <label>
        <textarea name="text" id="text" cols="45" rows="10">
        这是测试内容，请在任意位置插入内容。
        这是测试内容，请在任意位置插入内容。
        这是测试内容，请在任意位置插入内容。
        这是测试内容，请在任意位置插入内容。
        这是测试内容，请在任意位置插入内容。
        这是测试内容，请在任意位置插入内容。
        </textarea>

        <a id="insert" href="javascript:void(0);">code</a>
    </label>
</form>
```

- js

```js
var text = document.getElementById('text');
var insert = document.getElementById('insert');
insert.onclick = function () {
    insertAtCursor(text, this.innerHTML);
};

function insertAtCursor(myField, myValue) {
    if (document.selection) {

        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
    } else if (myField.selectionStart || myField.selectionStart == '0') {

        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        var beforeValue = myField.value.substring(0, startPos);
        var afterValue = myField.value.substring(endPos, myField.value.length);

        myField.value = beforeValue + myValue + afterValue;

        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
        myField.focus();
    } else {
        myField.value += myValue;
        myField.focus();
    }
}
```

## js在div中的光标处插入

- html

```html
<div @input="input" ref="edit" class="edit" id="send-edit-box" contenteditable="true"></div>
```

- js

```js
/**
 * 支持 div 自定义的编辑框
 * @param {String} type  参考execCommand参数
 * @param {String} content 插入内容
 * @param {String} limitID 限制插入元素的ID
 */
export function insertAtCursor (type, content, limitID) {
  let selection = window.getSelection();
  let anchorNode = selection.anchorNode;
  if (!limitID || anchorNode.id === limitID || anchorNode.parentNode.id === limitID) {
    return document.execCommand(type, false, content);
  }
  return false;
}

/**
 * 支持 div 自定义的编辑框
 * @param {*} text
 */
export function insertTextAtCaret (text) {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode( document.createTextNode(text) );
    }
  } else if (document.selection && document.selection.createRange) {
    document.selection.createRange().text = text;
  }
}

/**
 * 仅支持 input textarea
 * @param {dom} dom
 * @param {*} myValue
 */
export function insertAtCursorInput (dom, myValue) {
  if (document.selection) {
    // IE support
    dom.focus();
    var sel = document.selection.createRange();
    sel.text = myValue;
    sel.select();
  } else if (dom.selectionStart || dom.selectionStart == '0') {
    // MOZILLA/NETSCAPE support
    var startPos = dom.selectionStart;
    var endPos = dom.selectionEnd;
    var beforeValue = dom.value.substring(0, startPos);
    var afterValue = dom.value.substring(endPos, dom.value.length);
    dom.value = beforeValue + myValue + afterValue;

    dom.selectionStart = startPos + myValue.length;
    dom.selectionEnd = startPos + myValue.length;
    // dom.setSelectionRange(startPos, startPos + myValue.length);
    dom.focus();
  } else {
    dom.value += myValue;
    dom.focus();
  }
}

/**
 * 支持 div 自定义的编辑框
 * @param {*} html
 */
export function pasteHtmlAtCaret  (html) {
  var sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // only relatively recently standardized and is not supported in
      // some browsers (IE9, for one)
      var el = document.createElement('div');
      el.innerHTML = html;
      var frag = document.createDocumentFragment(); var node; var lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type !== 'Control') {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
}

function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}
```
