// 将输入的变量名转换为小驼峰写法

// 可能的输入命名如下：
// TestVariable
// test_variable
// TEST_VARIABLE，
// 最终输出为testVariable
// 分两种情况：一种是没有下划线在字符串里的，直接把首字母转小写就行；
// 另一种是用下划线分隔的字符串，
// 将字符串全部小写化再用下划线分割，首单词不变，其他单词的首字母转大写就行。
