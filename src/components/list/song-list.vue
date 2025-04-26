<script setup lang="ts">
import SongListItem from './components/song-list-item.vue'

defineProps<{
  tableData: any
}>()
</script>

<template>
  <div class="list">
    <div class="w-full flex text-red-400 my-2">
      <div class="w-1/2">
        <span style="padding-right: 24px">##</span>
        <span>标题</span>
      </div>
      <div class="w-7/20"></div>
      <div class="w-3/20 flex justify-center gap-2">
        <span>喜爱</span>
        <span>单曲时长</span>
      </div>
    </div>
    <div v-for="(item, index) in tableData">
      <SongListItem :item="item" :index="index" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>
