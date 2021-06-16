// const { nav, sidebar } = require("./config/navAndsidebar");
const plugins = require("./config/plugins");
const head = require('./config/head');
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
  head,
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
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require("markdown-it-include"));
    },
    lineNumbers: true
  },
  plugins
};
