<script setup lang="ts">
const props = defineProps<{
  title?: string
  message?: string
}>()
</script>

<template>
  <div class="base-card">
    <div class="info-icon">
      <slot name="icon"></slot>
    </div>
    <div class="right-content">
      <div class="info-title">{{ title }}</div>
      <div class="text-xs">{{ (message ? message : '查看搜索结果详情') + ' >' }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-title {
  font-size: 36px;
  font-weight: bold;
  font-family: '163Music';
}
.info-icon {
  font-size: 72px;
}
</style>
