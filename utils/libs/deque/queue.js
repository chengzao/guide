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
