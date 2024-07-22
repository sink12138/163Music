<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { keywordSearch } from '@/service/search'
import Playlist from '@/components/list/play-list.vue'
const props = defineProps<{
  keyword: string
}>()

const playlists = ref<Array<any>>([])
const limit = ref(20)
const offset = ref(0)
const loading = ref<boolean>(false)
const hasMore = ref<boolean>(true)
function searchPlaylist(keyword: string) {
  if (loading.value || !hasMore.value) return
  const params = reactive({
    keywords: keyword,
    limit: limit.value,
    offset: offset.value,
    type: 1000,
    timestamp: new Date().getTime()
  })
  const fetchData = async () => {
    loading.value = true
    try {
      const result = (await keywordSearch(params)).data.result
      console.log(result)
      hasMore.value = result.hasMore
      playlists.value.push(...result.playlists)
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}
function loadData() {
  offset.value += limit.value
  searchPlaylist(props.keyword)
}

onMounted(() => {
  searchPlaylist(props.keyword)
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <Playlist :table-data="playlists" @loadData="loadData()" />
  </n-spin>
</template>
