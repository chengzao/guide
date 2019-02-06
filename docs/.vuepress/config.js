var glob = require("glob")
var path = require('path')

let result =  function(file) {
  let str = path.join(__dirname,'../',file,'/**/*.md');
  let res = glob.sync(str);
  let fileArr =  res.map(file => {
    let fileName = path.basename(file, '.md');
    if(fileName.toUpperCase() == 'README') {
      fileName = '';
    }
    return fileName
  })
  return fileArr.sort()
}

function genSidebarConfig (title,file) {
  return [
    {
      title,
      collapsable: false,
      children: result(file)
    }
  ]
}

module.exports = {
  title: 'Guide',
  description: 'a front-end api guide website',
  base: "/",
  markdown: {
    lineNumbers: false
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
    nav: [
      {
        text: 'web基础',
        link: '/web/'
      },
      {
        text: 'JS脚本',
        items: [
          {
            text: '文档',
            link: '/js/'
          },
          {
            text: '资源',
            link: '/issues/'
          },
          {
            text: 'util',
            link: '/utils/'
          }
        ]
      },
      {
        text: '框架',
        items: [
          {
            text: "vue.js",
            link: "/vue/"
          },
          {
            text: "react.js",
            link: "/react/"
          },
          {
            text: "angular",
            link: "/angular/"
          },
          {
            text: "小程序",
            link: "/miniapp/"
          },
          {
            text: "其他",
            link: "/frame/"
          }
        ]
      },
      {
        text: "工具",
        items: [
          {
            text: '服务',
            link: '/serve/'
          },
          {
            text: '数据库',
            link: '/database/'
          },
          {
            text: 'linux',
            link: '/linux/'
          },
          {
            text: '软件',
            link: '/software/'
          }
        ]
      }
    ],
    sidebar: {
      '/web/': genSidebarConfig('web基础','web'),
      '/js/': genSidebarConfig('Js介绍','js'),
      '/issues/': genSidebarConfig('常见问题','issues'),
      '/utils/': genSidebarConfig('常用函数','utils'),
      '/linux/': genSidebarConfig('linux','linux'),
      '/serve/': genSidebarConfig('服务','serve'),
      '/database/': genSidebarConfig('数据库','database'),
      '/frame/': genSidebarConfig('其他框架','frame'),
      '/software/': genSidebarConfig('软件工具','software'),
      '/vue/': genSidebarConfig('vue', 'vue'),
      '/react/': genSidebarConfig('react', 'react'),
      '/angular/': genSidebarConfig('angular', 'angular'),
      '/miniapp/': genSidebarConfig('小程序', 'miniapp'),
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': '../assets/images/'
      }
    }
  }
}
