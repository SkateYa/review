<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h3>工作类型：{{job.type}}</h3>
  <h3>工资：{{job.salary}}</h3>
  <button @click="changeInfo">修改数据
  </button>
</template>

<script>
import {ref} from 'vue'
export default {
  name: "App",
  setup() {
    let name = ref("张三");
    let age = ref(18);
    let job = ref({
      type:'开发',
      salary:'10k'
    })

    function changeInfo() {
      name.value = '李四'
      age.value = 22
      job.value.type = '前端'
      job.value.salary = '20k'
      console.log('name,age',name,age,)
    }

    return {
      name,
      age,
      job,
      changeInfo,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
