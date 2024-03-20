
## 视频地址
https://www.bilibili.com/video/BV1Xh411V7b5/

尚硅谷Vue项目实战硅谷甄选，vue3项目+TypeScript前端项目一套通关


## 账号密码

admin  111111

## vue3框架:采用vue框架最新版本,组合式API形式开发项目。
vite:构建化工具
TypeScript:TypeScript技术栈
vue-router:采用vue-router最新版本管理路由
pinia:采用pinia集中式管理状态
element-plus:UI组件库采用element-plus
axios:网络交互
echarts:数据可视化大屏.....


## 1:掌握如何规范的开发项目
2:掌握自己如何封装后台管理系统模板
3:掌握菜单权限与按钮权限
4:掌握数据大屏该如何解决
5:掌握请求响应拦截器该如何二次封装
6:掌握svg矢量图如何在项目中使用
7:掌握主题颜色切换与暗黑模式的切换.......

## 运行  
pnpm run dev

## 打包 
pnpm run build

## 安装仓库
pnpm i pinia

## 定义的文件名尽量符合语义化标准，让人看一眼这个文件就能知道这个文件管理的是什么模块；
定义store名称一般是useXxxxStore，这里的Xxxx就是文件名，让人看一眼这个代码就知道store管理的是什么模块。至于use是将这个store当做一个hook来使用，所以一般会加上use；
调用store获取状态时一般会去掉use，即 const userStore = useUserStore()
这样的话在代码中你的同事只需要瞄一眼就能明白含义了。（虽然这样写你可能不会得到同事的夸赞，但不这样写你一定会收获同事的祖安式问候）


## pinia 持久化存储
（pinia-plugin-persistedstate）pinia 持久化存储

用你喜欢的包管理器安装依赖：

```
pnpm i pinia-plugin-persistedstate
npm i pinia-plugin-persistedstate
yarn add pinia-plugin-persistedstate
```

 将插件添加到 pinia 实例上

```
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
 
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```


创建 Store 时，将 persist 选项设置为 true，开启数据持久化

使用选项式 Store 语法：

```
import { defineStore } from 'pinia'
 
export const useStore = defineStore('main', {
  state: () => {
    return {
      someState: '你好 pinia',
    }
  },
  persist: true,
})
```


或者使用组合式 Store 语法：

```
import { defineStore } from 'pinia'
 
export const useStore = defineStore('main',() => {
    const someState = ref('你好 pinia')
    return { someState }
  },
  {
    persist: true,
  }
)
```

 
现在，你的整个 Store 将使用默认持久化配置保存。
配置持久化的数据会存到 localStore里


### vue中引用nprogress

nodejs的npm安装如下：

 npm install --save nprogress

vue的话，比较常用的方式是路由加载的router.beforeEach中加NProgress.start()；
在router.afterEach中加NProgress.end()；

在引入的时候，需要注意，css也必须引入：
```
import NProgress from "nprogress"
import 'nprogress/nprogress.css' //这个样式必须引入

NProgress.configure({ showSpinner: false }) // 进度环显示隐藏
```



### 表单验证
```
this.$refs.form.resetFields(); //移除校验结果并重置字段值
this.$refs.form.clearValidate(); // 移除所有表单项的校验
this.$refs['form'].clearValidate(['name']); // 移除某一个表单项的校验
// 二者都能清除验证，但是resetFields（）会重置字段值，而在vue中大量用到的数据的绑定，很可能出现
// 同一个数据绑定在多处的情况，如果滥用resetFields很可能造成界面上出现莫名的bug
```

### 使用echarts   
npm i echarts
使用echarts水球图需要下载  https://www.npmjs.com/package/echarts-liquidfill

 npm i echarts-liquidfill    


echarts:国内镜像网站
https://www.isqqw.com/  图形很多
https://www.isqqw.com/echarts-doc/zh/option.html#title  国内echarts网址
http://datav.aliyun.com/portal/school/atlas/area_selector  阿里云中国地图的json

```


