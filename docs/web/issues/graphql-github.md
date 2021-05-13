---
title: github的graphql使用
date: 2020-08-02
sidebar: "auto"
tags:
  - graphql
categories:
  - faq
---

:::tip

- [https://developer.github.com/v4/explorer/](https://developer.github.com/v4/explorer/)
- Graphql Api : `https://api.github.com/graphql`
- [Schema 和类型](https://graphql.cn/learn/schema/#interfaces)

:::

## 变量（Variables）

- 变量以 `$` 开头， `Int` 为类型 ， `！`为是否必填

```sh
# $repo 为变量名

query($repo:Int!) {
  viewer {
    # 用户名 -> 注释
    name #  -> 字段
     repositories(last: $repo) { # 在操作中使用变量 $repo
       nodes {
         name
       }
     }
   }
}

// query variables
variables {
   "repo": 3
}
```

- 默认变量（Default variables）

```js
// "chengzao" 为 $user 的默认值
query MyQuery($user: String = "chengzao") {
  user(login: $user) {
    login
  }
}
```

## 操作名称（Operation name）

```sh
# MyQuery 为操作名
query MyQuery {
  viewer {
    login
  }
}
```

## 别名（Aliases）

```sh
query MyPaginationQuery($pageSize: Int = 10) {
  viewer {
    # startsRepos 为 starredRepositories 的别名
    startsRepos: starredRepositories(first: $pageSize) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          id
          name
        }
      }
      totalCount
    }
  }
}

# 返回数据
{
  "data": {
    "viewer": {
      "startsRepo": {
        "pageInfo": {
          "endCursor": "xxx",
          "hasNextPage": true,
          "hasPreviousPage": false,
          "startCursor": "xxx"
        },
        "edges": [
          {
            "cursor": "xxx",
            "node": {
              "id": "xxx",
              "name": "nvm"
            }
          },
        ],
        "totalCount": 17
      }
    }
  }
}
```

## 片段（Fragments）

```sh
query MyPaginationQuery($pageSize: Int = 10) {
  viewer {
    startsRepos: starredRepositories(first: $pageSize) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
      ...nodes
    }
  }
}

# https://graphql.cn/learn/schema/#interfaces
# StarredRepositoryConnection 为 github graphql 中定义好的类型
fragment nodes on StarredRepositoryConnection {
   repos: edges {
      cursor
      node {
        id
        name
      }
    }
}
```

- 在片段内使用变量

```sh
query MyPaginationQuery($pageSize: Int = 10) {
  viewer {
    ...viewer
  }
}

# viewer
fragment viewer on User{
   startsRepos: starredRepositories(first: $pageSize) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
      ...nodes
    }
}


# nodes
fragment nodes on StarredRepositoryConnection {
   repos: edges {
      cursor
      node {
        id
        name
      }
    }
}
```

## 指令（Directives）

- `include`包含此字段

```sh
query MyQuery($showStatus: Boolean!) {
  viewer {
    login
    status @include(if: $showStatus) {
      emoji
    }
  }
}

# query variables
{
  "showStatus": true
}
```

- `skip`跳过此字段

```sh
query MyQuery($showStatus: Boolean!) {
  viewer {
    login
    status @skip(if: $showStatus) {
      emoji
    }
    id
  }
}

# query variables
{
  "showStatus": true
}
```

## 变更（Mutations）

- 约定规范任何导致写入的操作都应该显式通过变更（`mutation`）来发送

```js
query FindIssueID {
  repository(owner:"octocat", name:"Hello-World") {
    issue(number:349) {
      id
    }
  }
}

mutation AddReactionToIssue {
  addReaction(input:{subjectId:"MDU6SXNzdWUyMzEzOTE1NTE=",content:HOORAY}) {
    reaction {
      content
    }
    subject {
      id
    }
  }
}
```

- 多个参数

```sh
mutation($myVar:AddReactionInput!) {
  addReaction(input:$myVar) {
    reaction {
      content
    }
    subject {
      id
    }
  }
}

# query variables
# https://docs.github.com/cn/graphql/reference/input-objects#addreactioninput
variables {
  "myVar": {
    "subjectId":"MDU6SXNzdWUyMTc5NTQ0OTc=",
    "content":"HOORAY"
  }
}
```

## 分页（Pagination）

- github分页query

```sh
query MyPaginationQuery($cursorNo: String!, $pageSize: Int=10) {
  viewer {
    starredRepositories(first: $pageSize, after: $cursorNo) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          id
          name
        }
      }
      totalCount
    }
  }
}

# query variables
# cursorNo: 传入返回数据中的 pageInfo.startCursor / pageInfo.endCursor
{
  "cursorNo": "xxx",
}
```

## nodejs 示例

- [使用 GraphQL 进行身份验证](https://docs.github.com/cn/graphql/guides/forming-calls-with-graphql)
- [creating-a-personal-access-token](https://docs.github.com/cn/github/authenticating-to-github/creating-a-personal-access-token)

```js
const axios = require('axios')

// ACCESS_TOKEN -> https://github.com/settings/tokens
// .env -> ACCESS_TOKEN=axxxx54

require("dotenv").config();
const TOKEN = process.env.ACCESS_TOKEN;
const GH_API = "https://api.github.com/graphql";

function request (query, variables, headers = {}) {
  return axios({
    url: GH_API,
    method: "post",
    headers:{
      Authorization: `bearer ${TOKEN}`,
      ...headers
    },
    data:{
      query,
      variables
    },
  });
}

const query = `
  query MyPaginationQuery($pageSize: Int = 10) {
    viewer {
      startsRepos: starredRepositories(first: $pageSize) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
        ...nodes
      }
    }
  }

  fragment nodes on StarredRepositoryConnection {
    repos: edges {
        cursor
        node {
          id
          name
        }
      }
  }
`

const variables = {
  pageSize: 5
}

const data = async () => {
  const res = await request(query, variables)
  console.log(JSON.stringify(res.data, 0 ,2));
}

data()
```
