const fs = require('fs')
const findMarkdown = require('./findMarkdown')
const rootDir = 'feature'

findMarkdown(rootDir,delComponents)

function delComponents(dir){
    fs.readFile(dir,'utf-8', (err, content) => {
        if (err) throw err
        var reg = new RegExp(`\n \n <comment-comment/> \n `, 'g')
        var hasComment = reg.test(content)
        if(!hasComment){
          return false
        }
        fs.writeFile(dir, content.replace(reg,''), (err) => {
          if (err) throw err
          console.log(`del components from ${dir}`)
        })
    })
}
