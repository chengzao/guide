// 正常浏览器（包括IE9+）
window.innerWidth
// 标准模式
document.documentElement.clientWidth
// 怪异模式
document.body.clientWidth

// client 兼容写法
function client() {
  if (window.innerWidth != null) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
    // document.compatMode 用来判断当前浏览器采用的渲染方式
  } else if (document.compatMode == "CSS1Compat") {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  }
}
