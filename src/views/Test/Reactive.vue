<script setup lang="ts">
import { reactive, onMounted, watchEffect } from 'vue';

let reactiveObj = reactive({});

const changeObj = () => {
  const timer = setTimeout(() => {
    if (timer) {
      clearTimeout(timer);
    }

    // 不会跟踪到reactiveObj变化
    // reactiveObj = {
    //   a: 1,
    //   b: 2,
    // };

    // 跟踪到reactiveObj变化
    reactiveObj.a = 10;
  }, 2000);
};

watchEffect(() => {
  console.log(JSON.stringify(reactiveObj));
});

onMounted(() => {
  changeObj();
});
</script>

<template>
  <div class="reactive">
    响应式对象是：{{JSON.stringify(reactiveObj)}}
  </div>
</template>
