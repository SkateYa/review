<template>
  <div class="child">
    <div>子组件==父组件名称:{{ parentName }}</div>
  </div>
</template>

<script>
export default {
  name: "Child",
  data() {
    return {
      name: "子组件123",
      parentName: ''
    };
  },
  mounted() {
      this.$bus.$on('sendChildData',(data)=>{
         console.log(data)
         this.parentName = data
      })
  },
  beforeDestroy() {
    // 销毁事件
	this.$bus.$off('sendChildData')
  },
};
</script>

<style scoped>
.child {
  background-color: pink;
  height: 50px;
  padding: 10px;
}
</style>