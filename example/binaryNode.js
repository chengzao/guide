// 原文：https://mp.weixin.qq.com/s?__biz=MzI0MTUxOTE5NQ==&mid=2247483941&idx=1&sn=bd18647cb580da4e5aadf72ee1f0f7b8&chksm=e90b1d11de7c9407cde027c43ab43323fa07702ff4855745163e8f3ebbf682c95b33987d6210&mpshare=1&scene=1&srcid=&sharer_sharetime=1572521393442&sharer_shareid=6d5a36aa649f337987f3518aaba03999#rd

function NodeTree(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}
NodeTree.prototype.show = function () {
  return this.data;
}

function BST() {
  this.root = null;
}

BST.prototype.insert = function (data) {
  var node = new NodeTree(data, null, null);
  if (this.root == null) {
    this.root = node;
  } else {
    var current = this.root;
    var parent;
    while (true) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current == null) {
          parent.left = node;
          break;
        }
      } else {
        current = current.right;
        if (current == null) {
          parent.right = node;
          break;
        }
      }
    }
  }
}

// 二叉树前序遍历
BST.prototype.perOrder = function (node) {
  if (node) {
     console.log(node.show() + " ");
     this.perOrder(node.left);
     this.perOrder(node.right);
   }
}

// 二叉树中序遍历
BST.prototype.inOrder = function(node){
  if(node){
     this.inOrder(node.left);
     console.log(node.show() + " ");
     this.inOrder(node.right);
   }
}

// 二叉树后序遍历
BST.prototype.postOrder = function(node){
  if(node){
    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.show() + " ");
  }
}

var minNode = function (node) {
  if (node) {
    while (node.left !== null) {
      return minNode(node.left);
    }
    return node.data;
  }
  return null;
}
// 删除二叉树最小值
BST.prototype.findMin = function (root) {
  return minNode(root)
}

var maxNode = function (node) {
  if (node) {
    while (node.right !== null) {
      return maxNode(node.right);
    }
    return node.data;
  }
  return null;
}
// 查找二叉树最大值
BST.prototype.findMax = function (root) {
  return maxNode(root)
}

// 删除二叉树最小值
BST.prototype.delMinNode = function (root) {
  if (!root) {
    return false;
  }
  var current = root;
  if (current.left == null) {
    var rightNode = current.right;
    return rightNode;
  }
  current.left = this.delMinNode(current.left);
  return current;
}

// 删除二叉树最大值
BST.prototype.delMaxNode = function (root) {
  if (!root) {
    return false;
  }
  var current = root;
  if (current.right == null) {
    var leftNode = current.left;
    return leftNode;
  }
  current.right = this.delMaxNode(current.right)
  return current;
}

// 判断二叉树是否存在某值
var searchNode = function (key, node) {
  if (node == null) {
    return false;
  }
  if (node.data > key) {
    return searchNode(key, node.left);
  } else if (node.data < key) {
    return searchNode(key, node.right);
  } else {
    return true;
  }
}
BST.prototype.search = function (key, root) {
  return searchNode(key, root);
}

// 求二叉树节点个数
BST.prototype.sizeOfTree = function (root) {
  if (!root) {
    return 0
  }
  return 1 + this.sizeOfTree(root.left) + this.sizeOfTree(root.right);
}

// 求二叉树层级
BST.prototype.heightOfTree = function (root) {
  if (!root) {
    return 0
  }
  return Math.max(this.heightOfTree(root.left), this.heightOfTree(root.right)) + 1
}

// 求二叉树第K层的节点个数
BST.prototype.NumOfKthLevel = function (root, k) {
  if (k < 0) {
    return 0
  }
  if (root === null) {
    return 0
  }
  if (root !== null && k === 1) {
    return 1
  }
  return this.NumOfKthLevel(root.left, k - 1) + this.NumOfKthLevel(root.right, k - 1)
}

// 求二叉树是否相同
BST.prototype.compareStruct = function (root1, root2) {
  if (root1 === null && root2 === null) {
    return true
  }
  if ((root1 !== null && root2 === null) || (root1 === null && root2 !== null)) {
    return false
  }
  return (this.compareStruct(root1.left, root2.left) && this.compareStruct(root1.right, root2.right))
}



//测试数据
var bst = new BST();
var nums = [10, 3, 18, 2, 4, 13, 21, 9, 8, 9];
for (var i = 0; i < nums.length; i++) {
  bst.insert(nums[i]);
}

// bst.perOrder(bst.root);

// bst.inOrder(bst.root);

// bst.postOrder(bst.root);

// console.log(bst.findMin(bst.root));

// console.log(bst.findMax(bst.root));

// bst.delMinNode(bst.root)

// bst.delMaxNode(bst.root)

// bst.search(3, bst.root)

// bst.sizeOfTree(bst.root)

// bst.heightOfTree(bst.root)

// bst.NumOfKthLevel(bst.root,3)

// bst.compareStruct(bst.root, bst.root)
