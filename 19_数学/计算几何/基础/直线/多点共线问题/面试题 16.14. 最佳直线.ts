/**
 * @param {number[][]} points
 * @return {number[]}
 * 请找出一条直线，其通过的点的数目最多。
 */
function bestLine(points: number[][]): number[] {
  const len = points.length

  let max = 0
  let res: number[] = []

  // 考虑通过每个点的所有直线（和这个点之后的所有点形成的线段斜率），使用最大公约数归一化斜率为分数：
  for (let i = 0; i < len; i++) {
    const counter = new Map<string, number>()
    const initialTwo = new Map<string, number[]>()
    const [x1, y1] = points[i]
    for (let j = i + 1; j < len; j++) {
      const [x2, y2] = points[j]

      let A = y2 - y1
      let B = x2 - x1
      const divide = gcd(A, B)
      A /= divide // 如果divide为0，则为Infinity
      B /= divide
      const key = `${A}#${B}`

      !initialTwo.has(key) && initialTwo.set(key, [i, j])
      counter.set(key, (counter.get(key) || 0) + 1)

      if (counter.get(key)! > max) {
        console.log(key, A, B)
        max = counter.get(key)!
        res = initialTwo.get(key)!
      }
    }
  }

  return res
}

function gcd(...nums: number[]) {
  const twoNumGcd = (a: number, b: number): number => {
    return b === 0 ? a : twoNumGcd(b, a % b)
  }
  return nums.reduce(twoNumGcd)
}

console.log(
  bestLine([
    [-24272, -29606],
    [-37644, -4251],
    [2691, -22513],
    [-14592, -33765],
    [-21858, 28550],
    [-22264, 41303],
    [-6960, 12785],
    [-39133, -41833],
    [25151, -26643],
    [-19416, 28550],
    [-17420, 22270],
    [-8793, 16457],
    [-4303, -25680],
    [-14405, 26607],
    [-49083, -26336],
    [22629, 20544],
    [-23939, -25038],
    [-40441, -26962],
    [-29484, -30503],
    [-32927, -18287],
    [-13312, -22513],
    [15026, 12965],
    [-16361, -23282],
    [7296, -15750],
    [-11690, -21723],
    [-34850, -25928],
    [-14933, -16169],
    [23459, -9358],
    [-45719, -13202],
    [-26868, 28550],
    [4627, 16457],
    [-7296, -27760],
    [-32230, 8174],
    [-28233, -8627],
    [-26520, 28550],
    [5515, -26001],
    [-16766, 28550],
    [21888, -3740],
    [1251, 28550],
    [15333, -26322],
    [-27677, -19790],
    [20311, 7075],
    [-10751, 16457],
    [-47762, -44638],
    [20991, 24942],
    [-19056, -11105],
    [-26639, 28550],
    [-19862, 16457],
    [-27506, -4251],
    [-20172, -5440],
    [-33757, -24717],
    [-9411, -17379],
    [12493, 29906],
    [0, -21755],
    [-36885, -16192],
    [-38195, -40088],
    [-40079, 7667],
    [-29294, -34032],
    [-55968, 23947],
    [-22724, -22513],
    [20362, -11530],
    [-11817, -23957],
    [-33742, 5259],
    [-10350, -4251],
    [-11690, -22513],
    [-20241, -22513],
  ])
)
