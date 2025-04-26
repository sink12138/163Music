<script setup lang="ts">
const props = defineProps<{
  vertical?: boolean
}>()
</script>

<template>
  <div class="flex justify-center items-center">
    <div :class="vertical ? 'divider-vertical' : 'divider'"></div>
  </div>
</template>

<style scoped>
.divider {
  width: calc(100% - 20px);
  border-top: 1px solid rgb(254 226 226);
  border-bottom: 1px solid rgb(254 226 226);
  margin: 10px 0;
}
.divider-vertical {
  height: calc(100% - 40px);
  border-left: 1px solid rgb(254 226 226);
  border-right: 1px solid rgb(254 226 226);
  margin: 0 10px;
}
</style>
