<script setup lang="ts">
import { reactive } from 'vue'
import { PlayArrowRound, FormatListBulletedRound, DownloadRound } from '@vicons/material'

defineProps<{
  song: any
}>()
</script>

<template>
  <div class="song-card">
    <div class="left-pic"><img :src="song.al.picUrl" /></div>
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

<style lang="scss" scoped>
.song-card {
  height: 100px;
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgb(245 245 244);
  border-radius: 6px;
  gap: 8px;
  .left-pic {
    height: 72px;
    width: 72px;
    img {
      opacity: 0.9;
      border-radius: 25%;
    }
  }
  .right-content {
    height: 100px;
    width: 120px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .title {
      width: 100%;
      padding: 0 4px;
      font-size: 14px;
    }
    .artist button {
      font-size: 12px;
    }
    .buttons {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }
  }
}
.song-card:hover {
  background-color: rgb(254 202 202);
  border-radius: 6px;
  transition: 0.3s ease-in-out;
  img {
    opacity: 1;
  }
}
</style>
