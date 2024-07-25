<script setup lang="ts">
defineProps<{
  artist: any
}>()
</script>

<template>
  <div class="base-card" @click="$router.push({ path: '/artist', query: { id: artist.id } })">
    <div class="left-pic"><img :src="artist.img1v1Url + '?param=72y72'" /></div>
    <div class="right-content">
      <n-ellipsis class="text-base">{{ artist.name }}</n-ellipsis>
      <n-ellipsis class="text-xs">专辑:{{ artist.albumSize }}</n-ellipsis>
    </div>
  </div>
</template>
