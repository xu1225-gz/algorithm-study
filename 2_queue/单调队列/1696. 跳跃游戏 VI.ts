import { ArrayDeque } from '../Deque/ArrayDeque'

/**
 *
 * @param nums
 * @param k  每一步，你最多可以往前跳 k 步
 * 你的目标是到达数组最后一个位置（下标为 n - 1 ），你的 得分 为经过的所有数字之和
 * 请你返回你能得到的 最大得分 。
 * 1425. 带限制的子序列和
 * @summary
 * 递减的单调队列
 * 队首维护当前最大值:最大堆/单调队列
 * i这个位置的最佳得分其实是前面[i-k,i-1]区间最大值加nums[i]得到的
 */
function maxResult(nums: number[], k: number): number {
  const n = nums.length
  const queue = new ArrayDeque<[sum: number, index: number]>(n)
  queue.push([nums[0], 0])
  let res = nums[0]

  for (let i = 1; i < n; i++) {
    // 注意这里是大于k才shift，因为是i到i+k
    if (i - queue.at(0)![1] > k) queue.shift()
    // i这个位置的最佳得分其实是前面[i-k,i-1]区间最大值加nums[i]得到的
    res = queue.at(0)![0] + nums[i]
    while (queue.length && queue.at(-1)![0] <= res) queue.pop()
    queue.push([res, i])
  }

  return res
}

console.log(maxResult([1, -1, -2, 4, -7, 3], 2))
// 输出：7
// 解释：你可以选择子序列 [1,-1,4,3] （上面加粗的数字），和为 7
