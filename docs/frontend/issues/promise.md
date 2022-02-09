---
title: 实现Promise
date: 2022-01-19
sidebar: "auto"
tags:
  - promise
categories:
  - frontend
---


## Promise

- 简化版

```js
const PENDING = "pending";
const FULFILLED = 'fulfilled';
const REJECTED = "rejected";
function myPromise(executor) {
  let self = this;

  self.status = PENDING; //定义状态改变前的初始状态
  self.value = undefined; //定义状态为fulfilled的时候的状态
  self.reason = undefined; //定义状态为rejected的时候的状态

  self.resolveCb = [];
  self.rejectCb = [];

  function resolve(value) {
    // 判断传入元素是否为Promise值，如果是，则状态改变必须等待前一个状态改变后再进行改变
    if (value instanceof myPromise) {
      return value.then(resolve, reject);
    }
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变，
      if (self.status === PENDING) {
        // 修改状态
        self.status = FULFILLED;
        // 设置传入的值
        self.value = value;
        // 执行回调函数
        self.resolveCb.forEach(callback => {
          callback(value);
        });
      }
    }, 0);
  }

  function reject(reason) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (self.status === PENDING) {
        // 修改状态
        self.status = REJECTED;
        // 设置传入的值
        self.value = reason;
        // 执行回调函数
        self.rejectCb.forEach(callback => {
          callback(reason);
        });
      }
    }, 0);
  }

  //捕获构造异常
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

myPromise.prototype.then = function(onResolved, onRejected) {
  const self = this;
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onResolved = typeof onResolved === "function"
    ? onResolved : function(value) { return value};

  onRejected =typeof onRejected === "function"
    ? onRejected  : function(error) {  throw error };

  // 判断当前状态是否为fulfilled
  if (self.status == FULFILLED ) {
    onResolved(self.value);
  }

  // 判断当前状态是否为rejected
  if (self.status == REJECTED ) {
    onRejected(self.reason);
  }

  // 判断当前状态是否为pending
  if (self.status == PENDING ) {
    self.resolveCb.push(() => onResolved(self.value));
    self.rejectCb.push(() => onRejected(self.reason));
  }
};
// demo
var p = new myPromise(function(resolve, reject) {
  resolve(1);
});
p.then(function(x) {
  console.log(x);
});
```

## promise完整版

> 原文：[36 个 JS 手写题](https://juejin.cn/post/6946022649768181774#heading-38)

- ES5实现

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>"));
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      let then = x.then;
      if (typeof then === "function") {
        // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(
          x, (y) => {
            // 根据 promise 的状态决定是成功还是失败
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject);
          }, (r) => {
            // 只要失败就失败 Promise/A+ 2.3.3.3.2
            if (called) return;
            called = true;
            reject(r);
          });
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(x);
  }
};

function myPromise(executor) {
  this.status = PENDING;
  this.value = undefined;
  this.reason = undefined;
  this.onResolvedCallbacks = [];
  this.onRejectedCallbacks = [];

  let resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.onResolvedCallbacks.forEach((fn) => fn());
    }
  };

  let reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn());
    }
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

myPromise.prototype.then = function(onFulfilled, onRejected) {
  // 解决 onFufilled，onRejected 没有传值的问题
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
  // 因为错误的值要让后面访问到，所以这里也要抛出错误，不然会在之后 then 的 resolve 中捕获
  onRejected = typeof onRejected === "function" ? onRejected : (err) => {
    throw err;
  };
  // 每次调用 then 都返回一个新的 promise
  let promise2 = new myPromise((resolve, reject) => {
    if (this.status === FULFILLED) {
      //Promise/A+ 2.2.4 --- setTimeout
      setTimeout(() => {
        try {
          let x = onFulfilled(this.value);
          // x可能是一个proimise
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }

    if (this.status === REJECTED) {
      //Promise/A+ 2.2.3
      setTimeout(() => {
        try {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }

    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });

      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    }
  });
  return promise2;
}

myPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

myPromise.defer = myPromise.deferred = function() {
  let dfd = {}
  dfd.promise = new myPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
```


::: details

- ES6实现Promise

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach((fn) => fn());
            }
        };

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn) => fn());
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        // 解决 onFufilled，onRejected 没有传值的问题
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
        // 因为错误的值要让后面访问到，所以这里也要抛出错误，不然会在之后 then 的 resolve 中捕获
        onRejected = typeof onRejected === "function" ? onRejected : (err) => {
            throw err;
        };
        // 每次调用 then 都返回一个新的 promise
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                //Promise/A+ 2.2.4 --- setTimeout
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        // x可能是一个proimise
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }

            if (this.status === REJECTED) {
                //Promise/A+ 2.2.3
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }

            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    }

    catch(onReject){
      return this.then(null, onReject)
    }
}

const resolvePromise = (promise2, x, resolve, reject) => {
    // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
    if (promise2 === x) {
        return reject(
            new TypeError("Chaining cycle detected for promise #<Promise>"));
    }
    // Promise/A+ 2.3.3.3.3 只能调用一次
    let called;
    // 后续的条件要严格判断 保证代码能和别的库一起使用
    if ((typeof x === "object" && x != null) || typeof x === "function") {
        try {
            // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
            let then = x.then;
            if (typeof then === "function") {
            // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
                then.call(
                    x, (y) => {
                        // 根据 promise 的状态决定是成功还是失败
                        if (called) return;
                        called = true;
                        // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
                        resolvePromise(promise2, y, resolve, reject);
                    }, (r) => {
                        // 只要失败就失败 Promise/A+ 2.3.3.3.2
                        if (called) return;
                        called = true;
                        reject(r);
                    });
            } else {
                // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
                resolve(x);
            }
        } catch (e) {
            // Promise/A+ 2.3.3.2
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
        resolve(x);
    }
};

Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = Promise;
```

:::

## Promise.resolve

```js
Promise.resolve = function(value) {
    // 如果是 Promsie，则直接输出它
    if(value instanceof Promise){
        return value
    }
    return new Promise(resolve => resolve(value))
}
```

## Promise.reject

```js
Promise.reject = function(reason) {
    return new Promise((resolve, reject) => reject(reason))
}
```

## Promise.all

```js
Promise.all = function(promiseArr) {
    let index = 0, result = []
    return new Promise((resolve, reject) => {
        promiseArr.forEach((p, i) => {
            Promise.resolve(p).then(val => {
                index++
                result[i] = val
                if (index === promiseArr.length) {
                    resolve(result)
                }
            }, err => {
                reject(err)
            })
        })
    })
}
```

## Promise.race

```js
Promise.race = function(promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach(p => {
            Promise.resolve(p).then(val => {
                resolve(val)
            }, err => {
                reject(err)
            })
        })
    })
}
```

## Promise.allSettled

```js
Promise.allSettled = function(promiseArr) {
    let result = []

    return new Promise((resolve, reject) => {
        promiseArr.forEach((p, i) => {
            Promise.resolve(p).then(val => {
                result.push({
                    status: 'fulfilled',
                    value: val
                })
                if (result.length === promiseArr.length) {
                    resolve(result)
                }
            }, err => {
                result.push({
                    status: 'rejected',
                    reason: err
                })
                if (result.length === promiseArr.length) {
                    resolve(result)
                }
            })
        })
    })
}
```

## Promise.any

```js
Promise.any = function(promiseArr) {
    let index = 0
    return new Promise((resolve, reject) => {
        if (promiseArr.length === 0) return
        promiseArr.forEach((p, i) => {
            Promise.resolve(p).then(val => {
                resolve(val)

            }, err => {
                index++
                if (index === promiseArr.length) {
                  reject(new AggregateError('All promises were rejected'))
                }
            })
        })
    })
}
```

## 参考文档

- [原文：从零一步一步实现一个完整版的 Promise](https://juejin.im/post/5d59757f6fb9a06ae76405c6)
