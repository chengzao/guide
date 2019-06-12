// 判断浏览器标识
(function getMobileDevice(window) {
  var ua = navigator.userAgent;
  var mobile = /AppleWebKit.*Mobile.*/.test(ua) || /AppleWebKit/.test(ua); // 是否为移动终端
  var ios = /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua); // ios终端
  var android = /(Android);?[\s\/]+([\d.]+)?/.test(ua); // android终端或者uc浏览器
  var iphone = /iphone/i.test(ua); // iphone
  var iPad = /iPad/i.test(ua); // ipad
  var weixin = /micromessenger/i.test(ua); // weixin
  var chrome = /Chrome\/([\d.]+)/.test(ua) || /CriOS\/([\d.]+)/.test(ua); // Chrome
  var mozilla = ua.indexOf("Gecko") > -1 && ua.indexOf("KHTML") == -1; // 火狐内核
  var webkit = /AppleWebKit/i.test(ua); // 苹果、谷歌内核
  var opera = /Presto/i.test(ua); // opera内核
  var safari = /safari/i.test(ua) && !/Chrome/i.test(ua); // 苹果浏览器
  var msie = /msie/i.test(ua); // 微软
  window.device = {
    isMobile: mobile,
    isIos: ios,
    isAndroid: android,
    isIPhone: iphone,
    isIPad: iPad,
    isWeiXin: weixin,
    isChrome: chrome,
    isMozilla: mozilla,
    isWebkit: webkit,
    isOpera: opera,
    isSafari: safari,
    isMsie: msie
  };
})(window);

let url = navigator.userAgent.toLowerCase();
//使用toLowerCase将字符串全部转为小写 方便我们判断使用
if (url.indexOf("15b202 qq") > -1) {
  //单独判断QQ内置浏览器
  alert("QQ APP 内置浏览器，做你想做的操作");
}
if (url.indexOf("micromessenger") > -1) {
  //单独判断微信内置浏览器
  alert("微信内置浏览器，做你想做的操作");
}
if (url.indexOf("15b202") > -1) {
  //判断微信内置浏览器，QQ内置浏览器
  alert("QQ和微信内置浏览器，做你想做的操作");
}
