# 正则表达式

- 构造函数定义 `var regex = new RegExp(/表达式/);`
- 直接量定义 `var regex = /表达式/;`
- `()` 表示一组
- `[]` 表示一个
- `{}` 用来修饰次数

## 正则对象的属性和方法

- `ignoreCase`：返回一个布尔值,表示是否设置了i修饰符,该属性只读
- `global`：返回一个布尔值,表示是否设置了g修饰符,该属性只读
- `multiline`：返回一个布尔值,表示是否设置了m修饰符,该属性只读
- `lastIndex`：返回下一次开始搜索的位置,该属性可读写,但是只在设置了`g`修饰符时有意义
- `source`：返回正则表达式的字符串形式(不包括反斜杠),该属性只读

## `ignoreCase`

- `RegExp.prototype.ignoreCase`
- 返回一个布尔值，表示是否设置了`i`修饰符

### `global`

- `RegExp.prototype.global`
- 返回一个布尔值，表示是否设置了`g`修饰符

### `multiline`

- `RegExp.prototype.multiline`
- 返回一个布尔值，表示是否设置了`m`修饰符

### `test`

- `RegExp.prototype.test()`
- 返回一个布尔值，表示当前模式是否能匹配参数字符串
- `regex.test(string)`
- 正则对象的`test`方法返回一个布尔值,表示当前模式是否能匹配参数字符串
- 如果正则表达式带有`g`修饰符,则每一次test方法都从上一次结束的位置开始向后匹配

<CodeBlock>

```js
/cat/.test('cats and dogs') // true

var r = /x/g;
var s = '_x_x';

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2
r.test(s) // true
```

</CodeBlock>


### `exec`

- `RegExp.prototype.exec()`
- 发现匹配，返回数组; 否则返回`null`
- 正则对象的`exec`方法,可以返回匹配结果
- 如果发现匹配,就返回一个数组,成员是每一个匹配成功的子字符串,否则返回`null`
- `exec`方法,返回一个数组.第一个成员是整个匹配的结果,第二个成员是圆括号匹配的结果

<CodeBlock>

```js
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

r1.exec(s) // ["x"]
r2.exec(s) // null
```

</CodeBlock>

- `exec`方法的返回数组还包含以下两个属性：
  - `input`：整个原字符串
  - `index`：整个模式匹配成功的开始位置(从0开始计数)

<CodeBlock>

```js
var r = /a(b+)a/;
var arr = r.exec('_abbba_aba_');

arr // ["abbba", "bbb"]

arr.index // 1
arr.input // "_abbba_aba_"
```

</CodeBlock>

### match

- `string.match(regex)`
- 对字符串进行正则匹配,返回匹配结果

<CodeBlock>

```js
var s = 'abba';
var r = /a/g;

s.match(r) // ["a", "a"]
r.exec(s) // ["a"]
```

</CodeBlock>

### search

- 返回第一个满足条件的匹配结果在整个字符串中的位置,如果没有任何匹配,则返回`-1`

<CodeBlock>

```js
var r = /x/g;
r.lastIndex = 2; // 无效
'_x_x'.search(r) // 1
```

</CodeBlock>

### replace

- `str.replace(search, replacement)`

<CodeBlock>

```js
'aaa'.replace('a', 'b') // "baa"
'aaa'.replace(/a/g, 'b') // "bbb"
var str = '  #id div.class  ';

str.replace(/^\s+|\s+$/g, '')
// "#id div.class"
```

</CodeBlock>

- replace方法的第二个参数可以使用美元符号`$`,用来指代所替换的内容
  - `$&` 指代匹配的子字符串
  - `$` 指代匹配结果前面的文本
  - `$'` 指代匹配结果后面的文本
  - `$n` 指代匹配成功的第n组内容,n是从`1`开始的自然数
  - `$$` 指代美元符号`$`

<CodeBlock>

```js
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')
// "world hello"

'abc'.replace('b', '[$`-$&-$\']')
// "a[a-b-c]c"
```

</CodeBlock>

- replace方法的第二个参数还可以是一个函数,将每一个匹配内容替换为函数返回值

<CodeBlock>

```js
'3 and 5'.replace(/[0-9]+/g, function(match){
  return 2 * match;
})
// "6 and 10"

var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|brown|lazy/ig;

a.replace(pattern, function replacer(match) {
  return match.toUpperCase();
});
// The QUICK BROWN fox jumped over the LAZY dog.
```

</CodeBlock>

### `split`

- `str.split(separator, [limit])`
- `第一个参数是分隔规则,第二个参数是返回数组的最大成员数`

### 组匹配

- 正则表达式的括号表示分组匹配
- 括号中的模式可以用来匹配分组的内容

<CodeBlock>

```js
/fred+/.test('fredd') // true
/(fred)+/.test('fredfred') // true
```

</CodeBlock>

- 用`\n`引用括号匹配的内容,n是从1开始的自然数,表示对应顺序的括号

<CodeBlock>

```js
// \1表示前一个括号匹配的内容("a"),\2表示第二个括号匹配的内容("b")
/(.)b(.)\1b\2/.test("abcabc")

// \1指向外层括号,\2指向内层括号
/y((..)\2)\1/.test('yabababab') // true

//匹配网页标签
var tagName = /<([^>]+)>[^<]*<\/\1>/;
tagName.exec("<b>bold</b>")[1]
// 'b'
```

</CodeBlock>

- 非捕获组 `(?:x)`称为非捕获组(Non-capturing group),表示不返回该组匹配的内容,即匹配的结果中不计入这个括号

<CodeBlock>

```js
// 正常匹配
var url = /(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;
url.exec('http://google.com/');
// ["http://google.com/", "http", "google.com", "/"]

// 非捕获组匹配
var url = /(?:http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;
url.exec('http://google.com/');
// ["http://google.com/", "google.com", "/"]
```

</CodeBlock>

- 先行断言`x(?=y)`称为先行断言(Positive look-ahead), x只有在y前面才匹配,y不会被计入返回结果

<CodeBlock>

```js
var m = 'abc'.match(/b(?=c)/);
m // ["b"]
/Jack (?=Sprat|Frost)/.test('Jack Frost') // true
```

</CodeBlock>

- 先行否定断言 `x(?!y)`称为先行否定断言(Negative look-ahead), x只有不在y前面才匹配,y不会被计入返回结果

<CodeBlock>

```js
/\d+(?!\.)/.exec('3.14')
// ["14"]

var m = 'abd'.match(/abd(?!c)/);
m // ['abd']
```

</CodeBlock>

### 修饰符

- `修饰符` 修饰符(modifier)表示模式的附加规则,放在正则模式的最尾部
- `g` 修饰符, 全局匹配
- `i` 修饰符, 忽略大小写
- `m` 修饰符, 多行模式

<CodeBlock>

```js
var regex = /b/g;
var str = 'abba';

regex.test(str); // true
regex.test(str); // true
regex.test(str); // false

/abc/.test('ABC') // false
/abc/i.test('ABC') // true

/world$/.test('hello world\n') // false
/world$/m.test('hello world\n') // true
/^b/m.test('a\nb') // true
```

</CodeBlock>

### 贪婪模式

- 默认情况下都是最大可能匹配,即匹配直到下一个字符不满足匹配规则为止
- `*?`：表示某个模式出现`0次或多次`，匹配时采用非贪婪模式
- `+?`：表示某个模式出现`1次或多次`，匹配时采用非贪婪模式
- 将贪婪模式改为非贪婪模式,可以在量词符后面加一个问号

<CodeBlock>

```js
var s = 'aaa';
s.match(/a+/) // ["aaa"]

var s = 'aaa';
s.match(/a+?/) // ["a"]
```

</CodeBlock>

### 量词符

- 量词符用来设定某个模式出现的次数
- `?` 问号表示某个模式出现`0次或1次`，等同于`{0, 1}`
- `*` 星号表示某个模式出现`0次或多次`，等同于`{0,}`
- `+` 加号表示某个模式出现`1次或多次`，等同于`{1,}`
- `\`  转义符
  - 正则模式中,需要用斜杠转义的字符：`^、.、[、$、(、)、|、*、+、?、{、\\`
  - 使用RegExp方法生成正则对象,转义需要使用两个斜杠,因为字符串内部会先转义一次

<CodeBlock>

```js
/11|22/.test('911') // true

/1\+1/.test('1+1')  // true

(new RegExp('1\\+1')).test('1+1')  // true
```

</CodeBlock>

### 预定义模式

- `·` `[^\n\r]`	除了换行,回车,行分隔符(`\u2028`)和段分隔符(`\u2029`)之外的任意字符
- `\d`, 匹配`0-9`之间的任一数字 相当于`[0-9]`
- `\D`, 匹配所有`0-9`以外的字符 相当于`[^0-9]`
- `\w`, 匹配任意的字母、数字和下划线 相当于`[A-Za-z0-9_]`
- `\W`, 除所有字母、数字和下划线以外的字符 相当于`[^A-Za-z0-9_]`
- `\s`, 匹配空格（包括换行符、制表符、空格符等）相等于`[\t\r\n\v\f]`
- `\S`, 匹配非空格的字符 相当于`[^\t\r\n\v\f]`
- `\b`, 匹配词的边界
- `\B`, 匹配非词边界，即在词的内部

### 字面量字符和元字符

- `^` 表示字符串的开始位置
- `$` 表示字符串的结束位置
- `|` 表示“或关系”（`OR）`

## 正则regExp

### 匹配规则

- `定义模式`
  - 精确匹配次数,使用大括号`{}`表示
  - `{n}`  表示恰好重复n次
  - `{n,}` 表示至少重复n次
  - `{n,m}`表示重复不少于n次,不多于m次

<CodeBlock>

```js
/lo{2}k/.test('look') // true
/lo{2,5}k/.test('looook') // true

console.log(/^(chuan)*$/.test("chuanchuan"));
// ()表示一组 []表示一个 {}用来修饰次数
//  汉字：[\u4e00-\u9fa5]
// 中文转unicode可以用escape()方法
escape('你')        // "%u4F60"
unescape('\u9fa5')  //"龥"

// unicode转中文
http://tool.chinaz.com/Tools/Unicode.aspx
```

</CodeBlock>

- `特殊字符`

<CodeBlock>

```bash
\cX 表示Ctrl-[X],其中的X是A-Z之中任一个英文字母,用来匹配控制字符
[\b] 匹配退格键
\n 匹配换行键
\r 匹配回车键
\t 匹配制表符tab
\v 匹配垂直制表符
\f 匹配换页符
\0 匹配null字符
\xhh 匹配一个以两位十六进制数(\x00-\xFF)表示的字符
\uhhhh 匹配一个以四位十六进制数(\u0000-\uFFFF)表示的unicode字符
```

</CodeBlock>

- `字符类` 表示有一系列字符可选择,只要匹配其中一个就可以

<CodeBlock>

```js
/[abc]/.test('hello world') // false
/[abc]/.test('apple') // true
```

</CodeBlock>

- 脱字符(`^`)
  - 方括号内的第一个字符是`[^]`,表示除了字符类之中的字符,其他字符都可以匹配
  - 如果方括号内没有其他字符,即只有`[^]`,就表示匹配一切字符,其中包括换行符,而点号(`.`)是不包括换行符的

<CodeBlock>

```js
/[^abc]/.test('hello world') // true
/[^abc]/.test('bbc') // false
```

</CodeBlock>

- 连字符(`-`) 连续序列的字符,连字符(`-`)用来提供简写形式,表示字符的连续范围

<CodeBlock>

```js
/[a-z]/.test('b') // true
```

</CodeBlock>

## 正则表达式表达式收集

<CodeBlock>

```js
var exp = new RegExp("^[0-9]*$");
exp.test('abc1')  // false
exp.test('1')  // true
/^[0-9]*$/g.test('231') // true
```

</CodeBlock>

## 校验数字的表达式

<CodeBlock>

```bash
数字：^[0-9]*$

n位的数字：^\d{n}$

至少n位的数字：^\d{n,}$

m-n位的数字：^\d{m,n}$

零和非零开头的数字：^(0|[1-9][0-9]*)$

非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$

带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})?$

正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$

有两位小数的正实数：^[0-9]+(.[0-9]{2})?$

有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$

非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$

非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$

非负整数：^\d+$ 或 ^[1-9]\d*|0$

非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
```

</CodeBlock>

## 校验字符的表达式

<CodeBlock>

```bash
汉字：^[\u4e00-\u9fa5]{0,}$

英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$

长度为3-20的所有字符：^.{3,20}$

由26个英文字母组成的字符串：^[A-Za-z]+$

由26个大写英文字母组成的字符串：^[A-Z]+$

由26个小写英文字母组成的字符串：^[a-z]+$

由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$

由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$

中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$

中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$

可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+

禁止输入含有~的字符：[^~\x22]+
```

</CodeBlock>

## 特殊需求表达式

<CodeBlock>

```bash
Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$

域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?

InternetURL：[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$

手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$

电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$

国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7}

身份证号(15位、18位数字)：^\d{15}|\d{18}$

短身份证号码(数字、字母x结尾)：^([0-9]){7,18}(x|X)?$ 或 ^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$

帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$

密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$

强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$

日期格式：^\d{4}-\d{1,2}-\d{1,2}

一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$

一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$

xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$

中文字符的正则表达式：[\u4e00-\u9fa5]

双字节字符：[^\x00-\xff]

空白行的正则表达式：\n\s*\r

HTML标记的正则表达式：<(\S*?)[^>]*>.*?</\1>|<.*? />

首尾空白字符的正则表达式：^\s*|\s*$或(^\s*)|(\s*$)

腾讯QQ号：[1-9][0-9]{4,}

中国邮政编码：[1-9]\d{5}(?!\d)

IP地址：\d+\.\d+\.\d+\.\d+

密码：/^[A-Z]{6,18}|[a-z]{6,18}|[0-9]{6,18}$/  只有数字或者字母

/^([a-z].*[A-Z])|([A-Z].*[a-z])/   有大小写的字母
```

</CodeBlock>

