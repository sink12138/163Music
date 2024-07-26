<script setup lang="ts">
import PlaylistItem from './components/play-list-item.vue'
import { ref } from 'vue'

defineProps<{
  tableData: any
}>()
const hover = ref(-1)
</script>

<template>
  <div class="list">
    <div class="w-full flex text-red-400">
      <div class="w-1/2">
        <span style="padding: 0 40px 0 5px">##</span>
        <span>标题</span>
      </div>
      <div class="w-7/20 flex justify-between">
        <span>歌曲数</span>
        <span>创建者</span>
        <span>播放数</span>
      </div>
    </div>
    <n-infinite-scroll class="h-full" :distance="10" @load="$emit('loadData')">
      <div v-for="(item, index) in tableData">
        <PlaylistItem :item="item" :index="index" />
      </div>
    </n-infinite-scroll>
  </div>
</template>

<style lang="scss" scoped>
.list {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
