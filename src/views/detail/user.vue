<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { userDetail } from '@/service/user'

const route = useRoute()
const uid = ref<string>('')

const loading = ref<boolean>(false)
const info = reactive({ detail: {} })
function getUserDetail(id: string) {
  if (loading.value) return
  const fetchData = async () => {
    try {
      loading.value = true
      const result = (await userDetail(id)).data
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
  uid.value = route.query.id as string
  getUserDetail(uid.value)
})
</script>

<template>
  <n-spin :show="loading">
    <div>{{ info.detail }}</div>
  </n-spin>
</template>
