// 1.实例化
  var xhr = new XMLHttpRequest();
// 2.请求行
  //第三个参数：true 为 异步 ; false 为同步
  // GET传参
  xhr.open('get','index.php?name=xiaoming&&age=10',true);
  //POST
  xhr.open('post', 'index.php',true);
// 3.请求头:
  //GET方式可以不设请求头
  xhr.setRequestHeader('Content-Type', 'text/html');
  // POST方式必须要设置请求头
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 4.请求主体
  // GET方式
  xhr.send(null);
  // POST参数放到请求主体里
  xhr.send('name=xiaoming&age=10');
// 5.响应状态 ：request.responseText或者request.responseXML
  // 事件的监听，来监听状态的变化
  xhr.onreadystatechange = function () {
    // console.log(xhr.readyState);
    // console.log(xhr.status);

    // 此状态则为响应结果完成
    if(xhr.readyState == 4 && xhr.status == 200) {
      // 通过DOM操作将内容放到页面上
      document.getElementById('result').innerHTML = xhr.responseText;
    }
  }
