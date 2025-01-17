/**
 *
 * @param n  2 <= n <= 100
 * @param edges
 * @param distanceThreshold
 * 返回能通过某些路径到达其他城市数目最少、
 * 且路径距离 最大 为 distanceThreshold 的城市。如果有多个这样的城市，则返回编号最大的城市。
 * @summary
 * 要求出求所有点对最短路径,使用floyd算法
 */
function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
  // 构建dist矩阵
  const dist = Array.from<number, number[]>({ length: n }, () => Array(n).fill(Infinity))
  for (const [i, j, w] of edges) {
    dist[i][j] = w
    dist[j][i] = w
  }

  for (let i = 0; i < n; i++) {
    dist[i][i] = 0
  }

  for (let m = 0; m < n; m++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][m] + dist[m][j])
      }
    }
  }

  console.table(dist)

  let res = 0
  let minNeighbors = Infinity
  for (let i = 0; i < n; i++) {
    let count = 0
    for (const dis of dist[i]) {
      dis <= distanceThreshold && count++
    }

    if (count <= minNeighbors) {
      res = i
      minNeighbors = count
    }
  }

  return res
}

console.log(
  findTheCity(
    4,
    [
      [0, 1, 3],
      [1, 2, 1],
      [1, 3, 4],
      [2, 3, 1],
    ],
    4
  )
)
