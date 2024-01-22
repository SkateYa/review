<template>
  <button @click="display = !display">显示/隐藏</button>
  <HelloWorld v-if="display"/>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import {  ref } from "vue";
export default {
  name: "App",
  components: { HelloWorld },
  setup() {
    let display = ref(true);
   


    return {
      display
    };
  },
};
</script>
