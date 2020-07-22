// 获取上一个紧邻的兄弟元素
function getPreviousElement(element) {
  var ele = element;
  if (ele.perviousElementSibling) return ele.perviousElementSibling;
  do {
    ele = ele.perviousSibling;
  } while (ele && ele.nodeType !== 1);
  return ele;
}
