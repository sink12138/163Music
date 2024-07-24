<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { keywordSearch } from '@/service/search'
import Artistcard from '@/components/card/artist-card.vue'
const props = defineProps<{
  keyword: string
}>()

const artists = ref<Array<any>>([])
const limit = ref(20)
const offset = ref(0)
const loading = ref<boolean>(false)
const hasMore = ref<boolean>(true)
function searchArtist(keyword: string) {
  if (loading.value || !hasMore.value) return
  const params = reactive({
    keywords: keyword,
    limit: limit.value,
    offset: offset.value,
    type: 100
  })
  const fetchData = async () => {
    loading.value = true
    try {
      const result = (await keywordSearch(params)).data.result
      hasMore.value = result.hasMore
      artists.value = result.artists
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}

onMounted(() => {
  searchArtist(props.keyword)
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <n-space><Artistcard v-for="artist in artists" :artist="artist" /></n-space>
  </n-spin>
</template>
