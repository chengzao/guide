const plugins = require("./config/plugins");
const head = require("./config/head");
const nav = require("./config/nav.js");
const isProd = process.env.NODE_ENV === "production";
const baseUrl = process.env.BASE_ENV ? "/" + process.env.BASE_ENV : "";
module.exports = {
  title: "FE Note",
  description: "about front-end docs notes website",
  base: baseUrl + "/",
  locales: {
    "/": {
      lang: "zh-CN",
    },
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
        text: "分类",
      },
      tag: {
        location: 5,
        text: "标签",
      },
    },
  },
  markdown: {
    extendMarkdown: (md) => {
      md.use(require("markdown-it-include"));
    },
    lineNumbers: true,
  },
  plugins,
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // 修改客户端的 webpack 配置
      if (isProd) {
        config.optimization.splitChunks = {
          cacheGroups: {
            common: {
              name: "chunk-common",
              chunks: "initial",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 1,
              reuseExistingChunk: true,
              enforce: true,
            },
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // https://docs.npmjs.com/cli/v7/configuring-npm/package-json
                // npm包名满足URL-safe
                return `npm.${packageName.replace("@", "")}`;
              },
              // name: "chunk-vendors",
              chunks: "all",
              priority: 2,
              reuseExistingChunk: true,
              enforce: true,
            },
            vue: {
              name: "chunk-vue",
              test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
              chunks: "all",
              priority: 3,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        };
      }
    }
  },
};
