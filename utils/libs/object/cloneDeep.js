// 对象数组的深拷贝
var objDeepCopy = function(source) {
  var sourceCopy = source instanceof Array ? [] : {};
  for (var item in source) {
    sourceCopy[item] =
      typeof source[item] === "object"
        ? objDeepCopy(source[item])
        : source[item];
  }
  return sourceCopy;
};

function isObject(obj) {
  return Object.prototype.toString.call(obj) == "[object Object]";
}

var objDeepCopy = function(obj) {
  if (!isObject(obj)) return obj;
  if (typeof window !== "undefined" && window.JSON) {
    // 浏览器环境下 并支持window.JSON 则使用 JSON
    return JSON.parse(JSON.stringify(obj));
  } else {
    var newObj = obj.constructor === Array ? [] : {};
    for (var key in obj) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
    return newObj;
  }
};
function deepClone(obj, map = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  // 判断是否是一个非对象
  if (obj == null || typeof obj != "object") return obj;

  if (map.has(obj)) {
    return map.get(obj);
  }
  let t = {};
  map.set(obj, t);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      t[key] = deepClone(obj[key], map);
    }
  }
  return t;
}
