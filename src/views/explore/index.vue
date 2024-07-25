<script setup lang="ts">
import useLoading from '@/hooks/use-loading'
const { loading, startLoading, endLoading } = useLoading()
</script>

<template>
  <n-space>
    <n-button @click="console.log(loading)">get loading</n-button>
    <n-button @click="startLoading">start</n-button>
    <n-button @click="endLoading">finish</n-button>
  </n-space>
</template>
