<script setup lang="ts">
import { onMounted } from 'vue';
import { accountLogin } from '@/api/account/login';
import GloMethods from '@/utils/gloMethods';

onMounted(async () => {
  const { data } = await GloMethods.commonReqHandler(accountLogin, {
    username: 'henry',
    password: '123',
  });

  console.log(data);
});
</script>

<template>
  <router-view></router-view>
</template>
