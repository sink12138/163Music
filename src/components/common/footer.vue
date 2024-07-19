<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { h, type Component } from 'vue'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<template>
  <n-space justify="space-between" align="center" class="w-full h-12 bg-slate-100">
    <n-space>Hello</n-space>
    <n-space>Footer</n-space>
    <n-space>Menu</n-space>
  </n-space>
</template>
