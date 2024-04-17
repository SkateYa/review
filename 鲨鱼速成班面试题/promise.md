目录

***

[TOC]

***

# promise连续调用

```
function eatHotpot(){
    return new Promise((resolve)=>{
        resolve('吃火锅')
    })
}

function eatTea(){
    return new Promise((resolve, reject) => {
        resolve('喝奶茶')
    });
}

// promise用法：第一个promise里面可以写一个return ，return一个接下来还要调用的promise对象
// 接下来可以连续then，第二个then就是调用第一个返回值的promise
eatHotpot().then(res=>{
    console.log(res)
    return eatTea()
}).then(res1=>{
    console.log('res1',res1)
})
   
```

# js报错处理

## 错误的类型

     Error:   所有错误的父类型
     ReferenceError:   引用的变量不存在
     TypeError:   数据类型不正确的错误
     RangeError: 数据值不在其所允许的范围内
     SyntaxError:   语法错误

<!---->

    1. 常见的异常错误
    // 1. ReferenceError: 引用的变量不存在
    console.log(a); // ReferenceError: a is not defined


    // 2. TypeError: 数据类型不正确的错误
    let b = null;
    console.log(b.xxx); // TypeError: Cannot read property 'xxx' of null;

    // 3. RangeError: 数据值不在其所允许的范围内
    function fn() {
      fn();
    }
    fn(); // RangeError: Maximum call stack size exceeded


    //3. SyntaxError: 语法错误;
    let c = """"; // SyntaxError: Unexpected string

## 错误处理

    捕获错误: try ... catch
    抛出错误: throw error

# 异步编程（老的方法）

    // 1. fs文件操作
    require("fs").readFile("./index.html", (err, data) => {});
    // 2. 数据库操作
    // 3.ajax
    $.get("/server", (data) => {});
    // 4.定时器
    setTimeout(() => {}, 100);

# promise的特点

## promise的优点

promise的优点：\
1.指定回调函数的方式更灵活（旧的必须在启动异步任务前指定）\
2.支持链式调用，可以解决回调地狱问题

什么是回调地狱?
回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件
回调地狱的缺点：

1.  不便于阅读
2.  不便与异常处理\
    解决方案 ：promise链式调用\
    终极方案：async/await

```
// 回调地狱
var sayhello = function (name, callback) {
  setTimeout(function () {
    console.log(name);
    callback();
  }, 1000);
}
sayhello("first", function () {
  sayhello("second", function () {
    sayhello("third", function () {
      console.log("end");
    });
  });
});
//输出： first second third  end

```

## Promise缺点

1.  无法取消Promise，一旦新建它就会立即执行，无法中途取消。
2.  如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
3.  当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

# promise基本上使用

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。\
resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去\
reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

    const promise = new Promise(function(resolve, reject) {
      // ... some code

      if (/* 异步操作成功 */){
        resolve(value);
      } else {
        reject(error);
      }
    });

<!---->

     btn.addEventListener('click', function () {
        const p = new Promise((resolve, reject) => {
            console.log('点击按钮')
            setTimeout(() => {
                let n = rand(1, 100)
                if (n < 30) {
                    resolve(n) // 成功时的回调，将promise对象的状态值设为“成功”
                } else {
                    reject(n) // 失败时的回调，将promise对象的状态值设为“失败”
                }
            }, 1000);
        })
        // 第一个是promise成功时的回调方法，第二个是promise失败时回调方法
        p.then((n) => {
            console.log('第一个', n)
            alert('恭喜你中奖了')
        }, (n) => {
            console.log('第二个', n)
            alert('再接再厉')
        })
        
         // 失败的回调
        p.catch(reason => {
            console.log(reason);
        });
    })

## new promise里的代码是同步调用的

    let p = new Promise((resolve, reject) => {
        // ** 同步调用
        console.log(111);
    });

    console.log(222);
    // 111 222

     // 失败的回调
    p.catch(reason => {
        console.log(reason);
    });

## promise执行顺序

执行器函数是同步执行的，一般来说都是先改变状态再执行then方法，如果resolve写在定时器里，则then先执行，再改变状态

    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('OK');
        }, 4000);
    });

    p.then(value => {
        console.log(value);
    },reason=>{
        
    })

# Promise如何串联多个任务

    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('OK');
        }, 1000);
    });

    p.then(value => {
        return new Promise((resolve, reject) => {
            resolve("success");
        });
    }).then(value => {
        console.log(value);  //success
    }).then(value => {
        console.log(value);   // undefined
    })

# Promise.then()

Promise.prototype.then()
Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。\
前面说过，then方法可以接受两个回调函数作为参数，第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，它们都是可选的。这两个函数都接受Promise对象传出的值作为参数

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

    // 通过  promise的  then()指定成功和失败的回调函数 
    let p = new Promise((resolve, reject) => {
        console.log(111);
      });
    p.then((value) => {
          console.log("成功的回调, value:", value);
        },(reason) => {
          console.log("失败的回调, reason:", reason);
        }
      );

# Promise.resolve 方法

value:    成功的数据或  promise  对象
(value) => {}

说明:    返回一个成功/失败的  promise 对象
    let p1 = Promise.resolve(521);
//如果传入的参数为 非Promise类型的对象, 则返回的结果为成功promise对象,返回值是传入的值 
//如果传入的参数为 Promise 对象, 则参数的结果决定了 resolve 的结果
```
let p2 = Promise.resolve(new Promise((resolve, reject) => {
    // resolve('OK');
    reject('Error');
}));
// console.log(p2);
p2.catch(reason => {
    console.log(reason);
})
```

```
const p = Promise.resolve("ok");
const p2 = Promise.resolve(
new Promise((resolve, reject) => {
  resolve('success')
})
);
const p3 = Promise.resolve(
new Promise((resolve, reject) => {
  reject("error");
})
);
const p4 = Promise.resolve(Promise.resolve("oh yeah"));
console.log(p);  // PromiseState: "fulfilled" PromiseResult: "ok"
console.log(p2); // PromiseState: "fulfilled" PromiseResult: "success" 
console.log(p3); // PromiseState: "rejected" PromiseResult: "error" 
console.log(p4); // PromiseState: "fulfilled" PromiseResult: "oh yeah" 

Promise.resolve(2).then(() => {}, () => {})
//PromiseState:fulfilled  PromiseResult:undefined

Promise.resolve(2).finally(() => {})
//PromiseState:fulfilled  PromiseResult:2
```
# Promise.reject 方法

定义:返回一个新的 Promise 实例，该实例的状态为rejected。\
无论传入什么，都返回失败,返回传入的值
```
// let p = Promise.reject(521);
// let p2 = Promise.reject('iloveyou');
let p3 = Promise.reject(new Promise((resolve, reject) => {
    resolve('OK');
}));

console.log(p3);
```
```
const p = Promise.reject('error')
const p1 = Promise.reject(new Promise((resolve,reject)=>{
  resolve('ok')
}))
console.log(p) // PromiseState: "rejected" PromiseResult: "error" 
console.log(p1) // PromiseState: "rejected" PromiseResult: Promise

Promise.reject(3).then(() => {}, () => {})
//PromiseState:fulfilled  PromiseResult:undefined

Promise.reject(3).finally(() => {})  
//PromiseState:rejected  PromiseResult:3
```
# Promise.all
Promise.all 方法: (promises) => {}
(1) promises: 包含n个promise 的数组
说明:返回一个新的 promise,只有所有的 promise 都成功才成功,只要有一个失败了就直接失败

定义：如果都成功，状态成功，返回结果是所有promise的返回值组成的数组。
如果失败，状态失败，返回第一个失败promise的结果值，其他执行成功的Promise的消息都丢失了,如果失败的promise没有自己的catch方法，就会调用Promise.all()的catch方法。

```
let p1 = new Promise((resolve,reject)=>{
  resolve('ok')
})
// let p2 = Promise.resolve('success')
let p2 =Promise.reject('err')
let p3=Promise.reject('error')
// let p3 = Promise.resolve('oh yeah')
let result = Promise.all([p1,p2,p3])
console.log(result)  
//  PromiseState: "rejected" PromiseResult: 'err'
```
```
let p1 = new Promise((resolve, reject) => {
   reject("err");
});
let p2 = Promise.resolve("success");
let p3 = Promise.reject("error");
let result = Promise.all([p1, p2, p3]);
console.log(result); // PromiseState: "rejected" PromiseResult: 'err'

let p1 = new Promise((resolve, reject) => {
resolve("ok");
});
let p2 = Promise.resolve("success");
let p3 = Promise.resolve("oh yeah");
let result = Promise.all([p1, p2, p3]);
console.log(result) 
// PromiseState: "fulfilled" PromiseResult:["ok","success","oh yeah"]
```
# Promise.any()
该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；
如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

Promise.any()跟Promise.race()方法很像，只有一点不同，就是Promise.any()不会因为某个 Promise 变成rejected状态而结束，必须等到所有参数 Promise 变成rejected状态才会结束。
```
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs')
]).then((first) => {  // 只要有一个 fetch() 请求成功
  console.log(first);
}).catch((error) => { // 所有三个 fetch() 全部请求失败
  console.log(error);
});
```

# Promise.finally()

finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

    promise
    .then(result => {···})
    .catch(error => {···})
    .finally(() => {···});

上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。
finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
# Promise.allSettled()
因此，当用Promise.allSettled时，我们只需专注在then语句里，当有promise被异常打断时，我们依然能妥善处理那些已经成功了的promise，不必全部重来。
allSettled，它同样是接受一个数组，但它不会执行.catch，只会执行.then，不管成功失败等所有请求结束后，返回一个数组，数组里的每项与参数的数组每项一一对应，返回的每项包含字段：
```
const promises = [
  delay(100).then(() => 1),
  delay(200).then(() => 2),
  Promise.reject(3)
  ]

Promise.allSettled(promises).then(values=>console.log(values))
// 最终输出： 
//    [
//      {status: "fulfilled", value: 1},
//      {status: "fulfilled", value: 2},
//      {status: "rejected", value: 3},
//    ]
```

# Promise.race()
返回率先改变的 Promise 实例
如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。
```
let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('ok')
    })
})
let p2 = Promise.resolve('success')
let p3 = Promise.resolve('oh yeah')
let result = Promise.race([p1,p2,p3])
console.log(result)
// PromiseState: "fulfilled" PromiseResult: "success" 
```
# async
 和promise的返回结果规则是一样的

```
 async function main(){
    // 1. 如果返回值是一个非promise类型的数据，返回promise， PromiseState: "fulfilled" PromiseResult: '22'
    //    return 22
    // 2. 如果返回的是一个promise对象,返回的结果就是这个promise，返回的结果PromiseState: "fulfilled" PromiseResult: 'ok'
    // return new Promise((resolve, reject) => {
    //     resolve('ok')
    //     // reject('error')
    // })
    //3. 抛出异常。返回的结果就是失败的promise,返回的结果PromiseState: "rejected" PromiseResult: 'error'
   throw 'error'

}
let res = main()
console.log(res)
```
# await
1. await 必须写在  async 函数中,    但  async 函数中可以没有  await
2. 如果 await 的 promise 失败了, 就会抛出异常, 需要通过try...catch 捕获处理

```
async function main() {
let p = new Promise((resolve, reject) => {
  // resolve('ok')
  reject("error");
});

//1. 右侧为promise的情况,返回promise的结果
let res = await p; // ok
//2. 右侧为其他类型的数据
let res2 = await 20; //2
//3. 如果promise是失败的状态 报错,可以用try-catch来获取报错的结果
try {
  let res3 = await p;
} catch (error) {
  console.warn(error);
}

console.log(res3)
}
main();
```
# promise 的状态改变

    1. pending  变为  resolved
    2. pending  变为  rejected

说明:    只有这  2 种,    且一个  promise 对象只能改变一次
无论变为成功还是失败,    都会有一个结果数据
成功的结果数据一般称为  vlaue,   失败的结果数据一般称为  reason

# 改变promise状态的3种方法

1.  resolved(value) pendding \~ resolved
2.  reject(reason) pendding \~ rejected
3.  抛出异常 pendding \~ rejected

# 中断 Promise 链条唯一方法

返回一个pendding状态的promise对象

    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('OK');
        }, 1000);
    });

    p.then(value => {
        console.log(111);
        //有且只有一个方式
        return new Promise(() => {});
    }).then(value => {
        console.log(222);
    }).then(value => {
        console.log(333);
    }).catch(reason => {
        console.warn(reason);
    });

# 注意事项
```
 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 2. executor 接受两个参数，分别是 resolve 和 reject
 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 4. promise 的状态一旦确认，就不会再改变
 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 
      和 promise 失败的回调 onRejected
 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 8. promise 可以then多次，promise 的then 方法返回一个 promise
 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 11.如果 then 返回的是一个promise，那么会等这个promise执行完，promise如果成功，
   就走下一个then的成功，如果失败，就走下一个then的失败
```
# 面试题
## 题1
```
setTimeout(function () {
    console.log("1"); //8
}, 0);
async function async1() {
    console.log("2");  //1
    const data = await async2();
    console.log("3"); //5
    return data;
}
async function async2() {
    return new Promise((resolve) => {
        console.log("4"); //2
        resolve("async2的结果"); //7
    }).then((data) => {
        console.log("5"); //4
        return data;
    });
}
async1().then((data) => {
    console.log("6"); // 6
    console.log(data); // async2的结果
    console.log('9')
});
new Promise(function (resolve) {
    console.log("7"); //3
    //   resolve()
}).then(function () {
    console.log("8");
});
// 247536 async2 9 1
```
## 题2
```
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})
// 0 1 2 3 4 5 6
```
