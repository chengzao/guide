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
