<template>
  <button @click="display = !display">显示/隐藏</button>
  <HelloWorld v-if="display"/>
  <hr>
  <Test/>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Test from './components/Test.vue'
import {  ref } from "vue";
export default {
  name: "App",
  components: { HelloWorld,Test },
  setup() {
    let display = ref(true);
   


    return {
      display
    };
  },
};
</script>
