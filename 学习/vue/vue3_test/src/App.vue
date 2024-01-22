<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ person.name }}</h2>
  <h2>年龄：{{ person.age }}</h2>
  <h2>性别：{{ person.sex }}</h2>
  <h3>工作类型：{{ person.job.type }}</h3>
  <h3>工资：{{ person.job.salary }}</h3>
  <h3>爱好：{{ person.hobby }}</h3>
  <h3>测试数据c：{{ person.job.a.b.c }}</h3>
  <button @click="deleteName">删除name属性</button>
  <button @click="addSex">添加一个性别</button>
  <button @click="changeInfo">修改数据</button>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  name: "App",
  setup() {
    let person = reactive({
      name: '张三',
      age: 18,
      hobby: ['抽烟', '喝酒', '烫头'],
      job: {
        type: '开发',
        salary: '10k',
        a: {
          b: {
            c: 222
          }
        }
      }
    })
    function changeInfo() {
      person.name = '李四'
      person.age = 22
      person.job.type = '前端'
      person.job.salary = '20k'
      person.job.a.b.c = 999
      person.hobby[0] = '开发'
    }

    function addSex() {
      person.sex = "女";
      console.log(person.sex)
    }
    function deleteName() {
      delete person.name;
    }
    return {
      person,
      changeInfo,
      addSex,
      deleteName
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
