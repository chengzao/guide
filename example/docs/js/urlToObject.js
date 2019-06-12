function serilizeUrl(url) {
  var urlObject = {}
  if (/\?/.test(url)) {
    var urlString = url.substring(url.indexOf('?') + 1)
    console.log(urlString)
    var urlArray = urlString.split('&')
    for (var i = 0, len = urlArray.length; i < len; i++) {
      var urlItem = urlArray[i]
      console.log(urlItem)
      var item = urlItem.split('=')
      if (
        item.length == 2 &&
        item[0] != '' &&
        item[0] != '""' &&
        item[0] != '"'
      ) {
        urlObject[item[0]] = encodeURIComponent(item[1])
      }
    }
    return urlObject
  }
  return {}
}
