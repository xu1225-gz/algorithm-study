# Definition for an Interval.
from typing import List


class Interval:
    def __init__(self, start: int = None, end: int = None):
        self.start = start
        self.end = end


# 每个员工都有一个非重叠的时间段  Intervals 列表，这些时间段已经排好序。
# 返回表示 所有 员工的 共同，正数长度的空闲时间 的有限时间段的列表，同样需要排好序。

# 同`82. 寻找合适开会的时间.ts`
# 所有区间全部push 然后找不重叠
class Solution:
    def employeeFreeTime(self, schedule: List[List[Interval]]) -> List[Interval]:
        intervals = []
        for sche in schedule:
            for inter in sche:
                s = inter.start
                e = inter.end
                intervals.append([s, e])
        intervals.sort()

        res = []
        preEnd = intervals[0][1]
        for curStart, curEnd in intervals:
            if preEnd < curStart:
                res.append(Interval(preEnd, curStart))
            preEnd = max(preEnd, curEnd)

        return res


# 输入：schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
# 输出：[[3,4]]
# 解释：
# 共有 3 个员工，并且所有共同的
# 空间时间段是 [-inf, 1], [3, 4], [10, inf]。
# 我们去除所有包含 inf 的时间段，因为它们不是有限的时间段。

