---
title: 如何处理前端异常
date: 2022-01-29
sidebar: "auto"
tags:
  - error
categories:
  - frontend
---

## try-catch

只能捕获到同步的运行时错误，对语法和异步错误捕获不到

```js
try {
  setTimeout(() => {
    undefined.map(v => v);
  }, 1000)
} catch(e) {
  console.log('捕获到异常：',e); // 没有执行
}

// result:
// Uncaught TypeError: Cannot read property 'map' of undefined
//     at setTimeout (<anonymous>:3:11)

// ------------------------------------------

try {
  let name = 'jartto;  // 语法错误
  console.log(nam);
} catch(e) {
  console.log('捕获到异常：',e); // 没有执行
}

// result:
// Uncaught SyntaxError: Invalid or unexpected token
```

## window.onerror

- onerror 最好写在所有 JS 脚本的前面，否则有可能捕获不到错误；
- onerror 无法捕获语法错误, 静态资源异常，接口异常
- 函数只有在返回 true 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 `Uncaught Error: xxxxx`
- iframe 异常

```js
<iframe src="./iframe.html" frameborder="0"></iframe>
<script>
  window.frames[0].onerror = function (message, source, lineno, colno, error) {
    console.log('捕获到 iframe 异常：',{message, source, lineno, colno, error});
    return true;
  };
</script>
```

## Script error

- [解决 "Script Error" 的另类思路](https://juejin.cn/post/6844903727820718094)

```js
// script 标签添加 crossOrigin 属性
const script = document.createElement('script');
script.crossOrigin = 'anonymous';
script.src = url;
document.body.appendChild(script);

// 改写 EventTarget 的 addEventListener 方法
const originAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, listener, options) {
  // 捕获添加事件时的堆栈
  const addStack = new Error(`Event (${type})`).stack;
  const wrappedListener = function (...args) {
    try {
      return listener.apply(this, args);
    }
    catch (err) {
      // 异常发生时，扩展堆栈
      err.stack += '\n' + addStack;
      throw err;
    }
  }
  return originAddEventListener.call(this, type, wrappedListener, options);
}
```

## 监听error事件

```js
window.addEventListener('error',() => {}）
```

- 捕获网络请求的异常，无法判断 HTTP 的状态码；

## Promise异常捕获

- 在 promise 中使用 catch 可以非常方便的捕获到异步 error
- 没有写 catch 的 Promise 中抛出的错误无法被 onerror 或 try-catch 捕获到
- `async/await`异常捕获, 不去捕获的话就会和Promise一样
- 解决方案 全局监听`unhandledrejection`Error

```js
window.addEventListener("unhandledrejection", e => {
  throw e.reason
});
```

## 错误类型总结

> https://juejin.cn/post/6967152411542552607#heading-3

| 异常类型           | 同步方法 | 异步方法 | 资源加载 | Promise | async/await |
| ------------------ | -------- | -------- | -------- | ------- | ------- |
| try/catch          | ✔️        |          |          |         | ✔️     |
| onerror            | ✔️        | ✔️        |          |         |      |
| error事件监听      | ✔️        | ✔️        | ✔️        |         |        |
| unhandledrejection |          |          |          | ✔️       | ✔️ |

- 代码

```js
window.addEventListener("unhandledrejection", e => {
  throw e.reason
});
window.addEventListener('error', args => {
  console.log(
    'error event:', args
  );
  return true;
}, true);
```

## 错误数据采集

- [https://juejin.cn/post/6899430989404045320](https://juejin.cn/post/6899430989404045320)

```js
// 捕获资源加载失败错误 js css img...
addEventListener('error', e => {
    const target = e.target
    if (target != window) {
        monitor.errors.push({
            type: target.localName,
            url: target.src || target.href,
            msg: (target.src || target.href) + ' is load error',
            // 错误发生的时间
            time: new Date().getTime(),
        })
    }
}, true)

// 监听 js 错误
window.onerror = function(msg, url, row, col, error) {
    monitor.errors.push({
        type: 'javascript',
        row: row,
        col: col,
        msg: error && error.stack? error.stack : msg,
        url: url,
        // 错误发生的时间
        time: new Date().getTime(),
    })
}

// 监听 promise 错误 缺点是获取不到行数数据
addEventListener('unhandledrejection', e => {
    monitor.errors.push({
        type: 'promise',
        msg: (e.reason && e.reason.msg) || e.reason || '',
        // 错误发生的时间
        time: new Date().getTime(),
    })
})
```

## 性能数据上报

```js
window.onload = () => {
    // 在浏览器空闲时间获取性能及资源信息
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
    if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
            monitor.performance = getPerformance()
            monitor.resources = getResources()
        })
    } else {
        setTimeout(() => {
            monitor.performance = getPerformance()
            monitor.resources = getResources()
        }, 0)
    }
}
```

## 错误上报

- 通过ajax发送数据
- 动态创建img标签的形式

```js
function sendImage(url: string, params: object) {
  const img = new Image()

  img.style.display = 'none'

  const removeImage = function() {
    img.parentNode.removeChild(img)
  }

  img.onload = removeImage
  img.onerror = removeImage

  img.src = `${url}?params=${serilizeParams(params)}`

  document.body.appendChild(img)
}
```

- `navigator.sendBeacon` 来进行上报

```js
type ContentType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

const serilizeParams = (params: object) => {
    return window.btoa(JSON.stringify(params))
}

function sendBeacon(url: string, params: object) {
  const formData = new FormData()
  formData.append('params', serilizeParams(params))
  navigator.sendBeacon(url, formData)
}


window.addEventListener('unload', sendLog, false);

function sendLog(url: string, params: object) {
    if（navigator.sendBeacon) {
        sendBeacon(url, params)
    } else {
        sendImage(url, params)
    }
}
```

## demo示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script>
        function monitorInit() {
            const monitor = {
                // 数据上传地址
                url: '',
                // 性能信息
                performance: {},
                // 资源信息
                resources: {},
                // 错误信息
                errors: [],
                // 用户信息
                user: {
                    // 屏幕宽度
                    screen: screen.width,
                    // 屏幕高度
                    height: screen.height,
                    // 浏览器平台
                    platform: navigator.platform,
                    // 浏览器的用户代理信息
                    userAgent: navigator.userAgent,
                    // 浏览器用户界面的语言
                    language: navigator.language,
                },
                // 手动添加错误
                addError(error) {
                    const obj = {}
                    const { type, msg, url, row, col } = error
                    if (type) obj.type = type
                    if (msg) obj.msg = msg
                    if (url) obj.url = url
                    if (row) obj.row = row
                    if (col) obj.col = col
                    obj.time = new Date().getTime()
                    monitor.errors.push(obj)
                },
                // 重置 monitor 对象
                reset() {
                    window.performance && window.performance.clearResourceTimings()
                    monitor.performance = getPerformance()
                    monitor.resources = getResources()
                    monitor.errors = []
                },
                // 清空 error 信息
                clearError() {
                    monitor.errors = []
                },
                // 上传监控数据
                upload() {
                    // 自定义上传
                    // axios.post({
                    //     url: monitor.url,
                    //     data: {
                    //         performance,
                    //         resources,
                    //         errors,
                    //         user,
                    //     }
                    // })
                },
                // 设置数据上传地址
                setURL(url) {
                    monitor.url = url
                },
            }

            // 获取性能信息
            const getPerformance = () => {
                if (!window.performance) return
                const timing = window.performance.timing
                const performance = {
                    // 重定向耗时
                    redirect: timing.redirectEnd - timing.redirectStart,
                    // 白屏时间
                    whiteScreen: whiteScreen,
                    // DOM 渲染耗时
                    dom: timing.domComplete - timing.domLoading,
                    // 页面加载耗时
                    load: timing.loadEventEnd - timing.navigationStart,
                    // 页面卸载耗时
                    unload: timing.unloadEventEnd - timing.unloadEventStart,
                    // 请求耗时
                    request: timing.responseEnd - timing.requestStart,
                    // 获取性能信息时当前时间
                    time: new Date().getTime(),
                }

                return performance
            }

            // 获取资源信息
            const getResources = () => {
                if (!window.performance) return
                const data = window.performance.getEntriesByType('resource')
                const resource = {
                    xmlhttprequest: [],
                    css: [],
                    other: [],
                    script: [],
                    img: [],
                    link: [],
                    fetch: [],
                    // 获取资源信息时当前时间
                    time: new Date().getTime(),
                }

                data.forEach(item => {
                    const arry = resource[item.initiatorType]
                    arry && arry.push({
                        // 资源的名称
                        name: item.name,
                        // 资源加载耗时
                        duration: item.duration.toFixed(2),
                        // 资源大小
                        size: item.transferSize,
                        // 资源所用协议
                        protocol: item.nextHopProtocol,
                    })
                })

                return resource
            }

            window.onload = () => {
                // 在浏览器空闲时间获取性能及资源信息 https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
                if (window.requestIdleCallback) {
                    window.requestIdleCallback(() => {
                        monitor.performance = getPerformance()
                        monitor.resources = getResources()
                        console.log('页面性能信息')
                        console.log(monitor.performance)
                        console.log('页面资源信息')
                        console.log(monitor.resources)
                    })
                } else {
                    setTimeout(() => {
                        monitor.performance = getPerformance()
                        monitor.resources = getResources()
                        console.log('页面性能信息')
                        console.log(monitor.performance)
                        console.log('页面资源信息')
                        console.log(monitor.resources)
                    }, 0)
                }
            }

            // 捕获资源加载失败错误 js css img...
            addEventListener('error', e => {
                const target = e.target
                if (target != window) {
                    monitor.errors.push({
                        type: target.localName,
                        url: target.src || target.href,
                        msg: (target.src || target.href) + ' is load error',
                        // 错误发生的时间
                        time: new Date().getTime(),
                    })

                    console.log('所有的错误信息')
                    console.log(monitor.errors)
                }
            }, true)

            // 监听 js 错误
            window.onerror = function(msg, url, row, col, error) {
                monitor.errors.push({
                    type: 'javascript', // 错误类型
                    row: row, // 发生错误时的代码行数
                    col: col, // 发生错误时的代码列数
                    msg: error && error.stack? error.stack : msg, // 错误信息
                    url: url, // 错误文件
                    time: new Date().getTime(), // 错误发生的时间
                })

                console.log('所有的错误信息')
                console.log(monitor.errors)
            }

            // 监听 promise 错误 缺点是获取不到行数数据
            addEventListener('unhandledrejection', e => {
                monitor.errors.push({
                    type: 'promise',
                    msg: (e.reason && e.reason.msg) || e.reason || '',
                    // 错误发生的时间
                    time: new Date().getTime(),
                })

                console.log('所有的错误信息')
                console.log(monitor.errors)
            })

            return monitor
        }

        const monitor = monitorInit()
    </script>
    <link rel="stylesheet" href="test.css">
    <title>Document</title>
</head>
<body>
    <button class="btn1">错误测试按钮1</button>
    <button class="btn2">错误测试按钮2</button>
    <button class="btn3">错误测试按钮3</button>
    <img src="https://avatars3.githubusercontent.com/u/22117876?s=460&v=4" alt="">
    <img src="test.png" alt="">
<script src="192.168.10.15/test.js"></script>
<script>
document.querySelector('.btn1').onclick = () => {
    setTimeout(() => {
        console.log(button)
    }, 0)
}

document.querySelector('.btn2').onclick = () => {
    new Promise((resolve, reject) => {
        reject({
            msg: 'test.js promise is error'
        })
    })
}

document.querySelector('.btn3').onclick = () => {
    throw ('这是一个手动扔出的错误')
}
</script>
</body>
</html>
```

## 链接

- [如何优雅处理前端异常？](http://jartto.wang/2018/11/20/js-exception-handling/index.html)
- [深入了解前端监控原理](https://juejin.cn/post/6899430989404045320)
- [前端埋点与监控方案](https://juejin.cn/post/6938075086737899534)
- [前端监控平台系列：微信小程序监控和Web监控（已开源）](https://juejin.cn/post/6921549680639737863)
- [前端开发中的Error以及异常捕获](https://juejin.cn/post/6844903751271055374)
