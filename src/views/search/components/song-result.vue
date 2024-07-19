<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { keywordSearch } from '@/service/search'
import SongList from '@/components/list/song-list.vue'
const props = defineProps<{
  keyword: string
}>()

const songs = ref([])
const page = ref(1)
const loading = ref<boolean>(false)
function searchSong(keyword: string) {
  const params = reactive({
    keywords: keyword,
    limit: 10,
    offset: undefined,
    type: 1
  })
  const fetchData = async () => {
    loading.value = true
    try {
      const result = (await keywordSearch(params)).data.result
      console.log(result)
      songs.value = result.songs
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}
onMounted(() => {
  searchSong(props.keyword)
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <div class="h-full">
      <SongList :table-data="songs" />
      <n-pagination v-model:page="page" :page-count="100" />
    </div>
  </n-spin>
</template>
