<script setup lang="ts">
import { playlistRecommend } from '@/service/playlist'
import { songsRecommend, songsTop } from '@/service/song'
import { albumNew } from '@/service/album'
import { ref, onMounted } from 'vue'
import useLoading from '@/hooks/use-loading'
import BaseCarousel from '@/components/carousel/base-carousel.vue'
import PlaylistCard from '@/components/cards/hover-card/playlist-card.vue'
import SongCard from '@/components/cards/hover-card/song-card.vue'
import AlbumCard from '@/components/cards/hover-card/album-card.vue'

const playlistRecommendData = ref<Array<any>>([])
const getPlayplaylistRecommend = async () => {
  playlistRecommendData.value = (await playlistRecommend()).data.recommend
}

const songsRecommendData = ref<Array<any>>([])
const getsongsRecommend = async () => {
  songsRecommendData.value = (await songsRecommend()).data.data.dailySongs
}

// const personalFMData = ref({})
// const getPersonalFM = async () => {
//   personalFMData.value = (await personalFM()).data.data
// }

const songTopData = ref<Array<any>>([])
const getSongTop = async () => {
  songTopData.value = (await songsTop()).data.data
}

// const albumTopData = ref<Array<any>>([])
// const getAlbumTop = async () => {
//   const params = {
//     area: 'ALL',
//     type: 'hot'
//   }
//   albumTopData.value = (await albumTop(params)).data.weekData
// }

const albumNewData = ref<Array<any>>([])
const getAlbumNew = async () => {
  albumNewData.value = (await albumNew()).data.albums
}

const loading = ref<boolean>(false)
const fetchData = async () => {
  if (loading.value) return
  try {
    loading.value = true
    await Promise.all([
      getPlayplaylistRecommend(),
      getsongsRecommend(),
      getSongTop(),
      getAlbumNew()
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
      <div class="title">每日推荐</div>
      <BaseCarousel v-if="playlistRecommendData" :total="playlistRecommendData.length" :slides="6">
        <PlaylistCard
          v-for="item in playlistRecommendData"
          :item="{
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            playCount: item.playcount,
            trackCount: item.trackCount
          }"
        />
      </BaseCarousel>
      <div class="title">歌曲推荐</div>
      <BaseCarousel
        v-if="songsRecommendData"
        :total="Math.floor(songsRecommendData.length / 3)"
        :slides="2"
      >
        <div v-for="offset in Math.floor(songsRecommendData.length / 3)">
          <SongCard
            v-for="(item, index) in songsRecommendData.slice((offset - 1) * 3, offset * 3)"
            :item="{
              id: item.id,
              picUrl: item.al.picUrl,
              name: item.name,
              fee: item.fee,
              artists: item.ar,
              album: item.al
            }"
            :index="index + (offset - 1) * 3"
          />
        </div>
      </BaseCarousel>
      <div class="title">新碟上架</div>
      <BaseCarousel v-if="albumNewData" :total="albumNewData.length" :slides="6">
        <AlbumCard
          v-for="item in albumNewData"
          :item="{
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            artists: item.artists
          }"
        />
      </BaseCarousel>
      <div class="title">新歌速递</div>
      <BaseCarousel v-if="songTopData" :total="Math.floor(songTopData.length / 3)" :slides="2">
        <div v-for="offset in Math.floor(songTopData.length / 3)">
          <SongCard
            v-for="(item, index) in songTopData.slice((offset - 1) * 3, offset * 3)"
            :item="{
              id: item.id,
              picUrl: item.album.picUrl,
              name: item.name,
              fee: item.fee,
              artists: item.artists,
              album: item.album
            }"
            :index="index + (offset - 1) * 3"
          />
        </div>
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
