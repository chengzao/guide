function cached(fn) {
  const cache = Object.create(null)
  return function cachedFn(str) {
    if (!cache[str]) {
      cache[str] = fn(str)
    }
    return cache[str]
  }
}
// test
var cachedComputed = cached(computed)
cachedComputed('ss')
// 打印2000s have passed
cachedComputed('ss')
// 不再打印
