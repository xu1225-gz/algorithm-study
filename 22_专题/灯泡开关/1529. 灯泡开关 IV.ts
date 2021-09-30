// 房间中有 n 个灯泡，编号从 0 到 n-1 ，自左向右排成一行。最开始的时候，所有的灯泡都是 关 着的。
// 有一个开关可以用于翻转灯泡的状态，翻转操作定义如下：

// 选择当前配置下的任意一个灯泡（下标为 i ）
// 翻转下标从 i 到 n-1 的每个灯泡
// 返回达成 target 描述的状态所需的 最少 翻转次数。

// target的连续的0可以视为1个0，连续的1可以视为1个1
// 因为连续相同的0或1，在反转的时候可以顺便全部反转了。
// 一次反转，可以解决一位。

// 只需要在序列前加一个字符0，则反转次数就是01变化的次数
function minFlips(target: string): number {
  let res = 0
  target = '0' + target
  for (let i = 1; i < target.length; i++) {
    if (target[i] !== target[i - 1]) res++
  }
  return res
}

console.log(minFlips('101'))
// 输出：3
// 解释："000" -> "111" -> "100" -> "101".
