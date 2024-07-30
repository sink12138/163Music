<script setup lang="ts">
import { getCounts } from '@/utils/count'
import { FavoriteBorderRound } from '@vicons/material'

defineProps<{
  item: any
}>()
</script>

<template>
  <div class="reply-item">
    <div class="item-info">
      <div class="info-basic">
        <n-avatar size="medium" :src="item.picUrl + '?param=144y144'" />
        <div class="info-create">
          <n-button text>{{ item.name }}</n-button>
          <div class="text-xs">{{ item.time }}</div>
        </div>
      </div>
      <n-button text>
        <n-icon> <FavoriteBorderRound /> </n-icon>
        {{ getCounts(item.likedCount) }}
      </n-button>
    </div>
    <div class="item-content">
      {{ item.content }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reply-item {
  padding: 0px 0px 0px 20px;
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info-basic {
      display: flex;
      gap: 12px;
    }
  }
  .item-content {
    margin-top: 10px;
  }
}
</style>
