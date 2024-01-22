// 只能写一个module.exports，如果写多个，后面的会覆盖掉前面的
/**
 * 使用module.exports = value向外暴露一个对象
 */
module.exports = {
  msg: "module1",
  foo() {
    console.log(this.msg);
  },
};
