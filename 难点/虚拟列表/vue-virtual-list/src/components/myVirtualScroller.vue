<template>
  <!-- 最底层的可视区容器 -->
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <!-- 中间的可滚动区域，z-index=-1，高度和真实列表相同，目的是出现相同的滚动条 -->
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <!-- 最上层的可视区列表，数据和偏移距离随着滚动距离的变化而变化 -->
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script>
// 虚拟列表的实现，实际上就是在首屏加载的时候，只加载可视区域内需要的列表项，当滚动发生时，动态通过计算获得可视区域内的列表项，并将非可视区域内存在的列表项删除。

// 计算当前可视区域起始数据索引(startIndex)
// 计算当前可视区域结束数据索引(endIndex)
// 计算当前可视区域的数据，并渲染到页面中
// 计算startIndex对应的数据在整个列表中的偏移位置startOffset并设置到列表上
export default {
    // 定高虚拟列表
    name: 'myVirtualScroller',
    props: {
      //列表数据
      items: {
        type: Array,
        default: () => []
      },
      //列表项高度
      itemSize: {
        type: Number,
        default: 50
      }
    },
    data() {
      return {
        screenHeight: 0, //可视区域高度
        startOffset: 0, //偏移量
        startIndex: 0, // 开始索引
        endIndex: 0 //结束索引
      }
    },
    computed: {
      //列表总高度 ---固定值
      listHeight() {
        console.log('listHeight', this.items.length * this.itemSize)
        return this.items.length * this.itemSize
      },
      //可显示的列表数目  --- 不改变
      visibleCount() {
        // Math.ceil向上取整
        console.log('visibleCount',this.screenHeight , this.itemSize,this.screenHeight / this.itemSize)
        return Math.ceil(this.screenHeight / this.itemSize)
      },
      //可视区列表偏移距离对应的样式
      getTransform() {
        console.log('getTransform', this.startOffset)
        return `translate3d(0,${this.startOffset}px,0)`
      },
      //获取可视区列表数据, 让 Vue.js 更新
      visibleData() {
        console.log('visibleData',this.startIndex,this.endIndex,this.items.slice(this.startIndex, Math.min(this.endIndex, this.items.length)))
        return this.items.slice(this.startIndex, Math.min(this.endIndex, this.items.length))
      }
    },
    mounted() {
      this.screenHeight = this.$refs.list.clientHeight
      this.startIndex = 0
      this.endIndex = this.startIndex + this.visibleCount
    },
    methods: {
      // 监听scroll，获取滚动位置scrollTop
      scrollEvent() {
        console.log('scrollEvent')
        //当前滚动位置
        let scrollTop = this.$refs.list.scrollTop
        //此时的开始索引
        // Math.floor 向下取整
        this.startIndex = Math.floor(scrollTop / this.itemSize)
        //此时的结束索引
        this.endIndex = this.startIndex + this.visibleCount
        //此时的偏移距离
        this.startOffset = scrollTop - (scrollTop % this.itemSize)
      }
    }
  }
</script>
<style scoped>
  .infinite-list-container {
    height: 100%;
    overflow: auto;
    position: relative;
    background: pink;
  }

  .infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
    background: deeppink;
  }
  .infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
  }
  .infinite-list-item {
    line-height: 50px;
    text-align: center;
    color: #555;
    border: 1px solid blue;
    box-sizing: border-box;
  }
</style>