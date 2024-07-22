<script setup lang="ts">
import { getCityByCode } from '@/utils/city'
defineProps<{
  user: any
}>()
</script>

<template>
  <div class="user-card">
    <div class="left-pic"><img :src="user.avatarUrl" /></div>
    <div class="right-content">
      <n-ellipsis class="text-base">{{ user.nickname }}</n-ellipsis>
      <n-ellipsis class="text-xs">City:{{ getCityByCode(user.city) }}</n-ellipsis>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  height: 100px;
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgb(245 245 244);
  border-radius: 6px;
  gap: 8px;
  .left-pic {
    height: 72px;
    width: 72px;
    img {
      opacity: 0.9;
      border-radius: 25%;
    }
  }
  .right-content {
    height: 100px;
    width: 120px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
}
.user-card:hover {
  background-color: rgb(254 202 202);
  border-radius: 6px;
  transition: 0.3s ease-in-out;
  img {
    opacity: 1;
  }
}
</style>
