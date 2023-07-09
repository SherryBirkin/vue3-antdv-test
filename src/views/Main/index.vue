<script lang="ts" setup>
import Menu from '@/views/Menu/index.vue';
</script>

<template>
  <div class="main">
    <a-layout>
      <a-layout-sider theme="light">
        <Menu></Menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>

        </a-layout-header>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: 100%;
  
  & > .ant-layout {
    height: 100%;
  }
}
</style>
