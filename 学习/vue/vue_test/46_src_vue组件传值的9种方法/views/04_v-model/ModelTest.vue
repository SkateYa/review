// 父组件组件 这个是 v-model:obj="value"
<template>
  <div class="parent">
    <Child v-model="value"></Child>
    {{ value }}
  </div>
</template>
<script>
import Child from "./Child.vue";
export default {
  data() {
    return {
      value: "我是Home里的数据 响应式的",
    };
  },
  components: { Child },
};
</script>

<style scoped>
.parent {
	background-color: gray;
	height: 100px;
	padding: 30px;
}
</style>
  
​
