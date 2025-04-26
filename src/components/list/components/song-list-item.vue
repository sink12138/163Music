<script setup lang="ts">
import { ref } from 'vue'
import { getDuration } from '@/utils/time'
import {
  PlayArrowRound,
  FavoriteBorderRound,
  ChatBubbleOutlineRound,
  MoreVertOutlined,
  DownloadRound
} from '@vicons/material'

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
    @click="$router.push({ path: '/song', query: { id: item.id } })"
  >
    <div class="item-left">
      <div class="item-index">
        <span v-if="!hover">#{{ index + 1 }}</span>
        <n-button v-else text style="font-size: 24px">
          <n-icon> <PlayArrowRound /> </n-icon>
        </n-button>
      </div>
      <n-avatar size="large" :src="item.al.picUrl + '?param=144y144'" />
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
    <div class="item-action" v-show="hover">
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
</template>
