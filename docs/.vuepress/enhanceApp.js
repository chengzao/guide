// 全局注册 Element 组件库
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

export default ({
  Vue,
  options, // 附加到根实例的一些选项
  router,
  isServer,
  siteData, // 站点元数据
}) => {
  // Vue.use(Element)
  // console.log(siteData)
  // 自动跳转到web页面
  // router.beforeEach((to, from, next) => {
  //   if (to.path === "/") {
  //     router.push("/web/");
  //   } else {
  //     next();
  //   }
  // });

  function insertBtn() {
    var el = document.createElement("span");
    el.className = "collapse-sidebar-btn";
    el.title = "收起侧边栏";

    window.onload = function () {
      var app = document.getElementById("app");
      if (!app) return;
      var btn = app.querySelector("collapse-sidebar-btn");
      if (btn) {
        return;
      }
      app.appendChild(el);
      el.onclick = function () {
        var page = app.querySelector("main.page");
        if (!page) return;
        var sidebar = app.querySelector("aside.sidebar");
        var container = app.querySelector(".theme-container");
        if (sidebar) {
          container.classList.toggle("no-sidebar");
        }
      };
    };
  }

  router.beforeEach((to, from, next) => {
    if (!isServer) {
      insertBtn();
      (function (w, doc, l) {
        if (w[l]) {
          return w[l];
        } else {
          var body = doc.querySelector("body");
          var sc = doc.createElement("noscript");
          var ifr = doc.createElement("iframe");
          ifr.src = "https://www.googletagmanager.com/ns.html?id=GTM-NRFTTPL";
          ifr.width = 0;
          ifr.height = 0;
          ifr.style = "display:none;visibility:hidden";
          sc.appendChild(ifr);
          w[l] = sc;
          body.insertBefore(sc, doc.querySelector("#app"));
        }
      })(window, document, "GTMNRFTTPL");
    }
    next();
  });
};
