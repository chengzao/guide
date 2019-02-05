# 字符串

## `fromCharCode`

- `String.fromCharCode()`
- 参数是一个或多个数值，代表 `Unicode`码点
- 返回值是这些码点组成的字符串

## `charAt`

- `String.prototype.charAt()`
- 参数是从0开始编号的位置, 返回指定位置的字符
- 参数为负数，或大于等于字符串的长度，charAt返回空字符串

## `charCodeAt`

- `String.prototype.charCodeAt`
- 返回字符串指定位置的 Unicode 码点（十进制表示）

## `concat`

- `String.prototype.concat(options)`
- 连接两个字符串，返回一个新字符串，不改变原字符串
- 参数不是字符串，concat方法会将其先转为字符串，然后再连接

## `slice`

- `String.prototype.slice(start, end)`
- 截取字符串, 不改变原字符串
- 省略第二个参数，则表示子字符串一直到原字符串结束
- 参数是负值，表示从结尾开始倒数计算的位置
- 第一个参数大于第二个参数，slice方法返回一个空字符串

## `trim`

- `String.prototype.trim()`
- 除字符串两端的空格，返回一个新字符串，不改变原字符串

## `match`

- `String.prototype.match()`
- 确定原字符串是否匹配某个字符串，返回一个数组
- 没有, 则返回`null`

## `search`

- `String.prototype.search()`
- 返回值为匹配的第一个位置
- 没有, 则返回-1

## `replace`

- `String.prototype.replace()`
- 匹配替换匹配到的第一个字符串

## `split`

- `String.prototype.split()`
- 分割字符串，返回数组
- 第二个参数，决定了返回数组的成员数

## `toLowerCase`

- `String.prototype.toLowerCase()`
- 字符串全部转为小写，不改变原字符串

## `toUpperCase`

- `String.prototype.toUpperCase()`
- 字符串全部转为大写，不改变原字符串

## `indexOf`

- `String.prototype.indexOf()`
- 返回字符第一次出现的位置，返回-1表示不匹配

## `lastIndexOf`

- `String.prototype.lastIndexOf()`
- 返回字符最后一次出现的位置，返回-1表示不匹配

## `length`

- `String.prototype.length`
- 返回字符串的长度

## `localeCompare`

- `String.prototype.localeCompare()`
- 比较两个字符串
  - 等于0，表示两者相等
  - 大于0, 第一个字符串大于第二个字符串
