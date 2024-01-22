<template>
  <div>当前数字为:{{ num }}</div>
  <button @click="num++">num+1</button>
</template>

<script>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
export default {
  name: "App",
  setup() {
    let num = ref(0);

    //通过组合式API的形式去使用生命周期钩子
    onBeforeMount(() => {
      console.log("onBeforeMount======");
    });
    onMounted(() => {
      console.log("onMounted======");
    });
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate======");
    });
    onUpdated(() => {
      console.log("onUpdated======");
    });
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount======");
    });
    onUnmounted(() => {
      console.log("onUnmounted======");
    });

    return {
      num,
    };
  },
  //通过配置项的形式使用生命周期钩子
  beforeCreate() {
    console.log("beforeCreate======");
  },
  created() {
    console.log("created======");
  },
  beforeMount() {
    console.log("beforeMount======");
  },
  mounted() {
    console.log("mounted======");
  },
  beforeUpdate() {
    console.log("beforeUpdate======");
  },
  updated() {
    console.log("updated======");
  },
  beforeUnmount() {
    console.log("beforeUnmount======");
  },
  unmounted() {
    console.log("unmounted======");
  },
};
</script>
