// 首次公开募股 (Initial public offering)

import { MinHeap } from './minheap'

/**
 *
 * @param k 帮助 力扣 设计完成最多 k 个不同项目后得到最大总资本的方式。
 * @param w 最初，你的资本为 w
 * @param profits
 * @param capital
 * @description
 * 为了以更高的价格将股票卖给风险投资公司，
 * 力扣 希望在 IPO 之前开展一些项目以增加其资本
 * @summary
 * 1.优先考虑启动资金少的项目
 * 2.选做收益最大的项目
 * 即：当前所有可以启动的项目全部放入大根堆，然后选一个利润最大的，重复k轮
 */
function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
  const capQueue = new MinHeap<[cap: number, index: number]>((a, b) => a[0] - b[0])
  const profQueue = new MinHeap<[prof: number, index: number]>((a, b) => b[0] - a[0])

  for (let i = 0; i < capital.length; i++) {
    capQueue.push([capital[i], i])
  }

  let curCap = w
  for (let i = 0; i < k; i++) {
    // 所有可以启动的项目全部放入大根堆，然后选一个利润最大的
    while (capQueue.size > 0 && capQueue.peek()[0] <= curCap) {
      const [_, index] = capQueue.shift()!
      profQueue.push([profits[index], index])
    }
    if (profQueue.size === 0) break
    curCap += profQueue.shift()![0]
  }

  return curCap
}

console.log(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]))
// 输出：4
// 解释：
// 由于你的初始资本为 0，你仅可以从 0 号项目开始。
// 在完成后，你将获得 1 的利润，你的总资本将变为 1。
// 此时你可以选择开始 1 号或 2 号项目。
// 由于你最多可以选择两个项目，所以你需要完成 2 号项目以获得最大的资本。
// 因此，输出最后最大化的资本，为 0 + 1 + 3 = 4。
