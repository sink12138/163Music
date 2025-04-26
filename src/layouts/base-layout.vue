<template>
  <div class="layout-container">
    <div class="layout-header">
      <slot name="header"></slot>
    </div>
    <div class="layout-body">
      <div class="layout-sider">
        <slot name="sider"></slot>
      </div>
      <div class="layout-content">
        <slot name="main"></slot>
      </div>
    </div>
    <div class="layout-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .layout-header {
    width: 100%;
    display: flex;
  }
  .layout-body {
    min-height: calc(100% - 116px);
    max-height: calc(100% - 56px);
    width: 100%;
    display: flex;
    flex-grow: 1;
    .layout-sider {
      width: 15%;
    }
    .layout-content {
      width: 85%;
      overflow-y: auto;
      background-color: rgb(248 250 252);
    }
  }
  .layout-footer {
    width: 100%;
    display: flex;
  }
}
</style>
