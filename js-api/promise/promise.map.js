

function sleep(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, num);
  })
}

function pMap(list, mapFn, concurrency = Number.MAX_SAFE_INTEGER) {
  return new Promise(resolve => {
    const result = []
    const len = list.length
    let currentIndex = 0
    function next() {
      const tempIndex = currentIndex
      currentIndex++
      Promise.resolve(list[tempIndex]).then(res => mapFn(res)).then(res => {
        result.push(res)
        if (currentIndex === len) {
          resolve(result)
        } else {
          next()
        }
      })
    }
    for (let i = 0; i < len && i < concurrency; i++) {
      next()
    }
  })
}

pMap([1, 2, 3, 4, 5], x => Promise.resolve(x + 1)).then(res => console.log(res))

pMap([Promise.resolve(1), Promise.resolve(2)], x => x + 1).then(res => console.log(res))

// 注意输出时间控制
pMap([1, 1, 1, 1, 1, 1, 1, 1], x => sleep(1000), { concurrency: 2 }).then(res => console.log(res))