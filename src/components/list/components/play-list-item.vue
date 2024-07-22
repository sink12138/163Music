<script setup lang="ts">
import { ref } from 'vue'
import { getCounts } from '@/utils/count'
import { PlayArrowRound, FavoriteBorderRound } from '@vicons/material'

defineProps<{
  item: any
  index: number
}>()
const hover = ref(false)
</script>

<template>
  <div class="list-item" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="item-left">
      <div class="item-index">
        <n-button v-if="hover" text style="font-size: 24px">
          <n-icon> <PlayArrowRound /> </n-icon>
        </n-button>
        <span v-else>#{{ index + 1 }}</span>
      </div>
      <n-avatar size="large" :src="item.coverImgUrl" />
      <div class="item-info">
        <div class="item-title">
          <n-button text>{{ item.name }}</n-button>
        </div>
      </div>
    </div>
    <div class="item-center">
      <n-ellipsis>{{ item.trackCount }}首</n-ellipsis>
      <n-ellipsis>{{ item.creator.nickname }}</n-ellipsis>
      <n-ellipsis>{{ getCounts(item.playCount) }}</n-ellipsis>
    </div>
    <div class="item-right">
      <n-button text style="font-size: 24px">
        <n-icon> <FavoriteBorderRound /> </n-icon>
      </n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
