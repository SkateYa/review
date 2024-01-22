***

[TOC]

***

## ES6面试题

### 1.let、const和var的区别

JS中作用域有：全局作用域、函数作用域。没有块作用域
什么是变量提升？
JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。

*   作用域：var定义的变量，作用域是整个封闭函数，可以跨块访问, 不能跨函数访问。let和const定义的变量，作用域是在块级块中；
*   变量提升：不论通过var声明的变量处于当前作用于的第几行，都会提升到作用域的最顶部。而let声明的变量不会在顶部初始化，凡是在let声明之前使用该变量都会报错
*   重复声明：let不允许在相同作用域内重复声明（报错同时使用var和let，两个let）。
*   let和const的区别：const用来专门声明一个常量，它跟let一样作用于块级作用域，没有变量提升，重复声明会报错，不同的是const声明的常量可以修改，不能直接赋值，声明时必须初始化（赋值）

### 一句话概述什么是 promise

Promise对象用于异步操作，它表示一个尚未完成且预计在未来完成的异步操作。

### promise的缺点

1.  promise一旦新建就会立即执行，无法中途取消
2.  当处于pending状态时，无法得知当前处于哪一个状态，是刚刚开始还是刚刚结束
3.  如果不设置回调函数，promise内部的错误就无法反映到外部
4.  promise封装ajax时，由于promise是异步任务，发送请求的三步会被延后到整个脚本同步代码执行完，并且将响应回调函数延迟到现有队列的最后，如果大量使用会大大降低了请求效率。

### 20.promise几种状态（3种）

promise有三种状态：pending/reslove/reject 。pending就是正在进行中，resolve可以理解为成功，reject可以理解为拒绝

resolve走的then方法 ,reject走的catch方法

1.  Promise的状态一经改变就不能再改变。
2.  .then和.catch都会返回一个新的Promise。
3.  catch不管被连接到哪里，都能捕获上层的错误。
4.  在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)。
5.  Promise 的 .then 或者 .catch 可以被调用多次, 当如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值。(见3.5)
6.  .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。(见3.6)
7.  .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。(见3.7)
8.  .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。(见3.8)
9.  .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法。(见3.9)
10. .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数。

### 有promise为什么还会出现async 和awit
