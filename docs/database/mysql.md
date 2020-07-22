---
title: mysql
date: 2020-07-20
sidebar: "auto"
tags:
  - mysql
---

## mysql

- [mysql download](https://dev.mysql.com/downloads/repo/yum/)
- [mysql-yum-repo-quick-guide](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/)
- `wget http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm`
- `sudo rpm -Uvh mysql57-community-release-el7-11.noarch.rpm`
- `yum update`
- `sudo yum install mysql-community-server -y`
- 启动 mysqld 服务: `sudo service mysqld start`
- 开启 mysqld 开机启动服务: `sudo systemctl enable mysqld.service`
- 检测 mysqld 服务状态: `sudo service mysqld status`
- 检测 mysqld 服务状态: `sudo systemctl status mysqld.service`
- 获取 mysql-root 密码: `sudo grep 'temporary password' /var/log/mysqld.log`
- 进入 mysql: `mysql -uroot -p`
- 修改 mysql-root 密码: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';`
- 添加远程登录用户: `GRANT ALL PRIVILEGES ON *.* TO 'user1'@'%' IDENTIFIED BY 'UserName123!' WITH GRANT OPTION;`

## 登录与退出

- mysql 登录命令

<CodeBlock>

```bash
mysql -h localhost -P 3306 -u root -p
# -h：主机名
# -P：端口 (大写的字母P)
# -u：用户名
# -p：密码 (小写的字母p)

# mysql默认连接localhost和3306，所以可以省略-h和-P
mysql -u root -p
```

</CodeBlock>

- 退出登录

<CodeBlock>

```bash
- exit;
- quit;
- \q;
```

</CodeBlock>

- `prompt [参数] [字符串]`提示符

<CodeBlock>

```bash
# 参数：
- \h   # 服务器名称
- \d   # 当前数据库
- \u   # 当前用户
- \D   # 完整的日期

ps : prompt mysql \h>
```

</CodeBlock>

## 数据类型

- `tinyint` : 有符号值(signed) => (-2<sup>7</sup> ~ 2<sup>7</sup>-1) | 无符号值(unsigned) => (0 ~ 2<sup>8</sup>-1)
- `smallint` : 有符号值 => (-2<sup>15</sup> ~ 2<sup>15</sup>-1) | 无符号值 => (0 ~ 2<sup>16</sup>-1)
- `mediumint` : 有符号值 => (-2<sup>23</sup> ~ 2<sup>23</sup>-1) | 无符号值 => (0 ~ 2<sup>24</sup>-1)
- `int` : 有符号值 => (-2<sup>31</sup> ~ 2<sup>31</sup>-1) | 无符号值 => (0 ~ 2<sup>32</sup>-1)
- `bigint` : 有符号值 => (-2<sup>63</sup> ~ 2<sup>63</sup>-1) | 无符号值 => (0 ~ 2<sup>64</sup>-1)
- `float[(M,D)]`: M 表示数字总位数 D 表示小数点后面的位数 即 `M ≥ D`
- `double[(M,D)]`: M 表示数字总位数 D 表示小数点后面的位数 即 `M ≥ D`
- `year|time|date|datetime|timestamp`: 日期时间类型 `timestamp -> 1970-01-01 00:00:00`
- `一个字节是8位,一个汉字编码两个字节是十六位`
- `char`: M 个字节,( 0 <= M <= 2<sup>8</sup>-1 )
- `varchar`: L+1 个字节,( L<=M 且 0 <= M <= 2<sup>16</sup>-1 )
- `tingtext`: L+1 个字节,( L<=M 且 0 <= M <= 2<sup>8</sup> )
- `text`: L+2 个字节,( L<=M 且 0 <= M <= 2<sup>16</sup> )
- `mediumtext`: L+3 个字节,( L<=M 且 0 <= M <= 2<sup>24</sup> )
- `longtext`: L+4 个字节,( L<=M 且 0 <= M <= 2<sup>32</sup> )
- `enum('value1','value2',...)` : 字节取决于枚举值的个数,最多( 2<sup>16</sup>-1 ) 个值 (选择其中一种情况)
- `set('value1','value2',...)` : 字节取决于 set 成员的个数,最多 2<sup>8</sup> 个值 (排列组合所有的情况)

## mysql 数据库

- 创建数据库`CREATE DATABASE 数据库名;`

  ```sql
  CREATE DATABASE IF NOT EXISTS database_name;
  ```

- 查看所有数据库`SHOW DATABASES;`
- 显示数据库创建语句 `SHOW CREATE DATABASE db_name;`
- 选择数据库

  - 选择数据库`USE db_name;`
  - 查看当前使用的数据库`SELECT database();`

- 显示警告信息`SHOW WARNINGS`
- 删除数据库`DROP DATABASE database_name;`

  ```sql
  DROP DATABASE IF EXISTS database_name;
  ```

## 约束

<CodeBlock>

```sql
PRIMARY KEY    -- 主键约束，用于唯一标识对应的记录,可以赋值
FOREIGN KEY    -- 外键约束 (数据类型一致,主键)
NOT NULL    -- 非空约束
NULL       -- 空
UNIQUE    -- 唯一性约束(同一张表可以存在多个)
AUTO_INCREMENT    -- 自动递增,适用于整数类型 默认从0开始
UNSIGNED    -- 无符号
DEFAULT		    -- 默认值约束，用于设置字段的默认值
CHARACTER SET gbk   -- 指定一个字符集
```

</CodeBlock>

- 外键约束

<CodeBlock>

```sql
FOREIGN KEY (Id_P) REFERENCES Persons(Id_P)
CASCADE
SET NULL
RESTRICT
NO ACTION
```

</CodeBlock>

## 添加约束

- 添加主键约束

<CodeBlock>

```sql
ALTER TABLE tb_name ADD [CONSTRAINT[smybol]] PRIMARY KEY [index_type](index_col_name,...)

ALTER TABLE users2 ADD CONSTRAINT PRIMARY KEY (id);
```

</CodeBlock>

- 添加唯一约束

<CodeBlock>

```sql
ALTER TABLE tb_name ADD [CONSTRAINT[smybol]] UNIQUE [INDEX|KEY][index_name] [index_type] (index_col_name,...)

ALTER TABLE users2 ADD UNIQUE (username);
```

</CodeBlock>

- 添加外键约束

<CodeBlock>

```sql
ALTER TABLE tb_name ADD [CONSTRAINT[smybol]] FOREIGN KEY [index_name] (index_col_name,...) reference_definition

ALTER TABLE users2 ADD FOREIGN KEY(pid) REFERENCES provinces (id);
```

</CodeBlock>

- 添加/删除默认约束

<CodeBlock>

```sql
ALTER TABLE tb_name ALTER [COLUMN] col_name{SET DEFAULT literal|DROP DEFAULT}

-- 添加：
ALTER TABLE users2 ALTER age SET DEFAULT 15;
-- 删除：
ALTER TABLE users2 ALTER age DROP DEFAULT;
```

</CodeBlock>

- 删除约束

<CodeBlock>

```sql
-- 主键:
ALTER TABLE table_name DROP PRIMARY KEY;
ALTER TABLE users2 DROP PRIMARY KEY;

-- 唯一:
ALTER TABLE table_name DROP {INDEX|KEY} index_name;

-- 外键:
ALTER TABLE table_name DROP FOREIGN KEY fk-symbol;
```

</CodeBlock>

## 数据表的基本操作

- 创建数据表 -- 最后一列不需要逗号

<CodeBlock>

```sql
CREATE TABLE 表名
(
    列名1  类型,
    列名2  类型,
    列名3  类型
);

-- 注意：最后一列不需要逗号

-- 创建数据库
create database IF NOT EXISTS test01 character set utf8;
-- 选择test01数据库
use test01;
-- 创建students表
create table students
(
    id int unsigned not null auto_increment primary key,
    name char(8) not null,
    sex char(4) not null,
    age tinyint unsigned not null,
    tel char(13) null default "-"
);
```

</CodeBlock>

- 查看数据表

<CodeBlock>

```sql
-- 查看当前数据库中的所有表
show tables;
-- 查看表结构
desc tb_name;
SHOW COLUMNS FROM tb_name;
-- 查看建表语句
show create table tb_name;
```

</CodeBlock>

- 增加列

<CodeBlock>

```sql
ALTER TABLE table_name ADD 列名 列的类型;
-- 在表的最后追加列 address:
alter table students add address char(60);
```

</CodeBlock>

- 修改列名/数据类型

<CodeBlock>

```sql
ALTER TABLE table_name MODIFY 列名 数据类型 [FIRST|ALTER col_name];
ALTER TABLE students MODIFY name VARCHAR(60);

ALTER TABLE 表名 change 原列名 新列名 数据类型 [FIRST|ALTER col_name];
-- 将表 tel 列改名为 telphone:
alter table students change tel telphone char(13) default "-";
-- 将 name 列的数据类型改为 char(16):
alter table students change name name char(16) not null;
```

</CodeBlock>

- 删除列

<CodeBlock>

```sql
ALTER TABLE table_name DROP 列名;
alter table students drop birthday;
```

</CodeBlock>

- 修改表名

<CodeBlock>

```sql
alter table 表名 rename 新表名;
rename table 表名 to 新表名;
-- 重命名 students 表为 workmates:
alter table students rename workmates;
```

</CodeBlock>

- 删除数据表

<CodeBlock>

```sql
DROP TABLE 表名;
-- 删除 workmates 表:
drop table workmates;
```

</CodeBlock>

## 表记录的基本操作

- 向表中插入记录

<CodeBlock>

```sql
INSERT [INTO] table_name [(col_name,...)] {VALUES|VALUE} ({expr|DEFAULE},...),(...),...
INSERT [INTO] table_name SET col_name={expr|DEFAULE},...
-- 将查询结果写入表table_name中
INSERT [INTO] table_name [(col_name,...)] SELECT...

insert [into] 表名 [(列名1, 列名2, 列名3, ...)] values (值1, 值2, 值3, ...);
insert into students values(NULL, "王刚", "男", 20, "13811371377");
-- 部分记录
insert into students (name, sex, age) values("孙丽华", "女", 21);
insert into students set username='李四',sex="女",age=19;
```

</CodeBlock>

- 更新表中的记录

<CodeBlock>

```sql
-- 单表更新
UPDATE [LOW_PRIORITY] [IGNORE] table_reference SET col_name1={expr|DEFAULT} [,col_name1={expr|DEFAULT}] ... [WHERE where_condition]
-- 多表更新
UPDATE table_reference SET col_name1={expr1|DEFSULT} [,col_name2={expr2|DEFAULT}]... [WHERE where_condition]

table_reference {[INNER|CROSS] JOIN | {LEFT|RIGHT} [OUTER] JOIN} table_reference ON conditional_expr

update 表名称 set 列名称=新值 where 更新条件;
-- 所有
update students set age=age+id;
-- one
update students set tel=default where id=5;
```

</CodeBlock>

- 删除表中的记录

<CodeBlock>

```sql
DELETE FROM table_name [WHERE where_condition]

DELETE table_name[.*] [,table_name[.*]] ... FROM table_references [WHERE where_condition]

delete from 表名称 where 删除条件;
delete from students where id=2;
delete from students where age<20;
delete from students;
```

</CodeBlock>

- 查询表中的记录

<CodeBlock>

```sql
SELECT select_expr [,select_expr,...]
[
    FROM table_references
    [WHERE where_condition]
    [GROUP BY {col_name|position} [ASC|DESC],... ]
    [HAVING where_condition]
    [ORDER BY {col_name|expr|position} [ASC|DESC],...]
    [LIMIT {[offset,] row_count|row_count OFFSET offset} ]
]

select 列名称 from 表名称 [查询条件];
select 列名称 from 表名称 where 条件;
  -- AS  起别名alias
  -- ASC 升序 / DESC 降序
  -- ANY / SOME / ALL
  -- IN  / NOT IN / EXISTS / NOT EXISTS
  -- AVG 平均值 / ROUND 四舍五入 /

select students.name, students.age from students\G
select students.name as uname, students.age as uage from students;
select * from students where sex="女";
```

</CodeBlock>

- create select

<CodeBlock>

```sql
-- 创建数据表同时将查询结果写入到数据表
CREATE TABLE IF NOT EXISTS table_name [(create_definition,...)] select_statement
```

</CodeBlock>

## 相关链接

- [21 分钟 MySQL 入门教程](http://www.cnblogs.com/mr-wid/archive/2013/05/09/3068229.html)