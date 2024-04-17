const empty = document.querySelector('div.empty')
const h1 = document.querySelector('h1')

let name

document.addEventListener(
  'dragstart',
  (e) => {
    name = e.target.alt
  },
  false
)

document.addEventListener(
  'drag',
  (e) => {
    e.target.style.border = '1px dashed red'
    empty.style.border = '4px dashed green'
  },
  false
)

document.addEventListener(
  'dragend',
  (e) => {
    e.target.style.border = 'none'
    empty.style.border = 'none'
    h1.innerHTML = 'Drag your img'
    h1.style.color = 'red'
  },
  false
)

empty.addEventListener(
  'dragenter',
  (e) => {
    if (empty.firstChild) {
      empty.removeChild(empty.firstChild)
    }
    h1.innerHTML = name
    h1.style.color = 'red'
  },
  false
)

empty.addEventListener(
  'dragover',
  (e) => {
    e.preventDefault()
  },
  false
)

empty.addEventListener(
  'drop',
  (e) => {
    e.preventDefault()
    e.target.appendChild(document.querySelector(`img[alt=${name}]`))
  },
  false
)