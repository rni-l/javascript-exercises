function debounce(fn, time) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, time);
  }
}

function throttle(fn, time) {
  let timer
  let starting = false
  return () => {
    if (starting) return
    timer = setTimeout(() => {
      fn()
      starting = false
    }, time);
  }
}