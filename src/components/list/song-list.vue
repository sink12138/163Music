<script setup lang="ts">
import { getDuration } from '@/utils/time'
import {
  PlayArrowRound,
  FavoriteBorderRound,
  ChatBubbleOutlineRound,
  MoreVertOutlined,
  DownloadRound
} from '@vicons/material'
import { ref } from 'vue'

defineProps<{
  tableData: any
}>()
const hover = ref(-1)
</script>

<template>
  <div class="list">
    <div
      class="list-item"
      v-for="(item, index) in tableData"
      @mouseover="hover = index"
      @mouseleave="hover = -1"
    >
      <div class="item-left">
        <div class="item-index">
          <n-button v-if="hover == index" text style="font-size: 24px">
            <n-icon> <PlayArrowRound /> </n-icon>
          </n-button>
          <span v-else>#{{ index + 1 }}</span>
        </div>
        <n-avatar size="large" :src="item.al.picUrl" />
        <div class="item-info">
          <div class="item-title">
            <n-button text>{{ item.name }}</n-button>
          </div>
          <div class="item-description">
            <span v-if="item.fee == 1" class="item-tag">VIP</span>
            <span text v-for="(artist, arIndex) in item.ar">
              <span v-if="arIndex != 0">/</span>
              <n-button text>{{ artist.name }}</n-button>
            </span>
            <span> ——— </span>
            <n-button text>{{ item.al.name }}</n-button>
          </div>
        </div>
      </div>
      <div class="item-center" v-show="hover == index">
        <n-button text style="font-size: 24px">
          <n-icon> <ChatBubbleOutlineRound /> </n-icon>
        </n-button>
        <n-button text style="font-size: 24px">
          <n-icon> <DownloadRound /> </n-icon>
        </n-button>
        <n-button text style="font-size: 24px">
          <n-icon> <MoreVertOutlined /> </n-icon>
        </n-button>
      </div>
      <div class="item-right">
        <n-button text style="font-size: 24px">
          <n-icon> <FavoriteBorderRound /> </n-icon>
        </n-button>
        <div class="item-duration">{{ getDuration(item.dt) }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  height: calc(100% - 40px);
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
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
  .item-right {
    width: 10%;
    display: flex;
    align-items: center;
    gap: 10%;
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
