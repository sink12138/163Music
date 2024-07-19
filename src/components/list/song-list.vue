<script setup lang="ts">
defineProps<{
  tableData: any
}>()
</script>

<template>
  <div class="h-full overflow-auto">
    <div class="list-item" v-for="item in tableData">
      <div></div>
      {{ item.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  height: 100%;
  overflow-y: auto;
}
.list-item {
  height: 64px;
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border: 2px solid rgb(245 245 244);
  background-color: rgb(245 245 244);
  cursor: pointer;
}
.list-item:hover {
  border-radius: 4px;
  border: 2px solid rgb(248 113 113);
  background-color: rgb(255 255 255);
  box-shadow: 0px 4px 12px 0px rgba(220, 38, 38, 0.25);
  cursor: pointer;
}
</style>
