<script setup lang="ts">
import { NIcon, useMessage } from 'naive-ui'
import { h, onMounted, reactive, ref, type Component } from 'vue'
import { LibraryMusicOutlined, SearchRound, AccountCircleRound } from '@vicons/material'
import router from '@/router'
import { defaultSearch, suggestSearch } from '@/service/search'

const message = useMessage()
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const defaultPlaceholder = reactive({
  showKeyword: '',
  realkeyword: ''
})
const keyword = ref<string>('')

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
      const result = (await suggestSearch(keyword)).data.result
      const order = result.order
      suggestOptions.value = order.map((type: any) => {
        return {
          type: 'group',
          label: type,
          key: type,
          children: result[type].map((item: any, index: number) => {
            return { label: item.name, value: `${type}-${index}-${item.name}` }
          })
        }
      })
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}

function searchAll(keyword: string) {
  router.push({ path: '/search', query: { keyword: keyword } })
}

function goDetail() {}

function handleUpdate() {
  if (!keyword.value) return
  selected.value ? searchAll(keyword.value) : searchSuggest(keyword.value)
  selected.value = false
}

onMounted(() => {
  searchDefault()
})
</script>

<template>
  <n-space
    justify="space-between"
    align="center"
    class="w-full h-14 bg-red-100 border-red-400 border-b-4"
  >
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
      round
      size="large"
      v-model:value="keyword"
      @update:value="handleUpdate"
      @keydown.enter="searchAll(keyword)"
      @select="(selected = true), handleUpdate"
    >
      <template #prefix>
        <n-icon size="24" :component="SearchRound" />
      </template>
    </n-auto-complete>
    <n-icon class="mx-6" size="24" :component="AccountCircleRound" />
  </n-space>
</template>
