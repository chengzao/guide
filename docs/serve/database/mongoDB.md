---
title: mongodb的安装使用
date: 2020-07-20
sidebar: "auto"
tags:
  - mongodb
---

- [docs.mongodb](https://docs.mongodb.com/manual/reference/method/db.collection.update/#db.collection.update)
- [mongodb download](https://www.mongodb.com/download-center?jmp=nav#community)
- [mongodb document](https://docs.mongodb.com/master/tutorial/install-mongodb-on-red-hat/)

## 安装

- `service mongod start|stop|restart`
- mongo 默认端口: `ip:27017`

- tgz 安装

```bash
$ wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-3.4.7.tgz
$ tar zxvf mongodb-linux-x86_64-rhel70-3.4.7.tgz
$ mv mongodb-linux-x86_64-rhel70-3.4.7 mongodb
$ cd mongodb
$ mkdir conf logs db
$ sudo mv mongodb /usr/local/
$ vim /usr/local/mongodb/conf/mongodb.conf

  dbpath=/usr/local/mongodb/db
  logpath=/usr/local/mongodb/logs/mongodb.log
  bind_ip=0.0.0.0
  port=27018
  fork=true
  nohttpinterface=true

$ cp /usr/local/mongodb/bin/mongo /bin/
$ /usr/local/mongodb/bin/mongo -f /usr/local/mongodb/conf/mongodb.conf
$ /bin/mongo 127.0.0.1:27018 -u -p
```

- docker

```bash
docker pull mongo
# 创建数据卷
docker volume create my-mongo-db
docker volume create my-mongo-configdb
# 运行容器
docker run -d -p 27017:27017 --name mymongo -v my-mongo-db:/data/db  -v my-mongo-configdb:/data/configdb mongo
# 进入容器
docker exec -it mymongo mongo
```



## 基础命令

- `show dbs / show databases` # 显示当前的所有的数据库

- `db` # 查看当前所处的数据库

- `show collections / show tables` # 显示当前的所有的集合

- `use todos` # 进入指定的数据库中, 可以不存在 数据库和集合， mongodb 会在写入 docs 中自动创建

- `CRUD` # 增删改查 `insert / find / update / delete`

- `<collection>` 内为具体的集合名称，例： `db.user.insert({"name":"zhangsan"})`

- `db.<collection>.drop()` # 删除相应的集合



  ```bash
  # 创建使用
  use del_database

  # 在当前数据库中的item集合中写入数据
  db.items.insertOne({"aaa":"bbb"})

  # 查看集合
  show collections

  # 删除
  db.items.drop()

  # 查看是否删除成功
  show collections
  ```



- `db.dropDatabase()` # 删除相应的数据库

## 创建数据库

- `use todos`

```bash
# 查看所有数据库
show dbs
# 进入指定的数据库中, 可以不存在 数据库和集合， mongodb会在写入docs中自动创建
use todos

# 用show dbs 查看是否创建成功
# 由于todos中没有任何数据，显示不存在

# 在todos中的items中插入数据
db.items.insert({"name":"xiao ming"})
# 用show dbs 查看是否创建成功
```

## 删除数据库

- `db.dropDatabase()`

```bash
# 创建使用
use del_database

# 查看当前正在使用的数据库
db

# 删除
db.dropDatabase()

# 查看是否删除成功
show dbs
```

## 创建集合

- `db.createCollection(name, options)`

  - `name`: 要创建的集合名称
  - `options`: 可选参数, 指定有关内存大小及索引的选项



```bash
# optins:
#   capped:（可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，
#           当达到最大值时，它会自动覆盖最早的文档
#           当该值为 true 时，必须指定 size 参数

#   autoIndexId: (可选）如为 true，自动在 _id 字段创建索引。默认为 false

#   size:  (可选）为固定集合指定一个最大值（以字节计）
#          如果 capped 为 true，也需要指定该字段

#   max:  (可选）指定固定集合中包含文档的最大数量

# 方式一
db.createCollection("item1")

# 方式二
db.createCollection("item2", { capped : true, autoIndexId : true, size :
   6142800, max : 10000 } )

# 方式三
db.item3.insert({"name":"hello"})
```



## 插入文档

- 插入文档： 一个写入对象： `db.<collection>.insert({})`



```bash
# 写入数据
db.items.insert({"name":"xiao ming"})

# 使用以下命令查看是否成功插入数据
db.items.find({})
```

- 插入文档： 多个写入包含多个对象的数组： `db.<collection>.insert([{},{}])`

```bash
# 写入数据
db.items.insert([{"name":"abc"},{"name":"efg"}])

# 使用以下命令查看是否成功插入数据
db.items.find({})
```



- `db.<collection>.insertOne({})` # 插入一个文档

```bash
# 写入数据
db.items.insertOne({"name":"aaa"})

# 使用以下命令查看是否成功插入数据
db.items.find({})
```

- `db.<collection>.insertMany([{},{}])` # 插入多个文档

```bash
# 写入数据
db.items.insertMany([{"name":"bbb"},{"name":"ccc"}])

# 使用以下命令查看是否成功插入数据
db.items.find({})
```

- 数据定义为一个变量插入

```bash
# 定义变量
document=({"name": 'MongoDB'});
# 插入数据
db.items.insert(document)

# 使用以下命令查看是否成功插入数据
db.items.find()
```

## 查询文档

- 语法格式: `db.collection.find(query, projection)`

  - query ：可选，使用查询操作符指定查询条件
  - projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）

- `$lt, $lte, $gt, $gte, $eq, $inc, $or ...`

```bash
# 写入数据
db.items.insert([
  {"count": 1},
  {"count": 2},
  {"count": 3},
  {"count": 4},
  {"count": 5}
])

# 等于 $eq
db.items.find({"count":{$eq:3}}).pretty()

# 小于 $lt
db.items.find({"count":{$lt:3}}).pretty()

# 小于或等于 $lte
db.items.find({"count":{$lte:3}}).pretty()

# 大于 $gt
db.items.find({"count":{$gt:3}}).pretty()

# 大于或等于 $gte
db.items.find({"count":{$gte:3}}).pretty()

# 不等于 $ne
db.items.find({"count":{$ne:3}}).pretty()
```

- AND 条件 和 OR 条件

```bash
# 写入数据
db.items.insert([
  {"count": 1, "name":"a"},
  {"count": 2, "name":"b"},
  {"count": 3, "name":"c"},
  {"count": 4, "name":"b"},
])

# AND 条件
db.items.find({"count": 1, "name":"a"}).pretty()

# OR 条件
db.items.find({$or:[{"count":1},{"name":"b"}]}).pretty()

# AND 和 OR 联合使用
db.items.find({"name": "b", $or: [{"count": 2},{"count": 4}]}).pretty()
```

- `db.<collection>.find().pretty()` 格式化的方式来显示所有文档

- `db.<collection>.find({})` 如果传递空对象查找该集合中的所有 docs

- `db.<collection>.find({},options)`

- `db.<collection>.find({}).sort({})` 按{key:1}排序 (1 正序排序 ， -1 降序排序)

```bash
# 写入数据
db.items.insert([
  {"count": 5, "name":"a"},
  {"count": 2, "name":"b"},
  {"count": 7, "name":"c"},
  {"count": 8, "name":"b"},
  {"count": 1, "name":"d"},
  {"count": 4, "name":"e"},
])

# 按照 count 升序排列
db.items.find({}).sort({"count": 1})

# 按照 count 降序排列
db.items.find({}).sort({"count": -1})
```

- `db.<collection>.find({}).limit(number)` 限制显示 number 条

```bash
# 写入数据
db.items.insert([
  {"count": 1, "name":"a"},
  {"count": 2, "name":"b"},
  {"count": 3, "name":"c"},
  {"count": 4, "name":"b"},
  {"count": 5, "name":"d"},
  {"count": 6, "name":"e"},
])

db.items.find({}).limit(3)
```

- `db.<collection>.find({}).skip(number1).limit(number2)` 限制显示 number2 条, 从 number1+条数据

```bash
# 写入数据
db.items.insert([
  {"count": 1, "name":"a"},
  {"count": 2, "name":"b"},
  {"count": 3, "name":"c"},
  {"count": 4, "name":"b"},
  {"count": 5, "name":"d"},
  {"count": 6, "name":"e"},
])

db.items.find({}).skip(3).limit(3)
```

- `db.<collection>.find({}).skip((pageIndex -1)* pageNum).limit(pageNum)` 分页查询

- `db.<collection>.findOne({})` 查找符合条件的第一个

- `db.<collection>.find({}).count()` 查找集合中符合内容的条数

- 内嵌文档： 集合中嵌套集合为内嵌 ， 查找方式需要`key`值带 引号

  - 例： `db.user.find({"hor.arr":"hero"})`方式查找

## 更新文档

- update 语法格式

```bash
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)


`query` : update的查询条件

`update` : update的对象和一些更新的操作符（如$,$inc...)

`upsert` : 可选，这个参数的意思是，如果不存在update的记录，
          是否插入objNew,true为插入，默认是false，不插入

`multi` : 可选，mongodb 默认是false,只更新找到的第一条记录，
          如果这个参数为true,就把按条件查出来多条记录全部更新

`writeConcern` :可选，抛出异常的级别
```

- [一些更新的操作符（如$,$inc...](https://docs.mongodb.com/manual/reference/operator/query-comparison/)

- `db.<collection>.update(obj,newObj,options)`

  - `options: { multi: true }` 修改多个 ， 默认为 false 只有该一个
  - 如果`obj`中内容不存在，会添加`newObj`中的新内容到原`obj`的属性和内容
  - `$set`: 根据`newObj`中的内容替换`obj`中的指定想项；
  - `$push`: 向数组中添加元素
  - `$addToSet`: 向数组中添加元素，如果已存在则不添加

- `db.<collection>.update(obj,newObj,options)` newObj 完全替换 obj 的内容

```bash
db.col.update({'title':'MongoDB 教程'},{'name':'MongoDB'})

# 使用以下命令查看数据
db.col.find().pretty()
```

- `db.<collection>.update(obj,newObj,options)` 更新找到的第一条记录

```bash
# 写入数据
db.col.insert({
  title: 'MongoDB 教程',
  description: 'MongoDB 是一个 Nosql 数据库'
})
# 通过 update() 方法来更新标题(title)
db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})

# 使用以下命令查看是否成功插入数据
db.col.find().pretty()
```

- `db.<collection>.update(obj,{$set: newObj},{multi:true})` 修改多条相同的文档内容

  ```bash
  # 修改多条相同的文档，则需要设置 multi 参数为 true
  db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},{multi:true})

  # 使用以下命令查看是否成功插入数据
  db.col.find().pretty()
  ```

- `db.<collection>.update(obj,{$set: newObj},{upsert:true})` 插入

```bash
db.items.insert([{"name": "a", "count": 1},{"name": "b", "count": 2},{"name": "c", "count": 1}])
db.items.update( { "count" : { $gt : 1 } } , { $set : { "test2" : "OK"} }, {upsert:true} )
db.items.find().pretty()
db.items.drop()
```

- `db.<collection>.update(obj,{$unset: newObj})`

  - `$unset`: 根据 newObj 中的 key，删除 Obj 中的指定内容的属性

```bash
db.col.update({"_id": ObjectId("5d0324c217b15f47649bb209")}, {$unset: {description:""}})
```

- `db.<collection>.updateOne(obj,newObj)` # 更改一个

```bash
db.col.update({"title": "MongoDB 教程"},{$set:{"description":"aaa"}})
```

- `db.<collection>.updateMany(obj,newObj)` # 更改多个

```bash
db.col.updateMany({"title": "MongoDB 教程"},{$set:{"description":"aaa"}})
```

- save 通过传入的文档来替换已有文档

```bash
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)

`document` : 文档数据。
`writeConcern` :可选，抛出异常的级别。
```

- save 实例

```bash
# 替换 5d032b652161e2f9a5baded5的内容
db.col.save({
  "_id" : ObjectId("5d032b652161e2f9a5baded5"),
  "title" : "MongoDB 教程",
  "description" : "bbb"
})
# 通过 find() 命令来查看替换后的数据
db.col.find().pretty()
```

## 删除文档

- 2.6 版本以后的，语法格式

```bash
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)

`query` :（可选）删除的文档的条件

`justOne` : （可选）如果设为 true 或 1，则只删除一个文档，
如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档

`writeConcern` :（可选）抛出异常的级别
```

- `db.<collection>.remove({})` # 如果传递空对象则删除全部

```bash
db.items.insert([{"name": "a", "count": 1},{"name": "b", "count": 2}])

db.items.remove({})

db.items.find().pretty()

db.items.drop()

# remove() 方法 并不会真正释放空间
# db.repairDatabase() 来回收磁盘空间
db.repairDatabase()
db.runCommand({ repairDatabase: 1 })
```

- `db.<collection>.deleteOne({})`

```bash
db.items.insert([{"name": "a", "count": 1},{"name": "a", "count": 2}])

db.items.deleteOne({"name": "a"})

db.items.find().pretty()

db.items.drop()
```

- `db.<collection>.deleteMany({})`

```bash
db.items.insert([{"name": "a", "count": 1},{"name": "a", "count": 2}])

# 删除全部符合条件的
db.items.deleteMany({"name": "a"})

# 删除集合下全部文档
db.items.deleteMany({})

db.items.find().pretty()

db.items.drop()
```

## 授权登录



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


