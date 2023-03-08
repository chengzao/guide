module.exports = function getYMLData(data) {

  const sourceData = data.split('\n')

  const len = sourceData.length;

  let count = 0 // 计数是否结束
  const slug = '---'

  const result = Object.create(null)

  let index = 0

  while(index < len){
    index++

    const c = sourceData[index];
    if(c === slug) {
      count++
      continue
    }

    // 判断是否结束的位置
    if(count > 1) {
      count = 0
      break
    }

    if(!c) continue

    const [key, value] = c.split(':')

    if(value) {
      let s = value.trim()
      s = s.replace(/(\[|\])/g, '') // tag: [a, b]
      let w = s.split(',').map(i => i.trim())
      result[key] = w.length > 1 ? w : w[0]

    }else if(value === ''){
      result[key] = []
      index++
      // 将下一个加入
      while(index < len) {
        const d = sourceData[index].split(':')
        if(d.length > 1 || sourceData[index] === slug) {
          index--
          break
        }
        const w = d[0].replace(/\s*-\s*/, '')
        w && result[key].push(w)
        index++
      }
    }
  }
  return result
}
