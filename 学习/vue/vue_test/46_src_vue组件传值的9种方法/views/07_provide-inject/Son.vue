<template>
  <div class="son">
    <div>{{ studentName }}</div>
  </div>
</template>

<script>
export default {
  name: "Son",
  //  字符串数组 
  inject: ["studentName"],
  /*
  // 对象
  inject: {
    studentName: {
        form: "studentName",
        default: 20,
      },
    },
  */
  data() {
    return {
      name: "孙子组件123",
    };
  },
};
</script>

<style scoped>
.son {
  background-color: greenyellow;
  height: 100px;
  padding: 10px;
}
</style>
