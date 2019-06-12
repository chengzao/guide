var glob = require("glob")
var path = require('path')
var fs = require('fs')

let result =  function(file) {
  let str = path.join(__dirname,'../../',file, '*');
  let res = glob.sync(str);
  let fileArr =  res.map(file => {
    var isDir = fs.statSync(file).isDirectory();
    var fileName = ''
    if(isDir){
      fileName = path.basename(file)
      if(fileName != 'urls'){
        return fileName+'/'
      }else{
        return ''
      }
    }else{
      fileName = path.basename(file, '.md');
      if(fileName.toUpperCase() == 'README') {
        fileName = '';
      }
      return fileName
    }
  })

  return [...new Set(fileArr)].sort()
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
  nav:[
    {
      text: 'HTML',
      link: '/web/'
    },
    {
      text: 'JS基础',
      link: '/js/'
    },
    {
      text: '常见问题',
      items: [
        {
          text: '问答',
          link: '/issues/'
        },
        {
          text: '工具',
          link: '/utils/'
        }
      ]
    },
    {
      text: 'web框架',
      link: '/frame/'
    },
    {
      text: "软件工具",
      items: [
        {
          text: '后端服务',
          link: '/serve/'
        },
        {
          text: '数据库',
          link: '/database/'
        },
        {
          text: 'linux使用',
          link: '/linux/'
        },
        {
          text: '其他工具',
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
    '/software/': genSidebarConfig('其他工具','software'),
    '/frame/': genSidebarConfig('框架', 'frame'),
  }
};
