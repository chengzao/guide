const { nav, sidebar } = require('./config/navAndsidebar')

module.exports = {
  title: 'Guide',
  description: 'a front-end docs guide website',
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
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-include'))
    }
  },
  plugins: [
    ['container', {
      type: 'right',
      defaultTitle: '',
    }],
    ['container', {
      type: 'theorem',
      before: info => `<div class="theorem"><p class="title">${info}</p>`,
      after: '</div>',
    }],
    ['@vuepress/google-analytics', {
      ga: 'UA-126651722-1'
    }],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容",
        buttonText: "刷新"
      }
    }],
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
    '@vuepress/back-to-top',
    '@vuepress/nprogress',
    '@vuepress/medium-zoom',
    'named-chunks',
    'tabs'
  ]
}
