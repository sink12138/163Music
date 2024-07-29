<script setup lang="ts">
import { computed, ref } from 'vue'
import { PlayArrowRound, MusicNoteRound } from '@vicons/material'
import { getCounts } from '@/utils/count'
const props = defineProps<{
  item: any
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
      backgroundImage: `${bgImg}url(${item.picUrl}?param=320y400)`
    }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="$router.push({ path: '/playlist', query: { id: item.id } })"
  >
    <div class="play-counts">
      <n-icon><PlayArrowRound /></n-icon>
      <span>{{ getCounts(item.playCount) }}</span>
    </div>
    <div class="hover-content flex flex-col justify-between">
      <n-ellipsis :line-clamp="2" :tooltip="false">{{ item.name }}</n-ellipsis>
      <n-ellipsis v-if="hover" :tooltip="false" class="text-xs">
        <div v-if="item.tags">
          <span v-for="(tag, index) in item.tags">
            <span>{{ tag }}</span>
            <span v-if="index + 1 < item.tags.length">、</span>
          </span>
        </div>
        <div v-else>发现更多好音乐</div>
      </n-ellipsis>
      <div v-if="hover" :tooltip="false" class="text-xs self-end">
        <n-icon><MusicNoteRound /></n-icon>
        <span>{{ item.trackCount }}首歌</span>
      </div>
    </div>
  </div>
</template>
