function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// Expected output: "cheese"

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
  Product.fakeCall(this, name, price);
  this.category = 'food';
}

const f = new Food2('cheese', 5)
console.log(f.name);


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
function Product3(args) {
  this.name = args[0];
  this.price = args[1];
}
function Food3(args) {
  Product.fakeApply(this, args);
  this.category = 'food';
}

const f2 = new Food3('cheese', 5)
console.log(f.name);

const obj = {
  a: 1
}

function test(name) {
  console.log(this.a + name);
}
test('1')
test.bind(obj)('1')
test.bind(obj, '2')()

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

test.fakeBind(obj)('1')
test.fakeBind(obj, '2')()