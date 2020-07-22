function Promise(executor) {
  var self = this;
  // Promise 状态
  self.status = 'pending'
  // Promise 值
  self.data = undefined
  // Promise resolve 时的回调函数集
  self.onResolvedCallback = []
  // Promise reject 时的回调函数集
  self.onRejectedCallback = []

  // reslove
  function resolve(value) {
    if (value instanceof Promise) {
      value.then(resolve, reject)
      return
    }
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'fulfilled'
        self.data = value
        // 执行resolve的回调函数，将value传递到callback中
        self.onResolvedCallback.forEach(cb => cb(value))
      }
    })
  }

  // reject
  function reject(reason) {
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        // 执行reject的回调函数，将reason传递到callback中
        self.onRejectedCallback.forEach(cb => cb(reason))
      }
    })
  }

  // 执行executor并传入相应的参数
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  let then
  let thenCalledOrThrow = false
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle detected for promise!'))
    return
  }

  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(value => {
        resolvePromise(promise2, value, resolve, reject)
      }, err => {
        reject(err)
      })
    } else {
      x.then(resolve, reject)
    }
    return
  }

  if ((x !== null) && ((typeof x === 'function') || (typeof x === 'object'))) {
    try {
      then = x.then
      if (typeof then === 'function') {
        then.call(x, value => {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          resolvePromise(promise2, value, resolve, reject)
          return
        }, err => {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          reject(err)
          return
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.then = function (onResolve, onReject) {
  let self = this
  let promise2
  // 处理参数默认值
  onResolve = typeof onResolve === 'function' ? onResolve : function (value) { return value }
  onReject = typeof onReject === 'function' ? onReject : function (reason) { throw reason }
  // 等待
  if (self.status === 'pending') {
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolve(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })

      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onReject(reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })

    })
  }
  // 成功
  if (self.status === 'fulfilled') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var x = onResolve(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          // 如果出错，以捕获到的错误做为promise2的结果
          reject(error)
        }
      }, 0)
    })
  }
  // 失败
  if (self.status === 'rejected') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var x = onReject(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 0)
    })
  }
}

Promise.prototype.catch = function (onReject) {
  return this.then(null, onReject)
}

Promise.resolve = function (value) {
  return new Promise(function (resolve, reject) { resolve(value) })
}

Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) { reject(reason) })
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let values = []
    let count = 0
    promises.forEach((promise, index) => {
      promise.then(value => {
        values[index] = value
        count++
        if (count === promises.length) {
          resolve(values)
        }
      }, reject)
    })
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject)
    })
  })
}

Promise.deferred = function () {
  var defer = {}
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

try {
  module.exports = Promise
} catch (error) {
}