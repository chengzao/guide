module.exports = [
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
  'tabs',
  'reading-progress'
]
