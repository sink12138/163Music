<script setup lang="ts">
import { reactive } from 'vue'
import { PlayArrowRound, FormatListBulletedRound, DownloadRound } from '@vicons/material'

defineProps<{
  song: any
}>()
</script>

<template>
  <div class="base-card" @click="$router.push({ path: '/song', query: { id: song.id } })">
    <div class="left-pic">
      <img :src="song.al.picUrl + '?param=144y144'" />
    </div>
    <div class="right-content">
      <n-ellipsis class="title">{{ song.name }}</n-ellipsis>
      <n-ellipsis class="artist" :tooltip="false">
        <n-button text>{{ song.ar[0].name }}</n-button>
        <n-button text v-for="artist in song.ar.slice(1)">/{{ artist.name }}</n-button>
      </n-ellipsis>
      <div class="buttons">
        <n-button text>
          <template #icon>
            <PlayArrowRound />
          </template>
        </n-button>
        <n-button text>
          <template #icon>
            <FormatListBulletedRound />
          </template>
        </n-button>
        <n-button text>
          <template #icon>
            <DownloadRound />
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>
