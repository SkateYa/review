<template>
    <div class="box">
      <el-table height="240" :data="showTableData" border style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="home" label="家乡"></el-table-column>
      </el-table>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        :page-sizes="[2, 4, 6, 10]"
        :total="total"
      >
      </el-pagination>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        pageIndex: 1, // 第几页
        pageSize: 4, // 每页几条数据
        total: 0, // 总条目数
        allTableData: [], // 所有的数据
        showTableData: [], // 当前展示的数据
      };
    },
    mounted() {
      setTimeout(() => {
        // 1. 模拟发请求获取所有的数据
        let apiAllTableData = [
          {
            name: "孙悟空",
            age: 500,
            home: "花果山水帘洞",
          },
          {
            name: "猪八戒",
            age: 88,
            home: "高老庄",
          },
          {
            name: "沙和尚",
            age: 1000,
            home: "通天河",
          },
          {
            name: "唐僧",
            age: 9999,
            home: "东土大唐",
          },
          {
            name: "白龙马",
            age: 12,
            home: "东海",
          },
          {
            name: "观音菩萨",
            age: 18,
            home: "南海",
          },
          {
            name: "玉皇大帝",
            age: 123456789,
            home: "凌霄宝殿",
          },
          {
            name: "如来佛祖",
            age: 9999999.999,
            home: "迦毗罗卫国",
          },
        ];
        // 2. 存一份所有的数据
        this.allTableData = apiAllTableData;
        // 3. 获取总条目数
        this.total = this.allTableData.length;
        // 4. 根据当前是第几页、每页展示几条，去截取需要展示的数据
        this.getShowTableData();
      }, 1000);
    },
    methods: {
      getShowTableData() {
        // 5. 获取截取开始索引
        let begin = (this.pageIndex - 1) * this.pageSize;
        // 6. 获取截取结束索引
        let end = this.pageIndex * this.pageSize;
        // 7. 通过索引去截取，从而展示
        this.showTableData = this.allTableData.slice(begin, end);
      },
      // 8. 页数改变，重新截取
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getShowTableData();
      },
      // 9. 条目数改变，也重新截取
      handleSizeChange(val) {
        this.pageIndex = 1;
        this.pageSize = val;
        this.getShowTableData();
      },
    },
  };
  </script>