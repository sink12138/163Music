<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { albumContent } from '@/service/album'

const route = useRoute()
const albumId = ref<string>('')

const loading = ref<boolean>(false)
const info = reactive({ detail: {} })
function getAlbumContent(id: string) {
  if (loading.value) return
  const fetchData = async () => {
    try {
      loading.value = true
      const result = (await albumContent(id)).data
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
  albumId.value = route.query.id as string
  getAlbumContent(albumId.value)
})
</script>

<template>
  <n-spin :show="loading">
    <div>{{ info.detail }}</div>
  </n-spin>
</template>
