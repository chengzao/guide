---
title: 基本数据类型-JSON
date: 2020-07-20
sidebar: "auto"
categories:
  - frontend
---

## JSON

### JSON.stringify

- `用于将一个值转为字符串`
- `一个成员的值是undefined、函数或 XML 对象，这个成员会被过滤`



```js
var obj = {
  a: undefined,
  b: function() {}
};

JSON.stringify(obj); // "{}"
```



- `数组的成员是undefined、函数或 XML 对象,则这些值被转成null`
- `JSON.stringify方法会忽略对象的不可遍历属性`
- `第二个参数`



```js
// 接受一个数组,作为第二个参数,指定需要转成字符串的属性
var obj = {
  prop1: "value1",
  prop2: "value2",
  prop3: "value3"
};

var selectedProperties = ["prop1", "prop2"];
JSON.stringify(obj, selectedProperties);
// "{"prop1":"value1","prop2":"value2"}"

// 只对对象的属性有效,对数组无效
JSON.stringify(["a", "b"], ["0"]);
// "["a","b"]"

JSON.stringify({ 0: "a", 1: "b" }, ["0"]);
// "{"0":"a"}"
```

```js
// 接受一个函数,用来更改JSON.stringify的默认行为
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f);
// '{"a": 2,"b": 4}'
```



- `第三个参数,用于增加返回的JSON字符串的可读性`



```js
JSON.stringify({ p1: 1, p2: 2 }, null, 2);
JSON.stringify({ p1: 1, p2: 2 }, null, "|-");
```



### JSON.parse

- `用于将JSON字符串转化成对象`



```js
JSON.parse("{}"); // {}
JSON.parse("true"); // true
JSON.parse('"foo"'); // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse("null"); // null

var o = JSON.parse('{"name": "张三"}');
o.name; // 张三
```



- 实现一个 JSON.stringify

```js
function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object") {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [];
    let arr = Array.isArray(obj);
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}
console.log(jsonStringify({ x: 5 })); // "{"x":5}"
console.log(jsonStringify([1, "false", false])); // "[1,"false",false]"
console.log(jsonStringify({ b: undefined })); // "{"b":"undefined"}"
```

- 实现一个 JSON.parse

```js
var jsonStr = '{ "age": 20, "name": "jack" }';
var json = new Function("return " + jsonStr)();
console.log(json);
```
