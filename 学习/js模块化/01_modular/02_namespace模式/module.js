/**
 * namespace模式: 简单对象封装
 * 作用: 减少了全局变量
 * 问题: 不安全(数据不是私有的, 外部可以直接修改)
 */

let obj = {
    msg:'module2',
    foo(){
        // 这个msg是找window下的msg
        // console.log('foo',msg)
        // 这个是取obj里的msg
        console.log('foo',this.msg)
    }
}