***

[TOC]

***

# JavaScript面试题
### Object.freeze
Object.freeze()只支持浅冻结-冻结对象的直接属性，不支持深冻结-对象的对象不支持冻结 

Object.freeze()了。它的作用是冻结一个对象，被冻结的对象有以下几个特性：
- 不能添加新属性
- 不能删除已有属性
- 不能修改已有属性的值
- 不能修改原型
- 不能修改已有属性的可枚举性、可配置性、可写性

对象中如果还有对象的时候，Object.freeze()失效了。Object.freeze()只支持浅冻结！
```javascript
var obj = {
    name: '张三',
    info: {
        a: 1,
        b: 2
    }
}
Object.freeze(obj)
obj.name = '李四'
console.log(obj)    // {info: {a: 1, b: 2},name: "张三"}
obj.info.a = 66
console.log(obj.info)   // {a: 66, b: 2}
```
**Object.freeze()原理**
- 模拟Object.freeze()原理主要用到两个关键方法，Object.definedProperty()、Object.seal()。
- Object.definedProperty()方法可以定义对象的属性的特性。如可不可以删除、可不可以修改等等
- Object.seal()方法可以让对象不能被扩展、删除属性等等。用法：Object.seal(person)。
- 通过Object.seal()方法可以实现不能删除，不能新增对象属性等等功能。通过这两个方法就可以实现一个简单的freeze方法了。

### px2rem
https://www.jb51.net/article/248086.htm
https://blog.csdn.net/weixin_50085094/article/details/129588753

前端解决移动端适配
https://blog.csdn.net/Xl4277/article/details/108973623

### let、const和var的区别
JS中作用域有：全局作用域、函数作用域。没有块作用域
什么是变量提升？
JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。

*   作用域：var定义的变量，作用域是整个封闭函数，可以跨块访问, 不能跨函数访问。let和const定义的变量，作用域是在块级块中；
*   变量提升：不论通过var声明的变量处于当前作用于的第几行，都会提升到作用域的最顶部。而let声明的变量不会在顶部初始化，凡是在let声明之前使用该变量都会报错
*   重复声明：let不允许在相同作用域内重复声明（报错同时使用var和let，两个let）。
*   let和const的区别：const用来专门声明一个常量，它跟let一样作用于块级作用域，没有变量提升，重复声明会报错，不同的是const声明的常量可以修改，不能直接赋值，声明时必须初始化（赋值）
### =和===的区别

简单来说： == 代表相同， ===代表严格相同
==  两边值类型不同的时候，要先进行类型转换，再比较
=== 不做类型转换，类型不同的一定不等。

### null和undefined的区别

1. 作者在设计js的都是先设计的null（为什么设计了null：最初设计js的时候借鉴了java的语言）,表示无的值最好不要是对象，基本类型是最好的
2. null会被隐式转换成0，很不容易发现错误。
3. 先有null后有undefined，出来undefined是为了填补之前的坑。

具体区别：JavaScript的最初版本是这样区分的：null是一个表示"无"的对象（空对象指针），转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。

### 浏览器立即更新
浏览器渲染是一个队列机制的，比如js改变浏览器样式1千次，但是浏览器会吧1千次作为一个队列，最终进行一个异步更新，更新的时候只改变最后一次样式更新，如何打破浏览器队列机制，让浏览器立即更新，位置信息（offsetLeft，clientY等），当获取这些属性时，浏览器立即更新

### 下载
```
<button id="btn" @click="download">下载</button>
<script>
  let btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    let text = "测试文字";
    let str = new Blob([text], { type: "text/plain" });
    let fileUrl = URL.createObjectURL(str);
    let a = document.createElement("a");
    a.href = fileUrl;
    a.download = "z.txt";
    a.click();
    // 释放createObject创建的URL对象
    URL.revokeObjectURL()
  });
</script>
```
### 变量提升
说明：函数提升优先级高于变量提升，且不会被同名变量声明时覆盖，但是会被同名变量赋值后覆盖
### 如何中止 forEach 执行
虽然 JavaScript 中的 forEach 方法提供了一种简单的数组迭代方法，但它缺乏中断或停止中循环的灵活性。
forEach() 没有提供任何内置的方法来提前终止循环。也就是说，你不能直接从中断 forEach() 的执行。一旦开始，它就会遍历整个数组。

虽然不建议这么使用，但从技术上讲，可以通过抛出异常来停止 forEach 循环。 这种方法虽然是非正统的，并且由于影响代码可读性和错误处理而通常建议不要这样做，但它可以有效地停止循环。

幸运的是，像 for...of 循环这样的替代方法，以及像 some() 和 every() 这样的方法，可以替代 forEach。与 forEach 相比，它的主要优势在于它与 Break 和 continue 等控制语句的兼容性，为循环控制提供了更大的灵活性。
### h5拖拽 
```
目标元素设置 draggable="true" 才能被拖动
         
  在拖动目标上触发事件 (源元素)(被拖动的源对象可以触发的事件):
      ondragstart - 拖拽开始时触发
      ondrag - 正在拖动时触发(源对象被拖动过程中)
      ondragend - 拖动结束后触发
释放目标时触发的事件(拖动源对象可以进入到上方的目标对象可以触发的事件):
拖拽时鼠标经过的元素
    ondragenter - 拖动的元素进入目标区域内时触发（触发一次）
    ondragover - 拖动的元素在目标区域内移动或停留在目标区域上时触发（触发多次）
    ondragleave -  拖动的元素离开目标区域时触发
    ondrop - 拖动的元素在目标区域被放下(松开鼠标)时触发
浏览器默认不允许其他元素拖拽到当前元素上面的，在ondragover中清除默认事件  ev.preventDefault(); 
```
### 对象的解构赋值可以取到继承的属性。
```
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
foo // "bar"
```
### 默认值生效的条件是，对象的属性值严格等于undefined。
```
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```
### Object.setPrototypeOf()
Object.setPrototypeOf()，为现有对象设置原型，返回一个新对象
接收两个参数：第一个是现有对象，第二是原型对象。
```
const obj = {};
const parent = { foo: 'bar' };

console.log(obj.foo);  // undefined

Object.setPrototypeOf(obj, parent);

console.log(obj.foo);  // "bar"
```
###  new.target
 new.target属性允许你检测函数或构造方法是否是通过new运算符被调用的。
在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。在普通的函数调用中，
new.target 的值是undefined。我们可以使用它来检测，一个函数是否是作为构造函数通过new被调用的。
### 图片懒加载是怎么实现的？
就是我们先设置图片的 data-set 属性（当然也可以是其他任意的，只要不会发送 http 请求就行了，作用 就是为了存取值）值为其图片路径，由于不是 src，所以不会发送 http 请求。
然后我们计算出页面 scrollTop 的高度和浏览器的高度之和， 如果图片距离页面顶端的坐标 Y（相对于整个页面，而不是浏览 器窗口）小于前两者之和，就说明图片就要显示出来了（合适的时机，当然也可以是其他情况），
这时 候我们再将 data-set 属性替换为 src 属性即可。



### js 的执行机制是怎么样的？
js 是一个单线程、异步、非阻塞 I/O 模型、 event loop 事件循环的执行机制
所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。
同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。异步 任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程， 某个异步任务可以执行了，该任务才会进入主线程执行。

### 什么是递归，递归有哪些优点或缺点？
递归： 如果一个函数在内部可以调用其本身，那么这个函数就是递归函数。简单理解:函 数内部自己调用自己, 这个函数就是递归函数
优点： 结构清晰、可读性强
缺点： 效率低、调用栈可能会溢出，其实每一次函数调用会在内存栈中分配空间，而每个进程的栈的容 量是有限的，当调用的层次太多时，就会超出栈的容量，从而导致栈溢出。->性能

### this 的指向有哪些？
1、普通函数中的 this 指向 window
2、定时器中的 this 指向 window
3、箭头函数没有 this,它的 this 指向取决于外部环境、
4、事件中的 this 指向事件的调用者
5、 构造函数中 this 和原型对象中的 this,都是指向构造函数 new 出来实例对象
6、类 class 中的 this 指向由 constructor 构造器 new 出来的实例对象
7、自调用函数中的 this 指向 window

### Math常见的方法
```
Math.abs(x): 求绝对值
Math.ceil(x): 向上取整（进一法）无论是正数还是负数，都取最大的值
Math.floor(x): 向下取整(直接取整) 无论是正数还是负数，都取最小的值
Math.max(x1, x2, ..., xn): 返回最大值。
Math.min(x1, x2, ..., xn): 返回最小值。
Math.pow(x, y): 返回x的y次方。
Math.round(x): 四舍五入取整
Math.sqrt(x): x开平方
Math.random() 获取0~1之间的随机数（大于等于0，不等于1）
```
```
Math.abs(-1)  // 1
Math.ceil(1.2) // 2
Math.ceil(-1.6)  // -1
Math.floor(1.8)  // 1
Math.floor(-1.1) // -2
Math.round(1.4)  // 1
Math.round(1.5) // 2
Math.round(-1.5)  // -1
Math.round(-1.51)  // -2
Math.sqrt(9)     // 3
Math.pow(3,2)   // 9
```
### instanceof和typeof的区别
相同点：

1.两者都是数据类型检测的方式

区别：

1. 返回的值不同

typeof返回的结果是字符串，返回值有number、string、boolean、function、undefined、object六个；能判断除null以外的基本类型
```
console.log(typeof "Hello");  // "string"  
console.log(typeof 42);        // "number"  
console.log(typeof true);      // "boolean"  
console.log(typeof undefined); // "undefined"  
console.log(typeof {name: "John"}); // "object"  
console.log(typeof []);        // "object"  
console.log(typeof function() {}); // "function"
```
instanceof 返回的是布尔值，true或false；
```
[] instanceof Object  // true
[] instanceof Array  // true

var obj = {}
obj instanceof Object   // true
obj instanceof Array  // false
```
2. 判断的类型不同
typeof可以判断所有变量的类型。而对于丰富的对象实例，只能返回object(除function外)，不能得到真实的数据类型。

instanceof 只能用来判断对象。可以对不同的实例对象进行判断，判断方法是根据对象的原型链依次向下查找，找到了，值为true，否则为false

### js冻结对象

```javascript
<!--不能改，能增加和删除-->
const object1 = {};
Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});
object1.property1 = 77;
console.log(object1.property1); //42

<!--不能增，改，删-->
var obj = {
   a:'a',
   b:'b'  
}
Object.freeze(obj)

obj.a = 'c'
console.log(obj.a) 
```

### js冒泡排序

    let arr = [4, 2, 1, 9, 6, 3];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j + 1] < arr[j]) {
            let temp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = temp;
          }
        }
      }
      // [1, 2, 3, 4, 6, 9]
      console.log(arr);

### js面向对象及面向对象的三大特性

<https://www.cnblogs.com/zhengyufeng/p/10992972.html>
三大特征的优点：

封装：封装的优势在于定义只可以在类内部进行对属性的操作，外部无法对这些属性指手画脚，要想修改，也只能通过你定义的封装方法；

继承：继承减少了代码的冗余，省略了很多重复代码，开发者可以从父类底层定义所有子类必须有的属性和方法，以达到耦合的目的；

多态：多态实现了方法的个性化，不同的子类根据具体状况可以实现不同的方法，光有父类定义的方法不够灵活，遇见特殊状况就捉襟见肘了js面向对象及面向对象的三大特性

### 将扁平化数据转换成tree结构

    let jsonData = [
        { id: 1, parentId: 0, name: "一级菜单A" },
        { id: 2, parentId: 0, name: "一级菜单B" },
        { id: 3, parentId: 0, name: "一级菜单C" },
        { id: 4, parentId: 1, name: "二级菜单A-A" },
        { id: 5, parentId: 1, name: "二级菜单A-B" },
        { id: 6, parentId: 2, name: "二级菜单B-A" },
        { id: 7, parentId: 4, name: "三级菜单A-A-A" },
        { id: 8, parentId: 7, name: "四级菜单A-A-A-A" },
        { id: 9, parentId: 8, name: "五级菜单A-A-A-A-A" },
      ];
      
      // 通过2次filter遍历来通过 parent.id === child.parentId 来获取元素的子集
      function formatTree(obj) {
        let copyObj = JSON.parse(JSON.stringify(obj)); //深拷贝源数据
        return copyObj.filter((parent) => {
          let findChildren = copyObj.filter((child) => {
            return parent.id === child.parentId;
          });
          findChildren.length > 0
            ? (parent.children = findChildren)
            : (parent.children = []);
          // 如果是第一层，则返回true，其他层则返回false，数据过滤掉
          return parent.parentId == 0;
        });
      }
    
      console.log(formatTree(jsonData));
      console.log(JSON.stringify(formatTree(jsonData), null, 3));

### 前端框架与库的区别？

库：库是更多是一个封装好的特定的集合，提供给开发者使用，而且是特定于某一方面的集合（方法和函数），库没有控制权，控制权在使用者手中，在库中查询需要的功能在自己的应用中使用，我们可以从封装的角度理解库；而jQuery、react、underscore就是库，react和react-router, react-redux结合起来才叫框架，本身只是充当一个前端渲染的库而已

框架：框架顾名思义就是一套架构，会基于自身的特点向用户提供一套相当于叫完整的解决方案，而且控制权的在框架本身，使用者要找框架所规定的某种规范进行开发。像angular、backbone、vue就属于框架，

框架就是提供了前端项目整体解决方案。库就是自己组合来实现项目。

Library
库，本质上是一些函数的集合。每次调用函数，实现一个特定的功能，接着把控制权交给使用者
代表：jQuery
jQuery这个库的核心：DOM操作，即：封装DOM操作，简化DOM操作

Framework
框架，是一套完整的解决方案，使用框架的时候，需要把你的代码放到框架合适的地方，框架会在合适的时机调用你的代码
框架规定了自己的编程方式，是一套完整的解决方案
使用框架的时候，由框架控制一切，我们只需要按照规则写代码

主要区别

1.  You call Library, Framework calls you(你调用库，框架调用你)
2.  核心点：谁起到主导作用（控制反转）
3.  框架中控制整个流程的是框架
4.  使用库，由开发人员决定如何调用库中提供的方法（辅助）
5.  好莱坞原则：Don't call us, we'll call you.
6.  框架的侵入性很高（从头到尾）

### 基本类型

简单数据类型 （原始类型,栈存储）7种： String、Number、Boolean、Null、Undefined、Symbol,bigint
复杂数据类型（对象类型,堆存储）一种： Object

### new操作符做了哪些事情

其实你只要说，创建一个新对象，然后改变this指向，然后给创建属性给新对象，最后返回这个对象

1.  新建了一个object对象
2.  修改构造函数this的指向，使其指向新建的object对象，并且执行构造函数
3.  为object对象添加一个proto属性，使其指向构造函数的prototype属性
4.  将这个object对象返回出去

    function Fun(age, name) {
    this.age = age;
    this.name = name;
    return 11;
    }

    // 第一种方法
    function create(fn, ...args) {
    //1.创建了一个空的对象
    const obj = {}; //var obj = Object.create({})
    //2.将空对象的原型，指向于构造函数的原型
    //等价于 obj.**proto** = fn.prototype
    Object.setPrototypeOf(obj, fn.prototype);
    //3.将空对象作为构造函数的上下文(改变this指向)
    const result = fn.apply(obj, args);
    //4.对构造函数有返回值的处理判断,如果返回的是基本类型不影响结果，如果是引用类型，修改结果
    return result instanceof Object ? result : obj;
    }

    // 第二种方法
    function myNew(fn, ...args) {
    // Object.create(fn.prototype)创建了一个空的实例，该实例的原型\_\_proto\_\_指向fn.prototype。
    const obj = Object.create(fn.prototype);
    //3.将空对象作为构造函数的上下文(改变this指向)
    const result = fn.apply(obj, args);
    //4.对构造函数有返回值的处理判断,如果返回的是基本类型不影响结果，如果是引用类型，修改结果
    return result instanceof Object ? result : obj;
    }

    console.log(create(Fun, 18, "张三")); // Fun {age: 18, name: '张三'}
    console.log(new Fun(18, "张三")); // Fun {age: 18, name: '张三'}
    console.log(myNew(Fun, 18, "张三")); // Fun {age: 18, name: '张三'}
    var obj1 = create(Fun, 18, "张三");
    var obj2 = new Fun(18, "张三");
    var obj3 = myNew(Fun, 18, "张三");
    console.log(obj2.**proto** === Fun.prototype); // true
    console.log(obj1.**proto** === Fun.prototype); // true
    console.log(obj3.**proto** === Fun.prototype); // true

### Js内置对象

*   构造器对象\:String,Number,Boolean,Array,Object, Function,RegExp,Date,Error
*   其他对象\:Math,Json,全局对象

### 判断数据类型的方法

1.  typeof
2.  instanceof
3.  Object.prototype.toString()      Object.prototype.toString.call(null);
4.  contructor

### 怎么判断null是什么数据类型

Object.prototype.toString.call(null);
"\[object Null]"

### setTimeout

    for(var i=1;i<=3;i++){
      setTimeout(function(){
          console.log(i);    
      },0);  
    };
    
    答案：4 4 4。
    
    原因：回调函数是在for结束之后才运行的。追问，如何让上述代码输出1 2 3？
    for(var i=1;i<=3;i++){
       setTimeout((function(i){  //改成立即执行函数
    console.log(i);    
       })(i),0);  
    };

### 合并数组

1.  concat 方法
2.  for循环
3.  apply
4.  set

### 前端动画

<https://www.cnblogs.com/zhaowy/p/8817944.html>

### 造成内存泄漏的方法

1.  全局变量引起
2.  闭包
3.  dom清空，事件没有清除
4.  子元素存在引用
5.  被遗忘的计时器

### 合并对象

    浅拷贝
    $.extend()
    for...in
    Object.assign()
    深拷贝
    $.extend(true,obj1, obj2);

### 浏览器的缓存，

<https://www.jianshu.com/p/54cc04190252>

1.  强缓存：不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且Size显示from disk cache或from memory cache。强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。
2.  协商缓存：就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，

### Cookie、LocalStorage 和SessionStorage 之间的区别

作用域的不同
这三者都遵循协议，即同协议，同域名，同端口下才能访问和修改同一份数据，唯一不同的就是 SeesionStorage 还要求在同一窗口。

生命周期的不同
Cookie 可以手动设置过期时间，默认就是本次会话时长，随着窗口关闭而删除，当设置了过期时间时候，就会被储存到硬盘中直到过期时间才被删除
LocalStorage 是持久化的本地储存，除非你手动删除，否则会一直存在
SessionStorage 是会话级别的存储，也是随着窗口关闭而删除。



与服务器交互：

- cookie 是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）
- cookie 始终会在同源 http 请求头中携带（即使不需要），在浏览器和服务器间来回传递
- sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存

存储大小：

cookie 数据根据不同浏览器限制，大小一般不能超过 4k

sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大

有期时间：

- localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
- sessionStorage 数据在当前浏览器窗口关闭后自动删除
- cookie 设置的 cookie 过期时间之前一直有效，与浏览器是否关闭无关

### JS的forEach和map方法的区别

foreEach()方法:
针对每一个元素执行提供的函数。

map()方法:
创建一个新的数组，其中每一个元素由调用数组中的每一个元素执行提供的函数得来。

1.  forEach()返回值是undefined，不可以链式调用。
2.  map()返回一个新数组，原数组不会改变。

### js常用的迭代方法

1.  forEach
2.  map
3.  filter
4.  every();
5.  some();

### JSON 对象key排序

思路

1.  使用Object.key()获取所有的keys
2.  利用Array.sort()函数对keys排序
3.  创建一个新的对象，循环遍历排序后的keys，重新添加

    var contacts={"c":3,"d":4,"a":1,"b":2}
    var keys = Object.keys(contacts).sort();
    console.log(keys);
    var newObj = {}
    for (var i = 0; i < keys.length; i++) {
    var index = keys\[i];
    newObj\[index] = contacts\[index];
    }
    console.dir(newObj);

### 前端构建工具

主要有三种：Grunt、Gulp、Webpack

### 8.IE6双边距问题:在 IE6中设置了float , 同时又设置margin , 就会出现边距问题

解决方案：设置display\:inline;

9.当标签的高度设置小于10px，在IE6、IE7中会超出自己设置的高度
解决方案：超出高度的标签设置overflow\:hidden,或者设置line-height的值小于你的设置高度

10.图片默认有间距
解决方案：使用float 为img 布局

11.IE9一下浏览器不能使用opacity
解决方案：
opacity: 0.5;filter: alpha(opacity = 50);filter: progid\:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);

12.边距重叠问题；当相邻两个元素都设置了margin 边距时，margin 将取最大值，舍弃最小值；
解决方案：为了不让边重叠，可以给子元素增加一个父级元素，并设置父级元素为overflow\:hidden；

13.cursor\:hand 显示手型在safari 上不支持
解决方案：统一使用 cursor\:pointer

14.两个块级元素，父元素设置了overflow\:auto；子元素设置了position\:relative ;且高度大于父元素，在IE6、IE7会被隐藏而不是溢出；
解决方案：父级元素设置position\:relative

### 1.如何让对象属性完全只读不可以被修改

*   Object.freeze(),

    const obj = {a:3};
    Object.freeze(obj);
    obj.a = 5;
    console.log(obj); // {a: 3}

*   Object.defineProperty()

    const object1 = {};
    Object.defineProperty(object1, 'property1', {
    value: 42,
    writable: false
    });
    object1.property1 = 77;
    console.log(object1.property1); // {property1: 42}

### 事件流

DOM标准规定事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

事件捕获阶段：实际目标（<div>）在捕获阶段不会接收事件。也就是在捕获阶段，事件从document到<html>再到\<body>就停止了。上图中为1\~3.
处于目标阶段：事件在<div>上发生并处理。但是事件处理会被看成是冒泡阶段的一部分。
冒泡阶段：事件又传播回文档。
在冒泡型事件流中click事件传播顺序为<div>—》\<body>—》<html>—》document

在捕获型事件流中click事件传播顺序为document—》<html>—》\<body>—》<div>
并非所有的事件都会经过冒泡阶段 。所有的事件都要经过捕获阶段和处于目标阶段，但是有些事件会跳过冒泡阶段：如，获得输入焦点的focus事件和失去输入焦点的blur事件。

两次机会在目标对象上面操作事件例子

### css权重

1.  important的权重无穷
2.  内联样式为1,0,0,0
3.  ID的权重为0,1,0,0
4.  类的权重为0,0,1,0
5.  伪类的权重为0,0,1,0
6.  属性的权重为0,0,1,0
7.  标签的权重为0,0,0,1
8.  伪对象的权重为0,0,0,1
9.  通配符的权重为0,0,0,0
10. 继承（继承权重最小）

### js遍历对象的方法

    1.  for...in
    
    const obj = {
                id:1,
                name:'zhangsan',
                age:18}
    
     for(let key  in obj){
            console.log(key + '---' + obj[key])
      }


​      
​     2. Object.keys(obj)
​        Object.values(obj)

### JavaScript中new实现原理

1.  创建一个空对象 obj
2.  将该对象 obj 的原型链 **proto** 指向构造函数的原型 prototype，
    并且在原型链 **proto** 上设置 构造函数 constructor 为要实例化的 Fn
3.  传入参数，并让 构造函数 Fn 改变指向到 obj，并执行
4.  最后返回 obj

    function New(Fn) {
    let obj = {}
    let arg = Array.prototype.slice.call(arguments, 1)
    obj.**proto** = Fn.prototype
    obj.**proto**.constructor = Fn
    Fn.apply(obj, arg)
    return obj
    }

### 为什么要语义化？

1.  代码结构: 使页面没有css的情况下，也能够呈现出很好的内容结构
2.  有利于SEO: 爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息
3.  提升用户体验： 例如title、alt可以用于解释名称或者解释图片信息，以及label标签的灵活运用。
4.  便于团队开发和维护: 语义化使得代码更具有可读性，让其他开发人员更加理解你的html结构，减少差异化。
5.  方便其他设备解析: 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页。

### 原型链工作原理

一句话解释就是：原型链查找就是通过 proto 查找，查找至值为 null （也就是 Object.prototype）时结束，通过几个具体的例子来说明一下：

### 判断一个字符串出现最多次数的字符，并统计这个次数

第一种方法

    var s = 'aaabbbcccaaabbbaaabbbbbbbbbb';
        var a = s.split('');
        a.sort();
        s = a.join('');
        var pattern = /(\w)\1*/g;
        var ans = s.match(pattern);   
        ans.sort(function(a, b) {
            return b.length - a.length;
         });
        console.log(ans);
        console.log(ans[0][0] + ': ' + ans[0].length);

第二种方法

    var str = 'qweqrtyuiqqqwrtyudfgerqtywer';
        var result = maxN(str);
        function maxN(str) {
            //定义一个json对象用于保存str的每一项以及出现次数。
            var json = {};
            //遍历str,循环其中的每一个字符，将某个字符的值及出现的个数拿出来作为json的key和value
            for(var i=0;i<str.length;i++){
                //判断json中是否有当前str的值
                if(!json[str.charAt(i)]){
                    //如果不存在 就将当前值添加到json中去，并设置1
                    json[str.charAt(i)] = 1;
                } else {
                    //如果存在的话就让数组中已有的当前值的value值++；
                    json[str.charAt(i)] ++;
                }
            }
            //存储出现次数最多的值和次数
            var number = '';
            var num = 0;
            //遍历json  使用打擂算法统计需要的值
            for(var j in json){
                //如果当前项大于下一项
                if (json[j]>num) {
                    //就让当前值更改为出现最多次数的值
                    num = json[j];
                    number = j;
                }
            }
            return {
                number:number,
                num:num
            }
        }
        document.write('该字符串出现'+ result.num+'次的'+ result.number);

### 对象去重

    const data = {col: 4,col1: 5,col2: 6,col3: 4,col5: 5}
    const ChangeObj = (data) => {
      const newobj = {}
      Object.keys( data ).map( ( item ) => {
        if ( !Object.values( newobj ).includes( data[ item ] ) ) {
          newobj[ item ] = data[ item ]
        }
      } )
      return newobj
    }
    
    console.log( ChangeObj( data ) )

### 字符串去重

    第一种方法
    const str = 'asdfasd';
    var zz=[...new Set(str)].join("");

第二种方法

    function removeRepeatStr(str){
        var newStr = '';
        var len = str.length;
        for(var i=0; i<len; i++){
            if(newStr.indexOf(str[i])==-1){
               newStr = newStr + str[i];
            }
        }
        return newStr;
    }



### js事件循环机制

JavaScript 事件循环机制分为浏览器和 Node事件循环机制，两者的实现技术不一样，浏览器 Event Loop 是 HTML 中定义的规范，Node Event Loop 是由 libuv 库实现。这里主要讲的是浏览器部分。
JS 调用栈

JS 调用栈是一种后进先出的数据结构。当函数被调用时，会被添加到栈中的顶部，执行完成之后就从栈顶部移出该函数，直到栈内被清空。

同步任务、异步任务\
JavaScript 单线程中的任务分为同步任务和异步任务。同步任务会在调用栈中按照顺序排队等待主线程执行，异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。任务队列是先进先出的数据结构。

Event Loop\
调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作，就形成了事件循环\
①先顺序从上向下执行当前全局上下文\
②遇到异步事件就将其交给对应的浏览器模块\
③浏览器的模块处理完之后，宏任务放入宏任务队列，微任务放入微任务队列\
④当函数调用栈清空，开始执行任务队列，先执行微任务队列，执行完微任务队列再执行宏任务队列\
⑤当执行任务队列时，可以认为重新开了一个空的宏任务队列和一个空的微任务队列，将新产生的异步任务最终放入新的任务队列，当前任务队列执行完成后，当前宏队列和微队列就清除，然后再去执行新的微任务队列，执行新的宏任务队列，新开微队列，新开宏队列。。。。一直循环下去，直到任务队列全部为空。

宏任务(macro-task)、微任务(micro-task)\
除了广义的同步任务和异步任务，JavaScript单线程中的任务可以细分为宏任务和微任务\
宏任务：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。\
微任务：process.nextTick, Promises, Object.observe, MutationObserver。

### js继承有哪些实现的方式

<https://www.cnblogs.com/ranyonsue/p/11201730.html>

1.  以原型链的方式实现继承
2.  借用构造函数
3.  组合继承
4.  原型式继承
5.  寄生式继承
6.  寄生式组合继承

### js封装,继承,多态

一、封装性
封装就是把抽象出来的数据和对数据的操作封装在一起，数据被保护在内部，程序的其它部分只有通过被授权的操作(成员方法)，才能对数据进行操作。\
PS：JS封装只有两种状态，一种是公开的，一种是私有的。\
通过构造函数添加成员方法和通过原型法添加成员方法的区别\
1、通过原型法分配的函数是所有对象共享的.\
2、通过原型法分配的属性是独立.(如果你不修改属性，他们是共享)\
3、建议，如果我们希望所有的对象使用同一一个函数，最好使用原型法添加函数，这样比较节省内存.\
二、继承性\
继承可以解决代码复用，让编程更加靠近人类思维。当多个类存在相同的属性(变量)和方法时，可以从这些类中抽象出父类，在父类中定义这些相同的属性和方法，所有的子类不需要重新定义这些属性和方法，只需要通过继承父类中的属性和方法。\
JS中实现继承的方式\
三、多态性\
JS的函数重载\
这个是多态的基础，在之前的Javascript入门已经说过了，JS函数不支持多态，但是事实上JS函数是无态的，支持任意长度，类型的参数列表。如果同时定义了多个同名函数，则以最后一个函数为准。\
多态是指一个引用(类型)在不同情况下的多种状态。也可以理解成：多态是指通过指向父类的引用，来调用在不同子类中实现的方法。

### js中的事件委托(事件代理)详解

事件委托：利用事件冒泡的特性，将本应该注册在子元素上的处理事件注册在父元素上，这样点击子元素时发现其本身没有相应事件就到父元素上寻找作出相应。这样做的优势有：\
1.减少DOM操作，提高性能。\
2.随时可以添加子元素，添加的子元素会自动有相应的处理事件\
适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。\
一般来说，dom需要有事件处理程序，我们都会直接给它设事件处理程序就好了，那如果是很多的dom需要添加事件处理呢？比如我们有100个li，每个li都有相同的click点击事件，可能我们会用for循环的方法，来遍历所有的li，然后给它们添加事件，那这么做会对性能产生影响.

### 事件流(冒泡和捕获)

冒泡型事件流：事件的传播是从最特定的事件目标到最不特定的事件目标。即从DOM树的叶子到根。【推荐】\
捕获型事件流：事件的传播是从最不特定的事件目标到最特定的事件目标。即从DOM树的根到叶子。

### flex布局

<http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html>\
优点在于其容易上手，根据flex规则很容易达到某个布局效果。\
缺点是：浏览器兼容性比较差，只能兼容到ie9及以上。

### 怎么实现屏幕自适应，页面自适应

1.  CSS3 媒体查询
2.  Flex布局
3.  bootstrap(栅格系统)

### 原型和原型链

原型的概念：每一个javascript对象(除null外)创建的时候，就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型中“继承”属性。
2\. 何为原型链
在js里，\_\_proto\_\_是每个对象都有的属性，当js引擎查找该对象某一个属性时，会先查找该对象本身有没有该属性，如果不存在， 就会在其\_\_proto\_\_属性上面寻找，如果仍然没有，\_\_proto\_\_属性仍是一个对象，仍然有其\_\_proto\_\_属性，以此类推， 这一条用\_\_proto\_\_连起来的线就叫做原型链

举例说明\:person → Person → Object ，普通人继承人类，人类继承对象类

### 同步和异步的区别

同步：所有的操作都做完，才返回给用户。这样用户在线等待的时间太长，给用户一种卡死了的感觉（就是系统迁移中，点击了迁移，界面就不动了，但是程序还在执行，卡死了的感觉）。这种情况下，用户不能关闭界面，如果关闭了，即迁移程序就中断了。
异步：将用户请求放入消息队列，并反馈给用户，系统迁移程序已经启动，你可以关闭浏览器了。然后程序再慢慢地去写入数据库去。这就是异步。但是用户没有卡死的感觉，会告诉你，你的请求系统已经响应了。你可以关闭界面了。\
同步和异步本身是相对的\
同步就相当于是 当客户端发送请求给服务端，在等待服务端响应的请求时，客户端不做其他的事情。当服务端做完了才返回到客户端。这样的话客户端需要一直等待。用户使用起来会有不友好。\
异步就是，当客户端发送给服务端请求时，在等待服务端响应的时候，客户端可以做其他的事情，这样节约了时间，提高了效率。\
存在就有其道理 异步虽然好,但是有些问题是要用同步用来解决，比如有些东西我们需要的是拿到返回的数据在进行操作的。这些是异步所无法解决的。

### 浮动和绝对定位有什么区别

先看看w3c关于浮动float和绝对定位absolute的讲解：\
float：浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。\
absolute：设置为绝对定位的元素框从文档流完全删除，并相对于其包含块定位，包含块可能是文档中的另一个元素或者是初始包含块。元素原先在正常文档流中所占的空间会关闭，就好像该元素原来不存在一样。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。

对于浮动float来说，它仅仅是浮动框脱离标准流，并不是去安全的脱离标准流，而绝对定位absolute是将元素框完全的脱离标准流从文档流中删除：\
绝对定位会有覆盖出现，而浮动这是包围在浮动元素的周围（没有覆盖）,文档流中的其他元素将忽略该元素并填补他原先的空间。它只是改变了文档流的显示，而没有脱离文档流\
一个元素浮动或绝对定位后，它将自动转换为块级元素，而不论该元素本身是什么类型。

### h5新特性

1.  标签：header、footer、section、nav、aside、article
2.  增强型表单：input 的多个 type
3.  新增表单元素：datalist、keygen、output
    4.新增表单属性：placehoder、required、min 和 max
4.  音频视频：audio、video
5.  canvas
6.  地理定位
7.  拖拽
8.  本地存储：localStorage - 没有时间限制的数据存储；sessionStorage - 针对一个 session 的数据存储，当用户关闭浏览器窗口后，数据会被删除
9.  新事件：onresize、ondrag、onscroll、onmousewheel、onerror、onplay、onpause
10. WebSocket：单个 TCP 连接上进行全双工通讯的协议

### css3新特性

1.  选择器
2.  文本
3.  边框
4.  背景
5.  渐变
6.  多列布局
7.  过渡
8.  动画,旋转
9.  flex布局
10. @media媒体查询

### 异步

1.  回调函数
2.  事件监听
3.  setTimeout()、setInterval()
4.  发布/订阅
5.  promise
6.  generator（ES6）
7.  async/await(ES7)

### settimeout和setinterval区别

setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。\
setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。\
setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。\
setTimeout() 只执行 code 一次。如果要多次调用，请使用 setInterval() 或者让 code 自身再次调用 setTimeout()。\
setTimeout用于延迟执行某方法或功能\
setInterval则一般用于刷新表单，对于一些表单的假实时指定时间刷新同步

### 去除数组中所有2的一种方法

    const arr=[1,2,3,1,21,25];
    let newArray=arr.filter(item=>item!=2);

### 4.如何实现一个类，如何实例化这个类

    function Node(Id) {
          this.Id=Id;
      }
    const k=new Node(1)

### 29.vuex存储和本地存储(localstorage、sessionstorage)的区别

1.区别：vuex存储在内存，localstorage（本地存储）则以文件的方式存储在本地(硬盘),永久保存；sessionstorage( 会话存储 ) ,临时保存。localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理
2.应用场景：vuex用于组件之间的传值，localstorage，sessionstorage则主要用于不同页面之间的传值。
3.永久性：当刷新页面（这里的刷新页面指的是 --> F5刷新,属于清除内存了）时vuex存储的值会丢失，sessionstorage页面关闭后就清除掉了，localstorage不会。\
注：很多同学觉得用localstorage可以代替vuex, 对于不变的数据确实可以，但是当两个组件共用一个数据源（对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，localstorage，sessionstorage无法做到，原因就是区别1。

### 类数组转化为数组

类数组是具有length属性，但不具有数组原型上的方法。常见的类数组有arguments、DOM操作方法返回的结果。

```
方法一：Array.from
Array.from(document.querySelectorAll('div'))


方法二：Array.prototype.slice.call()
Array.prototype.slice.call(document.querySelectorAll('div'))

方法三：扩展运算符
[...document.querySelectorAll('div')]


方法四：利用concat
Array.prototype.concat.apply([], document.querySelectorAll('div'));


```

### 23.undefind和null的区别

    1.类型不一样：
    console.log(typeOf undefined);//undefined
    console.log(typeOf null);//object
    2.转化为值时不一样：undefined为NaN ,null为0
    console.log(Number(undefined));//NaN
    console.log(Number(null));//0
    3.undefined===null;//false
    undefined==null;//true
    null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。
    （1）变量被声明了，但没有赋值时，就等于undefined。
    （2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。
    （3）对象没有赋值的属性，该属性的值为undefined。
    （4）函数没有返回值时，默认返回undefined。

### 模块化开发

将一个项目按照功能划分，理论上一个功能一个模块，互不影响，在需要的时候载入，尽量遵循高内聚低耦合
模块化开发的好处：
1.使用模块化开发能解决文件之间的依赖关系。
2.使用模块化开发可以避免命名的冲突。
3.使用模块化开发能进行代码的复用。

### 24.mvc和mvvm的区别是什么？原理？

MVVM与MVC最大的区别就是：它实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变。
vue是实现了双向数据绑定的mvvm框架，当视图改变更新模型层，当模型层改变更新视图层。在vue中，使用了双向绑定技术，就是View的变化能实时让Model发生变化，而Model的变化也能实时更新到View。

### 响应式布局的思路

1.  固定内容区宽度
2.  等比例缩放（rem）
3.  最精准的方案（媒体查询，@media）
4.  栅格系统（主流方案）

### 7.浏览器兼容性问题

常见的浏览器内核可以分四种：Trident、Gecko、Blink、Webkit\
IE浏览器：Trident内核，也称为IE内核\
Chrome浏览器：Webkit内核，现在是Blink内核\
Firefox浏览器：Gecko内核，俗称Firefox内核\
Safari浏览器：Webkit内核\
Opera浏览器：最初是自己的Presto内核，后来加入谷歌大军，从Webkit又到了Blink内核\
360浏览器：IE+Chrome双内核\
猎豹浏览器：IE+Chrome双内核\
百度浏览器：IE内核\
QQ浏览器：Trident（兼容模式）+Webkit（高速模式）\
<https://www.jianshu.com/p/6afd596440bb>

### 数组排序

    对数组进行升序排序  sort 的参数
    var points = [40, 100, 1, 5, 25, 10];
    points.sort(function(a, b){return a - b});
    
    对数组进行降序排序  sort 的参数
    var points = [40, 100, 1, 5, 25, 10];
    points.sort(function(a, b){return b - a}); 

### 数组去重

<https://segmentfault.com/a/1190000016418021?utm_source=tag-newest>

```
//空值为undefind
// 去除数组的重复成员
[...new Set(array)]


//空值为undefind
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]

1.from && set

 let arr = [1, 1, 4, 50, 50, 6, 2, 2]
 let res = Array.from(new Set(arr))
 console.log(res)
 
2.filter && indexOf

 let arr = [2, 2, 33, 44, 33]
 let res = arr.filter((item, index, arr) => {
    return arr.indexOf(item) == index
 })
 console.log(res)

3.forEach && includes

 let arr = [2, 2, 33, 44, 33]
 let res = []
 arr.forEach((item) => {
   if (!res.includes(item)) {
     res.push(item)
   }
 })
 console.log(res)

4.filter &&  Map

let arr = [2, 2, 33, 44, 33]
const tem = new Map();
let res = arr.filter((item) => !tem.has(item) && tem.set(item, 1))
console.log(res)

// indexOf实现
var array = [1, 1, '1'];

function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res;
}

console.log(unique(array));


// filter实现
var array = [1, 2, 1, 1, '1'];
function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}
console.log(unique(array));

```

### 数组排序去重

    // 排序后去重
    var array = [1, 1, '1'];
    
    function unique(array) {
        var res = [];
        var sortedArray = array.concat().sort();
        var seen;
        for (var i = 0, len = sortedArray.length; i < len; i++) {
            // 如果是第一个元素或者相邻的元素不相同
            if (!i || seen !== sortedArray[i]) {
                res.push(sortedArray[i])
            }
            seen = sortedArray[i];
        }
        return res;
    }
    
    console.log(unique(array));
    
    // 排序去重
    var array = [1, 2, 1, 1, '1'];
    function unique(array) {
        return array.concat().sort().filter(function(item, index, array){
            return !index || item !== array[index - 1]
        })
    }
    console.log(unique(array));

### 对象去重

    // Object键值对
    var array = [{value: 1}, {value: 1}, {value: 2}];
    
    function unique(array) {
        var obj = {};
        return array.filter(function(item, index, array){
            console.log(typeof item + JSON.stringify(item))
            return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
        })
    }
    
    console.log(unique(array)); // [{value: 1}, {value: 2}]

### 15.防抖和节流的应用场景（百度手写节流代码）

防抖（debounce）：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时，重新出发定时器。\
节流（throttle）：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效\
结合应用场景

#### 防抖(debounce)

1.  search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
2.  window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
3.  给按钮加函数防抖防止表单多次提交。
4.  对于输入框连续输入进行AJAX验证时，用函数防抖能有效减少请求次数。
5.  判断scroll是否滑到底部，滚动事件+函数防抖

#### 节流(throttle)

1.  鼠标不断点击触发，mousedown(单位时间内只触发一次)
2.  监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
3.  游戏中的刷新率
4.  DOM元素拖拽
5.  Canvas画笔功能

    //防抖
    function debounce(func, wait){
    let timeout;
    // 使用闭包解决还没点击就执行函数的情况
    return function(){
    if(timeout){
    clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
    // 修改this指向和添加参数
    func.apply(this, arguments)
    }, wait)
    }
    }

    //节流
    // 判断触发的事件是否在时间间隔内，如果在时间间隔内就不触发事件了，如果不在就触发事件
    // 如果timer被赋值了，也就是任务还在等待执行，暂时不改变timer的值
    // 如果timer没被赋值了，或者任务执行完了，那就给他赋值执行任务就好了
    // 清空timer的值，因为清空行为是在延迟执行任务以后发生的，所以直接赋值为null就行了

    function throttle(func, wait){
    let timeout;
    return function(){
    if(!timeout){
    timeout = setTimeout(() => {
    timeout = null;
    func.apply(this, arguments)
    }, wait)
    }
    }
    }

    function throttle(func, delay) {
    // 上一次执行的时间
    let pre = 0;
    return function () {
    // 现在的时间
    let now = new Date();
    //   如果现在的时间减去上次执行的时间大于delay就执行函数
    if (now - pre > delay) {
    func.apply(this, arguments);
    // 把当前时间赋值给上一次的执行时间
    pre = now;
    }
    };
    }

    function say(){
    console.log('hi haha')
    }

    // document.onmousemove = debounce(say, 1000)
    document.onmousemove = throttle(say, 1000)

### 3.apply和call的使用场景，结合实际作出举例

<https://juejin.im/post/6844903496253177863#heading-6>

    区别:
    
    apply最多只能接受一个数组参数,函数是立即调用
    call可以传入多个参数, 函数是立即调用
    bind可以传入多个参数,函数是手动调用
    
    1.判断对象类型
    var arr = [];
    Object.prototype.toString.call(arr);       // [object Array]
    //把函数体Object.prototype.toString()方法内部的this,绑定到arr的执行环境（作用域）
    
    2.可以将一个类似(伪) 数组的对象(比如arguments对象) 转为真正的数组。**前提：**被处理的对象必须有length属性， 以及相对应的数字键。//接收的是对象，返回的是数组
    Array.prototype.slice.apply((O：1， length：1) ) //[1]
    Array.prototype.slice.apply((0：1) ) //[]
    Array.prototype.slice.apply((0：1， length：2) ) //[1， undefined]
    Array.prototype.slice.apply(f length：1) ) //[undefined]
    //(切下) [] .slice(1， n) ， 返回索引为1到索引为n-1的数组

### 5.git merge和git rebase的区别, 切记：永远用rebase

当需要保留详细的合并信息的时候建议使用git merge，特别是需要将分支合并进入master分支时；当发现自己修改某个功能时，频繁进行了git commit提交时，发现其实过多的提交信息没有必要时，可以尝试git rebase。\
merge 是一个合并操作，会将两个分支的修改合并在一起\
merge 的提交历史忠实地记录了实际发生过什么，关注点在真实的提交历史上面\
rebase 并没有进行合并操作，只是提取了当前分支的修改，将其复制在了目标分支的最新提交后面

### 9.2 斐波那契数列(百度笔试题)

输出斐波那契数列的数据

     // 斐波那契数列：1，1，2，3，5，8，13，21，34，55，89..
          const generateFib = (n) => {
            let fibArr = [];
            let i = 0;
            while (i < n) {
              if (i <= 1) {
                fibArr.push(i);
              } else {
                fibArr.push(fibArr[i - 1] + fibArr[i - 2]);
              }
              i++;
            }
            return fibArr;
          };
          // [0, 1, 1, 2, 3, 5, 8, 13]
          console.log("斐波那契数列", generateFib(8));

求斐波那契数列的第n项

    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233……
    function fibonacci(n){
        if(n === 1 || n === 0 ) return n;
        return fibonacci(n-1) + fibonacci(n-2);
    }
    
     // 递归，数据过大会造成溢出(浏览器卡死)
      function fib(n) {
        if (n < 2) return n;
        return fib(n - 1) + fib(n - 2);
      }
      console.log(fib(4)); // 3


​      
​      // 动态规划
​      const dynamicFib = (n) => {
​        if (n < 2) {
​          return n;
​        }
​        let newArr = [0, 1];
​        for (let i = 2; i <= n; i++) {
​          newArr.push(newArr[0] + newArr[1]);
​          newArr.splice(0, 1);
​          console.log("newArr", newArr);
​        }
​        return newArr[1];
​      };
​      console.log(dynamicFib(4)); // 3

```
// 循环
function fib(n) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        let temp = a;
        a = b;
        b = temp + b;
    }
    return a;
}

```



### 2.浏览器的缓存，

<https://www.jianshu.com/p/54cc04190252>
强缓存：不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且Size显示from disk cache或from memory cache。强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。

协商缓存：就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，

### 11. 数组常用的方法和数组es6新增的方法

    数组常用的方法
    toString()  把数组转成字符串，并用逗号隔开，arr.toString()     "1,3,4,4"
    valueOf()  返回数组对象本身
    split()  方法用于把一个字符串分割成字符串数组。
    push()方法用于在数组的末端添加一个或多个元素，
    pop()方法用于删除数组的最后一个元素
    shift()方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。  a.shift() 
    unshift()方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组
    join()方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。     
    concat()方法用于多个数组的合并。
    reverse()方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。
    sort()方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。
    slice()方法用于提取目标数组的一部分，返回一个新数组，原数组不变。arr.slice(start, end);
    splice()方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。
    map()方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。

### es6的新特性

1.  Let和const关键字
2.  变量的解构赋值
3.  字符串模板
4.  扩展运算符
5.  箭头函数
6.  字符串，数值的扩展
7.  数组，对象的扩展
8.  Symobol
9.  Set和Map
10. Proxy
11. Class
12. Promise
13. async

### es6数组新增的方法
    Array.from 把类数组的对象转换为真正的数组对象
    Array.filter   过滤
    Array.every   判断数组中所有的元素都符合条件时，返回true
    Array.some 判断数组中有一个元素符合条件，就返回true
    Array.find 返回数组中符合条件的第一个元素，否则就返回undefined
    Array.findIndex() 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
    Array.includes() 某个数组是否包含给定的值
    Array.map(callback) 根据你callback函数中的条件，返回一个全新的数组
    Array.reduce(callback) 根据callback中的条件对数组中的每个元素都进行类加的操作，返回一个全新的值
    Array.of方法用于将一组值，转换为数组。
    Array.copyWithin()
    Array.fill方法使用给定值，填充一个数组。
    Array.flat()，Array.flatMap() 用于将嵌套的数组“拉平”，变成一维的数组
    entries()，keys() 和 values()

### 3.px,rem与em的使用和区别详解

px像素（Pixel）。相对长度单位。像素px是相对于显示屏幕分辨率而言的

rem是基于html元素的字体大小来决定，而em则根据使用它的元素的大小决定

em(相对长度单位，相对于当前对象内文本的字体尺寸)：\
是一个相对长度单位，最初是指字母M的宽度，故名em。现指的是字符宽度的倍数，用法类似百分比，如：0.8em, 1.2em,2em等。通常1em=16px
rem（root em，根em）：\
是CSS3新增的一个相对单位，这个单位引起了广泛关注。这个单位与em有什么区别呢？区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用rem设定的字体大小。

### vw/vh

vw 和 vh 分别是相对于屏幕视口宽度和高度而言的长度单位：

1vw = 视口宽度均分成 100 份中 1 份的长度；
1vh = 视口高度均分成 100 份中 1 份的长度；

在 JS 中 100vw = window\.innerWidth，100vh = window\.innerHeight。

### 标准模型与IE模型的区别

现在最常用的是IE盒模型

    box-sizing：content-box；设置为标准盒子模型
    标准盒模型下盒子的大小 = content + border + padding + margin
    box-sizing：border-box；设置为IE盒子模型
    IE盒模型下盒子的大小=width（content + border + padding） + margin

### 严格模式和非严格模式的区别

严格模式下this指向什么  undefined

1.  在严格模式中禁止使用with语句。
2.  在严格模式中，所有的变量都要先声明，如果给一个未声明的变量、函数、函数参数、catch从句参数或全局对象的属性赋值，将会抛出一个引用错误（在非严格模式中，这种隐式声明的全局变量的方法是给全局对象新添加一个新属性）。
3.  在严格模式中，调用的函数（不是方法）中的一个this值是undefined。（在非严格模式中，调用的函数中的this值总是全局对象）。可以利用这种特性来判断JavaScript实现是否支持严格模式
4.  var hasStrictMode = (function(){"use strict";return this===undefined;}());
5.  同样，在严格模式中，当通过call()或apply()来调用函数时，其中的this值就是通过call()或apply()传入的第一个参数（在非严格模式中，null和undefined值被全局对象和转换为对象的非对象值所代替）。
6.  在严格模式中，给只读属性赋值和给不可扩展的对象创建新成员都将抛出一个类型错误异常（在非严格模式中，这些操作只是简单地操作失败，不会报错）。
7.  在严格模式中，传入eval()的代码不能在调用程序所在的上下文中声明变量或定义函数，而在非严格模式中是可以这样做的。相反，变量和函数的定义是在eval()创建的新作用域中，这个作用域在eval()返回时就弃用了。
8.  在严格模式中，函数里的arguments对象拥有传入函数值的静态副本。在非严格模式中，arguments对象具有“魔术般”的行为，arguments里的数组元素和函数参数都是指向同一个值的引用。
9.  在严格模式中，当delete运算符后跟随非法的标识符（比如变量、函数、函数参数）时，将会抛出一个语法错误异常（在非严格模式中，这种delete表达式什么也没做，并返回false）。
10. 在严格模式中，试图删除一个不可配置的属性将抛出一个类型错误异常（在非严格模式中，delete表达式操作失败，并返回false）。
11. 在严格模式中，在一个对象直接量中定义两个或多个同名属性将产生一个语法错误（在非严格模式中不会报错）。
12. 在严格模式中，函数声明中存在两个或多个同名的参数将产生一个语法错误（在非严格模式中不会报错）。
13. 在严格模式中是不允许使用八进制整数直接量（以0为前缀，而不是0x为前缀）的（在非严格模式中某些实现是允许八进制整数直接量的）。
14. 在严格模式中，标识符eval和arguments当作关键字，他们的值是不能更改的。不能给这些标识符赋值，也不能把它们声明为变量、用作函数名、用作函数参数或用作catch块的标识符。
15. 在严格模式中限制了对调用栈的检测能力，在严格模式的函数中，arguments.caller和arguments.callee都会抛出一个类型错误异常。严格模式的函数同样具有caller和arguments属性，当访问这两个属性时将抛出类型错误异常（有一些JavaScript的实现在非严格模式里定义了这些非标准的属性）。

### this的指向和改变this指向的方法和区别

在一个普通的function函数，this默认是指向window或者调用它的对象，箭头函数指向window
改变this指向的方法
call、apply与bind区别：前两个可以自动执行，bind不会自动执行，需要手动调用
call、bind与apply区别：前两个都有无数个参数，apply只有两个参数，而且第二个参数为数组

### vue和jquey区别

jq的数据与视图混在一块，Vue的数据与视图分离,以数据驱动视图（只关心数据变化，DOM操作被封装）
jq直接用js修改视图，Vue以数据驱动视图

jQuery是使用选择器（`$）选取DOM对象，对其进行赋值、取值、事件绑定等操作，其实和原生的HTML的区别只在于可以更方便的选取和操作DOM对象，而数据和界面是在一起的。比如需要获取label标签的内容：$`("lable").val();,它还是依赖DOM元素的值。\
Vue则是通过Vue对象将数据和View完全分离开来了。对数据进行操作不再需要引用相应的DOM对象，可以说数据和View是分离的，他们通过Vue对象这个vm实现相互的绑定。这就是传说中的MVVM。

vue适用的场景：复杂数据操作的后台页面，表单填写页面\
jquery适用的场景：比如说一些html5的动画页面，一些需要js来操作页面样式的页面\
然而二者也是可以结合起来一起使用的，vue侧重数据绑定，jquery侧重样式操作，动画效果等，则会更加高效率的完成业务需求

### 闭包(优点和缺点)
闭包= 内层函数+引用的外层函数变量

打断点，如果出现Closure，说明有闭包，闭包不一定有return，不一定会有内存泄漏

闭包：内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。

闭包的定义其实很简单：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。

    function A() {
      let a = 1
      window.B = function () {
          console.log(a)
      }
    }
    A()
    B() // 1

闭包是一个函数加上到创建函数的作用域的连接，闭包“关闭”了函数的自由变量。
优点：

*   保护函数内部变量的安全，加强了封装性
*   在内存中维持一个变量
*   设计私有方法和变量
*   可以读取函数内部的变量
    缺点：
*   变量会驻留在内存中，造成内存损耗问题。  解决:把闭包的函数设置为null
*   导致内存泄漏【ie】，使用不当会造成额外的内存占用  ==>可说可不说，如果说一定要提到ie
*   可以改变父函数的变量，所以使用时要谨慎

// 闭包可以解决的问题

    for (var i = 1; i < 5; i++) {
      setTimeout(function timer() {
        console.log(i) // 5 5 5 5 5 
      }, i * 1000)
    }
    
    // 第一种解决方式
    for (var i = 0; i < 5; i++) {
        (function(j) {  // j = i
            setTimeout(function() {
                console.log(new Date, j);
            }, 1000);
        })(i);
    }
    
    console.log(new Date, i);  // 5 -> 0,1,2,3,4
    
    // 第二种解决方式（推荐）
    for (let i = 1; i <= 5; i++) {
      setTimeout(function timer() {
        console.log(i)
      }, i * 1000)
    }

### 前端有哪些页面优化方法?

1.  资源压缩合并，减少 HTTP 请求
2.  非核心代码异步加载（异步加载的方式，异步加载的区别）
3.  利用浏览器缓存（缓存的分类，缓存原理）
4.  使用 CDN
5.  预解析 DNS

    <https://www.jianshu.com/p/91efaf89fea1>
    实现原理：
    1.\<meta>信息告诉浏览器，当前页面要做DNS预解析； \<meta http-equiv="x-dns-prefetch-control" content="on" />
    2.\</head>使用\<link>标签来强制对DNS预解析；

    \<link rel="dns-prefetch" href="<http://bdimg.share.baidu.com>" />
    3.dns-prefetch需慎用，多页面重复DNS预解析会增加重复DNS查询次数；
    4.浏览器对网站第一次的域名DNS解析查找流程：

*   减少 HTTP请求数
*   从设计实现层面简化页面
*   合理设置 HTTP缓存
*   资源合并与压缩
*   合并 CSS图片，减少请求数的又一个好办法。
*   将外部脚本置底（将脚本内容在页面信息内容加载后再加载）
*   多图片网页使用图片懒加载。
*   在js中尽量减少闭包的使用
*   尽量合并css和js文件
*   尽量使用字体图标或者SVG图标，来代替传统的PNG等格式的图片
*   减少对DOM的操作
*   在JS中避免“嵌套循环”和 “死循环”
*   尽可能使用事件委托（事件代理）来处理事件绑定的操作

### Cookie和Session之间的区别

1.Cookie数据存放在客户的浏览器(本地),session数据放在服务器上

2.Cookie不如session安全，别人可以分析存放在本地的Cookie并进行Cookie欺骗,所以出于安全性的考虑应当使用Session

3.Session会在一定时间内保存在服务器上。当访问增多,会占用较多的服务器资源,所以出于性能考虑则应当使用cookie

单个cookie保存的数据不能超过4k,很多浏览器都限制一个站点最多保存20个cookie.实际上为了性能考虑,不论是cookie还是session,其中的信息都应当短小精悍

session因为是保存在服务器上,所以不支持跨域的访问

### 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

共同点：都是保存在浏览器端、且同源的

不同点：

    1.cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。
    cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下
    sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。
    2.存储大小限制也不同，cookie数据不能超过4K，sessionStorage和localStorage可以达到5M
    3.sessionStorage：仅在当前浏览器窗口关闭之前有效；
    localStorage：始终有效，窗口或浏览器关闭也一直保存，本地存储，因此用作持久数据；
    cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭
    4.作用域不同
    sessionStorage：不在不同的浏览器窗口中共享，即使是同一个页面；
    localstorage：在所有同源窗口中都是共享的；也就是说只要浏览器不关闭，数据仍然存在
    cookie: 也是在所有同源窗口中都是共享的.也就是说只要浏览器不关闭，数据仍然存在
    5.事件代理
    6.事件的节流和防抖
    7.EventLoop事件循环机制
    8.代码优化等

### 2.3.从输入url地址到页面相应都发生了什么？（百度）

<https://juejin.im/post/5a8e242c5188257a6b060000>

1.  用户打开一个网站，到这个网站展现，中间发生了什么
2.  浏览器的地址栏输入URL并按下回车。
3.  浏览器查找当前URL是否存在缓存，并比较缓存是否过期。
4.  DNS解析URL对应的IP。
5.  根据IP建立TCP连接（三次握手）。
6.  HTTP发起请求。
7.  服务器处理请求，浏览器接收HTTP响应。
8.  浏览器渲染页面，构建DOM树。
9.  关闭TCP连接（四次挥手）



01.浏览器查找域名对应的 IP 地址(DNS 查询：浏览器缓存->系统缓存->路由器缓存->ISP DNS 缓存->根 域名服务器)

02.浏览器向 Web 服务器发送一个 HTTP 请求（TCP 三次握手）

03.服务器 301 重定向（从 [example.com](https://link.juejin.cn?target=http%3A%2F%2Fexample.com) 重定向到 [www.example.com）](https://link.juejin.cn?target=http%3A%2F%2Fwww.example.com%EF%BC%89)

04.浏览器跟踪重定向地址，请求另一个带 www 的网址

05.服务器处理请求（通过路由读取资源）

06.服务器返回一个 HTTP 响应（报头中把 Content-type 设置为 'text/html'）

07.浏览器进 DOM 树构建

08.浏览器发送请求获取嵌在 HTML 中的资源（如图片、音频、视频、CSS、JS 等）

09.浏览器显示完成页面

10.浏览器发送异步请求

### 浏览器渲染的详细步骤，从dom树开始（css tree，）

1.  解析HTML生成DOM树。
2.  解析CSS生成CSSOM规则树。
3.  将DOM树与CSSOM规则树合并在一起生成渲染树。
4.  遍历渲染树开始布局，计算每个节点的位置大小信息。
5.  将渲染树每个节点绘制到屏幕。

### 浏览器事件的传递，（由上到下叫事件捕获，由下到上叫事件冒泡）

### 普通函数和箭头函数的区别，

1.  样式不同，箭头函数是 =>{ }普通函数是 function；
2.  箭头函数是匿名函数，不能作为构造函数，不能使用new；
3.  箭头函数不绑定 arguments，可以考虑用剩余参数代替；
4.  箭头函数会捕获其所在上下文的 this 值，作为自己的 this 值，定义的时候就确定了，没有办改变其指向；普通函数的this指向调用它的对象
5.  call、apply、bind 并不会影响 箭头函数this 的指向；
6.  箭头函数没有原型属性；
7.  箭头函数不能当作 Generator 函数，不能使用 yield 关键字；

### typescript和js相比的优势

1.  Angular2框架的开发语言
2.  支持ES6
3.  类型检测
4.  语法提示
5.  TypeScript 增加了静态类型、类、模块、接口和类型注解
6.  TypeScript 引入了 JavaScript 中没有的“类”概念。

### 跨域

6.跨域有哪些解决方案和为什么会产生跨域
<https://juejin.im/post/5c23993de51d457b8c1f4ee1#heading-15>

1.什么是同源策略及其限制内容？
同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

同源策略限制内容有：
Cookie、LocalStorage、IndexedDB 等存储性内容
DOM 节点
AJAX 请求发送后，结果被浏览器拦截了
但是有三个标签是允许跨域加载资源：

    <img src=XXX>
    <link href=XXX>
    <script src=XXX>

特别说明两点：
第一：如果是协议和端口造成的跨域问题“前台”是无能为力的。

第二：在跨域问题上，仅仅是通过“URL的首部”来识别而不会根据域名对应的IP地址是否相同来判断。“URL的首部”可以理解为“协议, 域名和端口必须匹配”。
跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。

1.  jsonp   JSONP优点是简单兼容性好, 通过script标签和url回调来实现跨域, 缺点是只支持get请求。
2.  cors CORS需要浏览器和后端同时支持, 后端设置Access-Control-Allow-Origin 就可以开启 CORS
3.  postMessage  可以实现跨文本档、多窗口、跨域消息传递
4.  websocket HTML5的一个持久化的协议，它实现了浏览器与服务器的全双工通信，也是跨域的一种解决方案
5.  Node中间件代理(两次跨域) http-proxy
6.  nginx反向代理
7.  window\.name + iframe
8.  location.hash + iframe
9.  document.domain + iframe

### 怎么做减少回流和重绘 通过js和css

<https://juejin.im/post/5a9923e9518825558251c96a>
浏览器渲染

1.  浏览器使用流式布局模型 (Flow Based Layout)。
2.  浏览器会把HTML解析成DOM，把CSS解析成CSSOM，DOM和CSSOM合并就产生了Render Tree。
3.  有了RenderTree，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。
4.  由于浏览器使用流式布局，对Render Tree的计算通常只需要遍历一次就可以完成，但table及其内部元素除外，他们可能需要多次计算，通常要花3倍于同等元素的时间，这也是为什么要避免使用table布局的原因之一。

一句话：回流必将引起重绘，重绘不一定会引起回流。

当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。\
会导致回流的操作：

1.  页面首次渲染
2.  浏览器窗口大小发生改变
3.  元素尺寸或位置发生改变
4.  元素内容变化（文字数量或图片大小等等）
5.  元素字体大小变化
6.  添加或者删除可见的DOM元素
7.  激活CSS伪类（例如：\:hover）
8.  查询某些属性或调用某些方法

一些常用且会导致回流的属性和方法：

```
clientWidth、clientHeight、clientTop、clientLeft
offsetWidth、offsetHeight、offsetTop、offsetLeft
scrollWidth、scrollHeight、scrollTop、scrollLeft
scrollIntoView()、scrollIntoViewIfNeeded()
getComputedStyle()
getBoundingClientRect()
scrollTo() 

```

重绘 (Repaint)
当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

CSS

1.  使用transform替代top
2.  使用visibility替换display\:none,因为前者只会引起重绘，后者会引发回流（改变了布局）
3.  避免使用table布局，可能很小的一个改动会造成整个table的重新布局
4.  尽可能在DOM树的最末端改变class，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围。
5.  避免设置多层内联样式，css选择符从右往左匹配查找，避免节点层级过多。
6.  将动画效果应用到position属性为absolute或者fixed的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流。同时，控制动画速度可以选择requestAnimationFrame。
7.  避免使用css表达式，可能会引发回流。
8.  将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如will-change,video,iframe等标签，浏览器会自动将该节点变为图层。
9.  CSS3硬件加速(GPU加速)，使用CSS3硬件加速，可以让transform,opacity,filters这些动画不会引起回流重绘。

JavaScript

1.  避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性
2.  避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
3.  避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
4.  对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流

### 1. get和post的区别

1.  GET 请求可被缓存 GET 请求保留在浏览器历史记录中 GET 请求可被收藏为书签 GET 请求不应在处理敏感数据时使用 GET 请求有长度限制(2048字符),IE和Safari浏览器限制2k;Opera限制4k;Firefox，Chrome限制8k GET 请求只应当用于取回数据
2.  POST 请求不会被缓存 POST 请求不会保留在浏览器历史记录中 POST 不能被收藏为书签 POST 请求对数据长度没有要求
3.  get参数有长度限制（受限于url长度，具体的数值取决于浏览器和服务器的限制，最长2048字节），而post无限制。
4.  get请求的数据会附加在url之 ，以 " ？ "分割url和传输数据，多个参数用 "&"连接，而post请求会把请求的数据放在http请求体中。
5.  get是明文传输，post是放在请求体中，但是开发者可以通过抓包工具看到，也相当于是明文的。
6.  get请求会保存在浏览器历史记录中，还可能保存在web服务器的日志中

### http和https的区别

#### 陈述http

基本概念：
HTTP，全称为 HyperText Transfer Protocol，即为超文本传输协议。是互联网应用最为广泛的一种网络协议
所有的 www 文件都必须遵守这个标准。

http特性：

*   HTTP 是无连接无状态的
*   HTTP 一般构建于 TCP/IP 协议之上，默认端口号是 80
*   HTTP 可以分为两个部分，即请求和响应。

http请求：

*   HTTP 定义了在与服务器交互的不同方式，最常用的方法有 4 种,分别是 GET，POST，PUT， DELETE。URL 全称为资源描述符，可以这么认为：一个 URL 地址对应着一个网络上的资源，而 HTTP 中的 GET，POST，PUT，DELETE就对应着对这个资源的查询，修改，增添，删除4个操作。
*   HTTP 请求由 3 个部分构成，分别是：状态行，请求头(Request Header)，请求正文。
*   HTTP 响应由 3 个部分构成，分别是：状态行，响应头(Response Header)，响应正文。
*   HTTP 响应中包含一个状态码，用来表示服务器对客户端响应的结果。

状态码一般由3位构成：

1xx : 表示请求已经接受了，继续处理。\
2xx : 表示请求已经处理掉了。\
3xx : 重定向。\
4xx : 一般表示客户端有错误，请求无法实现。
5xx : 一般为服务器端的错误。

### 2.3 http1.0、HTTP 1.1和2.0的区别

HTTP1.0 HTTP 1.1主要区别

1.  长链接
2.  节约带宽
3.  HOST域

与HTTP 1.1相比，主要区别包括

1.  多路复用
2.  二进制分帧
3.  首部压缩
4.  服务器推送

### https怎么做到加密的

HTTPS就是使用SSL/TLS协议进行加密传输，让客户端拿到服务器的公钥，然后客户端随机生成一个对称加密的秘钥，使用公钥加密，传输给服务端，后续的所有信息都通过该对称秘钥进行加密解密，完成整个HTTPS的流程。

### http协议，TCP/IP的基本工作原理

http:超文本传输协议（英文：HyperText Transfer Protocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议。HTTP是万维网的数据通信的基础。

TCP/IP协议共有四层：应用层、传输层、网络层、链路层。

### 你在工作终于到那些问题，解决方法是什么

经常遇到的问题就是Cannot read property ‘prototype’ of undefined
解决办法通过浏览器报错提示代码定位问题，解决问题

Vue项目中遇到视图不更新，方法不执行，埋点不触发等问题
一般解决方案查看浏览器报错，查看代码运行到那个阶段未之行结束，阅读源码以及相关文档等
然后举出来最近开发的项目中遇到的算是两个比较大的问题。

## js事件执行机制

     console.log("1");
      //  第一个宏任务
      setTimeout(function () {
        console.log("2");
        process.nextTick(function () {
          console.log("3");
        });
    
        new Promise(function (resolve) {
          console.log("4");
          resolve();
        }).then(function () {
          console.log("5");
        });
      });
    
      new Promise(function (resolve) {
        console.log("7");
        resolve();
      }).then(function () {
        console.log("8");
      });
      process.nextTick(function () {
        console.log("6");
      });
      //  第二个宏任务
      setTimeout(function () {
        console.log("9");
    
        new Promise(function (resolve) {
          console.log("11");
          resolve();
        }).then(function () {
          console.log("12");
        });
    
        process.nextTick(function () {
          console.log("10");
        });
      });
      console.log("13");
    
      // 1,7,13,6,8,2,4,3,5,9,11,10,12

process.nextTick()>Promise.then()>setTimeout>setImmediate。ji
