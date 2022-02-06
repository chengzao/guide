const fs = require("fs");
const path = require("path");

const fileDir = path.join(__dirname, "../docs");

function readdirSync(fileDir) {
  let files = fs.readdirSync(fileDir);
  files = files.filter((file) => {
    return file != "README.md" && file != ".vuepress";
  });

  files.forEach((file) => {
    const filePath = path.join(fileDir, file);
    const isDir = fs.statSync(filePath).isDirectory();
    if (isDir) {
      readdirSync(filePath);
      genToc(filePath);
    }
  });
}

function genToc(filePath) {
  try {
    let readmePath = path.join(filePath, "README.md");
    let isEx = fs.existsSync(readmePath);
    if (isEx) {
      let files = fs.readdirSync(filePath);
      let content = fs.readFileSync(readmePath, "utf-8");
      files = files.filter((item) => item != "README.md");
      // 获取所有的文件
      const toc = [];
      files.forEach((item) => {
        const data = fs.readFileSync(path.join(filePath, item), "utf-8");
        let meta = data.match(/---([\s\S]*)---/g)[0];
        let title = meta.split("\n")[1];
        if (/^title/g.test(title)) {
          title = title
            .replace(/title: /, "")
            .replace(/\n/, "")
            .replace(/\r/, "");
          toc.push({ title: title, link: item });
        }
      });

      // 拼接toc
      let tocStr = "";
      if (toc.length) {
        toc.forEach((item) => {
          tocStr += `- [${item.title}](./${item.link})\n`;
        });
      }
      content = content.replace(
        /<!-- dirToc -->[\s\S]*<!-- dirToc -->/g,
        `<!-- dirToc -->\n\n## menu (${toc.length})\n\n${tocStr}\n<!-- dirToc -->`
      );
      // 写入文件
      fs.writeFileSync(readmePath, content, "utf-8");
    }
  } catch (error) {
    console.log(error);
  }
}

readdirSync(fileDir);
