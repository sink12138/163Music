<script setup lang="ts">
import { NIcon, useMessage } from 'naive-ui'
import { h, onMounted, reactive, ref, type Component } from 'vue'
import { LibraryMusicOutlined } from '@vicons/material'
import router from '@/router'
import SearchBar from './search-bar.vue'
import UserAvator from './user-avator.vue'

const message = useMessage()
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
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
    <SearchBar />
    <UserAvator />
  </n-space>
</template>
