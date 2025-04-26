<script setup lang="ts">
import PlayerLyric from './player-lyric.vue'
import PlayerAlbum from './player-album.vue'
const props = defineProps<{
  detail: any
  lyric: any
}>()
</script>

<template>
  <div class="player-page">
    <PlayerAlbum v-if="detail.al" :picUrl="detail.al.picUrl" />
    <div class="player-content" v-if="detail.name">
      <div class="player-title">
        <div class="text-2xl font-bold my-2">{{ detail.name }}</div>
        <span>专辑: </span>
        <n-button text>{{ detail.al.name }}</n-button>
        <span>&nbsp;&nbsp;</span>
        <span>歌手: </span>
        <span text v-for="(artist, arIndex) in detail.ar">
          <span v-if="arIndex != 0">/</span>
          <n-button text>{{ artist.name }}</n-button>
        </span>
      </div>
      <PlayerLyric :lyric="lyric" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10%;
  .player-content {
    width: 40%;
    height: 100%;
    margin: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    .player-title {
      margin: 20px 0;
    }
  }
}
</style>
