// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

//创建并暴露一个路由器
export default new VueRouter({
	routes:[
		{
			path: '/props_pre',
			component: () => import('../views/01_props/parent.vue'),
		  },
		  {
			path: '/ref_pre',
			component: () => import('../views/02_ref/parent.vue'),
		  },
		  {
			path: '/bus_pre',
			component: () => import('../views/03_event-bus/EventBusTest.vue'),
		  },
		  {
			path: '/model_pre',
			component: () => import('../views/04_v-model/ModelTest.vue'),
		  },
		  {
			path: '/attrs-listeners_pre',
			component: () => import('../views/05_attrs-listeners/AttrsListenersTest.vue'),
		  },
		  {
			path: '/parent_children_pre',
			component: () => import('../views/06_children-parent/RefChildrenParentTest.vue'),
		  },
		  {
			path: '/provide-inject_pre',
			component: () => import('../views/07_provide-inject/ProvideInjectTest.vue'),
		  },
		  
		   {
			path: '/slot_pre',
			component: () => import('../views/08_slot/SlotTest.vue'),
		  },
		  {
			path: '/root_pre',
			component: () => import('../views/09_$root/EventTest.vue'),
		  },
	]
})
