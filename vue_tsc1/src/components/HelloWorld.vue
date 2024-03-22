<script setup lang="ts">
import { ref } from 'vue';

// defineProps<{ msg: string | undefined }>();

// 일반 변수
const rawHtml: string = '로우 텍스트1';
const rawHtml2: string = '<span style="color:red">빨간색 이어야 한다.</span>';
const fontColor: string = '#0081cc';
const fontSize: number = 30;

// 상태
let isActive = ref<boolean>(false);

const change = (): void => {
  isActive.value = !isActive.value;
};
</script>

<template>
  <div>{{ rawHtml }}</div>
  <div>{{ rawHtml2 }}</div>

  <h2 :class="{ active: isActive }">클래스 바인딩 테스트</h2>
  <h2 v-html="rawHtml2"></h2>
  <button type="button" @click="change">버튼</button>

  <h3 style="color: red; font-size: 24px">스타일 바인딩 테스트</h3>
  <h3 :style="{ color: fontColor, fontSize: fontSize + 'px' }">스타일 바인딩 테스트</h3>

  <router-link to="/test">TEST로 이동</router-link>
</template>

<style scoped>
.active {
  color: green;
}
</style>
