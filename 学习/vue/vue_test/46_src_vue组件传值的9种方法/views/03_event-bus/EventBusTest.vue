<template>
  <div class="parent">
    <button @click="sendData">给子组件传值</button>
    <Child />
  </div>
</template>

<script>
/**
    // 第一种方法
    new Vue({
      el:'#app',
      // eventBus (事件总线)
      beforeCreate(){
        Vue.prototype.$bus = this
      },
      render: h => h(App),
      router:router
    })

    //  第二种方法
    // 找到main.js 加入一下代码  公共的$bus
   Vue.prototype.$bus = new Vue()
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
    };
  },
  methods: {
    sendData() {
      this.$bus.$emit("sendChildData", this.msg);
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