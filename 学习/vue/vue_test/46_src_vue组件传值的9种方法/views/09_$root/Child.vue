// HelloWorld 子组件添加数据
<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // 写入根组件的数据
    // this.$root.foo = 2;
     // 获取根组件的数据
     console.log('获取根组件的数据',this.$root.foo);
  },
  methods: {},
};
</script>