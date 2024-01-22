<template>
  <div>
    <button @click="isShow = !isShow">点我弹个窗</button>
    <teleport to="body">
     <div v-if="isShow" class="mask">
        <div class="dialog">
        <h3>我是一个弹窗</h3>
        <h4>一些内容</h4>
        <h4>一些内容</h4>
        <h4>一些内容</h4>
        <h4>一些内容</h4>
        <button @click="isShow = !isShow">关闭弹窗</button>
      </div>
     </div>
    </teleport>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let isShow = ref(false);

    return {
      isShow,
    };
  },
};
</script>

<style>
.dialog {
  width: 330px;
  height: 300px;
  background-color: blue;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
}
.mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
}
</style>
