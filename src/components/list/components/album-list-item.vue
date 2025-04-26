<script setup lang="ts">
import { ref } from 'vue'
import { getTime } from '@/utils/time'
import { PlayArrowRound } from '@vicons/material'

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
    @click="$router.push({ path: '/album', query: { id: item.id } })"
  >
    <div class="item-left">
      <div class="item-index">
        <span v-if="!hover">#{{ index + 1 }}</span>
        <n-button v-else text style="font-size: 24px">
          <n-icon> <PlayArrowRound /> </n-icon>
        </n-button>
      </div>
      <n-avatar size="large" :src="item.picUrl + '?param=144y144'" />
      <div class="item-info">
        <div class="item-title">
          <n-button text>{{ item.name }}</n-button>
        </div>
      </div>
    </div>
    <div class="item-center">
      <n-ellipsis>{{ item.artist.name }}</n-ellipsis>
      <n-ellipsis>{{ getTime(item.publishTime) }}</n-ellipsis>
    </div>
    <div class="item-right"></div>
  </div>
</template>
