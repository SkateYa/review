(function (window, dataService) {
  let msg = "alerter.js";
  function showMsg() {
    console.log(msg, dataService.getMsg());
  }
  window.alerter = { showMsg };
})(window, dataService);
