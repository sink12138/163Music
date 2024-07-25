<script setup lang="ts">
import { artistTop } from '@/service/artist'
import { playlistPersonalized, playlistTop, playlistTopHighquality } from '@/service/playlist'
import { songPersonalized } from '@/service/song'
import { onMounted, reactive, ref } from 'vue'

const loading = ref<boolean>(false)
const playlistTopData = ref<Array<any>>()
const artistsTopData = ref<Array<any>>()
const playlistPersonalizedData = ref<Array<any>>()
const songsPersonalizedData = ref<Array<any>>()
const playlistHighqualityData = ref<Array<any>>()

const getPlaylistTop = async () => {
  const params = reactive({
    order: 'hot',
    cat: undefined,
    limit: 16,
    offset: 0
  })
  playlistTopData.value = (await playlistTop(params)).data.playlists
}

const getArtistsTop = async () => {
  const params = reactive({
    limit: 16,
    offset: 0
  })
  artistsTopData.value = (await artistTop(params)).data.artists
}

const getPlaylistPersonalized = async () => {
  let limit: number = 16
  playlistPersonalizedData.value = (await playlistPersonalized(limit)).data.result
}

const getSongsPersonalized = async () => {
  let limit: number = 16
  songsPersonalizedData.value = (await songPersonalized(limit)).data.result
}

const getPlaylistHighquality = async () => {
  let limit: number = 16
  playlistHighqualityData.value = (await playlistTopHighquality(undefined, limit)).data.playlists
}

const timeout = async () => {
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  await sleep(5000)
  console.log('time out!')
}

onMounted(async () => {
  loading.value = true
  try {
    await getPlaylistTop()
    await getArtistsTop()
    await getPlaylistPersonalized()
    await getSongsPersonalized()
    await getPlaylistHighquality()
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <n-spin :show="loading">
    <n-space>
      <div>{{ playlistTopData }}</div>
      <div>{{ artistsTopData }}</div>
      <div>{{ playlistPersonalizedData }}</div>
      <div>{{ songsPersonalizedData }}</div>
      <div>{{ playlistHighqualityData }}</div>
    </n-space>
  </n-spin>
</template>
