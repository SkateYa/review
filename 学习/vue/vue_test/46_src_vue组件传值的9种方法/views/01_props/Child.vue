<template>
  <div class="child">
    <div>{{ msg }}</div>
    <button @click="sendParentData">给父组件传递数据</button>
  </div>
</template>

<script>
export default {
  name: "Child",
  props: ["msg"],
  /*
    props: {
    // 检测类型 + 其他验证
    age: {
      type: String,
      default: '',
      required: false,
      validator: function (value) {
        return value >= 0
      }
    }
  },
  */
  data() {
    return {
      name: "我是子组件的数据",
    };
  },
  methods: {
    sendParentData() {
      this.$emit("getChildData", this.name);
    },
  },
};
</script>

<style scoped>
.child {
  background-color: pink;
  height: 50px;
}
</style>