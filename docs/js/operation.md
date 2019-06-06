# 条件运算

## 运算符

- `一元操作符` `++, --  +  -`
- `逻辑操作符` `! && ||`
- `基本运算符` `+, -, *, /, %`
- `关系操作符` `>, <, >=, <=, ===, ==, !=, !==`
- `条件操作符` `(三元运算符)  ? :`
- `赋值运算符` `+=, -=, *=, /=, %= ,=`
- `逗号运算符` `,`
- `()	+ - * /  %(取余)`
- `%` 运算结果的正负号由第一个运算值的正负号决定

<CodeBlock>

```js
true +1 //2
flase+1 //1

12%5  //2
-1 % 2 // -1
1 % -2 // 1
```

</CodeBlock>

- `注意:a++和++a  与 a--和--a 的区别`
  - `++a;`   先自增,后计算
  - `a++;`   先运算,后自增
  - `--a;`   先自减,后计算
  - `a--;`   先运算,后自减

<CodeBlock>

```js
var x=0.2-0.1;  // 0.1
var y=0.3-0.2;  // 不等于0.1
x==y;  // false
6%5； //1
3%5;  //3

var x=1;
x++;  // 1
1+x++; //3
var y=1;
++y;   //2
++y+1; //4

var a=5;
a-- ;  //5
a---1; //3
var b=5;
--b;  //4
--b-1  //2
```

</CodeBlock>

### 按位操作符

- [按位操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)

<CodeBlock>

```bash
按位与（ AND）	a & b	对于每一个比特位，只有两个操作数相应的比特位都是1时，结果才为1，否则为0
按位或（OR）	a | b	对于每一个比特位，当两个操作数相应的比特位至少有一个1时，结果为1，否则为0
按位异或（XOR）	a ^ b	对于每一个比特位，当两个操作数相应的比特位有且只有一个1时，结果为1，否则为0
按位非（NOT）	~ a	反转操作数的比特位，即0变成1，1变成0
左移（Left shift）	a << b	将 a 的二进制形式向左移 b (< 32) 比特位，右边用0填充
有符号右移	a >> b	将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位
无符号右移	a >>> b	将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位，并使用 0 在左侧填充
```

</CodeBlock>

### 运算符优先级

<CodeBlock>

```bash
1 ()

2 !、-(负数)、++、-- (正数省略+)(一元运算)

3 *、/、%

4 +、- (加,减)(二元运算)

5 <、<=、<、>= (一级逻辑运算)

6 ==、!=、===、!==、 (二级逻辑运算)

7 &&

8 ||

9 ?: (三元运算)

10 =、+=、-=、*=、/=、%= (赋值运算)
```

</CodeBlock>

### 逻辑运算符

- `&& (并且) , || (或者)  , ! (取反)`
- 逻辑运算符的优先级

<CodeBlock>

```bash
! > && > ||

()>*,/ > +,-
```

</CodeBlock>

- `| 或运算   两个二进制位都为0,则结果为0,否则为1`
- `& 与运算   两个二进制位都为1,则结果为1,否则为0`
- `^ 异或运算 两个二进制位不相同,则结果为1,否则为0`
- `~ 否运算   对一个二进制位取反`

<CodeBlock>

```js
0 | 3 ==> 00 | 11 ==> 11 ==> 3
2 ^ 3 ==> 10 | 11 ==> 01 ==> 1

var a = 10;
var b = 99;
a ^= b, b ^= a, a ^= b;
a // 99
b // 10
```

</CodeBlock>

### 比较运算符

- `>  >=   <  <=   ==   ===`
- `注意： === 与 == 的区别.`
- `==  值 相等`
- `=== 值 和类型都相等`

<CodeBlock>

```js
var a=1 ;
var b='1';
a==b ;  // true
a===b ;  // false
```

</CodeBlock>

- 在代码中没有这样的形式：`110>pj>100`; 如果一定要表达这种形式：使用`110 > pj && pj> 100`

## 赋值运算符

<CodeBlock>

```js
x += y // 等同于 x = x + y
x -= y // 等同于 x = x - y
x *= y // 等同于 x = x * y
x /= y // 等同于 x = x / y
x %= y // 等同于 x = x % y
x >>= y // 等同于 x = x >> y
x <<= y // 等同于 x = x << y
x >>>= y // 等同于 x = x >>> y
x &= y // 等同于 x = x & y
x |= y // 等同于 x = x | y
x ^= y // 等同于 x = x ^ y
```

</CodeBlock>

## 逗号运算符

- 逗号运算符用于对两个表达式求值,并返回后一个表达式的值

<CodeBlock>

```js
'a', 'b' // "b"

var x = 0;
var y = (x++, 10);
x // 1
y // 10
```

</CodeBlock>

## `void`

`void`运算符的作用是执行一个表达式,然后不返回任何值,
或者说返回`undefined`

<CodeBlock>

```js
var x = 3;
void (x = 5) //undefined
x // 5
```

</CodeBlock>

## 字符串的比较

- 字符串按照字典顺序进行比较
- 首先比较首字符的 Unicode 码点,如果相等;
- 再比较第二个字符的 Unicode 码点,以此类推

<CodeBlock>

```js
'cat' > 'dog' // false
'cat' > 'catalog' // false
'cat' > 'Cat' // true
'大' > '小' // false
```

</CodeBlock>

## escape与unescape

- `escape("大")` -> `"%u5927"`
- `unescape("%u5927")` -> `"大"`

## NaN

- `NaN是 JavaScript 的特殊值,表示"非数字"(Not a Number)`

<CodeBlock>

```js
typeof NaN // 'number'
NaN == NaN // flase
NaN === NaN //false
[NaN].indexOf(NaN) // -1
Boolean(NaN) // false
```

</CodeBlock>

- `NaN与任何数(包括它自己)的运算,得到的都是NaN`
- 判断NaN的方法

<CodeBlock>

```js
//isNaN方法可以用来判断一个值是否为NaN
//isNaN只对数值有效,如果传入其他值,会被先转成数值
isNaN(NaN) // true
isNaN(123) // false
isNaN({}) // true
isNaN('Hello') // true
isNaN(['xzy']) // true

//对于空数组和只有一个数值成员的数组,isNaN返回false
isNaN([]) // false
isNaN([123]) // false
isNaN(['123']) // false
```

</CodeBlock>

## if else

<CodeBlock>

```js
  if (condition) {
  } else {
  }

  if (条件/boolean){
    代码块1
  }else if (条件/boolean){
    代码块2
  }
```

</CodeBlock>

## switch case

<CodeBlock>

```js
switch (变量){
	case 变量的值1:
		// 代码块1;
		break;
	case 变量的值2:
		// 代码块2;
		break;
	.....
	default:
		// 默认代码块;
		break;
}
```

</CodeBlock>

## 三元运算符/三目运算符

- `boolean表达式 ? 操作一:操作二;`
- `(condition) ? expr1 : expr2`
- 如果condition为`true`,则返回expr1的值,否则返回expr2的值

<CodeBlock>

```js
var a = 16;
var b = 15;
var c = 24;
//让a和b进行比较,找出大的,再用大的跟c比较
(a > b ? a : b)>c ? alert(a > b ? a : b):alert(c);
```

</CodeBlock>

## 循环语句

### while循环

- 当程序运行到while的时候,会判断while后面括号中的内容,
- 如果内容为true,会执行下面的代码,
- 如果为内容为false,则不执行这段代码,跳过这段代码执行下面的内容.

<CodeBlock>

```js
while(条件语句/boolean)｛
		//重复执行的代码块
｝
```

</CodeBlock>

- 如果在写循环的时候一定要有循环的结束条件,如果没有就是死循环,就是一Bug.
- 终止循环：break
- 立即结束本次循环,开始下一次循环：continue

<CodeBlock>

```javascript
	例：
	var a = 1;
	while(a <= 100) {
		console.log(a);
		a ++;//a = a + 1;
	}
	console.log("over");
```

</CodeBlock>

### do while

代码从上到下执行的过程中如果遇到了do
就会先执行一次do后面的代码,执行之后再
通过`while`来进行判断,如果判断通过那么再执行一次,
如果判断不通过却结束循环.

<CodeBlock>

```js
do{
	//要循环执行的代码块
}while (条件语句/boolean)
```

</CodeBlock>

- 区别
- `while`先判断再做,
- `do-while`先做再判断；

<CodeBlock>

```js
var k = 0;
do{
    sum += k;
    k++;
}while(k<101);
console.log(sum);
```

</CodeBlock>

### for循环

<CodeBlock>

```js
for (initialize; test; increment) {
  statement
}

// 循环数组
for( var i=0 ,len=arr.lenth; i<len; i++ ){
// 执行语句
}

-------------------------------------
//从1加到100 计数器思想
var sum = 0;
for(var i=0; i < 101 ; i++ ){
    sum += i;
}
alert(sum);
```

</CodeBlock>

- `for in`循环用来遍历一个对象的全部属性
- `for in`它遍历的是对象所有可遍历(`enumerable`)的属性,会跳过不可遍历的属性
- `for in`它不仅遍历对象自身的属性,还遍历继承的属性

<CodeBlock>

```js
// name 是 Person 本身的属性
function Person(name) {
  this.name = name;
}

// describe是Person.prototype的属性
Person.prototype.describe = function () {
  return 'Name: '+this.name;
};

var person = new Person('Jane');

// for...in循环会遍历实例自身的属性(name),
// 以及继承的属性(describe)
for (var key in person) {
  console.log(key);
}
// name
// describe

//只想遍历对象本身的属性
for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
// name
```

</CodeBlock>

## break与continue

- `break 终止循环`
- `continue 跳出本次循环,进入下一次循环`

<CodeBlock>

```js
// break
var a = 0;
while (a < 5) {
	a++; //a = a + 1;
	if(a==3){
	break;  //终止循环
	}
	console.log(a);
}
console.log("break is over");
// 1 2 break is over
```

```js
// continue
var a = 0;
while (a < 5) {
	a++; //a = a + 1;
	if(a==2){
	continue;//跳出本次循环,进入下一次循环
	}
	console.log(a);
}
console.log("continue is over");
// 1 3 4 5 continue is over
```

</CodeBlock>

## js中的label标签

- `语句的前面有标签(label)相当于定位符,用于跳转到程序的任意位置`

<CodeBlock title="格式 >>">

```js
label:
  statement
```

</CodeBlock>

<CodeBlock title="label >>">

```js
top:
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) break top;
      console.log('i=' + i + ', j=' + j);
    }
  }

lab1: for(var i =0 ; i<5;i++){
	if(i===3){
		continue lab1
	}
	console.log('i ==> ',i)
}
```

</CodeBlock>
