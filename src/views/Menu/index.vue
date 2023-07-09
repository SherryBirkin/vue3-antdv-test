<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { routes } from '@/router';
import type { RouteRecord } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';

const mainRoute = routes.find((item) => item.name === 'main');
let pageRoutes = ref<RouteRecord[]>([]);

if (mainRoute) {
  pageRoutes = [...mainRoute.children];
}

const $route = useRoute();
const $router = useRouter();

let openKeys = ref<string[]>(['home']);
let selectedKeys = ref<string[]>(['workBench']);

const handleMenuClick = function({ key }) {
  $router.push({ name: key });
};
// const handleInnerPageMenuItemClick = function(targetRoute: RouteRecord) {
//   $router.push({ name: targetRoute.name });
// };

onMounted(() => {
  console.log($route);
  const matchedArr = $route.matched;

  if (matchedArr?.length > 1) {
    openKeys.value = [
      matchedArr[matchedArr.length - 2].name as string
    ];
    selectedKeys.value = [
      matchedArr[matchedArr.length - 1].name as string
    ];
  }
});
</script>

<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handleMenuClick"
  >
    <a-sub-menu
      v-for="headPageItem in pageRoutes"
      :key="headPageItem.name"
    >
      <template #title>{{ headPageItem.meta?.title }}</template>
      <a-menu-item
        v-for="innerPageItem in headPageItem.children"
        :key="innerPageItem.name"
      >{{ innerPageItem.meta?.title }}</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<style lang="scss" scoped>

</style>
