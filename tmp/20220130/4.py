from typing import List, Tuple
from collections import defaultdict, deque, Counter
from heapq import heapify, heappop, heappush
from sortedcontainers import SortedList, SortedDict, SortedSet
from bisect import bisect_left, bisect_right
from functools import lru_cache, reduce
from itertools import accumulate, groupby, combinations, permutations, product, chain, islice
from math import gcd, sqrt, ceil, floor, comb
from string import ascii_lowercase, ascii_uppercase, ascii_letters, digits
from operator import le, xor, or_, and_, not_


MOD = int(1e9 + 7)
INF = 0x3F3F3F3F
EPS = int(1e-8)
dirs4 = [[-1, 0], [0, 1], [1, 0], [0, -1]]
dirs8 = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]


class UnionFind:
    def __init__(self, n: int):
        self.n = n
        self.part = n
        self.parent = list(range(n))
        self.size = [1] * n

    def find(self, x: int) -> int:
        if x != self.parent[x]:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        rootX = self.find(x)
        rootY = self.find(y)
        if rootX == rootY:
            return False
        if self.size[rootX] > self.size[rootY]:
            rootX, rootY = rootY, rootX
        self.parent[rootX] = rootY
        self.size[rootY] += self.size[rootX]
        self.part -= 1
        return True

    def isConnected(self, x: int, y: int) -> bool:
        return self.find(x) == self.find(y)


class Solution:
    def groupStrings(self, words: List[str]) -> List[int]:
        words.sort()
        n = len(words)
        uf = UnionFind(n)
        wordStates = [0] * n
        adjList = [set() for _ in range(n)]
        for i, word in enumerate(words):
            state = 0
            for char in word:
                state |= 1 << (ord(char) - 97)
            wordStates[i] = state

        # 邻居
        for i, word in enumerate(words):
            raw = wordStates[i]
            addOne = set()
            removeOne = set()
            replaceOne = set()
            for char in ascii_lowercase:
                addOne.add(raw | 1 << (ord(char) - 97))
            for char in word:
                removeOne.add(raw ^ 1 << (ord(char) - 97))
                replaceOne.add(raw ^ 1 << (ord(char) - 97) | 1 << 28)
            adjList[i] = addOne | removeOne | replaceOne

        for i in range(n):
            for j in range(i + 1, n):
                if wordStates[j] in adjList[i] or wordStates[i] in adjList[j]:
                    uf.union(i, j)

        return [uf.part, max(uf.size)]


# 2 1 2 1
print(Solution().groupStrings(words=["a", "b", "ab", "cde"]))
print(Solution().groupStrings(words=["a", "ab", "abc"]))
