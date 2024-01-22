<template>
	<div class="parent">
		<div>我是子组件传的数据：{{ name }}</div>
		<Child :msg="msg" @getChildData="getChildData" />
	</div>
</template>
  
<script>
import Child from "./Child.vue";
export default {
	name: "Parent",
	components: {
		Child,
	},
	data() {
		return {
			msg: "我是父组件",
			name: "",
		};
	},
	methods: {
		getChildData(value) {
			console.log(value);
			this.name = value;
		},
	},
};
</script>
  
<style scoped>
.parent {
	background-color: gray;
	height: 100px;
	padding: 30px;
}
</style>
  