// 归并排序升级版

class Node {
  value: number
  next: Node | undefined
  constructor(value: number, next?: Node) {
    this.value = value
    this.next = next
  }
}

// 空间复杂度O(1) 指针变量
// 时间复杂度O(m+n)
const mergeSortedList = (node1: Node, node2: Node) => {
  const newNode = new Node(0)
  let p = newNode
  let p1: Node | undefined = node1
  let p2: Node | undefined = node2

  while (p1 && p2) {
    if (p1.value < p2.value) {
      p.next = p1
      p1 = p1.next
    } else {
      p.next = p2
      p2 = p2.next
    }
    p = p.next
  }

  // 剩余的情况
  if (p1) {
    p.next = p1
  }
  if (p2) {
    p.next = p2
  }

  return newNode.next
}

const a = new Node(1)
const b = new Node(3)
const c = new Node(5)
a.next = b
b.next = c

const d = new Node(2)
const e = new Node(4)
d.next = e

console.dir(mergeSortedList(a, d), { depth: null })

export {}
