# 防抖函数&节流函数

## 防抖函数debounce

事件在被触发 n 秒后，再执行回调；如果在这 n 秒中内再次被触发，则重新计时然后在执行回调

```js
function debounce(callback, wait, ...arr) {
  let timer = null;
  return () => {
    if (timer) {
      // 如果有一个函数在等待执行 清除定时器 下面重新计时
      clearTimeout(timer);
      timer = null; // 清空timer 下次重启定时器
    }
    // 设定时器/重置定时器
    timer = setTimeout(() => {
      callback&&callback(...arr);
    }, wait);
  };
}
// 要防抖的函数
let fn = function(a, b) {
  console.log('回调', a, b);
};
setInterval(debounce(fn, 500, '参数1', '参数2'), 1000);
setInterval(debounce(fn, 2000), 1000); // 不会执行
```

## 节流函数throttle

单位时间内有事件被多次触发则，只生效一次

```js
function throttle(callback, time, ...arr) {
  // 上次执行时间 第一次马上执行
  let last = 0;
  return () => {
    // 当前时间
    let cur = Date.now();
    // 当前时间与上次执行的时间，是否超过间隔时间
    if (cur - last > time) {
      // ...arr为callback的参数
      callback(...arr);
      // 重置上次执行时间为当前时间 方便下次执行
      last = cur;
    }
  };
}
let fn = (a, b) => {
  console.log('回调', a, b);
};
// 重复执行函数
setInterval(throttle(fn, 1000, '参数1', '参数2'), 10);
```

## 相关链接

- [JavaScript专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)
- [JavaScript专题之跟着underscore学防抖](https://github.com/mqyqingfeng/Blog/issues/22)
