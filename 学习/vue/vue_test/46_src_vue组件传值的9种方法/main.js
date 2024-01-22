//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)

//创建vm
new Vue({
	el:'#app',
	// eventBus (事件总线)
	// beforeCreate(){
	// 	Vue.prototype.$bus = this
	// },
	render: h => h(App),
	router:router
})

// 找到main.js 加入一下代码  公共的$bus
Vue.prototype.$bus = new Vue()
