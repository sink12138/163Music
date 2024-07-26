<script setup lang="ts">
import { computed, ref } from 'vue'
import { PlayArrowRound, MusicNoteRound } from '@vicons/material'
import { getCounts } from '@/utils/count'
const props = defineProps<{
  playlist: any
}>()
const hover = ref<boolean>(false)
const bgImg = computed(() => {
  // if (hover.value) return 'linear-gradient(to top, #b91c1c 50%, #ffffff00),'
  return 'linear-gradient(to bottom, #17171777, #17171700 50%),'
})
</script>

<template>
  <div
    class="hover-card"
    :style="{
      backgroundImage: `${bgImg}url(${playlist.coverImgUrl ? playlist.coverImgUrl : playlist.picUrl}?param=320y400)`
    }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="$router.push({ path: '/playlist', query: { id: playlist.id } })"
  >
    <div class="play-counts">
      <n-icon><PlayArrowRound /></n-icon>
      <span>{{ getCounts(playlist.playCount) }}</span>
    </div>
    <div class="hover-content flex flex-col justify-between">
      <n-ellipsis :line-clamp="2" :tooltip="false">{{ playlist.name }}</n-ellipsis>
      <n-ellipsis v-if="hover" :tooltip="false" class="text-xs">
        <div v-if="playlist.tags">
          <span v-for="(tag, index) in playlist.tags">
            <span>{{ tag }}</span>
            <span v-if="index + 1 < playlist.tags.length">、</span>
          </span>
        </div>
        <div v-else>发现更多好音乐</div>
      </n-ellipsis>
      <div v-if="hover" :tooltip="false" class="text-xs self-center">
        <n-icon><MusicNoteRound /></n-icon>
        <span>{{ playlist.trackCount }}首歌</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hover-card {
  height: 200px;
  max-width: 200px;
  border-radius: 6px;
  background-size: cover;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .play-counts {
    display: flex;
    align-items: center;
    align-self: flex-end;
    padding: 10px;
    color: #f5f5f5;
  }
  .hover-content {
    height: 56px;
    padding: 8px;
    border-radius: 0 0 6px 6px;
    color: #f5f5f5;
    background-color: #ef444444;
    backdrop-filter: blur(6px);
    transition: 100ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .category-tag {
    border: 1px solid #f5f5f5;
  }
}
.hover-card:hover {
  .hover-content {
    height: 50%;
    background-color: #ef444444;
    backdrop-filter: blur(10px);
    transition: 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
}
</style>
