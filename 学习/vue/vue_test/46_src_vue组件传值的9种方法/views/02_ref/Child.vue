<template>
  <input type="text" v-model="str" />
</template>
<script>
export default {
  data() {
    return {
      str: "我是子组件的数据",
    };
  },
  methods: {
    fn(e) {
      console.log(e);
    },
  },
};
</script>