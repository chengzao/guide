function dataURItoBlob(byteString) {
  var mimeString = 'application/javascript'
  var arrayBuffer = new ArrayBuffer(byteString.length) //创建缓冲数组
  var intArray = new Uint8Array(arrayBuffer) //创建视图

  for (var i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], {type: mimeString})
}

export const getBlobUrl = (url) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (this.status === 200) {
      const blob = this.response
      const b = URL.createObjectURL(blob)
      resolve(b)
    }
  }
  xhr.send()
})


export const getLocalWorkerUrl = (originWorkerUrl) => new Promise(resolve =>
  // get JavaScript code string
  fetch(originWorkerUrl)
  .then(res => res.text())
  .then(codeString => {
      // URL format: blob:http://localhost:8089/cd2930c0-f4ca-4a9f-b6b1-8242e520dd62
      const localWorkerUrl = window.URL.createObjectURL(new Blob([codeString], {
          type: 'application/javascript'
      }));
      resolve(localWorkerUrl);
  }));


onmessage = function(e) {
  console.log('Worker: Message received from main script');
  const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage('Please write two numbers');
  } else {
    const workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
  }
}
