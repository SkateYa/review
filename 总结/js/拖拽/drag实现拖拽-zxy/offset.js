// 这种方式适合做图片验证码
// 重点:照片外层容器设置了相对定位，移动的图片设置了绝对定位

const h1 = document.querySelector('h1')
const photos = document.querySelector('.photos')
const cat = document.querySelector('.cat')


// 图片左边距离页面的距离
const photoLeft = photos.offsetLeft
// 图片上边距离页面的距离
const photoTop = photos.offsetTop

//猫咪 鼠标按下事件
cat.addEventListener('mousedown', (e) => {
    // 求出鼠标距离猫的距离
    // 鼠标距离页面的距离 - 图片距离页面距离 - 猫图片距离外层图片距离
    const catLeft = e.pageX - photoLeft - cat.offsetLeft
    const catTop = e.pageY - photoTop - cat.offsetTop

    // 猫距离图片区域边缘的值
    function moving(e) {
        cat.style.left = e.pageX - catLeft - photoLeft + 'px'
        cat.style.top = e.pageY - catTop - photoTop + 'px'
    }

    // 鼠标移动事件
    document.addEventListener('mousemove', moving, false)


    // 鼠标松开事件
    document.addEventListener('mouseup', (e) => {
        // 通过猫的位置来判断是否放正位置
        if (cat.offsetLeft > 150 && cat.offsetLeft < 170 && cat.offsetTop > 270 && cat.offsetLeft < 290) {
            h1.innerHTML = '验证成功'
            h1.style.backgroundColor = 'blue'
        } else {
            h1.innerHTML = '搞错位置了'
            h1.style.backgroundColor = 'red'
        }
        document.removeEventListener('mousemove', moving)
    }, false)
}, false)