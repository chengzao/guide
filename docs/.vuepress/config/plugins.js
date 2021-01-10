module.exports = [
  'fulltext-search',
  [
    "@vuepress/google-analytics",
    {
      ga: "UA-126651722-1"
    }
  ],
  [
    "@vuepress/pwa",
    {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容",
        buttonText: "刷新"
      }
    }
  ],
  [
    "named-chunks",
    {
      pageChunkName: page => "page" + page.key.slice(1),
      layoutChunkName: layout => "layout-" + layout.componentName
    }
  ],
  "reading-progress",
  "img-lazy",
  "@vuepress-reco/extract-code",
  [
    "run",
    {
      row: false,
      reverse: false
    }
  ],
  ["copy-code",
    {
      copyMessage: '复制成功 ^~^ !'
    }
  ],
  [
    'vuepress-plugin-medium-zoom',
    {
      selector: '.my-wrapper .my-img',
      delay: 1000,
      options: {
        margin: 24,
        background: '#BADA55',
        scrollOffset: 0,
      },
    },
  ],
];
