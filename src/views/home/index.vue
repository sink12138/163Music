<script setup lang="ts">
import ArtistCard from '@/components/cards/hover-card/artist-card.vue'
import PlaylistCard from '@/components/cards/hover-card/playlist-card.vue'
import SongCard from '@/components/cards/hover-card/song-card.vue'
import BaseCarousel from '@/components/carousel/base-carousel.vue'
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
    limit: 18,
    offset: 0
  })
  playlistTopData.value = (await playlistTop(params)).data.playlists
}

const getArtistsTop = async () => {
  const params = reactive({
    limit: 24,
    offset: 0
  })
  artistsTopData.value = (await artistTop(params)).data.artists
}

const getPlaylistPersonalized = async () => {
  let limit: number = 18
  playlistPersonalizedData.value = (await playlistPersonalized(limit)).data.result
}

const getSongsPersonalized = async () => {
  let limit: number = 18
  songsPersonalizedData.value = (await songPersonalized(limit)).data.result
}

const getPlaylistHighquality = async () => {
  let limit: number = 18
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
    console.log(playlistTopData.value)
    console.log(artistsTopData.value)
    console.log(playlistPersonalizedData.value)
    console.log(songsPersonalizedData.value)
    console.log(playlistHighqualityData.value)
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <div v-if="!loading" class="page-container">
      <div class="title">热门歌单</div>
      <BaseCarousel v-if="playlistTopData" :total="playlistTopData.length" :slides="6">
        <PlaylistCard v-for="playlist in playlistTopData" :playlist="playlist" />
      </BaseCarousel>
      <div class="title">热门歌手</div>
      <BaseCarousel v-if="artistsTopData" :total="artistsTopData.length / 2" :slides="4">
        <div v-for="offset in artistsTopData.length / 2">
          <ArtistCard
            v-for="artist in artistsTopData.slice((offset - 1) * 2, offset * 2)"
            :artist="artist"
          />
        </div>
      </BaseCarousel>
      <div class="title">推荐歌单</div>
      <BaseCarousel
        v-if="playlistPersonalizedData"
        :total="playlistPersonalizedData.length"
        :slides="6"
      >
        <PlaylistCard v-for="playlist in playlistPersonalizedData" :playlist="playlist" />
      </BaseCarousel>
      <div class="title">新歌速递</div>
      <BaseCarousel
        v-if="songsPersonalizedData"
        :total="songsPersonalizedData.length / 3"
        :slides="2"
      >
        <div v-for="offset in songsPersonalizedData.length / 3">
          <SongCard
            v-for="(song, index) in songsPersonalizedData.slice((offset - 1) * 3, offset * 3)"
            :item="song"
            :index="index + (offset - 1) * 3"
          />
        </div>
      </BaseCarousel>
      <div class="title">甄选歌单</div>
      <BaseCarousel
        v-if="playlistHighqualityData"
        :total="playlistHighqualityData.length"
        :slides="6"
      >
        <PlaylistCard v-for="playlist in playlistHighqualityData" :playlist="playlist" />
      </BaseCarousel>
    </div>
  </n-spin>
</template>

<style lang="scss" scoped>
.page-container {
  height: 100%;
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
}
.title {
  font-family: '163Music';
  font-weight: bold;
  font-size: 24px;
  padding-left: 66px;
}
</style>
