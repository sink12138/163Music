<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { playlistDetail } from '@/service/playlist'

const route = useRoute()
const playlistId = ref<string>('')

const loading = ref<boolean>(false)
const info = reactive({ detail: {} })
function getPlaylistDetail(id: string) {
  if (loading.value) return
  const fetchData = async () => {
    try {
      loading.value = true
      const result = (await playlistDetail(id)).data
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
  playlistId.value = route.query.id as string
  getPlaylistDetail(playlistId.value)
})
</script>

<template>
  <n-spin :show="loading">
    <div>{{ info.detail }}</div>
  </n-spin>
</template>
