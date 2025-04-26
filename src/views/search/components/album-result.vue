<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { keywordSearch } from '@/service/search'
import Albumlist from '@/components/list/album-list.vue'
const props = defineProps<{
  keyword: string
}>()

const albums = ref<Array<any>>([])
const limit = ref(20)
const offset = ref(0)
const loading = ref<boolean>(false)
const hasMore = ref<boolean>(true)
function searchAlbum(keyword: string) {
  if (loading.value || !hasMore.value) return
  const params = reactive({
    keywords: keyword,
    limit: limit.value,
    offset: offset.value,
    type: 10
  })
  const fetchData = async () => {
    loading.value = true
    try {
      const result = (await keywordSearch(params)).data.result
      hasMore.value = result.hasMore
      albums.value.push(...result.albums)
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}
function loadData() {
  if (loading.value || !hasMore.value) return
  offset.value += limit.value
  searchAlbum(props.keyword)
}

onMounted(() => {
  searchAlbum(props.keyword)
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <Albumlist :table-data="albums" @loadData="loadData()" />
  </n-spin>
</template>
