<template>
  <div class="parent">
    <button @click="changeChildData">改变子组件的值</button>
    <Child />
  </div>
</template>

<script>
/*

  $children：获取到一个包含所有子组件(不包含孙子组件)的 VueComponent 对象数组，
  可以直接拿到子组件中所有数据和方法等

  $parent：获取到一个父节点的 VueComponent 对象，同样包含父节点中所有数据和方法等
*/
import Child from "./Child.vue";
export default {
  name: "Parent",
  components: {
    Child,
  },
  data() {
    return {
      msg: "父组件123",
      name: "",
    };
  },
  methods: {
    changeChildData() {
      this.$children[0].name = 123
      console.log(this.$children[0].name);
    },
  },
};
</script>

<style scoped>
.parent {
  background-color: gray;
  height: 100px;
  padding: 30px;
}
</style>