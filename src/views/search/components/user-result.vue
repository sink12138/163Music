<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { keywordSearch } from '@/service/search'
import Usercard from '@/components/card/user-card.vue'
const props = defineProps<{
  keyword: string
}>()

const users = ref<Array<any>>([])
const limit = ref(20)
const offset = ref(0)
const loading = ref<boolean>(false)
const hasMore = ref<boolean>(true)
function searchUser(keyword: string) {
  if (loading.value || !hasMore.value) return
  const params = reactive({
    keywords: keyword,
    limit: limit.value,
    offset: offset.value,
    type: 1002
  })
  const fetchData = async () => {
    loading.value = true
    try {
      const result = (await keywordSearch(params)).data.result
      console.log(result)
      hasMore.value = result.hasMore
      users.value = result.userprofiles
    } catch (error) {
      console.warn('error', error)
    } finally {
      loading.value = false
    }
  }
  fetchData()
}

onMounted(() => {
  searchUser(props.keyword)
})
</script>

<template>
  <n-spin :show="loading" class="h-full" content-class="h-full">
    <n-space><Usercard v-for="user in users" :user="user" /></n-space>
  </n-spin>
</template>
