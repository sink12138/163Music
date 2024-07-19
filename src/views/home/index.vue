<script setup lang="ts">
import { ref } from 'vue'
import SongCard from '@/components/card/song-card.vue'
</script>

<template>
  <n-space>
    <SongCard v-for="index in 5"></SongCard>
  </n-space>
</template>
