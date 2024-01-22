//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import countOptions from './count'
import personOptions from './person'
//应用Vuex插件
Vue.use(Vuex)


// 引入modules文件下的所有js文件（不检索子文件夹）
const modulesFiles = require.context('./modules', false, /\.js$/)

// modulesFiles.keys()  === ['./countAbout.js', './personAbout.js']
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	console.log('@@@',modules, modulePath)
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	modules[moduleName] = value.default
	return modules
  }, {})

  console.log('modules',modules)
  
//创建并暴露store
export default new Vuex.Store({
	// 第一种写法
	// modules:{
	// 	countAbout:countOptions,
	// 	personAbout:personOptions
	// }


    // 第二种写法
	modules
})