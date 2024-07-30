<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { songDetail, getLyric } from '@/service/song'
import { parseLyric } from '@/utils/parse-lyric'

const route = useRoute()
const songId = ref<string>('')

const loading = ref<boolean>(false)
const info = reactive({ detail: {}, lyric: [] as any })
function getSongDetail(id: string) {
  if (loading.value) return
  const fetchData = async () => {
    try {
      loading.value = true
      const result = (await songDetail(id)).data
      const lyric = (await getLyric(id)).data.lrc
      console.log(lyric)
      info.detail = result
      info.lyric = parseLyric(lyric.lyric)
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
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
  <n-spin :show="loading">
    <div>{{ info.detail }}</div>
    <ul>
      <li v-for="item in info.lyric">{{ item[0] }},{{ item[1] }}</li>
    </ul>
  </n-spin>
</template>
