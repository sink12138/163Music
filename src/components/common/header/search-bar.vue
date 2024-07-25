<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { onMounted, reactive, ref } from 'vue'
import { SearchRound } from '@vicons/material'
import router from '@/router'
import { defaultSearch, suggestSearch } from '@/service/search'

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
  <n-auto-complete
    :placeholder="defaultPlaceholder.showKeyword"
    :options="suggestOptions"
    :loading="loading"
    round
    v-model:value="keyword"
    @update:value="handleUpdate"
    @keydown.enter="searchAll(keyword)"
    @select="(selected = true), handleUpdate"
  >
    <template #prefix>
      <n-icon size="24" :component="SearchRound" />
    </template>
  </n-auto-complete>
</template>
