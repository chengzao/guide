var calendarLink = {
  // 插入script标签
  createSrc: function (url) {
    var scrEle = document.createElement("script");
    scrEle.src = url;
    document.body.appendChild(scrEle);
  },
  // 插入样式表
  createStyle: function (url) {
    var scrEle = document.createElement("link");
    scrEle.rel = "stylesheet";
    scrEle.href = url;
    document.head.appendChild(scrEle);
  },
  on: function (url) {
    if (!url) {
      return false;
    }
    if (window.addEventListener)
      window.addEventListener("load", this.createSrc.bind(this, url), false);
    else if (window.attachEvent)
      window.attachEvent("onload", this.createSrc.bind(this, url));
    else window.onload = this.createSrc.bind(this, url);
  },
  removeDom: function () {
    var reSrc = document.querySelector('#appendEle');
    reSrc.parentNode.removeChild(reSrc);
  },
}


//
Function.prototype.before = function (beforefn) {
  let _self = this; // 缓存原函数的引用
  return function () { // 代理函数
    beforefn.apply(this, arguments); // 执行前置函数
    return _self.apply(this, arguments); // 执行原函数
  }
}

Function.prototype.after = function (afterfn) {
  let _self = this;
  return function () {
    let set = _self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return set;
  }
}

let func = () => console.log('func');
func = func.before(() => {
  console.log('===before===');
}).after(() => {
  console.log('===after===');
});

func();
// ===before===
// func
// ===after===
