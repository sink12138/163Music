<script setup lang="ts">
defineProps<{
  artist: any
}>()
</script>

<template>
  <div class="hover-card" @click="$router.push({ path: '/artist', query: { id: artist.id } })">
    <div class="left-pic"><img :src="artist.img1v1Url + '?param=144y144'" /></div>
    <div class="right-content">
      <n-ellipsis class="text-base">{{ artist.name }}</n-ellipsis>
      <n-ellipsis class="text-xs">专辑:{{ artist.albumSize }}</n-ellipsis>
      <n-ellipsis class="text-xs">单曲:{{ artist.musicSize }}</n-ellipsis>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hover-card {
  height: 120px;
  width: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px dashed #ffffff00;
  border-radius: 6px;
  .left-pic {
    height: 80px;
    width: 80px;
    img {
      height: 80px;
      width: 80px;
      opacity: 0.9;
      border-radius: 25%;
    }
  }
  .right-content {
    height: 100px;
    width: 140px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .title {
      width: 100%;
      padding: 0 4px;
      font-size: 14px;
      text-align: center;
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
.hover-card:hover {
  background-color: rgb(254 202 202);
  border-radius: 6px;
  transition: 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  img {
    opacity: 1;
  }
}
</style>
