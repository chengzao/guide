const hexToRGB = (hex) => {
  if (!/(^\#([a-fA-F0-9]{3})$)|(^\#([a-fA-F0-9]{6})$)/g.test(hex)) return null
  let allNumberStr = '0123456789abcdef' // 十六进制的所有数字
  let len = hex.slice(1).length;
  let str = len === 6 ? hex.slice(1) : hex.slice(1)[0].repeat(2) + hex.slice(1)[1].repeat(2) + hex.slice(1)[2].repeat(2);
  let arrStr = str.split('');
  let newArrStr = arrStr.map((item, index) => {
    return allNumberStr.indexOf((item + '').toLowerCase())
  })
  let num1 = newArrStr[0] * 16 + newArrStr[1];
  let num2 = newArrStr[2] * 16 + newArrStr[3];
  let num3 = newArrStr[4] * 16 + newArrStr[5];
  return `rgb(${num1}, ${num2}, ${num3})`
}
// console.log(hexToRGB('#fffaaa'))
