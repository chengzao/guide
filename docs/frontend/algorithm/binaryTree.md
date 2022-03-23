---
title: 二叉搜索树算法
date: 2022-02-20
sidebar: "auto"
autoSort: 887
tags:
  - BinaryTree
categories:
  - frontend
---

## Tree基本结构

```js
function BinaryTree(data, left, right) {
  this.data = data; // 节点的值
  this.left = left; // 左节点
  this.right = right; // 右节点
}

function BST() {
  this.root = null;
}

/**
 * 定义插入属性
 * @param key int|float 要插入的值
 */
BST.prototype.insert = function(data) {
  var newNode = new BinaryTree(data, null, null);
  // 如果没有root节点
  if (this.root === null) {
    this.root = newNode;
  } else {
    this.insertNode(this.root, newNode);
  }
};

/**
 * 插入数据 left小 ，right大
 * @param node obj 节点数据
 * @param newNode obj 要插入的节点数据
 */
BST.prototype.insertNode = function(node, newNode) {
  if (newNode.data < node.data) {
    if (node.left === null) {
      node.left = newNode;
    } else {
      this.insertNode(node.left, newNode);
    }
  } else {
    if (node.right === null) {
      node.right = newNode;
    } else {
      this.insertNode(node.right, newNode);
    }
  }
};
```

## 前序排列查询

> `val -> 左 -> 右`

- 示例图

  ![20200102225235](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/20200102225235.png)

- 递归实现

```js
/**
 * 前序查询
 * @param node obj 节点
 * @returns {Array}
 */
BST.prototype.preOrder = function(node) {
  var nodeArr = [];
  var node = this.root;
  if (node !== null) {
    this.preOrderNode(node, nodeArr);
  }
  return nodeArr;
};

/**
 * 前序(中->左->右)
 * @param node obj 节点
 * @param nodeArr 存储查询的值
 */
BST.prototype.preOrderNode = function(node, nodeArr) {
  if (node !== null) {
    nodeArr.push(node.data);  // <- there
    this.preOrderNode(node.left, nodeArr);
    this.preOrderNode(node.right, nodeArr);
  }
};
```

- 使用栈实现 [leetcode 144](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

```js
var preOrderNode = function(root) {
    let result = []
    if(!root) return result

    const stack = [] // 栈结构
    stack.push(root)

    while(stack.length){
        const cur = stack.pop();
        result.push(cur.val)
        // 若栈顶结点有右孩子，则将右孩子入栈
        if(cur.right){
            stack.push(cur.right)
        }
        // 若栈顶结点有左孩子，则将左孩子入栈
        if(cur.left){
            stack.push(cur.left)
        }

    }
    return result
};
```

## 中序排列查询

> `左 -> val -> 右`

- 示例图

  ![20200102225508](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/20200102225508.png)

- 递归实现

```js
/**
 * 中序排列查询
 * @param node obj 节点
 * @returns {Array}
 */
BST.prototype.inOrder = function(sort = "ASC") {
  var nodeArr = [];
  var node = this.root;
  if (node !== null) {
    if (sort.toUpperCase() == "DESC") {
      this.inOrderDescNode(node, nodeArr);
    } else {
      this.inOrderAscNode(node, nodeArr);
    }
  }
  return nodeArr;
};

/**
 * 中序查询-升序(左->中->右)
 * @param node obj 节点
 * @param nodeArr array 存储排序的值
 */
BST.prototype.inOrderAscNode = function(node, nodeArr) {
  if (node !== null) {
    this.inOrderAscNode(node.left, nodeArr);
    nodeArr.push(node.data);  // <- there
    this.inOrderAscNode(node.right, nodeArr);
  }
};

/**
 * 中序查询-降序(右->中->左)
 * @param node obj 节点
 * @param nodeArr array 存储排序的值
 */
BST.prototype.inOrderDescNode = function(node, nodeArr) {
  if (node !== null) {
    this.inOrderDescNode(node.right, nodeArr);
    nodeArr.push(node.data); // <- there
    this.inOrderDescNode(node.left, nodeArr);
  }
};
```

- 使用栈实现 [leetcode 94](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```js
const inorderTraversal = function(root) {
  // 定义结果数组
  const res = []
  // 初始化栈结构
  const stack = []
  // 用一个 cur 结点充当游标
  let cur = root
  // 当 cur 不为空、或者 stack 不为空时，重复以下逻辑
  while(cur || stack.length) {
      // 这个 while 的作用是把寻找最左叶子结点的过程中，途径的所有结点都记录下来
      while(cur) {
          // 将途径的结点入栈
          stack.push(cur)
          // 继续搜索当前结点的左孩子
          cur = cur.left
      }
      // 取出栈顶元素
      cur = stack.pop()
      // 将栈顶元素入栈
      res.push(cur.val)
      // 尝试读取 cur 结点的右孩子
      cur = cur.right
  }
  // 返回结果数组
  return res
};
```

## 后序排列查询

> `左 -> 右 -> val`

- 示例图

  ![20200102225635](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/20200102225635.png)

- 递归实现

```js
/**
 * 后序查询
 * @param node obj 节点
 * @returns {Array}
 */
BST.prototype.reOrder = function(node) {
  var nodeArr = [];
  var node = this.root;
  if (node !== null) {
    this.reOrderNode(node, nodeArr);
  }
  return nodeArr;
};

/**
 * 后序(左->右->中)
 * @param node obj 节点
 * @param nodeArr 存储查询的值
 */
BST.prototype.reOrderNode = function(node, nodeArr) {
  if (node !== null) {
    this.reOrderNode(node.left, nodeArr);
    this.reOrderNode(node.right, nodeArr);
    nodeArr.push(node.data);  // <- there
  }
};
```

- 非递归实现 [leetcode 145](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

```js
const postOrder = function(root) {
  // 定义结果数组
  const res = []
  // 处理边界条件
  if(!root) {
      return res
  }
  // 初始化栈结构
  const stack = []
  // 首先将根结点入栈
  stack.push(root)
  // 若栈不为空，则重复出栈、入栈操作
  while(stack.length) {
      // 将栈顶结点记为当前结点
      const cur = stack.pop()
      // 当前结点就是当前子树的根结点，把这个结点放在结果数组的(头部)
      res.unshift(cur.val)   //
      // 若当前子树根结点有左孩子，则将左孩子入栈
      if(cur.left) {
        stack.push(cur.left)
      }
      // 若当前子树根结点有右孩子，则将右孩子入栈
      if(cur.right) {
        stack.push(cur.right)
      }
  }
  // 返回结果数组
  return res
};
```

## 最大值

```js
BST.prototype.max = function(node) {
  var node = this.root;
  var newNode = this.maxNode(node);
  return newNode === null ? null : newNode.data;
};

BST.prototype.maxNode = function(node) {
  if (node === null) return null;
  while (node !== null && node.right !== null) {
    node = node.right;
  }
  return node;
};
```

## 最小值

```js
BST.prototype.min = function(node) {
  var node = this.root;
  var newNode = this.minNode(node);
  return newNode === null ? null : newNode.data;
};

BST.prototype.minNode = function(node) {
  if (node === null) return null;
  if (node.left !== null) return this.minNode(node.left);
  return node;
};
```

## 查询节点

```js
BST.prototype.searchNode = function(node, data) {
  if (node === null) {
    return false;
  }
  if (data < node.data) {
    return this.searchNode(node.left, data);
  } else if (data > node.data) {
    return this.searchNode(node.right, data);
  } else {
    return true;
  }
};

BST.prototype.search = function(data) {
  return this.searchNode(this.root, data);
};
```

## 移除节点

```js
/**
 * 移除一个节点
 * @param data int|float 要移除的节点值
 * @param node obj 节点
 * @returns {*}
 */
BST.prototype.remove = function(data) {
  var node = this.root;
  return this.removeNode(node, data);
};

/**
 * 移除节点
 * @param data int|float 要移除的节点值
 * @param node obj 节点
 * @returns {*}
 */
BST.prototype.removeNode = function(node, data) {
  if (node === null) return null;
  if (data < node.data) {
    node.left = this.removeNode(node.left, data);
    return node;
  } else if (data > node.data) {
    node.right = this.removeNode(node.right, data);
    return node;
  } else {
    // 这事判断第一种情况,没有左右分支的情况下,
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }
    // 这是左子树为空的情况
    if (node.left === null) {
      node = node.right;
      return node;
    } else if (node.right === null) {
      // 这是右子树为空的情况
      node = node.left;
      return node;
    } else {
      // 如果左右两个分支都存在的时候
      // 寻找该节点的右节点的最小节点
      var aux = this.minNode(node.right);
      // 将改节点与找到的最小节点值互换
      node.data = aux.data;
      // 删掉替换后的最小节点
      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }
};
```

## 广度优先

- 层序遍历

```js
function BFS(root) {
    const queue = [] // 初始化队列queue
    // 根结点首先入队
    queue.push(root)
    // 队列不为空，说明没有遍历完全
    while(queue.length) {
        const top = queue[0] // 取出队头元素
        // 访问 top
        console.log(top.val)
        // 如果左子树存在，左子树入队
        if(top.left) {
            queue.push(top.left)
        }
        // 如果右子树存在，右子树入队
        if(top.right) {
            queue.push(top.right)
        }
        queue.shift() // 访问完毕，队头元素出队
    }
}
```

## 翻转二叉树

- [leetcode 226](https://leetcode-cn.com/problems/invert-binary-tree/)

```js
var invertTree = function(root) {
	if(!root) return root

  let left = invertTree(root.left)
  let right = invertTree(root.right)

  root.left = right;
  root.right = left

  return root
}
```

## 相同的树

- [leetcode 100](https://leetcode-cn.com/problems/same-tree/)

```js
var isSameTree = function(p, q) {
    if(p ==null && q == null) return true
    if(p == null || q == null) return false
    if(p.val != q.val) return false

		// 分别比较左子树 和 右子树
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
```

## 其他方法

```js
// 求二叉树节点个数
const sizeOfNode = function(node) {
  if (!node) {
    return 0;
  }
  return 1 + sizeOfNode(node.left) + sizeOfNode(node.right);
};

// 求二叉树层级
const levelOfNode = function(node) {
  if (!node) {
    return 0;
  }
  return (
    Math.max(levelOfNode(node.left), levelOfNode(node.right)) + 1
  );
};

// 求二叉树第K层的节点个数
const numKLevel = function(node, k) {
  if (k < 0) {
    return 0;
  }
  if (node === null) {
    return 0;
  }
  if (node !== null && k === 1) {
    return 1;
  }
  return numKLevel(node.left, k - 1) + numKLevel(node.right, k - 1);
};
```

## Trie (前缀树)

> 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查

- [leetcode 208](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

```js
var Trie = function() {
    this.children = {}
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this.children
    for(const ch of word){
        if(!node[ch]){
           node[ch]={}
        }
        node = node[ch]
    }
    node.isEnd = true
};

Trie.prototype.searchPrefix = function(word) {
    let node = this.children
    for(const ch of word){
        if(!node[ch]) {
            return false
        }
        node = node[ch]
    }
    return node
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    const node = this.searchPrefix(word)
    return node !== undefined && node.isEnd != undefined
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    return this.searchPrefix(prefix)
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```
