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
  <div
    class="list-item"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="$router.push({ path: '/playlist', query: { id: item.id } })"
  >
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
