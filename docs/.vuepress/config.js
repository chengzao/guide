const { nav, sidebar } = require("./config/navAndsidebar");
const plugins = require("./config/plugins");

const baseUrl = process.env.BASE_ENV ? process.env.BASE_ENV : "/";
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
    ["meta", { name: "msapplication-TileColor", content: "#000000" }]
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
    sidebar,
    codeTheme: "okaidia",
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "Category"
      },
      tag: {
        location: 3,
        text: "Tag"
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
