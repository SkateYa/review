<template>
  <div>当前数字为:{{ num }}</div>
  <button @click="num++">num+1</button>
  <h2>当前x的坐标：{{ point.x }}, y的坐标：{{ point.y }}</h2>
</template>

<script>
import { ref } from "vue";
import usePoint from "../hooks/usePoint";
export default {
  name: "App",
  setup() {
    let num = ref(0);
    let point = usePoint();

    return {
      num,
      point,
    };
  },
};
</script>
