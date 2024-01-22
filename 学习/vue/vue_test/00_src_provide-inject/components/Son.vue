<template>
	<div class="son">
		<h3>我是Son组件（孙），{{newCar}}--{{newPrice}}</h3>
	</div>
</template>

<script>
	export default {
		name:'Son',
		inject: ['name','price'],
		computed: {
			newCar() {
				return this.name()
			},
			newPrice(){
				return this.price()
			}
		},
	}
</script>

<style>
	.son{
		background-color: orange;
		padding: 10px;
	}
</style>