class Promise {
    //构造方法
    constructor(executor) {
        this.PromiseState = 'pending'
        this.PromiseResult = null
        // 保存promise里异步时，then里的回调函数
        this.callbacks = []
        //保存实例对象的 this 的值 self _this that
        let _this = this
        //resolve 函数
        function resolve(data) {
            // 0. 判断状态再决定是否修改，只能修改一次
            // 1. 修改对象的状态（PromiseState）
            // 2. 返回对象结果值（PromiseResult）
            // 3. 如果不保存对象的this，默认this指向window
            // 解决promise状态只能改变一次
            if (_this.PromiseState !== 'pending') return
            _this.PromiseState = 'fulfilled' //resolved
            _this.PromiseResult = data
            //调用成功的回调函数
            // 加上定时器
            setTimeout(() => {
                // 如果promise是异步的，把 then里的回调放到callbacks中，
                // 在这里执行then里的回调函数
                // 遍历callbacks里数据是为了执行多个then方法里的回调函数,在此处调用回调
                _this.callbacks.forEach(item => {
                    if (item.onResolved) {
                        item.onResolved(data)
                    }
                })
            });
            //  then里单个回调函数时
            // if(_this.callback.onResolved){
            //     _this.callback.onResolved(data)
            // }
        }
        //reject 函数
        function reject(data) {
            // 0. 判断状态再决定是否修改，只能修改一次
            // 1. 修改对象的状态（PromiseState）
            // 2. 返回对象结果值（PromiseResult）
            // 解决promise状态只能改变一次
            if (_this.PromiseState !== 'pending') return
            _this.PromiseState = 'rejected'
            _this.PromiseResult = data
            // 调用失败的回调函数
            // 加上定时器
            setTimeout(() => {
                // 如果promise是异步的，把 then里的回调放到callbacks中，
                // 在这里执行then里的回调函数
                // 遍历callbacks里数据是为了执行多个then方法里的回调函数,在此处调用回调
                _this.callbacks.forEach(item => {
                    if (item.onRejected) {
                        item.onRejected(data)
                    }
                })
            });
             //  then里单个回调函数时
            // if(_this.callback.onRejected){
            //     _this.callback.onRejected(data)
            // }
        }
        // 用来抛错的，解决promise里用throw 'err' 抛错，
        // 用try...catch能捕获到，然后也抛出错误，
        // 然后执行reject方法就能改变promise状态和返回错误信息
        try {
            executor(resolve, reject)
        } catch (error) {
            //修改 promise 对象状态为『失败』
            reject(error)
            // throw error
        }
    }

    //添加 then 方法
    then(onResolved, onRejected) {
        const _this = this
        //  如果then里没有onRejected函数，就给个默认值
        // 处理then方法里没有onResolved参数的情况
        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason
            }
        }
        // 如果then里没有onResolved函数，就给个默认值
        // 处理then方法里没有oonResolved参数的情况
        if (typeof onResolved !== 'function') {
            onResolved = value => value
        }
        //调用回调函数  通过PromiseState 来判断调哪个函数
        //此时this指向new出来的promise实例，所以this可以访问到PromiseState
        // 因为then方法的返回值是一个promise，所以这里也返回一个promise
        return new Promise((resolve, reject) => {
            //获取回调函数的执行结果
            // try...catch 用来处理then里 throw 'err'的情况，
            function callback(type) {
                try {
                    let result = type(_this.PromiseResult)
                    if (result instanceof Promise) {
                        result.then(v => {
                            resolve(result)
                        }, r => {
                            reject(result)
                        })
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }
            if (this.PromiseState === 'fulfilled') {
                // 加上定时器
                // 处理then里面的回调函数
                // 1. 如果then里回调是个promise的情况，就执行promise里方法，返回执行的结果
                // 2. 如果then里回调不是promise。就返回成功，执行resolve方法
                // then方法是异步的 ，所以要加上setTimeout
                setTimeout(() => {
                    callback(onResolved)
                });

                // //获取回调函数的执行结果
                // let result = onResolved(this.PromiseResult)
                // if (result instanceof Promise) {
                //     result.then(v => {
                //             resolve(v)
                //         },
                //         r => {
                //             reject(r)
                //         })
                // } else {
                //     resolve(result)
                // }

            }
            if (this.PromiseState === 'rejected') {
                // 加上定时器
                // 1. 如果then里回调是个promise的情况，就执行promise里方法，返回执行的结果
                // 2. 如果then里回调不是promise。就返回成功，执行resolve方法
                // then方法是异步的 ，所以要加上setTimeout
                setTimeout(() => {
                    callback(onRejected)
                });
                // try {
                //     let result = onRejected(this.PromiseResult)
                //     if (result instanceof Promise) {
                //         result.then(v => {
                //             resolve(v)
                //         }, r => {
                //             reject(v)
                //         })
                //     } else {
                //         resolve(result)
                //     }
                // } catch (error) {
                //     reject(error)
                // }

            }
            // 如果状态是pending，保存回调函数
            if (this.PromiseState === 'pending') {
                // 如果promise是异步的，把 then里的回调放到callbacks中，
                // 等到异步执行，状态改变后再执行then里的回调
                // 用数组是解决promise有多个回调，多个then方法
                this.callbacks.push({
                    onResolved: function () {
                        // 这里是为了处理promise是异步的情况，处理then回调函数的返回值
                        // 要执行then方法里的回调获取then回调的返回值然后改变then返回值的状态
                        callback(onResolved)
                        // try {
                        //     let result = onResolved(this.PromiseResult)
                        //     if (result instanceof Promise) {
                        //         result.then(v => {
                        //             resolve(result)
                        //         }, r => {
                        //             reject(result)
                        //         })
                        //     } else {
                        //         resolve(result)
                        //     }
                        // } catch (error) {
                        //     reject(error)
                        // }
                    },
                    onRejected: function () {
                          // 这里是为了处理promise是异步的情况，处理then回调函数的返回值
                        // 要执行then方法里的回调获取then回调的返回值然后改变then返回值的状态
                        callback(onRejected)
                        // try {
                        //     let result = onRejected(v)
                        //     if (result instanceof Promise) {
                        //         result.then(v => {
                        //             resolve(result)
                        //         }, r => {
                        //             reject(result)
                        //         })
                        //     } else {
                        //         resolve(result)
                        //     }
                        // } catch (error) {
                        //     reject(error)
                        // }
                    }
                })
            }
        })
    }

    //添加 catch 方法
    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    //添加 resolve 方法
    // resolve方法 如果参数是个promise就执行promise并返回结果
    // 如果不是就返回成功并把值返回
    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                resolve(value)
            }
        })
    }

    // 添加 reject 方法
    static reject(reason) {
        return new Promise((resolve, reject) => {
            return reject(reason)
        })
    }

    // 添加 all 方法
    static all() {
        //声明变量 count:成功的次数，arr:成功promise的返回值
        let count = 0
        let arr = []
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    //得知对象的状态是成功
                    //每个promise对象 都成功
                    count++
                    //将当前promise对象成功的结果 存入到数组中
                    arr[i] = v
                    //判断是不是所有的promise都是成功的
                    if (count === promises.length) {
                        //修改状态
                        resolve(arr)
                    }
                }, r => {
                    // 一个失败就都失败
                    reject(r)
                })
            }
        })
    }

    // 添加 race 方法
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    //修改返回对象的状态为 『成功』
                    resolve(v)
                }, r => {
                    //修改返回对象的状态为 『失败』
                    reject(r)
                })
            }
        })
    }
}