# CloneDeep

## 如何处理的重点

1. 循环引用的问题
2. function, regexp, date, set, map 等数据结构如何处理

## 方法

### lodash - cloneDeep 处理

### 原生 API: structuredClone

### 自己实现

使用 `WeakMap` 方式去解决循环引用的问题：

1. 将对象值作为 `WeakMap` 的 key，克隆后的值为 value；每次执行 cloneDeep 时，检测要复制的值是否存在 `WeakMap` 中，存在则直接返回
2. 因为 `WeakMap` 是弱引用的，当没有除 `WeakMap` 之外的引用时，对应的值就会被 CG 回收

## 参考资料

1. [如何实现 cloneDeep - github](https://github.com/shfshanyue/Daily-Question/issues/203)
2. [structuredClone - mdn](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
3. [weekMap - mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)