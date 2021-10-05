class TrieNode {
  children: [TrieNode | undefined, TrieNode | undefined]
  constructor() {
    this.children = [undefined, undefined]
  }
}

class Trie {
  private root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  insert(num: number) {
    let root = this.root
    for (let i = 31; ~i; i--) {
      const bit = (num >> i) & 1
      if (!root.children[bit]) {
        root.children[bit] = new TrieNode()
      }
      root = root.children[bit]!
    }
  }

  /**
   *
   * @param num
   * @returns
   * 求num与树中异或最大值
   */
  search(num: number) {
    let root = this.root
    let res = 0

    for (let i = 31; ~i; i--) {
      const bit = (num >> i) & 1
      const needBit = 1 - bit
      if (root.children[needBit]) {
        res = (res << 1) + 1
        root = root.children[needBit]!
      } else if (root.children[bit]) {
        res = res << 1
        root = root.children[bit]!
      }
    }

    return res
  }
}

export {}

// 优化：
// Trie 数组实现
// 不用Map而是预先开辟一个大数组
// 必须要声明为Static

// OJ 每跑一个样例都会创建一个新的对象，
// 因此使用数组实现，相当于每跑一个数据都需要 new 一个百万级别的数组，会 TLE 。
// 因此这里使用数组实现必须要做的一个优化是：使用 static 来修饰 TrieTrie 数组，
// 然后在初始化时做相应的清理工作。

// 每个数的二进制从高位到低位依次插入字典树中，最上层0为根节点
// class Trie {
//   private static N = 32 * 10000 // 看情况调整
//   private static trieNode = Array.from<any, [number, number]>({ length: Trie.N }, () => [0, 0])
//   private static index = 0 // 记录trieNode个数

//   constructor() {
//     for (let i = 0; i < Trie.index; i++) {
//       Trie.trieNode[i] = [0, 0]
//     }
//     Trie.index = 0
//   }

//   insert(num: number) {
//     let root = 0
//     for (let i = 31; ~i; i--) {
//       const bit = (num >> i) & 1
//       if (!Trie.trieNode[root][bit]) {
//         Trie.index++
//         Trie.trieNode[root][bit] = Trie.index
//       }
//       root = Trie.trieNode[root][bit]
//     }
//   }

//   /**
//    *
//    * @param num
//    * @returns
//    * 求num与树中异或最大值
//    */
//   search(num: number) {
//     let root = 0
//     let res = 0

//     for (let i = 31; ~i; i--) {
//       if (!root) break
//       const bit = (num >> i) & 1
//       const needBit = 1 - bit
//       if (Trie.trieNode[root][needBit]) {
//         res = (res << 1) + 1
//         root = Trie.trieNode[root][needBit]
//       } else {
//         res = res << 1
//         root = Trie.trieNode[root][bit]
//       }
//     }

//     return res
//   }

//   static main() {
//     const trie = new Trie()
//     trie.insert(1)
//     trie.insert(4)
//     console.log(Trie.trieNode)
//   }
// }

// export {}

// Trie.main()
// [
//   [ 1, 0 ],  [ 2, 0 ],  [ 3, 0 ],  [ 4, 0 ],  [ 5, 0 ],  [ 6, 0 ],
//   [ 7, 0 ],  [ 8, 0 ],  [ 9, 0 ],  [ 10, 0 ], [ 11, 0 ], [ 12, 0 ],
//   [ 13, 0 ], [ 14, 0 ], [ 15, 0 ], [ 16, 0 ], [ 17, 0 ], [ 18, 0 ],
//   [ 19, 0 ], [ 20, 0 ], [ 21, 0 ], [ 22, 0 ], [ 23, 0 ], [ 24, 0 ],
//   [ 25, 0 ], [ 26, 0 ], [ 27, 0 ], [ 28, 0 ], [ 29, 0 ], [ 30, 33 ],
//   [ 31, 0 ], [ 0, 32 ], [ 0, 0 ],  [ 34, 0 ], [ 35, 0 ], [ 0, 0 ],
//   [ 0, 0 ],  [ 0, 0 ],  [ 0, 0 ],  [ 0, 0 ],  [ 0, 0 ],  [ 0, 0 ],
//   ...]
