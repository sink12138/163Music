<script setup lang="ts">
import { getLocation } from '@/utils/city'
defineProps<{
  user: any
}>()
</script>

<template>
  <div class="base-card" @click="$router.push({ path: '/user', query: { id: user.userId } })">
    <div class="left-pic"><img :src="user.avatarUrl" /></div>
    <div class="right-content">
      <n-ellipsis class="text-base">{{ user.nickname }}</n-ellipsis>
      <n-ellipsis class="text-xs">{{ getLocation(user.city) }}</n-ellipsis>
    </div>
  </div>
</template>
