---
title: mongoose的使用记录
date: 2020-07-20
sidebar: "auto"
tags:
  - mongodb
---

- [mongoose](https://www.npmjs.com/package/mongoose): `npm install mongoose`
- [mongoose 中文](https://cn.mongoosedoc.top/docs/index.html)

- [Mongoose(mongoDB) functions for CRUD Application](https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34)

- Schema 约束文档结构
- Model 集合中所有文档的对象， 即 collection
- Document 集合中具体的文档， 即 docs 数据

- `mongoose version`: `5.5.11`

- 常见的查询条件

<CodeBlock>

```bash
$or   # 或关系
$nor  # 或关系取反
$gt  # 大于
$gte  # 大于等于
$lt  # 小于
$lte  # 小于等于
$ne  # 不等于
$in  # 在多个值范围内
$nin  # 不在多个值范围内
$all  # 匹配数组中多个值
$regex  # 正则，用于模糊查询
$size  # 匹配数组大小
$maxDistance  # 范围查询，距离（基于LBS）
$mod    # 取模运算
$near  # 邻域查询，查询附近的位置（基于LBS）
$exists  # 字段是否存在
$elemMatch  # 匹配内数组内的元素
$within  # 范围查询（基于LBS）
$box  # 范围查询，矩形范围（基于LBS）
$center  # 范围醒询，圆形范围（基于LBS）
$centerSphere  # 范围查询，球形范围（基于LBS）
$slice  # 查询字段集合中的元素（比如从第几个之后，第N到第M个元素
```

</CodeBlock>

## [connect](https://mongoosejs.com/docs/index.html)

- `Mongoose.connect(url, [options]);`

- 默认情况下，用户名和密码可以省略

```bash
Mongoose.connect('MongoDB://localhost/db1');
```

- 需要传递用户名、密码

```bash
Mongoose.connect('MongoDB://username:password@host:port/database?options...');
```

- 实例

```js
// 引入mongoose库
var mongoose = require("mongoose");
// 连接mongodb
mongoose.connect("mongodb://localhost/nodejs_user", { useNewUrlParser: true });

// 将 mongooose.Schema 赋值给一个变量
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
// 监听数据库连接成功的事件
db.once("open", () => {});
// 监听数据库断开连接的事件
db.once("close", () => {});

// 断开连接
mongoose.disconnect();
```

## [Schema](https://mongoosejs.com/docs/api.html#Schema)

- 基本类型

```bash
String | Number | Date | Buffer | Boolean | Schema.Types.Mixed |
Schema.Types.ObjectId | Array | Schema.Types.Decimal128 | Map

# 实例
const studentSchema = new Mongoose.Schema({
  name: String,
  age: Number,
});

mongoose.connect(database).then(
  ()=>{console.log("connected")},
  err =>{console.log("err",err);}
);

```

- 额外约束：[更多详情](https://mongoosejs.com/docs/schematypes.html)

  - 所有类型可用:

  ```bash
  required: boolean or function, 很好理解，如果为真就表示该字段必须要存在

  default: Any or function, 设置默认值

  validate: function, 增加一个校验函数
  ```

  - 字符串 String

  ```bash
  lowercase/upppercase: boolean, 是否做大小写处理

  trim: boolean, 是否去除首尾空格

  match: RegExp, 只有满足特定正则的值才能被接受

  enum: Array, 只有数组内的值才被接受

  minlength/ maxLength: Number, 最小、大长度
  ```

  - 数字 Number / 日期 Date

  ```bash
  min / max: Number / Date (根据类型），必须满足的最大值/最小值
  ```

```bash
const studentSchema = new Mongoose.Schema({
  name: { type: String, minlength: 2 },
  age: { type: Number, min: 12, max: 16},
});
```

- 实例

```bash
# Model 类似mongodb中的Collection
# Document 是 Model 的实例， 与mongodb中的Document一致

var schema = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: 'female' # 默认值
  }
})

# 创建模型, 需要在填入数据文档时才会在mongodb中创建, (use)
var stuModel = mongoose.model('students', schema)
```

## [create](https://mongoosejs.com/docs/api.html#model_Model.create)

- `Modle.create(doc(s), callback)`: 用来创建一个文档或多个文档并添加到数据库中
  - `doc(s)`可以是一个文档对象，也可以是一个文档对象的数组

```js
// 单个
stuModel.create(
  {
    name: "小明",
    age: 21
  },
  function(err) {
    if (!err) {
      console.log("创建文档成功");
    }
  }
);

// 多个
let arrlist = [
  { name: "aaa", age: 12 },
  { name: "bbb", age: 14 }
];
stuModel.create(array, function(err, docs) {
  if (err) {
    return console.error(err);
  }
  console.log(docs);
});
```

- `Modle.insertMany([object], callback)` : 可以批量增加，从内存写到数据库比较实用

## [find](https://mongoosejs.com/docs/api.html#query_Query-find)

```bash
conditions «Object» : 查询条件

[projection] «Object|String»  ：选取字段
            两种方式: {name:1,id:0} / "name -id"

[options] «Object» ：查询选项（skip limit)

[callback] «Function»：回调函数，查询结果会通过回调函数返回
```

- `Modle.find(conditions, [projection], [options], [callback] )`

  - 查询文档 参数分别为：条件、选择字段、操作、回调
  - 查询符合条件的文档
  - 总会返回一个数组

- `Model.findOne([conditions],[projection],[options],[callback])`

  - 查询一个文档 参数分别为：条件、选择字段、操作、回调
  - 查询符合条件的第一个文档
  - 返回第一个具体的文档对象

- `Model.findOneAndDelete()`

  - 查询一个匹配的文档并删除 参数分别为：条件、操作、回调

- `Model.findOneAndRemove()`

  - 查询一个匹配的文档并移除 参数分别为：条件、操作、回调

- `Model.findOneAndUpdate()`

  - 查询一个匹配的文档并更新 参数分别为：条件、更新字段、操作、回调
  - 通过\_id 字段查询文档并更新
  - 相当于 findOneAndUpdate({ \_id: id }, ...) 参数分别为：id、更新字段、操作、回调

- `Model.findById(id,[projection],[options],[callback])`

  - 通过\_id 字段查询文档 相当于 findOne({ \_id: id }) 参数分别为：id、选择字段、操作、回调
  - 根据文档的 id 属性查询文档

- `Model.findByIdAndDelete()`

  - 大多数情况使用它 通过\_id 字段查询文档并删除
  - 相当于 findOneAndDelete({ \_id: id })的快捷方式 参数分别为：id、操作、回调

- `Model.findByIdAndRemove()`

  - 通过\_id 字段查询文档并移除
  - 相当于 findOneAndRemove({ \_id: id })的快捷方式 参数分别为：id、操作、回调

- 实例

```js
stuModel.find({name:"小明"}，function(err,docs){
    if(!err){
		console.log(docs);
    }
})
stuModel.find({},"name -id",function(err,docs){
    if(!err){
        console.log(docs);
    }
})
stuModel.find({},"name -id",{skip:3},function(err,docs){
    if(!err){
        console.log(docs);
    }
})
// promise
stuModel.find({})
 .then((data)=>{
    console.log(data);
  })
 .catch((err)=>{
   console.log(err);
 })
// you can pass query parameter to get particular record
stuModel.find({name:"YOUR_NAME"})
 .then((doc)=>{
    console.log(doc);
 })
.catch((err)=>{
    console.log(err);
});
```

## [update](https://mongoosejs.com/docs/api.html#model_Model.update)

```bash
conditions # 查询条件
doc # 修改后的对象
options # 配置参数
callback # 回调函数
```

- `Model.replaceOne(conditions, doc, [options], [callback] )`

  - 覆盖一个已经存在的文档 相当于 update() 参数分别为：条件、更新字段、操作、回调

- `Model.updateMany(conditions, doc, [options], [callback] )`

  - 更新多个已经存在的文档 相当于 update() 参数分别为：条件、更新字段、操作、回调

- `Model.updateOne(conditions, doc, [options], [callback] )`

  - 更新一个已经存在的文档 相当于 update() 参数分别为：条件、更新字段、操作、回调

- `Model.update()`

  - 更新一个文档 参数分别为：条件、更新字段、操作、回调

- 实例

```bash
stuModel.update({name:"小明"}，{$set:{age:20}},function(err){
    if(!err){
        console.log("修改成功")；
    }
})
```

## [delete](https://mongoosejs.com/docs/api.html#model_Model.deleteMany)

- `Model.deleteMany(confitions,[options],[callback])`

  - 删除所有文档集合的匹配条件 相当于 remove() 参数分别为：条件、操作、回调

- `Model.deleteOne(confitions,[options],[callback])`
  - 删除匹配条件的文档集合的第一个文档 想当于 remove() 参数分别为：条件、回调

## [remove](https://mongoosejs.com/docs/api.html#model_Model.remove)

- `Model.remove(confitions,[callback])`

  - 移除所有匹配的文档 参数分别为：条件、回调

- 实例

```bash
Model.remove(condition，function(err, data){
    console.log("删除成功！")；
})
```

## [count](https://mongoosejs.com/docs/api.html#model_Model.count)

- `Model.count(conditions,[callback])` 统计文档数量

```js
let Schema = mongoose.Schema;
let schema = new Schema({
  name: String,
  age: Number
});
let Person = mongoose.model("Person", schema);
Person.count({ name: "noshower" }, function(err, count) {
  if (err) {
    return console.error(err);
  }
  console.log(count);
});
```

## Document

```js
let Schema = mongoose.Schema;
let schema = new Schema({
  name: String,
  age: Number
});
let Person = mongoose.model("Person", schema);

let person = new Person({
  name: "小明",
  age: 24
});
//	此时还没有插入数据库中

/*
	document的方法
		Model#save([option],[callback])
*/
person.save(function(err, product) {
  if (err) {
    return console.error(err);
  }
  console.log(product); //1
});
/*
	doc.update(update,[options],[callback] )
		-	修改对象
	doc.remove([callback])
		-	删除文档

	doc.get(name)===doc[name]
    doc.set(name,value)===doc[name]=value
    doc._id
    doc.toObject   转化为JS对象
    转化为js对象才能删除其中一个属性
    但转化后document的方法都不能使用了
*/
```

- 关联表的操作

- 建立约束模型式，指定关联字段

```js
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var article = new Schema({
  //关联字段 - 内容分类的id
  category: {
    //类型
    type: mongoose.Schema.Types.ObjectId,
    //引用
    ref: "Category" //数据库中集合的名字
  }
});
// - ref 表示要关联的集合名字
// - type 表示通过 ObjectId 关联该集合
```

- 关联查询表时，使用`populate`

```bash
Query.populate(path, [select], [model], [match],[options])

`path`:你要查询的集合名

`model`:类型Model，指定要关联字段的model,没有指定的话，就会使用ref指定的

`match`:查询条件

`options`:查询参数，如limit,skip等

# 实例
content.findOne()
    .populate({path:['user','catagory']})
    .exec(function(err,data){
})
```

## 支持 Promise

```js
content
  .find()
  .count()
  .then(function(data) {
    return content
      .find()
      .skip(data / 2)
      .limit(10);
  })
  .then(function(data) {
    console.log(data);
  });
```

## example

<CodeBlock>

```js
var mongoose = require('mongoose');
var url = 'mongodb://localhost/test';
mongoose.connect(url,{useMongoClient: true})
mongoose.connection.once('open',()=>{
  console.log('数据库连接成功')
})
mongoose.connection.once('close',()=>{
  console.log('数据库已断开连接')
})

// 创建 Schema
var Schema = mongoose.Schema;

var user = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: 'female' // 默认值
  }
})

// mongoose.model(ModelName, schema)
// ModelName 即需要映射的集合名
var Todos = mongoose.Model('users', user);

// 插入数据
Todos.create({"name": "zhangsan","age": 12, "gender": "man"}, (err, doc) => {
  if(err) }{
    console.log('error',error)
  }else{
    console.log('success')
  }
})

// 创建文档Document
var doc = new Todos({"name": "li si","age": 22, "gender": "man"});
// Model#save([options], callback) 保存文档到数据模型中
doc.save((err) => {})

// TODO
```

</CodeBlock>

<CodeBlock>

```bash
- use admin
- 添加管理员用户
  db.createUser({
    user:"admin",
    pwd:"123",
    roles:["userAdminAnyDatabase"]
  })

  db.createUser({user:"root",pwd:"123",roles:["root"]})

- vim /etc/mongod.conf 添加修改如下
  # ip
  bindIp: 0.0.0.0
  # 认证
  security:
    authorization: enabled

- service mongod restart
- service mongod status
- 进入mongo
  # 方式1
  mongo --port 27017 -u admin -p 123 --authenticationDatabase "admin"
  # 方式2
  mongo
  use admin
  db.auth("admin","123")
  db.system.users.find()
  show users

  # 添加远程用户
  use test
  db.createUser({
    user:"test",
    pwd:"123",
    roles:[{role:"readWrite",db:"test"}]
  })
  exit # 退出

  # 进入mongo
  mongo --port 27017 -u test -p 123 --authenticationDatabase "test"
  use test
  show tables
```

</CodeBlock>
