<template>
  <div class="child">
    <div>我是Child组件</div>
    <Son />
  </div>
</template>

<script>
import Son from "./Son.vue";
import { inject } from "vue";
export default {
  name: "Child",
  components: { Son },
  setup() {
    let car = inject('car')

   console.log('child======',car)

    return {
      car,
    };
  },
};
</script>

<style>
.child {
  background-color: skyblue;
  padding:10px;
}
</style>
