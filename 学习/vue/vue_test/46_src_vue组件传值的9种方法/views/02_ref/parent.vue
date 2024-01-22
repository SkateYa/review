<template>
  <div class="">
    <Child ref="child"></Child>
  </div>
</template>
<script>
import Child from "./Child.vue";
export default {
  data() {
    return {};
  },
  mounted() {
    const child = this.$refs.child;
    console.log(child.str); // 获取子组件的方法
    child.fn("调用了子组件的方法");
  },
  components: { Child },
};
</script>
​
