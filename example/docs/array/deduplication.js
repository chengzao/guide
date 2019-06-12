function deduplication(str) {

  var json = {};
  //将存在字符的加入到json中；
  for (var i = 0; i < str.length; i++) {
    if (!json[str.charAt(i)]) {
      json[str.charAt(i)] = 1;
    } else {
      json[str.charAt(i)]++;
    }
  }

  //遍历json对象。比较json[key]的value值大小
  var iMax = 0;
  var iIndex = "";
  var str = '';
  for (var j in json) {
    str += j
    if (json[j] > iMax) {
      iMax = json[j];
      iIndex = j;
    }
  }
  console.log('去重后的为: ' + str);
  console.log('出现次数最多的是: ' + iIndex + " 出现了: " + iMax);
}
var str = 'asdfssmmmaaasasasasaa';
deduplication(str);
