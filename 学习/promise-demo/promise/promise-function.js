// 构造函数版本的promise

//声明构造函数
function Promise(executor) {
    this.PromiseState = 'pending'
    this.PromiseResult = null
    this.callbacks = []
    //保存实例对象的 this 的值 self _this that
    let _this = this
    //resolve 函数
    function resolve(data) {
        // 0. 判断状态再决定是否修改，只能修改一次
        // 1. 修改对象的状态（PromiseState）
        // 2. 返回对象结果值（PromiseResult）
        // 3. 如果不保存对象的this，默认this指向window
        if (_this.PromiseState !== 'pending') return
        _this.PromiseState = 'fulfilled' //resolved
        _this.PromiseResult = data
        //调用成功的回调函数
        // 加上定时器
        setTimeout(() => {
            _this.callbacks.forEach(item => {
                if (item.onResolved) {
                    item.onResolved(data)
                }
            })
        });
       
        // if(_this.callback.onResolved){
        //     _this.callback.onResolved(data)
        // }
    }
    //reject 函数
    function reject(data) {
        // 0. 判断状态再决定是否修改，只能修改一次
        // 1. 修改对象的状态（PromiseState）
        // 2. 返回对象结果值（PromiseResult）
        if (_this.PromiseState !== 'pending') return
        _this.PromiseState = 'rejected'
        _this.PromiseResult = data
        // 调用失败的回调函数
        // 加上定时器
        setTimeout(() => {
            _this.callbacks.forEach(item => {
                if (item.onRejected) {
                    item.onRejected(data)
                }
            })
        });
        // if(_this.callback.onRejected){
        //     _this.callback.onRejected(data)
        // }
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        //修改 promise 对象状态为『失败』
        reject(error)
        // throw error
    }

}

//添加 then 方法 实例对象
Promise.prototype.then = function (onResolved, onRejected) {
    const _this = this
    //  如果then里没有onRejected函数，就给个默认值
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason
        }
    }
    // 如果then里没有onResolved函数，就给个默认值
    if (typeof onResolved !== 'function') {
        onResolved = value => value
    }
    //调用回调函数  通过PromiseState 来判断调哪个函数
    //此时this指向new出来的promise实例，所以this可以访问到PromiseState
    return new Promise((resolve, reject) => {
        //获取回调函数的执行结果
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
            this.callbacks.push({
                onResolved: function () {
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

//添加 catch 方法 实例对象
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}

//添加 resolve 方法 函数对象
Promise.resolve = function (value) {
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

// 添加 reject 方法  函数对象
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        return reject(reason)
    })
}

// 添加 all 方法 函数对象
Promise.all = function (promises) {
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
                reject(r)
            })
        }
    })

}

// 添加 race 方法 函数对象
Promise.race = function (promises) {
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