/**
 * 使用module.exports = value向外暴露一个对象
 */
// 可以写多个暴露的方法
exports.foo = function () {
  console.log("foo module3");
};

exports.bar = function () {
  console.log("bar module3");
};
