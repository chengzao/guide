// 对象数组的深拷贝
var objDeepCopy = function (source) {
  var sourceCopy = source instanceof Array ? [] : {};
  for (var item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
  }
  return sourceCopy;
}


var objDeepCopy = function (obj) {
  if (typeof obj !== 'object') return obj;
  if (typeof window !== 'undefined' && window.JSON) { // 浏览器环境下 并支持window.JSON 则使用 JSON
    return JSON.parse(JSON.stringify(obj));
  } else {
    var newObj = obj.constructor === Array ? [] : {};
    for (var key in obj) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
    return newObj;
  }
}


const deepClone = function (target) {
  if (typeof target !== 'object') {
    throw new TypeError('arguments must be a Object!')
  }
  // 已经访问过的对象集合
  const visitedObjs = []
  // 克隆的对象集合
  const clonedObjs = []
  const clone = function (source) {
    if (visitedObjs.indexOf(source) === -1) { // 这里是判断该原对象是否被访问过
      visitedObjs.push(source) // 放入数组中
      const obj = {} // 创建一个待克隆的新对象
      // 设置原型
      const prototype = Reflect.getPrototypeOf(source)
      Reflect.setPrototypeOf(obj, prototype)
      clonedObjs.push(obj); // 将其置入克隆对象集合中
      // 设置属性
      Reflect.ownKeys(source).forEach((key) => {
        const value = source[key]
        try {
          const Constructor = Reflect.getPrototypeOf(value).constructor
          if (Constructor === Date || Constructor === RegExp) {
            obj[key] = new Constructor(value.valueOf())
          } else {
            obj[key] = clone(value) // 此处不能再递归调用 deepClone，而是要改为 clone 方法
          }
        } catch (e) {
          obj[key] = value
        }
      })
      return obj
    } else {
      // 如果该对象已经被访问过了，则直接从克隆对象中返回。返回的对象的索引是 source 在 visitedObjs 中的索引位置。
      return clonedObjs[visitedObjs.indexOf(source)]
    }
  }
  return clone(target)
}
