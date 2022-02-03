module.exports = [
  'fulltext-search',
  "reading-progress",
  "img-lazy",
  "@vuepress-reco/extract-code",
  [
    "copy-code",
    {
      copyMessage: "复制成功 ^~^ !"
    }
  ],
  [
    "vuepress-plugin-medium-zoom",
    {
      selector: ".my-wrapper .my-img",
      delay: 1000,
      options: {
        margin: 24,
        background: "#BADA55",
        scrollOffset: 0
      }
    }
  ],
  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp, lang) => {
        return new Date(timestamp).toLocaleDateString();
      }
    }
  ],
  [
    "sitemap",
    {
      hostname: "https://guide.czhlink.com"
    }
  ],
  [
    "vuepress-plugin-auto-sidebar",
    {
      collapse: {
        open: true
      },
      sidebarDepth: 1
    }
  ]
];
