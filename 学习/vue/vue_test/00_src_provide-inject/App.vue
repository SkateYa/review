<template>
	<div class="app">
		<h3>我是App组件（祖），{{name}}--{{price}}</h3>
		<Child/>
	</div>
</template>

<script>
    // 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，
	// 不论组件层次有多深，并在其上下游关系成立的时间里始终生效。
	import Child from './components/Child.vue'
	export default {
		name:'App',
		components:{Child},
		data(){
			return{
				name:'奔驰',
				price:'40W'
			}
		},
		provide: function() {
			return {
				name: () => this.name,
				price:() => this.price
		    } 
	    }
	  }
</script>

<style>
	.app{
		background-color: gray;
		padding: 10px;
	}
</style>