// 在显示着数字的坏计算器上，我们可以执行以下两种操作：

// 双倍（Double）：将显示屏上的数字乘 2；
// 递减（Decrement）：将显示屏上的数字减 1 。
// 最初，计算器显示数字 X。

// 返回显示数字 Y 所需的最小操作数。
function brokenCalc(startValue: number, target: number): number {
  // 反向退
  // let steps = 0
  // while (startValue !== target) {
  //   steps++
  //   if (target % 2) {
  //     target++
  //   } else {
  //     target /= 2
  //   }
  // }

  // 超时
  // return steps
  /////////////////////////////////////////////
  let steps = 0
  while (startValue < target) {
    steps++
    if (target % 2) {
      target++
    } else {
      target /= 2
    }
  }

  return startValue - target + steps
}
