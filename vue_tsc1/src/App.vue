<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue';
import Header from './components/Header.vue';

const data = ref<any>();

const getData = async () => {
  // const response = await fetch('/api/');
  // const result = await response.json();
  // return result;
};

const getLogin = async (): Promise<any> => {
  // const response = await fetch('/api/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     userId: '',
  //     password: ''
  //   })
  // });
  // return response.json();
};

onMounted(async () => {
  const result = await getData();
  data.value = result;
});
onUpdated(() => {
  // console.log(data.value);
});
</script>

<template>
  <Header :login="getLogin" />
  <!-- <button type="button" @click="getData">FETCH</button> -->
  <p>{{ data }}</p>
  <div id="container">
    <router-view />
  </div>
</template>

<style scoped>
#container {
  padding: 1rem 15px;
}
</style>
