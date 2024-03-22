<script setup lang="ts">
import { ref } from 'vue';

const dataArr = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
let toggle = ref<boolean>(true);

const toggleFunc = (): void => {
  toggle.value = !toggle.value;
};

// 앞에 추가
const insertFirstArr = (): void => {
  dataArr.value.unshift(dataArr.value[0] - 1);
};
// 앞에 추가
const insertLastArr = (): void => {
  dataArr.value.push(dataArr.value[dataArr.value.length - 1] + 1); // 뒤에 추가
};
// 선택 행 삭제
const deleteArr = (row: number): void => {
  // console.log(row);
  dataArr.value = dataArr.value.filter((item: number) => item !== row);
};
</script>

<template>
  <div>
    <h2>Test Page</h2>
    <button type="button" @click="toggleFunc" v-if="toggle">숨기기</button>
    <button type="button" @click="toggleFunc" v-else>보이게</button>
    <br />
    <button type="button" @click="insertFirstArr" v-if="toggle">첫 행 추가</button>
    <button type="button" @click="insertLastArr" v-if="toggle">마지막에 행 추가</button>
    <ul v-show="toggle">
      <li v-for="(row, index) in dataArr" key="index">{{ row }} <span @click="deleteArr(row)" style="cursor: pointer"> ❌</span></li>
    </ul>
  </div>
</template>

<style scoped></style>
