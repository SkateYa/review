***

[TOC]

***

# h5新特性：

1.  拖拽释放(Drag and drop) API
2.  语义化更好的内容标签（header,nav,footer,aside,article,section）
3.  音频、视频API(audio,video)
4.  画布(Canvas) API
5.  地理(Geolocation) API
6.  本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
7.  sessionStorage 的数据在浏览器关闭后自动删除
8.  表单控件，calendar、date、time、email、url、search
9.  新的技术webworker, websocket, Geolocation
    支持HTML5新标签：

*   IE8/IE7/IE6支持通过document.createElement方法产生的标签，
    可以利用这一特性让这些浏览器支持HTML5新标签，
    浏览器支持新标签后，还需要添加标签默认的样式：
*   当然最好的方式是直接使用成熟的框架、使用最多的是html5shim框架
    10.本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；sessionStorage 的数据在浏览器关闭后自动删除。

### 29.vuex存储和本地存储(localstorage、sessionstorage)的区别

1.  区别：

*   vuex存储在内存，
*   localstorage（本地存储）则以文件的方式存储在本地(硬盘),永久保存；
*   sessionstorage( 会话存储 ) ,临时保存。localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理

1.  应用场景：

*   vuex用于组件之间的传值，
*   localstorage，sessionstorage则主要用于不同页面之间的传值。

1.  永久性：当刷新页面（这里的刷新页面指的是 --> F5刷新,属于清除内存了）时vuex存储的值会丢失，sessionstorage页面关闭后就清除掉了，localstorage不会。
2.  注：很多同学觉得用localstorage可以代替vuex, 对于不变的数据确实可以，但是当两个组件共用一个数据源（对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，localstorage，sessionstorage无法做到，原因就是区别1。

### 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

    行内元素： a, b, span, img, input, select, strong;
    块级元素： div, ul,ol, li, dl, dt, dd, h1-5, p等；
    空元素： <br>, <hr>, <img>,<input>、 <link>, <meta>;

### 页面导入样式时，使用link和@import有什么区别

1.  link属于HTML标签，而@import是css提供的；
2.  页面被加载时，link会同时被加载，而@import引用的css会等到页面被加载完再加载；
3.  @import只在IE5以上才能识别，而link是HTML标签，无兼容问题；
4.  link方式的样式的权重高于@import的权重。

### Label 的作用是什么？ 怎么用？

label> 标签为 input 元素定义标注（标记）。
label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。 \<label> 标签的 for 属性应当与相关元素的 id 属性相同。

    <label for="male">Male</label>
    <input type="radio" name="sex" id="male" />

### 标签上title属性与alt属性的区别是什么

1.  alt是为了在图片未能正常显示时（屏幕阅读器）给予文字说明。且长度必须少于100个英文字符或者用户必须保证替换文字尽可能的短。
2.  title属性为设置该属性的元素提供建议性的信息。鼠标悬停在该图片上时显示一个小提示，鼠标离开就没有了

### 如何理解语义化标签

概念：
语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化），便于开发者阅读和写出更优雅的代码的同时，让浏览器的爬虫和机器很好的解析。
语义化的好处

1.  用正确的标签做正确的事情；
2.  去掉或者丢失样式的时候能够让页面呈现出清晰的结构；
3.  方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
4.  有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
5.  便于团队开发和维护，语义化更具可读性，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

### 渐进增强和优雅降级之间的区别

渐进增强（progressive enhancement）：主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果，交互等方面的改进和追加功能，以达到更好的用户体验。

优雅降级 graceful degradation： 一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

区别

优雅降级是从复杂的现状开始的，并试图减少用户体验的供给；而渐进增强是从一个非常基础的，能够起作用的版本开始的，并在此基础上不断扩充，以适应未来环境的需要；
降级（功能衰竭）意味着往回看，而渐进增强则意味着往前看，同时保证其根基处于安全地带。
