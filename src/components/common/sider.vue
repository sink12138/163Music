<script setup lang="ts">
import { h, watch, ref } from 'vue'
import type { Component } from 'vue'
import { useRoute } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { NMenu, NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  HomeRound as HomeIcon,
  ExploreRound as ExploreIcon,
  LeaderboardRound as LeaderboardIcon,
  AccountBoxRound as UserIcon,
  AccessTimeFilledOutlined as AboutIcon
} from '@vicons/material'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: { name: 'home' } }, { default: () => '首页' }),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () => h(RouterLink, { to: { name: 'explore' } }, { default: () => '发现' }),
    key: 'explore',
    icon: renderIcon(ExploreIcon)
  },
  {
    label: () => h(RouterLink, { to: { name: 'leaderboard' } }, { default: () => '排行榜' }),
    key: 'leaderboard',
    icon: renderIcon(LeaderboardIcon)
  },
  {
    label: () => h(RouterLink, { to: { name: 'user' } }, { default: () => '我的' }),
    key: 'user',
    icon: renderIcon(UserIcon)
  },
  {
    label: () => h(RouterLink, { to: { name: 'about' } }, { default: () => '计划' }),
    key: 'about',
    icon: renderIcon(AboutIcon)
  }
]

const route = useRoute()
const menuKey = ref()
watch(
  () => route.path,
  () => {
    menuKey.value = route.fullPath.split('/')[1]
  }
)

const handleUpdate = (key: string) => {
  menuKey.value = key
}
</script>

<template>
  <n-menu
    :options="menuOptions"
    class="text-xl font-bold w-full h-full py-6 bg-red-50"
    :icon-size="24"
    v-model:value="menuKey"
    @update:value="handleUpdate"
  ></n-menu>
</template>

<style lang="scss" scoped>
.n-menu {
  font-family: '163Music';
}
.n-menu-item-content:hover {
  background-color: #fff;
}
</style>
