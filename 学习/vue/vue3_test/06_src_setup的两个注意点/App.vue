<template>
  <HelloWorld @hello="showHello" job="前端" salary="30">
    <template v-slot:test>
      <span>test---solt</span>
    </template>
  </HelloWorld>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: { HelloWorld },
  setup() {
    function showHello(msg) {
      alert(`我接受了子组件传递的参数${msg}`);
    }

    return {
      showHello,
    };
  },
};
</script>
