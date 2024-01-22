
 
// Home 父组件访问数据
<template>
  <div class="">
    父组件
    <Child></Child>
  </div>
</template>
<script>
import Child from "./Child.vue";
export default {
    data() {
        return {};
    },
    mounted() {
        // 获取根组件的数据
        console.log('获取根组件的数据',this.$root.foo);
    },
    components: { Child }
};
</script>