<script setup lang="ts">
import AlbumlistItem from './components/album-list-item.vue'

defineProps<{
  tableData: any
}>()
</script>

<template>
  <div class="list">
    <div class="w-full flex text-red-400">
      <div class="w-1/2">
        <span style="padding: 0 40px 0 5px">##</span>
        <span>标题</span>
      </div>
      <div class="w-2/5 flex justify-between">
        <span>作者</span>
        <span>时间</span>
      </div>
    </div>
    <n-infinite-scroll class="h-full" :distance="10" @load="$emit('loadData')">
      <div v-for="(item, index) in tableData">
        <AlbumlistItem :item="item" :index="index" />
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
.list-item {
  height: 60px;
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid rgb(245 245 244);
  background-color: rgb(245 245 244);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-left {
    width: 50%;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    .item-index {
      width: 48px;
      display: flex;
      align-items: center;
    }
    .item-info {
      margin-left: 5px;
      .item-title {
        font-size: 14px;
      }
      .item-description {
        display: flex;
        align-items: center;
        .item-tag {
          font-size: 10px;
          color: rgb(239 68 68);
          border: 1px solid rgb(239 68 68);
          border-radius: 3px;
          margin-right: 3px;
        }
        button {
          font-size: 12px;
        }
      }
    }
  }
  .item-center {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item-right {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.list-item:hover {
  border-radius: 4px;
  border: 1px solid rgb(248 113 113);
  background-color: rgb(255 255 255);
  box-shadow: 0px 4px 12px 0px rgba(220, 38, 38, 0.25);
  cursor: default;
}
</style>
