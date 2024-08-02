<script setup lang="ts">
import emitter from '@/utils/mitt'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { songDetail, getLyric, songUrl } from '@/service/song'
import PlayerLyric from '@/components/player/player-lyric.vue'
import { parseLyric } from '@/utils/parse-lyric'

const route = useRoute()
const songId = ref<string>('')

const info = reactive({ detail: {}, lyric: [] as any, url: '' as string })
const getSongDetail = async (id: string) => {
  const result = (await songDetail(id)).data
  const lyric = (await getLyric(id)).data.lrc
  info.detail = result
  info.lyric = parseLyric(lyric.lyric)
}

const getMusicUrl = async (id: string) => {
  const result = (await songUrl(id)).data.data
  info.url = result[0].url
}

const loading = ref<boolean>(false)
const fetchData = async () => {
  if (loading.value) return
  try {
    loading.value = true
    await Promise.all([getSongDetail(songId.value), getMusicUrl(songId.value)])
    console.log(info)
    emitter.emit('music', info.url)
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  songId.value = route.query.id as string
  fetchData()
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <PlayerLyric :lyric="info.lyric"></PlayerLyric>
  </n-spin>
</template>

<style lang="scss" scoped></style>
