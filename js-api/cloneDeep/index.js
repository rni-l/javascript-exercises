function cloneDeep1(val, hash = new WeakMap()) {
  const type = Object.prototype.toString.call(val)
  if (/String|Number|Boolean|Function|Null|Undefined/.test(type)) return val
  if (hash.has(val)) return hash.get(val);
  let result = undefined
  switch (type) {
    case '[object Object]':
      result = Object.entries(val).reduce((acc, v) => {
        acc[v[0]] = cloneDeep1(v[1], hash)
        return acc
      }, {})
      break
    case '[object Array]':
      result = val.map((v) => cloneDeep1(v, hash))
      break

    case '[object Date]':
      result = new Date(val)
      break

    case '[object RegExp]':
      result = new RegExp(val)
      break
    case '[object Set]':
      result = new Set()
      for (const iterator of val) {
        result.add(cloneDeep1(iterator, hash))
      }
      break
    case '[object Map]':
      result = new Map()
      for (const [key, v] of val) {
        result.set(cloneDeep1(key, hash), cloneDeep1(v, hash))
      }
      break
    default:
      break
  }
  hash.set(obj, result);
  return result
}
const set = new Set()
set.add(1, 23, 23, 1, { a: 1 })
const map = new Map()
map.set({ a: 1 }, { b: 2 })
const obj = {
  a: 2,
  d: {
    a: '1',
    c: () => {},
    f: [
      1,
      23,
      {
        a: 1,
      },
    ],
  },
  c: new Date(),
  b: new RegExp(/a/),
  set,
  map,
}
obj.f = obj // 循环引用

const newObj = cloneDeep1(obj)
obj.a = 3
console.log(obj.a, newObj.a)
