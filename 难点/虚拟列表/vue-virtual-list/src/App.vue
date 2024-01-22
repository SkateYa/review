<template>
  <div class="container">
    <my-virtual-scroller :items="list" :itemSize="50" />
    <!-- <div
          class="infinite-list-item"
          v-for="item in list"
          :key="item.id"
          :style="{ height: 20 + 'px' }"
        >
          {{ item.label }}
        </div> -->
  </div>
</template>

<script>
import myVirtualScroller from '@/components/myVirtualScroller'
// 模拟一个长列表
const list = []
for(let i=0; i<100000; i++) {
  list.push({
    id: i,
    label: `virtual-list ${i}`
  })
}
export default {
  components: {
    myVirtualScroller
  },
  data() {
    return {
      list: list
    }
  }
}
</script>

<style scoped>
.container {
  height: 400px;
  border: 1px solid red;
}
</style>