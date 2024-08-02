<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { h, type Component } from 'vue'
import PlayerBar from '../player/player-bar.vue'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<template>
  <PlayerBar></PlayerBar>
</template>
