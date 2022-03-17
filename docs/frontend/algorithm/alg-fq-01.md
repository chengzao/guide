---
title: 二叉树与链表(一)
date: 2022-02-16
sidebar: "auto"
tags:
  - tree
  - 链表
categories:
  - frontend
---

## 二分查找(Binary Search)

- [leetcode 704](https://leetcode-cn.com/problems/binary-search/)

```js
var search = function(nums, target){
  let left = 0, right = nums.length - 1;
  while(left <= right){
    const mid = Math.floor((right-left)/2 + left)
    const midVal = nums[mid]
    if(midVal == target){
      return mid
    }else if(midVal > target){
      right = mid - 1
    }else{
      left = mid + 1
    }
  }
  return -1
}
```

## 搜索插入位置

- [leetcode 35](https://leetcode-cn.com/problems/search-insert-position/)

```js
var searchInsert = function(nums, target) {
    const len = nums.length;
    let left = 0, right=len-1, index = len;

    while(left <= right){
        let mid = Math.floor((right - left) /2 + left)
        if(target <= nums[mid]){
            index = mid;
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }
    return index
};
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

## 链表的中间结点

- [leetcode 876](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

```js
var middleNode = function(head) {
	let fast = head, slow = head;

  while(fast !=null && fast.next !=null){
   	fast = fast.next.next  // 每次走2步
    slow = slow.next // 每次走1步
  }
  return slow
}
```

## 反转链表

- [leetcode 206](https://leetcode-cn.com/problems/reverse-linked-list/)

```js
var reverseList = function(head) {
	let pre = null, cur = head

  while(cur != null){
  	let tmp = cur.next
    cur.next = pre
    pre = cur
    cur = tmp
  }
  return pre
};
```

## 二叉树深度优先遍历

- 前序遍历 `中 -> 左 -> 右` [leetcode 144](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

```js
function preorder(root) {
    // 递归边界，root 为空
    if(!root) {
        return
    }

    // 输出当前遍历的结点值
    console.log('当前遍历的结点值是：', root.val)
    // 递归遍历左子树
    preorder(root.left)
    // 递归遍历右子树
    preorder(root.right)
}

// 非递归
var preorderTraversal = function(root) {
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

- 中序遍历 `左 -> 中 -> 右` [leetcode 94](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```js
function inorder(root) {
    // 递归边界，root 为空
    if(!root) {
        return
    }

    // 递归遍历左子树
    inorder(root.left)
    // 输出当前遍历的结点值
    console.log('当前遍历的结点值是：', root.val)
    // 递归遍历右子树
    inorder(root.right)
}

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

- 后续遍历 `左 -> 右 -> 中` [leetcode 145](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

```js
function postorder(root) {
    // 递归边界，root 为空
    if(!root) {
        return
    }

    // 递归遍历左子树
    postorder(root.left)
    // 递归遍历右子树
    postorder(root.right)
    // 输出当前遍历的结点值
    console.log('当前遍历的结点值是：', root.val)
}

const postorderTraversal = function(root) {
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

## 二叉树广度优先遍历

- 层序遍历 [leetcode 103](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

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
