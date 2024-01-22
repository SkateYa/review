<template>
  <div class="child">
    <div>{{ name }}</div>
    <div>{{ msg }} </div>
  </div>
</template>

<script>
export default {
  name: 'Child',
  data() {
    return {
      name: '子组件名称'
    };
  },
  computed: {
    msg() {
      return this.$parent.msg
    }
  },
};
</script>

<style scoped>
.child {
  background-color: pink;
  height: 50px;
}
</style>
