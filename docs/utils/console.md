# console调试

## log

- 常见的占位符
  - `%o` (这是字母o，不是0)，它接受对象，
  - `%s` 接受字符串，
  - `%d` 表示小数或整数

```js
console.log('I like %s but I do not like %s.', 'Skittles', 'pus');

> I like Skittles but I do not like pus.
```

## dir

- 查看 DOM 结构对象

```js
let ele = document.body;
console.dir(ele)
```

## warn

- 警告

## table

- 显示表格数据

## assert

- 对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台

```js
var arr = [1, 2, 3];
console.assert(arr.length === 4);
```

## `count()`

- 计数器

```js
for(let i = 0; i < 10; i++) {
  if(i % 2) {
    console.count('odds');
  }
}
```

## `countReset()`

- 重置计数器

## `time()`

## `timeEnd()`

## group

## 开发控制台选择DOM元素

- `$('body')`

## 将浏览器转换为编辑器

- `document.body.contentEditable=true`

## 查找与DOM中的元素关联的事件

- 需要查找 DOM 中某个元素的事件侦听器感时，谷歌控制台了 `getEventListeners`使找到这些事件更加容易且直观

```js
getEventListeners($('.selector'))

// 找到特定事件的侦听器
getEventListeners($('selector')).eventName[0].listener
```

## 监控事件

- `monitorEvents($(‘selector’))` 将监视与选择器的元素关联的所有事件，然后在它们被触发时将它们打印到控制台。例如，`monitore($(#firstName))` 将打印 ID 为 `firstName`元素的所有事件

- `monitorEvents($(‘selector’),’eventName’)` 将打印与元素绑定的特定事件。 你可以将事件名称作为参数传递给函数。 这将仅记录绑定到特定元素的特定事件。 例如，`monitorEvents($(‘#firstName’),’click’)` 将打印绑定到ID为`firstName`的元素的所有 `click` 事件

- `monitore($(selector)，[eventName1, eventName3'， .])`将根据您自己的需求记录多个事件。与其传递单个事件名作为参数，不如传递包含所有事件的字符串数组。例如`monitore($(#firstName)，[click, focus])`将记录与ID `firstName元素绑定的` `click`事件和`focus`事件

- `unmonitorevent ($(selector))`:这将停止监视和打印控制台中的事件

## 检查 DOM 中的一个元素

- `inspect($(‘selector’))` 将检查与选择器匹配的元素，并转到 Chrome Developer Tools中的 Elements 选项卡。 例如， `inspect($(‘#firstName’))` 将检查 ID为'firstName' 的元素，`spect($('a')[3])` 将检查 DOM 中的第 4 个 a 元素

- `$0, $1, $2` 等可以帮助你获取最近检查过的元素。 例如，``表示最后检查的 DOM 元素，而$1 倒数第二个检查的 DOM 元素

## 检索最后一个结果的值

- `$_`

## 清除控制台和内存

- `clear()`
