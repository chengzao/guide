// 网页元素左上角的视口横坐标
Element.getBoundingClientRect().left
//Element.offsetLeft

// 网页元素左上角的视口纵坐标
Element.getBoundingClientRect().top
//Element.offsetTop

// 网页元素左上角的网页横坐标
Element.getBoundingClientRect().left + document.documentElement.scrollLeft
//Element.offsetLeft + document.documentElement.scrollLeft

// 网页元素左上角的网页纵坐标
Element.getBoundingClientRect().top + document.documentElement.scrollTop
//Element.offsetTop + document.documentElement.scrollTop


// 视口高度
window.innerHeight // 包括滚动条
document.documentElement.clientHeight // 不包括滚动条

// 视口宽度
window.innerWidth // 包括滚动条
document.documentElement.clientWidth // 不包括滚动条

window.outerHeight
window.outerWidth
