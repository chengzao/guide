// const { nav, sidebar } = require("./config/navAndsidebar");
const plugins = require("./config/plugins");

const nav = require("./nav.js");

const baseUrl = process.env.BASE_ENV ? "/" + process.env.BASE_ENV : "/";
module.exports = {
  title: "FE Note",
  description: "about front-end docs notes website",
  base: baseUrl,
  locales: {
    "/": {
      lang: "zh-CN"
    }
  },
  dest: "dist",
  head: [
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
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
    [
      'meta',
      {
        property: 'google-site-verification',
        content: 'ngg1eq0mOJASJw9LfVt3qAgJ_8abrlrED6AQOE02iCw',
      },
    ],
    [
      'script',{},
      `
      !function(t, a, e) {
        var n = a.createElement("script");
        n.type = "text/javascript", n.src = "https://www.googletagmanager.com/gtag/js?id=G-6R6B1CV2HE",
        n.async = !0, n.crossOrigin = "anonymous", n.onload = function() {
            function a() {
                dataLayer.push(arguments);
            }
            t.dataLayer = t.dataLayer || [], a("js", new Date()), a("config", "G-6R6B1CV2HE");
        };
        var r = a.getElementsByTagName("script")[0];
        r.parentNode.insertBefore(n, r);
      }(window, document);
      `
    ]
  ],
  theme: "reco",
  themeConfig: {
    search: true,
    searchMaxSuggestions: 10,
    sidebarDepth: 2,
    repo: "chengzao/guide",
    docsDir: "docs",
    logo: "/logo.png",
    authorAvatar: "/logo.png",
    smoothScroll: true,
    navbar: true,
    nav,
    // sidebar,
    codeTheme: "okaidia",
    type: "blog",
    blogConfig: {
      category: {
        location: 3,
        text: "category"
      },
      tag: {
        location: 4,
        text: "tag"
      }
    },
    friendLink: [
      {
        title: "vuepress",
        desc: "Vue-powered Static Site Generator",
        link: "https://vuepress.vuejs.org/"
      },
      {
        title: "vuepress-theme-reco",
        desc: "A simple and beautiful vuepress Blog & Doc theme.",
        avatar:
          "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: "https://vuepress-theme-reco.recoluan.com"
      }
    ]
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require("markdown-it-include"));
    },
    lineNumbers: true
  },
  plugins
};
