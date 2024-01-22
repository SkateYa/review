<template>
  <div class="child">
    <p>name: {{ name }}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>

    <!-- 此时Son组件把从父组件传来的监听器，在传给孙组件 -->
    <GrandSon v-bind="$attrs" v-on="this.$listeners" />
  </div>
</template>

<script>
import GrandSon from "./GrandSon.vue";
export default {
  name: "Child",
  components:{GrandSon},
  data() {
    return {};
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    name: String, // name作为props属性绑定
  },
  mounted() {
    // //这样子组件或孙组件通过emit触发Parent组件中的监听函数  让后代组件触发祖先组件
    //父组件监听了两个事件，一个eventOne， 一个click，由于click被native修饰了，故$listerners 只有eventOne事件
    console.log('this.$listeners', this.$listeners) //{eventOne: fn}
    this.$emit('eventOne') //可以触发Parent组件中的eventHandler函数
  },
  created() {
    console.log('this.$attrs',this.$attrs);
    // { "age": "18", "gender": "女", "height": "158", "title": "程序员成长指北" }
  },
};
</script>

<style scoped>
.child {
  background-color: pink;
  height: 150px;
  padding: 10px;
}
</style>