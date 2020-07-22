// 获取下一个紧邻的兄弟元素
function getNextElement(element) {
  var ele = element;
  if (ele.nextElementSibling) return ele.nextElementSibling;
  do {
    ele = ele.nextSibling;
  } while (ele && ele.nodeType !== 1);
  return ele;
}

