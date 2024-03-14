// worker.js  
  
// 接受消息
self.onmessage = function(event) {  
    console.log('worker---onmessage', event)
    // 从主线程接收到的数据  
    var data = event.data;  
    
    // 执行一些计算任务  
    var result = performHeavyTask(data);  
    
    // 将结果发送回主线程  
    self.postMessage(result);  
  };  
    
  function performHeavyTask(data) {  
    // 这里是一个示例计算任务，你可以替换为任何耗时的操作  
    var sum = 0;  
    for (var i = 0; i < data; i++) {  
      sum += i;  
    }  
    return sum;  
  }