---
title: 栈/队列/链表
date: 2021-01-11
sidebar: "auto"
autoSort: 888
tags:
  - stack
  - queue
categories:
  - frontend
---


## 栈

先进后出（First In Last Out）

### stack Array



```js
//栈：First In Last out
const _stackItem = Symbol("stack array");
export default class Stack {
  constructor() {
    // 存储栈元素
    this[_stackItem] = [];
  }
  // 添加一个栈顶元素
  push(value) {
    this[_stackItem].push(value);
  }
  // 移除栈顶元素, 并返回
  pop() {
    return this[_stackItem].pop();
  }
  // 返回栈顶元素
  peek() {
    const len = this[_stackItem].length;
    return this[_stackItem][len - 1];
  }
  // 判断栈是否为空
  isEmpty() {
    return this[_stackItem].length === 0;
  }
  // 清空栈
  clear() {
    this[_stackItem] = [];
  }
  // 返回栈里的元素个数
  size() {
    return this[_stackItem].length;
  }
}

// var stack = new Stack();

// stack.push(110);
// stack.push(120);

// console.log(stack.clear());
// console.log(stack.isEmpty());
```



### stack Object



```js
//栈：First In Last out
const _stackItem = Symbol('stack object')
export default class Stack{
  constructor(){
    this[_stackItem] = {}
    this.index = 0
  }

  // 添加一个栈顶元素
  push(value){
    this[_stackItem][this.index] = value;
    this.index++;
  }
  // 移除栈顶元素, 并返回
  pop(){
    if(this.isEmpty()){
      return undefined
    }
    this.index --;
    const result = this[_stackItem][this.index]
    delete this[_stackItem][this.index]
    return result;
  }
  // 返回栈顶元素
  peek(){
    if(this.isEmpty()){
      return undefined
    }
    return this[_stackItem][this.index-1]
  }
  // 判断栈是否为空
  isEmpty(){
    return this.index === 0
  }
  // 清空栈
  clear(){
    this[_stackItem] = {}
    this.index = 0
  }
  // 返回栈里的元素个数
  size(){
    return this.index;
  }

  toString(){
    if(this.isEmpty()){
      return ''
    }
    let str = `${this[_stackItem][0]}`
    for(let i=1; i< this.index; i++){
      str = `${str}, ${this[_stackItem][i]}`
    }
    return str
  }
}

var stack = new Stack()

stack.push(110)
stack.push(120)

console.log(stack.size())
```



## 队列

### 普通队列

先进先出 (First In First Out)



```js
// 队列：first in first out
export default class Queue {
  constructor() {
    this.count=0; // 记录数据大小
    this.lowestCount=0 // 第一个元素
    this.items = {}
  }

  add(value) {
    this.items[this.count] = value;
    this.count ++;
  }

  remove() {
    if(this.isEmpty()){
      return undefined
    }
    const result = this.items[this.count]
    delete this.items[this.count]
    this.lowestCount++
    return result
  }

  peek() {
    if(this.isEmpty()){
      return undefined
    }

    return this.items[this.lowestCount];
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  size() {
    return this.count - this.lowestCount
  }

  toString() {
    if(this.isEmpty()){
      return ''
    }

    let str = `${this.items[this.lowestCount]}`
    for(let i=this.lowestCount+1; i<this.count; i++){
      str = `${str}, ${this.items[i]}`
    }
    return str
  }
}


// const queue = new Queue()
// queue.add(12)
// queue.add(23)
// console.log(queue.toString())
```



### 双端队列



```js
// 双端队列
export default class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(value) {
    if(this.isEmpty()){
      this.addBack(value)
    }else if(this.lowestCount > 0){
      this.lowestCount --;
      this.items[this.lowestCount] = value;
    }else{
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.items[0] = value;
    }
  }

  addBack(value) {
    this.items[this.count] = value;
    this.count ++
  }

  removeFront() {
    if(this.isEmpty()){
      return void 0
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount ++
    return result;
  }

  removeBack() {
    if(this.isEmpty()){
      return void 0
    }
    this.count --;
    const result = this.items[this.count];
    delete this.items[this.count]
    return result;
  }

  peekFront() {
    if(this.isEmpty()){
      return void 0
    }

    return this.items[this.lowestCount]
  }

  peekBack() {
    if(this.isEmpty()){
      return void 0
    }
    return this.items[this.count-1]
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if(this.isEmpty()){
      return ''
    }

    let str = `${this.items[this.lowestCount]}`

    for(let i=this.lowestCount+1; i<this.count; i++){
      str = `${str}, ${this.items[i]}`
    }
    return str;
  }
}

// const deque = new Deque()
// deque.addBack(12);
// deque.addBack(21);

// deque.addFront(45)
// console.log(deque)
```



## 链表

### 单链表



```js
export function defaultEquals(a, b) {
  return a === b;
}

export class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = undefined;
  }

  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      // catches null && undefined
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count;
  }

  getHead() {
    return this.head;
  }

  clear() {
    this.head = undefined;
    this.count = 0;
  }

  toString() {
    if (this.head == null) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
```



### 双链表

- linkedList.js

```js
export function defaultEquals(a, b) {
  return a === b;
}

export class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = undefined;
  }

  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      // catches null && undefined
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count;
  }

  getHead() {
    return this.head;
  }

  clear() {
    this.head = undefined;
    this.count = 0;
  }

  toString() {
    if (this.head == null) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
```



```js
import LinkedList,{defaultEquals, Node} from './linkedList.js';

class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

export default class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }

  push(element) {
    const node = new DoublyNode(element);
    if (this.head == null) {
      this.head = node;
      this.tail = node; // NEW
    } else {
      // attach to the tail node // NEW
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.count++;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) { // NEW
          this.head = node;
          this.tail = node; // NEW
        } else {
          node.next = this.head;
          this.head.prev = node; // NEW
          this.head = node;
        }
      } else if (index === this.count) { // last item NEW
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node; // NEW
        node.prev = previous; // NEW
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = this.head.next;
        // if there is only one item, then we update tail as well //NEW
        if (this.count === 1) {
          // {2}
          this.tail = undefined;
        } else {
          this.head.prev = undefined;
        }
      } else if (index === this.count - 1) {
        // last item //NEW
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = undefined;
      } else {
        current = this.getElementAt(index);
        const previous = current.prev;
        // link previous with current's next - skip it to remove
        previous.next = current.next;
        current.next.prev = previous; // NEW
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  indexOf(element) {
    let current = this.head;
    let index = 0;
    while (current != null) {
      if (this.equalsFn(element, current.element)) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  clear() {
    super.clear();
    this.tail = undefined;
  }

  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    while (current != null) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }

  inverseToString() {
    if (this.tail == null) {
      return '';
    }
    let objString = `${this.tail.element}`;
    let previous = this.tail.prev;
    while (previous != null) {
      objString = `${objString},${previous.element}`;
      previous = previous.prev;
    }
    return objString;
  }
}
```


