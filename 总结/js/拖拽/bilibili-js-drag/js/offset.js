const h1 = document.querySelector('h1')
const photos = document.querySelector('div.photos')
const cat = document.querySelector('img[alt="cat"]')

const photoLeft = photos.offsetLeft
const photoTop = photos.offsetTop

cat.addEventListener(
  'mousedown',
  (e) => {
    const catLeft = e.pageX - photoLeft - cat.offsetLeft
    const catTop = e.pageY - photoTop - cat.offsetTop

    function moving(e) {
      cat.style.left = e.pageX - catLeft - photoLeft + 'px'
      cat.style.top = e.pageY - catTop - photoTop + 'px'
    }

    document.addEventListener('mousemove', moving, false)
    document.addEventListener(
      'mouseup',
      (e) => {
        document.removeEventListener('mousemove', moving)
      },
      false
    )
  },
  false
)
