<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { artistDetail } from '@/service/artist'

const route = useRoute()
const artistId = ref<string>('')

const loading = ref<boolean>(false)
const info = reactive({ detail: {} })
function getArtistDetail(id: string) {
  if (loading.value) return
  const fetchData = async () => {
    try {
      loading.value = true
      const result = (await artistDetail(id)).data
      info.detail = result
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}

onMounted(() => {
  artistId.value = route.query.id as string
  getArtistDetail(artistId.value)
})
</script>

<template>
  <n-spin :show="loading">
    <div>{{ info.detail }}</div>
  </n-spin>
</template>
