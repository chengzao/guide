// 字符串反转，如将 '12345678' 变成 '87654321'
// split : 将字符串分割成字符串数组,反序,在将数组转换为字符串
var str = '123456789';
str = str.split('').reverse().join('');
console.log(str);
