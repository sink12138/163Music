<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { h, type Component } from 'vue'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<template>
  <n-space justify="space-between" align="center" class="bg-slate-100">
    <n-space></n-space>
    <n-space></n-space>
    <n-space></n-space>
  </n-space>
</template>
