//获取类名ClassName
function getClassName(str) {
  //为了火狐和谷歌及IE9-11
  if (document.getElementsByClassName) {
    return document.getElementsByClassName(str);
  }
  //获取所有标签节点(数组)
  var allNodes = document.getElementsByTagName("*");
  //定义数组(哪个标签满足我的需求，就把他push到arr中，最后返回)
  var arr = [];
  //遍历数组（所有标签的数组）
  for (var i = 0; i < allNodes.length; i++) {
    //把类名变成数组
    var arrClassName = allNodes[i].className.split(" ");
    //遍历数组中所有的元素（遍历数组中所有的元素用的）
    for (var j = 0; j < arrClassName.length; j++) {
      //在判断，如果Class属性值是传过来的值。放进数组。
      if (arrClassName[j] == str) {
        arr.push(aarrClassName[j]);
      }
    }
  }
  return arr;
}
