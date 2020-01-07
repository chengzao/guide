function isPrime(num) {
  if (num === 1) {
    return '1 不是质数，请输入大于1的数字'
  } else if (num <= 3) {
    return num > 1
  } else {
    let sq = Math.sqrt(num)
    for (let i = 2; i <= sq; i++) {
      if (num % i === 0) {
        return false
      }
    }
    return true
  }
}
