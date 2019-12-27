// 获取第一个子元素
function getFirstElement(parent) {
  if (parent.firstElementChild) return parent.firstElementChild;
  var ele = parent.firstChild;
  while (ele && ele.nodeType !== 1) ele = ele.nextSibling;
  return ele;
}
