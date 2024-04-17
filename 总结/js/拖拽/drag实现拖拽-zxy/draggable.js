const empty = document.querySelector('div.empty')
const h1 = document.querySelector('h1')
let name = ''

// 源元素==============================================
// 用户开始拖动源元素时触发
// 在冒泡阶段执行
document.addEventListener('dragstart',(e)=>{
    console.log(e.target.alt)
    // 获取拖动元素的alt值
    name = e.target.alt
    // e.target.style.border='5px dashed red'
},false)

// 用户开始正在拖动源元素时触发
document.addEventListener('drag',(e)=>{
    // 设置拖动元素和空元素的边框
    e.target.style.border='5px dashed red'
    empty.style.border='5px dashed red'
},false)

// 用户开始结束拖动源元素
document.addEventListener('dragend',(e)=>{
    e.target.style.border='none'
    empty.style.border='none'
    // 拖动结束，改回h1的内容和颜色
    h1.innerHTML = '拖动你喜欢的图案到衣服上吧'
    h1.style.color = 'black'
},false)

// 目标元素==============================================
// 进入时
empty.addEventListener('dragenter',(e)=>{
    // e.target.style.border='5px dashed red'
    // 如果容器内有元素，就把元素移除（这样才能添加元素进容器）
    if(empty.firstChild){
        empty.removeChild(empty.firstChild)
    }
    // 修改h1的名字和颜色
    h1.innerHTML = name
    h1.style.color = 'red'
},false)

// 进入后
empty.addEventListener('dragover',(e)=>{
    e.preventDefault()
})

// 放置元素
empty.addEventListener('drop',(e)=>{
   console.dir('drag======',e)
   e.preventDefault()
   // 添加目标元素到容器内
   e.target.appendChild(document.querySelector(`img[alt=${name}]`))
},false)