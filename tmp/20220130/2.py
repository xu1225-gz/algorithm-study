from typing import List, Tuple
from collections import defaultdict, deque, Counter
from heapq import heapify, heappop, heappush
from sortedcontainers import SortedList, SortedDict, SortedSet
from bisect import bisect_left, bisect_right
from functools import lru_cache, reduce
from itertools import accumulate, groupby, combinations, permutations, product, chain, islice
from math import gcd, sqrt, ceil, floor, comb
from string import ascii_lowercase, ascii_uppercase, ascii_letters, digits
from operator import xor, or_, and_, not_

MOD = int(1e9 + 7)
INF = 0x3F3F3F3F
EPS = int(1e-8)
dirs4 = [[-1, 0], [0, 1], [1, 0], [0, -1]]
dirs8 = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]


class Solution:
    def maxScoreIndices(self, nums: List[int]) -> List[int]:

        res = []
        maxCount = -1
        curCount = 0
        leftCounter = Counter()
        rightCounter = Counter(nums)
        for i in range(len(nums) + 1):
            leftZero = leftCounter[0]
            rightOne = rightCounter[1]
            curCount = leftZero + rightOne
            if curCount > maxCount:
                res = [i]
                maxCount = curCount
            elif curCount == maxCount:
                res.append(i)
            if i < len(nums):
                leftCounter[nums[i]] += 1
                rightCounter[nums[i]] -= 1

        return res


print(Solution().maxScoreIndices(nums=[0, 0, 1, 0]))
print(Solution().maxScoreIndices(nums=[0, 0, 0]))
print(Solution().maxScoreIndices(nums=[1, 1]))

