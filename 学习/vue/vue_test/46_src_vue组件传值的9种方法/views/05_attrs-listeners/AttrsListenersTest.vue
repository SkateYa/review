<template>
  <div class="parent">
    <Child :name="name" :age="age" :gender="gender" :height="height" title="程序员成长指北" @eventOne='eventHandler'
      @click.native='clickHandler' />
  </div>
</template>

<script>
/*
    多层嵌套组件传递数据时，如果只是传递数据，而不做中间处理的话就可以用这个，
    比如父组件向孙子组件传递数据时

    $attrs：包含父作用域里除 class 和 style 除外的非 props 属性集合。
    通过 this.$attrs 获取父作用域中所有符合条件的属性集合，然后还要继续传给子组件内部的其他组件，
    就可以通过 v-bind="$attrs"

    $listeners：包含父作用域里 .native 除外的监听事件集合。如果还要继续传给子组件内部的其他组件，
    就可以通过 v-on="$linteners"
*/
import Child from "./Child.vue";
export default {
  name: "Parent",
  components: {
    Child,
  },
  data() {
    return {
      name: "zhang",
      age: "18",
      gender: "女",
      height: "158",
    };
  },
  methods: {
    eventHandler() {
      console.log('触发了Parent中的eventHandler s-z-h')
    },
    clickHandler() {
      console.log('触发了Parent中的clickHandler')
    }
  }
};
</script>

<style scoped>
.parent {
  background-color: gray;
  height: 200px;
  padding: 30px;
}
</style>