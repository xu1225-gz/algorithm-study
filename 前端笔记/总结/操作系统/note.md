1.  服务器为什么用 Linux
    首先就是开源，其次就是安全无漏洞不容易被攻击
2.  select epoll 等异步
3.  串行=>批处理=>进程=>线程
4.  同步异步 阻塞非阻塞
    进程五个状态(参考 Java)
    同步异步:消息通信机制
    阻塞非阻塞：程序等待调用结果时的状态
5.  用户态和内核态理解
    执行等级
6.  进程何时进入内核态
    系统调用/异常中断/外围设备中断
7.  IO 密集型： 复制粘贴，下载工具
8.  CPU 密集型：游戏画面渲染(gpu)，图片卷积，视频解码，AI 模型训练
9.  协程
10. 什么是虚拟内存
    内存管理关键技术
11. 操作系统的内存管理：
    页式：**进程逻辑空间分成若干固定大小的页面**。分页映射，页大小固定，逻辑连续，物理分散 页面 4k 大小
    **页表**记录进程逻辑空间与物理空间的映射
    段式：**进程逻辑空间分成若干大小的段**，分段映射，段大小不固定，取决于连续逻辑的长度，例如主函数，子函数等
    段页式:逻辑空间先分段，段内空间再分页
    操作系统中的缺页中断:
    访问的页面不在内存，则产生缺页中断.
12. 页面置换算法:在地址映射过程中，若在页面中发现**所要访问的页面不在内存中**，则产生**缺页中断**。当发生缺页中断时，如果操作系统内存中没有空闲页面，则操作系统必须在内存选择一个页面将其移出内存，以便为即将调入的页面让出空间。而用来选择淘汰哪一页的规则叫做页面置换算法(理解为安卓的后台页面)。
    FIFO
    LFU
    LRU
    OPT
    CLOCK
13. linux 文件系统(Ext 文件系统)
    软连接与硬链接的区别：硬链接直接指向 Inode/软连接有自己的 Inode 和 Block ,指向源文件
    软连接：windows 快捷方式
    linux 文件=Inode+Block
    INode:保存文件的元信息
    Block:存放文件内容
14. RAID 磁盘冗余阵列
    利用虚拟化技术组合多个硬盘成一个，提升性能减少冗余

15. 死锁
    概念：进程/线程竞争发生阻塞(例如 go channel 阻塞,生产者消费者阻塞，哲学家就餐)
    原因：竞争临界资源(只允许一个线程访问的资源)/调度顺序不当
    四个必要条件:`互斥`、`请求和保持`、`不可剥夺`、`环路`
    如何避免线程死锁:破坏` 请求和保持``环路 `
16. 🔒 的种类
    乐观锁/悲观锁
    乐观锁：适合读操作多；结束确定版本号
    悲观锁：适合写操作多

    无锁=>偏向锁=>轻量级锁=>重量级锁
    无锁：不锁资源，多个线程一个改，其余线程重试
    偏向锁：同一个线程自动获取资源
    轻量级锁：没有获得资源的线程**自旋等待锁释放**
    重量级锁：没有获得资源的线程阻塞等待唤醒

    公平锁：获取资源的线程必须排队
    非公平锁：获取资源的线程可以插队;吞吐率高，CPU 不必唤醒所有线程；**可能有饥饿的线程**

    可重入锁：这个线程再次获得锁时不阻塞（可以锁两次）
    非可重入锁：这个线程再次获得锁时阻塞

    共享锁：可被多个线程持有锁，但是只能读数据不能改
    排他锁：mutex

17. 互斥锁与自旋锁
18. 线程**同步/通信**方式(使用锁)
    **线程间的通信目的主要是用于线程同步**，所以线程没有像进程通信中的用于数据交换的通信机制
    互斥锁/量（mutex）、读写锁（reader-writer lock）、自旋锁（spin lock）、条件变量（condition）
    **互斥锁/量**（mutex）：提供了以排他方式防止数据结构被并发修改的方法，串行访问。
    **自旋锁**（spin lock）与互斥锁类似，都是为了保护共享资源。互斥锁是当资源被占用，申请者进入睡眠状态(**让出 CPU**)；而**自旋锁则循环检测**保持者是否已经释放锁(**不会让出 CPU**，忙等待，避免进程线程切换上下文开销，不适合单核 CPU 使用,操作系统内部很多地方自旋锁)。
    **读写锁**（reader-writer lock）：**特殊的自旋锁**，允许多个线程同时读共享数据，而对写操作是互斥的。
    **条件变量**（condition）：可以以原子的方式阻塞进程，直到某个特定条件为真为止。对条件的测试是在互斥锁的保护下进行的。条件变量始终与互斥锁一起使用。
    例子：**生产者-消费者通过缓存区存在同步关系**(go channel)
    https://interview.huihut.com/#/?id=%e8%bf%9b%e7%a8%8b%e4%b8%8e%e7%ba%bf%e7%a8%8b

    此外还有 webworker 的 sharedArrayBuffer 线程通信

19. 进程间同步/通信
    **管道（PIPE）**:`linux 的 | `
    `有名管道`：一种半双工的通信方式，它允许无亲缘关系进程间的通信
    优点：可以实现任意关系的进程间的通信
    缺点：
    长期存于系统中，使用不当容易出错
    缓冲区有限
    `无名管道`：一种半双工的通信方式，只能在具有亲缘关系的进程间使用（父子进程）
    优点：简单方便
    缺点：
    局限于`单向通信`
    只能创建在它的进程以及其有`亲缘关系的进程之间`
    缓冲区有限
    **消息队列**（Message Queue）：是消息的链表，存放在内核中并由消息队列标识符标识 `跨级进程通信Kafka,RabbitMQ`
    优点：可以实现任意进程间的通信，并通过系统调用函数来实现消息发送和接收之间的同步，无需考虑同步问题，方便
    缺点：信息的复制需要额外消耗 CPU 的时间，不适宜于信息量大或操作频繁的场合
    **共享内存**（Shared Memory）：`映射一段能被其他进程所访问的内存`，这段共享物理内存由一个进程创建，但多个进程都可以访问
    优点：无须复制，**快捷**，信息量大
    缺点：
    通信是通过将共享空间缓冲区直接附加到进程的虚拟地址空间中来实现的，因此进程间的读写操作的同步问题,`共享内存未提供同步机制`
    利用内存缓冲区直接交换信息，内存的实体存在于计算机中，只能同一个计算机系统中的诸多进程共享，不方便网络通信
    **信号**（Signal）：一种比较复杂的通信方式，用于通知接收进程某个事件已经发生
    `NodeJS` SIGHUP(1,ctrlZ) SIGINT(2,ctrlC) SIGKILL(9) 等
    **信号量**（Semaphore）：一个计数器，可以用来控制多个线程对共享资源的访问
    优点：可以同步进程
    缺点：信号量有限
    **套接字**（Socket）：可用于`不同计算机间`的进程通信
    `NodeJS`master 传递 socket 给 slaver
    优点：
    传输数据为字节级，传输数据可自定义，数据量小效率高
    传输数据时间短，性能高
    适合于客户端和服务器端之间信息实时交互
    可以加密,数据安全性强
    缺点：需对传输的数据进行解析，转化成应用级的数据。
20. 无锁数据结构的原理 (CAS 原理与无锁技术) Compare & Swap
    并行系统访问临界资源必须考虑加锁
    原子性：一系列操作**不可被中断**,要么全执行要么不执行
    CAS 本质是一个原子性指令,做了两件事:比较旧值，交换新值
21. 分布式锁的实现
    场景：**秒杀系统**
    redis 临界资源 需要分布式锁保护临界资源
    - 基于 redis (setnx key value 加锁) (del key 释放锁)
    - 基于 Zookeeper 数据节点:znode
    - 基于 mysql
22. 为什么分层：复杂系统实现要有清晰明确的分层设计
23. 对 java/python 字节码的理解
24. 编译和解释的区别
    ts 编译成 js jsx 编译成 h 函数 cpp/go 编译成可执行文件 java 编译成.class 字节码
    js/python 都是解释型语言
25. JIT 技术
26. 源码到二进制文件的转化步骤
    二进制程序本质是一条条 CPU 指令，而不同 CPU 体系结构的指令集不同，C/C++程序跨平台需要重新编译
    C++代码
    test.cpp=>main(二进制文件)
    **预编译**(代码文本替换，#define 等)=>**编译**(g++编译)=>**汇编**(转机器码)=>**链接**(调库的依赖，链接到目标文件)=>**装载**(可执行文件加载到内存，确定进程入口地址，完整进程空间)=>**运行**
    java 代码：
    java=>（**编译**）JVM 字节码=>（**解释**）机器码  
    针对解释执行效率不如本地二进制执行效率的问题=>**JIT 技术**
    JIT:**在运行过程动态将中间字节码编译成本地代码**
27. 静态和动态链接的区别

28. socket 工作原理
    文件&管道
    IO 多路复用:单个线程处理多个 socket
29. BIO:阻塞线程；原理是利用 CPU 中断
    NIO:不阻塞线程；
    AIO：异步，终极目标是异步转同步(async await)

30. 小端字节序与大端字节序
    字节的排列方式有两个通用规则:

    **大端序**（Big-Endian）将`数据的低位字节存放在内存的高位地址`，高位字节存放在低位地址。这种排列方式与数据用字节表示时的书写顺序一致，`符合人类的阅读习惯`。
    **小端序**（Little-Endian），将一个多位数的低位放在较小的地址处，高位放在较大的地址处，则称小端序。`小端序与人类的阅读习惯相反，但更符合计算机读取内存的方式`，因为 CPU 读取内存中的数据时，是从低地址向高地址方向进行读取的。

    举例来说，数值 0x2211 使用两个字节储存：高位字节是 0x22，低位字节是 0x11
    大端字节序：高位字节在前，低位字节在后，这是人类读写数值的方法。
    小端字节序：低位字节在前，高位字节在后，即以 0x1122 形式储存。

    ```JS
    const buffer = new ArrayBuffer(24);
    const dv = new DataView(buffer);
    // 小端字节序
    const v1 = dv.getUint16(1, true);
    // 大端字节序
    const v2 = dv.getUint16(3, false);
    // 大端字节序
    const v3 = dv.getUint16(3);  // 默认大端
    ```

31. linux 信号
    快捷键|名称|数字
    -----|-----|-----
    ctrl-z|SIGHUP|1
    ctrl-c|SIGINT|2
    x|SIGKILL|9
    x|SIGTERM|15|优雅退出（该信号可以被阻塞和处理）

    如何让 nodejs 服务器优雅地退出
    如果我们直接杀死进程，那么存量的请求就会无法正常被处理
    我们首先`监听 SIGINT` 信号，当我们使用 SIGINT 信号杀死进程时，首先调用 server.close，等到所有的连接断开，触发 close 时候时，再退出进程

    ```JS
    const net = require('net');
    const server = net.createServer().listen(80);
    server.on('close', () => {
        process.exit();
    });
    // 防止进程提前挂掉
    process.on('uncaughtException', () => {

    });
    process.on('SIGINT', function() {
        server.close();
    })
    ```

32. 进程线程区别
    操作系统
    ·进程和线程之间有什么区别?
    进程是运行中的程序，线程是进程的内部的一个执行序列
    进程是资源分配的单元，线程是执行行单元
    进程间切换代价大，线程间切换代价小
    进程拥有资源多，线程拥有资源少，多个线程共享进程的资源
33. 进程为啥切换代价比线程要大?
    进程与线程最⼤的区别在于上下⽂切换过程中，**线程不⽤切换虚拟内存**，因为同⼀个进程内的线程都是共享虚拟内存空间的，线程就单这⼀点不⽤切换，就相⽐进程上下⽂切换的性能开销减少了很多
34. 为什么协程切换的代价比线程切换低?
    线程切换需要借助内核完成，意味着一次用户态到内核态的切换，以及一次内核态到用户态的切换。而协程的切换只在用户态就可以完成，无需借助内核，也就不需要进入内核态。
    `用户态和内核态的切换才是最主要的开销。`
35. select poll epoll IO 多路复用三种模型区别
    select :轮询数据，O(n) 性能低，最大轮询文件描述符 1024 **apache**
    poll:类似于 poll 只是最大监听文件描述符 不同
    epoll:红黑树+监听事件 **nginx**

36. epoll 中水平触发和边缘触发区别
    level_triggered：监听的 fd 变化时，epoll_wait()通知处理程序取读写 如果没完全读写玩(缓冲区小了) 下次调 epoll_wait()就还会通知上次没读写玩的 fd 降低效率
    edge_triggered：下次调 epoll_wait()不会通知上次没读写玩的 fd 只会通知一次

37. 进程三种状态
    就绪 阻塞 运行
38. 进程调度算法
    1. FIFO
    2. 短作业优先
    3. 优先权调度法:抢占式/非抢占式
    4. 时间片轮转
39. 操作系统如何申请和管理内存
    进程持有的虚拟地址会通过 CPU 芯⽚中的**内存管理单元**（MMU）的映射关系，来转换变成物理地址，然后再通过物理地址访问内存
    操作系统是如何管理虚拟地址与物理地址之间的关系？
    主要有两种⽅式，分别是`内存分段和内存分⻚`
40. linux 系统态和用户态
    。简述 Linux 系统态与用户态，么时候会进入系统态?
    系统态：操作系统运行在系统态，一般应用运行在用户态

    1. 系统调用（system call）:是操作系统提供给应用程序的接口。 用户通过调用 systemcall 来完成那些需要操作系统内核进行的操作，例如硬盘，网络接口设备的读写等。
    2. 发生异常，当 cpu 正在执行运行在用户态的程序的时候，突然发生某些预先不可知的异常事件，这个时候就会触发从当前用户态执行的进程转向内核态执行相关的异常事件，典型的如`缺页异常`。
    3. 外围设备的中断:`当外围设备完成用户的请求操作后`，会像 CPU 发出中断信号，此时，CPU 就会暂停执行下一条即将要执行的指令，转而去执行中断信号对应的处理程序，如果先前执行的指令是在用户态下，则自然就发生从用户态到内核态的转换。

41. 同步异步 阻塞非阻塞区别
    同步/异步关注的是`消息通信机制`
    所谓同步，就是在发出一个调用时，在没有得到结果之前， 该调用就不返回。
    异步则是相反，调用在发出之后，这个调用就`直接返回了，所以没有返回结果`

    阻塞/非阻塞关注的是`程序在等待调用结果（消息，返回值）时的状态.`
    阻塞调用是指调用结果返回之前，当前`线程会被挂起`。调用线程只有在得到结果之后才会返回。
    非阻塞调用指在不能立刻得到结果之前，该调用`不会阻塞当前线程`。

42. 操作系统中的缺页中断
    虚拟内存实际上可以比物理内存大。当访问虚拟内存时，会访问 MMU(内存管理单元)去匹配对应的物理地址，而如果虚拟内存的页并不存在于物理内存中，会产生缺页中断，从磁盘中取得缺的页放入内存，`如果内存已满，还会根据某种算法将磁盘中的页换出`。

    最佳页面置换算法（OPT）：置换在「未来」最长时间不访问的页面

    先进先出置换算法（FIFO）

    最近最久未使用的置换算法（LRU）

    最不常用置换算法（LFU）

    时钟页面置换算法（Clock）

43. 操作系统 malloc 实现原理
    malloc 的全称是 memory allocation，中文叫`动态内存分配`,在`堆`中动态分配内存
    malloc 基本的实现原理就是维护一个`内存空闲链表`，当申请内存空间时，搜索内存空闲链表，找到适配的空闲内存空间，然后将空间分割`成两个内存块`，一个变成分配块，一个变成新的空闲块。如果没有搜索到，那么就会用 sbrk()才推进 brk 指针来申请内存空间。
    搜索空闲块最常见的算法有:首次适配，下一次适配，最佳适配。
    首次适配:第一次找到足够达的内存块就分配，这种方法会产生很多的内存碎片。
    下一次适配:也就是说等第二次找到足够大的内存块就分配，这样会产生比较少的内存碎片。
    最佳适配 ∶ 对堆进行彻底的搜索，从头开始，遍历所有块，使用数据区大小大于 size 且差值最小的块作为此次分配的块。

44. linux IO 模型
    同步 IO
    异步 IO
    阻塞 IO
    非阻塞 IO
    多路复用 IO
    信号驱动 IO

// TODO

45. 动态链接和静态链接的区别？优缺点？

46. 如何实现负载均衡？原理？算法？

47. 进程的切换？上下文保存在哪里
    寄存器与计数器都是 CPU 在运行任务前必须依赖的环境，也被叫做 CPU 上下文
    所谓的上下文切换，就是把上一个任务的`寄存器和计数器`保存起来，然后加载新任务的寄存器和计数器，最后跳转到新任务的位置开始执行新任务。CPU 上下文全部存储在`系统内核空间`里

48. 什么是上下文切换?
    线程在执行过程中会有自己的运行条件和状态（也称上下文），比如上文所说到过的`程序计数器`，`栈信息`等。当出现如下情况的时候，线程会从占用 CPU 状态中退出。
    - 主动让出 CPU，比如调用了 sleep(), wait() 等。`sleep() 方法没有释放锁，而 wait() 方法释放了锁 。`
    - 时间片用完，因为操作系统要防止一个线程或者进程长时间占用 CPU 导致其他线程或者进程饿死。
    - 调用了阻塞类型的系统中断，比如请求 IO，线程被阻塞。
    - 被终止或结束运行
      这其中前三种都会发生线程切换，线程切换意味着需要保存当前线程的上下文，留待线程下次占用 CPU 的时候恢复现场。并加载下一个将要占用 CPU 的线程上下文。这就是所谓的 `上下文切换`。
49. 说说 sleep() 方法和 wait() 方法区别和共同点?

    1. 两者最主要的区别在于：sleep() 方法没有释放锁，而 wait() 方法释放了锁 。
    2. 两者都可以暂停线程的执行。
    3. wait() 通常被用于线程间交互/通信，sleep() 通常被用于暂停执行。
    4. wait() 方法被调用后，线程不会自动苏醒，需要别的线程调用同一个对象上的 notify() 或者 notifyAll() 方法。sleep() 方法执行完成后，线程会自动苏醒。或者可以使用 wait(long timeout) 超时后线程会自动苏醒。

50. **操作系统的作用**
    管理与调度硬件、软件
    **操作系统的本质**
    一个运行在计算机上的软件程序
    **操作系统的内核作用**(上接 app,下接 devices/cpu/memory)
    操作系统的核心部分，它负责系统的`内存`管理，`硬件设备`的管理，`文件系统`的管理以及`应用程序`的管理。是连接应用程序和硬件的桥梁，决定着操作系统的性能和稳定性。
51. 内核（Kernel）和中央处理器（CPU）的区别
    ![区别](https://camo.githubusercontent.com/0db97dd933efd0f558100d9ae4b0d56e0c05f4cb52e429f77cf24c1e5da6c70e/68747470733a2f2f67756964652d626c6f672d696d616765732e6f73732d636e2d7368656e7a68656e2e616c6979756e63732e636f6d2f323032302d382f4b65726e656c5f4c61796f75742e706e67)

    - 内核（Kernel）属于操作系统层面，而 CPU 属于硬件。
    - CPU 主要提供运算，处理各种指令的能力;内核（Kernel）主要负责系统管理比如内存管理，它屏蔽了对硬件的操作。

52. 用户态和系统态。
    根据`进程访问资源的特点`，我们可以把进程在系统上的运行分为两个级别：

    用户态(user mode) : 用户态运行的进程或可以直接`读取用户程序的数据`。
    系统态(kernel mode): 可以简单的理解系统态运行的进程或程序`几乎可以访问计算机的任何资源`，不受限制。

    系统调用:我们运行的用户程序中，凡是与系统态级别的资源有关的操作（如文件管理、进程控制、内存管理等)，都必须通过系统调用方式向操作系统提出服务请求，并由操作系统代为完成。

53. Linux 的发行版本可以大体分为两类：
    商业公司维护的发行版本，以著名的 Red Hat 为代表，比较典型的有 CentOS 。
    社区组织维护的发行版本，以 Debian 为代表，比较典型的有 Ubuntu、Debian。
