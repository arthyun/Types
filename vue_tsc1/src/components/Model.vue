<script setup lang="ts">
import { ref } from 'vue';

const model = defineModel();

let result = ref();
const confirmModelData = () => {
  result.value = `<p style="color: red">${model.value}</p>`;
};
</script>

<template>
  <p>v-모델 : {{ model }}</p>
  <button type="button" @click="confirmModelData">EXPORT</button>

  <div v-html="result"></div>
</template>

<style scoped></style>
