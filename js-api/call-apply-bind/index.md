# 实现 call/apply/bind

> 这三个方法都是修改调用者的 this 上下文

## call

> 修改调用函数，并且按个传入参数并执行

实现原理：根据传入的 ctx 对执行函数进行包裹，使执行函数的作用域可以找到 ctx，然后再执行

```javscript
Function.prototype.fakeCall = function(ctx, ...args) {
  let executeCtx = ctx
  const tempKey = `temp_${Date.now()}`
  if (typeof ctx === 'object' && ctx !== null) {
    executeCtx[tempKey] = this
  } else {
    executeCtx = {
      [tempKey]: this
    }
  }
  const res = executeCtx[tempKey](...args)
  delete executeCtx[tempKey]
  return res
}
function Food2(name, price) {
  Product.fakeCall(null, name, price);
  this.category = 'food';
}
```

## apply

> 修改调用函数，并且传入数组类型的参数并执行

实现原理和 call 一样，只不过传入的参数改为数组

```javascript
Function.prototype.fakeApply = function(ctx, args) {
  let executeCtx = ctx
  const tempKey = `temp_${Date.now()}`
  if (typeof ctx === 'object' && ctx !== null) {
    executeCtx[tempKey] = this
  } else {
    executeCtx = {
      [tempKey]: this
    }
  }
  const res = executeCtx[tempKey](args)
  delete executeCtx[tempKey]
  return res
}
```

## bind

> 和 call 的原理一样，只不过返回一个修改了上下文后的函数，并且 bind 是一个柯里化的函数，实现一些函数复用、延迟执行等效果

```javascript
Function.prototype.fakeBind = function(ctx, ...args) {
  let executeCtx = ctx
  const tempKey = `temp_${Date.now()}`
  if (typeof ctx === 'object' && ctx !== null) {
    executeCtx[tempKey] = this
  } else {
    executeCtx = {
      [tempKey]: this
    }
  }
  
  return function (...args2) {
    const res = executeCtx[tempKey](...args, ...args2)
    delete executeCtx[tempKey]
    return res
  }
}
```

## 参考资料

1. [call mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
2. [call apply bind 的实现 - github](https://github.com/shfshanyue/Daily-Question/issues/674)