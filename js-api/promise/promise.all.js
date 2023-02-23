Promise.fakeAll = function(promiseList) {
  const len = promiseList.length
  let okNum = 0
  const result = []
  return new Promise((resolve) => {
    promiseList.forEach((v, i) => {
      v.then((res) => {
        okNum += 1
        result[i] = res
      }).catch(err => {
        okNum += 1
        result[i] = err
      }).finally(() => {
        if (okNum === len) resolve(result)
      })
    })
  })
}

Promise.fakeAll([
  Promise.resolve(1),
  Promise.resolve(2),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1000)
    }, 1000);
  })
]).then(res => {
  console.log(res)
})
