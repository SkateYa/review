
```

```
目录
*****
[TOC]
*****
# vue常见源码
### vue切换主题颜色？
```javascript
//主题颜色的设置
const setColor = ()=>{
   //通知js修改根节点的样式对象的属性与属性值
   const html = document.documentElement;
   html.style.setProperty('--el-color-primary',color.value);
}
```

### 一套深色，一套浅色，如何配置的
2. 使用CSS类切换
另一种方法是直接在Vue组件上切换CSS类。你可以定义两套CSS类，一套用于浅色主题，一套用于深色主题，然后通过改变元素的类来切换主题。
```css
css
.light-theme {  
  /* 浅色主题样式 */  
}  
  
.dark-theme {  
  /* 深色主题样式 */  
}
```
```vue
vue
<template>  
  <div :class="['theme', currentTheme]">  
    <!-- 页面内容 -->  
  </div>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      currentTheme: 'light' // 默认浅色主题  
    };  
  },  
  methods: {  
    toggleTheme() {  
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';  
    }  
  }  
};  
</script>
```
在这个例子中，:class="['theme', currentTheme]"会根据currentTheme的值动态地为元素添加light-theme或dark-theme类。
### 暗黑模式的切换
```javascript
//switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
    //获取HTML根节点
    let html = document.documentElement;
    //判断HTML标签是否有类名dark
    dark.value ? html.className = 'dark' : html.className = '';
}
```
### 数据大屏适配
1、**vw/vh**：就是按照设计稿的尺寸，将px按比例计算转为vw和vh（可以使用插件，但是这样实现的效果和rem差不多），然后对每个图表都需要单独做字体、间距、位移的适配。
它的优点是：
1.可以动态计算图表的宽高，字体等，灵活性较高
2.当屏幕比例跟 ui 稿不一致时，不会出现两边留白情况。
它的缺点是：
需要计算，字体不支持vw
每个图表都需要单独做字体、间距、位移的适配，比较麻烦。

2、**scale**：它是通过 scale 属性，根据屏幕大小，对图表进行整体的等比缩放。
优点是：
1.代码量少，适配简单。
2.一次处理后不需要在各个图表中再去单独适配。
缺点是：
1.因为是根据 ui 稿等比缩放，当大屏跟 ui 稿的比例不一样时，会出现周边留白情况
2.当缩放比例过大时候，字体会有一点点模糊。
3.当缩放比例过大时候，事件热区会偏移。

### scale解决大屏适配
https://blog.csdn.net/qq_40596257/article/details/131536473

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100vw;
            height: 100vh;
            background: url(./bg.png) no-repeat;
            background-size: cover;
        }

        .box {
            position: fixed;
            width: 1920px;
            height: 1080px;
            background: red;
            transform-origin: left top;
            left: 50%;
            top: 50%;
        }

        .top {
            width: 100px;
            height: 100px;
            background: hotpink;
            margin-left: 50px;
        }

        .bottom {
            width: 100px;
            height: 100px;
            background: skyblue;
            margin-left: 50px;
            margin-top: 100px;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- 数据展示的区域 -->
        <div class="box">
            <div class="top">我是祖国的</div>
            <div class="bottom">老花骨朵</div>
        </div>
    </div>
</body>

</html>
<script>
    //控制数据大屏放大与缩小
    let box = document.querySelector('.box');
    box.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
    //计算缩放的比例啦
    // 谁小用谁的比例，大的可以调节，保持整个比例不变
    function getScale(w = 1920, h = 1080) {
        const ww = window.innerWidth / w;
        const wh = window.innerHeight / h;
        return ww < wh ? ww : wh;
        //ww<wh情况: 1920/1920(ww)   1080/1080(wh)
        //ww>wh情况:1920/1920(ww)   1080/1080(wh)
    }

    window.onresize = () => {
        box.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
    }

</script>
```
### provide inject原理
provide就是把值放置到当前实例上
inject就是把当前需要的属性, 去父组件上查找出来定义在自己身上

provide 和 inject 主要在开发高阶插件/组件库时使用
缺点：数据来源不明确，重名问题
### v-model实现原理：
1.v-bind绑定响应式数据；
2.通过oninput触发事件获取当前$event.target.value，然后赋值给当前变量。
### SPA
SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

**优点：**

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
- 基于上面一点，SPA 相对对服务器压力小；
- 前后端分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
- 具有桌面应用的即时性、网站的可移植性和可访问性

**缺点：**

- 首次渲染速度相对较慢， 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
- SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。
- 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；

### SEO

SEO主要分为内部和外部两个方向。

一、内部优化
Meta标签优化：例如：title，keywords，description （TDK）等的优化
内部链接的优化，包括相关性链接（Tag 标签），锚文本链接，各导航链接，及图片链接
网站内容更新：每天保持站内的更新(主要是文章的更新等)
服务器端渲染（SSR）
二、外部优化
外部链接类别：博客、论坛、B2B、新闻、分类信息、贴吧、知道、百科、相关信息网等尽量保持链接的多样性
外链运营：每天添加一定数量的外部链接，使关键词排名稳定提升。
外链选择：与一些和你网站相关性比较高,整体质量比较好的网站交换友情链接,巩固稳定关键词排名

### 提升vue SEO
vue seo不太友好，ssr优化也不能得到太大提升，有没有一些其他技术手段来实现
1. 使用 vue-server-renderer 进行服务端渲染 (SSR)。
2. 使用 prerender-spa-plugin 对静态内容进行预渲染。
3. 使用 vue-meta 管理应用中的 <meta> 标签，确保每个页面都有适当的描述、关键词和标题。
4. 使用 vue-seo-friendly 插件来自动管理页面的 SEO 信息。
### 使用过 Vue SSR 吗？说说 SSR

SSR 也就是服务端渲染，也就是将 Vue 在客户端把标签渲染成 HTML 的工作放在服务端完成，然后再把 html 直接返回给客户端。
**优点：**
 SSR 有着更好的 SEO、并且首屏加载速度更快
**缺点：**
开发条件会受到限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Node.js 的运行环境。
服务器会有更大的负载需求

Vue 使用nuxt.js

react 使用next.js

### 单页面和多页面的区别

一、多页应用

1. 每一次页面跳转的时候，后台服务器都会给返回一个新的html文档，这种类型的网站也就是多页网站，也叫做多页应用
   优点：首屏时间快，SEO效果好
   缺点：页面切换慢（ 因为每次跳转都需要发出一个http请求，如果网络比较慢，在页面之间来回跳转时，就会发现明显的卡顿。）

2. 为什么多页应用的首屏时间快？
   首屏时间叫做页面首个屏幕的内容展现的时间，当我们访问页面的时候，服务器返回一个html，页面就会展示出来，这个过程只经历了一个HTTP请求，所以页面展示的速度非常快。

3. 为什么搜索引擎优化效果好（SEO）？
   搜索引擎在做网页排名的时候，要根据网页内容才能给网页权重，来进行网页的排名。搜索引擎是可以识别html内容的，而我们每个页面所有的内容都放在Html中，所以这种多页应用，seo排名效果好

二、 单页应用

1. 第一次进入页面的时候会请求一个html文件，刷新清除一下。切换到其他组件，此时路径也相应变化，但是并没有新的html文件请求，页面内容也变化了。

2. 原理是：JS会感知到url的变化，通过这一点，可以用js动态的将当前页面的内容清除掉，然后将下一个页面的内容挂载到当前页面上，这个时候的路由不是后端来做了，而是前端来做，判断页面到底是显示哪个组件，清除不需要的，显示需要的组件。这种过程就是单页应用，每次跳转的时候不需要再请求html文件了。

3. 优点：页面切换快
   页面每次切换跳转时，并不需要做html文件的请求，这样就节约了很多http发送时延，我们在切换页面的时候速度很快。

4. 缺点： 首屏时间慢，SEO差
   单页应用的首屏时间慢，首屏时需要请求一次html，同时还要发送一次js请求，两次请求回来了，首屏才会展示出来。相对于多页应用，首屏时间慢。
   **SEO效果差，因为搜索引擎只认识html里的内容，不认识js的内容，而单页应用的内容都是靠js渲染生成出来的，搜索引擎不识别这部分内容，也就不会给一个好的排名，会导致单页应用做出来的网页在百度和谷歌上的排名差。**

### 用户鉴权

用户鉴权是确保只有经过验证和授权的用户才能访问特定资源或执行特定操作的过程。以下是一个基本的用户鉴权实现步骤：

1. **用户注册与登录**：
  - 用户注册：用户首次使用系统时，需要创建一个账户。这通常涉及提供用户名、密码、电子邮件地址等信息。系统将这些信息存储在数据库中，并为该用户生成一个唯一的用户ID。
  - 用户登录：用户输入用户名和密码，系统验证这些信息是否与数据库中的记录匹配。如果匹配成功，系统生成一个认证令牌（如JWT、Session ID等），并将其发送给用户。
2. **令牌存储与传输**：
  - 客户端（如浏览器或移动应用）在接收到令牌后，应将其安全地存储起来。对于Web应用，通常使用浏览器的localStorage或cookie来存储令牌。
  - 在后续的请求中，客户端应在HTTP请求的头部（如`Authorization`头）中包含这个令牌，以便服务器验证用户的身份。
3. **服务器验证令牌**：
  - 当服务器接收到包含令牌的请求时，它会验证令牌的有效性和真实性。这通常涉及检查令牌的签名、过期时间以及是否与数据库中的记录匹配。
  - 如果令牌有效，服务器将允许该请求继续执行，并根据用户的权限执行相应的操作。
4. **权限管理**：
  - 在系统中定义不同的角色和权限。例如，管理员可能有权限访问所有功能，而普通用户只能访问部分功能。
  - 将角色和权限关联到用户。这可以在用户注册或登录时完成，也可以根据业务需求动态调整。
  - 在服务器端实现权限检查机制。当接收到请求时，服务器应检查用户的角色和权限，以确定是否允许执行该请求。
5. **令牌刷新与过期**：
  - 令牌通常有一个过期时间，以确保即使令牌被泄露，攻击者也只能在有限的时间内使用它。
  - 当令牌过期时，客户端需要重新获取令牌。这可以通过刷新令牌机制实现，即客户端使用一个长期有效的刷新令牌来获取新的访问令牌。
6. **安全性考虑**：
  - 使用HTTPS来传输所有敏感数据，包括用户凭据和令牌，以防止中间人攻击。
  - 对密码进行哈希处理并加盐存储，以防止密码泄露。
  - 定期检查并更新依赖库和框架，以修复已知的安全漏洞。
  - 遵循最佳实践来管理令牌的生命周期和存储方式，以防止令牌泄露或被滥用。

请注意，这只是一个基本的用户鉴权实现流程。在实际应用中，根据业务需求和安全要求，可能需要进行更复杂的设置和优化。
### vuex存储和本地存储(localstorage、sessionstorage)的区别

1.  区别：

*   vuex存储在内存，
*   localstorage（本地存储）则以文件的方式存储在本地(硬盘),永久保存；
*   sessionstorage( 会话存储 ) ,临时保存。localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理

1.  应用场景：

*   vuex用于组件之间的传值，
*   localstorage，sessionstorage则主要用于不同页面之间的传值。

1.  永久性：当刷新页面（这里的刷新页面指的是 --> F5刷新,属于清除内存了）时vuex存储的值会丢失，sessionstorage页面关闭后就清除掉了，localstorage不会。
2.  注：很多同学觉得用localstorage可以代替vuex, 对于不变的数据确实可以，但是当两个组件共用一个数据源（对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，localstorage，sessionstorage无法做到，原因就是区别1。

### ABAC权限
### setup 
setup 执行时机是在 beforeCreate 之前执行，
### Vue.set 方法原理

vue.$set 的实现原理是：
如果目标是数组，直接使用数组的 splice 方法触发响应式；
如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）

###  Vue.extend 作用和原理

Vue.extend 是 Vue.js 提供的一个全局 API，用于扩展 Vue 组件。它的主要作用是创建一个可以被多次使用的组件构造器，这个构造器可以像普通组件一样使用，并且可以在多个地方实例化该组件。

Vue.extend 的实现基于 JavaScript 的原型链。当我们使用 Vue.extend 来扩展 Vue 构造函数时，实际上是创建了一个新的构造函数，这个新的构造函数继承了 Vue 的原型方法，并可以添加新的属性或方法。这样，我们就可以通过新的构造函数创建 Vue 实例，并使用这些新增的功能。

具体来说，Vue.extend 的使用方式是在 Vue 中调用 Vue.extend 方法，并传入一个包含属性或方法的选项对象。这个选项对象定义了组件的行为和外观，包括数据、模板、生命周期钩子等。Vue.extend 会返回一个基于这些选项的新组件构造器。

在 Vue 2 中，Vue.extend 常用于在父组件内部创建一个子组件，这种子组件是局部的，只能在对应的父组件中使用。与之相对的是 Vue.component 方法，它是一个全局方法，用于注册全局组件，这些组件可以在应用程序的任何地方使用。

总结来说，Vue.extend 的主要作用是扩展 Vue 组件，通过创建一个新的组件构造器来实现组件的复用和扩展。其原理基于 JavaScript 的原型链，通过继承 Vue 的原型并添加新的属性或方法来创建新的构造函数。

### vue3响应式原理
我们都知道在vue3中主要是采取的ES6中的Proxy来进行数据的代理，通过reffect反射来实现动态的数据响应式，Vue3数据的更新是proxy配合Reffect来实现的

通过Proxy（代理）： 拦截对象中任意属性的变化，属性值的读写，属性的增加，属性的删除等。
通过Reffect（反射）： 对源对象的属性进行操作

- 调用 reactive() 返回一个 Proxy 代理对象，并劫持对象的 get 与 set 操作
- 调用 effect() 方法时，会访问属性 state.counter，此时会触发 proxy 的 get 操作。
- get 方法会调用 track() 进行依赖收集；建立一个对象（state）、属性（counter）、effect 副作用函数的依赖关系；
- set 方法会调用 trigger() 进行依赖更新；通过对象（state）与属性（coutner）找到对应的 effect 副作用函数，然后重新执行。

### vue 和react 的区别或者异同点

相同点：

1、react和vue都支持服务端渲染

2、都有虚拟DOM，组件化开发，通过props传参进行父子组件数据的传递

3、都是数据驱动视图，即当数据发生变化时，视图会自动更新。

4、都有支持 **跨平台移动开发 **工具的方案（react的react native，vue的weex）

5、都有状态管理（react有redux，vue有vuex）

6、都有自己的构建工具：`Vue`的`vue-cli`、`React`的`Create React App`

不同点：

1、react严格上只能算是MVC的view层，vue则是MVVM模式

2、diff算法不同。`react`主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。`Vue` 使用双向指针，边对比，边更新DOM

2、虚拟DOM不一样，vue会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树

而对于react而言，每当应用的状态被改变时，全部组件都会重新渲染，所以react中会需要shouldComponentUpdate这个生命周期函数方法来进行控制

3、组件写法不一样，react推荐的做法是JSX+inline style,也就是把HTML和CSS全都写进javaScript了，vue是采用webpack + vueloader单文件组件格式，html, js, css同一个文件

4、数据绑定：vue实现了数据的双向绑定，react数据流动是单向的（Vue使用双向数据绑定，即视图和数据可以互相影响。当数据变化时，视图会自动更新；反之，视图的变化也会反映到数据中。而React则使用单向数据流，数据从父组件流向子组件，子组件通过props接收数据，不能直接修改父组件的数据。如果需要更新数据，需要通过事件回调通知父组件。）

5、state对象在react应用中是不可变的，需要使用setState方法更新状态

6、组件化通信的不同。`react`中我们通过使用回调函数来进行通信的，而`Vue`中子组件向父组件传递消息有两种方式：事件和回调函数

在vue中，state对象不是必须的，数据有data属性在vue对象中管理

### vue2和vue3的区别*
vue2 的双向数据綁定是利用ES5的一个 API， Object.defineProperty()对数据进行劫持,结合发布订阅模式的方式来实现的。

vue3 中便用了 ES6 的 ProxyAPI对数据代理，通过 reactive()函数给每一个对象都包一层 Proxy，通过 Proxy 监听属性的变化，从而实现对数据的监控。

这里是相比于vue2版本，使用proxy的优势如下

1. defineProperty只能监听某个属性，不能对全对象监听可以省去for in、闭包等內容来提升效本（直接绑定整个对象即可）
2. 可以监听数组，不用再去单独的对数组做特异步操作，通过Proxy可以直接拦截所有对象类型数据的操作，完美支持对数组的监听。

Vue2 中new出的实例对象，所有的东西都在这个vue对象上，这样其实无论你用到还是没用到，都会跑一遍，这样不仅提高了性能消耗，也无疑增加了用户加载时间。

而vue3.0中可以用ES module imports按需引入，如：keep-alive内置组件、v-mode/指令，等等，不仅我们开发起来更加的便捷，减少了内存消耗，也同时减少了用户加载时间，优化用户体验。

一、用组合式api替换选项式api，方便逻辑更加的聚合
二、一些细节改变
具体细节：
1. 因为改成组合式api所以没有this
2. 生命周期没有creat，setup等同于create，卸载改成unmount
3. vue3中v-if高于v-for的优先级
4. 根实例的创建从new app变成了createApp方法
5. 一些全局注册，比如mixin，注册全局组件，use改成了用app实例调用，而不是vue类调用
6. 新增了传送门teleport组件
7. template模板可以不包在一个根div里

三、响应式原理改成了用proxy，解决了数组无法通过下标修改，无法监听到对象属性的新增和删除的问题。也提升了响应式的效率
深入回答：vue3并不是完全抛弃了defineProperty，通过reactive定义的响应式数据使用proxy包装出来，而ref还是用的defineProperty去给一个空对象，定义了一个value属性来做的响应式

四、支持按需引入，可以更好tree-shaking

五、性能优化，增加了静态节点标记。会标记静态节点，不对静态节点进行比对。从而增加效率
深入回答：文本内容为变量会标记为1，属性为动态会标记为2，如果静态则不标记跳过比对
进阶回答点：
1. vue3不推荐使用mixin进行复用逻辑提取，而是推荐写成hook
2. v-model应用于组件时，监听的事件和传递的值改变
//vue2 value 监听 change/input事件
//vue3- modelValue 监听update:modelValue
3. ts更好地配合

### vue2和vue3响应式有什么区别*
Vue 2和Vue 3在响应式原理上存在显著的差异，这主要体现在它们底层实现的方式和性能上。

- Vue 2的响应式原理主要依赖于Object.defineProperty。监听属性值，Vue 2会通过递归的形式遍历data选项的所有property

- Vue 3的响应式原理则基于ES6的Proxy对象和Reffect（反射），Vue 3 的响应式系统和依赖收集确实采用了惰性机制，。在 Vue 3 中，只有当组件真正访问到某个属性时，该属性才会被代理和收集依赖，而不是在初始化阶段就全部代理和收集。这种惰性机制可以提高性能，因为不是所有的属性都会被用到，所以不必一开始就为所有属性创建代理和收集依赖。

总的来说，Vue 3的响应式系统相较于Vue 2更为先进和高效，主要体现在以下几个方面：

- Vue 3使用Proxy替代了Vue 2的Object.defineProperty，使得对对象的修改、添加、删除任意属性都能被监测到，从而实现了更全面的响应式。

- Vue 3的响应式系统能够直接通过数组下标修改数组，并自动更新视图，而Vue 2则需要通过特定的方法（如this.$set）来实现。

- Vue 3的响应式系统对深层次的响应式数据有更好的处理，无需像Vue 2那样通过递归的形式去实现。
  这些改进使得Vue 3在处理复杂数据结构和操作时更为高效，同时也提供了更好的开发体验。

  ### proxy 相对 Object.defineProperty 优点有哪些

  vue2 利用 Object.defineProperty 来劫持 data 数据的 getter 和 setter 操作，使得 data 在被访问或赋值时，动态更新绑定的 template 模板。而 Object.defineProperty 必须遍历所有的预值才能劫持每一个属性，这一缺点正好能够被 proxy 解决。

  - Object.defineProperty只能劫持对象的属性， 而 Proxy 是直接代理对象
  - 由于Object.defineProperty只能劫持对象属性，需要遍历对象的每一个属性，如果属性值也是对象，就需要递归进行深度遍历。但是 Proxy 直接代理对象， 不需要遍历操作
  - Object.defineProperty对新增属性需要手动进行Observe
  - 因为Object.defineProperty劫持的是对象的属性，所以新增属性时，需要重新遍历对象， 对其新增属性再次使用Object.defineProperty进行劫持。也就是 Vue2.x 中给数组和对象新增属性时，需要使用$set才能保证新增的属性也是响应式的, $set内部也是通过调用Object.defineProperty去处理的。


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
### vue3的proxy的依赖收集是惰性机制
惰性代理与依赖收集

1. 初始化阶段
   - 当创建 Vue 组件时，Vue 3 会遍历组件的 `data`、`computed`、`props` 等选项，并使用 `reactive` 函数将它们转换为响应式对象。
   - `reactive` 函数内部使用 `Proxy` 来创建响应式代理。但此时并不会立即为对象的每个属性都创建代理。
2. 属性访问阶段
   - 当组件的模板或计算属性等访问响应式对象的某个属性时，会触发 `Proxy` 的 `get` 陷阱。
   - 在 `get` 陷阱中，Vue 3 会检查该属性是否已经被代理过。如果没有，则创建一个代理，并将当前的 effect（例如组件的渲染函数或计算属性）作为依赖收集起来。
   - 这样，当这个属性的值在未来发生变化时，Vue 就能知道需要通知哪些依赖进行更新。
3. 属性赋值阶段
   - 当尝试修改响应式对象的某个属性时，会触发 `Proxy` 的 `set` 陷阱。
   - 在 `set` 陷阱中，Vue 3 会执行实际的赋值操作，并通知所有依赖这个属性的 effect 进行更新

**Vue 3 的响应式系统和依赖收集通过 `Proxy` 的惰性机制实现了高效的属性代理和依赖收集。只有当属性真正被访问或修改时，Vue 3 才会为它们创建代理和收集依赖。这种机制避免了不必要的计算和内存消耗，提高了 Vue 应用的性能。**

### 发布订阅和观察者有什么区别
**发布订阅**基于一个事件中心，接收通知的对象是订阅者，需要先订阅某个事件，触发事件的对象是发布者，发布者通过触发事件，通知各个订阅者。
**观察者**目标者对象 和 观察者对象 有相互依赖的关系，观察者对某个对象的状态进行观察，如果对象的状态发生改变，就会通知所有依赖这个对象的观察者进行更新操作。

- 观察者模式里，只有两个角色：观察者 和 目标者（也可以叫被观察者）。其中 被观察者 是重点。
- 发布订阅模式里，不仅仅只有 发布者 和 订阅者，还有一个 事件中心。其中 事件中心 是重点。
- 观察者模式相比发布订阅模式少了个 事件中心 。

总的来说，发布订阅模式和观察者模式的主要区别在于它们处理消息的方式以及组件之间的耦合程度。发布订阅模式通过消息代理实现消息的发布和订阅，使得组件之间的耦合更为松散，并且通常是异步的；而观察者模式则是直接在被观察者和观察者之间进行通信，耦合程度相对较高，且通常是同步的。

在选择使用哪种模式时，需要根据具体的应用场景和需求来决定。如果需要实现跨应用的消息传递或需要更松散的组件耦合，发布订阅模式可能更为合适。而如果需要在单个应用程序地址空间内实现同步的状态更新，那么观察者模式可能更为适合。

### Vue 3 expose 函数

在 Vue 3 中，expose 函数是 Composition API 的一部分，特别是在 <script setup> 语法糖中。在 <script setup> 中，你不需要显式地声明组件的 setup 函数，因为 Vue 会为你自动处理。但如果你需要在 <template> 中访问在 <script setup> 中定义的响应式状态或方法，你通常需要使用 ref 或 reactive 来创建它们，并使用 defineExpose 或 expose 函数来显式地暴露它们。

然而，从 Vue 3.2 开始，<script setup> 提供了一种更简洁的方式来自动暴露响应式状态和方法，即不需要显式调用 defineExpose 或 expose。当你在 <script setup> 中定义变量或函数时，它们会自动成为组件的公开属性，可以直接在 <template> 中使用。

虽然 expose 函数在 Vue 3 的早期版本中用于在 <script setup> 中显式暴露属性和方法，但在后续版本中，由于自动暴露的特性，它的使用变得不那么必要了。因此，在大多数情况下，你不需要直接使用 expose 函数，除非你有特定的需求或在使用非 <script setup> 的语法。

### vue如何重写数组的方法
vue通过原型拦截的方式重写了数组的7个方法，首先获取到这个数组的Observer。如果有新的值，就调用observeArray对新的值进行监听，然后调用notify，通知render watcher，执行update

核心：arrayMethods 首先继承了 Array，然后对数组中所有能改变数组自身的方法，如 push、pop 等这些方法进行重写。重写后的方法会先执行它们本身原有的逻辑，并对能增加数组长度的 3 个方法 push、unshift、splice 方法做了判断，获取到插入的值，然后把新添加的值变成一个响应式对象，并且再调用 ob.dep.notify() 手动触发依赖通知，这就很好地解释了之前的示例中调用 vm.items.splice(newLength) 方法可以检测到变化。

从上面可以看出array.js中重写了数组的push、pop、shift、unshift、splice、sort、reverse七种方法，重写方法在实现时除了将数组方法名对应的原始方法调用一遍并将执行结果返回外，还通过执行ob.dep.notify()将当前数组的变更通知给其订阅者，这样当使用重写后方法改变数组后，数组订阅者会将这边变化更新到页面中。

具体来说，当调用重写的数组方法时，Vue 会执行以下步骤：

1.调用原始的数组方法，例如 push()、pop()、splice() 等。

2.在执行数组方法后，Vue 检测到数组发生了变化。

3.Vue 发出通知，触发视图的重新渲染，确保视图与数据保持同步。

这种重写机制使得开发者在操作数组时无需手动去触发视图更新，Vue 自动为你处理了这部分逻辑。

说明：这些重写仅适用于通过 Vue 实例声明的数组。如果你直接使用原生的数组方法，Vue 将无法捕获到变化，可能导致视图不更新

### vue常用修饰符
**一、事件修饰符**
　　1、.stop：阻止事件冒泡
　　2、.prevent：阻止默认事件的触发
　　3、.once：点击事件只会触发一次
　　4、.passive：指示浏览器不要阻止事件的默认行为。立即触发默认行为,
        5、.self：只在事件在该元素本身触发时触发事件处理程序
        6、.native：监听组件根元素的原生事件（让组件变成像 html 内置标签那样监听根元素的原生事件，否则组件上使用 v-on 只会监听自定义事件）
         7、.capture：使用事件捕获模式
**二、按键修饰符**
　　1、@keyup：键盘抬起
　　2、@keydown：键盘按下
　　3、按键码：在键盘修饰符后面添加.xxx，用于监听按了哪个键
　　常用按键码：.enter，.tab，.delete，.esc，.up，.down，.space等。
**三、表单修饰符**
　　1、.lazy：在表单输入时不会马上显示在页面，而是等输入完成失去焦点时才会显示；
　　2、.trim：过滤表单输入时两边的空格；
　　3、.number：限制输入数字或将输入的数据转为数字
**四、系统修饰键**
      1、.ctrl
      2、.alt
      3、.shift
      4、.meta
**五、鼠标按键修饰符**
　　.left，.right，.middle

### vue指令

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
### vue的性能优化
第三方插件按需引入
路由懒加载
keep-alive缓存页面
事件的销毁
v-for 遍历避免同时使用 v-if
使用 v-show 复用 DOM

### vue2组件传参的方式
<https://segmentfault.com/a/1190000019208626>
```
props/$emit   父子组件的通信
parent/children   父子组件的通信
ref     父子组件的通信
EventBus  兄弟组件通信
provide/inject  祖孙与后代组件通信
$attrs 与$listeners  祖孙与后代组件通信
vuex 任意组件通信
```
传递剩余属性：当父组件向子组件传递了大量属性，而子组件只需要关心其中的一部分时，可以使用 $attrs 来自动绑定剩余的属性。这样，子组件不需要显式声明所有从父组件继承的属性，提高了代码的简洁性和可维护性。

高阶组件：在创建高阶组件（接受其他组件作为参数，并返回新组件的组件）时，$attrs 可以帮助确保高阶组件不会改变其内部组件的 prop 签名。高阶组件可以简单地将其 $attrs 传递给内部组件，从而实现属性的透明传递。

跨级属性传递：在复杂的组件树中，有时需要将属性从顶层组件传递到深层嵌套的子组件。使用 $attrs 可以避免在中间的每个组件中显式声明和传递这些属性，简化了跨级组件间的通信
### computed和watch
1. computed 的特点
（1）支持缓存，默认走缓存，多次调用，只会执行一次计算。只有依赖的数据发生改变，才会重新计算；
（2）不支持异步，如果有异步操作，无法监听；
（3）属性值为函数，默认使用get方法，当数据改变时，会调用set方法；
（4）主要解决模版中放入过多的逻辑导致不好维护的问题；
（5）底层借助了Objcet.defineproperty方法提供的getter和setter。
计算属性不在 data 中，它是基于data 或 props 中的数据通过计算得到的一个新值，这个新值根据已知值的变化而变化；

2. watch 的特点
（1）不支持缓存，只要数据发生变化，就会触发相应的操作；
（2）支持异步监听；
（3）接收两个参数，第一个是最新值，第二个是之前的值；
（4）还有两个其他参数：deep：默认false，深度监听，immediate：默认false，初始化时执行回调函数；
   (5)可以监听的数据来源：data，props，computed内的数据；

3. 总结
（1）computed计算属性，他依赖其他属性值，有缓存，只有依赖的值发生变化才会去重新计算，但是不能异步；
（2）watch监听，监听数据的变化，无缓存，数据变化就会执行回调，可以异步；


### key的原理
  面试题：react、vue中的key有什么作用？（key的内部原理）

1. 虚拟DOM中key的作用：  

	key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：    
2. 对比规则：  

    (1).旧虚拟DOM中找到了与新虚拟DOM相同的key     
         ①.若虚拟DOM中内容没变,直接使用之前的真实DOM！   
         ②.若虚拟DOM中内容变了,则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
    
    (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
        创建新的真实DOM，随后渲染到到页面。    
3. 用index作为key可能会引发的问题：

    (1). 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
    会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

    (2) 如果结构中还包含输入类的DOM：会产生错误DOM更新 ==> 界面有问题。
   
4. 开发中如何选择key?  
    1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值

    2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。


### vue和jquery的区别
jQuery 是一个非常流行的JavaScript库，它专注于提供强大且简洁的API来操作DOM。jQuery的核心思想是通过选择器来查找和操作DOM元素。开发人员可以使用jQuery的API来轻松地添加、删除和修改元素，以及处理事件和动画效果。jQuery使用的是基于对象的编程风格，它提供了一种更现代化的方法来编写JavaScript代码，但可能需要更长的代码来处理复杂的应用程序。

Vue 是一个完整的JavaScript框架，它更关注整个应用程序的架构和数据管理。Vue提供了一种响应式的数据绑定机制，可以自动更新页面上的内容，而不需要手动操作DOM。Vue还支持组件化开发，允许开发人员将单个模块拆分为独立的可重用组件，以简化代码的维护和复用。Vue还提供了一套丰富的工具和生态系统，可以帮助开发人员构建复杂的交互式应用程序。Vue的学习曲线相对较陡峭，尤其是对于初学者来说，它具有其自己的语法和概念，如指令、计算属性和生命周期钩子。Vue通过双向数据绑定把View层和Model层连接了起来，通过对数据的操作就可以完成对页面视图的渲染。

总结来说，jQuery和Vue的主要区别在于它们的设计理念和使用方式。jQuery专注于操作DOM元素，而Vue则更注重数据管理和视图更新。jQuery的代码可能更加直观和易于上手，而Vue则提供了更强大的功能和更现代化的编程方式。

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
### 虚拟dom树变成真实dom树是在哪个生命周期
发生在beforeMount和mounted之间和beforeUpdate和updated

### Vue你的接口请求一般放在哪个生命周期

可以在**created**、**beforeMount**、**mounted **中进行调用，因为在这三个钩子函数中，**data 已经创建，可以将服务端端返回的数据进行赋值。**

但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

能更快获取到服务端数据，减少页面loading 时间；

ssr不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

### 虚拟DOM 
虚拟DOM，描述元素和元素之间的关系，创建一个JS对象
如果组件内有响应的数据，数据发生改变的时候，render函数会生成一个新的虚拟DOM，这个新的虚拟DOM会和旧的虚拟 DOM进行比对，找到需要修改的虚拟DOM内容，然后去对应的真实DOM中修改

diff算法就是虚拟DOM的比对时用的，返回一个patch对象，这个对象的作用就是存储两个节点不同的地方，最后用patch 里记录的信息进行更新真实DOM 步骤：
1. JS对象表示真实的D0M结构，要生成一个虚拟DOM，再用虚拟DOM构建一个真实DOM树，渲染到页面
2. 状态改变生成新的虚拟DOM，跟旧的虚拟DOM进行比对，这个比对的过程就是DIFF算法，利用patch记录差异
3. 把记录的差异用在第一个虚拟DOM生成的真实DOM上，视图就更新了。
### diff算法
https://blog.csdn.net/Wr2138/article/details/128268759
![image](https://img-blog.csdnimg.cn/fffabe6892db4cd4ba36420133daeee0.png)
数据改变 ----触发--> setter---触发--->Dep.notify ---通知订阅者---> patch(oldvnode, newvnode)

之后判断新旧两个节点是否为同类标签，如果不是同类标签就直接替换；
如果是同类标签的话，进一步执行patchVnode()方法，在这个方法内部，也是需要先判断一下新旧虚拟节点是否相同，

如果相等，就直接return；如果不相等就需要分情况来比对，比对的原则就是以新虚拟节点的结果为准，

分为以下几种情况：

oldvnode和newvnode都有文本节点---执行--->用新的文本节点替换旧文本节点
oldvnode没有子节点，newvnode有子节点---执行--->添加新的子节点
oldvnode有子节点，newvnode没有子节点---执行--->删除旧的子节点
oldvnode和newvnode都有子节点---执行--->updateChildren()方法
updateChildren
同级比对 --- 减少比对次数，可以最大化的提高比对性能
![image](https://img-blog.csdnimg.cn/b2d4fb99fe9640b3ae49fcd4d05f224e.png)
首尾指针法

        ①依次比对，当比较成功后退出当前比较
    
        ②渲染结构以newVnode为准
    
        ③每次比较成功之后start点和end点向中间靠拢
    
        ④当新旧节点中有一个start点跑到end点右侧时终止比较
    
        ⑤如果都匹配不到，则旧虚拟DOM key只去比对新虚拟DOM的key值，如果key相同则复用，并移动到新虚拟DOM的位置

比对顺序

        首先，旧虚拟节点的start和新虚拟节点的start做比对，如果没有比对成功，就用旧虚拟节点的start和新虚拟节点的end做比对
         如果依旧没有比对成功，就用旧虚拟节点的end和新虚拟节点的start做比对，如果依旧没有比对成功，旧虚拟节点的end会和新虚拟节点的end做比对
    
          比对原则就是依照以上顺序依次比较
    
        当比对成功，就退出当前比对，渲染结果会以新虚拟节点的结果为准
    
        每次比对成功后，比对成功的start会向右侧移动，end会向左侧移动。在移动的过程中，当start点跑到end点右侧的时候就终止比较

### 虚拟DOM一定比真实DOM操作快吗 
虚拟DOM不一定更快

> 1. 虚拟 DOM 也引入了`额外的开销`。
> 2. 在每次`更新`时，需要生成新的虚拟 DOM 树，并与之前的虚拟 DOM 树进行`比较`。
> 3. 这个比较过程需要`耗费`一定的计算`资源`。而对于简单的应用或页面，直接操作实际 DOM 可能`更快`，
> 4. 因为`省去`了虚拟 DOM 的`生成`和`比较`过程
> 5. 虚拟DOM的性能优势并非在所有情况下都成立。在某些情况下，直接操作真实DOM可能更快，特别是在进行简单的、少量的DOM操作时。此外，虚拟DOM的创建、比较和更新过程本身也需要一定的性能开销。因此，在选择是否使用虚拟DOM时，需要根据具体的场景和需求进行权衡

## 虚拟DOM一定更快吗？

虚拟DOM可以在某些情况下性能，但并不是绝对的。

以下是一些虚拟DOM可能带来性能提升的情况：

1. **批量更新**：虚拟DOM可以将多个DOM操作合并为一次更新。它会在内部进行比较和计算，找出最小的变更集，并批量应用于真实的DOM树。这种批量更新可以减少浏览器的重排和重绘，从而提高性能。
2. **局部更新**：通过比较新旧虚拟DOM树，只有发生变化的部分会被重新渲染到真实的DOM中，而不需要重新渲染整个组件。这可以避免不必要的DOM操作，减少性能开销。
3. **跳过昂贵的计算**：在虚拟DOM的比较过程中，可以通过判断节点是否相同来跳过昂贵的计算或渲染步骤。如果两个节点相同，则无需进一步比较其子节点，从而节省了计算资源。
4. **跨平台支持**：虚拟DOM与底层平台无关，因此它可以在不同环境（例如浏览器、移动端、服务器端）进行渲染。这种可移植性使得使用虚拟DOM能够更轻松地在不同平台之间共享和重用代码。

然而，虚拟DOM也可能引入一些性能开销：

1. **额外的内存占用**：在运行时，虚拟DOM需要维护一个表示整个组件树的数据结构，这可能会占用额外的内存。
2. **操作的复杂度**：虚拟DOM需要进行比较、计算和递归遍历等操作，这可能导致一些额外的计算开销。

总的来说，虚拟DOM通常可以在中等到大型规模的应用程序中提供性能优势。然而，在简单的应用程序或特定场景下，手动的DOM操作可能更加高效。因此，在选择是否使用虚拟DOM时，需要权衡应用程序的需求、性能要求以及代码的可维护性。

### 那为啥还都用 虚拟DOM呢

> 1. 因为使用虚拟DOM可以`提高`代码的性能`下限`，
> 2. 并极大的`优化`大量操作DOM时产生的性能`损耗`。
> 3. 同时这些框架也保证了，即使在`少数`虚拟DOM不太给力的场景下，`性能`也在我们`接受`的范围内。

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

Vue.js 是采用**数据劫持**结合**发布者-订阅者模式**的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。也就是说数据和视图时同步的，数据发生改变，视图跟着发生改变，视图改变，数据也会发生改变。

主要分为以下几个步骤：

1. 需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter， 这样的话，就能监听到了数据变化

2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加（监听数据的）订阅者，一旦数据有变动，收到通知，更新视图

3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，

   主要做的事情是:

    ① 在自身实例化时往属性订阅器(dep)里面添加自己 

   ② 自身必须有一个 update()方法 

   ③ 待属性变动 （dep.notice()通知）时，能调用自身的 update()方法，并触发 Compile 中绑定的回调

4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 （model ）更新的双向绑定效果。

Vue.js 是采用**数据劫持**结合**发布者-订阅者模式**的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：


![image](https://cdn.nlark.com/yuque/0/2021/png/1500604/1618656573096-ebdc520c-5d60-4d12-ad04-5df4ebbb5fe7.png)

### 使用 Object.defineProperty() 来进行数据劫持有什么缺点

在对一些属性进行操作时，使用这种方法无法拦截，比如通过下标方式修改数组数据或者通过length修改数组或者给对象新增属性，这都不能触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作。更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 Vue 内部通过重写函数的方式解决了这个问题。

- 不能监听数组的变化

- 必须遍历对象的每个属性

- 必须深层遍历嵌套的对象

- **性能问题**：由于 `Object.defineProperty()` 需要对对象的每个属性进行遍历并设置 getter 和 setter，因此当对象属性较多时，这个过程可能会导致较大的性能开销。此外，由于每次数据变化都需要触发 setter，这也可能带来额外的性能负担。

  

在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为 Proxy 是 ES6 的语法。

- - 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。
  - 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的。
  - Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
  - Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法，可以享受新版本红利。

### Vue中遍历全局的方法有哪些

forEach、map、filter、findIndex、every、some等

### watch和watchEffect的对比

**watch**

1.  watch显式指定依赖数据，依赖数据更新时执行回调函数
2.  具有一定的惰性lazy 第一次页面展示的时候不会执行，只有数据变化的时候才会执行(设置immediate: true时可以变为非惰性，页面首次加载就会执行）
3.  监视ref定义的响应式数据时可以获取到原值
4.  既要指明监视的属性，也要指明监视的回调

**watchEffect**

1.  watchEffect自动收集依赖数据，依赖数据更新时重新执行自身
2.  立即执行，没有惰性，页面的首次加载就会执行
3.  无法获取到原值，只能得到变化后的值

### 你有对 Vue 项目进行哪些优化
**（1）代码层面的优化**
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

**（2）Webpack 层面的优化**
Webpack 对图片进行压缩
减少 ES6 转为 ES5 的冗余代码
提取公共代码
模板预编译
提取组件的 CSS
优化 SourceMap
构建结果输出分析
Vue 项目的编译优化

**（3）基础的 Web 技术的优化**
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

### 组件中 data 为什么是一个函数？

因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

### v-for和v-if优先级

vue2   v-for 比 v-if 具有更高的优先级

Vue3   v-if 比 v-for 具有更高的优先级


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

### data，watch，computed，methods同时命名一个属性或方法，命名相同会不会报错，有没有异常提示
watch、computed 和 methods：这些选项之间命名相同的方法或属性通常不会导致运行时错误，但可能会导致逻辑上的混淆或警告（如 computed 覆盖 data）。在编写 Vue 组件时，应该避免在不同选项中使用相同的名称，以确保代码的可读性和可维护性。

优先级顺序

props ===> methods ===〉 data ===> computed ===>watch

### 写过自定义指令吗 原理是什么
自定义指令由 Vue.directive 函数定义，它接收两个参数：指令名称和指令选项对象。指令选项对象包含一系列钩子函数，用于定义指令的行为。
指令本质上是装饰器，是 vue 对 HTML 元素的扩展，给 HTML 元素增加自定义功能。vue 编译 DOM 时，会找到指令对象，执行指令的相关方法。
自定义指令有五个生命周期（也叫钩子函数），分别是 bind、inserted、update、componentUpdated、unbind

1. bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

2. inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
3. update：被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
4. componentUpdated：被绑定元素所在模板完成一次更新周期时调用。
5. unbind：只调用一次，指令与元素解绑时调用。

原理
1.在生成 ast 语法树时，遇到指令会给当前元素添加 directives 属性
2.通过 genDirectives 生成指令代码
3.在 patch 前将指令的钩子提取到 cbs 中,在 patch 过程中调用对应的钩子
4.当执行指令对应钩子函数时，调用对应指令定义的方法

### key的原理

  优化patch性能

1. key的作用主要是为了更高效的更新虚拟DOM。

2. vue在patch过程中***\*判断两个节点是否是相同节点是key是一个必要条件\****，渲染一组列表时，key往往是唯一标识，所以如果不定义key的话，vue只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个patch过程比较低效，影响性能。

3. 实际使用中在渲染一组列表时key必须设置，而且必须是唯一标识，应该避免使用数组索引作为key，这可能导致一些隐蔽的bug；vue中在使用相同标签元素过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。

4. 从源码中可以知道，vue判断两个节点是否相同时主要判断两者的key和元素类型等，因此如果不设置key，它的值就是undefined，则可能永远认为这是两个相同节点，只能去做更新操作，这造成了大量的dom更新操作，明显是不可取的。

   ### 面试题：react、vue中的key有什么作用？（key的内部原理）

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
###  nextTick 的实现原理*
nextTick 是 Vue.js 提供的一个方法，用于在 DOM 更新循环结束之后执行延迟回调。它的实现原理主要依赖于 JavaScript 的事件循环机制，特别是宏任务和微任务的概念。

Vue 的 nextTick 方法利用了这一机制。当调用 nextTick 时，Vue 会将传入的回调函数添加到一个队列中。然后，Vue 会检查当前是否在微任务队列中。
如果是，Vue 会直接尝试使用微任务（如 Promise.then 或 MutationObserver）来执行回调函数；
如果不是，Vue 会尝试使用宏任务（如 setTimeout 或 setImmediate）来执行回调函数。
这样做的目的是确保回调函数在 DOM 更新之后执行，以便获取到最新的 DOM 结构。同时，由于微任务在宏任务之前执行，使用微任务可以更快地执行回调函数，提高性能。
需要注意的是，由于不同浏览器和 JavaScript 运行环境对微任务和宏任务的处理可能存在差异，Vue 的 nextTick 实现也会根据环境进行适配和优化。

**setTimeout和nextTick的区别**
setTimeout`和`nextTick`的主要区别在于：`setTimeout`是在指定的延迟时间后执行代码，而不关心DOM的更新状态，其应用场景更为广泛；而`nextTick`则是在Vue的下一个DOM更新循环结束时执行操作，确保在数据变化后DOM已经更新，主要用于Vue中的DOM操作和数据处理。在Vue的数据更新后需要立即操作DOM的场景下，推荐使用`nextTick`方法，而在其他一般的延迟执行操作场景下，可以使用`setTimeout


### MVVM、MVC、MVP 的区别?

MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化开发效率。

**（1）MVC**

MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。

View 负责页面的显示逻辑，

Model 负责存储页面的业务数据，以及对相应数据的操作。

Controller 业务逻辑层，负责用户与应用的响应操作

并且 View 和 Model 应用了**观察者模式**，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。

用户操作> View (负责接受用户的输入操作)>Controller（业务逻辑处理）>Model（数据持久化）>View（将结果通过View反馈给用户）

　　缺点：

1.   Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题
2.  所有业务逻辑都在Controller里操作，逻辑复杂且不利于维护，
3.  大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。
4.  当 Model 频繁发生变化，需要主动更新到View ；当用户的操作导致Model发生变化，同样需要将变化的数据同步到Model中， 这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1500604/1603814137582-5a9aa62f-0045-4272-bef0-447dedb25596.png)

**（2）MVP**

- Model：和MVC中的Model类似，负责数据和业务逻辑。
- View：负责数据的展示，但与MVC不同的是，View通常是一个接口，而不是具体的实现。
- Presenter ： 负责连接 Model 层和 View 层，处理 View 层的事件，负责获取数据并将获取的数据经过处理后更新 View。

MVP 模式中，View 层的接口暴露给了 Presenter 因此可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。
![image.png](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015020109.png)

**（3）MVVM**

MVVM 分为 Model、View、ViewModel：

- Model 代表数据模型，数据和业务逻辑都在 Model 层中定义；
- View 代表 UI 视图，负责数据的展示；
- ViewModel 负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作；

Model 和 View 并无直接关联，而是通过 ViewModel 来进行联系的，，数据的双向绑定是由ViewModel完成。 因此当 Model 中的数据改变时会触发 View 层的刷新，View 中由于用户交互操作而改变的数据也会在 Model 中同步。

这种模式实现了 Model 和 View 的数据自动同步，因此开发者只需要专注于数据的维护操作即可，而不需要自己操作 DOM。

MVVM与MVC的区别是，MVVM实现了View和Model的自动同步，不用手动操作Dom，即Model变化时View可以实时更新，View变化也能改变Model。

**严格的 MVVM 要求 View 不能和 Model 直接通信，而 Vue 提供了$refs 这个属性，让 Model 可以直接操作 View，违反了这一规定，所以说 Vue 没有完全遵循 MVVM**

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1500604/1603814104939-8c8ac923-735d-4476-937a-cb1f795ffe84.png)


###  v-if、v-show、v-html 的原理

- v-if 会调用 addIfCondition 方法，生成 vnode 的时候会忽略对应节点，render 的时候就不会渲染；
- v-show 会生成 vnode，render 的时候也会渲染成真实节点，只是在 render 过程中会在节点的属性中修改 show 属性值，也就是常说的 display；
- v-html 会先移除节点下的所有节点，调用 html 方法，通过 addProp 添加 innerHTML 属性，归根结底还是设置 innerHTML 为 v-html 的值。
### data 为什么是一个函数而不是对象

JavaScript 中的对象是引用类型的数据，当多个实例引用同一个对象时，只要一个实例对这个对象进行操作，其他实例中的数据也会发生变化。

而在 Vue 中，更多的是想要复用组件，那就需要每个组件都有自己的数据，这样组件之间才不会相互干扰。

所以组件的数据不能写成对象的形式，而是要写成函数的形式。数据以函数返回值的形式定义，这样当每次复用组件的时候，就会返回一个新的 data，也就是说每个组件都有自己的私有数据空间，它们各自维护自己的数据，不会干扰其他组件的正常运行。
### keep-alive原理
 https://fe.ecool.fun/topic/7cefdb7e-8b8a-429f-be44-45b346de6f3f?orderBy=updateTime&order=desc&titleKey=keep-alive
`keep-alive`是`vue`中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染`DOM`
`keep-alive` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
`keep-alive`可以设置以下`props`属性：
-   `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存
-   `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存
-   `max` - 数字。最多可以缓存多少组件实例

1. keep-alive组件在渲染时会创建一个缓存对象，用于存储已经渲染过的组件实例。
2. 在切换时，keep-alive组件会检查缓存对象中是否已经存在需要渲染的组件实例，如果存在，则直接从缓存中获取，否则会创建新的组件实例并将其缓存起来。
3. 首先使用了keep-alive的组件以后，组件上就会自动加上了
4. activated钩子和deactivated钩子当组件被缓存时，会触发 `activated` 生命周期钩子函数，当组件被销毁时，会触发 `deactivated` 生命周期钩子函数。
5. keep-alive组件提供了 `include` 和 `exclude` 两个属性，用于指定哪些组件需要被缓存，哪些不需要被缓存。
6. keep-alive组件还提供了 `max` 属性，用于限制缓存的组件实例数量，当超过限制时，会将最早缓存的组件实例删除。


keep-alive 的中还运用了 LRU(最近最少使用) 算法，选择最近最久未使用的组件予以淘汰
LRU 的核心思想是如果数据最近被访问过，那么将来被访问的几率也更高，所以我们将命中缓存的组件 key 重新插入到 this.keys 的尾部，这样一来，this.keys 中越往头部的数据即将来被访问几率越低，所以当缓存数量达到最大值时，我们就删除将来被访问几率最低的数据，即 this.keys 中第一个缓存的组件。
###  Vue 模版编译原理
vue 中的模板 template 无法被浏览器解析并渲染，因为这不属于浏览器的标准，不是正确的 HTML 语法，所有需要将 template 转化成一个 JavaScript 函数，这样浏览器就可以执行这一个函数并渲染出对应的 HTML 元素，就可以让视图跑起来了，这一个转化的过程，就成为模板编译。模板编译又分三个阶段，解析 parse，优化 optimize，生成 generate，最终生成可执行函数 render。

- **解析阶段**：使用大量的正则表达式对 template 字符串进行解析，将标签、指令、属性等转化为抽象语法树 AST。
- **优化阶段**：遍历 AST，找到其中的一些静态节点并进行标记，方便在页面重渲染的时候进行 diff 比较时，直接跳过这一些静态节点，优化 runtime 的性能。
- **生成阶段**：将最终的 AST 转化为 render 函数字符串。

### Vue data 中某个属性的值发生改变后，视图会立即同步执行重新渲染吗

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
### vue组件间通信六种方式（完整版）
<https://segmentfault.com/a/1190000019208626>

1. props / $emit  父子组件传值
2. eventBus 事件总线（$emit / $on） **父子组件**、**非父子组件**等之间的通信
3. provide / inject   父子组件,祖孙组件
4. ref / $refs   父子组件
5. $parent / $children  父子组件
6. $attrs / $listeners  跨代通信
7. vuex
## vuex
### vuex的属性和整个流程

State：单一状态树，包含应用中的大部分状态。
Getters：从state中派生出来的状态。
Mutations：同步函数，用于更改state中的状态，每个mutation都需要是同步函数。
Actions：异步函数，用于提交mutations，而不是直接变更状态，可以包含任何异步操作。
Modules：让单个状态树分割成模块（单个状态树太大时）。

Vuex 的整个流程如下：

1. 通过 dispatch 去提交一个 action：在需要的时候，可以通过 dispatch 方法去提交一个 action。
2. actions 接收到事件后执行操作：action 接收到这个事件之后，可以执行一些异步或同步操作，根据需求去分发给不同的 mutations。
3. mutations 通过 commit 更新 state：action 执行结束后，会通过 commit 方法调用相应的 mutation，从而更新 state 数据源。
## vue-router
### vue-router的生命周期
- 全局前置/钩子：beforeEach、beforeResolve、afterEach
- 路由独享的守卫：beforeEnter
- 组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

  beforeRouteEnter：在进入路由前，对应组件的 beforeRouteEnter 守卫会被调用。此时，组件实例尚未创建，因此无法直接访问组件实例。如果需要访问组件实例，可以通过传入的 next 回调函数的参数来访问。
  beforeRouteUpdate（Vue 2.2+）：在路由更新时（例如，当路由参数改变但组件复用时），对应组件的 beforeRouteUpdate 守卫会被调用。此时，组件实例已经存在，因此可以直接访问组件实例。
  beforeRouteLeave：在离开当前路由前，对应组件的 beforeRouteLeave 守卫会被调用。这个守卫通常用于清理组件状态或执行其他必要的操作。

### vue路由懒加载

*   vue异步组件
*   es提案的import()
*   webpack的require,ensure()
### vue-router 的传参方式
1. router-link路由导航方式传参
```
父组件：<router-link to="/跳转到的路径/传入的参数"></router-link>
子组件：this.$route.params.content接受父组件传递过来的参数
```
2. 路由参数 (params)
```
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

```

另外，二者还有点区别，直白的来说query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，而params相当于post请求，参数不会再地址栏中显示

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
- **修改历史状态**：在 History 模式下，Vue-Router 会利用 HTML5 History API 的 `pushState()` 和 `replaceState()` 方法来改变 URL，并通过监听 `popstate` 事件来感知 URL 的变化。（这两个方法应用于浏览器的历史记录栈，提供了对历史记录进行修改的功能。只是当他们进行修改时，虽然修改了 url，但浏览器不会立即向后端发送请求）
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
### 哪个会在浏览器中缓存下来当前访问的路由，

**无论是hash模式还是history模式，都不会在浏览器中直接缓存路由信息，而是通过前端代码来管理和维护路由状态。**
浏览器的缓存通常指的是对静态资源的缓存，如HTML、CSS、JavaScript文件等，而不是路由信息。在SPA中，路由信息通常是由前端代码维护的，可以通过各种方式（如存储在内存、localStorage等）来保存和恢复路由状态，以实现页面的前进和后退功能。

### $route 和$router 的区别
route和router在Vue.js中都是与路由相关的对象

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

### vue-router路由引入有没有做拆包处理
