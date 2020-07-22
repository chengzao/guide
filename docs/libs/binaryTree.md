---
title: 二叉树算法
date: 2020-07-20
sidebar: "auto"
tags:
  - 算法
categories:
  - libs
---

- [原文：二叉树算法](https://mp.weixin.qq.com/s?__biz=MzI0MTUxOTE5NQ==&mid=2247483941&idx=1&sn=bd18647cb580da4e5aadf72ee1f0f7b8&chksm=e90b1d11de7c9407cde027c43ab43323fa07702ff4855745163e8f3ebbf682c95b33987d6210&mpshare=1&scene=1&srcid=&sharer_sharetime=1572521393442&sharer_shareid=6d5a36aa649f337987f3518aaba03999#rd)

## 基本结构

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

## 中序排列查询

- 示例图

  ![in order node](https://gitee.com/cxyz/imgbed/raw/img/img/20200102225508.png)

- 代码

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
    nodeArr.push(node.data);
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
    nodeArr.push(node.data);
    this.inOrderDescNode(node.left, nodeArr);
  }
};
```

## 前序排列查询

- 示例图

  ![preOrderNode](https://gitee.com/cxyz/imgbed/raw/img/img/20200102225235.png)

- 代码

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
    nodeArr.push(node.data);
    this.preOrderNode(node.left, nodeArr);
    this.preOrderNode(node.right, nodeArr);
  }
};
```

## 后序排列查询

- 示例图

  ![reOrder](https://gitee.com/cxyz/imgbed/raw/img/img/20200102225635.png)

- 代码

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
    nodeArr.push(node.data);
  }
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

## 其他方法

```js
// 求二叉树节点个数
BST.prototype.sizeOfNode = function(node) {
  if (!node) {
    return 0;
  }
  return 1 + this.sizeOfNode(node.left) + this.sizeOfNode(node.right);
};

// 求二叉树层级
BST.prototype.levelOfNode = function(node) {
  if (!node) {
    return 0;
  }
  return (
    Math.max(this.levelOfNode(node.left), this.levelOfNode(node.right)) + 1
  );
};

// 求二叉树第K层的节点个数
BST.prototype.numKLevel = function(node, k) {
  if (k < 0) {
    return 0;
  }
  if (node === null) {
    return 0;
  }
  if (node !== null && k === 1) {
    return 1;
  }
  return this.numKLevel(node.left, k - 1) + this.numKLevel(node.right, k - 1);
};

// 比较二叉树是否相同
BST.prototype.compareNodes = function(node1, node2) {
  if (node1 === null && node2 === null) {
    return true;
  }
  if (
    (node1 !== null && node2 === null) ||
    (node1 === null && node2 !== null)
  ) {
    return false;
  }
  return (
    this.compareNodes(node1.left, node2.left) &&
    this.compareNodes(node1.right, node2.right)
  );
};
```

## 完整版

<CodeBlock show="true" title="点击我展开">

<<< @/utils/libs/sort/binaryTree.js

</CodeBlock>
