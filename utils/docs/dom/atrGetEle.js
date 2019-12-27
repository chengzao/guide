// 根据属性得到具体元素
function atrGetEle(ele, attr, value) {
  var aElements = document.getElementsByTagName(ele);
  var aEle = [];
  for (var i = 0; i < aElements.length; i++) {
    if (aElements[i].getAttribute(attr) == value)
      aEle.push(aElements[i]);
  }
  return aEle;
}
