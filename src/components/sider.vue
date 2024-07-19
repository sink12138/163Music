<script setup lang="ts">
import { h, ref } from 'vue'
import type { Component } from 'vue'
import type { MenuOption } from 'naive-ui'
import { NMenu, NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  HomeRound as HomeIcon,
  ExploreRound as ExploreIcon,
  LeaderboardRound as LeaderboardIcon,
  AccountBoxRound as UserIcon
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
  }
]
</script>

<template>
  <n-menu :options="menuOptions" default-value="home" class="text-xl" :icon-size="24"</n-menu>
</template>
