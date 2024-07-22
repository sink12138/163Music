<script setup lang="ts">
defineProps<{
  artist: any
}>()
</script>

<template>
  <div class="artist-card">
    <div class="left-pic"><img :src="artist.img1v1Url" /></div>
    <div class="right-content">
      <n-ellipsis class="text-lg">{{ artist.name }}</n-ellipsis>
      <n-ellipsis class="text-xs">专辑:{{ artist.albumSize }}</n-ellipsis>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.artist-card {
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
    justify-content: space-evenly;
    align-items: center;
  }
}
.artist-card:hover {
  background-color: rgb(254 202 202);
  border-radius: 6px;
  transition: 0.3s ease-in-out;
  img {
    opacity: 1;
  }
}
</style>
