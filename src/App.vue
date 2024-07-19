<script setup lang="ts">
import Header from './components/header.vue'
import Sider from './components/sider.vue'
import Footer from './components/footer.vue'

const theme = {
  common: { primaryColor: '#FCA5A5', primaryColorHover: '#F87171', primaryColorPressed: '#EF4444' },
  Button: { textColor: '#FF0000' }
}
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <n-message-provider>
      <n-layout class="h-full">
        <n-layout-header>
          <Header class="w-full h-14" />
        </n-layout-header>
        <n-layout has-sider :style="{ height: 'calc(100vh - 120px)' }">
          <n-layout-sider>
            <Sider />
          </n-layout-sider>
          <n-layout>
            <RouterView />
          </n-layout>
        </n-layout>
        <n-layout-footer>
          <Footer class="w-full h-16" />
        </n-layout-footer>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
html,
body {
  height: 100%;
  width: 100%;
  font-family: 'Lucida Console', '方正细金陵简体';
  font-weight: bold;
}
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.n-config-provider {
  height: 100%;
  width: 100%;
}
</style>
