module.exports = [
  [
    "vuepress-plugin-meilisearch",
    {
      "hostUrl": "https://main-meilise-np3uf8w8y6i20yfw-gtw.qovery.io",
      "apiKey": "f62f2e239917c3e83e57e612f0f118952c828b229132abc948e09e40fbf782e2",
      "indexUid": "vuepress",
      "placeholder": "Search as you type...",
      "maxSuggestions": 20,
      "cropLength": 50
    }
  ],
  // 'fulltext-search',
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
  }]
];
