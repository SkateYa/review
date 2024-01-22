<template>
	<div class="child">
		<h3>我是Child组件（子）,{{newCar}}--{{newPrice}}</h3>
		<Son/>
	</div>
</template>

<script>
	import Son from './Son.vue'
	export default {
		name:'Child',
		components:{Son},
		data(){
			return{

			}
		},
		inject: ['name','price'],
		computed: {
			newCar() {
				return this.name()
			},
			newPrice(){
				return this.price()
			}
		}
	}
</script>

<style>
	.child{
		background-color: skyblue;
		padding: 10px;
	}
</style>