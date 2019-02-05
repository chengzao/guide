# mongodb

## yum安装

- `https://www.mongodb.com/download-center?jmp=nav#community`
- `https://docs.mongodb.com/master/tutorial/install-mongodb-on-red-hat/`
- `vim /etc/yum.repos.d/mongodb-org-3.4.repo`

```bash
[mongodb-org-3.4]
name = MongoDB Repository
baseurl = https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck = 1
enabled = 1
gpgkey = https://www.mongodb.org/static/pgp/server-3.4.asc
```

- sudo yum install -y mongodb-org
- vim /etc/mongod.conf
- service mongod start|stop|restart

- mongo 192.168.2.33:27017

## tgz安装

- `wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-3.4.7.tgz`
- `tar zxvf mongodb-linux-x86_64-rhel70-3.4.7.tgz`
- `mv mongodb-linux-x86_64-rhel70-3.4.7 mongodb`
- `cd mongodb`
- `mkdir conf logs db`
- `sudo mv mongodb /usr/local/`
- `vim /usr/local/mongodb/conf/mongodb.conf`

```bash
dbpath=/usr/local/mongodb/db
logpath=/usr/local/mongodb/logs/mongodb.log
bind_ip=0.0.0.0
port=27018
fork=true
nohttpinterface=true
```

- `cp /usr/local/mongodb/bin/mongo /bin/`
- `/usr/local/mongodb/bin/mongo -f /usr/local/mongodb/conf/mongodb.conf`
- `/bin/mongo 127.0.0.1:27018 -u -p`

## 基本使用

- auth

```bash
docker pull mongo
docker run --name some-mongo -p 27017:27017  -d mongo:latest

docker exec -it some-mongo mongo

# 切换到admin数据库
use admin
db.createUser({user: "root", pwd: "root", roles: [{role: "userAdminAnyDatabase", db:"admin"}]})
# 使用db.auth('用户名','密码')进行授权
db.auth('root','root') # 1
db.system.users.find({}).pretty();
show user;

# 创建用户czh, 管理todos
use todos
db.createUser({user: "czh", pwd: "czh", roles: [{role: "readWrite", db: "todos"}]})
db.auth('czh', 'czh') # 1
# 修改密码 并且 修改角色为只读
db.updateUser('czh',{pwd:'admin',roles:[{role:'read',db:'todos'}]})

use admin
# 删除czh用户
db.dropUser('czh') # true
```

- base

```bash
- https://docs.mongodb.com/manual/reference/method/db.collection.update/#db.collection.update

- show dbs / show databases # 显示当前的所有的数据库

- db  # 查看当前所处的数据库

- show collections # 显示当前的所有的集合

- use todos  # 进入指定的数据库中, 可以不存在 数据库和集合， mongodb会在写入docs中自动创建

- CRUD # 增删改查 insert / find / update / delete

- <collection> 内为具体的集合名称，例： db.user.insert({"name":"zhangsan"})

- db.<collection>.drop() # 删除相应的集合

- db.dropDatabase() # 删除相应的数据库
```

- insert

```bash
# 插入文档/ 一个写入对象，多个写入包含多个对象的数组
- db.<collection>.insert({}) / db.<collection>.insert([{},{}])

- db.<collection>.insertOne({})  # 插入一个文档

- db.<collection>.insertMany([{},{}]) # 插入多个文档
```

- find

```bash
# https:#docs.mongodb.com/manual/reference/operator/query/

# 例：$gt / $gte / $eq / $inc / $or ...

- db.<collection>.find({})  # 如果传递空对象查找该集合中的所有docs

# 如果传递空对象查找该集合中的所有docs;
# options: { _id: 0, uname: 1 } : 查找过滤/ 投影需要显示的内容， 1表示显示， 0 表示不显示
- db.<collection>.find({},options)

- db.<collection>.find({num:{$gt: 10}})  # 查询大于10的

- db.<collection>.find({}).sort({})  # 按{key:1}排序 (1 正序排序 ， -1 降序排序)

- db.<collection>.find({}).limit(10)  # 限制显示10条， 从1-10条数据

- db.<collection>.find({}).skip(10).limit(10)  # 限制显示10条, 从10-20条数据

- db.<collection>.find({}).skip((pageIndex -1)* pageNum).limit(pageNum)  # 分页查询

- db.<collection>.findOne({}) # 查找符合条件的第一个

- db.<collection>.find({}).count() # 查找集合中符合内容的条数

# 内嵌文档： 集合中嵌套集合为内嵌 ， 查找方式需要key值带 引号。
# 例： db.user.find({"hor.arr":"hero"})方式查找

```

- update

```bash
# https://docs.mongodb.com/manual/reference/method/db.collection.update/#db.collection.update

- db.<collection>.update(obj,newObj,options)  # newObj会替换所有obj中的内容
  options: { multi: true } // 修改多个 ， 默认为false只有该一个

# https://docs.mongodb.com/manual/reference/operator/update/

# $set: 根据newObj中的内容替换obj中的指定想项；
# 如果obj中内容不存在，会添加newObj中的新内容到原obj的属性和内容
# 默认只修改一个

# $push: 向数组中添加元素
# $addToSet: 向数组中添加元素，如果已存在则不添加

- db.<collection>.update(obj,{$set: newObj})

# $unset: 根据newObj中的key，删除Obj中的指定内容的属性
- db.<collection>.update(obj,{$unset: newObj})

- db.<collection>.updateOne(obj,newObj) # 更改一个

- db.<collection>.updateMany(obj,newObj) # 更改多个

- db.<collection>.replaceOne(obj,newObj) # 替换
```

- delete

```bash
- https://docs.mongodb.com/manual/reference/method/db.collection.remove/#db.collection.remove

- db.<collection>.remove({})  # 如果传递空对象则删除全部

- db.<collection>.deleteOne({})

- db.<collection>.deleteMany({})
```

## mongoose

- `npm install mongoose`

```bash
- Schema 约束文档结构
- Model 集合中所有文档的对象， 即 collection
- Document 集合中具体的文档， 即 docs 数据
```

- `use api`

```bash
# https://mongoosejs.com/docs/index.html

- var mongoose = require('mongoose'); # 引入mongoose库
- mongoose.connect(url,{useMongoClient: true}) # 连接mongodb
- mongoose.disconnect() # 断开连接
- mongoose.connection.once('open',()=>{}) # 监听数据库连接成功的事件
- mongoose.connection.once('close',()=>{}) # 监听数据库断开连接的事件

- Model 类似mongodb中的Collection
- Document 是 Model 的实例， 与mongodb中的Document一致

var schema = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: 'female' # 默认值
  }
})

# 创建模型, 需要在填入数据文档时才会在mongodb中创建, (use)
- var MyModel = mongoose.model(ModelName, schema)


# 插入数据
- MyModel.create({}, (err, res) => {}) # {} : 集合内的内容对象
- MyModel.create([{},{},...], (err, res) => {}) # {} : 集合内的内容对象


# 查询
- MyModel.find(condition, [projection],[option],callback) # 返回文档数组
  - condition # 查询条件
  - projection # 投影 , 即需要获取到的数据
  - option # 查询选项 (skip , limit ...)
  - callback(err, doc) # doc对象是当前model的实例
    doc可以执行 doc.save() # https://mongoosejs.com/docs/api.html#Document
- MyModel.findOne(condition, [projection],[option],callback) # 返回具体文档
- MyModel.findById(condition, [projection],[option],callback) # 返回具体文档


# update
- https://mongoosejs.com/docs/api.html#model_Model.update
- MyModel.update(confitions,doc,[options],[callback])
- MyModel.updateMany(confitions,doc,[options],[callback])
- MyModel.updateOne(confitions,doc,[options],[callback])


# delete
- https://mongoosejs.com/docs/api.html#model_Model.deleteMany
- MyModel.deleteMany(confitions,[options],[callback])
- MyModel.deleteOne(confitions,[options],[callback])

# https://mongoosejs.com/docs/api.html#model_Model.remove
- MyModel.remove(confitions,[callback])

- Model.count(filter, [callback]) # 统计文档数量 filter: Object
```

- `use`

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

- createUser

  <details>
  <summary>点击展开内容</summary>

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

  </details>
