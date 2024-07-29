<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  item: any
}>()
const hover = ref<boolean>(false)
</script>

<template>
  <div
    class="hover-card"
    :style="{
      backgroundImage: `url(${item.picUrl}?param=320y400)`
    }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="$router.push({ path: '/album', query: { id: item.id } })"
  >
    <div class="play-counts"></div>
    <div class="display-content flex flex-col justify-between">
      <n-ellipsis :line-clamp="1" :tooltip="false">{{ item.name }}</n-ellipsis>
      <n-ellipsis :line-clamp="1" :tooltip="false" class="text-xs">
        <span text v-for="(artist, arIndex) in item.artists">
          <span v-if="arIndex != 0">/</span>
          <span>{{ artist.name }}</span>
        </span>
      </n-ellipsis>
    </div>
  </div>
</template>
