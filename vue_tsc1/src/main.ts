import './style.css';
import { createApp } from 'vue';
import App from './App.vue';

// router 세팅
import router from './Router';
const app = createApp(App);
app.use(router);
app.mount('#app');

// createApp(App).mount('#app');
