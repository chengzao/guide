const { nav, sidebar } = require('./config/navAndsidebar')
const plugins = require('./config/plugins')

module.exports = {
  title: 'FE Note',
  description: 'about front-end docs notes website',
  base: "/",
  markdown: {
    lineNumbers: false
  },
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  evergreen: true,
  dest: "dist",
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    sidebarDepth: 2,
    navbar: true,
    repo: 'chengzao/guide',
    editLinkText: '在 GitHub 上编辑此页',
    docsDir: 'docs',
    editLinks: true,
    lastUpdated: '上次更新',
    nav,
    sidebar
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': '../../assets'
      }
    }
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-include'))
    }
  },
  plugins
}
