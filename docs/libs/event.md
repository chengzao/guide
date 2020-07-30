---
title: 常见的浏览器事件封装
date: 2020-07-20
sidebar: "auto"
tags:
  - 工具函数
categories:
  - libs
---

## 获取键盘事件的键值

<CodeBlock>

<<< @/utils/libs/event/getKeyCode.js

</CodeBlock>

## onmousewheel 兼容

<CodeBlock>

<<< @/utils/libs/event/onmousewheel.js

</CodeBlock>

## 禁止选中

<CodeBlock>

<<< @/utils/libs/event/disabledSelect.js

</CodeBlock>

## requestAnimationFrame

<CodeBlock>

<<< @/utils/libs/event/requestAnimationFrame.js

</CodeBlock>

## DOMContentLoaded

<CodeBlock>

<<< @/utils/libs/event/DOMContentLoaded.js

</CodeBlock>

## 阻止冒泡

<CodeBlock>

<<< @/utils/libs/event/stopPropagation.js

</CodeBlock>

## 阻止默认事件

<CodeBlock>

<<< @/utils/libs/event/preventDefault.js

</CodeBlock>

## targetElement

<CodeBlock>

<<< @/utils/libs/event/targetEl.js

</CodeBlock>

## dispatchDOMEvent

- [dispatchDOMEvent](https://juejin.im/post/5e5f326af265da576c24d2cc#heading-10)

```js
function dispatchDOMEvent(el, payload, eventInit) {
  let event;
  if (void 0 !== Event) {
    event = new Event(type, eventInit);
  } else {
    event = document.createEvent("HTMLEvents");
    event.initEvent(type, eventInit?.bubbles, eventInit?.cancelable);
  }
  return el.dispatchEvent(event);
}
```
