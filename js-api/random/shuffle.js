
// function shuffle(arr) {
//   const len = arr.length
// }

// shuffle([1, 2, 3, 4])

function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 随机生成六位数的手机验证码(重复/不可重复) 
function randomCodeAndRepeat() {
  const min = 100000
  const max = 999999
  return getRandomValue(max, min)
}

function randomCodeAndNoRepeat() {
  const cache = Array.from({ length: 10 }, (_, i) => i).reduce((acc ,v) => {
    acc[v] = false
    return acc
  }, {})
  const result = []
  while(result.length < 6) {
    const val = getRandomValue(9, 0)
    if (cache[val]) {
      continue
    } else {
      cache[val] = true
      result.push(val)
    }
  }
  return result.join('')
}
// console.log(randomCodeAndNoRepeat());


function shuffle(list) {
  const len = list.length
  const result = list.map(v => v)
  for (let i = 0; i < len; i++) {
    if (i < len - 1) {
      const rand = getRandomValue(len - 1, i)
      const tmp = result[i]
      result[i] = result[rand]
      result[rand] = tmp
    }
  }
  return result
}

console.log(shuffle([1,2,3,4]))