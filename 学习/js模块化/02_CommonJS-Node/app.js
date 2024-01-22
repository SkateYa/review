/**
  1. 定义暴露模块:
    module.exports = value;
    exports.xxx = value;
  2. 引入模块:
    var module = require(模块名或模块路径);
 */

let uniq = require('uniq')

let module1 = require('./modules/module1')
let module2 = require('./modules/module2')
let module3 = require('./modules/module3')


module1.foo()
module2()
module3.foo()
module3.bar()


var data = [1, 2, 2, 3, 4, 5, 5, 5, 6]
// 数组去重
let result = uniq(data)
console.log(result)