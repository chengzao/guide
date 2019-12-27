// 数组方法生成倒装的新字符串与原字符串对比
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  return (
    Array.from(str)
      .reverse()
      .join('') === str
  );
}

// 倒序循环生成新字符串与原字符串对比
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  var newStr = '';
  for (var i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return str1 === str;
}

// 以中间点为基点，从头至中与从尾至中逐一字符串进行对比，若有一个不同，则 return false
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

