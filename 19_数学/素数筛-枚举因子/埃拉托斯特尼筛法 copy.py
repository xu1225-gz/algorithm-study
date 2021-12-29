from typing import List


def genPrime(upper: int) -> List[int]:
    visited = [False] * (upper + 1)
    res = []
    for num in range(2, upper + 1):
        if visited[num]:
            continue
        res.append(num)
        for multi in range(num * num, upper + 1, num):
            visited[multi] = True

    return res


P = iter(genPrime(100))
print(next(P))
print(next(P))

