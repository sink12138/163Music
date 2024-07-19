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
      <span class="title">{{ song.name }}</span>
      <div class="artist">
        <n-button text>{{ song.ar[0].name }}</n-button>
        <span v-for="artist in song.ar.slice(1)"
          >/<n-button text>{{ artist.name }}</n-button></span
        >
      </div>
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
  cursor: pointer;
  background-color: rgb(254 226 226);
  border-radius: 0 6px 6px 0;
  :hover {
    background-color: rgb(254 202 202);
    border-radius: 0 6px 6px 0;
  }

  .left-pic {
    height: 100px;
    width: 100px;
    img {
      border-radius: 6px 0 0 6px;
    }
  }
  .right-content {
    height: 100px;
    width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .title {
      font-family: 'Fira code';
      font-size: 14px;
      text-overflow: ellipsis;
    }
    .artist {
      font-family: sans-serif;
      font-size: 12px;
    }
    .buttons {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>
