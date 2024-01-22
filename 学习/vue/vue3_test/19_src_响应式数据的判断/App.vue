<template>
  <div class="app">
    <div>我是app组件{{name}}===={{price}}</div>
   
  </div>
</template>

<script>

import { ref,reactive, readonly, isRef,isReactive,isReadonly,isProxy} from "vue";
export default {
  name: "App",
  setup() {
    let sum = ref(0)
    let car = reactive({
      name: "奔驰",
      price: "30w",
    });
    let car2=readonly(car)

    console.log(isRef(sum))
    console.log(isReactive(car))
    console.log(isReadonly(car2))
    console.log(isProxy(car))
    console.log(isProxy(sum))
    console.log(isRef(car))
    console.log(isReactive(sum))



   

    return {
      sum,
      car,
     
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
