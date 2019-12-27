var glob = require("glob")
var path = require('path')
var fs = require('fs')

let result = function (file) {
  let str = path.join(__dirname, '../../', file, '*');
  let res = glob.sync(str);

  let fileArr = res.map(file => {
    var isDir = fs.statSync(file).isDirectory();
    var fileName = ''
    if (isDir) {
      fileName = path.basename(file)
      return fileName + '/'
    } else {
      fileName = path.basename(file, '.md');
      if (fileName.toUpperCase() == 'README') {
        fileName = '';
      }
      return fileName
    }
  })

  return [...new Set(fileArr)].sort()
}

function genSidebarConfig(title, file) {
  return [
    // {
    //   title,
    //   collapsable: false,
    //   children: result(file)
    // }
    ...result(file)
  ]
}

module.exports = {
  nav: [
    {
      text: 'HTML/CSS',
      link: '/web/'
    },
    {
      text: 'JavaScript',
      link: '/js/'
    },
    {
      text: 'Frame',
      items: [
        {
          text: 'Guide',
          link: '/frame/'
        },
        {
          text: 'Vue',
          link: '/vueJs/'
        },
        {
          text: 'React',
          link: '/reactJs/'
        },
      ]
    },
    {
      text: 'Helper',
      items: [
        {
          text: 'Issue',
          link: '/issues/'
        },
        {
          text: 'Util',
          link: '/utils/'
        },
        {
          text: 'Tool',
          link: '/tools/'
        }
      ]
    },
    {
      text: "Server",
      items: [
        {
          text: 'serve',
          link: '/serve/'
        },
        {
          text: 'db',
          link: '/database/'
        },
        {
          text: 'linux',
          link: '/linux/'
        },
      ]
    }
  ],
  sidebar: {
    '/web/': genSidebarConfig('HTML/CSS', 'web'),
    '/js/': genSidebarConfig('JavaScript', 'js'),
    '/issues/': genSidebarConfig('issues', 'issues'),
    '/utils/': genSidebarConfig('utils', 'utils'),
    '/linux/': genSidebarConfig('linux', 'linux'),
    '/serve/': genSidebarConfig('serve', 'serve'),
    '/database/': genSidebarConfig('database', 'database'),
    '/tools/': genSidebarConfig('tools', 'tools'),
    '/frame/': genSidebarConfig('frame', 'frame'),
    '/vueJs/': genSidebarConfig('vue.js', 'vueJs'),
    '/reactJs/': genSidebarConfig('react.js', 'reactJs'),
  }
};
