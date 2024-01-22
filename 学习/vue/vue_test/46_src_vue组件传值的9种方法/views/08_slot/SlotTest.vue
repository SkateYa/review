<template>
  <div class="">
    <Child>
      <template v-slot:a="value">
        <!-- 这个是具名插槽 -->
        <h2>{{ name }}</h2> 
         <!--  value 是子组件传过来的数据 -->
         <!-- 这个是作用域插槽 -->
        <h4>{{ value.value }}</h4> 
      </template>
    </Child>
  </div>
</template>
<script>
import Child from "./Child.vue";
export default {
  data() {
    return {
      name: "具名插槽 slot插槽传数据 父传子",
    };
  },
  components: { Child },
};
</script>
