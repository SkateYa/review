<template>
  <div class="child">
    <div>{{ studentName }}</div>
    <Son />
  </div>
</template>

<script>
import Son from "./Son.vue";
export default {
  name: "Child",
  inject: ["studentName"],
  components: {
    Son,
  },
  data() {
    return {
      name: "子组件123",
    };
  },
};
</script>

<style scoped>
.child {
  background-color: pink;
  height: 200px;
  padding: 10px;
}
</style>
