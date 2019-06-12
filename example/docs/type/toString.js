const _toString = Object.prototype.toString

var obj = {}

obj.toString()  // [object Object]
_toString.call(obj) // [object Object]

obj.toString = () => '111'

obj.toString()  // 111
_toString.call(obj) // [object Object]

  (/hello/).toString() // /hello/
_toString.call(/hello/) // [object RegExp]
