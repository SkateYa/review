<template>
  <div class="son">
    <div>我是son组件</div>
    <Dialog/>
  </div>
</template>

<script>
import { reactive, inject } from "vue";
import Dialog from "./Dialog.vue";
export default {
    name: "Son",
    setup() {
        let car = inject("car");
        console.log("son-----", car);
        return {
            car,
        };
    },
    components: { Dialog }
};
</script>

<style>
.son {
  background-color: orange;
  padding:10px;
}
</style>
