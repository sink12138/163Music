<script setup lang="ts">
const props = defineProps<{
  picUrl: string
}>()
</script>

<template>
  <div class="player-album">
    <!-- <div class="album-bar">
      <img src="@/assets/image/album-bar.png" alt="" />
    </div> -->
    <div class="album-image">
      <img :src="picUrl + '?param=360y360'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-album {
  .album-image {
    height: 360px;
    width: 360px;
    animation: rotate 20s linear infinite;
    img {
      border-radius: 50%;
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>
