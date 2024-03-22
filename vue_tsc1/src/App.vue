<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<template>
  <Header />
  <div id="container">
    <router-view />
  </div>
</template>

<style scoped>
#container {
  padding: 1rem 15px;
}
</style>
