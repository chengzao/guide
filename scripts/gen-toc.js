const fs = require('fs')
const path = require('path')

const fileDir = path.join(__dirname, '../docs')

function readdirSync(fileDir){
  let files = fs.readdirSync(fileDir)
  files = files.filter(file => {
    return file != 'README.md' && file != '.vuepress'
  })

  files.forEach(file => {
    const filePath = path.join(fileDir, file)
    const isDir = fs.statSync(filePath).isDirectory()
    if(isDir) {
      readdirSync(filePath)
      try {
        let readmePath = path.join(filePath, 'README.md')
        let isEx = fs.existsSync(readmePath)
        if(isEx) {
          let files = fs.readdirSync(filePath)
          let content =  fs.readFileSync(readmePath, 'utf-8')
          files = files.filter(item => item != 'README.md')
          const toc = []
          files.forEach(item => {
            const data = fs.readFileSync(path.join(filePath, item), 'utf-8')
            let title = data.split('\n')[1]
            if(/^title/g.test(title)){
              title = title.replace(/title: /, '').replace(/\n/, '').replace(/\r/, '')
              toc.push({title: title, link: item})
            }
          })

          let tocStr = ''
          if(toc.length){
            toc.forEach(item => {
              tocStr += `- [${item.title}](./${item.link})\n`
            })
          }
          content = content.replace(/<toc>[\s\S]*<toc>/g, `<toc>\n\n## menu (${toc.length})\n\n${tocStr}\n<toc>`)
          fs.writeFileSync(readmePath, content, 'utf-8')
        }

      } catch (error) {
        console.log(error);
      }
    }
  })
}

readdirSync(fileDir)







