// 获取所有兄弟元素
function getAllSibling(ele) {
  if (!ele) return null;
  var elements = [];
  var el = ele.previousSibling;
  while (el) {
    if (el.nodeType === 1)
      elements.push(el);
    el = el.previousSibling;
  }
  el = element.nextSibling;
  while (el) {
    if (el.nodeType === 1)
      elements.push(el);
    el = el.nextSibling;
  }
  return elements;
}

// 查找所有兄弟节点
function siblings(elm) {
  var a = [];
  var p = elm.parentNode.children;
  for (var i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== elm) {
      a.push(p[i]);
    }
    return a;
  }
}
