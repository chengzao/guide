module.exports = [
  // [
  //   "vuepress-plugin-meilisearch",
  //   {
  //     "hostUrl": "https://main-meilise-gbx6ghw8jive6u0h-gtw.qovery.io",
  //     "apiKey": "1133481d50d6ebb46b5c167c4593e70706da4c77256f94ef3880b4c331cf1540",
  //     "indexUid": "vuepress",
  //     "placeholder": "Search as you type...",
  //     "maxSuggestions": 20,
  //     "cropLength": 50
  //   }
  // ],
  'fulltext-search',
  'check-md',
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
  ['sitemap', {
    hostname: 'https://guide.chenio.top'
  }],
  [
    "vuepress-plugin-auto-sidebar",{
      collapse: {
        open: true
      },
      sidebarDepth: 1,
    }
  ]
];
