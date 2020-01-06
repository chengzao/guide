# currying

- 逐步接收参数，并缓存供后期计算使用
- 不立即计算，延后执行
- 符合计算的条件，将缓存的参数，统一传递给执行方法

## currying 柯里化

<CodeBlock>

<<< @/utils/docs/array/currying.js

</CodeBlock>

## currying 扩展

```js
function currying(fn) {
  var allArgs = [];

  function next() {
    var args = [].slice.call(arguments);
    allArgs = allArgs.concat(args);
    return next;
  }
  // 隐式调用valueOf和toString方法
  // 字符类型
  next.toString = function() {
    return fn.apply(null, allArgs);
  };
  // 数值类型
  next.valueOf = function() {
    return fn.apply(null, allArgs);
  };

  return next;
}
var add = currying(function() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
});

add(1, 2, 3)(4)(5);
```

- es6

```js
const curry = (fn, arr = []) => (...args) => (
  arg => arg.length === fn.length
    ? fn(...arg)
    : curry(fn, arg)
)([...arr, ...args])

let curryTest=curry((a,b,c,d)=>a+b+c+d)
curryTest(1,2,3)(4) //返回10
curryTest(1,2)(4)(3) //返回10
curryTest(1,2)(3,4) //返回10
```

## 反柯里化

- 示例1

```js
function Toast(option) {
  this.prompt = "";
}
Toast.prototype = {
  constructor: Toast,
  show: function() {
    console.log(this.prompt);
  }
};

// 新对象
var obj = {
  prompt: "新对象"
};

// 反柯里化
function unCurrying(fn) {
  return function() {
    var args = [].slice.call(arguments);
    var that = args.shift();
    return fn.apply(that, args);
  };
}

var objShow = unCurrying(Toast.prototype.show);
objShow(obj); // => "新对象"
```

- 示例2

```js
function Toast(option) {
  this.prompt = "";
}
Toast.prototype = {
  constructor: Toast,
  show: function() {
    console.log(this.prompt);
  }
};

// 新对象
var obj = {
  prompt: "新对象"
};

function unCurrying(fn){
    return function(){
        var args = [].slice.call(arguments);
        var that = args.shift();
        return fn.apply(that, args);
    }
}

var objShow = unCurrying(Toast.prototype.show);
objShow(obj); // => "新对象"
```

- 示例3

```js
function nodeListen(node, eventName) {
  return function(fn) {
    node.addEventListener(
      eventName,
      function() {
        fn.apply(this, Array.prototype.slice.call(arguments));
      },
      false
    );
  };
}
// example
var bodyClickListen = nodeListen(document.body, "click");
bodyClickListen(function() {
  console.log("first listen");
});

bodyClickListen(function() {
  console.log("second listen");
});
```
