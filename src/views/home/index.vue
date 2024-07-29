<script setup lang="ts">
import ArtistCard from '@/components/cards/hover-card/artist-card.vue'
import PlaylistCard from '@/components/cards/hover-card/playlist-card.vue'
import SongCard from '@/components/cards/hover-card/song-card.vue'
import BaseCarousel from '@/components/carousel/base-carousel.vue'
import { artistTop } from '@/service/artist'
import { playlistPersonalized, playlistTop, playlistTopHighquality } from '@/service/playlist'
import { songPersonalized } from '@/service/song'
import { onMounted, reactive, ref } from 'vue'

const playlistTopData = ref<Array<any>>()
const getPlaylistTop = async () => {
  const params = reactive({
    order: 'hot',
    cat: undefined,
    limit: 18,
    offset: 0
  })
  try {
    playlistTopData.value = (await playlistTop(params)).data.playlists
  } catch (error) {
    console.log(error)
  }
}

const artistsTopData = ref<Array<any>>()
const getArtistsTop = async () => {
  const params = reactive({
    limit: 24,
    offset: 0
  })
  try {
    artistsTopData.value = (await artistTop(params)).data.artists
  } catch (error) {
    console.log(error)
  }
}

const playlistPersonalizedData = ref<Array<any>>()
const getPlaylistPersonalized = async () => {
  let limit: number = 18
  try {
    playlistPersonalizedData.value = (await playlistPersonalized(limit)).data.result
  } catch (error) {
    console.log(error)
  }
}

const songsPersonalizedData = ref<Array<any>>()
const getSongsPersonalized = async () => {
  let limit: number = 18
  try {
    songsPersonalizedData.value = (await songPersonalized(limit)).data.result
  } catch (error) {
    console.log(error)
  }
}

const playlistHighqualityData = ref<Array<any>>()
const getPlaylistHighquality = async () => {
  let limit: number = 18
  try {
    playlistHighqualityData.value = (await playlistTopHighquality(undefined, limit)).data.playlists
  } catch (error) {
    console.log(error)
  }
}

const timeout = async () => {
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  await sleep(5000)
  console.log('time out!')
}

const loading = ref<boolean>(false)
const fetchData = async () => {
  if (loading.value) return
  try {
    loading.value = true
    await Promise.all([
      getPlaylistTop(),
      getArtistsTop(),
      getPlaylistPersonalized(),
      getSongsPersonalized(),
      getPlaylistHighquality()
    ])
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <div v-if="!loading" class="page-container">
      <div class="title">热门歌单</div>
      <BaseCarousel v-if="playlistTopData" :total="playlistTopData.length" :slides="6">
        <PlaylistCard
          v-for="item in playlistTopData"
          :item="{
            id: item.id,
            name: item.name,
            picUrl: item.coverImgUrl,
            playCount: item.playCount,
            trackCount: item.trackCount,
            tags: item.tags
          }"
        />
      </BaseCarousel>
      <div class="title">热门歌手</div>
      <BaseCarousel
        v-if="artistsTopData"
        :total="Math.floor(artistsTopData.length / 2)"
        :slides="4"
      >
        <div v-for="offset in Math.floor(artistsTopData.length / 2)">
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
        <PlaylistCard
          v-for="item in playlistPersonalizedData"
          :item="{
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            playCount: item.playCount,
            trackCount: item.trackCount,
            tags: item.tags
          }"
        />
      </BaseCarousel>
      <div class="title">新歌推荐</div>
      <BaseCarousel
        v-if="songsPersonalizedData"
        :total="Math.floor(songsPersonalizedData.length / 3)"
        :slides="2"
      >
        <div v-for="offset in Math.floor(songsPersonalizedData.length / 3)">
          <SongCard
            v-for="(item, index) in songsPersonalizedData.slice((offset - 1) * 3, offset * 3)"
            :item="{
              id: item.id,
              picUrl: item.picUrl,
              name: item.name,
              fee: item.song.fee,
              artists: item.song.artists,
              album: item.song.album
            }"
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
        <PlaylistCard
          v-for="item in playlistHighqualityData"
          :item="{
            id: item.id,
            name: item.name,
            picUrl: item.coverImgUrl,
            playCount: item.playCount,
            trackCount: item.trackCount,
            tags: item.tags
          }"
        />
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
