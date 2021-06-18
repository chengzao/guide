module.exports = [
  [
    'script',{},
    `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'/js/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NRFTTPL');
    `
  ],
  ["link", { rel: "icon", href: `/logo.png` }],
  ["link", { rel: "manifest", href: "/manifest.json" }],
  ["link", { rel: "stylesheet", href: "/css/prism-okaidia.css" }],
  ["meta", { name: "theme-color", content: "#3eaf7c" }],
  ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
  [
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,user-scalable=no"
    }
  ],
  [
    "meta",
    { name: "apple-mobile-web-app-status-bar-style", content: "black" }
  ],
  ["meta", {name:"google-site-verification", content:"eHyT7Ws8-2CUA3HNtea2CWJqk-R2c21lN58XjjS6SeU"}],
  ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  [
    'script',{},
    `
    !function(t, a, e) {
      var n = a.createElement("script");
      n.type = "text/javascript", n.src = "/js/gtag.js?id=G-ERESYWH7YN",
      n.async = !0, n.crossOrigin = "anonymous", n.onload = function() {
          function a() {
              dataLayer.push(arguments);
          }
          t.dataLayer = t.dataLayer || [], a("js", new Date()), a("config", "G-ERESYWH7YN");
      };
      var r = a.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(n, r);
    }(window, document);
    `
  ]
]
