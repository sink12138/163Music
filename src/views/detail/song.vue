<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { songDetail } from '@/service/song'

const route = useRoute()
const songId = ref<string>('')

const info = reactive({ detail: {} })
function getSongDetail(id: string) {
  const fetchData = async () => {
    try {
      const result = (await songDetail(id)).data
      info.detail = result
    } catch (error) {
      console.warn('error', error)
    } finally {
    }
  }
  fetchData()
}

onMounted(() => {
  songId.value = route.query.id as string
  getSongDetail(songId.value)
})
</script>

<template>
  <div>{{ info.detail }}</div>
</template>
