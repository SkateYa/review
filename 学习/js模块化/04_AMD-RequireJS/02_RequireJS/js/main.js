(function () {
  //配置
  requirejs.config({
    //基本路径
    baseUrl: "js/",
    //映射: 模块标识名: 路径
    paths: {
      // 不用加.js,因为它默认会自动添加.js
      //自定义模块
      dataService: "./modules/dataService",
      alerter: "./modules/alerter",
      jquery: "./libs/jquery-1.10.1",
      angular: "./libs/angular",
    },
    //配置不兼容AMD的模块
    shim: {
      angular: {
        exports: "angular",
      },
    },
  });

  //引入模块使用
  requirejs(["alerter", "angular"], function (alerter, angular) {
    alerter.showMsg();
    console.log(angular);
  });
})();
