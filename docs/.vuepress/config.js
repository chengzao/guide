const plugins = require("./config/plugins");
const head = require('./config/head');
const nav = require("./config/nav.js");

const baseUrl = process.env.BASE_ENV ? "/" + process.env.BASE_ENV : "";
module.exports = {
  title: "FE Note",
  description: "about front-end docs notes website",
  base: baseUrl+'/',
  locales: {
    "/": {
      lang: "zh-CN"
    }
  },
  dest: "dist",
  head,
  theme: "reco",
  themeConfig: {
    search: true,
    searchMaxSuggestions: 50,
    sidebarDepth: 2,
    repo: "chengzao/guide",
    docsDir: "docs",
    editLinks: true,
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
        location: 4,
        text: "分类"
      },
      tag: {
        location: 5,
        text: "标签"
      }
    },
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require("markdown-it-include"));
    },
    lineNumbers: true
  },
  plugins
};
