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

function unique2(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var arri = arr[i];
    var isExist = false;
    for (var j = i + 1, len2 = arr.length; j < len2; j++) {
      if (arr[j] == arri) {
        isExist = true;
      }
    }
    if (!isExist) {
      result.push(arri);
    }
  }
  return result;
}

function unique3(arr) {
  var tmp = {},
    newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (!tmp[arr[i]]) {
      tmp[arr[i]] = 1;
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(unique3([55, 1, 2, 2, 33, 44, 44]))

function unique4(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  for (i = 0; i < arr.length; i++) {
    var c = arr[i];
    for (var s = i + 1; s < arr.length; s++) {
      if (arr[s] == c) {
        //debugger;
        arr.splice(s, 1);
        s--;
      }
    }
  }
  return arr;
}
console.log(unique4([5, 2, 3, 6, 8, 6, 5, 4, 7, 1, 9]).toString());


var array = [1, 1, '1', '1'];
function unique5(array) {
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

console.log(unique5(array)); // [1, "1"]
