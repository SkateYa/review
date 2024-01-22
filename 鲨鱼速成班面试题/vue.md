***

[TOC]

***

# vue面试题
### vue watch监听数据解决新旧值一样的问题(newValue, oldValue）
解决方法
    如果想要得到不同的值可以结合计算属性
    我们可以再设置一个计算属性，保存Data为副本，然后监听这个副本的变化：

我们此时遇到的问题就是新值与旧值指向同一个地址的问题.而深拷贝的特点就是新开辟一个地址储存
需要拷贝对象的所有属性.然后指向这个新地址. 故 JSON.parse(JSON.stringify())能完美解决
其中的问题.然后与计算属性合并达到监听的属性一旦变化,自动新开辟一个地址,储存新值.
而新值与旧值指向的地址不同,则解决了新值与旧值相同的问题.

```
computed:{
    // 复制一份数据出来
    numberData() {
        return JSON.parse(JSON.stringify(this.numbers))
    },
},

watch:{
    numberData:{
        handler	(newValue,oldValue){ 
            console.log('numberData',newValue,oldValue)
        }
    }
}
```

### vue生命周期
![image](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32be395b238847018243333efd82f82c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
### diff算法
https://blog.csdn.net/Wr2138/article/details/128268759

### Vue数据双向绑定原理
Vue 数据双向绑定原理是通过 **数据劫持 + 发布者-订阅者模式** 的方式来实现的，首先是通过 ES5 提供的 Object.defineProperty() 方法来劫持（监听）各属性的 getter、setter，并在当监听的属性发生变动时通知订阅者，是否需要更新，若更新就会执行对应的更新函数。详见 vue源码。

常见的基于数据劫持的双向绑定有两种实现

```
一个是目前Vue2在用的 Object.defineProperty
一个是ES6中新增的 Proxy，而在Vue3.0版本后加入Proxy从而代替Object.defineProperty
```
### 几种实现双向绑定的做法
目前几种主流的mvc(vm)框架都实现了单向数据绑定，而双向数据绑定可以理解为是在单向绑定的基础上给可输入元素（input、textarea等）添加了change(input)事件，来动态修改model和 view。
实现数据绑定的做法有大致如下几种：

```
发布者-订阅者模式（backbone.js）

脏值检查（angular.js）

数据劫持（vue.js）
```

**发布者-订阅者模式:** 一般通过sub，pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 vm.set('property', value)。而我们更希望通过 vm.property = value 这种方式更新数据，同时自动更新视图，于是有了下面两种方式。

**脏值检查**: angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 setInterval() 定时轮询检测数据变动，当然Google 限制 angular只有在指定的事件触发时进入脏值检测，大致如下：

```
DOM事件，如用户输入文本，点击按钮等。( ng-click )
XHR响应事件 ( $http )
浏览器Location变更事件 ( $location )
Timer事件( $timeout , $interval )
执行 $digest() 或 $apply()
```

**数据劫持**: vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的 监听回调。

### 双向数据绑定的原理

Vue.js 是采用**数据劫持**结合**发布者-订阅者模式**的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：

1. 利用Proxy或Object.defineProperty生成的Observer针对对象/对象的属性进行"劫持",在属性发生变化后通知订阅者

2. 解析器Compile解析模板中的Directive(指令)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染

3. Watcher属于Observer和Compile桥梁,它将接收到的Observer产生的数据变化,并根据Compile提供的指令进行视图渲染,使得数据变化促使视图变化

   

1. 需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是: ① 在自身实例化时往属性订阅器(dep)里面添加自己 ② 自身必须有一个 update()方法 ③ 待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。
4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。


![image](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88523a441edf4712a616913bf2d2673b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image](https://cdn.nlark.com/yuque/0/2021/png/1500604/1618656573096-ebdc520c-5d60-4d12-ad04-5df4ebbb5fe7.png)

### 使用 Object.defineProperty() 来进行数据劫持有什么缺点？

在对一些属性进行操作时，使用这种方法无法拦截，比如通过下标方式修改数组数据或者给对象新增属性，这都不能触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作。更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 Vue 内部通过重写函数的方式解决了这个问题。

在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为 Proxy 是 ES6 的语法。

### vue react 区别，如何理解虚拟dom
Vue和React之间的区别包括：

设计哲学：Vue强调简洁和易用，更适合中小型项目；而React则更加灵活，更适合构建大型项目。
组件系统：Vue的组件系统较为灵活，更适合快速开发；而React的组件系统则更加规范，更适合大型项目。
性能方面：React虚拟DOM机制相对于Vue的Diff算法更加高效。
至于如何理解虚拟DOM，可以参照如下说明：

虚拟DOM（Virtual DOM）是一种用于优化Web应用性能的技术。它是通过在内存中创建一个虚拟的DOM树来代替直接操作真实的DOM树，从而减少对真实DOM的操作次数，提高页面渲染效率。虚拟DOM的概念可以理解为在JavaScript中用对象来描述真实DOM的结构和属性，通过对这个虚拟DOM树的操作，最终将变化的部分更新到真实DOM上。这种方式相比直接操作真实DOM，可以减少浏览器的重绘和重排，提高页面的性能。

### watch和watchEffect的对比

watch

1.  watch显式指定依赖数据，依赖数据更新时执行回调函数
2.  具有一定的惰性lazy 第一次页面展示的时候不会执行，只有数据变化的时候才会执行(设置immediate: true时可以变为非惰性，页面首次加载就会执行）
3.  监视ref定义的响应式数据时可以获取到原值
4.  既要指明监视的属性，也要指明监视的回调

watchEffect

1.  watchEffect自动收集依赖数据，依赖数据更新时重新执行自身
2.  立即执行，没有惰性，页面的首次加载就会执行
3.  无法获取到原值，只能得到变化后的值

### 你有对 Vue 项目进行哪些优化？

（1）代码层面的优化

v-if 和 v-show 区分使用场景
computed 和 watch  区分使用场景
v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
长列表性能优化
事件的销毁
图片资源懒加载
路由懒加载
第三方插件的按需引入
优化无限列表性能
服务端渲染 SSR or 预渲染

对象层级不要过深，否则性能就会差
不需要响应式的数据不要放到 data 中（可以用 Object.freeze() 冻结数据）
v-if 和 v-show 区分使用场景
computed 和 watch 区分使用场景
v-for 遍历必须加 key，key 最好是 id 值，且避免同时使用 v-if
大数据列表和表格性能优化-虚拟列表/虚拟表格
防止内部泄漏，组件销毁后把全局变量和事件销毁
图片懒加载
路由懒加载
第三方插件的按需引入
适当采用 keep-alive 缓存组件
防抖、节流运用
服务端渲染 SSR or 预渲染

（2）Webpack 层面的优化

Webpack 对图片进行压缩
减少 ES6 转为 ES5 的冗余代码
提取公共代码
模板预编译
提取组件的 CSS
优化 SourceMap
构建结果输出分析
Vue 项目的编译优化

（3）基础的 Web 技术的优化
开启 gzip 压缩
浏览器缓存
CDN 的使用
使用 Chrome Performance 查找性能瓶颈

### 在生命周期 created 函数加 async 前缀会不会阻塞 mounted 函数的执行，

不会，mounted本来就是在created结束之后执行的。async函数不会中断JavaScript的执行，而是将await的函数放入任务队列中。

### 那如果延时 created 函数5秒执行会不会阻塞 mounted 函数的执行呢

不会影响到后面 mounted 函数的执行

### vue封装组件

Vue组件封装过程

1.  首先，使用Vue.extend()创建一个组件
2.  然后，使用Vue.component()方法注册组件
3.  接着，如果子组件需要数据，可以在props中接受定义
4.  最后，子组件修改好数据之后，想把数据传递给父组件，可以使用emit()方法

### Vue 的父子组件生命周期钩子函数执行顺序

加载渲染过程

父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted

子组件更新过程

父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

父组件更新过程

父 beforeUpdate->父 updated

销毁过程

父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

### vue路由跳转有四种方式

1.  router-link
2.  this.\$router.push() (函数里面调用)
3.  this.\$router.replace() (用法同push)
4.  this.\$router.go(n)

### 虚拟dom树变成真实dom树是在哪个生命周期

发生在beforeMount和mounted之间和beforeUpdate和updated

### 组件中 data 为什么是一个函数？

因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

### vue修改数组

1.应用数组变异方法，push,pop,shift,unshift,splice,sort,reverse来操作数组。
2.重新修改对象的引用
3.用Vue中的方法Vue.set

### vuex的工作流

1.  在vue组件里面，通过dispatch来触发actions提交修改数据的操作。
2.  然后再通过actions的commit来触发mutations来修改数据。
3.  mutations接收到commit的请求，就会自动通过Mutate来修改state（数据中心里面的数据状态）里面的数据。
4.  最后由store触发每一个调用它的组件的更新

Vuex的作用：项目数据状态的集中管理，复杂组件(如兄弟组件、远房亲戚组件)的数据通信问题。

### vue父子组件生命周期执行顺序

1.  加载渲染过程
    父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
2.  子组件更新过程
    父beforeUpdate->子beforeUpdate->子updated->父updated
3.  父组件更新过程
    父beforeUpdate->父updated
4.  销毁过程
    父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

### Vue \$nextTick 原理

使用场景：在进行获取数据后，需要对新视图进行下一步操作或者其他操作时，发现获取不到 DOM。

### v-for和v-if优先级

v-for 比 v-if 具有更高的优先级

### vue组件间通信六种方式（完整版）

<https://segmentfault.com/a/1190000019208626>

1.  props/\$emit
2.  `$emit/$`on
3.  vuex
4.  `$attrs/$`listeners
5.  provide/inject
6.  `$parent / $`children与 ref
7.  作用域插槽

### 路由钩子

beforeEach，  afterEach ， beforeEnter，beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

### hash和history的区别

<https://www.jianshu.com/p/310671a8f514>

1.  hash：即地址栏 URL 中的 # 符号，hash 虽然出现在 URL 中，但不会被包括在 HTTP请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
2.  history：利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法
    它们执行修改时，虽然改变了当前的URL，但浏览器不会立即向后端发送请求。通过history api，我们丢掉了丑陋的#，但是它也有个问题：不怕前进，不怕后退，就怕刷新，f5，（如果后端没有准备的话）,因为刷新是实实在在地去请求服务器的。
    在hash模式下，前端路由修改的是#中的信息，而浏览器请求时不会将 # 后面的数据发送到后台，所以没有问题。但是在history下，你可以自由的修改path，当刷新时，如果服务器中没有相应的响应或者资源，则会刷新出来404页面。

### vue继承

extend

### mvvm和mvc的区别

　M：Model（数据模型），用于存放数据
　V：View（视图），也就是用户界面
　C：Controller是Model和View的协调者，Controller把Model中的数据拿过来给View使用。Controller可以直接与Model和View进行通信，而View不能与Controller直接通信
　　MVC：
　　　　Controller负责将Model的数据用View显示出来

用户操作> View (负责接受用户的输入操作)>Controller（业务逻辑处理）>Model（数据持久化）>View（将结果通过View反馈给用户）

　　缺点：

1.  所有业务逻辑都在Controller里操作，逻辑复杂且不利于维护，
2.  大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。
3.  当 Model 频繁发生变化，需要主动更新到View ；当用户的操作导致Model发生变化，同样需要将变化的数据同步到Model中， 这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

核心是提供对View 和 ViewModel 的双向数据绑定，View和Model之间并没有直接的联系，而是通过ViewModel进行交互，View的变动，自动反映在ViewModel上，反之亦然，这样就保证视图和数据的一致性。

　　M：Movel（数据模型）
　　V：View
　　VM：ViewModel 是一个同步View 和 Model的对象。View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互。ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。
　　　　VM双向绑定：在 MVVM 框架中，View(视图) 和 Model(数据) 是不可以直接通讯的，在它们之间存在着 ViewModel 这个中间介充当着观察者的角色。当用户操作 View(视图)，ViewModel 感知到变化，然后通知 Model 发生相应改变；反之当 Model(数据) 发生改变，ViewModel 也能感知到变化，使 View 作出相应更新。这个一来一回的过程就是我们所熟知的双向绑定。

### 虚拟dom

虚拟DOM就是为了主要是为了工程化，提高开发效率，统一开发格式. 如前，若一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地一个JS对象中，最终将这个JS对象一次性attch到DOM树上，再进行后续操作，避免大量无谓的计算量。所以，用JS对象模拟DOM节点的好处是，页面的更新可以先全部反映在JS对象(虚拟DOM)上，操作内存中的JS对象的速度显然要更快，等更新完成后，再将最终的JS对象映射成真实的DOM，交由浏览器去绘制

### 1.在Vue中，怎样实现持久化存储数据？

vuex-persistedstate（插件）

原理：
将vuex的state存在localStorage或sessionStorage或cookie中一份
刷新页面的一瞬间，vuex数据消失，vuex回去sessionStorage中拿取数据，变相的实现了数据刷新不丢失\~

### 2.v-if和v-show的区别

*   手段：v-if是通过控制dom节点的存在与否来控制元素的显隐；v-show是通过设置DOM元素的display样式，block为显示，none为隐藏；
*   编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
*   编译条件：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存？编译被缓存后，然后再切换的时候进行局部卸载); v-show是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且DOM元素保留；
*   性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；

### vue修饰符

1.  lazy   会在光标离开input框才会更新数据
2.  trim  输入框过滤首尾的空格
3.  number 先输入数字就会限制输入只能是数字，先字符串就相当于没有加number，注意，不是输入框不能输入字符串，是这个数据是数字
4.  stop：阻止事件冒泡
5.  prevent： 阻止默认行为
6.  self： 只有元素本身触发时才触发方法
7.  once：只能用一次
8.  native：组件绑定当前组件的事件是不会触发的，需要用native才能触发：

### 17.vue指令

```
v-text  解析文本
v-html   解析html标签
v-if   显示与隐藏     和v-show对比的区别 就是是否删除dom节点   默认值为false
v-else-if  必须和v-if连用
v-else  必须和v-if连用  不能单独使用  否则报错   模板编译错误
v-model   数据绑定
v-for   循环   格式  v-for="字段名 in(of) 数组json"
v-show   显示 隐藏     传递的值为布尔值  true  false  默认为false
v-bind  动态绑定  作用： 及时对页面的数据进行更改
v-on 绑定事件  函数必须写在methods里面     @click  快捷方法
v-bind:class   三种绑定方法  1、对象型  '{red:isred}'  2、三目型   'isred?"red":"blue"'   3、数组型  '[{red:"isred"},{blue:"isblue"}]'
v-once  进入页面时  只渲染一次 不在进行渲染
v-cloak  防止闪烁
v-pre  把标签内部的元素原位输出

```

### keep-alive

当组件在keep-alive内被切换时组件的activated、deactivated这两个生命周期钩子函数会被执行

被包裹在keep-alive中的组件的状态将会被保留，例如我们将某个列表类组件内容滑动到第100条位置，那么我们在切换到一个组件后再次切换回到该组件，该组件的位置状态依旧会保持在第100条列表处

### 4. watch 和computed的区别和应用场景

1.缓存：computed支持缓存，watch不支持缓存
2.异步： computed不支持异步，watch支持异步
3.使用情况： 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed；当一个属性发生变化时，需要执行对应的操作；一对多，一般用watch
4、使用场景

*   computed：当一个属性受多个属性影响的时候就需要用到computed  购物车商品结算的时候
*   watch  当一条数据影响多条数据的时候就需要用watch            搜索数据

### vue内置组件有哪些

1.  component  用于动态组件
2.  transition 过渡和动画
3.  transition-group  作为多个元素/组件的过渡效果
4.  keep-alive 缓存组件
5.  slot  插槽

    \<component \:is="componentId">\</component>

　　

### vue-router 钩子函数

分为两种 全局和局部
全局钩子函数：
beforeEach：在路由切换开始时调用
afterEach：在路由切换离开时调用
局部到单个路由
beforeEnter
组件的钩子函数
beforeRouterEnter，
beforeRouterUpdate,
beforeRouterLeave
to:即将进入的目标对象
from：当前导航要离开的导航对象
next：是一个函数调用resolve执行下一步

### vue-router query和params传参(接收参数)route的区别

1.query方式传参和接收参数

    传参: 
    this.$router.push({
            path:'/xxx',
            query:{
              id:id
            }
          })
      
    接收参数:
    this.$route.query.id
    注意:传参是this.$router,接收参数是this.$route,这里千万要看清了！！！
    1.为实例，想要导航到不同，则使用router.push方法
    2.$route为当前router跳转对象，里面可以获取name、path、query、params等

2.params方式传参和接收参数
传参:

    this.$router.push({
            name:'xxx',
            params:{
              id:id
            }
          })
      
    接收参数:
    this.$route.params.id
    注意:params传参，push里面只能是 name:'xxxx',不能是path:'/xxx',因为params只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined！！！

另外，二者还有点区别，直白的来说query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，而params相当于post请求，参数不会再地址栏中显示

### vue路由懒加载

*   vue异步组件
*   es提案的import()
*   webpack的require,ensure()

### 单页面和多页面的区别

一、多页应用

1.  每一次页面跳转的时候，后台服务器都会给返回一个新的html文档，这种类型的网站也就是多页网站，也叫做多页应用
    2.优点：首屏时间快，SEO效果好
    缺点：页面切换慢（ 因为每次跳转都需要发出一个http请求，如果网络比较慢，在页面之间来回跳转时，就会发现明显的卡顿。）
2.  为什么多页应用的首屏时间快？
    首屏时间叫做页面首个屏幕的内容展现的时间，当我们访问页面的时候，服务器返回一个html，页面就会展示出来，这个过程只经历了一个HTTP请求，所以页面展示的速度非常快。
3.  为什么搜索引擎优化效果好（SEO）？
    搜索引擎在做网页排名的时候，要根据网页内容才能给网页权重，来进行网页的排名。搜索引擎是可以识别html内容的，而我们每个页面所有的内容都放在Html中，所以这种多页应用，seo排名效果好
    二、 单页应用
4.  第一次进入页面的时候会请求一个html文件，刷新清除一下。切换到其他组件，此时路径也相应变化，但是并没有新的html文件请求，页面内容也变化了。
    2.原理是：JS会感知到url的变化，通过这一点，可以用js动态的将当前页面的内容清除掉，然后将下一个页面的内容挂载到当前页面上，这个时候的路由不是后端来做了，而是前端来做，判断页面到底是显示哪个组件，清除不需要的，显示需要的组件。这种过程就是单页应用，每次跳转的时候不需要再请求html文件了。
    3.优点：页面切换快
    页面每次切换跳转时，并不需要做html文件的请求，这样就节约了很多http发送时延，我们在切换页面的时候速度很快。
    4.缺点： 首屏时间慢，SEO差
    单页应用的首屏时间慢，首屏时需要请求一次html，同时还要发送一次js请求，两次请求回来了，首屏才会展示出来。相对于多页应用，首屏时间慢。
    SEO效果差，因为搜索引擎只认识html里的内容，不认识js的内容，而单页应用的内容都是靠js渲染生成出来的，搜索引擎不识别这部分内容，也就不会给一个好的排名，会导致单页应用做出来的网页在百度和谷歌上的排名差。

