<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
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
    limit: undefined,
    offset: undefined,
    type: 1018
    // timestamp: new Date().getTime()
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

const tab = ref('comprehensive')

const updateValue = (val: any) => {
  tab.value = val
}

const tabStyle = reactive({
  style: 'font-weight: 700;font-size: 24px;'
})
const labelStyle = ref("font-family: '163Music'")

watch(
  () => route.query,
  () => {
    searchKeyword.value = route.query.keyword as string
    searchAll(searchKeyword.value)
  }
)

onMounted(() => {
  searchKeyword.value = route.query.keyword as string
  searchAll(searchKeyword.value)
})
</script>

<template>
  <n-flex justify="center" class="h-full">
    <n-tabs
      animated
      type="line"
      class="w-5/6 h-full"
      :tab-style="labelStyle"
      justify-content="space-evenly"
      pane-wrapper-class="h-full"
      pane-class="h-full"
      :value="tab"
      @update:value="updateValue"
    >
      <n-tab-pane name="comprehensive" tab="综 合" :tab-props="tabStyle">
        <Comprehensive :page-data="allData" :loading="loading" @tab="(val) => updateValue(val)" />
      </n-tab-pane>
      <n-tab-pane name="song" tab="单 曲" :tab-props="tabStyle">
        <SongResult :keyword="searchKeyword" />
      </n-tab-pane>
      <n-tab-pane name="playlist" tab="歌 单" :tab-props="tabStyle">
        <PlaylistResult :keyword="searchKeyword" />
      </n-tab-pane>
      <n-tab-pane name="artist" tab="歌 手" :tab-props="tabStyle">
        <ArtistResult :keyword="searchKeyword" />
      </n-tab-pane>
      <n-tab-pane name="album" tab="专 辑" :tab-props="tabStyle">
        <AlbumResult :keyword="searchKeyword" />
      </n-tab-pane>
      <n-tab-pane name="user" tab="用 户" :tab-props="tabStyle">
        <UserResult :keyword="searchKeyword" />
      </n-tab-pane>
    </n-tabs>
  </n-flex>
</template>

<style lang="scss" scoped></style>
