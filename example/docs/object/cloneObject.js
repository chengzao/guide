//简易克隆对象
function extend2(tag, source) {
  for (var item in source) {
    tag[item] = source[item];
  }
  return tag;
}
//
JSON.parse(JSON.stringify(obj))
//
Object.create({}, obj)
