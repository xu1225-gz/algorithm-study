格雷码是我们在工程中常会遇到的一种编码方式，它的基本的特点就是任意两个相邻的代码只有一位二进制数不同。

**二进制格雷码与自然二进制码的互换**

二进制转格雷码:
`异移`

```Python
n^(n>>1)

[start ^ i ^ (i >> 1) for i in range(2 ** n)]
```

格雷码转二进制(格雷码的解码即为转换为 0 需要的最小的次数。):

```Python
res= 0
while g>0:
  res^=g
  g>>=1
return res
```

`边异边移`
