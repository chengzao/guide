const { nav, sidebar } = require('./config/navAndsidebar')

module.exports = {
  title: 'Guide',
  description: 'a front-end api guide website',
  base: "/",
  markdown: {
    lineNumbers: false
  },
  locales: {
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
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
  ga: 'UA-126651722-1',
  serviceWorker: true,
  themeConfig: {
    sidebarDepth: 2,
    navbar: true,
    repo: 'chengzao/guide',
    editLinkText: '在 GitHub 上编辑此页',
    docsDir: 'docs',
    editLinks: true,
    searchMaxSuggestions: 10,
    lastUpdated: '上次更新',
    serviceWorker: {
      updatePopup: {
        message: "发现新内容",
        buttonText: "刷新"
      }
    },
    nav,
    sidebar
  },
  configureWebpack: {},
  markdown: {
    config: md => {
      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-include'), {
        includeRe: /\<{3}\s*include\s*\(\s*(.+?)\s*\)\s*/i
      })
    }
  }
}
