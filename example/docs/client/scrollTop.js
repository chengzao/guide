// 正常浏览器（除了ie678之外的浏览器）
window.pageYOffset
// 已经声明DTD（标准模式）
document.documentElement.scrollTop
// 未声明 DTD（怪异模式）
document.body.scrollTop

//页面滚动座标onscroll
//scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
function scroll() {
    if (window.pageYOffset != null) {
        //正常浏览器
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else if (document.compatMode == "CSS1Compat") {
        //有DTD的网页
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    } else {
        //没有DTD的
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        }
    }
}
