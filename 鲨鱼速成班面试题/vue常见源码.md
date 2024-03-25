目录
*****
[TOC]
*****

一级菜单
## setup 
setup 执行时机是在 beforeCreate 之前执行，
## Vue.set 方法原理
##  Vue.extend 作用和原理
## 
## 
## vue-router的路由模式
Vue-Router 为我们提供了三种路由模式：Hash模式、History模式和Abstract模式。

Hash模式：这是Vue-Router的默认模式。使用URL的hash值来模拟一个完整的URL，于是当URL改变时，页面不会重新加载，其显示的网路路径中会有“#”号。这是最安全的模式，因为它兼容所有的浏览器和服务器。但是，由于URL中包含“#”符号，这可能会影响到URL的美观性，同时在SEO（搜索引擎优化）方面可能不如History模式。
History模式：使用HTML5 History API和服务器配置。整个地址重新加载，可以保存历史记录，方便前进后退。然而，使用这种模式需要服务器支持，否则当用户刷新页面时，服务器会返回404错误。
Abstract模式：针对没有浏览器环境的情况，如Weex客户端开发，内部没有浏览器API，Vue-Router会自动切换到Abstract模式。这种模式会忽略URL的变化，路由完全由Vue-Router来管理。
在选择路由模式时，需要根据项目需求、环境支持和用户体验等因素进行综合考虑。

Vue-Router 的路由模式及其底层原理是 Vue.js 框架中重要的组成部分，它们共同决定了页面如何根据 URL 的变化来展示不同的内容。以下是关于 Vue-Router 路由模式及其底层原理的详细解释：

路由模式
Vue-Router 提供了三种路由模式：

Hash 模式
原理：利用 URL 的 hash（即 # 后面的部分）来模拟一个完整的 URL。当 hash 值变化时，页面不会重新加载，但 Vue-Router 会根据 hash 值的变化来更新视图。
特点：无需后端支持，兼容性好，但 URL 中会包含 #，可能影响美观和 SEO。
History 模式
原理：利用 HTML5 History API 来实现 URL 的变化。这种模式下，整个 URL 都会重新加载，并且可以保存历史记录，方便前进后退。
特点：需要后端支持，否则用户刷新页面时可能会返回 404 错误。URL 看起来更加自然，有利于 SEO。
Abstract 模式
原理：主要用于没有浏览器环境的场景（如 Weex 客户端开发）。在这种模式下，Vue-Router 会忽略 URL 的变化，完全由 Vue-Router 来管理路由。
特点：适用于特定环境，如移动应用或桌面应用。
底层原理
Vue-Router 的底层原理主要依赖于 Vue 的响应式系统和浏览器提供的 API。

响应式系统
Vue-Router 将路由信息作为响应式数据来处理。当路由发生变化时，会触发 Vue 的响应式系统，从而更新视图。
监听 URL 变化
在 Hash 模式下，Vue-Router 会监听浏览器的 onhashchange 事件，当 hash 值变化时，触发路由更新。
在 History 模式下，Vue-Router 会利用 HTML5 History API 的 pushState 和 replaceState 方法来改变 URL，并通过监听 popstate 事件来感知 URL 的变化。
路由匹配与组件渲染
Vue-Router 会根据当前的 URL 和路由配置规则进行匹配，找到对应的路由记录。
根据路由记录，Vue-Router 会渲染对应的组件，并将其插入到页面的指定位置。
总结来说，Vue-Router 的路由模式决定了 URL 的表现形式和页面加载方式，而底层原理则依赖于 Vue 的响应式系统和浏览器提供的 API 来实现路由的更新和组件的渲染。在实际开发中，可以根据项目需求和环境支持来选择适合的路由模式。
## vue-router 的传参方式
1. router-link路由导航方式传参
```
父组件：<router-link to="/跳转到的路径/传入的参数"></router-link>
子组件：this.$route.params.content接受父组件传递过来的参数
```
2. 路由参数 (params)
```
const routes = [  
  { path: '/user/:id', component: User }  
]  
```
3. 通过路由属性name匹配路由，再根据params传递参数
```
this.$router.push({
    name: 'B',
    params: {
      context: '吴又可吴又可吴又可'
    }
  })
```
4. 通过query来传递参数
```
  this.$router.push({
    path: '/c',
    query: {
      context: '吴又可吴又可'
    }
  })
```
## data，watch，computed，methods同时命名一个属性或方法，命名相同会不会报错，有没有异常提示
watch、computed 和 methods：这些选项之间命名相同的方法或属性通常不会导致运行时错误，但可能会导致逻辑上的混淆或警告（如 computed 覆盖 data）。在编写 Vue 组件时，应该避免在不同选项中使用相同的名称，以确保代码的可读性和可维护性。
## vue2和vue3双向绑定的差异
##  diff 算法
## vue-router 中常用的路由模式实现原理吗
## 生命周期钩子
## Vue 模板编译原理
## 写过自定义指令吗 原理是什么
自定义指令由 Vue.directive 函数定义，它接收两个参数：指令名称和指令选项对象。指令选项对象包含一系列钩子函数，用于定义指令的行为。
指令本质上是装饰器，是 vue 对 HTML 元素的扩展，给 HTML 元素增加自定义功能。vue 编译 DOM 时，会找到指令对象，执行指令的相关方法。
自定义指令有五个生命周期（也叫钩子函数），分别是 bind、inserted、update、componentUpdated、unbind
markdown复制代码1. bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

2. inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
3. update：被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
4. componentUpdated：被绑定元素所在模板完成一次更新周期时调用。
5. unbind：只调用一次，指令与元素解绑时调用。

原理
1.在生成 ast 语法树时，遇到指令会给当前元素添加 directives 属性
2.通过 genDirectives 生成指令代码
3.在 patch 前将指令的钩子提取到 cbs 中,在 patch 过程中调用对应的钩子
4.当执行指令对应钩子函数时，调用对应指令定义的方法

## keep-alive原理
keep-alive是vue中的内置组件，可以实现组件缓存，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM

keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
keep-alive可以设置以下props属性：
include - 字符串或正则表达式。只有名称匹配的组件会被缓存
exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存
max - 数字。最多可以缓存多少组件实例

首先使用了keep-alive的组件以后，组件上就会自动加上了activated钩子和deactivated钩子。
activated 当组件被激活（使用）的时候触发 可以简单理解为进入这个页面的时候触发
deactivated 当组件不被使用（inactive状态）的时候触发 可以简单理解为离开这个页面的时候触发

keep-alive 的中还运用了 LRU(最近最少使用) 算法，选择最近最久未使用的组件予以淘汰
LRU 的核心思想是如果数据最近被访问过，那么将来被访问的几率也更高，所以我们将命中缓存的组件 key 重新插入到 this.keys 的尾部，这样一来，this.keys 中越往头部的数据即将来被访问几率越低，所以当缓存数量达到最大值时，我们就删除将来被访问几率最低的数据，即 this.keys 中第一个缓存的组件。

## 使用过 Vue SSR 吗？说说 SSR
SSR 也就是服务端渲染，也就是将 Vue 在客户端把标签渲染成 HTML 的工作放在服务端完成，然后再把 html 直接返回给客户端。
优点：
SSR 有着更好的 SEO、并且首屏加载速度更快
缺点：
开发条件会受到限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Node.js 的运行环境。
服务器会有更大的负载需求

### MVC 和 MVVM 区别
MVC: 是模型(model)－视图(view)－控制器(controller)
MVVM: MVVM实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变


那么问题来了 为什么官方要说 Vue 没有完全遵循 MVVM 思想呢？
严格的 MVVM 要求 View 不能和 Model 直接通信，而 Vue 提供了$refs 这个属性，让 Model 可以直接操作 View，违反了这一规定，所以说 Vue 没有完全遵循 MVVM

MVC：是Model（模型） View（视图） Controller（控制器）的缩写，是服务端分层开发的概念，本质上是用一种将数据、界面显示、业务逻辑分离的方法组织代码的软件开发设计典范。
（1）Model：数据层，负责操作数据库，执行数据的CRUD，职能单一。
（2）View：视图层，每当用户操作界面，就需要进行业务的处理，都会通过网络请求去服务端请求服务器。
（3）Controller：业务逻辑层，作为中间人负责数据层和视图层的交互。
总结：MVC模型中，Model、View，Controller三者是完全独立分开的，并且Model和View是完全隔离的，虽然Model不依赖于View，但是View是依赖于Model的，两者由Controller这个中间人负责交互。
MVVM：是Model（模型） View（视图） ViewModel（调度者）的缩写，是客户端视图层分离的概念，本质上是将其中的View的状态和行为抽象化，让我们将视图UI和业务逻辑分开。
（1）Model：MVVM中的M保存的是每个页面中单独的数据。
（2）View：MVVM中的V就是每个页面中的HTML结构。
（3）ViewModel：MVVM中的VM是一个调度者，分离了Model和View，每当View需要获取或者保存数据时，都要通过VM做中间的处理。
总结：VM是MVVM的核心，是M和V之间的调度者，数据的双向绑定是由VM完成的。
MVVM与MVC的区别是，MVVM实现了View和Model的自动同步，不用手动操作Dom，即Model变化时View可以实时更新，View变化也能改变Model。
MVVM与MVC的区别是，MVVM实现了View和Model的自动同步，不用手动操作Dom，即Model变化时View可以实时更新，View变化也能改变Model。

## Object.defineProperty 与 Proxy
Object.defineProperty只能劫持对象的属性， 而 Proxy 是直接代理对象

由于Object.defineProperty只能劫持对象属性，需要遍历对象的每一个属性，如果属性值也是对象，就需要递归进行深度遍历。但是 Proxy 直接代理对象， 不需要遍历操作

Object.defineProperty对新增属性需要手动进行Observe

因为Object.defineProperty劫持的是对象的属性，所以新增属性时，需要重新遍历对象， 对其新增属性再次使用Object.defineProperty进行劫持。也就是 Vue2.x 中给数组和对象新增属性时，需要使用$set才能保证新增的属性也是响应式的, $set内部也是通过调用Object.defineProperty去处理的。

### Vue2与Vue3的区别

`Vue` 内部根据功能可以被分为三个大的模块：**响应性 `reactivite`、运行时 `runtime`、编辑器 `compiler`**，以及一些小的功能点。那么要说 `vue2` 与 `vue3` 的区别，我们需要从这三个方面加小的功能点进行说起。

首先先来说 **响应性 `reactivite`**：

`vue2` 的响应性主要依赖 `Object.defineProperty` 进行实现，但是 `Object.defineProperty` 只能监听 **指定对象的指定属性的 `getter` 行为和 `setter` 行为**，那么这样在某些情况下就会出现问题。

什么问题呢？

比如说：我们在 `data` 中声明了一个对象 `person` ，但是在后期为 `person` 增加了新的属性，那么这个新的属性就会失去响应性。想要解决这个问题其实也非常的简单，可以通过 `Vue.$set` 方法来增加 **指定对象指定属性的响应性**。但是这样的一种方式，在 `Vue` 的自动响应性机制中是不合理。

所以在 `Vue3` 中，`Vue` 引入了反射和代理的概念，所谓反射指的是 `Reflect`，所谓代理指的是 `Proxy`。我们可以利用 `Proxy` 直接代理一个普通对象，得到一个 `proxy 实例` 的代理对象。在 `vue3` 中，这个过程通过 `reactive` 这个方法进行实现。

但是 `proxy` 只能实现代理复杂数据类型，所以 `vue` 额外提供了 `ref` 方法，用来处理简单数据类型的响应性。`ref` 本质上并没有进行数据的监听，而是构建了一个 `RefImpl` 的类，通过 `set` 和 `get` 标记了 `value` 函数，以此来进行的实现。所以 `ref` 必须要通过 `.value` 进行触发，之所以要这么做本质是调用 `value 方法`。

接下来是**运行时 `runtime`**：

所谓的运行时，大多数时候指的是 `renderer 渲染器`，渲染器本质上是一个对象，内部主要三个方法 `render、hydrate、createApp` ，其中 `render` 主要处理渲染逻辑，`hydrate` 主要处理服务端渲染逻辑，而 `createApp` 就是创建 `vue` 实例的方法。

这里咱们主要来说 `render 渲染函数`，`vue3` 中为了保证宿主环境与渲染逻辑的分离，把所有与宿主环境相关的逻辑进行了抽离，通过接口的形式进行传递。这样做的目的其实是为了解绑宿主环境与渲染逻辑，以保证 `vue` 在非浏览器端的宿主环境下可以正常渲染。

再往下是 **编辑器 `compiler`**：

`vue` 中的 `compiler` 其实是一个 `DSL（特定领域下专用语言编辑器）` ，其目的是为了把 `template 模板` 编译成 `render` 函数。 逻辑主要是分成了三大步： `parse、transform 和 generate`。其中 `parse` 的作用是为了把 `template` 转化为 `AST（抽象语法树）`，`transform` 可以把 `AST（抽象语法树）` 转化为 `JavaScript AST`，最后由 `generate` 把 `JavaScript AST` 通过转化为 `render 函数`。转化的过程中会涉及到一些稍微复杂的概念，比如 **有限自动状态机** 这个就不再这里展开说了。

除此之外，还有一些其他的变化。比如 `vue3` 新增的 `composition API`。 `composition API` 在 `vue3.0` 和 `vue3.2` 中会有一些不同的呈现，比如说：最初的 `composition API` 以 `setup` 函数作为入口函数， `setup` 函数必须返回两种类型的值：第一是对象，第二是函数。

当 `setup` 函数返回对象时，对象中的数据或方法可以在 `template` 中被使用。当 `setup` 函数返回函数时，函数会被作为 `render` 函数。

但是这种`vue 3.0`  `setup` 函数的形式并不好，因为所有的逻辑都集中在 `setup` 函数中，很容易出现一个巨大的 `setup` 函数，我们把它叫做巨石（屎山）函数。所以 `vue 3.2` 的时候，新增了一个 `script setup` 的语法糖，尝试解决这个问题。目前来看 `script setup` 的呈现还是非常不错的。

除此之外还有一些小的变化，比如 `Fragment、Teleport、Suspense` 等等，这些就不去说了...

# vue的双向绑定原理
双向数据绑定是采⽤数据劫持结合发布者-订阅者模式的⽅式，通过Object.defineProperty()来劫持各个属性的setter，getter，
在数据发生变动时发布消息给订阅者，触发相应的监听回调。这样就可以实现数据的双向绑定    关键点是：Object.defineProperty()劫持属性

Vue的双向绑定原理是通过数据劫持和发布订阅模式实现的。当数据发生变化时，Vue会立即更新视图，而当视图发生变化时，Vue会自动更新数据。

关键点包括：

1. 数据劫持：Vue通过Object.defineProperty()方法来劫持数据的setter和getter，从而实现对数据的监听和响应。

2. 发布订阅模式：Vue通过发布订阅模式来实现数据与视图的同步更新。当数据发生变化时，会通知订阅了该数据的所有视图进行更新；当视图发生变化时，会通知订阅了该视图的所有数据进行更新。

3. 模板编译：Vue在编译模板时，会将模板中的指令和表达式解析成对应的数据和事件，并生成渲染函数，从而实现数据与视图的绑定。

4. Watcher对象：Vue通过Watcher对象来实现数据与视图的绑定。Watcher对象会订阅数据的变化，并在数据发生变化时更新视图。同时，Watcher对象还会订阅视图的变化，并在视图发生变化时更新数据。

总之，Vue的双向绑定原理是通过数据劫持、发布订阅模式、模板编译和Watcher对象等多个关键点共同实现的。它可以让开发者更方便地管理数据和视图，提高开发效率和用户体验。
### 双向数据绑定的原理
Vue.js 是采用**数据劫持**结合**发布者-订阅者模式**的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。也就是说数据和视图时同步的，数据发生改变，视图跟着发生改变，视图改变，数据也会发生改变。

主要分为以下几个步骤：

1. 需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化

2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，

   主要做的事情是:

    ① 在自身实例化时往属性订阅器(dep)里面添加自己 

   ② 自身必须有一个 update()方法 

   ③ 待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调

4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 （model ）更新的双向绑定效果。

Vue.js 是采用**数据劫持**结合**发布者-订阅者模式**的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：

![image](https://cdn.nlark.com/yuque/0/2021/png/1500604/1618656573096-ebdc520c-5d60-4d12-ad04-5df4ebbb5fe7.png)
### key的原理

  优化patch性能

1. key的作用主要是为了更高效的更新虚拟DOM。

2. vue在patch过程中***\*判断两个节点是否是相同节点是key是一个必要条件\****，渲染一组列表时，key往往是唯一标识，所以如果不定义key的话，vue只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个patch过程比较低效，影响性能。

3. 实际使用中在渲染一组列表时key必须设置，而且必须是唯一标识，应该避免使用数组索引作为key，这可能导致一些隐蔽的bug；vue中在使用相同标签元素过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。

4. 从源码中可以知道，vue判断两个节点是否相同时主要判断两者的key和元素类型等，因此如果不设置key，它的值就是undefined，则可能永远认为这是两个相同节点，只能去做更新操作，这造成了大量的dom更新操作，明显是不可取的。

   面试题：react、vue中的key有什么作用？（key的内部原理）

5. 虚拟DOM中key的作用：  
   key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

6. 对比规则：  

   (1).旧虚拟DOM中找到了与新虚拟DOM相同的key     
   	 ①.若虚拟DOM中内容没变,直接使用之前的真实DOM！   
   	 ②.若虚拟DOM中内容变了,则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
     
   (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
       创建新的真实DOM，随后渲染到到页面。  

7. 用index作为key可能会引发的问题：

   (1). 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
   会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

    (2) 如果结构中还包含输入类的DOM：会产生错误DOM更新 ==> 界面有问题。

8. 开发中如何选择key?  
   1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值

   2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。
### proxy相对于Object.defineProperty()的好处

Object.defineProperty() 的问题主要有三个：

不能监听数组的变化
必须遍历对象的每个属性
必须深层遍历嵌套的对象
proxy可以支持：

数组监听
对象整体监听，不需要遍历每一个属性
##  nextTick 的实现原理
nextTick 是 Vue.js 提供的一个方法，用于在 DOM 更新循环结束之后执行延迟回调。它的实现原理主要依赖于 JavaScript 的事件循环机制，特别是宏任务和微任务的概念。

在 JavaScript 中，任务队列分为宏任务队列和微任务队列。宏任务包括 script（整体代码）、setTimeout、setInterval、setImmediate（Node.js 环境）、I/O、UI rendering 等；微任务包括 Promise.then、process.nextTick（Node.js 环境）、MutationObserver 等。
nextTick 提供了四种异步方法 Promise.then、MutationObserver、setImmediate、setTimeOut
当执行栈中的所有同步任务执行完后，会先检查微任务队列，执行完所有的微任务后，再执行宏任务。每次执行完一个宏任务后，都会检查微任务队列并执行其中的任务，直到微任务队列清空。
Vue 的 nextTick 方法利用了这一机制。当调用 nextTick 时，Vue 会将传入的回调函数添加到一个队列中。然后，Vue 会检查当前是否在微任务队列中。
如果是，Vue 会直接尝试使用微任务（如 Promise.then 或 MutationObserver）来执行回调函数；
如果不是，Vue 会尝试使用宏任务（如 setTimeout 或 setImmediate）来执行回调函数。
这样做的目的是确保回调函数在 DOM 更新之后执行，以便获取到最新的 DOM 结构。同时，由于微任务在宏任务之前执行，使用微任务可以更快地执行回调函数，提高性能。
需要注意的是，由于不同浏览器和 JavaScript 运行环境对微任务和宏任务的处理可能存在差异，Vue 的 nextTick 实现也会根据环境进行适配和优化。
### proxy 相对 Object.defineProperty 优点有哪些？

vue2 利用 Object.defineProperty 来劫持 data 数据的 getter 和 setter 操作，使得 data 在被访问或赋值时，动态更新绑定的 template 模板。而 Object.defineProperty 必须遍历所有的预值才能劫持每一个属性，这一缺点正好能够被 proxy 解决。


- proxy 相比 Object.defineProperty 优点分别为：
  代码的执行效果更快。
- proxy 可以直接监听对象而不是它的属性。
- proxy 可以直接监听数组的每个元素的变化。
- proxy 不需要初始化的时候遍历所有属性，如果有多层嵌套的话，只访问某个属性的时候，
- proxy 能够快速访问到，而 Object.defineProperty 还需要遍历所有属性，然后逐级向下访问。
- proxy 返回的是一个新对象，可以直接操作新对象而达到目标。而 Object.defineProperty 操作的是原对象，只能遍历对象属性然后对其直接修改。
- proxy 有 13 种拦截方法，不限于 apply、ownKeys、deleteProperty 等，而 Object.defineProperty 不具备。
- 在 vue2 中，我们给对象新增一个属性时，如果新增属性的值发生改变的时候，我们发现视图并没有更新，因为新增属性是无法监听到的。同样的，通过下标直接改变数组，视图也是无法更新的，也是因为监听不到。在 vue3 中新增 proxy ，解决了这些问题。

不能监听的情况
数组：
（1） 直接通过下标赋值  arr[i] = value
（2） 直接修改数组长度 arr.length = newLen
对象

（1） 对象属性的添加或删除：Vue 2 只能监听到对象已有属性的变化，而无法监听到新属性的添加或已有属性的删除。
（2） 对象属性的直接赋值：对于已经创建的响应式对象，如果直接给对象的属性赋值一个新值，而不是通过 Vue 的响应式方法来修改，那么这种变化是无法被监听到的。
### MVVM、MVC、MVP 的区别

MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化开发效率。

在开发单页面应用时，往往一个路由页面对应了一个脚本文件，所有的页面逻辑都在一个脚本文件里。页面的渲染、数据的获取，对用户事件的响应所有的应用逻辑都混合在一起，这样在开发简单项目时，可能看不出什么问题，如果项目变得复杂，那么整个文件就会变得冗长、混乱，这样对项目开发和后期的项目维护是非常不利的。

**（1）MVC**

MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 View 和 Model 应用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1500604/1603814137582-5a9aa62f-0045-4272-bef0-447dedb25596.png)

（2）MVVM

MVVM 分为 Model、View、ViewModel：

- Model 代表数据模型，数据和业务逻辑都在 Model 层中定义；
- View 代表 UI 视图，负责数据的展示；
- ViewModel 负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作；

Model 和 View 并无直接关联，而是通过 ViewModel 来进行联系的，Model 和 ViewModel 之间有着双向数据绑定的联系。因此当 Model 中的数据改变时会触发 View 层的刷新，View 中由于用户交互操作而改变的数据也会在 Model 中同步。

这种模式实现了 Model 和 View 的数据自动同步，因此开发者只需要专注于数据的维护操作即可，而不需要自己操作 DOM。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1500604/1603814104939-8c8ac923-735d-4476-937a-cb1f795ffe84.png)

**（3）MVP**

MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层的解耦。MVC 中的 Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层的接口暴露给了 Presenter 因此可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。
###  v-if、v-show、v-html 的原理

- v-if 会调用 addIfCondition 方法，生成 vnode 的时候会忽略对应节点，render 的时候就不会渲染；
- v-show 会生成 vnode，render 的时候也会渲染成真实节点，只是在 render 过程中会在节点的属性中修改 show 属性值，也就是常说的 display；
- v-html 会先移除节点下的所有节点，调用 html 方法，通过 addProp 添加 innerHTML 属性，归根结底还是设置 innerHTML 为 v-html 的值。
### data 为什么是一个函数而不是对象

JavaScript 中的对象是引用类型的数据，当多个实例引用同一个对象时，只要一个实例对这个对象进行操作，其他实例中的数据也会发生变化。

而在 Vue 中，更多的是想要复用组件，那就需要每个组件都有自己的数据，这样组件之间才不会相互干扰。

所以组件的数据不能写成对象的形式，而是要写成函数的形式。数据以函数返回值的形式定义，这样当每次复用组件的时候，就会返回一个新的 data，也就是说每个组件都有自己的私有数据空间，它们各自维护自己的数据，不会干扰其他组件的正常运行。
 ## keep-alive 
 https://fe.ecool.fun/topic/7cefdb7e-8b8a-429f-be44-45b346de6f3f?orderBy=updateTime&order=desc&titleKey=keep-alive
 Vue的keep-alive是一个抽象组件，它可以将动态组件缓存起来，以便在切换时不会重新渲染。其实现原理如下：

1. keep-alive组件在渲染时会创建一个缓存对象，用于存储已经渲染过的组件实例。
2. 在切换时，keep-alive组件会检查缓存对象中是否已经存在需要渲染的组件实例，如果存在，则直接从缓存中获取，否则会创建新的组件实例并将其缓存起来。
3. 当组件被缓存时，会触发activated生命周期钩子函数，当组件被销毁时，会触发deactivated生命周期钩子函数。
4. keep-alive组件提供了include和exclude两个属性，用于指定哪些组件需要被缓存，哪些不需要被缓存。
5. keep-alive组件还提供了max属性，用于限制缓存的组件实例数量，当超过限制时，会将最早缓存的组件实例删除。
   总之，Vue的keep-alive是通过缓存已经渲染过的组件实例来提高组件的渲染效率和性能。
   如果需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件

 keep-alive 如果面试问的话应该还是偏向如何实现的缓存吧。keep-alive用的是lru算法实现的缓存，每次重新回来的时候直接从缓存列表里面拿到之前的组件实例，有了实例之后patch阶段的时候就不会再去重新创建了

 keep-alive把组件缓存到什么内存堆中，因为存在map中
 this.cache是一个对象，用来存储需要缓存的组件，
 LRU （least recently used）缓存策略**

LRU 缓存策略 ∶ 从内存中找出最久未使用的数据并置换新的数据。

LRU（Least rencently used）算法根据数据的历史访问记录来进行淘汰数据，其核心思想是**"如果数据最近被访问过，那么将来被访问的几率也更高"**。 最常见的实现是使用一个链表保存缓存数据，详细算法实现如下 ∶

- 新数据插入到链表头部
- 每当缓存命中（即缓存数据被访问），则将数据移到链表头部
- 链表满的时候，将链表尾部的数据丢弃。

### Vue template 到 render 的过程

vue 的模版编译过程主要如下：**template -> ast -> render 函数**

vue 在模版编译版本的码中会执行 compileToFunctions 将 template 转化为 render 函数：

```javascript
// 将模板编译为render函数
const { render, staticRenderFns } = compileToFunctions(template,options//省略}, this)
```

CompileToFunctions 中的主要逻辑如下 ∶

**（1）调用 parse 方法将 template 转化为 ast（抽象语法树）**

```javascript
constast = parse(template.trim(), options)
```

- **parse 的目标**：把 tamplate 转换为 AST 树，它是一种用 JavaScript 对象的形式来描述整个模板。
- **解析过程**：利用正则表达式顺序解析模板，当解析到开始标签、闭合标签、文本的时候都会分别执行对应的 回调函数，来达到构造 AST 树的目的。

AST 元素节点总共三种类型：type 为 1 表示普通元素、2 为表达式、3 为纯文本

**（2）对静态节点做优化**

```javascript
optimize(ast,options)
```

这个过程主要分析出哪些是静态节点，给其打一个标记，为后续更新渲染可以直接跳过静态节点做优化

深度遍历 AST，查看每个子树的节点元素是否为静态节点或者静态节点根。如果为静态节点，他们生成的 DOM 永远不会改变，这对运行时模板更新起到了极大的优化作用。

**（3）生成代码**

```javascript
const code = generate(ast, options)
```

generate 将 ast 抽象语法树编译成 render 字符串并将静态部分放到 staticRenderFns 中，最后通过 ` new Function(`` render``) ` 生成 render 函数。

### Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

如果该属性没有被用到 template 中，就没有必要去更新视图，频繁这样性能不好。

在实例初始化过程中，利用`Object.defineProperty`对 data 中的属性进行数据监听，如果在 template 中被使用到的属性，就被 Dep 类收集起来，等到属性被更改时会调用`notify`更新视图。

怎么知道那些属性是在 template 被用到的呢？

这个问题很明显啊，defineProperty里有get方法，template里使用一次就会触发一次get，当然是get方法里收集

template 会被编译成render函数，函数执行的时候，访问什么变量，就出触发相应变量的get，然后才会添加watcher。



不会立即同步执行重新渲染。Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化， Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环 tick 中，Vue 刷新队列并执行实际（已去重的）工作。

###  vue 如何监听对象或者数组某个属性的变化

当在项目中直接设置数组的某一项的值，或者直接设置对象的某个属性值，这个时候，你会发现页面并没有更新。这是因为 Object.defineProperty()限制，监听不到变化。

解决方式：

- this.$set(你要改变的数组/对象，你要改变的位置/key，你要改成什么 value)

```javascript
this.$set(this.arr, 0, "OBKoro1"); // 改变数组
this.$set(this.obj, "c", "OBKoro1"); // 改变对象
```

- 调用以下几个数组的方法

```javascript
splice()、 push()、pop()、shift()、unshift()、sort()、reverse()
```

vue 源码里缓存了 array 的原型链，然后重写了这几个方法，触发这几个方法的时候会 observer 数据，意思是使用这些方法不用再进行额外的操作，视图自动进行更新。 推荐使用 splice 方法会比较好自定义,因为 splice 可以在数组的任何位置进行删除/添加操作

vm.`$set` 的实现原理是：

- 如果目标是数组，直接使用数组的 splice 方法触发相应式；
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）

###  Vue 模版编译原理

vue 中的模板 template 无法被浏览器解析并渲染，因为这不属于浏览器的标准，不是正确的 HTML 语法，所有需要将 template 转化成一个 JavaScript 函数，这样浏览器就可以执行这一个函数并渲染出对应的 HTML 元素，就可以让视图跑起来了，这一个转化的过程，就成为模板编译。模板编译又分三个阶段，解析 parse，优化 optimize，生成 generate，最终生成可执行函数 render。

- **解析阶段**：使用大量的正则表达式对 template 字符串进行解析，将标签、指令、属性等转化为抽象语法树 AST。
- **优化阶段**：遍历 AST，找到其中的一些静态节点并进行标记，方便在页面重渲染的时候进行 diff 比较时，直接跳过这一些静态节点，优化 runtime 的性能。
- **生成阶段**：将最终的 AST 转化为 render 函数字符串。
## 组件通信
1. props / $emit  父子组件传值
2. eventBus 事件总线（$emit / $on） **父子组件**、**非父子组件**等之间的通信
3. provide / inject   父子组件,祖孙组件
4. ref / $refs   父子组件
5. $parent / $children  父子组件
6. $attrs / $listeners  跨代通信
### 路由的 hash 和 history 模式的区别

Vue-Router 有两种模式：**hash 模式**和**history 模式**。默认的路由模式是 hash 模式。

#### 1. hash 模式

**简介：** hash 模式是开发中默认的模式，它的 URL 带着一个#，例如：http://www.abc.com/#/vue，它的hash值就是`#/vue`。

**特点**：hash 值会出现在 URL 里面，但是不会出现在 HTTP 请求中，对后端完全没有影响。所以改变 hash 值，不会重新加载页面。这种模式的浏览器支持度很好，低版本的 IE 浏览器也支持这种模式。hash 路由被称为是前端路由，已经成为 SPA（单页面应用）的标配。

**原理：** hash 模式的主要原理就是**onhashchange()事件**：

```javascript
window.onhashchange = function(event){
    console.log(event.oldURL, event.newURL);
    let hash = location.hash.slice(1);
}
```

使用 onhashchange()事件的好处就是，在页面的 hash 值发生变化时，无需向后端发起请求，window 就可以监听事件的改变，并按规则加载相应的代码。除此之外，hash 值变化对应的 URL 都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退。虽然是没有请求后端服务器，但是页面的 hash 值和对应的 URL 关联起来了。

#### 2. history 模式

**简介：** history 模式的 URL 中没有#，它使用的是传统的路由分发模式，即用户在输入一个 URL 时，服务器会接收这个请求，并解析这个 URL，然后做出相应的逻辑处理。

**特点：** 当使用 history 模式时，URL 就像这样：http://abc.com/user/id。相比hash模式更加好看。但是，history模式需要后台配置支持。如果后台没有正确配置，访问时会返回404。

**API：** history api 可以分为两大部分，切换历史状态和修改历史状态：

- **修改历史状态**：包括了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()` 方法，这两个方法应用于浏览器的历史记录栈，提供了对历史记录进行修改的功能。只是当他们进行修改时，虽然修改了 url，但浏览器不会立即向后端发送请求。如果要做到改变 url 但又不刷新页面的效果，就需要前端用上这两个 API。
- **切换历史状态：** 包括`forward()`、`back()`、`go()`三个方法，对应浏览器的前进，后退，跳转操作。

虽然 history 模式丢弃了丑陋的#。但是，它也有自己的缺点，就是在刷新页面的时候，如果没有相应的路由或资源，就会刷出 404 来。

如果想要切换到 history 模式，就要进行以下配置（后端也要进行配置）：

```
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

#### 3. 两种模式对比

调用 history.pushState() 相比于直接修改 hash，存在以下优势:

- pushState() 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改 # 后面的部分，因此只能设置与当前 URL 同文档的 URL；
- pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
- pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中；而 hash 只可添加短字符串；
- pushState() 可额外设置 title 属性供后续使用。
- hash 模式下，仅 hash 符号之前的 url 会被包含在请求中，后端如果没有做到对路由的全覆盖，也不会返回 404 错误；history 模式下，前端的 url 必须和实际向后端发起请求的 url 一致，如果没有对用的路由处理，将返回 404 错误。

hash 模式和 history 模式都有各自的优势和缺陷，还是要根据实际情况选择性的使用。


### 4. $route 和$router 的区别
route和router在Vue.js中都是与路由相关的对象

1.  $route：$route 是一个当前路由信息的对象，包括当前 URL 路径、查询参数、路径参数等信息。$route 对象是只读的，不可以直接修改其属性值，而需要通过路由跳转来更新。
1.  $router：$router 是 Vue Router 的实例对象，包括了许多用于导航控制和路由操作的 API，例如 push、replace、go、forward 等方法。$router 可以用来动态地改变 URL，从而实现页面间的无刷新跳转。

因此，$route 和 $router 在功能上有所不同，$route 主要用于获取当前路由信息，$router 则是用于进行路由操作，例如跳转到指定的路由、前进、后退等。通常来说，$route 和 $router 是紧密关联的，并且常常一起使用。



- $route:  $route 是一个当前路由信息的对象，包括当前 URL 路径、查询参数、路径参数等信息。$route 对象是只读的，不可以直接修改其属性值，而需要通过路由跳转来更新。

- $router:  $router 是 Vue Router 的实例对象，包括了许多用于导航控制和路由操作的 API，例如 push、replace、go、forward 等方法。$router 可以用来动态地改变 URL，从而实现页面间的无刷新跳转。

总的来说，$route 和 $router 在功能上有所不同，$route 主要用于获取当前路由信息，$router 则是用于进行路由操作，例如跳转到指定的路由、前进、后退等。通常来说，$route 和 $router 是紧密关联的，并且常常一起使用。


- $router常用的跳转连接的方法：
  `//使用字符串的形式 不带参数`
  `this.$router.push("/login");`
  `//使用对象的形式 不带参数`
  `this.$router.push({ path:"/login" });`
  `//使用对象的形式，参数为地址栏上的参数`
  `this.$router.push({ path:"/login",query:{username:"jack"} });` 
  `使用对象的形式 ，参数为params 不会显示在地址栏`
  `this.$router.push({ name:'user' , params: {id:123} });`

- $route主要的属性有：
  this.$route.path 字符串，等于当前路由对象的路径，会被解析为绝对路径，如/home/ews

  this.$route.params 对象，包含路由中的动态片段和全匹配片段的键值对，不会拼接到路由的url后面

  this.$route.query 对象，包含路由中查询参数的键值对。会拼接到路由url后面

  this.$route.router 路由规则所属的路由器

  this.$route.name 当前路由的名字，如果没有使用具体路径，则名字为空

## 虚拟 DOM 
