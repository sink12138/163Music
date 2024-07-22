<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { keywordCloudSearch } from '@/service/search'
import SongList from '@/components/list/song-list.vue'
const props = defineProps<{
  keyword: string
}>()

const songs = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(15)
const pageSizes = ref([
  { label: '8/页', value: 8 },
  { label: '15/页', value: 15 },
  { label: '30/页', value: 30 }
])
const loading = ref<boolean>(false)
function searchSong(keyword: string) {
  const params = reactive({
    keywords: keyword,
    limit: pageSize.value,
    offset: (page.value - 1) * pageSize.value,
    type: 1,
    timestamp: new Date().getTime()
  })
  const fetchData = async () => {
    loading.value = true
    try {
      const result = (await keywordCloudSearch(params)).data.result
      songs.value = result.songs
      total.value = result.songCount
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
    <div class="h-full flex flex-col justify-between">
      <SongList :table-data="songs" />
      <n-pagination
        class="self-end"
        v-model:page="page"
        v-model:page-size="pageSize"
        @update:page="searchSong(props.keyword)"
        @update:page-size="searchSong(props.keyword)"
        :item-count="total"
        :page-sizes="pageSizes"
        show-size-picker
        :page-slot="6"
      />
    </div>
  </n-spin>
</template>
