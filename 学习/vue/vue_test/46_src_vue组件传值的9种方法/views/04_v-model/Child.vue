<template>
 <div class="child">
  <input :value="obj" @input="handlerChange" />
 </div>
</template>
<script>
export default {
  props: ["obj"],
  methods: {
    handlerChange(e) {
      // 如果有上面的重命名就是这样
      this.$emit("input", e.target.value);
    },
  },
};
</script>
<style>
.child {
  background-color: pink;
  height: 50px;
}
</style>