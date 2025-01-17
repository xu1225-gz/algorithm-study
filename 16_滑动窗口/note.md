滑动窗口的滑动需要具有单向性:例如移动右一直增，移动左一直减
思路都是用 map 记录数字对应的索引/出现次数

1. 固定窗口大小 只需要一个 for 循环和两个时间点
   `1852. 每个子数组的数字种类数.py`
   `2107_分k颗糖果后的不同风味-固定大小滑窗.py`

   ```Python
        res = 0
        for right, cur in enumerate(candies):
            counter[cur] -= 1
            if not counter[cur]:
                del counter[cur]
            # 更新左端点
            if right >= k:
                counter[candies[right - k]] += 1
            # 更新答案
            if right >= k - 1:
                res = max(res, len(counter))
        return res
   ```

2. 移动窗口大小
   `k 重复字符子串词频统计`系列 => 不符合条件就收缩

   ```js
   while (r < s.length) {
     if ((counter.get(s[r]) || 0) === 0) type++
     counter.set(s[r], (counter.get(s[r]) || 0) + 1)
     r++

     // 不符合条件就收缩
     while (type > k) {
       if (counter.get(s[l]) === 1) type--
       counter.set(s[l], counter.get(s[l]) - 1)
       l++
     }

     res = Math.max(max, r - l)
   }
   ```
