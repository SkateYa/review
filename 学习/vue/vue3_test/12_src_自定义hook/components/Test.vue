<template>
  <div>测试=====</div>
  <h2>当前x的坐标：{{ point.x }}, y的坐标：{{ point.y }}</h2>
</template>

<script>
import usePoint from "../hooks/usePoint";
export default {
  name: "Test",
  setup() {
    let point = usePoint();

    return {
      point,
    };
  },
};
</script>
