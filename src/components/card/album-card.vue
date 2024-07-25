<script setup lang="ts">
import router from '@/router'
import { getTime } from '@/utils/time'
defineProps<{
  album: any
}>()
</script>

<template>
  <div class="base-card" @click="$router.push({ path: '/album', query: { id: album.id } })">
    <div class="left-pic"><img :src="album.picUrl + '?param=72y72'" /></div>
    <div class="right-content">
      <n-ellipsis class="text-base">{{ album.name }}</n-ellipsis>
      <n-ellipsis class="text-xs">{{ album.artist.name }}</n-ellipsis>
      <n-ellipsis class="text-xs">{{ getTime(album.publishTime) }}</n-ellipsis>
    </div>
  </div>
</template>
