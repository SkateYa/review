***

[TOC]

***

# CSS面试题
### line-height和heigh区别
line-height是每一行文字的高，如果文字换行则整个盒子高度会增大（行数*行高）。
height是一个死值，就是这个盒子的高度。

### flex布局
**容器的属性**

> **flex-direction**    主轴的方向(row | row-reverse | column | column-reverse)
> **flex-wrap**           是否换行(nowrap | wrap | wrap-reverse)
> **flex-flow**              flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
> **justify-content**    主轴上的对齐方式（flex-start | flex-end | center | space-between | space-around）
> **align-items**           在交叉轴上如何对齐（flex-start | flex-end | center | baseline | stretch）
> **align-content**      多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用（flex-start | flex-end | center | space-between | space-around | stretch），比justify-content属性多了一个stretch属性

baseline: 项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

**项目的属性**

> **order**  项目的排列顺序。数值越小，排列越靠前，**默认为0**
> **flex-grow**  定义项目的放大比例，**默认为0**，即如果存在剩余空间，也不放大。
> **flex-shrink**  属性定义了项目的缩小比例，**默认为1**，即如果空间不足，该项目将缩小。
> **flex-basis**  定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为**auto**，即项目的本来大小
> **flex**  是flex-grow, flex-shrink 和 flex-basis的简写，**默认值为0 1 auto**。后两个属性可选，该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。**flex：1 是flex: 1 1 0%的简写，flex子项将根据可用空间进行增长或缩小，并且其基本大小为0。**
> 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
> **align-self**  允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch（auto | flex-start | flex-end | center | baseline | stretch），属性取6个值，除了auto，比align-items属性多了一个auto属性

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
负值对该属性无效。

### 标准模型与IE模型的区别

    现在最常用的是IE盒模型
    box-sizing：content-box；设置为标准盒子模型
    标准盒模型下盒子的大小 = width(content)+ border + padding + margin
    box-sizing：border-box；设置为IE盒子模型
    IE盒模型下盒子的大小=width（content + border + padding） + margin

### 行内元素和块级元素

block

占满一行，默认继承父元素的宽度；多个块元素将从上到下进行排列；
设置 width/height 将会生效；
设置 padding 和 margin 将会生效；

inline

不会占满一行，宽度随着内容而变化；多个 inline 元素将按照从左到右的顺序在一行里排列显示，如果一行显示不下，则自动换行；
设置 width/height 将不会生效；
设置竖直方向上的 padding 和 margin 将不会生效；

inline-block

是行内块元素，不单独占满一行，可以看成是能够在一行里进行左右排列的块元素；
设置 width/height 将会生效；
设置 padding 和 margin 将会生效；

### css继承

CSS 属性很多，但并不是所有的属性默认都是能继承父元素对应属性的，那哪些属性存在默认继承的行为呢？一定是那些不会影响到页面布局的属性，可以分为如下几类：

字体相关：font-family、font-style、font-size、font-weight 等；
文本相关：text-align、text-indent、text-decoration、text-shadow、letter-spacing、word-spacing、white-space、line-height、color 等；
列表相关：list-style、list-style-image、list-style-type、list-style-position 等；
其他属性：visibility、cursor 等；

对于其他默认不继承的属性也可以通过以下几个属性值来控制继承行为：

    inherit：继承父元素对应属性的计算值；
    initial：应用该属性的默认值，比如 color 的默认值是 #000；
    unset：如果属性是默认可以继承的，则取 inherit 的效果，否则同 initial；
    revert：效果等同于 unset，兼容性差。

### scss的特性

1.  通过\$符号去声明一个变量。
2.  嵌套
3.  引入 @import
4.  混合 @mixin @include  (相当于声明一个函数,传值)
5.  继承 @extend
6.  操作符 +、-、\*、/、% 对宽度进行简单的计算。
7.  引用父级选择器"&"  "&"必须出现在复合选择器开头的位置

### bfc

<https://blog.csdn.net/sinat_36422236/article/details/88763187>\
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。



BFC（会计格式化上下文），一个创建了新的 BFC 的盒子是独立布局的，盒子内元素的布局不会影响盒 子外面的元素。在同一个 BFC 中的两个相邻的盒子在垂直方向发生 margin 重叠的问题。

BFC 是值浏览器中创建了一个独立的渲染区域，该区域内所有元素的布局不会影响到区域外元素的布 局，这个渲染区域只对块级元素起作用



如何创建BFC

1.  float的值不是none。（left,right）
2.  position的值absolute、fixed
3.  display的值是inline-block、table-cell、flex、table-caption或者inline-flex
4.  overflow 除了 visible 以外的值 (hidden、auto、scroll)

```
float: left | right | none | inline-start | inline-end
position: static | relative | absolute | sticky | fixed
overflow: visible | hidden | clip | scroll | auto 
```

BFC的作用

1.  利用BFC避免margin重叠。（给其中一个元素外层加一个div，给div设置overflow: hidden;）
2.  自适应两栏布局（给不浮动的元素设置overflow: hidden;）
3.  清楚浮动 （给父元素设置overflow: hidden;）

### Css选择器有哪些? 哪些属性可以继承？

    css选择器有：
        - id选择器
        - 类选择器
        - 标签
        - 相邻选择器(h1+p)
        - 子选择器(ul>li)
        - 后代选择器(li a)
        - 通配符选择器(*)
        - 属性选择器（a[rel = "XXX"]）
        - 伪类选择器( :hover :first-child ···)
        - 伪元素选择器( :before :after ···)
        - 分组选择器
        
    可继承的样式：font-size, font-family, color，ul，li，dl，dt，dd；
    
    不可继承的样式：border, padding, margin, width, height

### Css选择器优先级

!important > 内联style > id > class > tag

优先级算法：

1.  同权重情况下样式定义最近者为准（优先级相同，选择最后出现的样式）
2.  元素选择符的权值：元素标签（派生选择器）：1，class选择符：10，id选择符：100，内联样式权值最大，为1000
3.  继承得到的样式的优先级最低

### css3新特性

1.  颜色：新增RGBA，HSLA模式

2.  文字阴影（text-shadow、）

3.  边框： 圆角（border-radius）边框阴影： box-shadow

4.  盒子模型：box-sizing

5.  背景：background-size 设置背景图片的尺寸background-origin 设置背景图片的原点
    background-clip 设置背景图片的裁切区域，以”，”分隔可以设置多背景，用于自适应布局

6.  渐变：linear-gradient、radial-gradient

7.  过渡：transition，可实现动画

8.  自定义动画

9.  在CSS3中唯一引入的伪元素是 ：：selection.

10. 媒体查询，多栏布局

11. border-image

12. 2D转换：transform：translate(x，y) rotate(x，y) skew(x，y) scale(x，y)

13. 3D转换

### 两栏布局

     <style>
          .outer {
            height: 100px;
          }
          /* .left {
            float: left;
            width: 200px;
            background: tomato;
          }
          .right {
            margin-left: 200px;
            width: auto;
            background: gold;
          } */
    
          /* .left {
            width: 100px;
            height: 200px;
            background: red;
            float: left;
          }
          .right {
            height: 300px;
            background: blue;
            overflow: hidden;
          } */
    
          /* .content {
            display: flex;
            height: 100px;
          }
          .left {
            width: 200px;
            background: tomato;
          }
          .right {
            flex: 1;
            background: gold;
          } */
    
          /* .content {
            position: relative;
            height: 100px;
          }
          .left {
            position: absolute;
            width: 200px;
            height: 100px;
            background: tomato;
          }
          .right {
            margin-left: 200px;
            background: gold;
          } */
    
          .content {
            position: relative;
            height: 100px;
          }
          .left {
            width: 200px;
            background: tomato;
          }
          .right {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 200px;
            background: gold;
          }
        </style>


​        
​        <div class="content">
​          <div class="outer left"></div>
​          <div class="outer right"></div>
​        </div>

### 三栏布局

### 元素上下左右都居中

### clearn\:both的具体作用是什么

### 清除浮动的方式

### 为什么要清除浮动,不清除浮动会造成什么影响

### 22.清楚浮动的几种方式

为什么要清除浮动呢？清除浮动的本质是什么？
清除浮动主要是为了解决父级元素因为子级浮动引起的内部高度为0的问题。

    1.给父元素后面加个div,设置clear:both;即可。
    优点：通俗易懂，书写方便。（不推荐使用）
    缺点：添加许多无意义的标签，结构化比较差。
    2.父级添加overflow方法：可以通过触发BFC的方式，实现清楚浮动效果
    优点：代码简洁（慎重使用，若该父盒子里还有position定位会引起麻烦）
    缺点：内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素。
    3.利用 ::after 伪元素清理浮动
    优点：符合闭合浮动思想，结构语义化正确
    缺点：由于IE6-7不支持：after，使用zoom：1，触发hasLayout。
    .clearfix:after { 
        content: '.'; 
        display: block; 
        clear: both; 
    }
    4.使用before和after双伪元素清除浮动 (给父元素加个clearfix类)
     .clearfix:after,.clearfix:before{
            content: "";
            display: table;
        }
        .clearfix:after{
            clear: both;
        }

```
一、父级添加overflow: hidden；
　　　子元素浮动了，会造成父元素的高度坍塌。只要给父元素添加overflow: hidden;属性，就可以解决浮动带来的影响。


<ul class="cc">
    <li></li>
    <li></li>
</ul>
<style type="text/css">
    li {
        list-style: none;
        height: 100px;
        width: 100px;
        float: left;
        background: red;
        margin-left: 20px;
    }
    
    ul {
        overflow: hidden;
        padding: 0;
        margin: 0;
        background: pink;
    }
</style>

二、通过属性clear:both;达到清除浮动的目的；
　　元素浮动后，只需要在浮动元素添加多一个块级元素，并添加clear: both;属性，便可以达到清除浮动的目的。

<style type="text/css">
    li {
        list-style: none;
        height: 100px;
        width: 100px;
        float: left;
        background: red;
        margin-left: 20px;
    }
    ul{
        background: pink;
    }
</style>
<ul class="cc">
    <li></li>
    <li></li>
    <div style="clear: both;"></div>
</ul>

三、通过给父级元素添加伪类after，达到清除浮动的目的；
　　这种方式也是使用clear: both;的方式达到效果，只是变相的使用了伪类after，使得页面结构更简洁，也是常用的清理浮动的方式。


 li {
        list-style: none;
        height: 100px;
        width: 100px;
        float: left;
        background: red;
        margin-left: 20px;
      }

      .cc:after {
        content: "";
        display: block;
        clear: both;
      }
      ul {
        background: pink;
      }
    </style>
    <ul class="cc">
      <li></li>
      <li></li>
    </ul>
    
四、使用双伪类；
　　此方式和三原理一样，代码更简洁。
　　
<style type="text/css">
    li {
        list-style: none;
        height: 100px;
        width: 100px;
        float: left;
        background: red;
        margin-left: 20px;
    }
    
    .cc:after,
    .cc:before {
        content: "";
        display: block;
        clear: both;
    }
    
    ul {
        background: pink;
    }
</style>
<ul class="cc">
    <li></li>
    <li></li>
</ul>

```

### 水平垂直居中

水平居中文档：<https://www.zcfy.cc/article/centering-in-css-a-complete-guide-css-tricks>\
盒子水平和垂直居中的5大方案

已知元素的宽高

1.  absolute + 负margin
2.  absolute + auto margin
3.  absolute calc
    未知宽度
4.  display:flex
5.  transform

<!---->

    <!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>三栏布局</title>
      <link rel="stylesheet" href="">
      <style type="text/css" media="screen">
        html * {
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    
    <body>
      <section class="absolute margin">
        <style type="text/css" media="screen">
          /* 需要知道元素的宽高 */
          .absolute.margin .wrapper>div {
            min-height: 100px;
          }
    
          .absolute.margin .outer {
            position: relative;
            width: 100%;
            height: 200px;
            background: red;
          }
    
          .absolute.margin .inner {
            position: absolute;
            width: 100px;
            height: 100px;
            background: yellow;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
          }
        </style>
        <article class="wrapper">
          <div class="outer">
            <div class="inner">absolute + 负margin 需要知道元素的宽高 </div>
          </div>
        </article>
      </section>


      <section class="absolute auto margin">
        <style type="text/css" media="screen">
          .absolute.auto.margin .outer {
            position: relative;
            width: 100%;
            height: 200px;
            background: rgb(224, 195, 195);
          }
    
          .absolute.auto.margin .inner {
            position: absolute;
            width: 100px;
            height: 100px;
            background: yellow;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
    
          }
        </style>
        <article class="wrapper">
          <div class="outer">
            <div class="inner">absolute auto margin 需要知道元素的宽高 </div>
          </div>
        </article>
      </section>


      <section class="absolute calc">
        <style type="text/css" media="screen">
          .absolute.calc .outer {
            position: relative;
            width: 100%;
            height: 200px;
            background: rgb(104, 119, 189);
          }
    
          .absolute.calc .inner {
            position: absolute;
            width: 100px;
            height: 100px;
            background: yellow;
            left: calc(50% - 50px);
            top: calc(50% - 50px);
          }
        </style>
        <article class="wrapper">
          <div class="outer">
            <div class="inner">absolute calc 需要知道元素的宽高</div>
          </div>
        </article>
      </section>
    
      <section class="absolute transform">
        <style type="text/css" media="screen">
          .absolute.transform .outer {
            position: relative;
            width: 100%;
            height: 200px;
            background: rgb(226, 97, 97);
          }
    
          .absolute.transform .inner {
            position: absolute;
            background: yellow;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        </style>
        <article class="wrapper">
          <div class="outer">
            <div class="inner">absolute transform 不需要知道子元素宽高 </div>
          </div>
        </article>
      </section>
    
      <section class="flex">
        <style type="text/css" media="screen">
          .flex .outer {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 300px;
            background: rgb(57, 15, 211);
          }
    
          .flex .inner {
            background: yellow;
          }
        </style>
        <article class="wrapper">
          <div class="outer">
            <div class="inner">flex 不需要知道子元素宽高 </div>
          </div>
        </article>
      </section>
    
      <section class="table">
        <style type="text/css" media="screen">
          .table .outer {
            display: table-cell;
            width: 800px;
            height: 300px;
            text-align: center;
            vertical-align: middle;
            background: red;
          }
    
          .table .inner {
            display: inline-block;
            width: 100px;
            height: 100px;
            background: yellow;
          }
        </style>
        <article class="wrapper">
          <div class="outer">
            <div class="inner">table 需要知道子元素宽高 </div>
          </div>
        </article>
      </section>
      
      <section class="grid">
        <style type="text/css" media="screen">
          .grid .outer {
            display: grid;
            align-content: center;
            justify-content: center;
            width: 100%;
            height: 300px;
            background: rgb(17, 201, 109);
          }
    
          .grid .inner {
            background: rgb(38, 0, 255);
          }
        </style>
        <article class="wrapper">
          <div class="outer">
            <div class="inner">grid 不需要知道子元素宽高 </div>
          </div>
        </article>
      </section>
    </body>
    
    </html>

### 实现一个宽高都是200px的div上下左右居中

<https://juejin.im/post/5eace2176fb9a04340658974>
<https://www.jianshu.com/p/7d7cf4f051ee>

如果去掉高度已知，只有flex布局和table布局可以用
面试时至少写出三种哦。接下来问题可能会有三个延伸方向：

### 三栏布局

每种方案的优缺点？
如果高度不固定，实践中一般用哪种？
以上几种方案的兼容性如何？

每种布局的优缺点

1.  float margin布局
    优点：比较简单，兼容性也比较好。只要清除浮动做的好，是没有什么问题的\
    缺点：浮动元素是脱离文档流，要做清除浮动，这个处理不好的话，会带来很多问题，比如高度塌陷等。
2.  绝对布局
    优点：很快捷，设置很方便，而且也不容易出问题\
    缺点：绝对定位是脱离文档流的，意味着下面的所有子元素也会脱离文档流，这就导致了这种方法的有效性和可使用性是比较差的。
3.  flex 布局
    优点：简单快捷
    缺点：不支持 IE8 及以下
4.  table布局
    优点：实现简单，代码少\
    缺点：当其中一个单元格高度超出的时候，两侧的单元格也是会跟着一起变高的，而有时候这种效果不是我们想要的。
5.  grid布局
    跟 flex 相似。

<!---->

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>三栏布局</title>
        <link rel="stylesheet" href="">
        <style type="text/css" media="screen">
            html *{
                margin: 0;
                padding: 0;
            }
        </style>
    </head>
    <body>
        <section class="layout float">
            <style type="text/css" media="screen">
                .layout.float .wrapper>div{
                    min-height: 100px;
                }
                .layout.float .left{
                    float: left;
                    width: 300px;
                    background: red;
                }
                .layout.float .center{
                    background: yellow;
                     margin: 0 300px 0 300px;
                }
                .layout.float .right{
                    float: right;
                    width: 300px;
                    background: blue;
                }
                
            </style>
            <article class="wrapper">
                <div class="left"></div>
                <div class="right"></div>
                <div class="center">
                    <h1>float布局</h1>
                    1.我是float布局的中间部分
                    2.我是float布局的中间部分
                </div>
            </article>
        </section>


        <section class="layout absolute">
            <style type="text/css" media="screen">
                .layout.absolute .wrapper{
                    width: 100%;
                    margin-top: 20px;
                }
                .layout.absolute .wrapper>div{
                    min-height: 100px;
                }
                .layout.absolute .left{
                    position: absolute;
                    left: 0;
                    width: 300px;
                    background: red;
                }
                .layout.absolute .center{
                    position: absolute;
                    left: 300px;
                    right: 300px;
                    background: yellow;
                }
                .layout.absolute .right{
                    position: absolute;
                    right: 0;
                    width: 300px;
                    background: blue;
                }
            </style>
            <article class="wrapper">
                <div class="left"></div>
                <div class="center">
                    <h1>absolute布局</h1>
                    1.我是absolute布局的中间部分
                    2.我是absolute布局的中间部分
                </div>
                <div class="right"></div>
            </article>
        </section>


        <section class="layout flex">
            <style type="text/css" media="screen">
                .layout.flex .wrapper{
                    width: 100%;
                    min-height: 100px;
                    display: flex;
                    margin-top: 140px;
                }
                .layout.flex .left{
                    width: 300px;
                    background: red;
                }
                .layout.flex .center{
                    flex: 1;
                    background: yellow;
                }
                .layout.flex .right{
                    width: 300px;
                    background: blue;
                }
            </style>
            <article class="wrapper">
                <div class="left"></div>
                <div class="center">
                    <h1>flex布局</h1>
                    1.我是flex布局的中间部分
                    2.我是flex布局的中间部分
                </div>
                <div class="right"></div>
            </article>
        </section>


        <section class="layout table">
            <style type="text/css" media="screen">
                .layout.table .wrapper{
                    display: table;
                    width: 100%;
                    min-height: 100px;
                    margin-top: 20px;
                }
                .layout.table .left{
                    display: table-cell;
                    width: 300px;
                    background: red;
                }
                .layout.table .center{
                    display: table-cell;
                    background: yellow;
                }
                .layout.table .right{
                    display: table-cell;
                    width: 300px;
                    background: blue;
                }
                
            </style>
            <article class="wrapper">
                <div class="left"></div>
                <div class="center">
                    <h1>table布局</h1>
                    1.我是table布局的中间部分
                    2.我是table布局的中间部分
                </div>
                <div class="right"></div>
            </article>
        </section>


        <section class="layout grid">
            <style type="text/css" media="screen">
                .layout.grid .wrapper{
                    display: grid;
                    grid-template-columns: 300px auto 300px;
                    grid-template-rows: 100px;
                    width: 100%;
                    margin-top: 20px;
                }
                .layout.grid .left{
                    background: red;
                }
                .layout.grid .center{
                    background: yellow;
                }
                .layout.grid .right{
                    background: blue;
                }
                
            </style>
            <article class="wrapper">
                <div class="left"></div>
                <div class="center">
                    <h1>grid布局</h1>
                    1.我是grid布局的中间部分
                    2.我是grid布局的中间部分
                </div>
                <div class="right"></div>
            </article>
        </section>
    </body>
    </html>

