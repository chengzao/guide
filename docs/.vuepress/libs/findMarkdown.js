const fs = require('fs')
const path = require('path')

function findMarkdown(dir, callback) {
  const rootDir = path.join(__dirname, '../../', dir)
  fs.readdir(rootDir, function (err, files) {
    if (err) throw err
    files.forEach((fileName) => {
      let innerDir = `${rootDir}/${fileName}`
      var isMd = /\.md$/.test(fileName)
      fs.stat(innerDir, function (err, stat) {
        if (stat.isDirectory()) {
          findMarkdown(innerDir, callback)
        } else {
          // 判断是否是.md结尾的文件
          if(isMd){
            callback(innerDir)
          }
        }
      })
    })
  })
}

module.exports = findMarkdown
