## debounce

```js
// 单位时间只触发一次
function debounce(fn, wait, now) {
    var timer = null
    return function() {
        var context = this;
        var args = arguments
        clearTimeout(timer)
        if (now) {
            var callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            callNow && fn.apply(context, args)
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, wait)
        }
    }
}
```

## throttle

- 单位时间内多次触发时间，只能执行一次
- step1

```js
function throttle(fn, wait) {
    var last = 0

    return function() {
        var cur = new Date()
        var context = this
        var args = arguments

        if (cur - last > wait) {
            fn && fn.apply(context, args)
            last = cur
        }
    }
}
```

- step2

```js
function throttle(fn, wait) {
    var timeout = null;
    return () => {
        var context = this;
        var args = arguments
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                fn.apply(context, args)
            }, wait)
        }
    }
}
```

- step3

```js
function throttle(fn, wait) {

    var timer, context, args, now;
    var pre = 0;

    var _throttle = function() {
        context = this;
        args = arguments;
        now = +new Date()

        var next = wait - (now - pre);

        if (next <= 0 || next > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            pre = now;
            fn.apply(context, args)
        } else if (!timer) {
            timer = setTimeout(function() {
                fn.apply(context, args)
                timer = null;
                pre = +new Date() // update
            }, next)
        }
    }
    return _throttle
}
```


## bubbleSort

```js
function bubbleSort(arr) {
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```

## quickSort

```js
function quickSort(arr) {
    if (arr.length < 1) { return arr }

    var pivot = arr.pop()
    var left = arr.filter(item => item < pivot)
    var right = arr.filter(item => item >= pivot)

    return quickSort(left).concat(pivot, quickSort(right))
}
```

## currying

```js
function currying(fn) {
    var args = []
    return function next() {
        var _args = Array.from(arguments)
        // var _args = [].slice.call(arguments)

        if (_args.length > 0) {
            args = args.concat(_args)
            return next
        } else {
            fn.apply(null, args)
        }
    }
}
```


## call

```js
Function.prototype.myCall = function() {
    var context = {}
    context.fn = this;
    var args = [...arguments].slice(1)
    var result = context.fn(...args)
    delete context.fn
    return result
}
```

## apply

```js
Function.prototype.myApply = function(context = {}) {
    context.fn = this;
    let result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    return result
}
```

## bind

```js
Function.prototype.myBind = function(obj) {

    var args = [...arguments].slice(1)

    var context = this

    var bound = function() {
        context.apply(this instanceof context ? this : obj, args.concat(...arguments))
    }

    // var Fn = function() { }
    // Fn.prototype = context.prototype
    // bound.prototype = new Fn()
    bound.prototype = Object.create(context.prototype)
    return bound
}

Function.prototype.myBind2 = function(context, ...args) {
    return () => {
        return this.call(context, ...args)
    }
}
```

## deepClone

```js
function deepClone(obj) {
    if (typeof window != 'undefined' && window.JSON) {
        return JSON.parse(JSON.stringify(obj))
    } else {
        var newObj = obj.constructor === 'Array' ? [] : {}

        for (let key in obj) {
            newObj[key] = typeof obj[key] == 'object' ? deepClone(obj[key]) : obj[key]
        }
    }
}
```

## MPromise

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MPromise(extor) {
    let that = this;

    that.status = PENDING

    that.value = undefined

    that.reason = undefined

    that.resolvedCb = []

    that.rejectedCb = []

    //

    function resolve(value) {
        if (val instanceof MPromise) {
            return value.then(resolve, reject)
        }

        setTimeout(() => {
            if (that.status == PENDING) {
                that.value = value
                that.status = RESOLVED
                that.resolvedCb.map(cb => cb(that.value))
            }
        }, 0)
    }

    //
    function reject(reason) {
        setTimeout(() => {
            if (that.status == PENDING) {
                that.reason = reason
                that.status = REJECTED
                that.rejectedCb.map(cb => cb(that.reason))
            }
        }, 0)
    }


    try {
        extor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}


MPromise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    const promise2;

    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected == 'function' ? onRejected : r => { throw r }

    if (that.status === PENDING) {
        // that.resolvedCb.push(onFulfilled)
        // that.rejectedCb.push(onRejected)
        return promise2 = new MPromise((resolve, reject) => {
            that.resolvedCb.push(function(value) {
                try {
                    var x = onFulfilled(value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })

            that.rejectedCb.push(function(reason) {
                try {
                    var x = onRejected(reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    if (that.status == RESOLVED) {
        // onFulfilled(that.value)

        return promise2 = new MPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    var x = onFulfilled(that.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0)
        })
    }
    if (that.status === REJECTED) {
        // onRejected(that.reason)

        return promise2 = new MPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    var x = onRejected(that.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0)
        })
    }
}

function resolvePromise(promise, x, resolve, reject) {
    // ...
    if (promise === x) { throw ' error' }

    if (x instanceof MPromise) {
        if (x.status == PENDING) {
            x.then(value => resolvePromise(promise, value, resolve, reject), err => reject(err))
        } else {
            x.then(resolve, reject)
        }
        return
    }

}
```

## sleep

```js
function sleep(sleepTime){
    var start=new Date().getTime();
    while(true){
        if(new Date().getTime()-start>sleepTime){
            break;
        }
    }
}

// const asyncDelay = ms => new Promise(r => setTimeout(r, ms));
```

## EventEmitter

```js
class EventEmitter {
    constructor() {
          this.events = Object.create(null);
      }
      on(name, fn) {
        if (!this.events[name]) {
            this.events[name] = []
          }
          this.events[name].push(fn);
          return this;
      }
      emit(name, ...args) {
        if (!this.events[name]) {
            return this;
        }
        const fns = this.events[name]
        fns.forEach(fn => fn.call(this, ...args))
        return this;
      }
      off(name,fn) {
        if (!this.events[name]) {
            return this;
        }
          if (!fn) {
            this.events[name] = null
            return this
          }
          const index = this.events[name].indexOf(fn);
          this.events[name].splice(index, 1);
        return this;
      }
      once(name,fn) {
        const only = () => {
          fn.apply(this, arguments);
          this.off(name, only);
        };
        this.on(name, only);
        return this;
      }
}
```

## instanceof

```js
function instanceof(l, r) {
  let proto = l.__proto__;
  let prototype = r.prototype
  while (true) {
    if (proto == null) {
      return false
    }
    if (proto == prototype) {
      return true
    }
    proto = proto.__proto__
  }
}
```

## new

```js
function _new() {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象,继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象,就直接返回,则返回 context 对象
  return typeof result === "object" && result != null ? result : context;
}
```
