// 获取最后一个子元素
function getLastElement(parent) {
  if (parent.LastElementChild) return parent.LastElementChild;
  var ele = parent.lastChild;
  while (ele && ele.nodeType !== 1) ele = ele.perviousSibling;
  return ele;
}
