
function ObserverableArray() {
  return new Proxy([], {
    get(target, propKey) {
      const matArr = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
      matArr.indexOf(propKey) > -1 && console.log(propKey);
      return target[propKey]
    }
  })
}
const arr = new ObserverableArray()

arr.push('Good')
arr.unshift('Good2')
console.log(arr)

