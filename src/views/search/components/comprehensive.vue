<script setup lang="ts">
import SongCard from '@/components/card/song-card.vue'
defineProps<{
  pageData: any
}>()
</script>

<template>
  <n-space justify="space-between">
    <SongCard v-for="song in pageData.song.songs" :song="song"></SongCard>
  </n-space>
</template>
