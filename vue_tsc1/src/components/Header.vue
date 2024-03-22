<script setup lang="ts">
defineProps<{ login: () => Promise<any> }>();

const navArr = [
  { path: '/', name: 'Home' },
  { path: '/hello', name: 'HelloWorld' },
  { path: '/test', name: 'Test' }
];
</script>

<template>
  <header>
    <nav>
      <ul>
        <li v-for="item in navArr">
          <router-link :to="item.path"> {{ item.name }}</router-link>
        </li>
        <button type="button" @click="login">로그인</button>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  border-bottom: 1px solid #333;
}
nav {
  padding: 1rem 15px;
}
nav > ul {
  display: flex;
  gap: 1rem;
}
</style>
