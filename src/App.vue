<script setup lang="ts">
import BaseLayout from './layouts/base-layout.vue'
import Header from './components/common/header.vue'
import Sider from './components/common/sider.vue'
import Footer from './components/common/footer.vue'

const theme = {
  common: { primaryColor: '#FCA5A5', primaryColorHover: '#F87171', primaryColorPressed: '#EF4444' },
  Button: { textColor: '#FF0000' }
}
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <n-message-provider>
      <BaseLayout>
        <template #header><Header></Header></template>
        <template #sider><Sider></Sider></template>
        <template #main><RouterView /></template>
        <template #footer><Footer></Footer></template>
      </BaseLayout>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
html,
body {
  height: 100%;
  width: 100%;
  font-family: 'Fira code', '163Music';
  font-size: 1em;
}
#app {
  height: 100%;
  width: 100%;
}
.n-config-provider {
  height: 100%;
  width: 100%;
}
</style>
