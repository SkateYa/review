define(function(require){
    let m1 = require('./module1')
    console.log(m1.foo())
    let m4 = require('./module4')
    m4.fun2()

})