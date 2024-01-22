<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ person.name }}</h2>
  <h2>年龄：{{ person.age }}</h2>
  <slot name="test"></slot>
  <button @click="sendData">传递数据</button>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "App",
  props: ["job", "salary"],
  emits: ["hello"],
  setup(props, context) {
    // console.log('---setup---',props)
    // console.log('---setup---',context)
    // console.log('---setup---',context.attrs) //相当与Vue2中的$attrs
    // console.log('---setup---',context.emit) //触发自定义事件的。
    // console.log('---setup---',context.slots) //插槽
    console.log(props, context);

    //数据
    let person = reactive({
      name: "张三",
      age: 18,
    });

    //方法
    function sendData() {
      context.emit("hello", 666);
    }
    return {
      person,
      sendData,
    };
  },
};
</script>
