<script setup lang="ts">
import { NIcon, useMessage } from 'naive-ui'
import { h, onMounted, reactive, ref, type Component } from 'vue'
import { LibraryMusicOutlined, SearchRound, AccountCircleRound } from '@vicons/material'
import router from '@/router'
import { keywordSearch, defaultSearch, suggestSearch } from '@/service/search'
import type { searchReq } from '@/service/search/type'

const message = useMessage()
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const defaultPlaceholder = reactive({
  showKeyword: '',
  realkeyword: ''
})

const searchParams = reactive({
  keywords: '',
  limit: undefined,
  offset: undefined,
  type: 1
})

const loading = ref<boolean>(false)
const selected = ref<boolean>(false)
function searchDefault() {
  const fetchData = async () => {
    loading.value = true
    try {
      const result = (await defaultSearch()).data
      defaultPlaceholder.showKeyword = result.data.showKeyword
      defaultPlaceholder.realkeyword = result.data.realkeyword
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}

const suggestOptions = ref<string[]>([])
function searchSuggest(keyword: string) {
  const fetchData = async () => {
    loading.value = true
    try {
      const result = (await suggestSearch(keyword)).data.result.allMatch
      suggestOptions.value = result.map((item: any) => item.keyword)
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}

function searchMusic(params: searchReq) {
  selected.value = false
  console.log(params)
  const fetchData = async () => {
    loading.value = true
    try {
      params.keywords = params.keywords ? params.keywords : defaultPlaceholder.realkeyword
      const result = (await keywordSearch(params)).data
      console.log(result)
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}

function handleUpdate() {
  if (!searchParams.keywords) return
  selected.value ? searchMusic(searchParams) : searchSuggest(searchParams.keywords)
}

onMounted(() => {
  searchDefault()
})
</script>

<template>
  <n-space justify="space-between" align="center" class="bg-red-100 border-red-400 border-b-4">
    <n-space
      class="mx-6 cursor-pointer hover:text-red-600"
      align="center"
      @click="router.push('./')"
    >
      <n-icon size="36" :component="LibraryMusicOutlined" />
      <span class="text-xl font-bold">163Music</span>
    </n-space>
    <n-auto-complete
      :placeholder="defaultPlaceholder.showKeyword"
      :options="suggestOptions"
      :loading="loading"
      blur-after-select
      round
      size="large"
      v-model:value="searchParams.keywords"
      @update:value="handleUpdate"
      @keydown.enter="searchMusic(searchParams)"
      @select="selected = true"
    >
      <template #prefix>
        <n-icon :component="SearchRound" />
      </template>
    </n-auto-complete>
    <n-icon class="mx-6" size="24" :component="AccountCircleRound" />
  </n-space>
</template>
