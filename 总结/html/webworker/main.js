// 获取元素
const numInput = document.getElementById('num');
const calculateButton = document.getElementById('calculate');
const resultElement = document.getElementById('result');

// 创建 Dedicated Worker
const myWorker = new Worker('worker.js');

// 监听消息
myWorker.addEventListener('message', function(e) {
  resultElement.textContent = '结果：' + e.data;
});

// 监听错误
myWorker.addEventListener('error', function(e) {
  console.error('Worker 错误：' + e.filename + ':' + e.lineno + ': ' + e.message);
});

// 处理点击事件
calculateButton.addEventListener('click', function() {
  const num = Number(numInput.value);

  if (isNaN(num) || num < 1) {
    alert('请输入一个大于等于 1 的数字！');
    return;
  }

  // 向 Dedicated Worker 发送消息
  myWorker.postMessage(num);
});