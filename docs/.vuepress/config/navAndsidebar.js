var glob = require("glob");
var path = require("path");
var fs = require("fs");

let result = function(file) {
  let str = path.join(__dirname, "../../", file, "*");
  let res = glob.sync(str);

  let fileArr = res.map(file => {
    var isDir = fs.statSync(file).isDirectory();
    var fileName = "";
    if (isDir) {
      fileName = path.basename(file);
      return fileName + "/";
    } else {
      fileName = path.basename(file, ".md");
      if (fileName.toUpperCase() == "README") {
        fileName = "";
      }
      return fileName;
    }
  });

  return [...new Set(fileArr)].sort();
};

function genSidebarConfig(title, file) {
  return [
    // {
    //   title,
    //   collapsable: false,
    //   children: result(file)
    // }
    ...result(file)
  ];
}

module.exports = {
  nav: [
    {
      text: "JavaScript",
      link: "/js/"
    },
    {
      text: "Frame",
      items: [
        {
          text: "Guide",
          link: "/frame/"
        },
        {
          text: "Vue.js",
          link: "/vueJs/"
        },
        {
          text: "React.js",
          link: "/reactJs/"
        }
      ]
    },
    {
      text: "FAQ",
      items: [
        {
          text: "issues",
          link: "/issues/"
        },
        // {
        //   text: "libs",
        //   link: "/libs/"
        // },
        {
          text: "tools",
          link: "/tools/"
        }
      ]
    },
    {
      text: "Server",
      items: [
        {
          text: "serve",
          link: "/serve/"
        }
      ]
    }
  ],
  sidebar: {
    "/js/": genSidebarConfig("JavaScript", "js"),
    "/issues/": genSidebarConfig("issues", "issues"),
    // "/libs/": genSidebarConfig("libs", "libs"),
    "/serve/": genSidebarConfig("serve", "serve"),
    "/tools/": genSidebarConfig("tools", "tools"),
    "/frame/": genSidebarConfig("frame", "frame"),
    "/vueJs/": genSidebarConfig("vue.js", "vueJs"),
    "/reactJs/": genSidebarConfig("react.js", "reactJs")
  }
};
