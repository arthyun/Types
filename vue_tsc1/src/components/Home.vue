<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref, watch } from 'vue';
import Model from './Model.vue';

let modelData = ref<number>(0);

const bringSeconds = (): number => {
  return (modelData.value = new Date().getSeconds());
};

const intervalFunc = setInterval(() => bringSeconds(), 1000);

watch(modelData, (newValue, oldValue) => {
  console.log('감지 : 인터벌 시작');
  intervalFunc;
});

onMounted(() => {
  console.log('Mount');
  // 초기 update로 전달 시킴
  modelData.value = new Date().getSeconds();
});

onUnmounted(() => {
  console.log('unMount');
  clearInterval(intervalFunc);
});

// // watch로 대체
// onUpdated(() => {
// console.log('update');
// // mount에서 변경을 감지하여 로직 처리
// setTimeout(() => bringSeconds(), 1000);
// });
</script>

<template>
  <div>
    <h1>Home 입니다.</h1>
    <Model v-model="modelData" />
    <button type="button" @click="bringSeconds">변경</button>
  </div>
</template>

<style scoped></style>
