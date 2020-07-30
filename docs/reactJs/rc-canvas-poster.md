---
title: 使用canvas生成poster
date: 2020-07-21
sidebar: "auto"
tags:
  - react
---

## poster

- `poster/util.js`

```jsx
// 二维码
import QRCode from "qrcode";

var opts = {
  errorCorrectionLevel: "H",
  type: "image/jpeg",
  quality: 0.3,
  margin: 1
  // color: {
  //   dark: "#010599FF",
  //   light: "#FFBF60FF"
  // }
};

export function GetQrCodeImages(link) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(link, opts, function(err, url) {
      if (err) throw err;
      resolve(url);
    });
  });
}

const PIXEL_RATIO = (function() {
  var ctx = document.createElement("canvas").getContext("2d"),
    dpr =
      window.devicePixelRatio ||
      window.webkitDevicePixelRatio ||
      window.mozDevicePixelRatio ||
      1,
    bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;

  return dpr / bsr;
})();

export const createHiDPICanvas = function(w, h, ratio) {
  if (!ratio) {
    ratio = PIXEL_RATIO;
  }
  var can = document.createElement("canvas");
  can.width = Math.round(w * ratio);
  can.height = Math.round(h * ratio);
  can.style.width = w + "px";
  can.style.height = h + "px";
  can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  return can;
};

export function loadImg(imgUrl) {
  return new Promise((resolve, reject) => {
    const imgEl = new Image();
    imgEl.crossOrigin = "Anonymous";
    imgEl.onload = function() {
      resolve(this);
    };
    imgEl.src = imgUrl;
  });
}

export function fetchImage(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      let url = URL.createObjectURL(this.response);
      let img = new Image();
      img.onload = function() {
        resolve(this);
        console.log(this);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.send();
  });
}

export async function drawerImg(ctx, imgUrl, x, y, w, h) {
  ctx.save();
  let img = await loadImg(imgUrl);
  ctx.drawImage(img, x, y, w, h);
  ctx.restore();
}

export function drawerTxt(ctx, option) {
  var {
    text,
    width,
    lineNum,
    lineHeight,
    left,
    top,
    fontSize,
    fontFamily,
    fontWeight,
    opacity,
    textAlign,
    baseLine,
    color
  } = option;

  ctx.save();
  ctx.font = "normal "
    .concat(fontWeight || "normal", " ")
    .concat(fontSize || 14, "px ")
    .concat(fontFamily || "Arial");

  ctx.globalAlpha = opacity || 1;
  ctx.textAlign = textAlign || "center";
  ctx.textBaseline = baseLine || "middle";
  ctx.fillStyle = color || "white";

  var textWidth = ctx.measureText(text).width;
  var textArr = [];

  if (textWidth > width) {
    var fillText = "";
    var line = 1;
    for (var i = 0; i <= text.length - 1; i += 1) {
      // 将文字转为数组
      fillText += text[i];
      if (ctx.measureText(fillText).width >= width) {
        if (line === lineNum) {
          if (i !== text.length - 1) {
            fillText = "".concat(
              fillText.substring(0, fillText.length - 1),
              "..."
            );
          }
        }

        if (line <= lineNum) {
          textArr.push(fillText);
        }
        fillText = "";
        line += 1;
      } else if (line <= lineNum) {
        if (i === text.length - 1) {
          textArr.push(fillText);
        }
      }
    }
    textWidth = width;
  } else {
    textArr.push(text);
  }

  textArr.forEach(function(item, index) {
    ctx.fillText(item, left, top + (lineHeight || fontSize) * index);
  });

  ctx.restore();
}
```

- `poster/create.js`

```jsx
import {
  GetQrCodeImages,
  createHiDPICanvas,
  drawerImg,
  drawerTxt
} from "./util";
import BgPic from "./skin-1.png";

export async function DrawQRPoster(url, width, height) {
  const imgWidth = 210;
  const posY = 420;

  const canvas = createHiDPICanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false; //获取设备像素比

  // 750 x 1094
  const gap = 20;
  await drawerImg(ctx, BgPic, gap, gap, width - gap * 2, height - gap * 2);

  const qrCodeImg = await GetQrCodeImages(url);

  await drawerImg(
    ctx,
    qrCodeImg,
    (width - imgWidth) / 2,
    154,
    imgWidth,
    imgWidth
  );

  drawerTxt(ctx, {
    text: "xxx-xxx",
    fontSize: 16,
    color: "#f7f7f7",
    textAlign: "center",
    top: posY + 20,
    left: width / 2,
    width: 200,
    lineNum: 2,
    lineHeight: 20,
    baseLine: "middle"
  });

  const imageBase64 = canvas.toDataURL();
  return imageBase64;
}
```

- `/poster/download.js`

```js
import QRCode from "qrcode";

function downloadBlob(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";

    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new Error("Download failed."));
    };
    xhr.send();
  });
}
export function downloadFile(url, fileName = "") {
  return downloadBlob(url, fileName)
    .then(resp => {
      if (resp.blob) {
        return resp.blob();
      }
      return new Blob([resp]);
    })
    .then(blob => {
      if ("msSaveOrOpenBlob" in navigator) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        const obj = URL.createObjectURL(blob);
        downloadURL(obj, fileName);
        URL.revokeObjectURL(obj);
      }
    })
    .catch(err => {
      throw new Error(err.message);
    });
}

export function downloadURL(url, name = "") {
  const link = document.createElement("a");
  link.download = name;
  link.href = url;
  if ("download" in document.createElement("a")) {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // 对不支持download进行兼容
    click(link, (link.target = "_blank"));
  }
}
// clone https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent("click"));
  } catch (e) {
    let evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      80,
      20,
      false,
      false,
      false,
      false,
      0,
      null
    );
    node.dispatchEvent(evt);
  }
}

let opts = {
  errorCorrectionLevel: "H",
  type: "image/jpeg",
  quality: 0.3,
  margin: 5
  // color: {
  //   dark: "#010599FF",
  //   light: "#FFBF60FF"
  // }
};

export function GetQrCodeImages(link) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(link, opts, (err, url) => {
      if (err) throw err;
      resolve(url);
    });
  });
}
```

- `poster/index.js`

```jsx
import React, { useEffect, useState } from "react";
import { DrawQRPoster } from "./create";
import { downloadFile } from "./download";

export default function Poster() {
  const [poster, setPoster] = useState();
  const width = 375;
  const height = 546;
  useEffect(() => {
    async function getPoster() {
      const link = "https://www.baidu.com";
      let imgUrl = await DrawQRPoster(link, width, height);
      setPoster(imgUrl);
    }
    getPoster();
  }, []);

  const handleDownload = () => {
    let image = new Image();
    image.src = poster;
    image.style.width = width + "px";
    image.style.height = height + "px";
    let fileName = `${+new Date()}.png`;
    downloadFile(image.src, fileName);

    // let fileName = `${+new Date()}.png`;
    // downloadFile(poster.src, fileName);
  };

  return (
    <div className="poster">
      <img style={{ width, height }} src={poster} alt="" />
      <p></p>
      <button onClick={handleDownload}>download</button>
    </div>
  );
}
```

## compress

```js
// compress.js
const MAX_WIDTH = 800; // 图片最大宽度

function compress(base64, quality, mimeType) {
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = base64;
    img.onload = () => {
      let targetWidth, targetHeight;
      if (img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = (img.height * MAX_WIDTH) / img.width;
      } else {
        targetWidth = img.width;
        targetHeight = img.height;
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let imageData = canvas.toDataURL(mimeType, quality / 100);
      resolve(imageData);
    };
  });
}

function dataUrlToBlob(base64, mimeType) {
  //
  let bytes = window.atob(base64.split(",")[1]);
  //
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);

  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}

function uploadFile(url, blob) {
  let formData = new FormData();
  let request = new XMLHttpRequest();
  formData.append("image", blob);
  request.open("POST", url, true);
  request.send(formData);
}
```

- use

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>本地图片压缩</title>
  </head>
  <body>
    <input type="file" accept="image/*" onchange="loadFile(event)" />
    <script src="./compress.js"></script>
    <script>
      const loadFile = function(event) {
        const reader = new FileReader();
        reader.onload = async function() {
          let compressedDataURL = await compress(
            reader.result,
            90,
            "image/jpeg"
          );
          let compressedImageBlob = dataUrlToBlob(compressedDataURL);
          uploadFile("https://httpbin.org/post", compressedImageBlob);
        };
        reader.readAsDataURL(event.target.files[0]);
      };
    </script>
  </body>
</html>
```

## 参考文档

- [how-do-i-fix-blurry-text-in-my-html5-canvas](https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas)
- [node-qrcode](https://github.com/soldair/node-qrcode)
- [react-canvas-poster](https://github.com/whorcare/react-canvas-poster)
