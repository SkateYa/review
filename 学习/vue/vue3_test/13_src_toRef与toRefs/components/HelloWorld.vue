<template>
  <!-- <div>当前数字为:{{ num }}</div>
  <button @click="num++">num+1</button>
  <div>名称：{{ msg }}</div>
  <button @click="msg = msg + '!'">修改msg</button> -->

<h3>{{person}}</h3>
  <h3>姓名：{{ name }}</h3>
  <h3>年龄：{{ age }}</h3>
  <h3>薪资：{{ job.b1.salary }} k</h3>
  <button @click="name += '@'">修改姓名</button>
  <button @click="age++">修改年龄</button>
  <button @click="job.b1.salary++">修改薪资</button>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import { reactive, ref,toRef,toRefs } from "vue";
export default {
  name: "App",
  // components: { HelloWorld },
  setup() {
    let num = ref(0);
    let msg = ref("hello");
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        b1: {
          salary: 10,
        },
      },
    });


   let a = toRefs(person)
    console.log('22',a)
    var obj ={ ...toRefs(person)}
    console.log('obj',obj)

    return {
      person,
     ...toRefs(person)
    };
  },
};
</script>
