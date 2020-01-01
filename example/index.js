function BinaryTree() {
  /**
   * 定义节点
   * @param key int|float 节点值
   */
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  //定义根节点
  var root = null;

  /**
   * 定义插入属性
   * @param key int|float 要插入的值
   */
  this.insert = function(key) {
    var newNode = new Node(key);
    if (root === null) {
      root = newNode;
    } else {
      insertNoder(root, newNode);
    }
  };

  /**
   * 插入数据 小左大右
   * @param node obj 节点数据
   * @param newNode obj 要插入的节点数据
   */
  var insertNoder = function(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNoder(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNoder(node.right, newNode);
      }
    }
  };

  /**
   * 查找节点
   * @param key int|float 查找的节点值
   * @param node obj 节点
   * @returns obj|null 查找的节点, 不存在返回null
   */
  this.find = function(key, node = root) {
    return findNode(key, node)[1];
  };

  /**
   * 判断节点是否存在
   * @param key int|float 查找的节点值
   * @param node obj 节点
   * @returns bool 存在true, 不存在false
   */
  this.exists = function(key, node = root) {
    return findNode(key, node)[0];
  };

  /**
   * 查找节点
   * @param key int|float 查找的节点值
   * @param node obj 节点
   * @returns array
   */
  var findNode = function(key, node) {
    if (node === null) return [false, null];
    if (key == node.key) return [true, node];
    if (key < node.key) return findNode(key, node.left);
    return findNode(key, node.right);
  };

  /**
   * 中序排列查询
   * @param node obj 节点
   * @returns {Array}
   */
  this.inOrder = function(sort = "ASC", node = root) {
    var nodeArr = [];
    if (node !== null) {
      if (sort.toUpperCase() == "DESC") {
        inOrderDescNode(node, nodeArr);
      } else {
        inOrderAscNode(node, nodeArr);
      }
    }
    return nodeArr;
  };

  /**
   * 中序查询-升序(左->中->右)
   * @param node obj 节点
   * @param nodeArr array 存储排序的值
   */
  var inOrderAscNode = function(node, nodeArr) {
    if (node !== null) {
      inOrderAscNode(node.left, nodeArr);
      nodeArr.push(node.key);
      inOrderAscNode(node.right, nodeArr);
    }
  };

  /**
   * 中序查询-降序(右->中->左)
   * @param node obj 节点
   * @param nodeArr array 存储排序的值
   */
  var inOrderDescNode = function(node, nodeArr) {
    if (node !== null) {
      inOrderDescNode(node.right, nodeArr);
      nodeArr.push(node.key);
      inOrderDescNode(node.left, nodeArr);
    }
  };

  /**
   * 前序查询
   * @param node obj 节点
   * @returns {Array}
   */
  this.preOrder = function(node = root) {
    var nodeArr = [];
    if (node !== null) {
      preOrderNode(node, nodeArr);
    }
    return nodeArr;
  };

  /**
   * 前序(中->左->右)
   * @param node obj 节点
   * @param nodeArr 存储查询的值
   */
  var preOrderNode = function(node, nodeArr) {
    if (node !== null) {
      nodeArr.push(node.key);
      preOrderNode(node.left, nodeArr);
      preOrderNode(node.right, nodeArr);
    }
  };

  /**
   * 后序查询
   * @param node obj 节点
   * @returns {Array}
   */
  this.reOrder = function(node = root) {
    var nodeArr = [];
    if (node !== null) {
      reOrderNode(node, nodeArr);
    }
    return nodeArr;
  };

  /**
   * 后序(左->右->中)
   * @param node obj 节点
   * @param nodeArr 存储查询的值
   */
  var reOrderNode = function(node, nodeArr) {
    if (node !== null) {
      reOrderNode(node.left, nodeArr);
      reOrderNode(node.right, nodeArr);
      nodeArr.push(node.key);
    }
  };

  /**
   * 最大值
   * @param node obj 节点
   * @returns {*}
   */
  this.max = function(node = root) {
    var newNode = maxNode(node);
    return newNode === null ? null : newNode.key;
  };

  /**
   * 查找一个节点最大的值
   * @param node obj 节点
   * @returns {*}
   */
  var maxNode = function(node) {
    if (node === null) return null;
    while (node !== null && node.right !== null) {
      node = node.right;
    }
    return node;
  };

  /**
   * 最小值
   * @param node obj 节点
   * @returns {*}
   */
  this.min = function(node = root) {
    var newNode = minNode(node);
    return newNode === null ? null : newNode.key;
  };

  /**
   * 查找一个节点最小值
   * @param node obj 节点
   * @returns {*}
   */
  var minNode = function(node) {
    if (node === null) return null;
    if (node.left !== null) return minNode(node.left);
    return node;
  };

  /**
   * 移除一个节点
   * @param key int|float 要移除的节点值
   * @param node obj 节点
   * @returns {*}
   */
  this.remove = function(key, node = root) {
    return removeNode(key, node);
  };

  /**
   * 移除节点
   * @param key int|float 要移除的节点值
   * @param node obj 节点
   * @returns {*}
   */
  var removeNode = function(key, node) {
    if (node === null) return null;
    if (key === node.key) {
      if (node.left === null && node.right === null) return null;
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      var aux = minNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key);
      return node;
    }
    if (key < node.key) {
      node.left = removeNode(key, node.left);
      return node;
    }
    node.right = removeNode(key, node.right);
    return node;
  };
}

var arr = [9, 7, 4, 4, 6.4, 5, 8,12];
var binaryTree = new BinaryTree();
//循环插入数据
arr.map(function(key) {
  binaryTree.insert(key);
});

console.log(binaryTree);

// console.log("exists: ", binaryTree.exists(9));
// console.log("exists-100: ", binaryTree.exists(100));
// console.log("find: ", binaryTree.find(9));
// console.log("find-1000: ", binaryTree.find(1000));
// console.log("inOrder-Asc: ", binaryTree.inOrder());

// var newNode = JSON.parse(JSON.stringify(binaryTree.find(4)));
// console.log("inOrder-Asc-4: ", binaryTree.inOrder("ASC", newNode));
// console.log("remove-2: ", binaryTree.remove(2, newNode));
// console.log("remove-3: ", binaryTree.remove(3));
// console.log("remove-15: ", binaryTree.remove(15));
// console.log("inOrder-Asc: ", binaryTree.inOrder());
// console.log("inOrder-Asc-4: ", binaryTree.inOrder("ASC", newNode));
// console.log("inOrder-desc: ", binaryTree.inOrder("DESC"));
// console.log("inOrder-desc-11: ", binaryTree.inOrder("DESC", binaryTree.find(11)));
// console.log("preOrder: ", binaryTree.preOrder());
// console.log("reOrder: ", binaryTree.reOrder());
// console.log("max: ", binaryTree.max());
// console.log("max-4: ", binaryTree.max(binaryTree.find(4)));
// console.log("min: ", binaryTree.min());
// console.log("min-11: ", binaryTree.min(binaryTree.find(11)));
// console.log("min-11: ", binaryTree.max(null));
