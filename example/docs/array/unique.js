function unique(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var arri = arr[i];
    if (result.indexOf(arri) < 0) {
      result.push(arri);
    }

  }
  return result;
}

function unique(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1)
        len--;
        j--
      }
    }
  }
  return arr
}

function unique(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

function unique(arr) {
  return [...new Set(arr)]
}

function unique(arr) {
  var obj = []
  return arr.filter(item => {
    console.log(obj);
    return obj.hasOwnProperty(typeof item + item) ?
      false : (obj[typeof item + item] = true)
  })
}

function unique(array) {
  // res用来存储结果
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break;
      }
    }
    // 如果array[i]是唯一的，那么执行完循环，j等于resLen
    if (j === resLen) {
      res.push(array[i])
    }
  }
  return res;
}

