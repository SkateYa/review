define(function (require, exports, module) {
  let msg = "module4";
  //引入依赖模块(同步)
  var module2 = require("./module2");
  module2();
  //引入依赖模块(异步)
  require.async("./module3", function (module3) {
    module3.module3.fun();
  });
  function fun2() {
    console.log(msg);
  }
  exports.fun2 = fun2;
});
