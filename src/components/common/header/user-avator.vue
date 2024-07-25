<script setup lang="ts">
import { ref } from 'vue'
import LoginDialog from '@/components/dialog/login-dialog.vue'
import { useAuthStore } from '@/stores/auth'
import {
  AccountCircleRound,
  AlbumOutlined,
  HistoryRound,
  StarOutlineRound,
  FormatListBulletedRound
} from '@vicons/material'
import Divider from '../divider.vue'

const authStore = useAuthStore()

const dialog = ref(false)
const handleOpenDialog = () => {
  dialog.value = true
}
const handleCloseDialog = () => {
  dialog.value = false
}
const handleLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <n-flex align="center" style="width: 200px">
    <n-popover
      style="width: 280px"
      v-if="authStore.getAuthState == 0"
      trigger="hover"
      :show-arrow="false"
      :duration="300"
    >
      <template #trigger>
        <n-avatar
          class="mx-6 cursor-pointer font-music"
          round
          size="large"
          color="rgb(248 113 113)"
          @click="handleOpenDialog"
        >
          登录
        </n-avatar>
      </template>
      <n-grid class="font-music text-lg" :cols="2" :x-gap="12" :y-gap="12">
        <n-grid-item span="2">登录后你可以:</n-grid-item>
        <n-grid-item>
          <n-icon size="24"><AlbumOutlined /></n-icon>
          <span>发现更多音乐</span>
        </n-grid-item>
        <n-grid-item>
          <n-icon size="24"><HistoryRound /></n-icon>
          <span>同步听歌记录</span>
        </n-grid-item>
        <n-grid-item>
          <n-icon size="24"><StarOutlineRound /></n-icon>
          <span>收藏评论歌曲</span>
        </n-grid-item>
        <n-grid-item>
          <n-icon size="24"><FormatListBulletedRound /></n-icon>
          <span class="">获取定制歌单</span>
        </n-grid-item>
        <n-grid-item span="2">
          <n-button block secondary type="error" @click="handleOpenDialog">立即登录</n-button>
        </n-grid-item>
      </n-grid>
    </n-popover>
    <n-popover
      style="padding: 0; width: 120px; margin: 0"
      v-if="authStore.getAuthState == 1"
      trigger="hover"
      :show-arrow="false"
      :duration="300"
    >
      <template #trigger>
        <n-avatar
          class="mx-6 cursor-pointer"
          round
          size="large"
          :src="authStore.getAvatar + '?param=72y72'"
        />
      </template>
      <n-list hoverable clickable class="font-music avatar-menu">
        <n-list-item> 个人空间 </n-list-item>
        <n-list-item> 修改信息 </n-list-item>
        <n-list-item> 私信通知 </n-list-item>
        <n-list-item @click="handleLogout" class="text-red-400"> 退出登录 </n-list-item>
      </n-list>
    </n-popover>
  </n-flex>
  <LoginDialog :dialog="dialog" @close-dialog="handleCloseDialog"></LoginDialog>
</template>

<style scoped>
.n-grid div {
  display: flex;
  align-items: flex-end;
}
.n-grid button {
  font-size: 16px;
  font-weight: bolder;
}
.avatar-menu {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  .n-list-item {
    width: 100%;
  }
}
</style>
