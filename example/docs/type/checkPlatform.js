var tools = {
  isMobile() {
    var isMobile = false
    // 判断是pc还是移动端
    var system = {
      win: false,
      mac: false,
      x11: false,
    }
    // 检测平台
    var p = navigator.platform
    system.win = p.indexOf('Win') === 0
    system.mac = p.indexOf('Mac') === 0
    system.x11 = p === 'X11'

    system.ipad = p === 'iPad'

    // 跳转语句
    if (!system.win && !system.mac && !system.x11 && !system.ipad) {
      isMobile = true
    }
    return isMobile
  },
  // 判断是否是移动端
  checkPlatform() {
    var utils = {}
    var isBudge = (function () {
      // 手持设备：ipad、iphone、android、ipod
      return /mobile/i.test(navigator.userAgent)
    })()
    var isMac = (function () {
      return /macintosh/i.test(navigator.userAgent)
    })()
    var isWindows = (function () {
      return /windows nt/i.test(navigator.userAgent)
    })()
    var isLinux = (function () {
      return /linux/i.test(navigator.userAgent)
    })()
    var isIpad = (function () {
      return /ipad/i.test(navigator.userAgent)
    })()
    utils.isMobile = !(isWindows || isMac || (isLinux && !isBudge) || isIpad)
    return utils
  },
}
