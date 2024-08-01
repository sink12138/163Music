<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { songDetail, getLyric, songUrl } from '@/service/song'
import { parseLyric } from '@/utils/parse-lyric'
import { PlayArrowRound } from '@vicons/material'
import { formatSeconds } from '@/utils/time'

const route = useRoute()
const songId = ref<string>('')

const loading = ref<boolean>(false)
const info = reactive({ detail: {}, lyric: [] as any, url: '' as string })
function getSongDetail(id: string) {
  if (loading.value) return
  const fetchData = async () => {
    try {
      loading.value = true
      const result = (await songDetail(id)).data
      const lyric = (await getLyric(id)).data.lrc
      console.log(lyric)
      info.detail = result
      info.lyric = parseLyric(lyric.lyric)
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}

const scroll = ref()
const getMusicUrl = (id: string) => {
  const fetchData = async () => {
    try {
      loading.value = true
      const result = (await songUrl(id)).data.data
      info.url = result[0].url
      console.log(info.url)
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}

const currentTime = ref()
const percentage = ref()
const hover = ref<number>(-1)
const audio = ref()
const timeUpdate = () => {
  if (audio.value != null) {
    // currentTime.value = formatSeconds(audio.value.currentTime)
    currentTime.value = audio.value.currentTime.toFixed(3)
    percentage.value = ((currentTime.value * 100) / audio.value.duration).toFixed(1)
  }
}

const setCurrentTime = (time: any) => {
  audio.value.currentTime = time
}

const recentScroll = ref<boolean>(false)
const scrollTimeout = ref()
const handleScroll = () => {
  recentScroll.value = true
  clearTimeout(scrollTimeout.value)
  scrollTimeout.value = setTimeout(() => {
    recentScroll.value = false
  }, 1000)
}

watch(songId, () => {
  getMusicUrl(songId.value)
})
const lyricIndex = ref<number>(0)
watch(currentTime, () => {
  for (let i = 0; i < info.lyric.length; i++) {
    let curLyric = info.lyric[i]
    let nextLyric = info.lyric[i + 1]
    if (curLyric[0] <= currentTime.value && (!nextLyric || currentTime.value < nextLyric[0])) {
      lyricIndex.value = i
      if (recentScroll.value) return
      scroll.value.scrollTo({
        left: 0,
        top: Math.floor(40 * (lyricIndex.value + 1) - scroll.value.clientHeight / 2),
        behavior: 'smooth'
      })
      break
    }
  }
})
// watch(lyricIndex, () => {
//   if (recentScroll.value) return
//   scroll.value.scrollTo({
//     left: 0,
//     top: Math.floor(40 * (lyricIndex.value + 1) - scroll.value.clientHeight / 2),
//     behavior: 'smooth'
//   })
// })

onMounted(() => {
  songId.value = route.query.id as string
  getSongDetail(songId.value)
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <!-- <div>{{ info.detail }}</div> -->
    <div class="player-lyric">
      <div class="lyric-scroll" ref="scroll" @scroll="handleScroll">
        <div
          :class="'lyric-item ' + (lyricIndex == index ? 'lyric-item-current' : '')"
          v-for="(item, index) in info.lyric"
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
    <audio :src="info.url" ref="audio" @timeupdate="timeUpdate()"></audio>
    <n-button @click="audio.pause()">Pause</n-button>
    <n-button @click="audio.play()">Play</n-button>
    <n-slider :tooltip="false" v-model:value="percentage" :step="0.1">
      <template #thumb>&nbsp</template>
    </n-slider>
  </n-spin>
</template>

<style lang="scss" scoped>
.player-lyric {
  height: 90%;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
