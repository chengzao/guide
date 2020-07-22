module.exports = [
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
  "@vuepress/medium-zoom",
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
  "copy-code"
];
