const INSERT = 0
const UPDATE = 1
const DELETE = 2
const SKIP = 3

class Node {
  constructor(val, choice) {
    this.val = val
    this.choice = choice
  }
  static min(insert, del, update) {
    let minVal = Math.min(insert.val, del.val, update.val)
    if (minVal === insert.val) {
      return new Node(minVal + 1, INSERT)
    }
    if (minVal === del.val) {
      return new Node(minVal + 1, DELETE)
    }
    if (minVal === update.val) {
      return new Node(minVal + 1, UPDATE)
    }
  }
}

const minDistance = function(word1, word2) {
  let seq1 = '_' + word1
  let seq2 = '_' + word2
  let row = seq1.length
  let col = seq2.length
  let dp = []
  for (let i = 0; i < row; i++) {
    dp[i] = new Array(col)
  }
  // base case:当s2为空，s1需要删除所有的字符
  for (let i = 0; i < row; i++) {
    dp[i][0] = new Node(i, DELETE)
  }
  // base case:当s1为空，需要插入所有s2的字符
  for (let i = 0; i < col; i++) {
    dp[0][i] = new Node(i, INSERT)
  }
  // 自底向上求解
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (seq1[i] === seq2[j]) {
        dp[i][j] = new Node(dp[i-1][j-1].val, SKIP)
      } else {
        dp[i][j] = Node.min(dp[i][j-1], dp[i - 1][j], dp[i - 1][j - 1])
      }
    }
  }
  // 输出编辑过程
  let lastRow = row - 1
  let lastCol = col - 1
  while (lastRow > 0 && lastCol > 0) {
    if (dp[lastRow][lastCol].choice === INSERT ) {
      console.log(`在${seq1[lastRow]}之后插入${seq2[lastCol]}`)
      lastCol--
    }
    if (dp[lastRow][lastCol].choice === DELETE ) {
      console.log(`删除${seq1[lastRow]}`)
      lastRow--
    }
    if (dp[lastRow][lastCol].choice === UPDATE ) {
      console.log(`将${seq1[lastRow]}替换成${seq2[lastCol]}`)
      lastRow--
      lastCol--
    }
    if (dp[lastRow][lastCol].choice === SKIP ) {
      console.log(`跳过${seq1[lastRow]}`)
      lastRow--
      lastCol--
    }
  }
  return dp[row - 1][col - 1].val
};

minDistance("intention", "execution")