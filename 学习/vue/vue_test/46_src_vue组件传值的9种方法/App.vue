<template>
	<div class="com">
		<h1>
			各种Vue组件间通信/传值(9种方式)
			<span style="color: red;">非常重要, 面试必备</span>
		</h1>

		<div>
			<h2 style="display: inline">演示:</h2>&nbsp;&nbsp;
			<router-link to="/props_pre">01_props-$emit</router-link>&nbsp;&nbsp;
			<router-link to="/ref_pre">02_ref</router-link>&nbsp;&nbsp;
			<router-link to="/bus_pre">03_event-bus</router-link>&nbsp;&nbsp;
			<router-link to="/model_pre">04_v-model</router-link>&nbsp;&nbsp;
			<router-link to="/attrs-listeners_pre">05_$attrs-$listeners</router-link>&nbsp;&nbsp;
			<router-link to="/parent_children_pre">06_$parent-$children</router-link>&nbsp;&nbsp;
			<router-link to="/provide-inject_pre">07_provide-inject</router-link>&nbsp;&nbsp;
			<router-link to="/slot_pre">08_slot</router-link>&nbsp;&nbsp;
			<router-link to="/root_pre">09_$root</router-link>&nbsp;&nbsp;
		</div>
		<br>
		<router-view></router-view>
	</div>
</template>
  
<script>
export default {
	name: 'App',
	data() {
		return {
			foo: 'appFoo'
		}
	}
}
</script>
<style lang="less" scoped>
.com {
	margin: 10px;

	a {
		font-size: 16px;
		margin-right: 5px;

		&.router-link-active {
			color: red;
		}
	}
}
</style>
<style>
.box {
	border: solid 1px #aaa;
	margin: 5px;
	padding: 5px;
}
</style>