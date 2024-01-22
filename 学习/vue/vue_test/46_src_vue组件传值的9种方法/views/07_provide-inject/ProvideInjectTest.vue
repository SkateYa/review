<template>
  <div class="parent">
    <Child />
  </div>
</template>

<script>
/*
  provide：可以让我们指定想要提供给后代组件的数据或方法

  inject：在任何后代组件中接收想要添加在这个组件上的数据或方法，不管组件嵌套多深都可以直接拿来用

  要注意的是 provide 和 inject 传递的数据不是响应式的，也就是说用 inject 接收来数据后，
  provide 里的数据改变了，后代组件中的数据不会改变，除非传入的就是一个可监听的对象
*/

import Child from "./Child.vue";
export default {
  name: "Parent",
  components: {
    Child,
  },
  //  // 对象
  provide: {
    studentName: "帕科",
  },
  /*
  // 函数
      provide() {
        return {
          studentName: "帕科",
        };
      },
  */ 
  data() {
    return {
      msg: "父组件123",
      name: "",
    };
  },
};
</script>

<style scoped>
.parent {
  background-color: gray;
  height: 300px;
  padding: 30px;
}
</style>
