1. Token 认证的优势
   1. 无状态
   2. 有效避免了 CSRF 攻击(一般会选择存放在 local storage 中。然后我们在前端通过某些方式会给每个发到后端的请求加上这个 token,这样就不会出现 CSRF 漏洞的问题。因为，即使你点击了非法链接发送了请求到服务端，这个非法请求是不会携带 token 的，所以这个请求将是非法的。)
   3. 适合移动端应用
   4. 单点登录友好
2. Token 认证常见问题以及解决办法

   1. 注销登录等场景下 token 在 expiredTime 之前还有效，怎么办？
      与之类似的具体相关场景有：
      退出登录;
      修改密码;
      服务端修改了某个用户具有的权限或者角色；
      用户的帐户被删除/暂停。
      用户由管理员注销；

      因为在 Session 认证方式中，遇到这种情况的话服务端`删除对应的 Session 记录即可`。但是，使用 token 认证的方式就不好解决了。我们也说过了，`token 一旦派发出去，如果后端不增加其他逻辑的话，它在失效之前都是有效的。`

      1. redis 黑名单机制。每次使用 token 进行请求的话都会先判断这个 token 是否存在于黑名单中。
      2. redis 白名单机制，需要让某个 token 失效就直接从 redis 中删除这个 token 即可。但是，这样会导致每次使用 token 发送请求都要先从 DB 中查询 token 是否存在的步骤，而且违背了 JWT 的无状态原则。

      对于修改密码后 token 还有效问题的解决还是比较容易的，说一种我觉得比较好的方式：`使用用户的密码的哈希值对 token 进行签名`。因此，如果密码更改，则任何先前的令牌将自动无法验证。

   2. token 的续签问题
      token 有效期一般都建议设置的不太长，那么 token 过期后如何认证，如何实现动态刷新 token，避免用户经常需要重新登录？
      我们先来看看在 Session 认证中一般的做法：`假如 session 的有效期 30 分钟，如果 30 分钟内用户有访问，就把 session 有效期延长 30 分钟。`

      1. 类似于 Session 认证中的做法：这种方案满足于大部分场景。假设服务端给的 token 有效期设置为 30 分钟，服务端每次进行校验时，`如果发现 token 的有效期马上快过期了，服务端就重新生成 token 给客户端`。客户端每次请求都检查新旧 token，如果不一致，则更新本地的 token。这种做法的问题是仅仅在快过期的时候请求才会更新 token ,对客户端不是很友好。
      2. 用户登录返回两个 token:第一个是 **accessToken** ，它的过期时间 token 本身的过期时间比如`半个小时`，另外一个是 **refreshToken** 它的过期时间更长一点比如为 `1 天`。客户端登录后，将 accessToken 和 refreshToken 保存在本地，每次访问将 accessToken 传给服务端。服务端校验 accessToken 的有效性，`如果过期的话，就将 refreshToken 传给服务端`。`如果有效，服务端就生成新的 accessToken 给客户端`。否则，客户端就重新登录即可。该方案的不足是：1) 需要客户端来配合；2) 用户注销的时候需要同时保证两个 token 都无效；3) 重新请求获取 token 的过程中会有短暂 token 不可用的情况（`可以通过在客户端设置定时器，当 accessToken 快过期的时候，提前去通过 refreshToken 获取新的 accessToken`）。

3. JWT 最适合的场景是不需要服务端保存用户状态的场景，`如果考虑到 token 注销和 token 续签的场景`话，没有特别好的解决方案，`大部分解决方案都给 token 加上了状态，这就有点类似 Session 认证了。`
