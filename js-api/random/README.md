# Random

## 得到一个大于等于 0，小于 1 之间的随机数

```javascript
function getRandom() {
  return Math.random();
}
```

## 得到一个两数之间的随机数

```javascript
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
```

## 得到一个两数之间的随机整数

```javascript
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
```

## 得到一个两数之间的随机整数，包括两个数在内

```javascript
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

```

## 洗牌算法

> 产生的结果有 n! 种可能，就算验证了洗牌算法的正确性
> 原理就是循环数组，将当前索引与从当前索引位和末位生成的一个随机索引的值进行替换

## 参考资料

1. [random - mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
2. [shuffle - github](https://github.com/labuladong/fucking-algorithm/blob/master/%E7%AE%97%E6%B3%95%E6%80%9D%E7%BB%B4%E7%B3%BB%E5%88%97/%E6%B4%97%E7%89%8C%E7%AE%97%E6%B3%95.md)