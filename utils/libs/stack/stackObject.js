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
