<template>
    <p><span style="color:red">{{item.id}}</span>{{item.value}}</p>
  </template>
  
  
  <script>
  export default {
    name:'VirtualItem',
    props: {
      item:{
        type:Object,
        default:() => {}
      }
    }
  };
  </script>
  
  
  <style scoped>
  </style>