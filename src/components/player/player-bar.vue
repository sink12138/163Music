<script setup lang="ts">
import emitter from '@/utils/mitt'
import { formatSeconds } from '@/utils/time'
import { currentTimeKey, durationKey, isPlayKey } from '@/symbols'
import { computed, inject, reactive, ref, watch } from 'vue'
import {
  PlayCircleFilledRound,
  PauseCircleFilledRound,
  SkipNextRound,
  SkipPreviousRound,
  VolumeUpRound,
  VolumeOffRound
} from '@vicons/material'
import DefaultLoop from '@/assets/image/default-loop.svg'
import RandomLoop from '@/assets/image/random-loop.svg'
import SingleLoop from '@/assets/image/single-loop.svg'

const hover = ref(false)
const isDraging = ref(false)
const currentTime = inject(currentTimeKey, ref(0))
const duration = inject(durationKey, ref(60))
const isPlay = inject(isPlayKey, ref(false))
const percentage = ref(0)
const loop = ref(0)
const volume = reactive({
  val: 50,
  off: false,
  temp: 50
})

const handleVolumeOff = () => {
  if (volume.off == true) {
    volume.off = false
    volume.val = volume.temp
  } else {
    volume.off = true
    volume.temp = volume.val
    volume.val = 0
  }
}

watch(
  () => volume.val,
  (newV) => {
    if (newV == 0) {
      volume.off = true
    } else {
      volume.off = false
    }
    emitter.emit('setVolume', newV)
  }
)

const pause = () => {
  console.log('pause')
  emitter.emit('pause')
}
const play = () => {
  console.log('play')
  emitter.emit('play')
}

watch(
  () => currentTime.value,
  () => {
    if (isDraging.value) return
    percentage.value = parseFloat(((currentTime.value * 100) / duration.value).toFixed(1))
  }
)

const setCurrentTime = () => {
  isDraging.value = false
  let time = parseFloat(((percentage.value / 100) * duration.value).toFixed(1))
  console.log(time)
  emitter.emit('setCurrentTime', time)
}
</script>

<template>
  <div class="player-bar">
    <div class="player-tools">
      <n-button :focusable="false" color="#fca5a5" text>
        <n-icon :size="36"><SkipPreviousRound /></n-icon>
      </n-button>
      <n-button v-if="isPlay" :focusable="false" color="#f87171" text @click="pause">
        <n-icon :size="48"><PauseCircleFilledRound /></n-icon>
      </n-button>
      <n-button v-else :focusable="false" color="#f87171" text @click="play">
        <n-icon :size="48"><PlayCircleFilledRound /></n-icon>
      </n-button>
      <n-button :focusable="false" color="#fca5a5" text>
        <n-icon :size="36"><SkipNextRound /></n-icon>
      </n-button>
    </div>
    <div class="player-progress">
      <span>{{ formatSeconds(currentTime) }}</span>
      <n-slider
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :tooltip="false"
        v-model:value="percentage"
        @dragstart="isDraging = true"
        @dragend="setCurrentTime"
        :step="0.1"
      >
        <template v-if="!hover" #thumb>&nbsp;</template>
      </n-slider>
      <span>{{ formatSeconds(duration) }}</span>
    </div>
    <div class="player-tools">
      <div
        v-if="loop == 0"
        @click="loop = (loop + 1) % 3"
        class="flex items-center cursor-pointer mr-5"
      >
        <n-image width="24" :src="DefaultLoop" preview-disabled></n-image>
      </div>
      <div
        v-if="loop == 1"
        @click="loop = (loop + 1) % 3"
        class="flex items-center cursor-pointer mr-5"
      >
        <n-image width="24" :src="RandomLoop" preview-disabled></n-image>
      </div>
      <div
        v-if="loop == 2"
        @click="loop = (loop + 1) % 3"
        class="flex items-center cursor-pointer mr-5"
      >
        <n-image width="24" :src="SingleLoop" preview-disabled></n-image>
      </div>
      <n-popover
        trigger="hover"
        display-directive="show"
        :duration="300"
        style="width: 60px"
        content-class="flex flex-col items-center"
      >
        <template #trigger>
          <n-button @click="handleVolumeOff" :focusable="false" color="#fca5a5" text>
            <n-icon v-if="volume.off" :size="32"><VolumeOffRound /></n-icon>
            <n-icon v-else :size="32"><VolumeUpRound /></n-icon>
          </n-button>
        </template>
        <n-slider
          style="height: 120px; width: 32px"
          :tooltip="false"
          v-model:value="volume.val"
          vertical
        >
          <template #thumb>&nbsp;</template>
        </n-slider>
        <span class="text-xs">{{ volume.val }}%</span>
      </n-popover>
    </div>
    <div class="player-tracks"></div>
  </div>
</template>

<style lang="scss" scoped>
.player-bar {
  height: 60px;
  width: 100%;
  background-color: #fee2e2;
  border-top: 1px solid #262626;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .player-tools {
    display: flex;
    align-items: center;
  }
  .player-progress {
    display: flex;
    align-items: center;
    width: 40%;
    font-size: 12px;
  }
}
</style>
