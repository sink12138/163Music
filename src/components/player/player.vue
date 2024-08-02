<script setup lang="ts">
import emitter from '@/utils/mitt'
import { currentTimeKey, durationKey, isPlayKey } from '@/symbols'
import { onMounted, ref, watch, provide } from 'vue'
const audio = ref()
const currentTime = ref()
const percentage = ref()
const duration = ref()
const isPlay = ref()

provide(currentTimeKey, currentTime)
provide(durationKey, duration)
provide(isPlayKey, isPlay)

const url = ref()
const timeUpdate = () => {
  if (audio.value != null) {
    currentTime.value = audio.value.currentTime.toFixed(3)
    duration.value = audio.value.duration
    percentage.value = parseFloat(((currentTime.value * 100) / duration.value).toFixed(1))
  }
}

const setCurrentTime = (val: any) => {
  if (audio.value != null) {
    audio.value.currentTime = val
  }
}

const play = () => {
  isPlay.value = true
  audio.value.play()
}
const pause = () => {
  isPlay.value = false
  audio.value.pause()
}

onMounted(() => {
  emitter.on('play', () => play())
  emitter.on('pause', () => pause())
  emitter.on('music', (val) => (url.value = val))
  emitter.on('setCurrentTime', (val) => setCurrentTime(val))
})
</script>

<template>
  <div class="h-full w-full">
    <audio :src="url" ref="audio" @timeupdate="timeUpdate" @canplay="timeUpdate"></audio>
    <slot></slot>
  </div>
</template>
