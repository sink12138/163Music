<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { h, type Component } from 'vue'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<template>
  <n-space justify="space-between" align="center" class="w-full h-12 bg-red-200">
    <n-space>Album</n-space>
    <n-space>Player</n-space>
    <n-space>Menu</n-space>
  </n-space>
</template>
