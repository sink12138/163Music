<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { keywordSearch } from '@/service/search'
import Comprehensive from './components/comprehensive.vue'
import AlbumResult from './components/album-result.vue'
import ArtistResult from './components/artist-result.vue'
import PlaylistResult from './components/playlist-result.vue'
import SongResult from './components/song-result.vue'
import UserResult from './components/user-result.vue'

const route = useRoute()

const searchKeyword = ref<string>('')
const allData = reactive({
  song: {},
  playlist: {},
  artist: {},
  album: {},
  simquery: {},
  user: {}
})

const loading = ref<boolean>(false)
function searchAll(keyword: string) {
  const params = reactive({
    keywords: keyword,
    limit: 30,
    offset: undefined,
    type: 1018
  })
  const fetchData = async () => {
    loading.value = true
    try {
      const result = (await keywordSearch(params)).data.result
      allData.song = result.song
      allData.playlist = result.playList
      allData.artist = result.artist
      allData.album = result.album
      allData.simquery = result.sim_query
      allData.user = result.user
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}

const tabStyle = reactive({
  style: 'font-weight: 700; font-size: 16px'
})

onMounted(() => {
  searchKeyword.value = route.query.keyword as string
  searchAll(searchKeyword.value)
})
</script>

<template>
  <n-flex justify="center" class="h-full">
    <n-tabs type="segment" animated class="w-11/12 h-full">
      <n-tab-pane name="comprehensive" tab="综合" :tab-props="tabStyle">
        <Comprehensive :page-data="allData" />
      </n-tab-pane>
      <n-tab-pane name="song" tab="单曲" :tab-props="tabStyle">
        <SongResult :keyword="searchKeyword" />
      </n-tab-pane>
      <n-tab-pane name="playlist" tab="歌单" :tab-props="tabStyle">
        <PlaylistResult :page-data="allData.playlist" />
      </n-tab-pane>
      <n-tab-pane name="artist" tab="歌手" :tab-props="tabStyle">
        <ArtistResult :page-data="allData.artist" />
      </n-tab-pane>
      <n-tab-pane name="album" tab="专辑" :tab-props="tabStyle">
        <AlbumResult :page-data="allData.album" />
      </n-tab-pane>
      <n-tab-pane name="user" tab="用户" :tab-props="tabStyle">
        <UserResult :page-data="allData.user" />
      </n-tab-pane>
    </n-tabs>
  </n-flex>
</template>

<style lang="scss" scoped>
.n-tabs-pane-wrapper {
  overflow-y: auto;
}
.n-tab-pane {
  height: 100%;
}
</style>
