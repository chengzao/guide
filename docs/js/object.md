# 对象

## 原型链相关方法

### `create`

- `Object.create()`
- 该方法可以指定原型对象和属性，返回一个新的对象

<CodeBlock>

```js
Object._create = function(o){
    if(!Object.create){
        Object.prototype.create =function(o){
           var F =  function() {};
            F.prototype = o;
            return new F();
        }
    }
}
```

</CodeBlock>

### `getPrototypeOf`

- `Object.getPrototypeOf()`
- 获取对象的Prototype对象

### `assign`

- `Object.assign(target, ...sources)`
- 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
- 不会跳过那些值为 null 或 undefined 的源对象

## 实例方法

### `valueOf`

- `Object.prototype.valueOf()`
- 返回当前对象对应的值

### `toString`

- `Object.prototype.toString()`
- 返回对象的类型字符串，因此可以用来判断一个值的类型

### `toLocaleString`

- `Object.prototype.toLocaleString()`
- 返回当前对象对应的本地字符串形式

### `hasOwnProperty`

- `Object.prototype.hasOwnProperty(string): boolean`
- 判断某个属性是否为当前对象自身的属性,`true`为自身属性，`false`为继承属性

### `isPrototypeOf`

- `Object.prototype.isPrototypeOf()`
- 判断当前对象是否为另一个对象的原型

- 代码1

```js
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

- 代码2

```js
var human = {mortal: true}
var socrates = Object.create(human);
human.isPrototypeOf(socrates); //=> true
socrates instanceof human; //=> ER
```

### `propertyIsEnumerable`

- `Object.prototype.propertyIsEnumerable()`
- 判断某个属性是否可枚举

### `__proto__`

- `Object.prototype.__proto__`
- 返回该对象的原型。该属性可读写
- `__proto__`兼容

<CodeBlock>

<<< @/utils/docs/object/proto.js

</CodeBlock>

## 控制对象状态的方法

### `preventExtensions`

- `Object.preventExtensions()`
- 防止对象扩展

### `isExtensible`

- `Object.isExtensible()`
- 判断对象是否可扩展

### `seal`

- `Object.seal()`
- 禁止对象配置

### `isSealed`

- `Object.isSealed()`
- 判断一个对象是否可配置

### `freeze`

- `Object.freeze()`
- 冻结一个对象

### `isFrozen`

- `Object.isFrozen()`
- 判断一个对象是否被冻结

## `in`运算符和`for in`循环

### `in`

- 运算符常用于检查一个属性是否存在

### `for..in`

- 获得对象的所有可遍历属性（不管是自身的还是继承的）

## 遍历对象

### `getOwnPropertyNames`

- `Object.getOwnPropertyNames()`
- 参数是一个对象，返回一个数组;
- 返回不可枚举的属性名

### `keys`

- `Object.keys(option)`

- 参数是一个对象，返回一个数组;
- 只返回可枚举的属性

## 对象属性模型相关方法

### `getOwnPropertyDescriptor`

- `Object.getOwnPropertyDescriptor()`
- 获取某个属性的描述对象
- 第一个参数是一个对象
- 第二个参数是一个字符串，对应该对象的某个属性名

### `defineProperty`

- `Object.defineProperty()`
- 通过描述对象，定义某个属性
- `Object.defineProperty(object, propertyName, attributesObject)`
- `object`: 属性所在的对象
- `propertyName`: 属性名（它应该是一个字符串）
- `attributesObject`: 属性描述对象
- 注意，一旦定义了取值函数`get`（或存值函数`set`），就不能将`writable`属性设为`true`，或者同时定义`value`属性，否则会报错

### `defineProperties`

- `Object.defineProperties()`
- 通过描述对象，定义多个属性

## 属性描述对象

### `value`

- 该属性的属性值，默认为`undefined`

### `writable`

- 布尔值，表示属性值（`value`）是否可改变（即是否可写）. 默认为`true`

### `enumerable`

- 布尔值，表示该属性是否可遍历
- 默认为`true`
- 设为`false`，`for...in`循环、`Object.keys()`会跳过该属性

### `configurable`

- 布尔值，表示可配置性
- 默认为`true`
- 设为`false`,无法删除该属性，不能改变该描述对象（`value`属性除外）

### `get`

- 一个函数，表示该属性的取值函数（`getter`），默认为`undefined`

### `set`

- 一个函数，表示该属性的存值函数（`setter`），默认为`undefined`
