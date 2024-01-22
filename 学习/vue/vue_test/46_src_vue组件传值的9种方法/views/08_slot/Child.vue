<template>
  <div>
    <slot name="a" :value="value"></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "我是子组件数据 作用域插槽子传父 s-z-h",
    };
  },
  methods: {},
};
</script>