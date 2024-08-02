<script setup lang="ts">
import emitter from '@/utils/mitt'
import { currentTimeKey } from '@/symbols'
import { inject, onMounted, reactive, ref, watch, type Ref } from 'vue'
import { PlayArrowRound } from '@vicons/material'
import { formatSeconds } from '@/utils/time'
import { defineEmits, defineProps } from 'vue'

const props = defineProps<{
  lyric: Array<any>
}>()
const currentTime = inject(currentTimeKey, ref(0))

const scroll = ref()
const lyricIndex = ref<number>(0)
const hover = ref<number>(-1)
const recentScroll = ref<boolean>(false)
const scrollTimeout = ref()

const handleScroll = () => {
  recentScroll.value = true
  clearTimeout(scrollTimeout.value)
  scrollTimeout.value = setTimeout(() => {
    recentScroll.value = false
  }, 1000)
}
const setCurrentTime = (time: number) => {
  if (currentTime.value == 0) return
  recentScroll.value = false
  emitter.emit('setCurrentTime', time)
}

watch(
  () => currentTime.value,
  (currentTime) => {
    if (recentScroll.value) return
    for (let i = 0; i < props.lyric.length; i++) {
      let curLyric = props.lyric[i]
      let nextLyric = props.lyric[i + 1]
      if (curLyric[0] <= currentTime && (!nextLyric || currentTime < nextLyric[0])) {
        lyricIndex.value = i
        scroll.value.scrollTo({
          left: 0,
          top: (lyricIndex.value + 1 - scroll.value.clientHeight / 32 / 2) * 32,
          behavior: 'smooth'
        })
        break
      }
    }
  }
)
</script>

<template>
  <div class="player-lyric">
    <div class="lyric-scroll" ref="scroll" @scroll="handleScroll">
      <div
        :class="'lyric-item ' + (lyricIndex == index ? 'lyric-item-current' : '')"
        v-for="(item, index) in lyric"
        @mouseover="hover = index"
        @mouseleave="hover = -1"
      >
        <Transition name="fade">
          <div :class="hover == index ? 'opacity-100' : 'opacity-0'">
            <n-button @click="setCurrentTime(item[0])" dashed size="tiny">
              <n-icon><PlayArrowRound /></n-icon>
              {{ formatSeconds(item[0]) }}
            </n-button>
          </div>
        </Transition>
        <n-ellipsis class="pl-2">{{ item[1] }}</n-ellipsis>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-lyric {
  height: 100%;
  .lyric-scroll {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    .lyric-item {
      width: 100%;
      scroll-snap-align: center;
      scroll-snap-stop: normal;
      margin: 8px;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
    .lyric-item-current {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .lyric-scroll::-webkit-scrollbar {
    display: none;
  }
}
</style>
