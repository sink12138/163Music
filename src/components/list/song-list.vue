<script setup lang="ts">
import SongListItem from './components/song-list-item.vue'

defineProps<{
  tableData: any
}>()
</script>

<template>
  <div class="list">
    <div v-for="(item, index) in tableData">
      <SongListItem :item="item" :index="index" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  height: calc(100% - 40px);
  overflow-y: auto;
}
</style>
