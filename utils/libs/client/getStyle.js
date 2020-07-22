//window.getComputedStyle(element,伪元素)["属性名"]
// 第二个参数：
//    表示指定节点的伪元素（比如:before、:after、:first-line、:first-letter等）
var result = window.getComputedStyle(div, ':before');
// 一般情况下没有伪元素,我们用 null 来替代.
window.getComputedStyle(demo, null)["left"]

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr]; //ie678
  } else {
    return getComputedStyle(obj, null)[attr]; //正常浏览器
  }
}
