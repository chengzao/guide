typeof undefined   //return undefined
typeof 1   //return number
typeof ' ni '   //return string
typeof Function   //return function
typeof Symbol   //return function
typeof []   //return object
typeof null   //return object
typeof {}   //return object
typeof RegExp   //return function
typeof new RegExp()   //return object
typeof Math   //return object
typeof Date   //return function
typeof new Date()   //return object
typeof JSON   //return object

function isType(data, type) {
  const typeObj = {
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object Null]': 'null',
    '[object Undefined]': 'undefined',
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Function]': 'function',
    '[object Date]': 'date', // Object.prototype.toString.call(new Date())
    '[object RegExp]': 'regExp',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
    '[object WeakMap]': 'weakMap',
    '[object Window]': 'window',  // Object.prototype.toString.call(window)
    '[object Error]': 'error', // new Error('1')
    '[object Arguments]': 'arguments',
    '[object BigInt]': 'BigInt',
    '[object Symbol]': 'Symbol'
  }
  let name = Object.prototype.toString.call(data) // 借用Object.prototype.toString()获取数据类型
  let typeName = typeObj[name] || '未知类型' // 匹配数据类型
  return typeName === type // 判断该数据类型是否为传入的类型
}
console.log(
  isType({}, 'object'), // true
  isType([], 'array'), // true
  isType(new Date(), 'object'), // false
  isType(new Date(), 'date'), // true
)
