document
  .querySelector('#parallax_wrapper')
  .addEventListener('mousemove', function (e) {
    // 水平
    // parseInt(string, radix) 转换为radix进位数字
    let horizontal =
      e.clientX /
      parseInt(
        getComputedStyle(document.querySelector('#parallax_wrapper')).width,
        10
      )
    // 垂直
    let vertical =
      e.clientY /
      parseInt(
        getComputedStyle(document.querySelector('#parallax_wrapper')).height,
        10
      )

    // console.log(horizontal, vertical)
    document.querySelector('#parallax_bg').style.transform = calculateTransform(
      horizontal,
      vertical,
      5
    )
    document.querySelector(
      '#parallax_error_text'
    ).style.transform = calculateTransform(horizontal, vertical, 20)
    document.querySelector(
      '#parallax_octocat'
    ).style.transform = calculateTransform(horizontal, vertical, 10)
    document.querySelector(
      '#parallax_sign'
    ).style.transform = calculateTransform(horizontal, vertical, -5)
  })

// 除以0.5，正中间不会位移
function calculateTransform(horizontal, vertical, offset) {
  return `translate(${((horizontal - 0.5) * offset) / 0.5}px, ${
    ((vertical - 0.5) * offset) / 0.5
  }px)`
}
