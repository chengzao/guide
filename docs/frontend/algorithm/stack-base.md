---
title: 栈与队列
date: 2022-03-18
sidebar: "auto"
autoSort: 886
tags:
  - stack
  - queue
categories:
  - frontend
---

## 栈（Stack）

先进后出（First In Last Out）

### 栈-数组

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

### 栈-对象

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

## 队列（Queue）

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

## 用栈实现队列

- 代码实现 [leetcode 232](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

```js
var MyQueue = function() {
    this.stack1 = []
    this.stack2 = []
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stack1.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if(!this.stack2.length){
        while(this.stack1.length){
            this.stack2.push(this.stack1.pop())
        }
    }
    return this.stack2.pop()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if(!this.stack2.length){
        while(this.stack1.length){
            this.stack2.push(this.stack1.pop())
        }
    }
    return this.stack2[this.stack2.length-1]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stack1.length == 0 && this.stack2.length == 0
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

## 用队列实现栈

- 代码实现 [leetcode 225](https://leetcode-cn.com/problems/implement-stack-using-queues/)

```js
var MyStack = function() {
    this.queue1 = [];
    this.queue2 = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    this.queue1.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
    // 减少两个队列交换的次数， 只有当queue1为空时，交换两个队列
    if(!this.queue1.length) {
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
    }
    while(this.queue1.length > 1) {
        this.queue2.push(this.queue1.shift());
    }
    return this.queue1.shift();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
    const x = this.pop();
    this.queue1.push(x);
    return x;
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return !this.queue1.length && !this.queue2.length;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
```

- 使用一个队列实现 [leetcode题解地址](https://leetcode-cn.com/problems/implement-stack-using-queues/solution/225-yong-dui-lie-shi-xian-zhan-liang-ge-dui-lie-sh/)

```js
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
    this.queue = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    this.queue.push(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
    let size = this.queue.length;
    while(size-- > 1) {
        this.queue.push(this.queue.shift());
    }
    return this.queue.shift();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
    const x = this.pop();
    this.queue.push(x);
    return x;
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return !this.queue.length;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
```
