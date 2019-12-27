# 判断类型标识

[[toc]]

## typeof 类型判断

<<< @/utils/docs/type/typeOf.js

## eqeqeq

<<< @/utils/docs/type/eqeqeq.js

## 判断类型

- `typeof` 判断类型
- `Object.prototype.toString.call(obj).slice(8,-1);` 判断类型
- `(obj).constructor.name.toString().toLowerCase()` `obj != null || obj != undefined`除外
- `Array.isArray()` 确定传递的值是否是一个 `Array`
- `isNaN(testValue)` 用来确定一个值是否为`NaN`
- `Object.is(value1, value2);` 判断两个值是否是相同的值
- `object instanceof constructor` 检测 `constructor.prototype` 是否存在于参数 `object` 的原型链

<CodeBlock>

<<< @/utils/docs/type/instanceof.js

</CodeBlock>

- `obj.hasOwnProperty(prop)` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性

<CodeBlock>

<<< @/utils/docs/type/hasOwnProperty.js

</CodeBlock>

<CodeBlock title="Object.prototype.toString.call >>">

<<< @/utils/docs/type/Object.prototype.toString.call.js

</CodeBlock>

## toRawType

- Object.prototype.toString.call(arg) 和 String(arg) 的区别？

<CodeBlock>

<<< @/utils/docs/type/toString.js

</CodeBlock>

- toRawType

<CodeBlock>

<<< @/utils/docs/type/toRawType.js

</CodeBlock>

## 浏览器标识

<CodeBlock>

<<< @/utils/docs/type/getMobileDevice.js

</CodeBlock>

## 判断浏览器平台

<CodeBlock>

<<< @/utils/docs/type/checkPlatform.js

</CodeBlock>

## BrowserInfo

<CodeBlock>

<<< @/utils/docs/type/browserInfo.js

</CodeBlock>
