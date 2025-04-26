<script setup lang="ts">
import { getCounts } from '@/utils/count'
const props = defineProps<{
  playlist: any
}>()
</script>

<template>
  <div class="base-card" @click="$router.push({ path: '/playlist', query: { id: playlist.id } })">
    <div class="left-pic">
      <img :src="playlist.coverImgUrl + '?param=144y144'" />
    </div>
    <div class="right-content">
      <n-ellipsis class="text-base">{{ playlist.name }}</n-ellipsis>
      <n-ellipsis class="text-xs">播放量: {{ getCounts(playlist.playCount) }}</n-ellipsis>
    </div>
  </div>
</template>
