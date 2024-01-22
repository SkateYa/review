<template>
  <div class="app">
    <div>我是app组件</div>
    <Child />
  </div>
</template>

<script>
import Child from "./components/Child.vue";
import { reactive, provide,toRefs } from "vue";
export default {
  name: "App",
  components: { Child },
  setup() {
    let car = reactive({
      name: "奔驰",
      price: "30w",
    });

    provide("car", car);

    return {
      car,
      ...toRefs(car)
    };
  },
};
</script>

<style>
.app {
  background-color: gray;
  padding:10px;
}
</style>
